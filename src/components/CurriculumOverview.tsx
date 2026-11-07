import React, { useState } from 'react';
import { CurriculumDay, SubjectId, LearningProgress } from '../types';
import { Lock, CheckCircle2, Search, Calendar, Star, Clock, X, Award } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface CurriculumOverviewProps {
  days: CurriculumDay[];
  currentDay: number;
  completedProgress: LearningProgress[];
  onSelectDay: (dayNumber: number) => void;
  filterSubject?: SubjectId | 'all';
}

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  days,
  currentDay,
  completedProgress,
  onSelectDay,
  filterSubject = 'all'
}) => {
  const [selectedMonth, setSelectedMonth] = useState<1 | 2 | 3 | 'all'>('all');
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>(filterSubject);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [lockedDayModal, setLockedDayModal] = useState<number | null>(null);

  const completedDayNumbers = new Set(
    completedProgress.filter(p => p.completed).map(p => p.dayNumber)
  );

  const bookmarkedDays = new Set(StorageService.getBookmarks('usr-peserta-1'));

  const filteredDays = days.filter(d => {
    if (onlyFavorites && !bookmarkedDays.has(d.dayNumber)) return false;
    if (selectedMonth !== 'all' && d.monthNumber !== selectedMonth) return false;
    if (subjectFilter !== 'all' && d.subjectId !== subjectFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = d.title.toLowerCase().includes(q);
      const matchTheme = d.theme.toLowerCase().includes(q);
      const matchDay = `hari ${d.dayNumber}`.includes(q);
      if (!matchTitle && !matchTheme && !matchDay) return false;
    }
    return true;
  });

  const subjectNames: Record<SubjectId, string> = {
    aqidah: 'Aqidah Islamiyah',
    akhlak: 'Akhlak & Adab',
    hadis: 'Hadis & Sunnah',
    tazkiyatun_nafs: 'Tazkiyatun Nafs',
    fikih: 'Fikih Ibadah',
    muamalah: 'Muamalah Islamiyah'
  };

  return (
    <section className="py-16 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B4863A] uppercase font-sans-body mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Jadwal Terstruktur 90 Hari Kalender</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#0A192F] tracking-tight">
              Kurikulum Kalender Akademik Lengkap
            </h2>
            <p className="text-sm text-[#57534E] mt-1.5 max-w-2xl leading-relaxed font-sans-body">
              Materi dalam keadaan terkunci sebelum waktunya. Materi dibuka mulai pukul <strong className="text-[#0A192F]">23.59 WIB</strong> dan seterusnya. Klik pada hari yang tersedia untuk menyimak penjelasan materi, dalil shahih, muhasabah, dan panduan amal harian.
            </p>
          </div>

          {/* Current System Day Indicator */}
          <div className="bg-[#0A192F] text-white px-5 py-3.5 rounded-xl border border-[#1E3A5F] shadow-museum-sm flex items-center gap-3.5 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[#B4863A] text-[#0A192F] flex items-center justify-center font-bold text-lg font-mono shadow-xs">
              {currentDay}
            </div>
            <div className="text-left text-xs leading-tight">
              <span className="font-bold text-white block text-sm">Hari ke-{currentDay} dari 90</span>
              <span className="text-[#D6CEBE] block text-[11px] mt-0.5">Materi 1 s/d {currentDay} telah dibuka</span>
            </div>
          </div>
        </div>

        {/* 3 Monthly Curriculum Milestones Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            onClick={() => setSelectedMonth(1)}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              selectedMonth === 1
                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-museum-md'
                : 'bg-white border-[#E7E5E4] hover:border-[#B4863A]'
            }`}
          >
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className={`uppercase tracking-wider font-semibold text-[10px] ${selectedMonth === 1 ? 'text-[#B4863A]' : 'text-[#78716C]'}`}>
                Bulan Pertama
              </span>
              <span className={`font-mono font-medium ${selectedMonth === 1 ? 'text-[#D6CEBE]' : 'text-[#B4863A]'}`}>Hari 1–30</span>
            </div>
            <h4 className={`text-base font-serif-display font-medium ${selectedMonth === 1 ? 'text-white' : 'text-[#0A192F]'}`}>
              Membenahi Dasar Kehidupan
            </h4>
            <p className={`text-xs mt-1 leading-relaxed ${selectedMonth === 1 ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
              Tujuan hidup, akidah tauhid, niat & ikhlas, pengenalan ibadah.
            </p>
          </div>

          <div
            onClick={() => setSelectedMonth(2)}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              selectedMonth === 2
                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-museum-md'
                : 'bg-white border-[#E7E5E4] hover:border-[#B4863A]'
            }`}
          >
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className={`uppercase tracking-wider font-semibold text-[10px] ${selectedMonth === 2 ? 'text-[#B4863A]' : 'text-[#78716C]'}`}>
                Bulan Kedua
              </span>
              <span className={`font-mono font-medium ${selectedMonth === 2 ? 'text-[#D6CEBE]' : 'text-[#B4863A]'}`}>Hari 31–60</span>
            </div>
            <h4 className={`text-base font-serif-display font-medium ${selectedMonth === 2 ? 'text-white' : 'text-[#0A192F]'}`}>
              Membersihkan Jiwa & Menunaikan Hak
            </h4>
            <p className={`text-xs mt-1 leading-relaxed ${selectedMonth === 2 ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
              Tazkiyatun nafs, akhlak mulia, fikih ibadah, adab keluarga & sosial.
            </p>
          </div>

          <div
            onClick={() => setSelectedMonth(3)}
            className={`p-5 rounded-xl border transition-all cursor-pointer ${
              selectedMonth === 3
                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-museum-md'
                : 'bg-white border-[#E7E5E4] hover:border-[#B4863A]'
            }`}
          >
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className={`uppercase tracking-wider font-semibold text-[10px] ${selectedMonth === 3 ? 'text-[#B4863A]' : 'text-[#78716C]'}`}>
                Bulan Ketiga
              </span>
              <span className={`font-mono font-medium ${selectedMonth === 3 ? 'text-[#D6CEBE]' : 'text-[#B4863A]'}`}>Hari 61–90</span>
            </div>
            <h4 className={`text-base font-serif-display font-medium ${selectedMonth === 3 ? 'text-white' : 'text-[#0A192F]'}`}>
              Memantapkan Amal & Akhir Hidup
            </h4>
            <p className={`text-xs mt-1 leading-relaxed ${selectedMonth === 3 ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
              Iman hari akhir, persiapan kematian, wasiat, dan husnul khatimah.
            </p>
          </div>
        </div>

        {/* Filter Controls (Segmented Control Pattern) */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E7E5E4] shadow-museum-sm space-y-4 mb-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Month Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F5F2EB] rounded-lg overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedMonth('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedMonth === 'all'
                    ? 'bg-white text-[#0A192F] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#0A192F]'
                }`}
              >
                Semua 90 Hari
              </button>
              <button
                onClick={() => setSelectedMonth(1)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedMonth === 1
                    ? 'bg-white text-[#0A192F] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#0A192F]'
                }`}
              >
                Bulan 1 (Hari 1–30)
              </button>
              <button
                onClick={() => setSelectedMonth(2)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedMonth === 2
                    ? 'bg-white text-[#0A192F] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#0A192F]'
                }`}
              >
                Bulan 2 (Hari 31–60)
              </button>
              <button
                onClick={() => setSelectedMonth(3)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedMonth === 3
                    ? 'bg-white text-[#0A192F] font-semibold shadow-xs'
                    : 'text-[#57534E] hover:text-[#0A192F]'
                }`}
              >
                Bulan 3 (Hari 61–90)
              </button>
            </div>

            {/* Subject Selector & Favorites Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  onlyFavorites
                    ? 'bg-[#F5F2EB] border-[#B4863A] text-[#0A192F] font-semibold'
                    : 'bg-white border-[#E7E5E4] text-[#57534E] hover:border-[#B4863A] hover:text-[#0A192F]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-[#B4863A] text-[#B4863A]' : ''}`} />
                <span>Modul Tersimpan</span>
              </button>

              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value as SubjectId | 'all')}
                className="text-xs bg-[#FBF9F5] border border-[#E7E5E4] rounded-lg px-3 py-1.5 text-[#1C1917] font-medium focus:outline-[#0A192F]"
              >
                <option value="all">Semua Mata Pelajaran</option>
                <option value="aqidah">Aqidah Islamiyah</option>
                <option value="akhlak">Akhlak dan Adab</option>
                <option value="hadis">Hadis dan Sunnah</option>
                <option value="tazkiyatun_nafs">Tazkiyatun Nafs</option>
                <option value="fikih">Fikih Ibadah</option>
                <option value="muamalah">Muamalah Islamiyah</option>
              </select>
            </div>

          </div>

          {/* Search bar & Quick Jump */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#78716C]" />
              <input
                type="text"
                placeholder="Cari judul materi, tema, atau hari (contoh: 'niat', 'wudhu', 'hari 7')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF9F5] border border-[#E7E5E4] rounded-lg text-[#1C1917] placeholder-[#78716C] focus:outline-[#0A192F]"
              />
            </div>

            {/* Quick Milestone Shortcuts */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-[11px] font-mono">
              <span className="text-[#78716C] text-xs font-sans-body font-medium whitespace-nowrap">Lompat:</span>
              {[1, 7, 14, 30, 60, 90].map((dNum) => (
                <button
                  key={dNum}
                  onClick={() => onSelectDay(dNum)}
                  className="px-2.5 py-1 rounded-md bg-[#F5F2EB] hover:bg-[#EBE6DF] text-[#0A192F] font-medium border border-[#E7E5E4] transition-colors whitespace-nowrap cursor-pointer"
                >
                  H-{dNum}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 90 Days Grid List (Museum Monograph Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDays.map((day) => {
            const isUnlocked = day.dayNumber <= currentDay;
            const isCompleted = completedDayNumbers.has(day.dayNumber);

            return (
              <div
                key={day.id}
                onClick={() => {
                  if (isUnlocked) {
                    onSelectDay(day.dayNumber);
                  } else {
                    setLockedDayModal(day.dayNumber);
                  }
                }}
                className={`rounded-xl border p-5 transition-all text-left flex flex-col justify-between group cursor-pointer ${
                  isUnlocked
                    ? 'bg-white border-[#E7E5E4] hover:border-[#B4863A] hover:shadow-museum-md'
                    : 'bg-[#F5F2EB]/50 border-[#E7E5E4] hover:border-[#D6CEBE]'
                }`}
              >
                <div>
                  
                  {/* Clean Unboxed Metadata with Typographic Separator */}
                  <div className="flex items-center justify-between text-xs text-[#78716C] mb-2 font-sans-body">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-semibold text-[#0A192F]">
                        Hari {day.dayNumber}
                      </span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-[11px] font-medium text-[#B4863A]">
                        {subjectNames[day.subjectId]}
                      </span>
                    </div>

                    <div>
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-[#0D766E]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Selesai
                        </span>
                      ) : isUnlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-[#78716C]">
                          <Clock className="w-3.5 h-3.5" />
                          Tersedia
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-[#B4863A]">
                          <Lock className="w-3.5 h-3.5" />
                          Terkunci
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title in Editorial Serif */}
                  <h3 className="text-sm font-serif-display font-medium text-[#0A192F] group-hover:text-[#B4863A] line-clamp-1 mb-1.5 transition-colors">
                    {day.title}
                  </h3>

                  {/* Theme in Soft Charcoal */}
                  <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed font-sans-body">
                    {day.theme}
                  </p>

                  {/* Evaluation Day Tag */}
                  {day.isEvaluationDay && (
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#B4863A]/10 border border-[#B4863A]/20 text-[#8F6626] text-[10px] font-medium font-sans-body">
                      <Award className="w-3 h-3 text-[#B4863A] shrink-0" />
                      <span>
                        Evaluasi {day.dayNumber === 90 ? 'Akhir (50 Soal PG)' : day.dayNumber === 30 || day.dayNumber === 60 ? 'Bulanan (20 Soal PG)' : 'Pekanan (10 Soal PG)'} · Buka 23.50 WIB
                      </span>
                    </div>
                  )}

                </div>

                {/* Footer strip with subtle hairline */}
                <div className="mt-4 pt-3 border-t border-[#F5F2EB] flex items-center justify-between text-[11px] font-sans-body">
                  <span className="text-[#78716C] text-[10px]">
                    Pekan {day.weekNumber} · Bulan {day.monthNumber}
                  </span>

                  <span className={`font-medium transition-colors ${isUnlocked ? 'text-[#0A192F] group-hover:text-[#B4863A]' : 'text-[#78716C]'}`}>
                    {isUnlocked ? 'Buka Materi →' : 'Terkunci (Buka 23.59 WIB)'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {filteredDays.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E7E5E4] p-8 shadow-xs">
            <p className="text-sm text-[#57534E]">Tidak ada materi yang sesuai dengan pencarian Anda.</p>
            <button
              onClick={() => {
                setSelectedMonth('all');
                setSubjectFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#0A192F] underline cursor-pointer"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

      </div>

      {/* Modal Dialog: Materi Terkunci Sebelum Waktunya */}
      {lockedDayModal !== null && (
        <div className="fixed inset-0 z-50 bg-[#0A192F]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 space-y-5 shadow-museum-lg text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-end -mt-2 -mr-2">
              <button
                onClick={() => setLockedDayModal(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#F5F2EB] text-[#B4863A] flex items-center justify-center mx-auto border border-[#D6CEBE]">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#B4863A] font-semibold font-sans-body">
                Jadwal Kurikulum Sistematis
              </span>
              <h3 className="text-xl font-serif-display font-medium text-[#0A192F]">
                Materi Hari ke-{lockedDayModal} Masih Terkunci
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed font-sans-body">
                Materi dalam keadaan terkunci sebelum waktunya. Materi dibuka mulai pukul <strong className="text-[#0A192F]">23.59 WIB</strong> dan seterusnya.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#E7E5E4] text-xs text-[#44403C] space-y-1 text-left font-sans-body">
              <div className="flex items-center gap-1.5 font-semibold text-[#0A192F]">
                <Clock className="w-4 h-4 text-[#B4863A]" />
                <span>Waktu Pembukaan: 23.59 WIB</span>
              </div>
              <p className="text-[11px] text-[#78716C] leading-snug">
                Sistem dirancang bertahap agar santri dan peserta didik dapat fokus menuntaskan materi serta mengamalkan tugas harian hari ini terlebih dahulu.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5 font-sans-body">
              <button
                onClick={() => {
                  setLockedDayModal(null);
                  onSelectDay(currentDay);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                Buka Materi Hari Ini (Hari ke-{currentDay})
              </button>
              <button
                onClick={() => setLockedDayModal(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F5F2EB] hover:bg-[#EBE6DF] text-[#44403C] text-xs font-medium border border-[#D6CEBE] transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
