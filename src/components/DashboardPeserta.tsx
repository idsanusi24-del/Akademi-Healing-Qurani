import React, { useState, useEffect } from 'react';
import { UserProfile, CurriculumDay, Assessment } from '../types';
import { StorageService } from '../services/storageService';
import { DailyMutabaah } from './DailyMutabaah';
import { AcademicTranscriptModal } from './AcademicTranscriptModal';
import { WhatsAppBroadcastHub } from './WhatsAppBroadcastHub';
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles,
  Flame,
  Star,
  Lock,
  Cloud,
  RefreshCw,
  Download,
  Upload,
  Wifi,
  Check,
  Share2
} from 'lucide-react';

interface DashboardPesertaProps {
  currentUser: UserProfile;
  currentDay: number;
  allDays: CurriculumDay[];
  assessments: Assessment[];
  onOpenLesson: (dayNumber: number) => void;
  onOpenAssessment: (assessmentId: string) => void;
  onOpenCertificate: () => void;
  onOpenJournalModal: (dayNumber: number) => void;
}

export const DashboardPeserta: React.FC<DashboardPesertaProps> = ({
  currentUser,
  currentDay,
  allDays,
  assessments,
  onOpenLesson,
  onOpenAssessment,
  onOpenCertificate,
  onOpenJournalModal
}) => {
  // Live countdown to next 23:59 WIB
  const [countdownText, setCountdownText] = useState('');
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [evalTab, setEvalTab] = useState<'all' | 'mingguan' | 'bulanan' | 'akhir'>('all');
  const [showWaModal, setShowWaModal] = useState(false);

  // Cloud & Online Sync State
  const [serverStatus, setServerStatus] = useState<{ online: boolean; wibTime?: string; latencyMs?: number } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => StorageService.getLastCloudSyncTime(currentUser.id));

  useEffect(() => {
    const updateCountdown = () => {
      const wibNow = StorageService.getWibNow();
      const nextUnlockWib = StorageService.getNextUnlockTimeWib();

      const diffMs = nextUnlockWib.getTime() - wibNow.getTime();
      if (diffMs <= 0) {
        setCountdownText('Materi Terbuka!');
        return;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setCountdownText(
        `${String(hours).padStart(2, '0')}j ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}d`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Online Server Health Check
  useEffect(() => {
    StorageService.checkServerHealth().then(status => setServerStatus(status));
    const interval = setInterval(() => {
      StorageService.checkServerHealth().then(status => setServerStatus(status));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // Cloud Sync Handlers
  const handleSyncCloud = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    const res = await StorageService.syncToCloud(currentUser.id);
    setIsSyncing(false);
    if (res.success) {
      setLastSyncTime(res.syncedAt || new Date().toISOString());
      setSyncFeedback({ type: 'success', text: 'Data progres belajar dan evaluasi berhasil disimpan ke server cloud.' });
    } else {
      setSyncFeedback({ type: 'error', text: res.message });
    }
    setTimeout(() => setSyncFeedback(null), 4000);
  };

  const handleRestoreCloud = async () => {
    if (!window.confirm('Pulihkan data dari cloud? Data belajar di perangkat ini akan disinkronkan dengan data cadangan di server.')) {
      return;
    }
    setIsSyncing(true);
    setSyncFeedback(null);
    const res = await StorageService.restoreFromCloud(currentUser.id);
    setIsSyncing(false);
    if (res.success) {
      setSyncFeedback({ type: 'success', text: res.message });
      setTimeout(() => window.location.reload(), 900);
    } else {
      setSyncFeedback({ type: 'error', text: res.message });
    }
  };

  const handleExportJson = () => {
    const jsonStr = StorageService.exportBackupJson(currentUser.id, currentUser.fullName);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cadangan-menata-hidup-${currentUser.fullName.replace(/\s+/g, '_')}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSyncFeedback({ type: 'success', text: 'File cadangan JSON berhasil diunduh ke perangkat Anda.' });
    setTimeout(() => setSyncFeedback(null), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = StorageService.importBackupJson(currentUser.id, content);
      if (res.success) {
        setSyncFeedback({ type: 'success', text: 'File cadangan berhasil diimpor! Memperbarui tampilan...' });
        setTimeout(() => window.location.reload(), 900);
      } else {
        setSyncFeedback({ type: 'error', text: res.message });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const progress = StorageService.getProgress(currentUser.id);
  const journals = StorageService.getJournals(currentUser.id);
  const attempts = StorageService.getAssessmentAttempts(currentUser.id);
  const academicSummary = StorageService.calculateAcademicSummary(currentUser.id);
  const certificates = StorageService.getCertificates().filter(c => c.participantId === currentUser.id);
  const hasCertificate = certificates.length > 0;

  const todayLesson = allDays.find(d => d.dayNumber === currentDay) || allDays[0];
  const isTodayCompleted = progress.some(p => p.dayNumber === currentDay && p.completed);

  // Completed days streak calculation
  const completedCount = progress.filter(p => p.completed).length;

  // Subject completion stats
  const subjectProgress = [
    { id: 'aqidah', name: 'Aqidah Islamiyah', total: 15 },
    { id: 'akhlak', name: 'Akhlak & Adab', total: 15 },
    { id: 'hadis', name: 'Hadis & Sunnah', total: 15 },
    { id: 'tazkiyatun_nafs', name: 'Tazkiyatun Nafs', total: 15 },
    { id: 'fikih', name: 'Fikih Ibadah', total: 15 },
    { id: 'muamalah', name: 'Muamalah Islamiyah', total: 15 }
  ].map(s => {
    const subDays = allDays.filter(d => d.subjectId === s.id && d.dayNumber <= currentDay);
    const completedSub = progress.filter(p => p.completed && subDays.some(sd => sd.dayNumber === p.dayNumber)).length;
    const percentage = subDays.length > 0 ? Math.round((completedSub / subDays.length) * 100) : 0;
    return { ...s, completedSub, totalAvailable: subDays.length, percentage };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FBF9F5]">
      
      {/* Motivasi Istiqomah Banner (Clean Museum Card) */}
      <div className="bg-white border border-[#E7E5E4] rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-museum-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#F5F2EB] text-[#B4863A] flex items-center justify-center font-bold shrink-0">
            <Flame className="w-5 h-5 text-[#B4863A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#78716C] font-semibold font-sans-body">
                Penyemangat Istiqomah:
              </span>
              <span className="text-xs font-mono font-semibold text-[#0A192F]">
                {completedCount} Hari Tuntas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#44403C] font-serif-display italic mt-0.5">
              "Amalan yang paling dicintai oleh Allah adalah amalan yang kontinu (istiqomah) walaupun sedikit." (HR. Bukhari & Muslim)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 shrink-0 text-xs font-sans-body">
          <div className="text-center">
            <span className="text-[#78716C] block text-[10px]">Jurnal</span>
            <span className="text-[#0A192F] font-bold font-mono text-sm">{journals.length}</span>
          </div>
          <div className="text-center">
            <span className="text-[#78716C] block text-[10px]">Ujian</span>
            <span className="text-[#0A192F] font-bold font-mono text-sm">{attempts.length}</span>
          </div>
        </div>
      </div>

      {/* Participant Profile Banner in Nocturne Navy (#0A192F) */}
      <div className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 shadow-museum-md border border-[#1E3A5F] relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B4863A] tracking-wider uppercase font-sans-body">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portal Akademik Resmi Peserta Bimbingan Belajar</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif-display font-medium tracking-tight text-white">
              Ahlan wa Sahlan, {currentUser.fullName}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#A8A29E] font-sans-body">
              <span>No. Peserta: <strong className="text-white font-mono">{currentUser.participantNumber || 'MH-2026-0042'}</strong></span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Periode: <strong className="text-white">Angkatan I (1448 H / 2026 M)</strong></span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Pembimbing: <strong className="text-[#D6CEBE]">Dr. Abdullah Karim, Lc., M.A.</strong></span>
            </div>
          </div>

          {/* Current Day Status Box with 23:59 WIB target */}
          <div className="bg-[#132A4A] border border-[#2B4B75] rounded-xl p-4 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-lg bg-[#B4863A] text-[#0A192F] font-bold text-xl flex items-center justify-center font-mono shadow-xs">
              {currentDay}
            </div>
            <div className="text-xs font-sans-body leading-tight">
              <span className="text-[#A8A29E] block text-[10px] uppercase tracking-wider">Status:</span>
              <span className="text-white font-semibold text-sm block">Hari ke-{currentDay} dari 90</span>
              <div className="flex items-center gap-1.5 text-[11px] text-[#D6CEBE] mt-1 font-mono">
                <Clock className="w-3 h-3 text-[#B4863A]" />
                <span>Hari {currentDay + 1} buka: <strong className="text-white">{countdownText}</strong> (23.59 WIB)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Main Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Today's Lesson, Evaluations, and Subject Progress */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Today's Scheduled Lesson Card in Museum White */}
          <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 sm:p-7 shadow-museum-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4] text-xs text-[#78716C] mb-4 font-sans-body">
              <span className="font-semibold text-[#0A192F] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B4863A]" />
                Materi Hari Ini (Hari ke-{currentDay})
              </span>
              <span className="capitalize font-medium text-[#B4863A]">
                {todayLesson.subjectId.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <h2 className="text-xl font-serif-display font-medium text-[#0A192F] leading-snug">
                {todayLesson.title}
              </h2>
              <div className="py-2.5 border-y border-[#F5F2EB]">
                <p className="text-xs font-serif-display italic text-[#44403C]">
                  "{todayLesson.theme}"
                </p>
              </div>
              <p className="text-xs sm:text-sm text-[#57534E] line-clamp-2 pt-1 font-sans-body leading-relaxed">
                {todayLesson.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E7E5E4] font-sans-body">
              <div>
                {isTodayCompleted ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[#0D766E]">
                    <CheckCircle2 className="w-4 h-4" />
                    Pelajaran Telah Diselesaikan
                  </span>
                ) : (
                  <span className="text-xs text-[#78716C]">
                    Belum ditandai selesai. Luangkan 15-20 menit untuk menyimak dan merenungi.
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowWaModal(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-300 cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Bagikan ringkasan materi hari ini ke WhatsApp Grup"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Kirim ke WhatsApp</span>
                </button>
                <button
                  onClick={() => onOpenJournalModal(currentDay)}
                  className="px-4 py-2 text-xs font-medium text-[#44403C] hover:text-[#0A192F] bg-[#F5F2EB] hover:bg-[#EBE6DF] rounded-lg transition-colors cursor-pointer"
                >
                  Tulis Jurnal
                </button>
                <button
                  onClick={() => onOpenLesson(currentDay)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-[#132A4A] rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Buka Modul Hari Ini</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B4863A]" />
                </button>
              </div>
            </div>
          </div>

          {/* Daily Sunnah & Worship Tracker */}
          <DailyMutabaah
            currentDay={currentDay}
            participantId={currentUser.id}
          />

          {/* Pending Weekly / Monthly Evaluations Card in White */}
          {/* Comprehensive Weekly, Monthly & Final Evaluations Card in White */}
          <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-museum-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E7E5E4] gap-2 mb-4 font-sans-body">
              <div>
                <h3 className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#B4863A]" />
                  <span>Agenda Evaluasi Akademik (Pekanan, Bulanan & Akhir)</span>
                </h3>
                <p className="text-[11px] text-[#78716C] mt-0.5">
                  Soal Pilihan Ganda · Dibuka resmi pukul 23.50 WIB pada hari pelaksanaan
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 rounded-lg border border-[#E7E5E4] self-start sm:self-auto">
                <button
                  onClick={() => setEvalTab('all')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                    evalTab === 'all'
                      ? 'bg-white text-[#0A192F] shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#0A192F]'
                  }`}
                >
                  Semua ({assessments.length})
                </button>
                <button
                  onClick={() => setEvalTab('mingguan')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                    evalTab === 'mingguan'
                      ? 'bg-white text-[#0A192F] shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#0A192F]'
                  }`}
                >
                  Pekanan (12)
                </button>
                <button
                  onClick={() => setEvalTab('bulanan')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                    evalTab === 'bulanan'
                      ? 'bg-white text-[#0A192F] shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#0A192F]'
                  }`}
                >
                  Bulanan (2)
                </button>
                <button
                  onClick={() => setEvalTab('akhir')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                    evalTab === 'akhir'
                      ? 'bg-white text-[#0A192F] shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#0A192F]'
                  }`}
                >
                  Ujian Akhir (1)
                </button>
              </div>
            </div>

            {/* Assessment Rules Info Banner */}
            <div className="p-3 bg-[#FBF9F5] border border-[#E7E5E4] rounded-lg text-[11px] text-[#57534E] flex items-center gap-2.5 mb-4 font-sans-body">
              <Lock className="w-4 h-4 text-[#B4863A] shrink-0" />
              <span>
                <strong>Aturan Akses:</strong> Seluruh evaluasi dalam keadaan terkunci sebelum waktunya dan dibuka resmi pada <strong>pukul 23.50 WIB</strong> di akhir pekan, akhir bulan, dan akhir pembelajaran.
              </span>
            </div>

            {/* Assessment Items */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {assessments
                .filter(a => evalTab === 'all' || a.assessmentType === evalTab)
                .map((assessment) => {
                  const attempt = attempts.find(a => a.assessmentId === assessment.id);
                  const isUnlocked = StorageService.isAssessmentUnlocked(assessment);
                  const isFinal = assessment.assessmentType === 'akhir';
                  const isMonthly = assessment.assessmentType === 'bulanan';

                  return (
                    <div
                      key={assessment.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isFinal
                          ? 'border-[#B4863A] bg-linear-to-r from-[#FBF9F5] to-amber-50/40 shadow-xs'
                          : 'border-[#E7E5E4] bg-[#FBF9F5] hover:border-[#B4863A]'
                      } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                            isFinal
                              ? 'bg-[#0A192F] text-[#B4863A]'
                              : isMonthly
                              ? 'bg-[#0D766E]/10 text-[#0D766E]'
                              : 'bg-[#B4863A]/15 text-[#8F6626]'
                          }`}>
                            {isFinal ? 'Ujian Akhir' : isMonthly ? 'Evaluasi Bulanan' : 'Evaluasi Pekanan'}
                          </span>
                          <span className="text-[10px] text-[#78716C] font-mono font-medium">
                            Hari ke-{assessment.dayNumber}
                          </span>
                          <span className="text-[10px] text-[#0A192F] font-medium bg-[#E7E5E4]/60 px-2 py-0.5 rounded-full">
                            {assessment.questions.length} Soal PG
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-[#0A192F] leading-snug">
                          {assessment.title}
                        </h4>

                        <p className="text-[11px] text-[#78716C]">
                          Durasi: {assessment.durationMinutes} Menit · Standar Kelulusan (KKM): {assessment.passingScore}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 font-sans-body">
                        {attempt ? (
                          <div className="text-right">
                            <span className="text-xs font-semibold text-[#0D766E] block font-mono">
                              Nilai: {attempt.totalScore} / {assessment.maxScore}
                            </span>
                            <button
                              onClick={() => onOpenAssessment(assessment.id)}
                              className="text-[11px] font-medium text-[#0A192F] hover:text-[#B4863A] underline cursor-pointer mt-0.5 block"
                            >
                              Tinjau Hasil
                            </button>
                          </div>
                        ) : isUnlocked ? (
                          <button
                            onClick={() => onOpenAssessment(assessment.id)}
                            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-[#132A4A] rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Mulai Evaluasi</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#B4863A]" />
                          </button>
                        ) : (
                          <button
                            onClick={() => onOpenAssessment(assessment.id)}
                            className="px-3.5 py-1.5 text-xs text-[#78716C] hover:text-[#0A192F] bg-[#EBE6DF]/80 hover:bg-[#EBE6DF] border border-[#D6D3D1] rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                            title="Klik untuk melihat jadwal pembukaan pukul 23.50 WIB"
                          >
                            <Lock className="w-3.5 h-3.5 text-[#B4863A]" />
                            <span>Terkunci · Buka 23.50 WIB</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>


          {/* Progress per Subject */}
          <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-museum-sm">
            <h3 className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider mb-4 flex items-center justify-between font-sans-body">
              <span>Perkembangan 6 Mata Pelajaran Inti</span>
              <span className="text-[11px] font-normal text-[#78716C]">Target 15 Hari per Mapel</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjectProgress.map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-lg border border-[#E7E5E4] bg-[#FBF9F5]">
                  <div className="flex justify-between items-center text-xs mb-1.5 font-sans-body">
                    <span className="font-medium text-[#0A192F]">{sub.name}</span>
                    <span className="font-mono text-[#B4863A] font-semibold">{sub.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E7E5E4] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B4863A] transition-all duration-300"
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[#78716C] mt-1.5 flex justify-between font-sans-body">
                    <span>Selesai: {sub.completedSub} dari {sub.totalAvailable} materi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Academic Gradebook, Certificate Status, and Mentor Notes */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Overall 90-Day Progress Bar */}
          <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-museum-sm">
            <h3 className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider mb-2 font-sans-body">
              Progres 90 Hari Belajar
            </h3>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-serif-display font-medium text-[#0A192F] font-mono">
                {academicSummary.completedDaysCount}
                <span className="text-xs font-normal text-[#78716C]"> / 90 Hari</span>
              </span>
              <span className="text-sm font-semibold text-[#B4863A] font-mono">
                {academicSummary.completionPercentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#F5F2EB] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#0A192F] to-[#B4863A] transition-all duration-500"
                style={{ width: `${academicSummary.completionPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-[#78716C] leading-relaxed font-sans-body">
              Standar kelulusan menyaratkan minimal 80% materi harian telah diselesaikan secara sah.
            </p>
          </div>

          {/* Academic Grade Breakdown */}
          <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-museum-sm space-y-4 font-sans-body">
            <h3 className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider pb-2 border-b border-[#E7E5E4] flex items-center justify-between">
              <span>Rekapitulasi Nilai Akademik</span>
              <span className="text-[10px] font-mono text-[#B4863A] font-semibold">Resmi</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#57534E]">Evaluasi Mingguan (25%):</span>
                <span className="font-mono font-semibold text-[#0A192F]">{academicSummary.weeklyAvg}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#57534E]">Evaluasi Bulanan (30%):</span>
                <span className="font-mono font-semibold text-[#0A192F]">{academicSummary.monthlyAvg}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#57534E]">Tugas & Jurnal Praktik (20%):</span>
                <span className="font-mono font-semibold text-[#0A192F]">{academicSummary.tasksScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#57534E]">Evaluasi Akhir Hari ke-90 (25%):</span>
                <span className="font-mono font-semibold text-[#0A192F]">{academicSummary.finalScore}</span>
              </div>

              <div className="pt-3 border-t border-[#E7E5E4] flex justify-between items-center">
                <div>
                  <span className="font-semibold text-[#0A192F] block">Nilai Komposit:</span>
                  <span className="text-[10px] text-[#B4863A]">Predikat: {academicSummary.predicate}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif-display font-medium text-[#0A192F] font-mono">
                    {academicSummary.compositeScore}
                  </span>
                  <span className="text-xs text-[#78716C]"> / 100</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#FBF9F5] border border-[#E7E5E4] text-xs text-[#0A192F]">
              <div className="font-semibold mb-0.5 text-[#B4863A]">Kriteria Kelulusan:</div>
              <p className="text-[11px] text-[#57534E] leading-tight">
                Nilai minimal 75, materi minimal 80%, seluruh evaluasi diikuti, dan diverifikasi pembimbing.
              </p>
            </div>
          </div>

          {/* Certificate Action Card */}
          <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-museum-sm">
            <div className="w-10 h-10 rounded-lg bg-[#F5F2EB] text-[#B4863A] flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-serif-display font-medium text-[#0A192F]">
              Sertifikat Kelulusan Resmi
            </h3>
            <p className="text-xs text-[#57534E] mt-1 mb-4 leading-relaxed font-sans-body">
              {hasCertificate
                ? 'Alhamdulillah, sertifikat kelulusan resmi Anda telah disahkan oleh pembimbing dan siap diunduh lengkap dengan kode QR verifikasi.'
                : 'Sertifikat akan diterbitkan setelah verifikasi kelulusan oleh pembimbing.'}
            </p>

            {hasCertificate ? (
              <div className="space-y-2 font-sans-body">
                <button
                  type="button"
                  onClick={onOpenCertificate}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Award className="w-4 h-4 text-[#B4863A]" />
                  <span>Lihat & Unduh Sertifikat Resmi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowTranscriptModal(true)}
                  className="w-full py-2 px-4 rounded-lg bg-[#F5F2EB] hover:bg-[#EBE6DF] text-[#0A192F] text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Cetak Transkrip Nilai Akademik</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 font-sans-body">
                <button
                  disabled
                  className="w-full py-2 px-4 rounded-lg bg-[#F5F2EB] text-[#A8A29E] text-xs font-medium cursor-not-allowed"
                >
                  Menunggu Selesai Seluruh Program
                </button>
                <button
                  type="button"
                  onClick={() => setShowTranscriptModal(true)}
                  className="w-full py-2 px-4 rounded-lg bg-[#F5F2EB] hover:bg-[#EBE6DF] text-[#0A192F] text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#B4863A]" />
                  <span>Pratinjau Transkrip Nilai Sementara</span>
                </button>
              </div>
            )}
          </div>

          {/* Mentor Feedback & Notes */}
          <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-museum-sm space-y-3 font-sans-body">
            <h3 className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#B4863A]" />
              Catatan & Nasihat Pembimbing
            </h3>
            <div className="p-3 bg-[#FBF9F5] rounded-lg border border-[#E7E5E4] text-xs text-[#44403C] leading-relaxed italic font-serif-display">
              "Pertahankan konsistensi ibadah harian dan jagalah keikhlasan niat. Jangan biarkan waktu luang berlalu tanpa dzikir dan muhasabah."
            </div>
            <div className="text-[11px] text-[#B4863A] font-medium text-right font-sans-body">
              — Dr. Abdullah Karim, Lc., M.A.
            </div>
          </div>

          {/* Online Connectivity & Cloud Sync Card */}
          <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-museum-sm space-y-4 font-sans-body">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F5F2EB] text-[#B4863A] flex items-center justify-center">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider">
                    Koneksi Online & Cloud
                  </h3>
                  <p className="text-[10px] text-[#78716C]">
                    Sinkronisasi data lintas perangkat
                  </p>
                </div>
              </div>

              {serverStatus?.online ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Server Aktif
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                  <Wifi className="w-3 h-3 text-stone-500" />
                  Mode Lokal
                </span>
              )}
            </div>

            <p className="text-xs text-[#57534E] leading-relaxed">
              Aplikasi ini <strong>aktif dan dapat digunakan secara online</strong>. Seluruh progres belajar, jurnal refleksi, dan 210 bank soal evaluasi dapat disinkronkan ke server cloud atau dicadangkan ke file JSON.
            </p>

            {/* Sync Feedback Message */}
            {syncFeedback && (
              <div
                className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                  syncFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {syncFeedback.type === 'success' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : null}
                <span>{syncFeedback.text}</span>
              </div>
            )}

            <div className="text-[11px] text-[#78716C] flex items-center justify-between">
              <span>Status Cloud:</span>
              <span className="font-medium text-[#0A192F]">
                {lastSyncTime
                  ? `Tersinkron: ${new Date(lastSyncTime).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}`
                  : 'Belum disinkronkan'}
              </span>
            </div>

            {/* Cloud Sync Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleSyncCloud}
                disabled={isSyncing}
                className="w-full py-2.5 px-3 rounded-lg bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#B4863A] ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan ke Cloud Server'}</span>
              </button>

              <button
                type="button"
                onClick={handleRestoreCloud}
                disabled={isSyncing}
                className="w-full py-2 px-3 rounded-lg bg-[#F5F2EB] hover:bg-[#EBE6DF] text-[#0A192F] text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#B4863A]" />
                <span>Pulihkan Data dari Cloud</span>
              </button>

              {/* Offline JSON Backup / Restore */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="py-1.5 px-2 rounded-lg bg-white border border-[#E7E5E4] hover:bg-[#FBF9F5] text-[11px] text-[#44403C] hover:text-[#0A192F] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  title="Unduh cadangan data lengkap berupa file JSON"
                >
                  <Download className="w-3 h-3 text-[#78716C]" />
                  <span>Unduh JSON</span>
                </button>

                <label className="py-1.5 px-2 rounded-lg bg-white border border-[#E7E5E4] hover:bg-[#FBF9F5] text-[11px] text-[#44403C] hover:text-[#0A192F] transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                  <Upload className="w-3 h-3 text-[#78716C]" />
                  <span>Impor JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

        </div>

      </div>

      {showTranscriptModal && (
        <AcademicTranscriptModal
          participant={currentUser}
          config={StorageService.getConfig()}
          onClose={() => setShowTranscriptModal(false)}
        />
      )}

      {/* WhatsApp Broadcast Modal */}
      {showWaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="max-w-3xl w-full my-8">
            <WhatsAppBroadcastHub
              currentDay={todayLesson}
              allDays={allDays}
              isAdmin={currentUser.role === 'super_admin' || currentUser.role === 'admin_akademik'}
              onClose={() => setShowWaModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
