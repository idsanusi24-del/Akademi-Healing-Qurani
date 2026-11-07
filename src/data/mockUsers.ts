import { UserProfile } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-super-admin',
    fullName: 'Ahmad Fauzan, S.Ud., M.Pd.I.',
    email: 'admin.utama@menatahidup.id',
    role: 'super_admin',
    status: 'active',
    createdAt: '2026-08-01T08:00:00Z'
  },
  {
    id: 'user-admin-akademik',
    fullName: 'Siti Aminah, S.Ag.',
    email: 'akademik@menatahidup.id',
    role: 'admin_akademik',
    status: 'active',
    createdAt: '2026-08-05T09:00:00Z'
  },
  {
    id: 'user-pembimbing',
    fullName: 'Dr. Abdullah Karim, Lc., M.A.',
    email: 'abdullah.karim@menatahidup.id',
    role: 'pembimbing',
    status: 'active',
    createdAt: '2026-08-10T10:00:00Z'
  },
  {
    id: 'user-peserta-1',
    fullName: 'Muhammad Ridwan',
    email: 'idsanusi24@gmail.com',
    role: 'peserta',
    participantNumber: 'MH-2026-0042',
    status: 'active',
    assignedMentorId: 'user-pembimbing',
    createdAt: '2026-09-01T07:30:00Z'
  },
  {
    id: 'user-peserta-2',
    fullName: 'Fatimah Az-Zahra',
    email: 'fatimah.azzahra@email.com',
    role: 'peserta',
    participantNumber: 'MH-2026-0043',
    status: 'active',
    assignedMentorId: 'user-pembimbing',
    createdAt: '2026-09-01T08:15:00Z'
  }
];
