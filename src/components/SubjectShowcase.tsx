import React, { useState } from 'react';
import { SUBJECTS } from '../data/referenceLibrary';
import { SubjectId } from '../types';
import {
  Shield,
  Heart,
  BookOpen,
  Sparkles,
  Scale,
  Building,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface SubjectShowcaseProps {
  onSelectSubjectFilter: (subjectId: SubjectId) => void;
}

export const SubjectShowcase: React.FC<SubjectShowcaseProps> = ({
  onSelectSubjectFilter
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('aqidah');

  const activeSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];

  const iconMap: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5 text-[#B4863A]" />,
    Heart: <Heart className="w-5 h-5 text-[#B4863A]" />,
    BookOpen: <BookOpen className="w-5 h-5 text-[#B4863A]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#B4863A]" />,
    Scale: <Scale className="w-5 h-5 text-[#B4863A]" />,
    Building: <Building className="w-5 h-5 text-[#B4863A]" />
  };

  const activeIconMap: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5 text-[#F5E2A8]" />,
    Heart: <Heart className="w-5 h-5 text-[#F5E2A8]" />,
    BookOpen: <BookOpen className="w-5 h-5 text-[#F5E2A8]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#F5E2A8]" />,
    Scale: <Scale className="w-5 h-5 text-[#F5E2A8]" />,
    Building: <Building className="w-5 h-5 text-[#F5E2A8]" />
  };

  const defaultReferences: Record<SubjectId, string[]> = {
    aqidah: ['Kitab at-Tauhid (Syaikh Muhammad bin Abdul Wahhab)', 'Al-Aqidah al-Washithiyah (Ibnu Taimiyyah)', 'Syarh Ushulil Iman'],
    akhlak: ['Makarimul Akhlaq (Al-Khara\'ithi)', 'Riyadhus Shalihin (Bab Akhlaq)', 'Hilyah Thalibil Ilmi (Bakr Abu Zaid)'],
    hadis: ['Shahih al-Bukhari & Shahih Muslim', 'Al-Arba\'in an-Nawawiyah (Imam an-Nawawi)', 'Al-Lu\'lu\' wal Marjan'],
    tazkiyatun_nafs: ['Madarijus Salikin (Ibnul Qayyim)', 'Ighatsatul Lahafan min Masha\'idisy Syaithan', 'Mukhtashar Minhajil Qashidin'],
    fikih: ['Bulughul Maram min Adillatil Ahkam', 'Al-Wajiz fi Fiqhis Sunnah wal Kitabil Aziz', 'Bidayatul Mujtahid'],
    muamalah: ['Fiqh al-Mu\'amalat al-Maliyah', 'Kitab al-Buyu\' (Shahih al-Bukhari)', 'Ahkamul Mu\'amalat al-Islamiyah']
  };

  const currentReferences = defaultReferences[activeSubject.id] || [];

  return (
    <section className="py-16 bg-[#FFFFFF] border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B4863A] font-semibold font-sans-body">
            Enam Disiplin Ilmu Terpadu
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#0A192F] tracking-tight">
            Struktur Mata Pelajaran Akademik
          </h2>
          <p className="text-sm text-[#57534E] leading-relaxed font-sans-body">
            Disusun secara berkesinambungan agar santri dan peserta didik mampu menginternalisasi kebenaran akidah, kemuliaan akhlak, kesucian jiwa, keabsahan ibadah, serta keadilan muamalah sehari-hari.
          </p>
        </div>

        {/* Subject Selectors (Museum Gallery Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {SUBJECTS.map((subject) => {
            const isActive = subject.id === selectedSubjectId;
            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubjectId(subject.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isActive
                    ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-museum-md ring-1 ring-[#B4863A]/40'
                    : 'bg-[#FBF9F5] text-[#1C1917] border-[#E7E5E4] hover:border-[#B4863A] hover:bg-[#F5F2EB]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-white/10' : 'bg-white border border-[#E7E5E4]'}`}>
                    {isActive ? activeIconMap[subject.iconName] : iconMap[subject.iconName]}
                  </span>
                  <span className={`text-[12px] font-arabic font-bold ${isActive ? 'text-[#F5E2A8]' : 'text-[#B4863A]'}`}>
                    {subject.arabicName}
                  </span>
                </div>
                <div>
                  <h3 className={`text-xs font-semibold leading-tight ${isActive ? 'text-white' : 'text-[#0A192F]'}`}>
                    {subject.name}
                  </h3>
                  <span className={`text-[10px] block mt-1 ${isActive ? 'text-[#D6CEBE]' : 'text-[#78716C]'}`}>
                    15 Pertemuan
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Subject Showcase Card */}
        <div className="bg-[#FBF9F5] rounded-2xl border border-[#E7E5E4] p-6 sm:p-10 shadow-museum-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#0A192F] text-[#F5E2A8] shadow-sm">
                  {activeIconMap[activeSubject.iconName]}
                </div>
                <div>
                  <span className="text-sm font-arabic font-bold text-[#B4863A] block">
                    {activeSubject.arabicName}
                  </span>
                  <h3 className="text-2xl font-serif-display font-medium text-[#0A192F] tracking-tight">
                    {activeSubject.name}
                  </h3>
                </div>
              </div>

              {/* Elegant Tagline Quote with Hairline Dividers */}
              <div className="py-3 border-y border-[#E7E5E4]">
                <p className="text-base text-[#0A192F] font-serif-display italic leading-relaxed">
                  "{activeSubject.tagline}"
                </p>
              </div>

              <p className="text-sm text-[#44403C] leading-relaxed font-sans-body">
                {activeSubject.description}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#78716C] font-semibold mb-3">
                  Capaian Pembelajaran Utama:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSubject.learningObjectives.map((outcome: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#292524] bg-white p-3 rounded-xl border border-[#E7E5E4] shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D766E] shrink-0 mt-0.5" />
                      <span className="leading-snug">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-[#E7E5E4] space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
                <span className="text-xs font-semibold text-[#0A192F]">Alokasi Pembelajaran</span>
                <span className="text-xs font-mono font-semibold text-[#B4863A]">
                  15 Hari / 90 Hari
                </span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-[#78716C] font-semibold block mb-2.5">
                  Kitab Rujukan Utama:
                </span>
                <div className="space-y-2">
                  {currentReferences.map((ref: string, idx: number) => (
                    <div key={idx} className="text-xs text-[#44403C] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B4863A] shrink-0"></span>
                      <span>{ref}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectSubjectFilter(activeSubject.id)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buka Semua Modul {activeSubject.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B4863A]" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
