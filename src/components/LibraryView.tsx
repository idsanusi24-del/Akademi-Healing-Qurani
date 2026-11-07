import React, { useState } from 'react';
import { REFERENCES_LIBRARY } from '../data/referenceLibrary';
import { Search, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredReferences = REFERENCES_LIBRARY.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchAuthor = item.author.toLowerCase().includes(q);
      const matchNotes = item.notes.toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor && !matchNotes) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner with Scholarly Library Visual & Ocean Blue styling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-slate-200/90 border-t-4 border-t-cyan-500 overflow-hidden shadow-xs">
        
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-700/20 text-xs font-bold text-sky-950 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Perpustakaan Referensi Digital Mu'tabar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Sumber Rujukan Ilmiah & Kitab Induk
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans-app">
            Seluruh kurikulum bimbingan belajar Menata Hidup berlandaskan Al-Qur'an dan Sunnah yang shahih serta penjelasan para ulama terpercaya. Kami memprioritaskan karya-karya orisinal domain publik dan rujukan resmi yang dapat diverifikasi secara ilmiah.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-900 pt-1">
            <ShieldCheck className="w-4 h-4 text-sky-700" />
            <span>Semua rujukan dikurasi tanpa menyebarkan buku bajakan berhak cipta.</span>
          </div>
        </div>

        <div className="lg:col-span-5 h-64 lg:h-full min-h-[220px]">
          <img
            src="/src/assets/images/library_scholarly_books_1793079884339.jpg"
            alt="Rak buku kitab hadits dan fiqih klasik dengan pencahayaan hangat"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul kitab, ulama pengarang..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-sky-800"
          />
        </div>

        {/* Category Tabs in Ocean Blue */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-sky-950 to-sky-900 text-cyan-200 shadow-xs border border-cyan-400/30'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Semua Rujukan ({REFERENCES_LIBRARY.length})
          </button>
          <button
            onClick={() => setSelectedCategory('hadis')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'hadis'
                ? 'bg-gradient-to-r from-sky-950 to-sky-900 text-cyan-200 shadow-xs border border-cyan-400/30'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Hadis & Sunnah
          </button>
          <button
            onClick={() => setSelectedCategory('tazkiyatun_nafs')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'tazkiyatun_nafs'
                ? 'bg-gradient-to-r from-sky-950 to-sky-900 text-cyan-200 shadow-xs border border-cyan-400/30'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Tazkiyah & Kematian
          </button>
          <button
            onClick={() => setSelectedCategory('fikih')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'fikih'
                ? 'bg-gradient-to-r from-sky-950 to-sky-900 text-cyan-200 shadow-xs border border-cyan-400/30'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Fikih & Ibadah
          </button>
        </div>

      </div>

      {/* Reference Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReferences.map((ref) => (
          <div
            key={ref.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-cyan-400/70 hover:shadow-gold-soft transition-all group"
          >
            <div className="space-y-3">
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-sky-800 capitalize bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 text-[10px]">
                  {ref.category.replace('_', ' ')}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 font-bold border border-cyan-200">
                  {ref.verificationStatus}
                </span>
              </div>

              <h3 className="text-sm font-black text-slate-900 group-hover:text-sky-950 leading-snug transition-colors">
                {ref.title}
              </h3>

              <p className="text-xs font-medium text-slate-700">
                Pengarang: <span className="text-sky-950 font-bold">{ref.author}</span>
              </p>

              <div className="text-[11px] text-slate-500 space-y-0.5 border-t border-slate-100 pt-2 font-mono">
                <div>Bahasa: {ref.language}</div>
                {ref.publisher && <div>Penerbit: {ref.publisher}</div>}
                {ref.edition && <div>Edisi/Tahqiq: {ref.edition}</div>}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-slate-200/80 font-sans-app">
                {ref.notes}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 text-sky-900 font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-sky-700" />
                Rujukan Resmi Kurikulum
              </span>
              <span className="text-[10px] text-cyan-800 font-medium">Domain Publik / Legal</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
