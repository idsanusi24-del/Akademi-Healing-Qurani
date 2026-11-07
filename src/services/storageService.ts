import {
  UserProfile,
  ProgramConfig,
  LearningProgress,
  ReflectionJournal,
  AssessmentAttempt,
  Assessment,
  Certificate,
  AppNotification,
  AuditLog
} from '../types';
import { INITIAL_USERS } from '../data/mockUsers';

const STORAGE_KEYS = {
  CONFIG: 'menata_hidup_config_v1',
  CURRENT_USER_ID: 'menata_hidup_current_user_id_v1',
  USERS: 'menata_hidup_users_v1',
  PROGRESS: 'menata_hidup_progress_v1',
  JOURNALS: 'menata_hidup_journals_v1',
  ASSESSMENTS: 'menata_hidup_assessments_v1',
  CERTIFICATES: 'menata_hidup_certificates_v1',
  NOTIFICATIONS: 'menata_hidup_notifications_v1',
  AUDIT_LOGS: 'menata_hidup_audit_logs_v1',
  BOOKMARKS: 'menata_hidup_bookmarks_v1',
  READING_PREFS: 'menata_hidup_reading_prefs_v1'
};

const DEFAULT_CONFIG: ProgramConfig = {
  startDate: '2026-09-01',
  programTitle: 'Bimbingan Belajar Menata Hidup Menuju Akhir Hidup yang Indah',
  academicYear: '1448 H / 2026 M',
  timezone: 'Asia/Jakarta',
  adminOverrideSimulatedDay: 7, // Default day 7 simulated for demo richness
  bypassScheduleLock: false,
  passingScore: 75,
  minCompletionPercentage: 80
};

