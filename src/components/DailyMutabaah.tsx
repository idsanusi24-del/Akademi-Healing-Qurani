import React, { useState, useEffect } from 'react';
import { Check, Star } from 'lucide-react';

interface MutabaahItem {
  id: string;
  label: string;
  category: 'fardhu' | 'sunnah' | 'dzikir' | 'amal';
  points: number;
}

const MUTABAAH_ITEMS: MutabaahItem[] = [
  { id: 'shalat_waktu', label: 'Shalat Fardhu 5 Waktu Tepat Waktu (Berjamaah bagi Ikhwan)', category: 'fardhu', points: 30 },
  { id: 'shalat_rawatib', label: 'Shalat Sunnah Rawatib (Qabliyah & Ba\'diyah)', category: 'sunnah', points: 15 },
  { id: 'dzikir_pagi_petang', label: 'Membaca Dzikir Pagi & Petang Sesuai Sunnah', category: 'dzikir', points: 15 },
  { id: 'tilawah_quran', label: 'Tilawah Al-Qur\'an (Minimal 1 Halaman / Ruku\')', category: 'amal', points: 15 },
  { id: 'shalat_witir', label: 'Shalat Witir atau Qiyamul Lail (Tahajjud)', category: 'sunnah', points: 15 },
  { id: 'sedekah_subuh', label: 'Infaq / Sedekah Harian atau Menolong Sesama', category: 'amal', points: 10 }
];

interface DailyMutabaahProps {
  currentDay: number;
  participantId: string;
}

export const DailyMutabaah: React.FC<DailyMutabaahProps> = ({
  currentDay,
  participantId
}) => {
  const storageKey = `mutabaah_${participantId}_day_${currentDay}`;

  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try { return JSON.parse(raw); } catch { return []; }
    }
    return ['shalat_waktu', 'dzikir_pagi_petang'];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checkedIds));
  }, [checkedIds, storageKey]);

  const toggleItem = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const totalPoints = checkedIds.reduce((sum, id) => {
    const item = MUTABAAH_ITEMS.find(m => m.id === id);
    return sum + (item?.points ?? 0);
  }, 0);

  const percentage = Math.min(100, Math.round((totalPoints / 100) * 100));

  const getPraiseMessage = () => {
    if (percentage >= 85) return 'Mumtaz! Istiqamah Sangat Tinggi';
    if (percentage >= 60) return 'Jayyid Jiddan! Pertahankan Amalan';
    if (percentage >= 30) return 'Alhamdulillah, Terus Disempurnakan';
    return 'Bismillah, Awali dengan Shalat & Dzikir';
  };

  return (
    <div className="bg-white rounded-xl border border-[#E7E5E4] p-6 shadow-museum-sm space-y-4">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E5E4]">
        <div>
          <span className="text-xs font-semibold text-[#0A192F] uppercase tracking-wider block font-sans-body">
            Mutaba'ah Amal Yaumiyah (Checklist Ibadah Harian)
          </span>
          <p className="text-[11px] text-[#78716C] mt-0.5 font-sans-body">
            Hari ke-{currentDay} · Pantau pembiasaan amalan sunnah harian menuju istiqamah
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-sans-body">
            <div className="flex items-center justify-end gap-1 text-xs font-semibold text-[#0A192F] font-mono">
              <span>{totalPoints}</span>
              <span className="text-[#78716C]">/ 100 Poin</span>
            </div>
            <span className="text-[10px] text-[#0D766E] font-medium block">{getPraiseMessage()}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#0A192F] text-[#F5E2A8] flex items-center justify-center font-bold text-xs font-mono shadow-xs">
            {percentage}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {MUTABAAH_ITEMS.map((item) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                isChecked
                  ? 'bg-[#FBF9F5] border-[#B4863A]/60'
                  : 'bg-white border-[#E7E5E4] hover:border-[#B4863A] hover:bg-[#FBF9F5]'
              }`}
            >
              <div className="flex items-start gap-2.5 pr-2 font-sans-body">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? 'bg-[#0A192F] text-[#F5E2A8]'
                      : 'border border-[#D6CEBE] group-hover:border-[#0A192F]'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <span
                    className={`text-xs block leading-snug ${
                      isChecked ? 'text-[#0A192F] font-medium' : 'text-[#44403C]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#B4863A] font-mono font-medium">
                    +{item.points} Poin
                  </span>
                </div>
              </div>

              {isChecked && (
                <Star className="w-3.5 h-3.5 text-[#B4863A] fill-[#B4863A] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3 bg-[#FBF9F5] rounded-lg border border-[#E7E5E4] flex items-center justify-between text-[11px] text-[#57534E] font-medium font-sans-body">
        <span>Capaian Mutaba'ah tersimpan otomatis di perangkat Anda secara aman.</span>
        <span className="text-[#0A192F] font-semibold font-mono">{checkedIds.length} dari 6 Amalan</span>
      </div>

    </div>
  );
};
