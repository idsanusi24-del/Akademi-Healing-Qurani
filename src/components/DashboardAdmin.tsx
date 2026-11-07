import React, { useState } from 'react';
import { UserProfile, ProgramConfig, CurriculumDay } from '../types';
import { StorageService } from '../services/storageService';
import { SystemAuditModal } from './SystemAuditModal';
import { WhatsAppBroadcastHub } from './WhatsAppBroadcastHub';
import { generateAll90Days } from '../data/curriculumData';
import {
  Settings,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Save,
  Download,
  Share2
} from 'lucide-react';

interface DashboardAdminProps {
  currentUser: UserProfile;
  config: ProgramConfig;
  onUpdateConfig: (newConfig: Partial<ProgramConfig>) => void;
  participants: UserProfile[];
  allDays?: CurriculumDay[];
}

export const DashboardAdmin: React.FC<DashboardAdminProps> = ({
  currentUser,
  config,
  onUpdateConfig,
  participants,
  allDays
}) => {
  const [startDateInput, setStartDateInput] = useState(config.startDate);
  const [simulatedDayInput, setSimulatedDayInput] = useState(config.adminOverrideSimulatedDay ?? 7);
  const [bypassLock, setBypassLock] = useState(config.bypassScheduleLock);
  const [passingScoreInput, setPassingScoreInput] = useState(config.passingScore);
  const [saveToast, setSaveToast] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [showBroadcast, setShowBroadcast] = useState(true);

  const daysList = allDays && allDays.length > 0 ? allDays : generateAll90Days();
  const currentRunningDay = daysList.find(d => d.dayNumber === (config.adminOverrideSimulatedDay || 7)) || daysList[0];

  const auditLogs = StorageService.getAuditLogs();
  const certificates = StorageService.getCertificates();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      startDate: startDateInput,
      adminOverrideSimulatedDay: Number(simulatedDayInput),
      bypassScheduleLock: bypassLock,
      passingScore: Number(passingScoreInput)
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleExportCsv = () => {
    const headers = ['Nomor Peserta', 'Nama Lengkap', 'Email', 'Nilai Komposit', 'Predikat', 'Status Kelulusan', 'Sertifikat'];
    const rows = participants.map(p => {
      const summary = StorageService.calculateAcademicSummary(p.id);
      const cert = certificates.find(c => c.participantId === p.id);
      return [
        p.participantNumber || '-',
        `"${p.fullName}"`,
        p.email,
        summary.compositeScore,
        summary.predicate,
        summary.isEligibleForCertificate ? 'Lulus' : 'Belum Lulus',
        cert ? cert.certificateNumber : 'Belum Terbit'
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_akademik_menata_hidup_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header in Ocean Blue */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-sky-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-cyan-400/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
              {currentUser.role === 'super_admin' ? 'Super Administrator' : 'Administrator Akademik'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pusat Kendali Sistem Pembelajaran 90 Hari
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Pengaturan kalender akademik, jadwal pembukaan materi pukul 23.59 WIB, audit log, dan rekapitulasi data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowBroadcast(!showBroadcast)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0 border ${
                showBroadcast
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-500/40'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>{showBroadcast ? 'Sembunyikan Siaran WA' : 'Pusat Siaran WhatsApp Grup'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAuditModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-500 hover:to-sky-600 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>Suite Audit 25 Kriteria</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="px-4 py-2.5 rounded-xl bg-sky-900 hover:bg-sky-850 text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md border border-cyan-400/30 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Laporan Akademik (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {saveToast && (
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-300 text-xs font-semibold text-sky-950 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-sky-700 shrink-0" />
          <span>Pengaturan kalender dan simulasi berhasil disimpan dan diterapkan pada seluruh sistem.</span>
        </div>
      )}

      {/* KPI Statistic Cards (Section N) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">Total Peserta Terdaftar</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">{participants.length}</div>
          <span className="text-[11px] text-sky-700 font-semibold mt-1 block">100% Status Aktif</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">Hari Sistem Berjalan</span>
          <div className="text-2xl font-extrabold text-sky-950 font-mono">
            Hari {config.adminOverrideSimulatedDay || 7}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Zona Waktu: Asia/Jakarta (WIB)</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">Rata-Rata Nilai Komulatif</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">87.5</div>
          <span className="text-[11px] text-sky-800 font-semibold mt-1 block">Predikat: Baik</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">Sertifikat Terbit</span>
          <div className="text-2xl font-extrabold text-sky-950 font-mono">{certificates.length}</div>
          <span className="text-[11px] text-sky-800 font-semibold mt-1 block">Disahkan Pembimbing</span>
        </div>

      </div>

      {/* WhatsApp Broadcast Hub Panel */}
      {showBroadcast && (
        <WhatsAppBroadcastHub
          currentDay={currentRunningDay}
          allDays={daysList}
          isAdmin={true}
          onClose={() => setShowBroadcast(false)}
        />
      )}

      {/* Grid: Settings & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (6 cols): Program Configuration */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-sky-800" />
              Pengaturan Kalender Akademik & Pembukaan Materi
            </h3>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Tanggal Mulai Program (Materi Hari 1 Buka 23.59 WIB):
              </label>
              <input
                type="date"
                value={startDateInput}
                onChange={(e) => setStartDateInput(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-sky-800"
              />
            </div>

            <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-sky-950">
                  Kalender Hari Pembelajaran Berjalan:
                </label>
                <span className="font-mono font-bold text-xs bg-cyan-200 px-2 py-0.5 rounded text-sky-950">
                  Hari ke-{simulatedDayInput}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={90}
                value={simulatedDayInput}
                onChange={(e) => setSimulatedDayInput(Number(e.target.value))}
                className="w-full accent-sky-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Hari 1 (Awal)</span>
                <span>Hari 30 (Bulan 1)</span>
                <span>Hari 60 (Bulan 2)</span>
                <span>Hari 90 (Kelulusan)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">
                  Mode Audit (Bypass Kunci Materi & Evaluasi)
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Mengizinkan tim penilai memeriksa seluruh 90 materi harian dan 15 evaluasi (Pekanan, Bulanan, Akhir) tanpa menunggu jam buka 23.50 WIB.
                </span>
              </div>
              <input
                type="checkbox"
                checked={bypassLock}
                onChange={(e) => setBypassLock(e.target.checked)}
                className="w-4 h-4 text-sky-800 rounded focus:ring-sky-800 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Batas Minimal Kelulusan (Passing Grade):
              </label>
              <input
                type="number"
                min={50}
                max={90}
                value={passingScoreInput}
                onChange={(e) => setPassingScoreInput(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-sky-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Terapkan Perubahan Pengaturan</span>
            </button>

          </form>
        </div>

        {/* Right Column (6 cols): System Audit Logs */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-800" />
              Log Aktivitas & Audit Sistem ({auditLogs.length} Catatan)
            </h3>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs space-y-1">
                <div className="flex justify-between items-center text-slate-500">
                  <span className="font-semibold text-slate-900">{log.actorName}</span>
                  <span className="font-mono text-[10px]">{new Date(log.timestamp).toLocaleString('id-ID')}</span>
                </div>
                <div className="font-bold text-sky-950">{log.action}</div>
                {log.details && (
                  <p className="text-slate-600 text-[11px]">{log.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {auditModalOpen && (
        <SystemAuditModal onClose={() => setAuditModalOpen(false)} />
      )}
    </div>
  );
};
