export type Role = 'super_admin' | 'admin_akademik' | 'pembimbing' | 'peserta';

export type SubjectId = 
  | 'aqidah'
  | 'akhlak'
  | 'hadis'
  | 'tazkiyatun_nafs'
  | 'fikih'
  | 'muamalah';

export interface Subject {
  id: SubjectId;
  name: string;
  arabicName: string;
  tagline: string;
  description: string;
  learningObjectives: string[];
  color: string;
  iconName: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  participantNumber?: string;
  avatarUrl?: string;
  status: 'active' | 'suspended' | 'completed';
  assignedMentorId?: string;
  createdAt: string;
}

export interface QuranDalil {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translation: string;
  tafsirBrief?: string;
}

export interface HadithDalil {
  rawi: string;
  kitab: string;
  hadithNumber: string | number;
  arabicText?: string;
  translation: string;
  grade: 'Sahih' | 'Hasan';
  gradeSource: string;
}

export interface UlamaQuote {
  scholarName: string;
  scholarEra?: string;
  bookTitle: string;
  quoteText: string;
  pageOrBab?: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface CurriculumDay {
  id: string;
  dayNumber: number;
  monthNumber: 1 | 2 | 3;
  weekNumber: number;
  subjectId: SubjectId;
  title: string;
  theme: string;
  learningObjectives: string[];
  competencies: string[];
  summary: string;
  contentMarkdown: string;
  quranDalil: QuranDalil[];
  hadithDalil: HadithDalil[];
  ulamaQuotes: UlamaQuote[];
  practicalExamples: string[];
  commonMistakes: string[];
  reflectionQuestions: string[];
  dailyPracticeTask: string;
  quizQuestions: QuizQuestion[];
  referenceIds: string[];
  isEvaluationDay?: boolean;
  evaluationId?: string;
}

export interface LearningProgress {
  participantId: string;
  dayNumber: number;
  completed: boolean;
  completedAt?: string;
  quizScore?: number;
  timeSpentMinutes?: number;
}

export interface ReflectionJournal {
  id: string;
  participantId: string;
  dayNumber: number;
  date: string;
  lessonTheme: string;
  whatIUnderstood: string;
  whatINeedToImprove: string;
  habitToPractice: string;
  challengesFaced: string;
  actionPlan: string;
  personalNotes: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AssessmentType = 'mingguan' | 'bulanan' | 'akhir';

export interface AssessmentQuestion {
  id: string;
  type: 'pilihan_ganda' | 'benar_salah' | 'uraian';
  questionText: string;
  options?: string[];
  correctAnswer?: string | number; // hidden from participant during test
  points: number;
  rubricGuide?: string;
  explanation?: string;
}

export interface Assessment {
  id: string;
  title: string;
  assessmentType: AssessmentType;
  dayNumber: number;
  weekNumber?: number;
  monthNumber?: number;
  durationMinutes: number;
  passingScore: number;
  maxScore: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentAnswer {
  questionId: string;
  participantAnswer: string | number;
  awardedScore?: number;
  feedback?: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  participantId: string;
  startedAt: string;
  submittedAt?: string;
  totalScore?: number;
  status: 'in_progress' | 'submitted' | 'reviewed';
  attemptNumber: number;
  answers: AssessmentAnswer[];
  mentorNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ReferenceItem {
  id: string;
  title: string;
  author: string;
  category: SubjectId | 'umum' | 'tazkiyah_dan_kematian';
  language: 'Arab' | 'Indonesia' | 'Arab & Terjemah';
  publisher?: string;
  publicationYear?: string | number;
  edition?: string;
  isbn?: string;
  verificationStatus: 'Terverifikasi' | 'Perlu Pemeriksaan';
  notes: string;
  sourceUrl?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  participantId: string;
  participantName: string;
  programTitle: string;
  issuedAt: string;
  periodText: string;
  finalScore: number;
  predicate: 'Sangat Baik' | 'Baik' | 'Cukup';
  approvedByMentorId: string;
  mentorName: string;
  mentorTitle: string;
  verificationToken: string;
  status: 'valid' | 'revoked';
  revocationReason?: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'unlock' | 'evaluation' | 'grading' | 'certificate' | 'announcement';
  read: boolean;
  createdAt: string;
  linkAction?: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  entityType: string;
  entityId?: string;
  timestamp: string;
  details?: string;
}

export interface ProgramConfig {
  startDate: string; // YYYY-MM-DD
  programTitle: string;
  academicYear: string;
  timezone: string; // 'Asia/Jakarta'
  adminOverrideSimulatedDay?: number; // if set, simulates current day for auditing
  bypassScheduleLock: boolean; // if true, allows admins/mentors to preview all 90 days
  passingScore: number; // 75
  minCompletionPercentage: number; // 80%
}
