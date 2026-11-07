import { CurriculumDay } from '../types';

export interface WhatsAppGatewayConfig {
  enabled: boolean;
  provider: 'fonnte' | 'wablas' | 'custom_webhook';
  apiToken: string;
  targetGroupId: string;
  webhookUrl: string;
  autoSendAt2359: boolean;
  senderName: string;
  lastSentDay?: number;
  lastSentTimestamp?: string;
}

const STORAGE_KEY_WA_CONFIG = 'menata_hidup_whatsapp_config_v1';

export const DEFAULT_WA_CONFIG: WhatsAppGatewayConfig = {
  enabled: false,
  provider: 'fonnte',
  apiToken: '',
  targetGroupId: '',
  webhookUrl: '',
  autoSendAt2359: true,
  senderName: 'Bimbingan Belajar Menata Hidup'
};

export class WhatsAppService {
  /**
   * Generates a beautifully formatted WhatsApp broadcast message from a CurriculumDay
   */
  static formatLessonForWhatsApp(day: CurriculumDay, appBaseUrl?: string): string {
    const origin = appBaseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-skdvzt5e6iv62oxrcqm4di-348182450010.asia-southeast1.run.app');
    const lessonUrl = `${origin}/#materi-${day.dayNumber}`;

    const quran = day.quranDalil && day.quranDalil[0];
    const hadith = day.hadithDalil && day.hadithDalil[0];

    const lines: string[] = [
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      '',
      '🕌 *BIMBINGAN BELAJAR MENATA HIDUP*',
      `*Menuju Akhir Hidup yang Indah*`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━',
      `📅 *HARI KE-${day.dayNumber} DARI 90 HARI*`,
      `📖 *Judul:* ${day.title}`,
      `🏷️ *Tema:* ${day.theme}`,
      `📚 *Bidang Studi:* ${day.subjectId.replace('_', ' ').toUpperCase()}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━',
      ''
    ];

    if (quran) {
      lines.push('📜 *DALIL AL-QUR\'AN:*');
      if (quran.arabicText) {
        lines.push(quran.arabicText);
      }
      lines.push(`_"${quran.translation}"_`);
      lines.push(`(QS. ${quran.surahName} [${quran.surahNumber}]: ${quran.ayahNumber})`);
      lines.push('');
    }

    if (hadith) {
      lines.push('🌿 *HADITS NABI ﷺ:*');
      if (hadith.arabicText) {
        lines.push(hadith.arabicText);
      }
      lines.push(`_"${hadith.translation}"_`);
      lines.push(`(HR. ${hadith.rawi} dlm ${hadith.kitab} No. ${hadith.hadithNumber} - *Derajat: ${hadith.grade}*)`);
      lines.push('');
    }

    if (day.summary) {
      lines.push('💡 *INTISARI PEMBELAJARAN:*');
      lines.push(day.summary);
      lines.push('');
    }

    if (day.dailyPracticeTask) {
      lines.push('🎯 *TUGAS AMAL YAUMIYAH HARI INI:*');
      lines.push(`• ${day.dailyPracticeTask}`);
      lines.push('');
    }

    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('🔗 *Buka Modul Lengkap & Isi Jurnal Muhasabah:*');
    lines.push(lessonUrl);
    lines.push('');
    lines.push('_"Barangsiapa menempuh jalan untuk menuntut ilmu, maka Allah mudahkan baginya jalan menuju Surga." (HR. Muslim)_');

    return lines.join('\n');
  }

  /**
   * Generates a direct WhatsApp share URL (opens WhatsApp app or WhatsApp Web)
   */
  static getDirectShareUrl(text: string, phoneOrGroup?: string): string {
    const encoded = encodeURIComponent(text);
    if (phoneOrGroup && phoneOrGroup.trim().length > 0) {
      const cleanTarget = phoneOrGroup.replace(/[^0-9]/g, '');
      return `https://api.whatsapp.com/send?phone=${cleanTarget}&text=${encoded}`;
    }
    // Generic share opens WhatsApp and allows choosing any contact/group
    return `https://api.whatsapp.com/send?text=${encoded}`;
  }

  /**
   * Reads saved WhatsApp gateway configuration
   */
  static getConfig(): WhatsAppGatewayConfig {
    if (typeof window === 'undefined') return DEFAULT_WA_CONFIG;
    const raw = localStorage.getItem(STORAGE_KEY_WA_CONFIG);
    if (!raw) return DEFAULT_WA_CONFIG;
    try {
      return { ...DEFAULT_WA_CONFIG, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_WA_CONFIG;
    }
  }

  /**
   * Saves WhatsApp gateway configuration
   */
  static saveConfig(cfg: Partial<WhatsAppGatewayConfig>): WhatsAppGatewayConfig {
    const current = this.getConfig();
    const updated = { ...current, ...cfg };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_WA_CONFIG, JSON.stringify(updated));
    }
    return updated;
  }

  /**
   * Sends broadcast to WhatsApp group via backend gateway endpoint
   */
  static async sendBroadcastViaGateway(
    day: CurriculumDay,
    config: WhatsAppGatewayConfig
  ): Promise<{ success: boolean; message: string; payloadPreview?: string }> {
    const messageText = this.formatLessonForWhatsApp(day);

    try {
      const res = await fetch('/api/whatsapp/send-broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dayNumber: day.dayNumber,
          title: day.title,
          message: messageText,
          config: {
            provider: config.provider,
            apiToken: config.apiToken,
            targetGroupId: config.targetGroupId,
            webhookUrl: config.webhookUrl,
            senderName: config.senderName
          }
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        this.saveConfig({
          lastSentDay: day.dayNumber,
          lastSentTimestamp: new Date().toISOString()
        });
        return {
          success: true,
          message: data.message || `Materi Hari ke-${day.dayNumber} berhasil dikirim ke grup WhatsApp!`,
          payloadPreview: messageText
        };
      } else {
        return {
          success: false,
          message: data.error || data.message || 'Gagal mengirim pesan melalui gateway WhatsApp.',
          payloadPreview: messageText
        };
      }
    } catch (e: any) {
      return {
        success: false,
        message: 'Tidak dapat menghubungi server lokal untuk memicu gateway WhatsApp.',
        payloadPreview: messageText
      };
    }
  }
}
