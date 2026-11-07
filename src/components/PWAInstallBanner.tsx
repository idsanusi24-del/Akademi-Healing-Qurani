import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      return;
    }

    // Check if previously dismissed in this session
    const isDismissed = sessionStorage.getItem('mh_pwa_banner_dismissed');
    if (isDismissed) return;

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If on iOS and not standalone, show after small delay
    if (isIosDevice && !isStandalone) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) {
      alert("Untuk memasang aplikasi ini di layar utama Anda, buka menu browser (titik tiga) lalu pilih 'Pasang Aplikasi' atau 'Tambahkan ke Layar Utama'.");
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('mh_pwa_banner_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white px-4 py-3 shadow-lg border-b border-cyan-500/30 transition-all print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-xs">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                <span>Pasang Aplikasi MENATA HIDUP di Ponsel / Tablet</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-sky-800 text-cyan-200 rounded border border-sky-700">
                  Offline Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Akses materi harian, mutaba'ah, dan hafalan dalil tanpa kuota internet dengan memasang langsung ke layar utama.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-500 hover:to-sky-600 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pasang di Layar Utama</span>
            </button>

            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg hover:bg-sky-800/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Tutup pemberitahuan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* iOS Safari Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-sky-950">
                Petunjuk Pasang di iPhone / iPad
              </h3>
              <button onClick={() => setShowIOSGuide(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <ol className="text-xs text-slate-700 space-y-3 list-decimal pl-4">
              <li>
                Buka website ini menggunakan browser <strong>Safari</strong> di perangkat iOS Anda.
              </li>
              <li>
                Ketuk tombol <strong>Bagikan (Share)</strong> di bagian bawah layar (ikon kotak dengan panah ke atas).
              </li>
              <li>
                Gulir ke bawah dan pilih <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>.
              </li>
              <li>
                Ketuk <strong>"Tambah" (Add)</strong> di pojok kanan atas. Ikon aplikasi MENATA HIDUP akan muncul di layar ponsel Anda!
              </li>
            </ol>

            <button
              onClick={() => {
                setShowIOSGuide(false);
                handleDismiss();
              }}
              className="w-full py-2 rounded-lg bg-sky-950 text-cyan-200 text-xs font-bold"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
};
