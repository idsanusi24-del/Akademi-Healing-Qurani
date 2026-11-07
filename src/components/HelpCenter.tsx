import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail } from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Jadwal & Waktu',
    question: 'Kapan materi harian terbuka dan bisa dipelajari?',
    answer: 'Materi harian dalam keadaan terkunci sebelum waktunya. Materi dibuka mulai pukul 23.59 WIB (Waktu Indonesia Barat / Asia Jakarta) dan seterusnya. Materi yang telah terbuka akan tetap dapat dibaca dan diulang kembali kapan pun selama periode bimbingan berlangsung.'
  },
  {
    id: 'faq-2',
    category: 'Jadwal & Waktu',
    question: 'Bagaimana jika saya tertinggal membaca materi beberapa hari karena kesibukan?',
    answer: 'Materi yang telah lewat tanggal pembukaannya tidak akan terkunci kembali. Anda dapat membaca materi yang tertinggal kapan saja. Namun, kami sangat menganjurkan untuk menjaga keistiqamahan membaca satu hari satu materi agar pemahaman dan pembentukan kebiasaan amal terbentuk secara optimal.'
  },
  {
    id: 'faq-3',
    category: 'Evaluasi & Ujian',
    question: 'Kapan waktu pelaksanaan evaluasi mingguan dan evaluasi bulanan?',
    answer: 'Evaluasi mingguan dan materi baru dibuka mulai pukul 23.59 WIB, menguji materi yang dipelajari pada pekan tersebut. Evaluasi komprehensif bulanan diselenggarakan pada akhir hari ke-30 (Bulan 1), hari ke-60 (Bulan 2), dan Evaluasi Akhir Program pada hari ke-90.'
  },
  {
    id: 'faq-4',
    category: 'Penilaian & Kelulusan',
    question: 'Bagaimana komposisi nilai akhir dan standar kelulusan program?',
    answer: 'Nilai akhir menggunakan skala 0–100 dengan bobot: Evaluasi Mingguan (25%), Evaluasi Bulanan (30%), Tugas & Jurnal Praktik (20%), dan Evaluasi Akhir Program (25%). Standar kelulusan menyaratkan: nilai komposit minimal 75, menyelesaikan minimal 80% materi wajib harian, menyelesaikan seluruh evaluasi bulanan dan akhir, serta memperoleh verifikasi kelulusan dari Pembimbing.'
  },
  {
    id: 'faq-5',
    category: 'Sertifikat',
    question: 'Apakah sertifikat kelulusan dapat diverifikasi oleh pihak luar?',
    answer: 'Ya. Setiap sertifikat kelulusan resmi memiliki nomor registrasi unik, tanda tangan pembimbing berwenang, dan Kode QR yang terhubung langsung ke laman verifikasi publik online (/verifikasi/:token) yang membuktikan keaslian dokumen tanpa risiko pemalsuan.'
  },
  {
    id: 'faq-6',
    category: 'Privasi & Jurnal',
    question: 'Apakah catatan Jurnal Muhasabah saya dapat dibaca oleh peserta lain?',
    answer: 'Sama sekali tidak. Jurnal Muhasabah & Praktik Harian dirancang dengan sistem perlindungan privasi yang ketat. Catatan batiniah, kelemahan diri, dan refleksi Anda bersifat rahasia dan hanya dapat diakses oleh Anda sendiri demi menjaga keikhlasan serta keleluasaan introspeksi.'
  },
  {
    id: 'faq-7',
    category: 'Landasan Ilmiah',
    question: 'Buku atau dalil apa saja yang menjadi rujukan dalam kurikulum ini?',
    answer: 'Seluruh materi bersumber dari Al-Qur\'an al-Karim, Kutubus Sittah (terutama Shahih al-Bukhari & Shahih Muslim), karya-karya induk Imam an-Nawawi (Riyadhus Shalihin, Al-Adzkar), Ibnul Qayyim (Al-Wabil ash-Shayyib, Madarij as-Salikin), Ibnu Rajab al-Hanbali (Jami\' al-Ulum wal Hikam), dan ulama mu\'tabar Ahlus Sunnah wal Jama\'ah. Rincian bibliografi lengkap dapat diakses pada menu Perpustakaan.'
  }
];

export const HelpCenter: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = selectedCategory === 'all'
    ? FAQ_LIST
    : FAQ_LIST.filter(f => f.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center mx-auto mb-2 border border-sky-200">
          <HelpCircle className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pusat Bantuan & Panduan Akademik
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Temukan jawaban atas pertanyaan seputar jadwal harian WIB, mekanisme ujian Ahad, standar kelulusan, dan pengesahan sertifikat resmi.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto p-1 bg-slate-100 rounded-lg max-w-md mx-auto">
        {['all', 'Jadwal & Waktu', 'Evaluasi & Ujian', 'Penilaian & Kelulusan', 'Sertifikat', 'Privasi & Jurnal'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-sky-950 shadow-xs border border-sky-200 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat === 'all' ? 'Semua Kategori' : cat}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {faq.question}
                </span>
                <span className="text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3 bg-[#F8FAFC]/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Card in Ocean Blue */}
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-cyan-500/30">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold flex items-center gap-2 justify-center sm:justify-start">
            <Mail className="w-5 h-5 text-cyan-300" />
            <span>Memerlukan Bimbingan Tambahan?</span>
          </h3>
          <p className="text-xs text-slate-300 max-w-md">
            Apabila Anda memiliki pertanyaan mendalam terkait materi akidah atau membutuhkan konsultasi dengan ustadz pembimbing, silakan kirimkan permohonan melalui email resmi akademik.
          </p>
        </div>

        <div className="text-center sm:text-right shrink-0">
          <div className="font-mono text-xs font-bold text-cyan-200 bg-sky-900/80 px-4 py-2 rounded-lg border border-cyan-400/30">
            bimbingan@menatahidup.id
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Respons dalam 1x24 jam kerja</span>
        </div>
      </div>

    </div>
  );
};
