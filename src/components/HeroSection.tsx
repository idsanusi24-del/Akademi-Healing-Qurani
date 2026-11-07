import React from 'react';
import { BookOpen, Calendar, Award, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface HeroSectionProps {
  currentDay: number;
  onExploreCurriculum: () => void;
  onOpenTodayLesson: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentDay,
  onExploreCurriculum,
  onOpenTodayLesson
}) => {
  return (
    <div className="relative overflow-hidden bg-[#FBF9F5] border-b border-[#E7E5E4]">
      
      {/* Top Motivator Ribbon: Hadith Shahih */}
      <div className="bg-[#0A192F] text-[#FBF9F5] text-xs py-2 px-4 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#B4863A] tracking-wider uppercase text-[10px] font-sans-body">
              Sabda Nabi ﷺ:
            </span>
            <span className="font-arabic text-sm text-[#F5E2A8] hidden md:inline" dir="rtl">
              «مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»
            </span>
          </div>
          <div className="text-[11px] text-[#D6CEBE] italic font-serif-display">
            "Barang siapa menempuh jalan untuk menuntut ilmu, Allah mudahkan baginya jalan menuju surga." (HR. Muslim no. 2699)
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        
        {/* Split Hero: Curatorial Narrative & Museum-Grade Photographic Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-7 space-y-7">
            
            {/* Clean Unboxed Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B4863A] uppercase font-sans-body">
              <span>Kurikulum Pembelajaran Islam 90 Hari</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-[#0A192F] normal-case font-medium">al-Qur'an & as-Sunnah ash-Shahihah</span>
            </div>

            {/* Main Headline in Prestigious Editorial Serif */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium text-[#0A192F] tracking-tight leading-[1.12] [text-wrap:balance]">
              Menata Hidup Menuju{' '}
              <span className="italic font-serif-display text-[#B4863A]">
                Akhir Hidup
              </span>{' '}
              yang Indah
            </h1>

            {/* Program Tagline Quote with Hairline Dividers (Museum Standard) */}
            <div className="py-4 border-y border-[#E7E5E4]">
              <p className="text-base sm:text-lg text-[#0A192F] font-serif-display italic leading-relaxed">
                "Menata Akidah, Memperbaiki Akhlak, Membersihkan Jiwa, Mengamalkan Syariat, dan Mempersiapkan Kehidupan Akhirat."
              </p>
            </div>

            {/* Narrative Body in Rich Antique Charcoal Ink */}
            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed max-w-2xl font-sans-body">
              Platform bimbingan belajar Islam intensif nonformal yang dirancang bertahap selama 90 hari kalender. Setiap hari menghadirkan materi teruji dari kitab mu'tabar, dalil shahih, panduan amal praktis, evaluasi berkala, dan verifikasi sertifikat resmi demi meraih ridha Allah dan keselamatan di akhirat.
            </p>

            {/* CTA Buttons in Refined Dignified Palette */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onOpenTodayLesson}
                className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#132A4A] text-white font-medium text-xs sm:text-sm shadow-museum-md hover:shadow-museum-lg transition-all duration-300 flex items-center gap-2.5 cursor-pointer group border border-[#0A192F]"
              >
                <BookOpen className="w-4 h-4 text-[#B4863A]" />
                <span>Pelajari Materi Hari ke-{currentDay}</span>
                <ArrowRight className="w-4 h-4 text-[#D6CEBE] group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <button
                onClick={onExploreCurriculum}
                className="px-6 py-3.5 rounded-xl bg-[#FFFFFF] border border-[#D6CEBE] hover:border-[#0A192F] hover:bg-[#F5F2EB] text-[#0A192F] font-medium text-xs sm:text-sm transition-all duration-300 shadow-museum-sm cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#78716C]" />
                <span>Jadwal Kurikulum 90 Hari</span>
              </button>

              <a
                href="/menata-hidup-source-code.zip"
                download="menata-hidup-source-code.zip"
                className="px-4 py-3.5 rounded-xl bg-[#F5F2EB] hover:bg-[#EBE6DF] text-[#44403C] hover:text-[#0A192F] border border-[#D6CEBE] font-medium text-xs sm:text-sm transition-all duration-300 shadow-museum-sm cursor-pointer flex items-center gap-2"
                title="Langsung unduh seluruh file aplikasi (ZIP)"
              >
                <Download className="w-4 h-4 text-[#B4863A]" />
                <span>Unduh ZIP (2.9 MB)</span>
              </a>
            </div>

            {/* Unboxed Trust Markers */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#78716C] font-sans-body">
              <span className="flex items-center gap-1.5 text-[#0A192F] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B4863A]" />
                Rujukan Kitab Mu'tabar
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1.5 text-[#0A192F] font-medium">
                <Calendar className="w-4 h-4 text-[#B4863A]" />
                Dibuka Mulai 23.59 WIB
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1.5 text-[#0A192F] font-medium">
                <Award className="w-4 h-4 text-[#B4863A]" />
                Sertifikat & Transkrip Resmi
              </span>
            </div>

          </div>

          {/* Museum-Grade Visual Asset Presentation */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-museum-lg border border-[#E7E5E4] bg-white group">
              
              <div className="aspect-[4/3] relative overflow-hidden bg-[#F5F2EB]">
                <img
                  src="/src/assets/images/hero_scholarly_manuscript_1793177930248.jpg"
                  alt="Naskah Kitab Klasik Islam di atas Rehal Kayu Ukir"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                
                {/* Discrete Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#0A192F]/85 backdrop-blur-md rounded-xl p-3 border border-white/10 text-white flex items-center justify-between">
                  <div className="leading-tight">
                    <span className="text-[10px] uppercase tracking-wider text-[#B4863A] font-semibold block">
                      Kalender Akademik
                    </span>
                    <span className="text-xs font-serif-display font-medium text-white">
                      Hari ke-{currentDay} dari 90 Hari
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#D6CEBE] block">6 Pilar Ilmu</span>
                    <span className="text-xs font-bold text-[#F5E2A8]">Mutaba'ah & Ujian</span>
                  </div>
                </div>
              </div>

              {/* Museum Figure Caption */}
              <div className="p-4 bg-[#FFFFFF] border-t border-[#E7E5E4] text-[#78716C] flex items-center justify-between text-xs font-serif-display italic">
                <span>Kitab Kuning & Rujukan Salafus Shalih</span>
                <span className="font-sans-body not-italic text-[11px] text-[#B4863A] font-semibold">Takhrij Shahih</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
