import React, { useState } from 'react';
import { CurriculumDay } from '../types';
import { WhatsAppService, WhatsAppGatewayConfig } from '../services/whatsappService';
import {
  Share2,
  Send,
  Copy,
  Check,
  Settings2,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

interface WhatsAppBroadcastHubProps {
  currentDay: CurriculumDay;
  allDays: CurriculumDay[];
  isAdmin?: boolean;
  onClose?: () => void;
}

export const WhatsAppBroadcastHub: React.FC<WhatsAppBroadcastHubProps> = ({
  currentDay,
  allDays,
  isAdmin = false,
  onClose
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(currentDay.dayNumber);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'direct' | 'gateway'>('direct');
  
  // Gateway Settings State
  const [config, setConfig] = useState<WhatsAppGatewayConfig>(() => WhatsAppService.getConfig());
  const [isSendingGateway, setIsSendingGateway] = useState<boolean>(false);
  const [gatewayStatus, setGatewayStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const selectedDay = allDays.find(d => d.dayNumber === selectedDayNumber) || currentDay;
  const broadcastText = WhatsAppService.formatLessonForWhatsApp(selectedDay);

  const handleCopyText = () => {
    navigator.clipboard.writeText(broadcastText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const url = WhatsAppService.getDirectShareUrl(broadcastText, config.targetGroupId);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = WhatsAppService.saveConfig(config);
    setConfig(updated);
    setGatewayStatus({
      type: 'success',
      message: 'Konfigurasi Gateway WhatsApp berhasil disimpan di sistem!'
    });
    setTimeout(() => setGatewayStatus(null), 3500);
  };

  const handleSendViaGateway = async () => {
    if (!config.apiToken && config.provider !== 'custom_webhook') {
      setGatewayStatus({
        type: 'error',
        message: 'Mohon isi API Token atau Webhook URL terlebih dahulu.'
      });
      return;
    }

    if (!config.targetGroupId) {
      setGatewayStatus({
        type: 'error',
        message: 'Mohon isi ID Target Grup WhatsApp (misal: 1203630xxx@g.us atau nomor admin).'
      });
      return;
    }

    setIsSendingGateway(true);
    setGatewayStatus({
      type: 'info',
      message: 'Menghubungkan ke Gateway WhatsApp untuk mengirim siaran...'
    });

    const result = await WhatsAppService.sendBroadcastViaGateway(selectedDay, config);
    setIsSendingGateway(false);

    if (result.success) {
      setGatewayStatus({
        type: 'success',
        message: result.message
      });
    } else {
      setGatewayStatus({
        type: 'error',
        message: result.message
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 shadow-museum-md space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E5E4] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-base font-serif-display font-medium text-[#0A192F] flex items-center gap-2">
              <span>Siaran Materi Harian ke Grup WhatsApp</span>
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Resmi & Rapi
              </span>
            </h3>
            <p className="text-xs text-[#57534E] font-sans-body">
              Kirim intisari materi, dalil Al-Qur'an, hadits, dan tugas yaumiyah langsung ke grup kajian WhatsApp Anda.
            </p>
          </div>
        </div>

        {/* Tab switch if Admin */}
        {isAdmin && (
          <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 rounded-lg border border-[#E7E5E4] self-start sm:self-auto text-xs font-sans-body">
            <button
              type="button"
              onClick={() => setActiveTab('direct')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'direct'
                  ? 'bg-white text-[#0A192F] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#0A192F]'
              }`}
            >
              1-Klik WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('gateway')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'gateway'
                  ? 'bg-white text-[#0A192F] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#0A192F]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Otomatis Gateway (Fonnte/Wablas)</span>
            </button>
          </div>
        )}
      </div>

      {/* Day Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FBF9F5] p-3.5 rounded-xl border border-[#E7E5E4] text-xs font-sans-body">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#0A192F]">Pilih Materi Hari:</span>
          <select
            value={selectedDayNumber}
            onChange={(e) => setSelectedDayNumber(Number(e.target.value))}
            className="p-1.5 bg-white border border-[#D6CEBE] rounded-lg font-mono font-medium text-[#0A192F] focus:outline-[#0A192F] cursor-pointer"
          >
            {allDays.map((d) => (
              <option key={d.dayNumber} value={d.dayNumber}>
                Hari {d.dayNumber}: {d.title.length > 40 ? d.title.substring(0, 40) + '...' : d.title}
              </option>
            ))}
          </select>
        </div>

        <div className="text-[11px] text-[#78716C]">
          Tema: <strong className="text-[#0A192F]">{selectedDay.theme}</strong>
        </div>
      </div>

      {activeTab === 'direct' ? (
        /* DIRECT 1-CLICK WHATSAPP SHARE TAB */
        <div className="space-y-4 font-sans-body">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Message Preview formatted like WhatsApp message */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0A192F] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B4863A]" />
                  Pratinjau Pesan yang Akan Diterima Anggota Grup:
                </span>
                <span className="text-[11px] text-stone-500 font-mono">
                  {broadcastText.length} karakter
                </span>
              </div>

              <div className="bg-[#EFEAE2] p-4 rounded-xl border border-[#DAD3C8] shadow-inner font-mono text-xs leading-relaxed text-[#111B21] max-h-[380px] overflow-y-auto whitespace-pre-wrap select-text">
                <div className="bg-white p-3.5 rounded-lg rounded-tl-none shadow-xs border border-emerald-100/50">
                  {broadcastText}
                </div>
              </div>
            </div>

            {/* Right: Action Buttons & Instructions */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Cara Termudah & Paling Aman:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-900/90">
                    Tekan tombol hijau di bawah, WhatsApp Anda akan otomatis terbuka. Anda tinggal memilih <strong>Grup WhatsApp Kajian / Bimbingan</strong> yang dituju dan tekan kirim. Tidak membutuhkan biaya bot atau langganan apa pun.
                  </p>
                </div>

                <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#E7E5E4] text-[11px] text-[#57534E] space-y-1">
                  <span className="font-semibold text-[#0A192F] block">Keunggulan Format Pesan:</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Ayat Al-Qur'an dan Hadits tampil lengkap dengan harakat.</li>
                    <li>Teks ringkasan padat dan mudah dipahami di HP.</li>
                    <li>Menyertakan tautan langsung ke modul di web.</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Langsung ke Grup WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyText}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Teks Siaran Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#B4863A]" />
                      <span>Salin Teks Siaran (Copy)</span>
                    </>
                  )}
                </button>

                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 px-3 text-[11px] text-[#78716C] hover:text-[#0A192F] transition-colors cursor-pointer"
                  >
                    Tutup Jendela
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* AUTOMATED GATEWAY CONFIGURATION TAB */
        <div className="space-y-5 font-sans-body">
          
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Opsi Siaran 100% Otomatis dari Server (Tanpa Buka HP):</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900/90">
              Jika Anda ingin sistem mengirimkan materi harian secara <strong>otomatis setiap pukul 23.59 WIB</strong> langsung ke grup WhatsApp jamaah saat modul baru terbuka, Anda dapat menghubungkan API Gateway seperti <strong>Fonnte</strong> (sangat populer di Indonesia), <strong>Wablas</strong>, atau <strong>Custom Webhook</strong>.
            </p>
          </div>

          {gatewayStatus && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                gatewayStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : gatewayStatus.type === 'error'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}
            >
              {gatewayStatus.type === 'success' && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
              {gatewayStatus.type === 'error' && <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />}
              {gatewayStatus.type === 'info' && <Info className="w-4 h-4 text-blue-600 shrink-0" />}
              <span>{gatewayStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSaveConfig} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1">
                  Penyedia Gateway WhatsApp:
                </label>
                <select
                  value={config.provider}
                  onChange={(e) => setConfig({ ...config, provider: e.target.value as any })}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBE] bg-white focus:outline-[#0A192F]"
                >
                  <option value="fonnte">Fonnte (Rekomendasi - fonnte.com)</option>
                  <option value="wablas">Wablas (wablas.com)</option>
                  <option value="custom_webhook">Custom Webhook API (Server Sendiri)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1">
                  ID Target Grup WhatsApp (atau No. HP Admin):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 120363048291039@g.us atau 08123456789"
                  value={config.targetGroupId}
                  onChange={(e) => setConfig({ ...config, targetGroupId: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBE] bg-white focus:outline-[#0A192F] font-mono"
                />
                <span className="text-[10px] text-[#78716C] mt-0.5 block">
                  Bisa berupa ID Grup WhatsApp (akhiran @g.us) atau nomor telepon pengurus.
                </span>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1">
                  API Token / Secret Key:
                </label>
                <input
                  type="password"
                  placeholder="Masukkan Token API dari dashboard gateway"
                  value={config.apiToken}
                  onChange={(e) => setConfig({ ...config, apiToken: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBE] bg-white focus:outline-[#0A192F] font-mono"
                />
              </div>

              {config.provider === 'custom_webhook' && (
                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] mb-1">
                    URL Endpoint Webhook:
                  </label>
                  <input
                    type="url"
                    placeholder="https://api.domainanda.com/send-wa"
                    value={config.webhookUrl}
                    onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBE] bg-white focus:outline-[#0A192F] font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1">
                  Nama Pengirim Siaran (Header):
                </label>
                <input
                  type="text"
                  value={config.senderName}
                  onChange={(e) => setConfig({ ...config, senderName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBE] bg-white focus:outline-[#0A192F]"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#E7E5E4] bg-[#FBF9F5] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#0A192F] block">
                  Jadwalkan Siaran Otomatis Pukul 23.59 WIB
                </span>
                <span className="text-[11px] text-[#78716C] block">
                  Ketika materi hari berikutnya terbuka pukul 23.59 WIB, server akan memicu pengiriman pesan ke grup secara otomatis.
                </span>
              </div>
              <input
                type="checkbox"
                checked={config.autoSendAt2359}
                onChange={(e) => setConfig({ ...config, autoSendAt2359: e.target.checked })}
                className="w-4 h-4 text-[#0A192F] rounded focus:ring-[#0A192F] cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs flex items-center gap-2"
              >
                <Settings2 className="w-4 h-4 text-[#B4863A]" />
                <span>Simpan Pengaturan Gateway</span>
              </button>

              <button
                type="button"
                onClick={handleSendViaGateway}
                disabled={isSendingGateway}
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSendingGateway ? 'Mengirim Siaran...' : `Uji Kirim Materi Hari ke-${selectedDay.dayNumber} ke Grup`}</span>
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  );
};