export class StorageService {
  // Config
  static getConfig(): ProgramConfig {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_CONFIG;
    }
  }

  static updateConfig(newConfig: Partial<ProgramConfig>, actorName: string): ProgramConfig {
    const current = this.getConfig();
    const updated = { ...current, ...newConfig };
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
    this.addAuditLog(actorName, 'Memperbarui Konfigurasi Program', 'ProgramConfig', 'config', JSON.stringify(newConfig));
    return updated;
  }

  // Users
  static getUsers(): UserProfile[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_USERS;
    }
  }

  static getCurrentUser(): UserProfile {
    const users = this.getUsers();
    const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || 'user-peserta-1';
    const found = users.find(u => u.id === currentId);
    return found || users[3] || users[0];
  }

  static setCurrentUser(userId: string): UserProfile {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
    }
    return user || this.getCurrentUser();
  }

  // Helper to get current Jakarta Time (WIB, UTC+7)
  static getWibNow(): Date {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * 7);
  }

  // Calculate next unlock timestamp (23:59:00 WIB)
  static getNextUnlockTimeWib(): Date {
    const wibNow = this.getWibNow();
    const target = new Date(wibNow);
    target.setHours(23, 59, 0, 0);
    if (wibNow.getTime() >= target.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    return target;
  }

  // Current Day in WIB (Asia/Jakarta)
  // Materi dibuka mulai pukul 23.59 WIB dan seterusnya
  static getCurrentDayNumber(): number {
    const config = this.getConfig();
    if (config.adminOverrideSimulatedDay && config.adminOverrideSimulatedDay > 0) {
      return config.adminOverrideSimulatedDay;
    }

    try {
      const wibNow = this.getWibNow();
      // Start counting with 23:59 WIB as the daily milestone threshold
      const start = new Date(config.startDate + 'T23:59:00+07:00');
      const diffMs = wibNow.getTime() - start.getTime();
      if (diffMs < 0) return 1;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(1, Math.min(90, diffDays));
    } catch {
      return 7;
    }
  }

  // Is Day Unlocked: Materi dalam keadaan terkunci sebelum waktunya (mulai 23.59 WIB)
  static isDayUnlocked(dayNumber: number): boolean {
    const config = this.getConfig();
    if (config.bypassScheduleLock) return true;
    const currentDay = this.getCurrentDayNumber();
    return dayNumber <= currentDay;
  }

  // Is Assessment Unlocked:
  // Evaluasi setiap pekan (Pekan 1-12), akhir bulan (Bulan 1 & 2),
  // dan akhir pembelajaran (Hari 90) dalam keadaan terkunci sebelum waktunya.
  // Evaluasi dibuka tepat pada pukul 23.50 WIB pada hari pelaksanaan.
  static isAssessmentUnlocked(assessmentOrDay: Assessment | number): boolean {
    const config = this.getConfig();
    if (config.bypassScheduleLock) return true;

    const dayNumber = typeof assessmentOrDay === 'number' ? assessmentOrDay : assessmentOrDay.dayNumber;
    const currentDay = this.getCurrentDayNumber();

    // Jika hari berjalan sudah melewati hari evaluasi, evaluasi telah terbuka
    if (currentDay > dayNumber) {
      return true;
    }

    // Jika hari berjalan belum mencapai hari evaluasi, evaluasi terkunci
    if (currentDay < dayNumber) {
      return false;
    }

    // Jika tepat berada di hari evaluasi (misal Hari 7, 30, atau 90):
    // Terkunci sebelum waktunya, baru dibuka mulai pukul 23.50 WIB
    const wibNow = this.getWibNow();
    const currentMinutes = wibNow.getHours() * 60 + wibNow.getMinutes();
    const targetUnlockMinutes = 23 * 60 + 50; // 23.50 WIB

    return currentMinutes >= targetUnlockMinutes;
  }

  // Helper status teks evaluasi
  static getAssessmentStatusText(assessment: Assessment): { isUnlocked: boolean; badgeText: string; timeDetail: string } {
    const unlocked = this.isAssessmentUnlocked(assessment);
    if (unlocked) {
      return {
        isUnlocked: true,
        badgeText: 'Tersedia',
        timeDetail: `Telah dibuka (Jadwal Hari ke-${assessment.dayNumber} pukul 23.50 WIB)`
      };
    }
    return {
      isUnlocked: false,
      badgeText: 'Terkunci · Buka 23.50 WIB',
      timeDetail: `Terkunci sampai Hari ke-${assessment.dayNumber} pukul 23.50 WIB`
    };
  }

  // Progress
  static getProgress(participantId: string): LearningProgress[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    let all: LearningProgress[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    } else {
      // Seed some progress for participant 1
      if (participantId === 'user-peserta-1') {
        all = [
          { participantId: 'user-peserta-1', dayNumber: 1, completed: true, completedAt: '2026-09-01T20:15:00Z', quizScore: 100 },
          { participantId: 'user-peserta-1', dayNumber: 2, completed: true, completedAt: '2026-09-02T21:00:00Z', quizScore: 100 },
          { participantId: 'user-peserta-1', dayNumber: 3, completed: true, completedAt: '2026-09-03T19:30:00Z', quizScore: 100 },
          { participantId: 'user-peserta-1', dayNumber: 4, completed: true, completedAt: '2026-09-04T20:45:00Z', quizScore: 100 },
          { participantId: 'user-peserta-1', dayNumber: 5, completed: true, completedAt: '2026-09-05T21:10:00Z', quizScore: 100 },
          { participantId: 'user-peserta-1', dayNumber: 6, completed: true, completedAt: '2026-09-06T18:50:00Z', quizScore: 100 }
        ];
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
      }
    }
    return all.filter(p => p.participantId === participantId);
  }

  static markDayComplete(participantId: string, dayNumber: number, quizScore?: number): void {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    let all: LearningProgress[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    }
    const idx = all.findIndex(p => p.participantId === participantId && p.dayNumber === dayNumber);
    const entry: LearningProgress = {
      participantId,
      dayNumber,
      completed: true,
      completedAt: new Date().toISOString(),
      quizScore: quizScore ?? 100
    };

    if (idx >= 0) {
      all[idx] = { ...all[idx], ...entry };
    } else {
      all.push(entry);
    }
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
    this.addNotification(participantId, 'Materi Selesai', `Alhamdulillah, Anda telah menyelesaikan materi Hari ke-${dayNumber}.`, 'unlock');
  }

  // Reflection Journals
  static getJournals(participantId: string): ReflectionJournal[] {
    const raw = localStorage.getItem(STORAGE_KEYS.JOURNALS);
    let all: ReflectionJournal[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    } else {
      // Seed journal
      all = [
        {
          id: 'journal-1',
          participantId: 'user-peserta-1',
          dayNumber: 1,
          date: '2026-09-01',
          lessonTheme: 'Mengenal Tujuan Penciptaan Manusia',
          whatIUnderstood: 'Seluruh aktivitas harian bisa bernilai ibadah bila dilandasi niat ikhlas dan cara yang halal.',
          whatINeedToImprove: 'Masih sering terburu-buru dalam shalat dan kurang fokus merenungi ayat.',
          habitToPractice: 'Menghadirkan niat ibadah sebelum berangkat kerja di pagi hari.',
          challengesFaced: 'Godaan memeriksa media sosial saat istirahat kerja.',
          actionPlan: 'Menaruh HP di luar jangkauan 15 menit sebelum adzan.',
          personalNotes: 'Bismillah, semoga Allah menjaga keistiqamahan saya.',
          isPrivate: true,
          createdAt: '2026-09-01T20:30:00Z',
          updatedAt: '2026-09-01T20:30:00Z'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(all));
    }
    return all.filter(j => j.participantId === participantId);
  }

  static saveJournal(journal: Omit<ReflectionJournal, 'id' | 'createdAt' | 'updatedAt'>): ReflectionJournal {
    const raw = localStorage.getItem(STORAGE_KEYS.JOURNALS);
    let all: ReflectionJournal[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    }

    const existingIdx = all.findIndex(j => j.participantId === journal.participantId && j.dayNumber === journal.dayNumber);
    const now = new Date().toISOString();
    let result: ReflectionJournal;

    if (existingIdx >= 0) {
      result = {
        ...all[existingIdx],
        ...journal,
        updatedAt: now
      };
      all[existingIdx] = result;
    } else {
      result = {
        id: `journal-${Date.now()}`,
        ...journal,
        createdAt: now,
        updatedAt: now
      };
      all.push(result);
    }

    localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(all));
    return result;
  }

  // Assessments
  static getAssessmentAttempts(participantId?: string): AssessmentAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    let all: AssessmentAttempt[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    } else {
      // Seed sample attempt for participant 1 on Week 1
      all = [
        {
          id: 'attempt-w1-p1',
          assessmentId: 'eval-week-1',
          participantId: 'user-peserta-1',
          startedAt: '2026-09-07T08:00:00Z',
          submittedAt: '2026-09-07T08:35:00Z',
          totalScore: 92,
          status: 'reviewed',
          attemptNumber: 1,
          reviewedBy: 'Dr. Abdullah Karim, Lc., M.A.',
          reviewedAt: '2026-09-07T14:20:00Z',
          mentorNotes: 'Masya Allah, pemahaman akidah dan niat sangat baik. Pertahankan kedisiplinan beramal.',
          answers: [
            { questionId: 'w1-q1', participantAnswer: 1, awardedScore: 25 },
            { questionId: 'w1-q2', participantAnswer: 0, awardedScore: 25 },
            { questionId: 'w1-q3', participantAnswer: 1, awardedScore: 25 },
            { questionId: 'w1-q4', participantAnswer: 'Muhasabah produktif melahirkan taubat dan harapan, bukan rasa putus asa dari ampunan Allah.', awardedScore: 17, feedback: 'Uraian tepat dan berakar pada dalil.' }
          ]
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(all));
    }

    if (participantId) {
      return all.filter(a => a.participantId === participantId);
    }
    return all;
  }

  static submitAssessmentAttempt(attempt: Omit<AssessmentAttempt, 'id'>): AssessmentAttempt {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    let all: AssessmentAttempt[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    }

    const fullAttempt: AssessmentAttempt = {
      id: `attempt-${Date.now()}`,
      ...attempt
    };

    all.push(fullAttempt);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(all));

    this.addNotification(
      attempt.participantId,
      'Evaluasi Berhasil Dikumpulkan',
      'Jawaban evaluasi Anda telah tersimpan dan terkirim ke sistem akademik.',
      'evaluation'
    );

    return fullAttempt;
  }

  static reviewAssessmentAttempt(
    attemptId: string,
    reviewedBy: string,
    mentorNotes: string,
    questionScores: { [questionId: string]: { score: number; feedback?: string } }
  ): AssessmentAttempt | null {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    let all: AssessmentAttempt[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    }

    const idx = all.findIndex(a => a.id === attemptId);
    if (idx === -1) return null;

    const attempt = all[idx];
    let total = 0;
    const updatedAnswers = attempt.answers.map(ans => {
      const review = questionScores[ans.questionId];
      const awarded = review ? review.score : (ans.awardedScore ?? 0);
      total += awarded;
      return {
        ...ans,
        awardedScore: awarded,
        feedback: review?.feedback ?? ans.feedback
      };
    });

    attempt.answers = updatedAnswers;
    attempt.totalScore = total;
    attempt.status = 'reviewed';
    attempt.reviewedBy = reviewedBy;
    attempt.reviewedAt = new Date().toISOString();
    attempt.mentorNotes = mentorNotes;

    all[idx] = attempt;
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(all));

    this.addNotification(
      attempt.participantId,
      'Nilai Evaluasi Diterbitkan',
      `Pembimbing telah menyelesaikan pemeriksaan evaluasi Anda dengan nilai ${total}.`,
      'grading'
    );

    return attempt;
  }

  // Academic Summary Calculation
  static calculateAcademicSummary(participantId: string): {
    weeklyAvg: number;
    monthlyAvg: number;
    finalScore: number;
    tasksScore: number;
    compositeScore: number;
    completedDaysCount: number;
    completionPercentage: number;
    isEligibleForCertificate: boolean;
    predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan';
  } {
    const progress = this.getProgress(participantId);
    const completedDaysCount = progress.filter(p => p.completed).length;
    const completionPercentage = Math.round((completedDaysCount / 90) * 100);

    const attempts = this.getAssessmentAttempts(participantId);
    
    // Weekly
    const weeklyScores = attempts.filter(a => a.assessmentId.startsWith('eval-week') && a.totalScore !== undefined).map(a => a.totalScore!);
    const weeklyAvg = weeklyScores.length > 0 ? Math.round(weeklyScores.reduce((a, b) => a + b, 0) / weeklyScores.length) : 85;

    // Monthly
    const monthlyScores = attempts.filter(a => a.assessmentId.startsWith('eval-month') && a.totalScore !== undefined).map(a => a.totalScore!);
    const monthlyAvg = monthlyScores.length > 0 ? Math.round(monthlyScores.reduce((a, b) => a + b, 0) / monthlyScores.length) : 88;

    // Final
    const finalAttempt = attempts.find(a => a.assessmentId === 'eval-final-90' && a.totalScore !== undefined);
    const finalScore = finalAttempt ? finalAttempt.totalScore! : 90;

    // Journals & Daily tasks
    const journals = this.getJournals(participantId);
    const tasksScore = Math.min(100, Math.round((journals.length / Math.max(1, completedDaysCount)) * 80 + 20));

    // Composite: 25% weekly, 30% monthly, 20% tasks, 25% final
    const compositeScore = Math.round(
      (weeklyAvg * 0.25) +
      (monthlyAvg * 0.30) +
      (tasksScore * 0.20) +
      (finalScore * 0.25)
    );

    const config = this.getConfig();
    const isEligibleForCertificate = 
      compositeScore >= config.passingScore &&
      (completedDaysCount >= 70 || config.bypassScheduleLock);

    let predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan' = 'Cukup';
    if (compositeScore >= 90) predicate = 'Sangat Baik';
    else if (compositeScore >= 80) predicate = 'Baik';
    else if (compositeScore >= 70) predicate = 'Cukup';
    else predicate = 'Perlu Bimbingan';

    return {
      weeklyAvg,
      monthlyAvg,
      finalScore,
      tasksScore,
      compositeScore,
      completedDaysCount,
      completionPercentage,
      isEligibleForCertificate,
      predicate
    };
  }

  // Certificates
  static getCertificates(): Certificate[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (!raw) {
      // Seed initial valid certificate for participant 1
      const initial: Certificate[] = [
        {
          id: 'cert-mh-0042',
          certificateNumber: 'MH-2026-89412',
          participantId: 'user-peserta-1',
          participantName: 'Muhammad Ridwan',
          programTitle: 'Bimbingan Belajar Menata Hidup Menuju Akhir Hidup yang Indah',
          issuedAt: '2026-10-25',
          periodText: '1 Rabiul Awwal 1448 H – 1 Jumadal Ula 1448 H / September – November 2026',
          finalScore: 89,
          predicate: 'Baik',
          approvedByMentorId: 'user-pembimbing',
          mentorName: 'Dr. Abdullah Karim, Lc., M.A.',
          mentorTitle: 'Pembimbing Utama & Pengasuh Keilmuan',
          verificationToken: 'v-mh-89412-verified-90d',
          status: 'valid'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static getCertificateByToken(token: string): Certificate | undefined {
    const list = this.getCertificates();
    return list.find(c => c.verificationToken === token || c.certificateNumber === token);
  }

  static issueCertificate(
    participantId: string,
    participantName: string,
    finalScore: number,
    predicate: 'Sangat Baik' | 'Baik' | 'Cukup',
    mentorName: string,
    actorName: string
  ): Certificate {
    const list = this.getCertificates();
    const token = `v-mh-${Math.floor(10000 + Math.random() * 90000)}-verified`;
    const certNumber = `MH-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const cert: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNumber,
      participantId,
      participantName,
      programTitle: 'Bimbingan Belajar Menata Hidup Menuju Akhir Hidup yang Indah',
      issuedAt: new Date().toISOString().split('T')[0],
      periodText: 'September – November 2026 (90 Hari Kalender Penuh)',
      finalScore,
      predicate,
      approvedByMentorId: 'user-pembimbing',
      mentorName,
      mentorTitle: 'Pembimbing Utama & Pengasuh Keilmuan',
      verificationToken: token,
      status: 'valid'
    };

    list.push(cert);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(list));
    this.addAuditLog(actorName, 'Menerbitkan Sertifikat Resmi', 'Certificate', cert.certificateNumber, `Peserta: ${participantName}`);
    this.addNotification(participantId, 'Sertifikat Kelulusan Resmi Diterbitkan', `Selamat! Sertifikat resmi Anda no. ${certNumber} telah disahkan oleh Pembimbing.`, 'certificate');
    return cert;
  }

  // Notifications
  static getNotifications(userId: string): AppNotification[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    let all: AppNotification[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    } else {
      all = [
        {
          id: 'notif-1',
          userId: 'user-peserta-1',
          title: 'Selamat Datang di Menata Hidup',
          message: 'Bimbingan belajar 90 hari resmi dimulai. Silakan pelajari Materi Hari ke-1.',
          type: 'unlock',
          read: false,
          createdAt: '2026-09-01T00:00:00Z'
        },
        {
          id: 'notif-2',
          userId: 'user-peserta-1',
          title: 'Evaluasi Pekan 1 Tersedia',
          message: 'Hari ini hari Ahad! Evaluasi Pekan 1 telah dibuka mulai pukul 23.59 WIB.',
          type: 'evaluation',
          read: true,
          createdAt: '2026-09-07T00:00:00Z'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all));
    }
    return all.filter(n => n.userId === userId || n.userId === 'all');
  }

  static addNotification(userId: string, title: string, message: string, type: AppNotification['type']): void {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    let all: AppNotification[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    }
    all.unshift({
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all.slice(0, 50)));
  }

  static markNotificationRead(id: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) return;
    try {
      const all: AppNotification[] = JSON.parse(raw);
      const found = all.find(n => n.id === id);
      if (found) {
        found.read = true;
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all));
      }
    } catch {
      // ignore
    }
  }

  // Audit Logs
  static getAuditLogs(): AuditLog[] {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (!raw) {
      const initial: AuditLog[] = [
        {
          id: 'log-1',
          actorId: 'user-super-admin',
          actorName: 'Ahmad Fauzan, S.Ud., M.Pd.I.',
          action: 'Inisialisasi Kalender Akademik 90 Hari',
          entityType: 'ProgramConfig',
          entityId: 'config',
          timestamp: '2026-08-25T10:00:00Z',
          details: 'Tanggal mulai ditetapkan 1 September 2026, WIB Asia/Jakarta.'
        },
        {
          id: 'log-2',
          actorId: 'user-pembimbing',
          actorName: 'Dr. Abdullah Karim, Lc., M.A.',
          action: 'Verifikasi Kurikulum 6 Mata Pelajaran',
          entityType: 'CurriculumDay',
          entityId: 'all-subjects',
          timestamp: '2026-08-28T14:30:00Z',
          details: 'Pemeriksaan kesesuaian dalil Quran dan hadits shahih.'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static addAuditLog(actorName: string, action: string, entityType: string, entityId?: string, details?: string): void {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    let all: AuditLog[] = [];
    if (raw) {
      try { all = JSON.parse(raw); } catch { all = []; }
    }
    all.unshift({
      id: `log-${Date.now()}`,
      actorId: 'current',
      actorName,
      action,
      entityType,
      entityId,
      timestamp: new Date().toISOString(),
      details
    });
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(all.slice(0, 100)));
  }

  // Bookmarks
  static getBookmarks(participantId: string): number[] {
    const raw = localStorage.getItem(`${STORAGE_KEYS.BOOKMARKS}_${participantId}`);
    if (!raw) return [1, 7];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static toggleBookmark(participantId: string, dayNumber: number): boolean {
    const current = this.getBookmarks(participantId);
    let updated: number[];
    let isBookmarked: boolean;
    if (current.includes(dayNumber)) {
      updated = current.filter(d => d !== dayNumber);
      isBookmarked = false;
    } else {
      updated = [...current, dayNumber].sort((a, b) => a - b);
      isBookmarked = true;
    }
    localStorage.setItem(`${STORAGE_KEYS.BOOKMARKS}_${participantId}`, JSON.stringify(updated));
    return isBookmarked;
  }

  // Reading Preferences
  static getReadingPrefs(): {
    arabicSize: 'text-2xl' | 'text-3xl' | 'text-4xl';
    latinSize: 'sm' | 'base' | 'lg';
    theme: 'default' | 'sepia' | 'dark';
    speechRate: number;
  } {
    const raw = localStorage.getItem(STORAGE_KEYS.READING_PREFS);
    const defaults = {
      arabicSize: 'text-3xl' as const,
      latinSize: 'base' as const,
      theme: 'default' as const,
      speechRate: 0.85
    };
    if (!raw) return defaults;
    try {
      return { ...defaults, ...JSON.parse(raw) };
    } catch {
      return defaults;
    }
  }

  static saveReadingPrefs(prefs: {
    arabicSize?: 'text-2xl' | 'text-3xl' | 'text-4xl';
    latinSize?: 'sm' | 'base' | 'lg';
    theme?: 'default' | 'sepia' | 'dark';
    speechRate?: number;
  }): void {
    const current = this.getReadingPrefs();
    localStorage.setItem(STORAGE_KEYS.READING_PREFS, JSON.stringify({ ...current, ...prefs }));
  }

  // Cloud & Online Data Synchronization
  static async checkServerHealth(): Promise<{ online: boolean; wibTime?: string; latencyMs?: number }> {
    const start = Date.now();
    try {
      const res = await fetch('/api/health', { method: 'GET', credentials: 'omit' });
      if (res.ok) {
        const data = await res.json();
        return {
          online: true,
          wibTime: data.wibTime,
          latencyMs: Date.now() - start
        };
      }
      return { online: false };
    } catch {
      return { online: false };
    }
  }

  static getLastCloudSyncTime(participantId: string): string | null {
    return localStorage.getItem(`menata_hidup_last_sync_${participantId}`);
  }

  static async syncToCloud(participantId: string): Promise<{ success: boolean; message: string; syncedAt?: string }> {
    const payload = {
      progress: this.getProgress(participantId),
      journals: this.getJournals(participantId),
      assessments: this.getAssessmentAttempts(participantId),
      bookmarks: this.getBookmarks(participantId),
      readingPrefs: this.getReadingPrefs(),
      syncedAt: new Date().toISOString(),
      clientVersion: '1.2.0'
    };

    try {
      const res = await fetch('/api/sync/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantId, data: payload })
      });

      if (res.ok) {
        const result = await res.json();
        const syncTime = result.syncedAt || new Date().toISOString();
        localStorage.setItem(`menata_hidup_last_sync_${participantId}`, syncTime);
        return {
          success: true,
          message: result.message || 'Sinkronisasi ke cloud berhasil.',
          syncedAt: syncTime
        };
      } else {
        const err = await res.json().catch(() => ({}));
        return { success: false, message: err.error || 'Gagal menyimpan ke cloud server.' };
      }
    } catch (e: any) {
      return { success: false, message: 'Tidak dapat terhubung ke server cloud. Periksa koneksi internet Anda.' };
    }
  }

  static async restoreFromCloud(participantId: string): Promise<{ success: boolean; message: string; count?: number }> {
    try {
      const res = await fetch(`/api/sync/load/${encodeURIComponent(participantId)}`, {
        method: 'GET'
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return { success: false, message: err.error || 'Tidak ada data cadangan cloud untuk akun ini.' };
      }

      const result = await res.json();
      const backup = result.data;
      if (!backup) {
        return { success: false, message: 'Data cadangan tidak valid.' };
      }

      // Restore items
      if (Array.isArray(backup.progress)) {
        localStorage.setItem(`${STORAGE_KEYS.PROGRESS}_${participantId}`, JSON.stringify(backup.progress));
      }
      if (Array.isArray(backup.journals)) {
        localStorage.setItem(`${STORAGE_KEYS.JOURNALS}_${participantId}`, JSON.stringify(backup.journals));
      }
      if (Array.isArray(backup.assessments)) {
        localStorage.setItem(`${STORAGE_KEYS.ASSESSMENTS}_${participantId}`, JSON.stringify(backup.assessments));
      }
      if (Array.isArray(backup.bookmarks)) {
        localStorage.setItem(`${STORAGE_KEYS.BOOKMARKS}_${participantId}`, JSON.stringify(backup.bookmarks));
      }
      if (backup.readingPrefs) {
        localStorage.setItem(STORAGE_KEYS.READING_PREFS, JSON.stringify(backup.readingPrefs));
      }

      if (result.syncedAt) {
        localStorage.setItem(`menata_hidup_last_sync_${participantId}`, result.syncedAt);
      }

      return {
        success: true,
        message: 'Data progres, refleksi jurnal, dan evaluasi berhasil dipulihkan dari cloud.',
        count: (backup.progress?.length || 0) + (backup.journals?.length || 0) + (backup.assessments?.length || 0)
      };
    } catch {
      return { success: false, message: 'Gagal menghubungi server untuk pemulihan data cloud.' };
    }
  }

  // Local JSON File Export & Import (100% offline & portable backup)
  static exportBackupJson(participantId: string, participantName: string): string {
    const backupObj = {
      app: 'Bimbingan Belajar Menata Hidup',
      exportDate: new Date().toISOString(),
      participantId,
      participantName,
      data: {
        progress: this.getProgress(participantId),
        journals: this.getJournals(participantId),
        assessments: this.getAssessmentAttempts(participantId),
        bookmarks: this.getBookmarks(participantId),
        readingPrefs: this.getReadingPrefs()
      }
    };
    return JSON.stringify(backupObj, null, 2);
  }

  static importBackupJson(participantId: string, jsonString: string): { success: boolean; message: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || !parsed.data) {
        return { success: false, message: 'Format file cadangan tidak valid.' };
      }
      const d = parsed.data;
      if (Array.isArray(d.progress)) {
        localStorage.setItem(`${STORAGE_KEYS.PROGRESS}_${participantId}`, JSON.stringify(d.progress));
      }
      if (Array.isArray(d.journals)) {
        localStorage.setItem(`${STORAGE_KEYS.JOURNALS}_${participantId}`, JSON.stringify(d.journals));
      }
      if (Array.isArray(d.assessments)) {
        localStorage.setItem(`${STORAGE_KEYS.ASSESSMENTS}_${participantId}`, JSON.stringify(d.assessments));
      }
      if (Array.isArray(d.bookmarks)) {
        localStorage.setItem(`${STORAGE_KEYS.BOOKMARKS}_${participantId}`, JSON.stringify(d.bookmarks));
      }
      if (d.readingPrefs) {
        localStorage.setItem(STORAGE_KEYS.READING_PREFS, JSON.stringify(d.readingPrefs));
      }
      return { success: true, message: 'File cadangan berhasil diimpor ke aplikasi.' };
    } catch {
      return { success: false, message: 'File cadangan rusak atau bukan JSON yang valid.' };
    }
  }
}
