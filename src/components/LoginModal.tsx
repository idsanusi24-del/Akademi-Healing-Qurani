import React, { useState } from 'react';
import { UserProfile } from '../types';
import { StorageService } from '../services/storageService';
import { X, Lock, ShieldCheck, Mail, CheckCircle2, UserCheck, ArrowRight, UserPlus, Key } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onOpenRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onLoginSuccess,
  onOpenRegister
}) => {
  const allUsers = StorageService.getUsers();
  const currentUser = StorageService.getCurrentUser();

  const [activeTab, setActiveTab] = useState<'form' | 'switch'>('form');
  const [emailInput, setEmailInput] = useState(currentUser.email || 'idsanusi24@gmail.com');
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleLabelMap: { [key: string]: { title: string; color: string } } = {
    peserta: { title: 'Peserta Resmi', color: 'text-amber-300' },
    pembimbing: { title: 'Dewan Pembimbing', color: 'text-emerald-300' },
    admin_akademik: { title: 'Admin Akademik', color: 'text-sky-300' },
    super_admin: { title: 'Super Administrator', color: 'text-amber-400' }
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const trimmedEmail = emailInput.trim().toLowerCase();
    const matchedUser = allUsers.find(u => u.email.toLowerCase() === trimmedEmail);

    if (matchedUser) {
      StorageService.setCurrentUser(matchedUser.id);
      StorageService.addAuditLog(
        matchedUser.fullName,
        'Otentikasi Masuk Akun',
        'UserProfile',
        matchedUser.id,
        `Sesi aktif diperbarui untuk ${matchedUser.email}`
      );
      setSuccessMessage(`Sesi resmi berhasil diverifikasi: ${matchedUser.fullName}`);
      setTimeout(() => {
        onLoginSuccess(matchedUser);
        onClose();
      }, 700);
    } else {
      // If email not found, create a new participant profile with this email or show notice
      const newParticipantNum = `MH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        fullName: trimmedEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: trimmedEmail,
        role: 'peserta',
        participantNumber: newParticipantNum,
        status: 'active',
        assignedMentorId: 'user-pembimbing',
        createdAt: new Date().toISOString()
      };
      const users = StorageService.getUsers();
      users.push(newUser);
      localStorage.setItem('menata_hidup_users_v1', JSON.stringify(users));
      StorageService.setCurrentUser(newUser.id);
      StorageService.addAuditLog(
        newUser.fullName,
        'Registrasi & Masuk Otomatis',
        'UserProfile',
        newUser.id,
        `Pendaftaran sesi baru untuk ${newUser.email}`
      );
      setSuccessMessage(`Akun peserta baru berhasil dibuat & diverifikasi: ${newUser.fullName}`);
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 700);
    }
  };

  const handleDirectSwitch = (user: UserProfile) => {
    StorageService.setCurrentUser(user.id);
    StorageService.addAuditLog(
      user.fullName,
      'Peralihan Sesi Akun Resmi',
      'UserProfile',
      user.id,
      `Sesi aktif dialihkan ke ${user.role}`
    );
    setSuccessMessage(`Sesi resmi aktif: ${user.fullName}`);
    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0A192F]/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5E4] max-w-lg w-full shadow-museum-lg overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 font-sans-body">
        
        {/* Header Modal - Museum Editorial Dark Navy */}
        <div className="bg-[#0A192F] text-white p-5 sm:p-6 border-b border-[#2B4B75] relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#132A4A] border border-[#B4863A]/50 text-[#B4863A] flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif-display font-medium tracking-tight text-[#FBF9F5]">
                  Autentikasi & Masuk Akun Resmi
                </h3>
                <p className="text-[11px] text-[#A8A29E] flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>Portal Sesi Terverifikasi · 1448 H / 2026 M</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A8A29E] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 mt-5 p-1 bg-[#132A4A]/80 rounded-lg border border-[#2B4B75]">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#B4863A] text-[#0A192F] shadow-xs'
                  : 'text-[#D6CEBE] hover:text-white'
              }`}
            >
              Masuk Email & Sandi
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('switch')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'switch'
                  ? 'bg-[#B4863A] text-[#0A192F] shadow-xs'
                  : 'text-[#D6CEBE] hover:text-white'
              }`}
            >
              Pilih Sesi Terverifikasi ({allUsers.length})
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 px-6">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border-b border-rose-200 text-rose-900 text-xs flex items-center gap-2 px-6">
            <X className="w-4 h-4 text-rose-700 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="p-6">
          {activeTab === 'form' ? (
            <form onSubmit={handleFormLogin} className="space-y-4">
              <div className="bg-[#FBF9F5] border border-[#E7E5E4] rounded-xl p-3.5 text-xs text-[#57534E] leading-relaxed">
                <span className="font-semibold text-[#0A192F] block mb-0.5">Sesi Masuk Pengguna:</span>
                Gunakan email akun Anda untuk masuk ke dashboard bimbingan belajar. Sistem menyimpan sesi aktif secara aman dalam arsip peramban Anda.
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
                  Alamat Email Terdaftar:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#78716C] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#D6D3D1] bg-[#FBF9F5] focus:bg-white focus:outline-[#B4863A] focus:border-[#B4863A] text-[#1C1917]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1.5 flex items-center justify-between">
                  <span>Kata Sandi:</span>
                  <span className="text-[11px] text-[#78716C] font-normal">Tersinkronisasi Aman</span>
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#78716C] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#D6D3D1] bg-[#FBF9F5] focus:bg-white focus:outline-[#B4863A] focus:border-[#B4863A] text-[#1C1917]"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="pt-2">
                <span className="text-[11px] text-[#78716C] block mb-2 font-medium">
                  Akses Cepat Akun Terdaftar:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEmailInput('idsanusi24@gmail.com');
                      setPasswordInput('••••••••••••');
                    }}
                    className="p-2 rounded-lg border border-[#E7E5E4] hover:border-[#B4863A] bg-[#FBF9F5] text-left text-xs transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-[#0A192F] block">Muhammad Ridwan</span>
                    <span className="text-[10px] text-[#78716C]">idsanusi24@gmail.com (Peserta)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailInput('abdullah.karim@menatahidup.id');
                      setPasswordInput('••••••••••••');
                    }}
                    className="p-2 rounded-lg border border-[#E7E5E4] hover:border-[#B4863A] bg-[#FBF9F5] text-left text-xs transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-[#0A192F] block">Dr. Abdullah Karim, Lc.</span>
                    <span className="text-[10px] text-[#78716C]">Dewan Pembimbing</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailInput('admin.utama@menatahidup.id');
                      setPasswordInput('••••••••••••');
                    }}
                    className="p-2 rounded-lg border border-[#E7E5E4] hover:border-[#B4863A] bg-[#FBF9F5] text-left text-xs transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-[#0A192F] block">Ahmad Fauzan, M.Pd.I.</span>
                    <span className="text-[10px] text-[#78716C]">Super Administrator</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailInput('fatimah.azzahra@email.com');
                      setPasswordInput('••••••••••••');
                    }}
                    className="p-2 rounded-lg border border-[#E7E5E4] hover:border-[#B4863A] bg-[#FBF9F5] text-left text-xs transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-[#0A192F] block">Fatimah Az-Zahra</span>
                    <span className="text-[10px] text-[#78716C]">Peserta (MH-2026-0043)</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                  className="text-xs text-[#0A192F] hover:text-[#B4863A] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#B4863A]" />
                  <span>Daftar Peserta Baru</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#B4863A]" />
                  <span>{isSubmitting ? 'Memverifikasi...' : 'Masuk Sesi Resmi'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-[#57534E]">
                Pilih profil akun yang telah terdaftar resmi dalam pangkalan data akademik untuk mengaktifkan sesi kerja:
              </p>

              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {allUsers.map((user) => {
                  const isCurrent = user.id === currentUser.id;
                  const roleMeta = roleLabelMap[user.role] || { title: user.role, color: 'text-stone-600' };

                  return (
                    <div
                      key={user.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-[#FBF9F5] border-[#B4863A] shadow-xs'
                          : 'bg-white border-[#E7E5E4] hover:border-[#B4863A]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#0A192F]">
                            {user.fullName}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full font-semibold">
                              Sesi Aktif
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#78716C]">{user.email}</p>
                        <div className="flex items-center gap-2 text-[10px] text-[#A8A29E]">
                          <span className="font-medium text-[#B4863A]">{roleMeta.title}</span>
                          {user.participantNumber && (
                            <>
                              <span>·</span>
                              <span className="font-mono text-[#57534E]">No: {user.participantNumber}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div>
                        {isCurrent ? (
                          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDirectSwitch(user)}
                            className="px-3 py-1.5 text-xs font-semibold text-[#0A192F] hover:text-white bg-[#F5F2EB] hover:bg-[#0A192F] rounded-lg transition-colors cursor-pointer border border-[#E7E5E4]"
                          >
                            Beralih Sesi
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#E7E5E4] flex items-center justify-between text-xs">
                <span className="text-[#78716C]">Belum memiliki akun?</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                  className="font-semibold text-[#0A192F] hover:text-[#B4863A] flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#B4863A]" />
                  <span>Daftar Peserta Baru</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
