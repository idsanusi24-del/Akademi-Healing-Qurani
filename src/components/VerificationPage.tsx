import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { Certificate } from '../types';
import { Search, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface VerificationPageProps {
  initialToken?: string;
  onOpenCertificateView?: (cert: Certificate) => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({
  initialToken = '',
  onOpenCertificateView
}) => {
  const [tokenInput, setTokenInput] = useState(initialToken);
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialToken.trim()) {
      handleSearch(initialToken.trim());
    }
  }, [initialToken]);

  const handleSearch = (searchStr: string) => {
    setHasSearched(true);
    const cert = StorageService.getCertificateByToken(searchStr.trim());
    setVerifiedCert(cert || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      handleSearch(tokenInput);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center mx-auto mb-2 border border-sky-200">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Verifikasi Keaslian Sertifikat Digital
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Masukkan Nomor Sertifikat (contoh: <span className="font-mono font-semibold text-slate-800">MH-2026-89412</span>) atau Token Verifikasi unik untuk memeriksa keabsahan dokumen dalam basis data resmi.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-10">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Ketik Nomor Sertifikat atau Token..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-sky-800 shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Periksa Data
          </button>
        </div>
      </form>

      {/* Result Card */}
      {hasSearched && verifiedCert && (
        <div className="bg-white rounded-2xl border border-sky-300 p-6 sm:p-8 shadow-lg max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                Status Dokumen: Terverifikasi Sah & Terdaftar
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {verifiedCert.participantName}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 text-xs">
            <div>
              <span className="text-slate-500 block">Nomor Sertifikat:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{verifiedCert.certificateNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Tanggal Penerbitan:</span>
              <span className="font-semibold text-slate-800">{verifiedCert.issuedAt}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Program Bimbingan:</span>
              <span className="font-semibold text-slate-800">{verifiedCert.programTitle}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Predikat Kelulusan:</span>
              <span className="font-bold text-sky-950">{verifiedCert.predicate} ({verifiedCert.finalScore}/100)</span>
            </div>
            <div>
              <span className="text-slate-500 block">Pembimbing Pengesah:</span>
              <span className="font-semibold text-slate-800">{verifiedCert.mentorName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Kode Token Kriptografis:</span>
              <span className="font-mono text-[11px] text-slate-600 truncate block">{verifiedCert.verificationToken}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Basis data resmi Program Menata Hidup (Pendidikan Islam Nonformal)
            </span>

            {onOpenCertificateView && (
              <button
                onClick={() => onOpenCertificateView(verifiedCert)}
                className="text-xs font-semibold text-sky-800 hover:text-sky-950 underline cursor-pointer"
              >
                Lihat Tampilan Sertifikat Lengkap →
              </button>
            )}
          </div>

        </div>
      )}

      {hasSearched && !verifiedCert && (
        <div className="bg-rose-50 rounded-2xl border border-rose-200 p-8 text-center max-w-md mx-auto">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-rose-900">Sertifikat Tidak Ditemukan</h3>
          <p className="text-xs text-rose-700 mt-1">
            Nomor sertifikat atau token yang Anda masukkan tidak sesuai dengan catatan resmi. Mohon periksa kembali ejaan karakter.
          </p>
        </div>
      )}

    </div>
  );
};
