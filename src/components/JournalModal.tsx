import React, { useState } from 'react';
import { ReflectionJournal } from '../types';
import { X, Lock, Save, BookOpen } from 'lucide-react';

interface JournalModalProps {
  dayNumber: number;
  lessonTheme: string;
  participantId: string;
  existingJournal?: ReflectionJournal;
  onClose: () => void;
  onSave: (journal: Omit<ReflectionJournal, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  dayNumber,
  lessonTheme,
  participantId,
  existingJournal,
  onClose,
  onSave
}) => {
  const [whatIUnderstood, setWhatIUnderstood] = useState(existingJournal?.whatIUnderstood || '');
  const [whatINeedToImprove, setWhatINeedToImprove] = useState(existingJournal?.whatINeedToImprove || '');
  const [habitToPractice, setHabitToPractice] = useState(existingJournal?.habitToPractice || '');
  const [challengesFaced, setChallengesFaced] = useState(existingJournal?.challengesFaced || '');
  const [actionPlan, setActionPlan] = useState(existingJournal?.actionPlan || '');
  const [personalNotes, setPersonalNotes] = useState(existingJournal?.personalNotes || '');
  const [isPrivate, setIsPrivate] = useState(existingJournal?.isPrivate ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      participantId,
      dayNumber,
      date: new Date().toISOString().split('T')[0],
      lessonTheme,
      whatIUnderstood,
      whatINeedToImprove,
      habitToPractice,
      challengesFaced,
      actionPlan,
      personalNotes,
      isPrivate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header in Ocean Blue */}
        <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 text-white p-5 flex items-center justify-between border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-850 flex items-center justify-center text-cyan-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Jurnal Muhasabah & Praktik Harian</h3>
              <p className="text-xs text-slate-300">Hari ke-{dayNumber} · {lessonTheme}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-sky-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Notice in Ocean Blue Style */}
        <div className="bg-sky-50 border-b border-sky-200 px-5 py-2.5 flex items-center gap-2 text-xs text-sky-950">
          <Lock className="w-3.5 h-3.5 text-sky-700 shrink-0" />
          <span>
            <strong>Privasi Terjamin:</strong> Jurnal ini bersifat privat bagi peserta untuk evaluasi batiniah dan tidak dipublikasikan ke publik.
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              1. Hal yang Saya Pahami dari Materi Hari Ini
            </label>
            <textarea
              required
              rows={2}
              value={whatIUnderstood}
              onChange={(e) => setWhatIUnderstood(e.target.value)}
              placeholder="Tuliskan hikmah atau dalil utama yang paling menyentuh kalbu Anda..."
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-sky-800 focus:ring-1 focus:ring-sky-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              2. Hal yang Perlu Saya Perbaiki dalam Diri Saya
            </label>
            <textarea
              required
              rows={2}
              value={whatINeedToImprove}
              onChange={(e) => setWhatINeedToImprove(e.target.value)}
              placeholder="Kelemahan atau kelalaian apa yang selama ini masih sering terjadi..."
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-sky-800 focus:ring-1 focus:ring-sky-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              3. Amal atau Kebiasaan Nyata yang Akan Dipraktikkan
            </label>
            <textarea
              required
              rows={2}
              value={habitToPractice}
              onChange={(e) => setHabitToPractice(e.target.value)}
              placeholder="Contoh: Menjaga wudhu sebelum tidur, menyapa tetangga dengan senyum, dsb..."
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-sky-800 focus:ring-1 focus:ring-sky-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                4. Kendala yang Dihadapi
              </label>
              <input
                type="text"
                value={challengesFaced}
                onChange={(e) => setChallengesFaced(e.target.value)}
                placeholder="Rasa malas, lingkungan, kesibukan kantor..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                5. Rencana Perbaikan (Action Plan)
              </label>
              <input
                type="text"
                value={actionPlan}
                onChange={(e) => setActionPlan(e.target.value)}
                placeholder="Langkah konkret mengatasi kendala di atas..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              6. Catatan Refleksi Pribadi & Doa
            </label>
            <textarea
              rows={2}
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              placeholder="Doa atau harapan pribadi kepada Allah terkait materi ini..."
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
            />
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded text-sky-800 focus:ring-sky-800"
              />
              <span>Kunci sebagai Jurnal Privat (Hanya terlihat oleh saya)</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Jurnal Muhasabah</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
