-- ====================================================================
-- SKEMA BASIS DATA RELASIONAL RESMI
-- BIMBINGAN BELAJAR MENATA HIDUP MENUJU AKHIR HIDUP YANG INDAH
-- Dialek: PostgreSQL / Supabase dengan Row Level Security (RLS)
-- ====================================================================

-- 1. TABEL: PROFILES (Data Pengguna & Hak Akses)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin_akademik', 'pembimbing', 'peserta')),
    participant_number VARCHAR(50) UNIQUE,
    phone_number VARCHAR(30),
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'completed')),
    assigned_mentor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TABEL: PROGRAMS (Program Bimbingan Belajar)
CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    academic_year VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Jakarta',
    passing_score NUMERIC(5,2) NOT NULL DEFAULT 75.00,
    min_completion_percentage NUMERIC(5,2) NOT NULL DEFAULT 80.00,
    status VARCHAR(30) NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABEL: SUBJECTS (6 Mata Pelajaran Utama)
CREATE TABLE IF NOT EXISTS subjects (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    arabic_name VARCHAR(150) NOT NULL,
    tagline TEXT,
    description TEXT,
    learning_objectives JSONB,
    status VARCHAR(30) NOT NULL DEFAULT 'active'
);

-- 4. TABEL: CURRICULUM_DAYS (Modul 90 Hari Kalender)
CREATE TABLE IF NOT EXISTS curriculum_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL CHECK (day_number BETWEEN 1 AND 90),
    month_number INTEGER NOT NULL CHECK (month_number BETWEEN 1 AND 3),
    week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 13),
    scheduled_date DATE,
    subject_id VARCHAR(50) REFERENCES subjects(id),
    title VARCHAR(255) NOT NULL,
    theme VARCHAR(255) NOT NULL,
    learning_objectives JSONB NOT NULL,
    competencies JSONB NOT NULL,
    summary TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    quran_dalil JSONB NOT NULL,
    hadith_dalil JSONB NOT NULL,
    ulama_quotes JSONB,
    practical_examples JSONB,
    common_mistakes JSONB,
    reflection_questions JSONB,
    daily_practice_task TEXT,
    quiz_questions JSONB,
    reference_ids JSONB,
    unlock_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    UNIQUE (program_id, day_number)
);

-- 5. TABEL: LEARNING_PROGRESS (Pemantauan Kehadiran & Penyelesaian Harian)
CREATE TABLE IF NOT EXISTS learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    curriculum_day_id UUID NOT NULL REFERENCES curriculum_days(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    quiz_score NUMERIC(5,2),
    completion_status VARCHAR(30) NOT NULL DEFAULT 'completed' CHECK (completion_status IN ('in_progress', 'completed')),
    UNIQUE (participant_id, curriculum_day_id)
);

-- 6. TABEL: ASSESSMENTS (Evaluasi Pekanan, Bulanan, & Akhir Program)
CREATE TABLE IF NOT EXISTS assessments (
    id VARCHAR(100) PRIMARY KEY,
    program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    assessment_type VARCHAR(50) NOT NULL CHECK (assessment_type IN ('mingguan', 'bulanan', 'akhir')),
    day_number INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 45,
    maximum_score NUMERIC(5,2) NOT NULL DEFAULT 100.00,
    passing_score NUMERIC(5,2) NOT NULL DEFAULT 75.00,
    status VARCHAR(30) NOT NULL DEFAULT 'active'
);

-- 7. TABEL: QUESTIONS (Bank Soal Objektif & Uraian)
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(100) PRIMARY KEY,
    assessment_id VARCHAR(100) REFERENCES assessments(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL CHECK (question_type IN ('pilihan_ganda', 'benar_salah', 'uraian')),
    options JSONB,
    correct_answer JSONB,
    explanation TEXT,
    points NUMERIC(5,2) NOT NULL DEFAULT 25.00,
    rubric_guide TEXT
);

-- 8. TABEL: ASSESSMENT_ATTEMPTS (Pengerjaan Ujian Peserta)
CREATE TABLE IF NOT EXISTS assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id VARCHAR(100) REFERENCES assessments(id) ON DELETE CASCADE,
    participant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    score NUMERIC(5,2),
    status VARCHAR(30) NOT NULL DEFAULT 'submitted' CHECK (status IN ('in_progress', 'submitted', 'reviewed')),
    attempt_number INTEGER NOT NULL DEFAULT 1,
    reviewed_by UUID REFERENCES profiles(id),
    reviewed_at TIMESTAMPTZ,
    mentor_notes TEXT
);

