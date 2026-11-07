import React from 'react';
import { ShieldCheck, BookOpen, Award, CheckCircle, Sparkles, Star } from 'lucide-react';

interface AboutProgramProps {
  onRegisterClick: () => void;
  onExploreCurriculum: () => void;
}

export const AboutProgram: React.FC<AboutProgramProps> = ({
  onRegisterClick,
  onExploreCurriculum
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero Intro */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-700/20 text-xs font-bold text-sky-950 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>Mengenal Bimbingan Belajar Islam Terpadu</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
          Bimbingan Belajar Menata Hidup Menuju <span className="text-sky-950">Akhir Hidup</span> yang Indah
        </h1>
        <div className="p-3 bg-[#F8FAFC] rounded-xl border-y border-cyan-500/30">
          <p className="text-sm sm:text-base text-sky-950 font-serif italic">
            "Menata Akidah, Memperbaiki Akhlak, Membersihkan Jiwa, Mengamalkan Syariat, dan Mempersiapkan Kehidupan Akhirat."
          </p>
        </div>
      </div>

      {/* 1. Visi & Filosofi Pendidikan */}
      <div className="bg-white rounded-2xl border border-slate-200/90 border-t-4 border-t-sky-800 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-sky-50 text-sky-900">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>Visi dan Filosofi Pendidikan Islam 90 Hari</span>
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed font-sans-app">
          Setiap manusia yang bernyawa niscaya akan merasakan kematian. Kematian bukanlah akhir dari eksistensi, melainkan gerbang awal menuju pengadilan abadi di hadapan Allah Rabbul ‘Alamin. Namun, kesibukan duniawi kerap melalaikan seorang Muslim dari menyiapkan bekal terbaik: akidah yang murni dari noda syirik, akhlak mulia, batin yang bersih dari dendam dan riya, serta penunaian hak-hak sesama hamba.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed font-sans-app">
          Program <strong>Menata Hidup</strong> hadir sebagai wadah pendidikan Islam nonformal yang memandu peserta secara sistematis, hari demi hari selama <strong>90 hari kalender (tiga bulan penuh)</strong>. Kami memadukan kedalaman ilmu syar'i dengan bimbingan praktis amal saleh yang realistis diamalkan di tengah dinamika kehidupan sehari-hari.
        </p>
      </div>

      {/* 2. Landasan Ilmiah & Manhaj */}
      <div className="bg-[#F8FAFC] rounded-2xl border-2 border-sky-900/15 p-6 sm:p-10 space-y-4">
        <h2 className="text-lg font-black text-sky-950 border-b border-sky-900/10 pb-3 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-sky-900 text-cyan-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span>Landasan Ilmiah dan Prinsip Pengajaran Syar'i</span>
        </h2>
        <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5 stroke-[2.5]" />
            <span><strong>Berakar pada Al-Qur'an dan Sunnah yang Shahih:</strong> Mengedepankan sanad yang mu'tabar dan penilaian hadis dari para imam ahli hadits (Al-Bukhari, Muslim, An-Nawawi, Ibnu Rajab, dll).</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5 stroke-[2.5]" />
            <span><strong>Pemahaman Salafus Shalih:</strong> Mempelajari akidah dan ibadah dengan pemahaman generasi sahabat dan tabi'in yang paling bersih dari penyimpangan.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5 stroke-[2.5]" />
            <span><strong>Anti-Manipulasi Emosional:</strong> Kami tidak menjanjikan jaminan otomatis masuk surga hanya dengan mendaftar, melainkan mendidik peserta menata iman, ilmu, dan amal saleh yang diridhai Allah Ta'ala.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5 stroke-[2.5]" />
            <span><strong>Integritas Rujukan:</strong> Tidak mengarang kutipan, nomor hadis, maupun nomor halaman kitab. Semua sumber rujukan dapat diverifikasi dalam Perpustakaan Referensi Digital.</span>
          </li>
        </ul>
      </div>

      {/* 3. Tiga Tahap Perjalanan 90 Hari */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-cyan-500" />
          <span>Tiga Tahap Perjalanan Belajar 90 Hari</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 border-t-3 border-t-sky-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider mb-1.5 px-2 py-0.5 rounded bg-sky-50 inline-block">
                Bulan Pertama (Hari 1–30)
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">
                Membenahi Dasar Kehidupan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans-app">
                Mengenal tujuan penciptaan, membersihkan niat, memahami syahadatain dan tauhid, serta membangun kebiasaan muhasabah dan bersuci secara benar.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-sky-800 font-mono">
              Evaluasi: 4 Ujian Ahad + Ujian Bulanan 1
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 border-t-3 border-t-cyan-600 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider mb-1.5 px-2 py-0.5 rounded bg-cyan-50 inline-block">
                Bulan Kedua (Hari 31–60)
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">
                Membersihkan Jiwa & Menunaikan Hak
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans-app">
                Terapi penyakit hati (hasad, ujub, kibr), adab lisan dari ghibah, harmoni keluarga dan tetangga, ibadah shalat berjamaah dan sunnah, serta perniagaan halal.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-cyan-800 font-mono">
              Evaluasi: 4 Ujian Ahad + Ujian Bulanan 2
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 border-t-3 border-t-sky-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider mb-1.5 px-2 py-0.5 rounded bg-sky-50 inline-block">
                Bulan Ketiga (Hari 61–90)
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">
                Memantapkan Amal & Akhirat
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans-app">
                Mengingat kematian dan alam kubur, wasiat syar'i, pengurusan jenazah, pelunasan utang piutang, amal jariyah, dan menyusun peta amal seumur hidup.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-sky-800 font-mono">
              Puncak: Evaluasi Akhir 90 Hari & Kelulusan
            </div>
          </div>

        </div>
      </div>

      {/* 4. Profil Pembimbing Utama */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs border-l-4 border-l-cyan-500">
        <h2 className="text-xs font-black text-sky-950 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-cyan-600" />
          Dewan Pembimbing Akademik
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <h3 className="text-lg font-black text-sky-950">
              Dr. Abdullah Karim, Lc., M.A.
            </h3>
            <p className="text-xs font-bold text-cyan-800">
              Pembimbing Utama & Pengasuh Keilmuan Menata Hidup
            </p>
            <p className="text-xs text-slate-700 leading-relaxed font-sans-app">
              Alumni Universitas Islam Madinah bidang Akidah dan Ushuluddin, aktif mengasuh majelis kajian tafsir, hadits, dan bimbingan tazkiyatun nafs. Berwenang memverifikasi jawaban esai, menguji peserta, serta mengesahkan sertifikat kelulusan resmi.
            </p>
          </div>
          <div className="space-y-2 bg-[#F8FAFC] p-5 rounded-xl border border-cyan-400/30">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              Komitmen Integritas Pembimbing:
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed italic font-serif">
              "Tanda tangan pembimbing pada sertifikat kelulusan bukanlah stempel otomatis, melainkan amanah hisab di hadapan Allah yang hanya diberikan setelah memeriksa penguasaan materi, kejujuran evaluasi, dan ketekunan amal peserta didik."
            </p>
          </div>
        </div>
      </div>

      {/* 5. CTA Pendaftaran & Penjelajahan in Ocean Blue */}
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 text-white rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-ocean-deep border-2 border-cyan-400/30">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Mulailah Menata Hidup Anda Hari Ini
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
          Setiap hembusan nafas yang tersisa adalah anugerah tak ternilai untuk bertaubat, memperbaiki amal, dan menyiapkan akhir hayat yang diridhai Allah Subhanahu wa Ta'ala.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
          <button
            onClick={onRegisterClick}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-500 hover:to-sky-600 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer border border-cyan-300"
          >
            Daftar Sebagai Peserta Baru Sekarang
          </button>
          <button
            onClick={onExploreCurriculum}
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 font-bold text-xs transition-all border border-cyan-400/40 cursor-pointer"
          >
            Lihat Silabus Kurikulum 90 Hari
          </button>
        </div>
      </div>

    </div>
  );
};
