import React, { useState } from 'react';
import { Assessment, AssessmentAttempt, AssessmentAnswer } from '../types';
import { Clock, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft, Send, Award, FileText, Lock, ShieldAlert } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface AssessmentRunnerProps {
  assessment: Assessment;
  participantId: string;
  onBack: () => void;
  onSubmitAttempt: (attempt: Omit<AssessmentAttempt, 'id'>) => void;
  existingAttempt?: AssessmentAttempt;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
  assessment,
  participantId,
  onBack,
  onSubmitAttempt,
  existingAttempt
}) => {
  const [answers, setAnswers] = useState<{ [qId: string]: string | number }>(() => {
    if (existingAttempt) {
      const map: { [qId: string]: string | number } = {};
      existingAttempt.answers.forEach(a => {
        map[a.questionId] = a.participantAnswer;
      });
      return map;
    }
    return {};
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedAttempt, setCompletedAttempt] = useState<AssessmentAttempt | null>(existingAttempt || null);

  const questions = assessment.questions;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (completedAttempt) return;
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleTextChange = (qId: string, text: string) => {
    if (completedAttempt) return;
    setAnswers(prev => ({ ...prev, [qId]: text }));
  };

  const handleSubmitTest = () => {
    setIsSubmitting(true);

    // Calculate objective score
    let objectiveScore = 0;
    const finalAnswers: AssessmentAnswer[] = questions.map(q => {
      const userAns = answers[q.id];
      let awarded = 0;

      if (q.type === 'pilihan_ganda' || q.type === 'benar_salah') {
        if (userAns === q.correctAnswer) {
          awarded = q.points;
          objectiveScore += awarded;
        }
      }

      return {
        questionId: q.id,
        participantAnswer: userAns ?? '',
        awardedScore: (q.type === 'uraian') ? undefined : awarded
      };
    });

    const hasEssay = questions.some(q => q.type === 'uraian');
    const status = hasEssay ? 'submitted' : 'reviewed';
    const totalScore = hasEssay ? objectiveScore : objectiveScore;

    const newAttempt: Omit<AssessmentAttempt, 'id'> = {
      assessmentId: assessment.id,
      participantId,
      startedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      totalScore,
      status,
      attemptNumber: 1,
      answers: finalAnswers,
      mentorNotes: hasEssay ? 'Jawaban uraian sedang dalam antrean pemeriksaan pembimbing.' : 'Penilaian otomatis telah selesai.'
    };

    onSubmitAttempt(newAttempt);
    setCompletedAttempt({
      ...newAttempt,
      id: `attempt-${Date.now()}`
    });
    setIsSubmitting(false);
  };

  const [showReviewMode, setShowReviewMode] = useState(false);

  const handleStartRemedial = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setCompletedAttempt(null);
    setShowReviewMode(false);
  };

  const isUnlocked = StorageService.isAssessmentUnlocked(assessment);

  if (!completedAttempt && !isUnlocked) {
    const isPekanan = assessment.assessmentType === 'mingguan';
    const isBulanan = assessment.assessmentType === 'bulanan';
    const typeLabel = isPekanan ? 'Evaluasi Pekanan' : isBulanan ? 'Evaluasi Bulanan' : 'Evaluasi Akhir Pembelajaran';

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-8 sm:p-10 shadow-museum-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#F5F2EB] border border-[#E7E5E4] text-[#B4863A] flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Lock className="w-8 h-8 text-[#B4863A]" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F2EB] border border-[#E7E5E4] text-[#B4863A] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{typeLabel} · Hari ke-{assessment.dayNumber}</span>
          </div>

          <h2 className="text-2xl font-serif-display font-medium text-[#0A192F] mb-3 leading-snug">
            Evaluasi Dalam Keadaan Terkunci
          </h2>

          <p className="text-sm text-[#57534E] leading-relaxed max-w-lg mx-auto mb-6 font-sans-body">
            Sesuai tata tertib akademik program, setiap evaluasi dalam keadaan <strong className="text-[#0A192F]">terkunci</strong> sebelum waktunya. 
            Evaluasi ini baru dibuka resmi pada <strong className="text-[#B4863A]">pukul 23.50 WIB</strong> di hari yang telah dijadwalkan (akhir pekan, akhir bulan, atau akhir pembelajaran).
          </p>

          <div className="bg-[#FBF9F5] border border-[#E7E5E4] rounded-xl p-5 text-left text-xs space-y-3 mb-8 font-sans-body">
            <div className="flex justify-between items-center py-1 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Judul Evaluasi:</span>
              <span className="font-semibold text-[#0A192F] text-right">{assessment.title}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Jadwal Resmi:</span>
              <span className="font-medium text-[#0A192F]">Hari ke-{assessment.dayNumber}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Waktu Pembukaan Akses:</span>
              <span className="font-bold text-[#B4863A] font-mono">Pukul 23.50 WIB</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Format Soal:</span>
              <span className="font-medium text-[#0A192F]">Pilihan Ganda ({assessment.questions.length} Butir Soal)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#78716C]">Durasi & KKM:</span>
              <span className="font-medium text-[#0A192F]">{assessment.durationMinutes} Menit · Nilai Minimal: {assessment.passingScore}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#B4863A]" />
              <span>Kembali ke Beranda Peserta</span>
            </button>
          </div>

          <p className="text-[11px] text-[#A8A29E] mt-6 italic">
            *Catatan: Pembimbing dan penguji dapat mengaktifkan 'Bypass Kunci Jadwal' di Pengaturan Admin untuk meninjau materi ini sebelum jadwal.
          </p>
        </div>
      </div>
    );
  }

  if (completedAttempt) {
    const isPassing = (completedAttempt.totalScore ?? 0) >= assessment.passingScore;

    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">
            Evaluasi Berhasil Diserahkan
          </h2>
          <p className="text-sm text-stone-600 mb-6">
            Hasil pengerjaan {assessment.title} telah tersimpan resmi dalam arsip akademik.
          </p>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Status Evaluasi:</span>
              <span className="font-semibold text-emerald-800 capitalize">
                {completedAttempt.status === 'reviewed' ? 'Selesai Dinilai' : 'Menunggu Koreksi Pembimbing'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Nilai Perolehan:</span>
              <span className={`font-bold text-lg font-mono ${isPassing ? 'text-emerald-950' : 'text-amber-800'}`}>
                {completedAttempt.totalScore ?? 0} / {assessment.maxScore}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Standar Kelulusan (Passing Score):</span>
              <span className="font-mono text-stone-700">{assessment.passingScore} Poin</span>
            </div>
            {completedAttempt.mentorNotes && (
              <div className="pt-2 border-t border-stone-200 text-stone-700 leading-relaxed">
                <strong>Catatan Pembimbing:</strong> {completedAttempt.mentorNotes}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowReviewMode(!showReviewMode)}
              className="px-5 py-2.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
            >
              {showReviewMode ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan Lengkap Soal'}
            </button>

            {!isPassing && (
              <button
                onClick={handleStartRemedial}
                className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Ikuti Ujian Remedial (Perbaikan)
              </button>
            )}

            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-850 cursor-pointer shadow-xs"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>

        {/* Detailed Question Review & Explanations */}
        {showReviewMode && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Pembahasan Soal & Kunci Jawaban
              </h3>
              <span className="text-xs text-stone-500">{questions.length} Butir Soal</span>
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const ansObj = completedAttempt.answers.find(a => a.questionId === q.id);
                const isCorrect = (q.type === 'pilihan_ganda' || q.type === 'benar_salah') && ansObj?.participantAnswer === q.correctAnswer;

                return (
                  <div key={q.id} className="p-4 rounded-xl border border-stone-200 bg-[#FAF8F5] text-xs space-y-3">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-emerald-950 font-bold">Soal {idx + 1} ({q.points} Poin)</span>
                      {q.type !== 'uraian' ? (
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? '✓ Benar' : '✕ Belum Tepat'}
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-800 font-medium">
                          Nilai Esai: {ansObj?.awardedScore ?? 0} Poin
                        </span>
                      )}
                    </div>

                    <p className="font-semibold text-stone-900 text-sm">{q.questionText}</p>

                    {q.options && (
                      <div className="space-y-1.5 pl-2">
                        {q.options.map((opt, oIdx) => {
                          const isUserPicked = ansObj?.participantAnswer === oIdx;
                          const isRightAnswer = q.correctAnswer === oIdx;
                          return (
                            <div
                              key={oIdx}
                              className={`p-2 rounded text-xs flex items-center justify-between ${
                                isRightAnswer
                                  ? 'bg-emerald-100/70 text-emerald-950 font-semibold border border-emerald-300'
                                  : isUserPicked
                                  ? 'bg-rose-50 text-rose-900 font-medium border border-rose-200'
                                  : 'text-stone-600'
                              }`}
                            >
                              <span>{opt}</span>
                              {isRightAnswer && <span className="text-[10px] text-emerald-800 font-bold">Kunci Jawaban</span>}
                              {!isRightAnswer && isUserPicked && <span className="text-[10px] text-rose-700">Jawaban Anda</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {q.type === 'uraian' && (
                      <div className="space-y-2">
                        <div className="p-3 bg-white rounded border border-stone-200">
                          <span className="font-bold text-stone-800 block text-[11px] mb-1">Jawaban Anda:</span>
                          <p className="italic text-stone-700">"{String(ansObj?.participantAnswer || '')}"</p>
                        </div>
                        {ansObj?.feedback && (
                          <div className="p-2.5 bg-amber-50 rounded border border-amber-200 text-amber-950 text-[11px]">
                            <strong>Umpan Balik Pembimbing:</strong> {ansObj.feedback}
                          </div>
                        )}
                      </div>
                    )}

                    {q.explanation && (
                      <div className="p-3 bg-stone-100 rounded text-stone-700 text-[11px] leading-relaxed border-l-2 border-emerald-800">
                        <strong>Pembahasan Ilmiah:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Top Test Header */}
      <div className="bg-emerald-950 text-white rounded-xl p-5 mb-6 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">
            {assessment.assessmentType === 'mingguan'
              ? 'Evaluasi Pekanan (Ahad)'
              : assessment.assessmentType === 'bulanan'
              ? 'Evaluasi Komprehensif Bulanan'
              : 'Evaluasi Akhir Program Hari ke-90'}
          </span>
          <h1 className="text-lg font-bold">{assessment.title}</h1>
        </div>

        <div className="flex items-center gap-2 text-xs bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-800">
          <Clock className="w-4 h-4 text-amber-300" />
          <span>Waktu: {assessment.durationMinutes} Menit</span>
        </div>
      </div>

      {/* Progress Bar & Question Index */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6 shadow-xs">
        <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
          <span>Soal {currentQuestionIndex + 1} dari {questions.length}</span>
          <span>Terjawab: {answeredCount}/{questions.length} ({progressPercent}%)</span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-700 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Selector Numbers */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-stone-100">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
            const isCurrent = idx === currentQuestionIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-sky-950 text-cyan-200 shadow-xs ring-2 ring-cyan-500/50'
                    : isAnswered
                    ? 'bg-sky-100 text-sky-900 border border-sky-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-xs">
        
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-2 border-b border-slate-100">
          <span className="font-semibold text-sky-950 uppercase">
            {currentQ.type === 'pilihan_ganda' ? 'Pilihan Ganda' : currentQ.type === 'benar_salah' ? 'Benar / Salah' : 'Soal Uraian / Refleksi'}
          </span>
          <span className="font-mono text-slate-600">{currentQ.points} Poin</span>
        </div>

        <p className="text-base font-semibold text-slate-900 mb-6 leading-relaxed">
          {currentQ.questionText}
        </p>

        {/* Options for Multiple Choice or True/False */}
        {(currentQ.type === 'pilihan_ganda' || currentQ.type === 'benar_salah') && currentQ.options && (
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = answers[currentQ.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-sky-800 bg-sky-50 text-sky-950 font-medium ring-1 ring-sky-800'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                    isSelected ? 'border-sky-800 bg-sky-800 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Text Area for Essay Question */}
        {currentQ.type === 'uraian' && (
          <div className="space-y-3">
            <textarea
              rows={6}
              value={(answers[currentQ.id] as string) || ''}
              onChange={(e) => handleTextChange(currentQ.id, e.target.value)}
              placeholder="Tuliskan jawaban uraian Anda secara runut, jelas, dan berlandaskan dalil..."
              className="w-full text-xs sm:text-sm p-4 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-sky-800 focus:ring-1 focus:ring-sky-800"
            />
            {currentQ.rubricGuide && (
              <p className="text-[11px] text-slate-500 italic">
                * Rubrik penilaian pembimbing: {currentQ.rubricGuide}
              </p>
            )}
          </div>
        )}

      </div>

      {/* Navigation & Submit Controls */}
      <div className="flex items-center justify-between">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="flex items-center gap-3">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="px-5 py-2.5 rounded-lg bg-sky-950 hover:bg-sky-900 text-cyan-200 text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitTest}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs font-bold cursor-pointer flex items-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Seluruh Jawaban Evaluasi</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