-- 9. TABEL: ASSESSMENT_ANSWERS (Rincian Jawaban & Penilaian Tiap Soal)
CREATE TABLE IF NOT EXISTS assessment_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID REFERENCES assessment_attempts(id) ON DELETE CASCADE,
    question_id VARCHAR(100) REFERENCES questions(id),
    answer JSONB NOT NULL,
    awarded_score NUMERIC(5,2),
    feedback TEXT
);

-- 10. TABEL: REFLECTION_JOURNALS (Jurnal Muhasabah & Praktik Harian Privat)
CREATE TABLE IF NOT EXISTS reflection_journals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    curriculum_day_id UUID REFERENCES curriculum_days(id),
    day_number INTEGER NOT NULL,
    date DATE NOT NULL,
    lesson_theme VARCHAR(255) NOT NULL,
    what_i_understood TEXT NOT NULL,
    what_i_need_to_improve TEXT NOT NULL,
    habit_to_practice TEXT NOT NULL,
    challenges_faced TEXT,
    action_plan TEXT,
    personal_notes TEXT,
    is_private BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (participant_id, day_number)
);

-- 11. TABEL: REFERENCES_LIBRARY (Perpustakaan Digital Kitab & Sumber)
CREATE TABLE IF NOT EXISTS references_library (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    language VARCHAR(50) NOT NULL,
    publisher VARCHAR(150),
    publication_year VARCHAR(50),
    edition VARCHAR(150),
    isbn VARCHAR(50),
    source_url TEXT,
    verification_status VARCHAR(50) NOT NULL DEFAULT 'Terverifikasi',
    notes TEXT
);

-- 12. TABEL: CERTIFICATES (Sertifikat Kelulusan Resmi Digital)
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    participant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    program_id UUID REFERENCES programs(id),
    program_title VARCHAR(255) NOT NULL,
    final_score NUMERIC(5,2) NOT NULL,
    predicate VARCHAR(50) NOT NULL,
    issued_at DATE NOT NULL DEFAULT CURRENT_DATE,
    approved_by UUID NOT NULL REFERENCES profiles(id),
    verification_token VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'revoked')),
    revocation_reason TEXT
);

-- 13. TABEL: NOTIFICATIONS (Pemberitahuan Sistem)
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. TABEL: AUDIT_LOGS (Pencatatan Jejak Aktivitas & Perubahan Nilai)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES profiles(id),
    actor_name VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255),
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEKS PERFORMA
CREATE INDEX IF NOT EXISTS idx_progress_participant ON learning_progress(participant_id);
CREATE INDEX IF NOT EXISTS idx_attempts_participant ON assessment_attempts(participant_id);
CREATE INDEX IF NOT EXISTS idx_journals_participant ON reflection_journals(participant_id);
CREATE INDEX IF NOT EXISTS idx_certificates_token ON certificates(verification_token);
CREATE INDEX IF NOT EXISTS idx_curriculum_day_number ON curriculum_days(day_number);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflection_journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 1. Peserta hanya dapat membaca dan mengubah profil pribadi mereka
CREATE POLICY "Peserta dapat mengelola profil sendiri" ON profiles
    FOR ALL USING (auth.uid() = id);

-- 2. Peserta hanya dapat mengakses progres belajar milik sendiri
CREATE POLICY "Peserta melihat progres sendiri" ON learning_progress
    FOR ALL USING (auth.uid() = participant_id);

-- 3. Jurnal muhasabah pribadi sepenuhnya privat (hanya pemilik yang dapat membaca)
CREATE POLICY "Jurnal muhasabah bersifat privat untuk peserta" ON reflection_journals
    FOR ALL USING (auth.uid() = participant_id);

-- 4. Pembimbing dapat melihat hasil ujian peserta yang dibimbing
CREATE POLICY "Pembimbing dapat memeriksa ujian peserta" ON assessment_attempts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('pembimbing', 'admin_akademik', 'super_admin')
        )
    );

-- 5. Sertifikat yang sah dapat diverifikasi secara publik oleh siapa saja
CREATE POLICY "Sertifikat sah dapat diverifikasi publik" ON certificates
    FOR SELECT USING (status = 'valid');
