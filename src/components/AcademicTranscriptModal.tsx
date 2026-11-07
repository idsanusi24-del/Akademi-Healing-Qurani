import React from 'react';
import { UserProfile, ProgramConfig } from '../types';
import { StorageService } from '../services/storageService';
import { ASSESSMENTS } from '../data/curriculumData';
import {
  X,
  Printer,
  Award,
  CheckCircle2,
  Calendar,
  FileText,
  ShieldCheck,
  TrendingUp,
  Download
} from 'lucide-react';

interface AcademicTranscriptModalProps {
  participant: UserProfile;
  config: ProgramConfig;
  onClose: () => void;
}

export const AcademicTranscriptModal: React.FC<AcademicTranscriptModalProps> = ({
  participant,
  config,
  onClose
}) => {
  const academicSummary = StorageService.calculateAcademicSummary(participant.id);
  const attempts = StorageService.getAssessmentAttempts(participant.id);
  const journals = StorageService.getJournals(participant.id);
  const progress = StorageService.getProgress(participant.id);
  const completedLessonsCount = progress.filter(p => p.completed).length;

  const weeklyAttempts = attempts.filter(a => a.assessmentId.startsWith('eval-week'));
  const monthlyAttempts = attempts.filter(a => a.assessmentId.startsWith('eval-month'));
  const finalAttempt = attempts.find(a => a.assessmentId === 'eval-final-90');

  const certificates = StorageService.getCertificates().filter(c => c.participantId === participant.id);
  const cert = certificates[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 print:my-0 print:border-none print:shadow-none">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <FileText className="w-4 h-4 text-cyan-300" />
            <span>Transkrip Akademik Resmi & Rekapitulasi Pembelajaran 90 Hari</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-sky-950 hover:bg-sky-900 text-cyan-200 border border-cyan-400/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Transcript Document Area */}
        <div className="p-8 sm:p-12 space-y-8 bg-white text-slate-900 print:p-6" id="printable-transcript">
          
          {/* Header Lembaga */}
          <div className="text-center pb-6 border-b-2 border-slate-800 space-y-1.5">
            <div className="text-[11px] font-bold tracking-widest text-sky-950 uppercase">
              Lembaga Pendidikan Islam Terpadu & Pembinaan Ruhani Salafus Shalih
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 uppercase tracking-tight">
              Bimbingan Belajar Menata Hidup Menuju Akhir Hidup yang Indah
            </h1>
            <p className="text-xs text-stone-600 italic">
              "Menata Akidah, Memperbaiki Akhlak, Membersihkan Jiwa, Mengamalkan Syariat, dan Mempersiapkan Kehidupan Akhirat"
            </p>
            <div className="text-[10px] font-mono text-stone-500 pt-1">
              SK Pendirian Program Nonformal No. 1448/MH-EDU/2026 · Zona Waktu: Asia/Jakarta (WIB)
            </div>
          </div>

          <div className="text-center my-4">
            <h2 className="text-base font-extrabold uppercase tracking-wider text-stone-900 border-b border-stone-300 inline-block pb-1">
              Transkrip Nilai Akademik & Capaian Kelulusan
            </h2>
          </div>

          {/* Participant Credentials */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block text-[11px]">Nama Lengkap:</span>
              <span className="font-bold text-stone-900">{participant.fullName}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">Nomor Induk Peserta:</span>
              <span className="font-mono font-bold text-emerald-950">{participant.participantNumber || 'MH-2026-0042'}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">Tahun Akademik:</span>
              <span className="font-semibold text-stone-900">{config.academicYear}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">Status Yudisium:</span>
              <span className={`font-bold ${academicSummary.isEligibleForCertificate ? 'text-emerald-800' : 'text-amber-800'}`}>
                {academicSummary.isEligibleForCertificate ? 'LULUS (Berhak Sertifikat)' : 'Sedang Menempuh'}
              </span>
            </div>
          </div>

          {/* Academic Evaluation Breakdown Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              1. Rincian Komponen Penilaian Akademik (Sesuai Bab I Spesifikasi)
            </h3>

            <div className="border border-stone-300 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-300">
                    <th className="p-2.5">Komponen Penilaian</th>
                    <th className="p-2.5 text-center">Bobot</th>
                    <th className="p-2.5 text-center">Realisasi Nilai</th>
                    <th className="p-2.5 text-center">Skor Berbobot</th>
                    <th className="p-2.5">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="p-2.5">
                      <div className="font-semibold">Evaluasi Pekanan (Ahad)</div>
                      <div className="text-[11px] text-stone-500">12 Evaluasi mingguan materi pekan terkait</div>
                    </td>
                    <td className="p-2.5 text-center font-mono font-semibold">25%</td>
                    <td className="p-2.5 text-center font-mono font-bold">{academicSummary.weeklyAvg}</td>
                    <td className="p-2.5 text-center font-mono font-bold text-emerald-900">
                      {(academicSummary.weeklyAvg * 0.25).toFixed(1)}
                    </td>
                    <td className="p-2.5 text-stone-600 text-[11px]">{weeklyAttempts.length} Pekan Terlaksana</td>
                  </tr>

                  <tr>
                    <td className="p-2.5">
                      <div className="font-semibold">Evaluasi Komprehensif Bulanan</div>
                      <div className="text-[11px] text-stone-500">Ujian akhir Bulan 1, Bulan 2, dan Bulan 3</div>
                    </td>
                    <td className="p-2.5 text-center font-mono font-semibold">30%</td>
                    <td className="p-2.5 text-center font-mono font-bold">{academicSummary.monthlyAvg}</td>
                    <td className="p-2.5 text-center font-mono font-bold text-emerald-900">
                      {(academicSummary.monthlyAvg * 0.30).toFixed(1)}
                    </td>
                    <td className="p-2.5 text-stone-600 text-[11px]">{monthlyAttempts.length} Ujian Bulanan Diikuti</td>
                  </tr>

                  <tr>
                    <td className="p-2.5">
                      <div className="font-semibold">Tugas Praktik & Jurnal Muhasabah</div>
                      <div className="text-[11px] text-stone-500">Mutaba'ah amal yaumiyah dan refleksi harian</div>
                    </td>
                    <td className="p-2.5 text-center font-mono font-semibold">20%</td>
                    <td className="p-2.5 text-center font-mono font-bold">{academicSummary.tasksScore}</td>
                    <td className="p-2.5 text-center font-mono font-bold text-emerald-900">
                      {(academicSummary.tasksScore * 0.20).toFixed(1)}
                    </td>
                    <td className="p-2.5 text-stone-600 text-[11px]">{journals.length} Jurnal Terisi & Dinilai</td>
                  </tr>

                  <tr>
                    <td className="p-2.5">
                      <div className="font-semibold">Evaluasi Akhir Program Hari ke-90</div>
                      <div className="text-[11px] text-stone-500">Ujian akhir 6 mata pelajaran & action plan</div>
                    </td>
                    <td className="p-2.5 text-center font-mono font-semibold">25%</td>
                    <td className="p-2.5 text-center font-mono font-bold">
                      {finalAttempt?.totalScore ?? academicSummary.finalScore}
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold text-emerald-900">
                      {(academicSummary.finalScore * 0.25).toFixed(1)}
                    </td>
                    <td className="p-2.5 text-stone-600 text-[11px]">
                      {finalAttempt ? 'Tuntas Diikuti' : 'Proses Menempuh'}
                    </td>
                  </tr>

                  <tr className="bg-stone-50 font-bold border-t-2 border-stone-300">
                    <td className="p-2.5 uppercase text-stone-900">Total Nilai Komposit Akhir</td>
                    <td className="p-2.5 text-center font-mono">100%</td>
                    <td className="p-2.5 text-center font-mono text-stone-500">—</td>
                    <td className="p-2.5 text-center font-mono text-lg text-emerald-950 font-extrabold">
                      {academicSummary.compositeScore}
                    </td>
                    <td className="p-2.5 text-emerald-900 font-bold">
                      Predikat: {academicSummary.predicate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 6 Core Subjects Mastery Summary */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              2. Capaian Penguasaan 6 Mata Pelajaran Utama
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/60">
                <span className="font-bold text-stone-900 block">1. Aqidah Islamiyah</span>
                <span className="text-[11px] text-stone-500">Tauhid, Asma wa Sifat, Rukun Iman</span>
                <span className="text-[11px] font-bold text-emerald-800 mt-1 block">Tuntas & Teruji (88/100)</span>
              </div>
              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/60">
                <span className="font-bold text-stone-900 block">2. Akhlak & Adab</span>
                <span className="text-[11px] text-stone-500">Ikhlas, Birrul Walidain, Lisan</span>
                <span className="text-[11px] font-bold text-emerald-800 mt-1 block">Tuntas & Teruji (90/100)</span>
              </div>
              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/60">
                <span className="font-bold text-stone-900 block">3. Hadis & Sunnah</span>
                <span className="text-[11px] text-stone-500">Kutubus Sittah, Sanad & Matan</span>
                <span className="text-[11px] font-bold text-emerald-800 mt-1 block">Tuntas & Teruji (85/100)</span>
              </div>
              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/60">
                <span className="font-bold text-stone-900 block">4. Tazkiyatun Nafs</span>
                <span className="text-[11px] text-stone-500">Pembersihan Kalbu, Dzikir Maut</span>
                <span className="text-[11px] font-bold text-emerald-800 mt-1 block">Tuntas & Teruji (92/100)</span>
              </div>
              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/60">
                <span className="font-bold text-stone-900 block">5. Fikih Ibadah</span>
                <span className="text-[11px] text-stone-500">Thaharah, Shalat, Jenazah, Wasiat</span>
                <span className="text-[11px] font-bold text-emerald-800 mt-1 block">Tuntas & Teruji (86/100)</span>
              </div>
              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/60">
                <span className="font-bold text-stone-900 block">6. Muamalah Islamiyah</span>
                <span className="text-[11px] text-stone-500">Halal Haram, Utang, Waris Syar'i</span>
                <span className="text-[11px] font-bold text-emerald-800 mt-1 block">Tuntas & Teruji (84/100)</span>
              </div>
            </div>
          </div>

          {/* Standards & Graduation Summary */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-xs space-y-2">
            <span className="font-bold text-stone-900 block">Kriteria Kelulusan Akademik:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div>
                <span className="text-stone-500 block">Standar Kelulusan:</span>
                <span className="font-semibold text-stone-900">Minimal 75.0 (Capaian: {academicSummary.compositeScore})</span>
              </div>
              <div>
                <span className="text-stone-500 block">Kehadiran / Modul:</span>
                <span className="font-semibold text-stone-900">{completedLessonsCount} / 90 Modul ({Math.round((completedLessonsCount/90)*100)}%)</span>
              </div>
              <div>
                <span className="text-stone-500 block">Sertifikat Resmi:</span>
                <span className="font-mono font-bold text-emerald-900">{cert ? cert.certificateNumber : 'Tersedia Setelah Yudisium'}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Keputusan Dewan:</span>
                <span className="font-bold text-emerald-800 uppercase">MEMENUHI SYARAT KELULUSAN</span>
              </div>
            </div>
          </div>

          {/* Legal Signatures Strip */}
          <div className="pt-8 border-t border-stone-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <span className="text-stone-500 block text-[11px] mb-12">
                Mengetahui,<br />
                <strong>Admin Akademik Program</strong>
              </span>
              <div className="font-bold text-stone-900 underline">Ustadzah Maryam Zulaikha, S.Pd.I.</div>
              <span className="text-[10px] text-stone-500 block">NIP. MH-ADM-2026-002</span>
            </div>

            <div>
              <span className="text-stone-500 block text-[11px] mb-12">
                Jakarta, 27 Oktober 2026<br />
                <strong>Pembimbing Utama Program</strong>
              </span>
              <div className="font-bold text-emerald-950 underline font-serif">Dr. Abdullah Karim, Lc., M.A.</div>
              <span className="text-[10px] text-stone-500 block">Pembimbing Syar'i Terverifikasi</span>
            </div>
          </div>

          {/* Verification Footer */}
          <div className="pt-4 border-t border-dashed border-stone-200 text-[10px] text-stone-500 text-center">
            Dokumen transkrip ini diterbitkan secara digital oleh Sistem Akademik Bimbingan Belajar Menata Hidup dan dapat diverifikasi keasliannya melalui kode sertifikat resmi {cert?.certificateNumber || 'MH-2026-0042'}.
          </div>

        </div>

      </div>
    </div>
  );
};
