import React from 'react';
import { ShieldCheck, Award, Download } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A192F] text-[#D6CEBE] border-t border-[#1E3A5F] text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#B4863A] to-[#8C6322] text-[#0A192F] flex items-center justify-center font-bold text-lg shadow-sm">
                <span className="font-arabic text-xl -mt-0.5">م</span>
              </div>
              <div>
                <span className="font-serif-display font-medium text-white text-lg tracking-tight block">
                  MENATA HIDUP
                </span>
                <span className="text-[11px] text-[#B4863A] font-medium tracking-wide block -mt-1 font-sans-body">
                  Bimbingan Belajar Islam 90 Hari
                </span>
              </div>
            </div>

            <p className="text-[#A8A29E] leading-relaxed max-w-sm font-sans-body text-xs">
              Platform bimbingan belajar Islam nonformal terstruktur selama 90 hari kalender. Menata pemahaman syariat dari dasar hingga kesiapan penuh menghadapi akhir kehidupan yang indah.
            </p>

            <div className="py-3 border-y border-[#1E3A5F]">
              <p className="text-[#F5E2A8] italic text-[11px] font-serif-display leading-relaxed">
                "Menata Akidah, Memperbaiki Akhlak, Membersihkan Jiwa, Mengamalkan Syariat, dan Mempersiapkan Kehidupan Akhirat."
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-sans-body">
            <h4 className="font-serif-display text-sm text-white font-medium">
              Navigasi Akademik
            </h4>
            <ul className="space-y-2 text-[#A8A29E] text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Beranda Program
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('curriculum')} className="hover:text-white transition-colors cursor-pointer">
                  Kurikulum Kalender 90 Hari
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subjects')} className="hover:text-white transition-colors cursor-pointer">
                  6 Pilar Mata Pelajaran
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('library')} className="hover:text-white transition-colors cursor-pointer">
                  Perpustakaan Kitab Mu'tabar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  Tentang Program & Manhaj
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('verify')} className="hover:text-white transition-colors cursor-pointer">
                  Verifikasi Sertifikat Digital
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-white transition-colors cursor-pointer">
                  Pusat Bantuan & Panduan Belajar
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="/menata-hidup-source-code.zip"
                  download="menata-hidup-source-code.zip"
                  className="text-[#B4863A] hover:text-[#F5E2A8] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Unduh seluruh source code proyek dalam format ZIP"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Source Code (ZIP)</span>
                  <span className="text-[10px] bg-[#1E3A5F] text-[#D6CEBE] px-1.5 py-0.2 rounded font-mono">2.9 MB</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Core Foundations */}
          <div className="md:col-span-4 space-y-3 font-sans-body">
            <h4 className="font-serif-display text-sm text-white font-medium">
              Landasan Ilmiah & Syar'i
            </h4>
            <p className="text-[#A8A29E] text-xs leading-relaxed">
              Seluruh materi disusun berdasarkan Al-Qur'an dan Sunnah yang shahih menurut pemahaman Salafus Shalih. Mengedepankan ketepatan takhrij hadis, penjelasan ulama mu'tabar, serta implementasi amal nyata.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs">
              <span className="flex items-center gap-2 text-[#D6CEBE]">
                <ShieldCheck className="w-4 h-4 text-[#B4863A]" />
                Sistem Jadwal Pembukaan 23.59 WIB (Asia/Jakarta)
              </span>
              <span className="flex items-center gap-2 text-[#D6CEBE]">
                <Award className="w-4 h-4 text-[#B4863A]" />
                Sertifikat & Transkrip Resmi Pembimbing
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-[#1E3A5F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C] font-sans-body">
          <div>
            &copy; 1448 H / 2026 M Bimbingan Belajar Menata Hidup. Hak Cipta Dilindungi.
          </div>
          <div className="text-[#B4863A] font-medium">
            Pendidikan Islam Nonformal · Menuju Husnul Khatimah
          </div>
        </div>

      </div>
    </footer>
  );
};
