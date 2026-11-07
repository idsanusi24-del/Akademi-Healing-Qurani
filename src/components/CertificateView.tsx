import React, { useState } from 'react';
import { Certificate } from '../types';
import { generateQrSvgPath } from '../utils/qrCode';
import { Printer, Share2, CheckCircle2, ArrowLeft } from 'lucide-react';

interface CertificateViewProps {
  certificate: Certificate;
  onBack: () => void;
  onNavigateToVerify: (token: string) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  certificate,
  onBack,
  onNavigateToVerify
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const verificationUrl = `${window.location.origin}?tab=verify&token=${certificate.verificationToken}`;
  const qrSvgPaths = generateQrSvgPath(verificationUrl, 90);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Action Header (Hidden in Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Tautan Tersalin!' : 'Salin Tautan Verifikasi'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-sky-950 hover:bg-sky-900 text-cyan-200 text-xs font-semibold flex items-center gap-1.5 shadow-md border border-cyan-400/30 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Unduh PDF Sertifikat</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Layout (Designed for Screen & Print) */}
      <div className="relative bg-[#FAF6EE] text-stone-900 p-8 sm:p-14 rounded-2xl border-8 border-double border-amber-800/40 shadow-2xl overflow-hidden font-serif">
        
        {/* Subtle Decorative Guilloche Arabesque Background Frame */}
        <div className="absolute inset-2 border-2 border-amber-700/30 rounded-xl pointer-events-none" />
        <div className="absolute inset-4 border border-sky-900/15 rounded-lg pointer-events-none" />

        <div className="relative z-10 text-center space-y-6">
          
          {/* Institution Header */}
          <div className="space-y-1">
            <div className="text-sm font-sans tracking-widest text-sky-950 font-bold uppercase">
              BIMBINGAN BELAJAR ISLAM TERPADU
            </div>
            <div className="font-arabic text-2xl text-amber-900">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-sky-950 font-sans-app uppercase">
              SERTIFIKAT KELULUSAN RESMI
            </h1>
            <p className="text-xs font-sans text-stone-600 font-medium">
              Nomor Registrasi: <span className="font-mono font-bold text-stone-900">{certificate.certificateNumber}</span>
            </p>
          </div>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto my-2" />

          {/* Statement */}
          <div className="max-w-2xl mx-auto space-y-3 font-sans">
            <p className="text-xs text-stone-600 uppercase tracking-widest font-semibold">
              Diberikan dengan penuh kehormatan kepada:
            </p>

            {/* Participant Name */}
            <div className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-wide font-serif py-1 border-b border-stone-300 max-w-lg mx-auto">
              {certificate.participantName}
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-2">
              Telah menyelesaikan secara paripurna kurikulum akademik 90 hari kalender, ujian komprehensif, dan tugas praktik pada program:
            </p>

            <h2 className="text-base sm:text-lg font-bold text-sky-950 font-serif">
              "{certificate.programTitle}"
            </h2>

            <p className="text-xs text-stone-600 italic">
              "Menata Akidah, Memperbaiki Akhlak, Membersihkan Jiwa, Mengamalkan Syariat, dan Mempersiapkan Kehidupan Akhirat."
            </p>
          </div>

          {/* Academic Predicate & Grade */}
          <div className="inline-flex items-center gap-6 px-6 py-2.5 rounded-xl bg-white/90 border border-amber-300 shadow-xs font-sans text-xs">
            <div>
              <span className="text-stone-500 block text-[10px]">Nilai Kumulatif:</span>
              <span className="font-bold text-sm text-sky-950 font-mono">{certificate.finalScore} / 100</span>
            </div>
            <div className="w-px h-6 bg-stone-300" />
            <div>
              <span className="text-stone-500 block text-[10px]">Predikat Kelulusan:</span>
              <span className="font-bold text-sm text-amber-900">{certificate.predicate}</span>
            </div>
            <div className="w-px h-6 bg-stone-300" />
            <div>
              <span className="text-stone-500 block text-[10px]">Status:</span>
              <span className="font-bold text-xs text-sky-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi Sah
              </span>
            </div>
          </div>

          {/* Signatures & Seal Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center pt-8 border-t border-amber-900/15 font-sans">
            
            {/* Left: Verification QR Code */}
            <div className="flex flex-col items-center sm:items-start text-left">
              <div 
                onClick={() => onNavigateToVerify(certificate.verificationToken)}
                className="p-2 bg-white rounded-lg border border-stone-300 shadow-xs cursor-pointer hover:border-sky-700 transition-colors"
                title="Klik untuk memverifikasi keaslian sertifikat"
              >
                <svg
                  width="84"
                  height="84"
                  viewBox="0 0 90 90"
                  dangerouslySetInnerHTML={{ __html: qrSvgPaths }}
                />
              </div>
              <span className="text-[10px] text-stone-500 mt-1.5 font-mono">
                Pindai QR untuk Verifikasi
              </span>
              <span className="text-[10px] text-sky-900 font-semibold cursor-pointer underline" onClick={() => onNavigateToVerify(certificate.verificationToken)}>
                Periksa Status Online
              </span>
            </div>

            {/* Middle: Gold Embossed Seal Emblem */}
            <div className="flex flex-col items-center justify-center">
              <img
                src="/src/assets/images/certificate_seal_gold_1793079884281.jpg"
                alt="Segel Emas Resmi Lembaga"
                className="w-24 h-24 object-contain drop-shadow-md"
              />
              <span className="text-[10px] tracking-wider text-amber-900 font-bold uppercase mt-1">
                Segel Sah Lembaga
              </span>
            </div>

            {/* Right: Mentor Signature & Date */}
            <div className="text-center sm:text-right space-y-1">
              <p className="text-[11px] text-stone-500">
                Diterbitkan pada: {certificate.issuedAt}
              </p>
              
              {/* Handwritten signature aesthetic representation */}
              <div className="py-2">
                <span className="font-serif italic text-xl text-sky-950 font-bold tracking-tight block">
                  {certificate.mentorName}
                </span>
                <div className="w-40 h-0.5 bg-stone-400 mx-auto sm:ml-auto mt-1" />
              </div>

              <p className="text-xs font-bold text-stone-900">
                {certificate.mentorName}
              </p>
              <p className="text-[11px] text-stone-500">
                {certificate.mentorTitle}
              </p>
            </div>

          </div>

          {/* Legal Nonformal Education Clause (Section J requirement) */}
          <div className="pt-4 text-[10px] text-stone-500 font-sans border-t border-stone-200">
            Sertifikat ini adalah bukti kelulusan bimbingan belajar pendidikan Islam nonformal yang disahkan secara terverifikasi oleh pengasuh akademik program Menata Hidup. Sertifikat ini bukan merupakan ijazah pendidikan formal atau sertifikasi profesi negara.
          </div>

        </div>

      </div>

    </div>
  );
};
