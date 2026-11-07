import React, { useState } from 'react';
import { UserProfile, Role } from '../types';
import {
  Bell,
  User,
  CheckCircle2,
  ChevronDown,
  Download,
  LayoutDashboard,
  Calendar,
  BookOpen,
  HelpCircle,
  FileCheck2,
  Info,
  LogIn,
  UserPlus,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  onSelectUser: (userId: string) => void;
  activeTab: string;
  onNavigate: (tab: string) => void;
  currentDay: number;
  unreadNotifsCount: number;
  onOpenNotifications: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  allUsers,
  onSelectUser,
  activeTab,
  onNavigate,
  currentDay,
  unreadNotifsCount,
  onOpenNotifications,
  onOpenLogin,
  onOpenRegister
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const roleLabelMap: Record<Role, { title: string; badgeClass: string }> = {
    super_admin: {
      title: 'Super Administrator Sistem',
      badgeClass: 'bg-rose-950/40 text-rose-200 border-rose-800/40'
    },
    admin_akademik: {
      title: 'Administrator Akademik',
      badgeClass: 'bg-indigo-950/40 text-indigo-200 border-indigo-800/40'
    },
    pembimbing: {
      title: 'Dewan Pembimbing Resmi',
      badgeClass: 'bg-[#0D766E]/20 text-[#2DD4BF] border-[#0D766E]/40'
    },
    peserta: {
      title: 'Santri / Peserta Resmi',
      badgeClass: 'bg-[#B4863A]/20 text-[#F5E2A8] border-[#B4863A]/40'
    }
  };

  const getDashboardTargetTab = () => {
    if (currentUser.role === 'peserta') return 'dashboard_peserta';
    if (currentUser.role === 'pembimbing') return 'dashboard_pembimbing';
    return 'dashboard_admin';
  };

  const isDashboardActive =
    activeTab === 'dashboard_peserta' ||
    activeTab === 'dashboard_pembimbing' ||
    activeTab === 'dashboard_admin';

  const navLinks = [
    { id: 'home', label: 'Beranda', icon: BookOpen },
    { id: 'curriculum', label: 'Kurikulum 90 Hari', icon: Calendar, badge: `Hari ${currentDay}` },
    { id: 'subjects', label: 'Mata Pelajaran', icon: BookOpen },
    { id: 'library', label: 'Perpustakaan Kitab', icon: BookOpen },
    { id: 'about', label: 'Tentang Program', icon: Info },
    { id: 'verify', label: 'Verifikasi', icon: FileCheck2 },
    { id: 'help', label: 'Bantuan', icon: HelpCircle }
  ];

  return (
    <header className="sticky top-0 z-50 shadow-museum-sm">
      {/* ========================================================
          BARIS 1: BILAH STATUS RESMI (NOCTURNE NAVY & ANTIQUE GOLD)
          Diposisikan di baris teratas agar identitas peserta & tombol
          dashboard selalu terpampang jelas tanpa pernah terhalang.
         ======================================================== */}
      <div className="bg-[#0A192F] text-[#FBF9F5] border-b border-[#1E3A5F] px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Identitas Peserta: Bersih, Mewah & Terbaca Jelas */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B4863A] to-[#8C6322] text-[#0A192F] font-bold flex items-center justify-center text-xs shadow-sm shrink-0 font-serif-display">
                {currentUser.fullName.charAt(0)}
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] text-[#D6CEBE] uppercase tracking-wider font-semibold">
                    Akun:
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {currentUser.fullName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${roleLabelMap[currentUser.role].badgeClass}`}
                  >
                    {roleLabelMap[currentUser.role].title}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] text-[#A8A29E] mt-0.5 font-sans-body">
                  {currentUser.participantNumber && (
                    <span>
                      Reg: <strong className="text-[#E7E5E4] font-mono">{currentUser.participantNumber}</strong>
                    </span>
                  )}
                  <span className="hidden md:inline text-stone-600">·</span>
                  <span className="hidden md:inline text-[#D6CEBE]">
                    Materi Dibuka 23.59 WIB (Aktif: Hari {currentDay}/90)
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol switch akun pada layar ponsel */}
            <div className="sm:hidden">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#132A4A] border border-[#B4863A]/50 text-[#F5E2A8] flex items-center gap-1 cursor-pointer"
              >
                <User className="w-3 h-3 text-[#B4863A]" />
                <span>Akun & Sesi ▾</span>
              </button>
            </div>
          </div>

          {/* Sisi Kanan: Tombol Dashboard Emas Antik & Akses Cepat */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            
            {/* Tombol Utama: BUKA DASHBOARD SAYA */}
            <button
              onClick={() => onNavigate(getDashboardTargetTab())}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
                isDashboardActive
                  ? 'bg-gradient-to-r from-[#C5A059] to-[#B4863A] text-[#0A192F] ring-2 ring-[#F5E2A8]'
                  : 'bg-[#B4863A] hover:bg-[#C5A059] text-[#0A192F]'
              }`}
              title="Buka panel progres belajar dan capaian akademik"
            >
              <LayoutDashboard className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="tracking-tight whitespace-nowrap">
                {currentUser.role === 'peserta' ? 'Buka Dashboard Saya' : 'Portal Manajemen'}
              </span>
            </button>

            {/* Menu Dropdown Akun & Sesi Resmi */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#132A4A] hover:bg-[#1C3B64] text-[#E7E5E4] border border-[#2B4B75] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Kelola sesi akun dan hak akses portal akademik"
              >
                <User className="w-3.5 h-3.5 text-[#B4863A]" />
                <span>Akun & Sesi</span>
                <ChevronDown className="w-3 h-3 text-[#A8A29E]" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#0A192F] border border-[#2B4B75] shadow-museum-lg py-2.5 z-50 text-[#FBF9F5] animate-in fade-in zoom-in-95 duration-150">
                  {/* Header Resmi Tanpa Uji Coba */}
                  <div className="px-4 py-2.5 border-b border-[#1E3A5F]">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#F5E2A8] font-serif-display">
                        Profil Pengguna & Sesi Resmi
                      </p>
                      <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2 py-0.2 rounded-full font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Terverifikasi
                      </span>
                    </div>
                    <p className="text-[10px] text-[#A8A29E] mt-1 font-sans-body">
                      Portal Sesi Akademik: Peserta Resmi, Dewan Pembimbing & Administrator
                    </p>
                  </div>

                  {/* Highlight Sesi Aktif Saat Ini */}
                  <div className="mx-3 my-2 p-2.5 rounded-lg bg-[#132A4A] border border-[#B4863A]/40 text-xs space-y-1 font-sans-body">
                    <span className="text-[10px] uppercase tracking-wider text-[#B4863A] font-semibold block">
                      Sesi Aktif:
                    </span>
                    <p className="font-bold text-white text-xs leading-tight">{currentUser.fullName}</p>
                    <p className="text-[11px] text-[#D6CEBE] truncate">{currentUser.email}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-[#1E3A5F] text-[10px]">
                      <span className="text-[#A8A29E] font-medium">{roleLabelMap[currentUser.role].title}</span>
                      {currentUser.participantNumber && (
                        <span className="font-mono text-[#F5E2A8] font-semibold">No: {currentUser.participantNumber}</span>
                      )}
                    </div>
                  </div>

                  {/* Daftar Akun & Peran Terdaftar */}
                  <div className="px-3 py-1 font-sans-body">
                    <span className="text-[10px] uppercase tracking-wider text-[#A8A29E] font-semibold block mb-1">
                      Peralihan Sesi Terdaftar:
                    </span>
                  </div>

                  <div className="p-2 space-y-1">
                    {allUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          onSelectUser(u.id);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between cursor-pointer border ${
                          u.id === currentUser.id
                            ? 'bg-[#132A4A] text-[#F5E2A8] font-bold border-[#B4863A]/60'
                            : 'text-[#D6CEBE] hover:bg-[#132A4A]/60 border-transparent'
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-white">{u.fullName}</p>
                          <p className="text-[10px] text-[#A8A29E]">
                            {roleLabelMap[u.role].title} {u.participantNumber ? `(${u.participantNumber})` : ''}
                          </p>
                        </div>
                        {u.id === currentUser.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B4863A] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Action Links: Masuk Akun Lain & Daftar Baru */}
                  <div className="pt-2 border-t border-[#1E3A5F] px-3 pb-1 space-y-1.5 font-sans-body">
                    {onOpenLogin && (
                      <button
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onOpenLogin();
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg bg-[#132A4A] hover:bg-[#1C3B64] text-[#E7E5E4] text-xs font-semibold transition-colors cursor-pointer border border-[#2B4B75]"
                      >
                        <div className="flex items-center gap-2">
                          <LogIn className="w-3.5 h-3.5 text-[#B4863A] shrink-0" />
                          <span>Masuk Akun / Kredensial Lain</span>
                        </div>
                        <span className="text-[10px] text-[#A8A29E]">Formulir →</span>
                      </button>
                    )}

                    {onOpenRegister && (
                      <button
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onOpenRegister();
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg bg-transparent hover:bg-white/5 text-[#D6CEBE] hover:text-white text-xs font-medium transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-3.5 h-3.5 text-[#B4863A] shrink-0" />
                          <span>Daftar Peserta Baru</span>
                        </div>
                        <span className="text-[10px] text-[#A8A29E]">Registrasi</span>
                      </button>
                    )}

                    <a
                      href="/menata-hidup-source-code.zip"
                      download="menata-hidup-source-code.zip"
                      className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#132A4A]/50 hover:bg-[#132A4A] text-[#A8A29E] hover:text-[#E7E5E4] text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <Download className="w-3 h-3 text-[#B4863A] shrink-0" />
                        <span>Unduh File Lengkap Proyek (ZIP)</span>
                      </div>
                      <span className="text-[10px] font-mono">3.7 MB</span>
                    </a>
                  </div>
                </div>
              )}
            </div>


            {/* Lonceng Notifikasi */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-[#E7E5E4] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Notifikasi"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B4863A] text-[#0A192F] text-[10px] font-bold flex items-center justify-center">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Unduh ZIP Button */}
            <a
              href="/menata-hidup-source-code.zip"
              download="menata-hidup-source-code.zip"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#132A4A] hover:bg-[#1C3B64] text-[#E7E5E4] text-xs font-medium border border-[#2B4B75] transition-colors"
              title="Unduh seluruh file proyek aplikasi (ZIP)"
            >
              <Download className="w-3.5 h-3.5 text-[#B4863A]" />
              <span>Unduh ZIP</span>
            </a>

          </div>
        </div>

        {/* Dropdown switch akun mobile */}
        {roleMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-[#1E3A5F] space-y-2 font-sans-body">
            <div className="flex items-center justify-between px-1">
              <p className="text-[11px] font-bold text-[#F5E2A8]">Peralihan Sesi Resmi:</p>
              <span className="text-[10px] text-emerald-400">● Sesi Aktif</span>
            </div>
            {allUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => {
                  onSelectUser(u.id);
                  setRoleMenuOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                  u.id === currentUser.id
                    ? 'bg-[#132A4A] text-[#F5E2A8] font-bold border border-[#B4863A]'
                    : 'text-[#D6CEBE] hover:bg-white/10'
                }`}
              >
                <div>
                  <p className="font-semibold">{u.fullName}</p>
                  <p className="text-[10px] text-[#A8A29E]">{roleLabelMap[u.role].title}</p>
                </div>
                {u.id === currentUser.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#B4863A]" />}
              </button>
            ))}

            <div className="pt-2 border-t border-[#1E3A5F] space-y-1">
              {onOpenLogin && (
                <button
                  onClick={() => {
                    setRoleMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full text-left p-2 rounded-lg text-xs font-semibold text-[#F5E2A8] bg-[#132A4A] flex items-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#B4863A]" />
                  <span>Masuk dengan Email / Kredensial Lain</span>
                </button>
              )}
              {onOpenRegister && (
                <button
                  onClick={() => {
                    setRoleMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full text-left p-2 rounded-lg text-xs font-medium text-[#D6CEBE] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#B4863A]" />
                  <span>Daftar Peserta Baru</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          BARIS 2: NAVBAR UTAMA (MUSEUM ARCHIVAL WHITE & SERIF BRAND)
          Bersih, berjarak, elegan, tanpa badge candy yang norak.
         ======================================================== */}
      <div className="bg-[#FFFFFF] border-b border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Brand Menata Hidup */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-[#F5E2A8] flex items-center justify-center font-bold text-lg border border-[#B4863A]/40 shadow-xs group-hover:scale-102 transition-transform">
                <span className="font-arabic text-xl -mt-0.5">م</span>
              </div>
              <div>
                <span className="text-lg font-serif-display font-bold tracking-tight text-[#0A192F] block">
                  MENATA HIDUP
                </span>
                <span className="text-[11px] text-[#78716C] font-sans-body font-medium tracking-wide block -mt-1">
                  Bimbingan Belajar Islam 90 Hari
                </span>
              </div>
            </button>

            {/* TAB NAVIGASI UTAMA BERSIH & BERWIBAWA */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-medium font-sans-body">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#0A192F] text-white font-semibold shadow-xs'
                        : 'text-[#44403C] hover:text-[#0A192F] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          isActive
                            ? 'bg-[#B4863A] text-[#0A192F] font-bold'
                            : 'bg-[#F5F2EB] text-[#78716C]'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Shortcut Jadwal Harian */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('curriculum')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F2EB] hover:bg-[#EBE6DF] text-[#0A192F] text-xs font-semibold transition-colors border border-[#D6CEBE] cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B4863A]" />
                <span>Jadwal Harian</span>
              </button>
            </div>

          </div>
        </div>

        {/* Tab Navigasi Horizontal Versi Mobile / Tablet */}
        <div className="lg:hidden border-t border-[#E7E5E4] bg-[#FFFFFF] px-3 py-2 flex items-center gap-1.5 overflow-x-auto text-xs font-medium no-scrollbar">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0A192F] text-white font-semibold'
                    : 'bg-[#F5F2EB] text-[#44403C] hover:bg-[#EBE6DF]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
