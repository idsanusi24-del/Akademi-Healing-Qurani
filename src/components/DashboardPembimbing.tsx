import React, { useState } from 'react';
import { UserProfile, Assessment } from '../types';
import { StorageService } from '../services/storageService';
import {
  CheckCircle,
  FileText,
  Award,
  ShieldCheck,
  Check
} from 'lucide-react';

interface DashboardPembimbingProps {
  currentUser: UserProfile;
  participants: UserProfile[];
  assessments: Assessment[];
  onOpenCertificate: (participantId: string) => void;
}

export const DashboardPembimbing: React.FC<DashboardPembimbingProps> = ({
  currentUser,
  participants,
  assessments,
  onOpenCertificate
}) => {
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>(participants[0]?.id || 'user-peserta-1');
  const [mentorFeedbackText, setMentorFeedbackText] = useState('');
  const [essayScoreInput, setEssayScoreInput] = useState<number>(25);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const selectedParticipant = participants.find(p => p.id === selectedParticipantId) || participants[0];

  const attempts = StorageService.getAssessmentAttempts(selectedParticipantId);
  const journals = StorageService.getJournals(selectedParticipantId);
  const academicSummary = StorageService.calculateAcademicSummary(selectedParticipantId);
  const certificates = StorageService.getCertificates().filter(c => c.participantId === selectedParticipantId);
  const isCertified = certificates.length > 0;

  // Pending reviews
  const pendingAttempt = attempts.find(a => a.status === 'submitted');

  const handleGradeEssay = (attemptId: string) => {
    StorageService.reviewAssessmentAttempt(
      attemptId,
      currentUser.fullName,
      mentorFeedbackText || 'Jawaban uraian telah dinilai dengan rubrik.',
      {
        'w1-q4': { score: essayScoreInput, feedback: mentorFeedbackText },
        'm1-q4': { score: essayScoreInput, feedback: mentorFeedbackText },
        'final-q5': { score: essayScoreInput, feedback: mentorFeedbackText }
      }
    );
    setSuccessToast('Nilai evaluasi uraian berhasil disahkan dan dikirim ke peserta.');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleApproveGraduationAndCertificate = () => {
    StorageService.issueCertificate(
      selectedParticipant.id,
      selectedParticipant.fullName,
      academicSummary.compositeScore,
      academicSummary.predicate === 'Perlu Bimbingan' ? 'Baik' : academicSummary.predicate,
      currentUser.fullName,
      currentUser.fullName
    );
    setSuccessToast(`Sertifikat resmi untuk ${selectedParticipant.fullName} berhasil disahkan dan diterbitkan.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header in Ocean Blue */}
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 text-white rounded-2xl p-6 sm:p-8 shadow-ocean-deep border border-cyan-400/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Portal Akademik Pembimbing & Pengasuh Keilmuan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentUser.fullName}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Kewenangan: Memeriksa tugas, menilai jawaban uraian, memberikan umpan balik, dan mengesahkan sertifikat kelulusan resmi.
            </p>
          </div>

          <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-xs">
            <span className="text-slate-300 block">Peserta Bimbingan:</span>
            <span className="font-bold text-base text-white">{participants.length} Orang Terdaftar</span>
          </div>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-300 text-xs font-semibold text-sky-950 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-sky-700 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Participant Selector Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 overflow-x-auto">
        <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Pilih Peserta:</span>
        {participants.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedParticipantId(p.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              p.id === selectedParticipantId
                ? 'bg-sky-950 text-cyan-200 border-sky-950 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>{p.fullName}</span>
            <span className="font-mono text-[10px] opacity-75">({p.participantNumber})</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Student Review & Evaluation Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Pending Essay Grading & Journal Oversight */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Essay Review Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs mb-4">
              <span className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-800" />
                Antrean Pemeriksaan Jawaban Uraian
              </span>
              <span className="text-slate-500">
                Peserta: {selectedParticipant.fullName}
              </span>
            </div>

            {pendingAttempt ? (
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-cyan-200 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-sky-950">
                    Evaluasi: {assessments.find(a => a.id === pendingAttempt.assessmentId)?.title}
                  </span>
                  <span className="text-slate-500 font-mono">Diserahkan: {new Date(pendingAttempt.submittedAt!).toLocaleString('id-ID')}</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-900 block mb-1">Jawaban Uraian Peserta:</span>
                  <p className="text-slate-700 leading-relaxed italic">
                    "{pendingAttempt.answers.find(a => typeof a.participantAnswer === 'string')?.participantAnswer || 'Jawaban komprehensif terkait adab dan niat.'}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Berikan Nilai Uraian (0–40 Poin):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={essayScoreInput}
                      onChange={(e) => setEssayScoreInput(Number(e.target.value))}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Catatan / Bimbingan untuk Peserta:
                    </label>
                    <input
                      type="text"
                      placeholder="Nasihat penguatan materi..."
                      value={mentorFeedbackText}
                      onChange={(e) => setMentorFeedbackText(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleGradeEssay(pendingAttempt.id)}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>Sahkan Penilaian & Terbitkan Nilai</span>
                </button>
              </div>
            ) : (
              <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                <CheckCircle className="w-6 h-6 text-sky-600 mx-auto mb-1.5" />
                Semua jawaban uraian untuk peserta ini telah selesai diperiksa.
              </div>
            )}
          </div>

          {/* Reflection Journal Oversight */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Pemantauan Jurnal Muhasabah & Praktik Harian ({journals.length} Entri)
            </h3>

            {journals.length > 0 ? (
              <div className="space-y-3">
                {journals.map((j) => (
                  <div key={j.id} className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-xs space-y-2">
                    <div className="flex justify-between items-center text-slate-500 pb-2 border-b border-slate-200">
                      <span className="font-bold text-sky-950 font-mono">Hari ke-{j.dayNumber} · {j.lessonTheme}</span>
                      <span>{j.date}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Pemahaman:</strong> <span className="text-slate-700">{j.whatIUnderstood}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Amal Praktik:</strong> <span className="text-slate-700">{j.habitToPractice}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Rencana Perbaikan:</strong> <span className="text-slate-700">{j.actionPlan}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Peserta belum mengisi catatan jurnal.</p>
            )}
          </div>

        </div>

        {/* Right Column (4 cols): Academic Standing & Graduation Verification */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Capaian Akademik Peserta
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Materi Terselesaikan:</span>
                <span className="font-bold font-mono text-slate-900">
                  {academicSummary.completedDaysCount} / 90 ({academicSummary.completionPercentage}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Rata-rata Mingguan:</span>
                <span className="font-bold font-mono text-slate-900">{academicSummary.weeklyAvg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Rata-rata Bulanan:</span>
                <span className="font-bold font-mono text-slate-900">{academicSummary.monthlyAvg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Nilai Komposit:</span>
                <span className="font-extrabold text-base font-mono text-sky-950">
                  {academicSummary.compositeScore} / 100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Predikat:</span>
                <span className="font-bold text-sky-800">{academicSummary.predicate}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-900 block">Otorisasi Kelulusan & Sertifikat:</span>
              
              {isCertified ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-sky-50 border border-sky-300 text-xs text-sky-900 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-sky-700" />
                    <span>Sertifikat Resmi Telah Diterbitkan</span>
                  </div>
                  <button
                    onClick={() => onOpenCertificate(selectedParticipant.id)}
                    className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Pratinjau Sertifikat Peserta
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleApproveGraduationAndCertificate}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-cyan-200" />
                  <span>Sahkan & Terbitkan Sertifikat</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950 leading-relaxed">
            <strong>Kewajiban Pembimbing:</strong> Pastikan seluruh dalil, bacaan, dan tugas peserta telah diperiksa dengan seksama sebelum menandatangani persetujuan kelulusan.
          </div>

        </div>

      </div>

    </div>
  );
};
