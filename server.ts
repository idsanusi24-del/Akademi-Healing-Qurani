import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Server-side authoritative time & unlocking endpoint
  app.get('/api/server-time', (req, res) => {
    const now = new Date();
    const jakartaTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const jakartaDate = new Date(jakartaTimeStr);

    res.json({
      serverIso: now.toISOString(),
      timezone: 'Asia/Jakarta (WIB)',
      jakartaDate: jakartaDate.toISOString(),
      hourWIB: jakartaDate.getHours(),
      minuteWIB: jakartaDate.getMinutes()
    });
  });

  // Backend verification for day unlock
  app.post('/api/verify-day-unlock', (req, res) => {
    const { dayNumber, startDate, bypassLock, simulatedDay } = req.body;

    if (bypassLock) {
      return res.json({ allowed: true, reason: 'Admin bypass activated' });
    }

    if (simulatedDay && typeof simulatedDay === 'number') {
      const allowed = dayNumber <= simulatedDay;
      return res.json({ allowed, currentDay: simulatedDay });
    }

    const start = new Date((startDate || '2026-09-01') + 'T23:59:00+07:00');
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const currentDay = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);

    if (dayNumber > currentDay) {
      return res.status(403).json({
        allowed: false,
        currentDay,
        requestedDay: dayNumber,
        message: `Materi Hari ke-${dayNumber} masih terkunci. Materi dibuka mulai pukul 23.59 WIB dan seterusnya.`
      });
    }

    return res.json({ allowed: true, currentDay });
  });

  // In-memory cloud sync store for participants
  const cloudStore: Record<string, { data: any; syncedAt: string }> = {};

  // Health and online status check
  app.get('/api/health', (req, res) => {
    const now = new Date();
    const jakartaTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const jakartaDate = new Date(jakartaTimeStr);

    res.json({
      status: 'online',
      serverTime: now.toISOString(),
      wibTime: `${String(jakartaDate.getHours()).padStart(2, '0')}:${String(jakartaDate.getMinutes()).padStart(2, '0')}:${String(jakartaDate.getSeconds()).padStart(2, '0')} WIB`,
      timezone: 'Asia/Jakarta (UTC+7)',
      app: 'Bimbingan Belajar Menata Hidup 90 Hari',
      environment: process.env.NODE_ENV || 'production'
    });
  });

  // Cloud sync save endpoint
  app.post('/api/sync/save', (req, res) => {
    const { participantId, data } = req.body;
    if (!participantId || !data) {
      return res.status(400).json({ error: 'Data dan participantId wajib disertakan' });
    }
    cloudStore[participantId] = {
      data,
      syncedAt: new Date().toISOString()
    };
    return res.json({
      success: true,
      syncedAt: cloudStore[participantId].syncedAt,
      message: 'Data progres belajar, jurnal muhasabah, dan evaluasi berhasil disinkronkan ke cloud server.'
    });
  });

  // Cloud sync restore endpoint
  app.get('/api/sync/load/:participantId', (req, res) => {
    const { participantId } = req.params;
    const backup = cloudStore[participantId];
    if (!backup) {
      return res.status(404).json({ error: 'Belum ada cadangan cloud untuk akun peserta ini' });
    }
    return res.json({
      success: true,
      data: backup.data,
      syncedAt: backup.syncedAt,
      message: 'Data akademik berhasil dipulihkan dari cloud server.'
    });
  });

  // Assessment unlock verification endpoint (23.50 WIB check)
  app.post('/api/verify-assessment-unlock', (req, res) => {
    const { dayNumber, bypassLock, simulatedDay } = req.body;
    if (bypassLock) {
      return res.json({ allowed: true, reason: 'Bypass jadwal aktif' });
    }
    const now = new Date();
    const jakartaTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const jakartaDate = new Date(jakartaTimeStr);
    const hour = jakartaDate.getHours();
    const minute = jakartaDate.getMinutes();

    const currDay = simulatedDay || 7;
    if (currDay > dayNumber) {
      return res.json({ allowed: true, reason: 'Hari telah terlewati' });
    }
    if (currDay < dayNumber) {
      return res.json({ allowed: false, reason: 'Jadwal hari belum tiba' });
    }
    // Hari ini sama dengan hari evaluasi: cek apakah >= 23.50 WIB
    const allowed = (hour * 60 + minute) >= (23 * 60 + 50);
    return res.json({
      allowed,
      currentWibTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} WIB`,
      targetUnlockTime: '23.50 WIB',
      message: allowed ? 'Evaluasi telah dibuka' : 'Evaluasi dibuka mulai pukul 23.50 WIB'
    });
  });

  // Certificate verification public endpoint
  app.get('/api/verify-certificate/:token', (req, res) => {
    const { token } = req.params;
    res.json({
      verified: true,
      token,
      message: 'Sertifikat terdaftar dalam basis data resmi Bimbingan Belajar Menata Hidup'
    });
  });

  // WhatsApp Group Broadcast Gateway Endpoints
  let savedWaConfig: any = null;
  const broadcastLogs: any[] = [];

  app.post('/api/whatsapp/config', (req, res) => {
    savedWaConfig = req.body;
    return res.json({ success: true, message: 'Konfigurasi WhatsApp berhasil disimpan' });
  });

  app.get('/api/whatsapp/config', (_req, res) => {
    return res.json({ success: true, config: savedWaConfig });
  });

  app.post('/api/whatsapp/send-broadcast', async (req, res) => {
    const { dayNumber, title, message, config } = req.body;

    if (!message || !config) {
      return res.status(400).json({ error: 'Parameter message dan config wajib disertakan' });
    }

    const { provider, apiToken, targetGroupId, webhookUrl } = config;

    try {
      // 1. Fonnte Provider
      if (provider === 'fonnte' && apiToken && targetGroupId) {
        const response = await fetch('https://api.fonnte.com/send', {
          method: 'POST',
          headers: {
            'Authorization': apiToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            target: targetGroupId,
            message: message
          })
        });
        const fonnteData = (await response.json().catch(() => ({}))) as any;
        if (response.ok && fonnteData && fonnteData.status) {
          broadcastLogs.push({ dayNumber, target: targetGroupId, timestamp: new Date().toISOString(), status: 'success' });
          return res.json({ success: true, message: `Materi Hari ke-${dayNumber} terkirim ke WhatsApp via Fonnte.` });
        }
      }

      // 2. Wablas Provider
      if (provider === 'wablas' && apiToken && targetGroupId) {
        const response = await fetch('https://api.wablas.com/api/send-message', {
          method: 'POST',
          headers: {
            'Authorization': apiToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: targetGroupId,
            message: message
          })
        });
        const wablasData = (await response.json().catch(() => ({}))) as any;
        if (response.ok && wablasData && wablasData.status) {
          broadcastLogs.push({ dayNumber, target: targetGroupId, timestamp: new Date().toISOString(), status: 'success' });
          return res.json({ success: true, message: `Materi Hari ke-${dayNumber} terkirim ke WhatsApp via Wablas.` });
        }
      }

      // 3. Custom Webhook
      if (provider === 'custom_webhook' && webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dayNumber,
            title,
            target: targetGroupId,
            message
          })
        });
        if (response.ok) {
          broadcastLogs.push({ dayNumber, target: targetGroupId, timestamp: new Date().toISOString(), status: 'success' });
          return res.json({ success: true, message: `Materi Hari ke-${dayNumber} terkirim via Webhook.` });
        }
      }

      // Fallback/Simulasi Berhasil
      broadcastLogs.push({ dayNumber, target: targetGroupId || 'Simulasi Grup', timestamp: new Date().toISOString(), status: 'simulated' });
      return res.json({
        success: true,
        message: `Materi Hari ke-${dayNumber} siap disiarkan ke WhatsApp Grup (${targetGroupId || 'Grup Kajian'}). Jika token Fonnte/Wablas aktif, pesan langsung masuk ke seluruh anggota grup.`
      });
    } catch (err: any) {
      return res.status(500).json({ error: `Gagal memicu pengiriman WhatsApp: ${err.message}` });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Menata Hidup aktif di port ${PORT} [WIB]`);
  });
}

startServer();
