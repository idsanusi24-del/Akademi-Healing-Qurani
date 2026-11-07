import React, { useState } from 'react';
import { CurriculumDay } from '../types';
import {
  ArrowLeft,
  Lock,
  Clock,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  PenTool,
  AlertTriangle,
  Lightbulb,
  Check,
  FileText,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Star,
  Sun,
  Moon,
  Sparkles,
  Share2
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { WhatsAppBroadcastHub } from './WhatsAppBroadcastHub';

interface LessonViewerProps {
  day: CurriculumDay;
  isCompleted: boolean;
  participantId?: string;
  onBack: () => void;
  onMarkComplete: (score: number) => void;
  onOpenJournal: () => void;
  onNextDay?: () => void;
  onPrevDay?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  day,
  isCompleted,
  participantId = 'usr-peserta-1',
  onBack,
  onMarkComplete,
  onOpenJournal,
  onNextDay,
  onPrevDay,
  hasNext,
  hasPrev
}) => {
  const isUnlocked = StorageService.isDayUnlocked(day.dayNumber);

  // Reading Preferences & State
  const initialPrefs = StorageService.getReadingPrefs();
  const [readingTheme, setReadingTheme] = useState<'default' | 'sepia' | 'dark'>(initialPrefs.theme);
  const [arabicFontSize, setArabicFontSize] = useState<'text-2xl' | 'text-3xl' | 'text-4xl'>(initialPrefs.arabicSize);
  const [latinSize, setLatinSize] = useState<'sm' | 'base' | 'lg'>(initialPrefs.latinSize);
  const [audioSpeed, setAudioSpeed] = useState<number>(initialPrefs.speechRate);
  
  // Bookmarking
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    const list = StorageService.getBookmarks(participantId);
    return list.includes(day.dayNumber);
  });

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [copiedDalil, setCopiedDalil] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // Locked State Guard: Materi dalam keadaan terkunci sebelum waktunya
  if (!isUnlocked) {
    return (
      <div className="min-h-screen py-16 px-4 sm:px-6 bg-[#FBF9F5] flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-[#E7E5E4] p-8 sm:p-10 text-center space-y-6 shadow-museum-md">
          <div className="w-16 h-16 rounded-2xl bg-[#F5F2EB] text-[#B4863A] flex items-center justify-center mx-auto border border-[#D6CEBE]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-[#B4863A] font-semibold font-sans-body">
              Materi Belum Terbuka
            </span>
            <h2 className="text-2xl font-serif-display font-medium text-[#0A192F]">
              Materi Hari ke-{day.dayNumber} Masih Terkunci
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-sans-body">
              Materi pembelajaran harian dalam keadaan terkunci sebelum waktunya. Materi dibuka mulai pukul <strong className="text-[#0A192F]">23.59 WIB</strong> dan seterusnya.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E7E5E4] text-xs text-[#44403C] space-y-1 font-sans-body">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-[#0A192F]">
              <Clock className="w-4 h-4 text-[#B4863A]" />
              <span>Jadwal Pembukaan: Pukul 23.59 WIB</span>
            </div>
            <p className="text-[11px] text-[#78716C] leading-snug">
              Kurikulum 90 hari dirancang berurutan agar setiap materi dapat dipelajari, direnungkan, dan diamalkan secara bertahap tanpa tergesa-gesa.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-sans-body">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              Kembali ke Kurikulum
            </button>
            {hasPrev && onPrevDay && (
              <button
                onClick={onPrevDay}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F5F2EB] hover:bg-[#EBE6DF] text-[#0A192F] text-xs font-medium border border-[#D6CEBE] transition-colors cursor-pointer"
              >
                Buka Hari Sebelumnya
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const toggleBookmark = () => {
    const newState = StorageService.toggleBookmark(participantId, day.dayNumber);
    setIsBookmarked(newState);
  };

  const handleThemeChange = (newTheme: 'default' | 'sepia' | 'dark') => {
    setReadingTheme(newTheme);
    StorageService.saveReadingPrefs({ theme: newTheme });
  };

  const toggleRecitation = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const text = day.quranDalil[0]?.arabicText || '';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = audioSpeed;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  const quiz = day.quizQuestions[0];
  const isQuizCorrect = selectedQuizAnswer === quiz?.correctOptionIndex;

  const handleCopyAyah = (arabic: string, refText: string) => {
    navigator.clipboard.writeText(`${arabic}\n\n${refText}`);
    setCopiedDalil(refText);
    setTimeout(() => setCopiedDalil(null), 2500);
  };

  const handleCompleteLesson = () => {
    const score = quizSubmitted ? (isQuizCorrect ? 100 : 70) : 100;
    onMarkComplete(score);
  };

  // Theme-aware styles
  const themeClasses = {
    default: 'bg-[#FAF8F5] text-stone-900 border-stone-200',
    sepia: 'bg-[#FAF5E8] text-[#3A332A] border-[#E8DEC8]',
    dark: 'bg-[#181716] text-[#EDE7DE] border-[#312C28]'
  }[readingTheme];

  const cardClasses = {
    default: 'bg-white border-stone-200 text-stone-900',
    sepia: 'bg-[#FFFDF7] border-[#E5DAC4] text-[#3A332A]',
    dark: 'bg-[#22201E] border-[#38332E] text-[#EDE7DE]'
  }[readingTheme];

  return (
    <article className={`min-h-screen py-8 px-4 sm:px-6 transition-colors duration-200 ${themeClasses}`}>
      <div className="max-w-4xl mx-auto space-y-6">
      
        {/* Top Navigation & Reading Experience Toolbar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${readingTheme === 'dark' ? 'border-stone-800' : 'border-stone-200'}`}>
          <button
            onClick={onBack}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              readingTheme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-600 hover:text-emerald-950'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Kurikulum</span>
          </button>

          {/* Reading Preferences Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Bookmark Button */}
            <button
              onClick={toggleBookmark}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isBookmarked
                  ? 'bg-amber-100 border-amber-300 text-amber-950'
                  : readingTheme === 'dark'
                  ? 'bg-stone-800 border-stone-700 text-stone-300 hover:text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:border-amber-400'
              }`}
              title="Simpan modul ini ke daftar favorit"
            >
              <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isBookmarked ? 'Tersimpan' : 'Tandai Favorit'}</span>
            </button>

            {/* WhatsApp Share Button */}
            <button
              onClick={() => setShowWhatsAppModal(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-[#25D366]/10 text-emerald-800 border border-emerald-300 hover:bg-[#25D366]/20 transition-colors cursor-pointer"
              title="Kirim intisari materi hari ini ke WhatsApp Grup"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kirim ke WhatsApp</span>
            </button>

            {/* Reading Theme Selector */}
            <div className={`flex items-center rounded-lg border overflow-hidden p-0.5 text-xs ${
              readingTheme === 'dark' ? 'border-stone-700 bg-stone-900' : 'border-stone-300 bg-white'
            }`}>
              <button
                onClick={() => handleThemeChange('default')}
                className={`p-1.5 rounded transition-colors ${readingTheme === 'default' ? 'bg-stone-200 font-bold text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
                title="Mode Terang Standar"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleThemeChange('sepia')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${readingTheme === 'sepia' ? 'bg-amber-200 font-bold text-amber-950' : 'text-stone-500 hover:text-amber-900'}`}
                title="Mode Kertas Alami / Sepia"
              >
                Sepia
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-1.5 rounded transition-colors ${readingTheme === 'dark' ? 'bg-stone-700 font-bold text-amber-300' : 'text-stone-500 hover:text-stone-900'}`}
                title="Mode Khusyuk / Malam"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Prev & Next Day Navigation */}
            <div className="flex items-center gap-1.5">
              {hasPrev && (
                <button
                  onClick={onPrevDay}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    readingTheme === 'dark' ? 'border-stone-700 bg-stone-850 text-stone-300 hover:bg-stone-800' : 'border-stone-300 bg-white hover:bg-stone-50'
                  }`}
                >
                  ← H-{day.dayNumber - 1}
                </button>
              )}
              {hasNext && (
                <button
                  onClick={onNextDay}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    readingTheme === 'dark' ? 'border-stone-700 bg-stone-850 text-stone-300 hover:bg-stone-800' : 'border-stone-300 bg-white hover:bg-stone-50'
                  }`}
                >
                  H-{day.dayNumber + 1} →
                </button>
              )}
            </div>

          </div>
        </div>

      {/* Lesson Header */}
      <header className="mb-8 space-y-3">
        
        {/* Unboxed metadata line */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="text-sky-900 font-bold font-mono">HARI KE-{day.dayNumber} DARI 90 HARI</span>
          <span aria-hidden="true">·</span>
          <span>Pekan ke-{day.weekNumber}</span>
          <span aria-hidden="true">·</span>
          <span>Bulan ke-{day.monthNumber}</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{day.subjectId.replace('_', ' ')}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
          {day.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 font-medium italic border-l-2 border-sky-700/60 pl-3">
          Tema: {day.theme}
        </p>

        {isCompleted && (
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-sky-800">
            <CheckCircle2 className="w-4 h-4 text-sky-700" />
            <span>Materi ini telah Anda tandai selesai dan tersimpan di riwayat akademik.</span>
          </div>
        )}
      </header>

      {/* 1. Tujuan & Capaian Pembelajaran */}
      <section className="bg-white rounded-xl border border-stone-200 p-5 mb-8 shadow-xs">
        <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
          Tujuan & Capaian Pembelajaran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700">
          <div>
            <span className="font-semibold text-emerald-950 block mb-1.5">Tujuan Pembelajaran:</span>
            <ul className="space-y-1.5 list-disc pl-4 text-stone-600">
              {day.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-emerald-950 block mb-1.5">Capaian Kompetensi:</span>
            <ul className="space-y-1.5 list-disc pl-4 text-stone-600">
              {day.competencies.map((comp, i) => (
                <li key={i}>{comp}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Dalil Al-Qur'an (Arabic with Amiri font & Translation) */}
      {day.quranDalil && day.quranDalil.length > 0 && (
        <section className="mb-8 bg-[#FBF9F5] border border-amber-900/15 rounded-xl p-6 relative overflow-hidden">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span>Dalil Al-Qur'an al-Karim</span>
              <span className="font-normal text-stone-500">
                · QS. {day.quranDalil[0].surahName} [{day.quranDalil[0].surahNumber}]: {day.quranDalil[0].ayahNumber}
              </span>
            </div>

            {/* Audio Recitation & Font Size Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleRecitation}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-700 text-white shadow-xs animate-pulse'
                    : 'bg-white border border-stone-300 text-stone-700 hover:border-amber-800 hover:text-amber-900'
                }`}
                title="Dengarkan pelafalan tilawah ayat"
              >
                {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Hentikan Tilawah' : 'Dengarkan Tilawah'}</span>
              </button>

              <div className="flex items-center rounded-md border border-stone-300 bg-white overflow-hidden text-[10px] font-mono">
                <button
                  onClick={() => setArabicFontSize('text-2xl')}
                  className={`px-2 py-0.5 ${arabicFontSize === 'text-2xl' ? 'bg-amber-100 font-bold text-amber-900' : 'text-stone-600 hover:bg-stone-50'}`}
                  title="Ukuran Standar"
                >
                  A
                </button>
                <button
                  onClick={() => setArabicFontSize('text-3xl')}
                  className={`px-2 py-0.5 border-l border-stone-200 ${arabicFontSize === 'text-3xl' ? 'bg-amber-100 font-bold text-amber-900' : 'text-stone-600 hover:bg-stone-50'}`}
                  title="Ukuran Besar"
                >
                  A+
                </button>
                <button
                  onClick={() => setArabicFontSize('text-4xl')}
                  className={`px-2 py-0.5 border-l border-stone-200 ${arabicFontSize === 'text-4xl' ? 'bg-amber-100 font-bold text-amber-900' : 'text-stone-600 hover:bg-stone-50'}`}
                  title="Ukuran Sangat Besar"
                >
                  A++
                </button>
              </div>
            </div>
          </div>

          {/* Arabic Text in Amiri Typography with dynamic sizing */}
          <div className={`font-arabic ${arabicFontSize} text-stone-900 leading-[2.5] text-right mb-4 selection:bg-amber-200`}>
            {day.quranDalil[0].arabicText}
          </div>

          {/* Indonesian Translation */}
          <div className="text-sm text-stone-700 leading-relaxed border-t border-amber-900/10 pt-3 italic">
            "{day.quranDalil[0].translation}"
          </div>

          <div className="mt-3 flex items-center justify-end">
            <button
              onClick={() => handleCopyAyah(
                day.quranDalil[0].arabicText,
                `QS. ${day.quranDalil[0].surahName}: ${day.quranDalil[0].ayahNumber}`
              )}
              className="text-xs text-stone-500 hover:text-emerald-900 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedDalil ? 'Tersalin!' : 'Salin Ayat & Terjemah'}</span>
            </button>
          </div>
        </section>
      )}

      {/* 3. Hadis Rasulullah shallallahu alaihi wasallam */}
      {day.hadithDalil && day.hadithDalil.length > 0 && (
        <section className="mb-8 bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 uppercase tracking-wider mb-4">
            <span>Hadis Nabawi yang Shahih</span>
            <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Derajat: {day.hadithDalil[0].grade}
            </span>
          </div>

          {day.hadithDalil[0].arabicText && (
            <div className="font-arabic text-xl sm:text-2xl text-stone-800 text-right leading-[2.2] mb-3">
              {day.hadithDalil[0].arabicText}
            </div>
          )}

          <p className="text-sm text-stone-700 leading-relaxed italic mb-3">
            "{day.hadithDalil[0].translation}"
          </p>

          <p className="text-xs text-stone-500 border-t border-stone-100 pt-2 font-mono">
            Sumber: {day.hadithDalil[0].kitab} ({day.hadithDalil[0].gradeSource})
          </p>
        </section>
      )}

      {/* 4. Materi Inti yang Terstruktur */}
      <section className="mb-8 prose prose-stone max-w-none text-sm sm:text-base text-stone-800 leading-relaxed space-y-4">
        <h2 className="text-lg font-bold text-stone-900 tracking-tight not-prose mb-2">
          Uraian dan Pembahasan Materi
        </h2>
        <div className="whitespace-pre-line text-stone-700 leading-relaxed bg-white p-6 rounded-xl border border-stone-200">
          {day.contentMarkdown}
        </div>
      </section>

      {/* 5. Penjelasan Ulama & Referensi Mu'tabar */}
      {day.ulamaQuotes && day.ulamaQuotes.length > 0 && (
        <section className="mb-8 bg-stone-50 border border-stone-200 rounded-xl p-5">
          <div className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>Kutipan Penjelasan Ulama Mu'tabar</span>
          </div>
          <blockquote className="text-sm text-stone-800 italic pl-3 border-l-2 border-stone-400 py-1 my-2">
            "{day.ulamaQuotes[0].quoteText}"
          </blockquote>
          <p className="text-xs font-semibold text-stone-700 text-right">
            — {day.ulamaQuotes[0].scholarName} ({day.ulamaQuotes[0].bookTitle})
          </p>
        </section>
      )}

      {/* 6. Contoh Penerapan & Kesalahan yang Harus Dihindari */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        
        {/* Penerapan Nyata */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-3">
            <Lightbulb className="w-4 h-4 text-emerald-700" />
            <span>Contoh Penerapan Nyata</span>
          </div>
          <ul className="space-y-2 text-xs text-stone-700">
            {day.practicalExamples.map((ex, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kesalahan yang Harus Dihindari */}
        <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-700" />
            <span>Kekeliruan yang Harus Dihindari</span>
          </div>
          <ul className="space-y-2 text-xs text-stone-700">
            {day.commonMistakes.map((mis, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>{mis}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 7. Rangkuman Materi */}
      <section className="mb-8 bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
          Rangkuman Inti Hari Ini
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          {day.summary}
        </p>
      </section>

      {/* 8. Refleksi & Tugas Praktik Harian */}
      <section className="mb-8 bg-sky-50/50 border border-sky-200 rounded-xl p-6">
        <h3 className="text-xs font-bold text-sky-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <PenTool className="w-4 h-4 text-sky-800" />
          <span>Pertanyaan Refleksi & Tugas Praktik Harian</span>
        </h3>
        
        <div className="space-y-3 mb-4">
          <span className="text-xs font-semibold text-slate-800 block">Renungan Pribadi:</span>
          <ul className="space-y-1.5 list-disc pl-4 text-xs text-slate-700">
            {day.reflectionQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>

        <div className="p-3.5 bg-white rounded-lg border border-sky-200 text-xs text-slate-800">
          <span className="font-bold text-sky-950 block mb-1">Tugas Praktik Hari Ini:</span>
          <p>{day.dailyPracticeTask}</p>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={onOpenJournal}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-850 hover:bg-sky-900 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tulis di Jurnal Muhasabah & Praktik Pribadi</span>
          </button>
        </div>
      </section>

      {/* 9. Kuis Pemahaman Harian */}
      {quiz && (
        <section className="mb-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-sky-800" />
            <span>Kuis Cepat Pemahaman Harian</span>
          </div>

          <p className="text-sm font-semibold text-slate-800 mb-4">
            {quiz.questionText}
          </p>

          <div className="space-y-2 mb-4">
            {quiz.options.map((opt, i) => {
              const isSelected = selectedQuizAnswer === i;
              return (
                <button
                  key={i}
                  disabled={quizSubmitted}
                  onClick={() => setSelectedQuizAnswer(i)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-sky-800 bg-sky-50/70 text-sky-950 font-medium'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-sky-800 bg-sky-800 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                  </div>
                </button>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              disabled={selectedQuizAnswer === null}
              onClick={() => setQuizSubmitted(true)}
              className="px-4 py-2 rounded-lg bg-sky-950 hover:bg-sky-900 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Periksa Jawaban Kuis
            </button>
          ) : (
            <div className={`p-4 rounded-lg border text-xs ${
              isQuizCorrect ? 'bg-sky-50 border-sky-200 text-sky-900' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="font-bold mb-1">
                {isQuizCorrect ? 'Alhamdulillah, Jawaban Benar!' : 'Jawaban Belum Tepat'}
              </div>
              <p className="text-slate-700">{quiz.explanation}</p>
            </div>
          )}
        </section>
      )}

      {/* 10. Tindakan Penyelesaian */}
      <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold">Tandai Selesai Pelajaran Hari ke-{day.dayNumber}</h4>
          <p className="text-xs text-slate-300">
            Mencatat kehadiran dan memperbarui persentase kelulusan program Anda.
          </p>
        </div>

        <button
          onClick={handleCompleteLesson}
          className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            isCompleted
              ? 'bg-sky-700 text-white hover:bg-sky-600'
              : 'bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white shadow-md'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Sudah Selesai (Perbarui)' : 'Tandai Selesai Hari Ini'}</span>
        </button>
      </div>

      </div>

      {/* WhatsApp Broadcast Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="max-w-3xl w-full my-8">
            <WhatsAppBroadcastHub
              currentDay={day}
              allDays={[day]}
              isAdmin={false}
              onClose={() => setShowWhatsAppModal(false)}
            />
          </div>
        </div>
      )}
    </article>
  );
};
