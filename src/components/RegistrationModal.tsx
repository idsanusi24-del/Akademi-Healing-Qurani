import React, { useState } from 'react';
import { UserProfile } from '../types';
import { StorageService } from '../services/storageService';
import { X, UserPlus } from 'lucide-react';

interface RegistrationModalProps {
  onClose: () => void;
  onRegistered: (newUser: UserProfile) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  onClose,
  onRegistered
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [intentionText, setIntentionText] = useState('');
  const [agreedPledge, setAgreedPledge] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedPledge) return;

    setIsSubmitting(true);
    const participantNum = `MH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUserId = `user-${Date.now()}`;

    const newUser: UserProfile = {
      id: newUserId,
      fullName: fullName.trim(),
      email: email.trim(),
      role: 'peserta',
      participantNumber: participantNum,
      status: 'active',
      assignedMentorId: 'user-pembimbing',
      createdAt: new Date().toISOString()
    };

    // Save to users list
    const users = StorageService.getUsers();
    users.push(newUser);
    localStorage.setItem('menata_hidup_users_v1', JSON.stringify(users));

    // Audit log
    StorageService.addAuditLog(
      newUser.fullName,
      'Pendaftaran Peserta Baru',
      'UserProfile',
      newUser.participantNumber,
      `Email: ${newUser.email}`
    );

    // Welcome notification
    StorageService.addNotification(
      newUser.id,
      'Selamat Bergabung di Menata Hidup',
      `Ahlan wa Sahlan ${newUser.fullName}. No. Peserta Anda adalah ${participantNum}. Bimbingan belajar 90 hari Anda telah siap dimulai.`,
      'announcement'
    );

    // Switch active user
    StorageService.setCurrentUser(newUser.id);
    onRegistered(newUser);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 max-w-lg w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header in Ocean Blue */}
        <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 text-white p-5 flex items-center justify-between border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-5 h-5 text-cyan-300" />
            <h3 className="text-sm font-bold">Pendaftaran Peserta Bimbingan Belajar</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-sky-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="text-xs text-sky-950 leading-relaxed bg-sky-50 border border-sky-200 p-3.5 rounded-xl font-medium">
            Pendaftaran dibuka untuk seluruh kaum Muslimin yang bertekad menata iman, memperbaiki akhlak, dan mempersiapkan akhirat selama 90 hari kalender.
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Nama Lengkap (Sesuai untuk Ijazah/Sertifikat):
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Muhammad Ridwan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Alamat Email Aktif:
            </label>
            <input
              type="email"
              required
              placeholder="email.anda@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Nomor Telepon / WhatsApp (Untuk Pengingat Evaluasi):
            </label>
            <input
              type="tel"
              placeholder="0812xxxxxxxx"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Niat & Harapan Pribadi Mengikuti Program:
            </label>
            <textarea
              rows={2}
              placeholder="Apa yang mendorong Anda untuk memperbaiki diri dan menata sisa umur..."
              value={intentionText}
              onChange={(e) => setIntentionText(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white focus:outline-sky-800"
            />
          </div>

          {/* Pakta Integritas */}
          <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-sky-950 block">
              Pakta Integritas Belajar 90 Hari:
            </span>
            <p className="text-[11px] text-slate-700 leading-relaxed italic">
              "Dengan memohon taufiq kepada Allah, saya bertekad meluangkan waktu setiap hari untuk mempelajari materi yang terbuka, mengerjakan tugas praktik, mengisi jurnal muhasabah dengan jujur, serta mengikuti seluruh evaluasi hingga tuntas."
            </p>
            <label className="flex items-start gap-2 pt-2 text-xs text-slate-800 cursor-pointer font-medium">
              <input
                type="checkbox"
                required
                checked={agreedPledge}
                onChange={(e) => setAgreedPledge(e.target.checked)}
                className="mt-0.5 rounded text-sky-800 focus:ring-sky-800"
              />
              <span>Saya menyetujui pakta integritas dan siap mengikuti bimbingan secara istiqamah.</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !agreedPledge}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 disabled:opacity-50 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Daftar & Mulai Belajar Sekarang
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
