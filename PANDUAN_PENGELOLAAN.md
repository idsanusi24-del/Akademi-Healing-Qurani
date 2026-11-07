# PANDUAN PENGELOLAAN & TATA KELOLA AKADEMIK
## BIMBINGAN BELAJAR MENATA HIDUP MENUJU AKHIR HIDUP YANG INDAH

---

### A. IDENTITAS DAN MANHAJ PROGRAM
- **Nama Program**: Bimbingan Belajar Menata Hidup Menuju Akhir Hidup yang Indah
- **Nama Singkat**: MENATA HIDUP
- **Tagline**: *"Menata Akidah, Memperbaiki Akhlak, Membersihkan Jiwa, Mengamalkan Syariat, dan Mempersiapkan Kehidupan Akhirat."*
- **Format**: Pendidikan Islam Nonformal Terpadu 90 Hari Kalender Penuh
- **Landasan Ilmiah**: Al-Qur'an dan As-Sunnah Ash-Shahihah dengan pemahaman generasi Salafus Shalih (*Ahlus Sunnah wal Jama'ah*).

---

### B. STRUKTUR PERAN DAN KEWENANGAN PENGGUNA

Aplikasi membagi hak akses ke dalam 4 jenis akun:

1. **Super Admin**:
   - Menetapkan tanggal mulai (*start_date*) angkatan baru.
   - Mengatur zona waktu resmi (Asia/Jakarta / WIB).
   - Mengaktifkan mode simulasi hari atau *Bypass Kunci* untuk keperluan audit kelayakan.
   - Mengelola akun administrator dan pembimbing.
   - Memantau log audit sistem dan aktivitas krusial.
   - Mengunduh rekapitulasi nilai dan laporan akademik (format CSV).

2. **Admin Akademik**:
   - Memvalidasi pendaftaran peserta baru.
   - Memantau jadwal belajar harian dan statistik penyelesaian modul per angkatan.
   - Membantu peserta yang mengalami kendala teknis atau permohonan susulan ujian.

3. **Pembimbing (Mentor)**:
   - Mengoreksi jawaban esai pada evaluasi mingguan, bulanan, dan evaluasi akhir menggunakan panduan rubrik.
   - Memberikan nasihat, bimbingan ruhani, dan umpan balik personal kepada peserta.
   - Memverifikasi kelayakan kelulusan peserta.
   - Mengesahkan dan menandatangani sertifikat resmi secara digital.

4. **Peserta (Thalibul Ilmi)**:
   - Mengakses modul materi harian yang terbuka otomatis pukul 00.00 WIB.
   - Mendengarkan pelafalan tilawah ayat Al-Qur'an.
   - Mengisi jurnal muhasabah & praktik harian (privat).
   - Mengisi checklist *Mutaba'ah Amal Yaumiyah*.
   - Mengerjakan kuis harian, evaluasi Ahad, evaluasi bulanan, dan evaluasi akhir.
   - Melihat rekapitulasi nilai komposit dan mengunduh sertifikat ber-QR Code resmi.

---

### C. SISTEM WAKTU DAN ATURAN PEMBUKAAN MATERI

1. **Zona Waktu Resmi**:
   - Sistem dikalibrasi menggunakan waktu server **WIB (Waktu Indonesia Barat / UTC+7)**.
2. **Jadwal Pembukaan**:
   - Modul Hari ke-1 dibuka pada tanggal mulai pukul 00.00 WIB.
   - Modul hari berikutnya terbuka bertahap setiap pukul 00.00 WIB.
3. **Integritas Server**:
   - Penguncian materi diverifikasi di sisi server melalui endpoint `/api/verify-day-unlock`. Peserta tidak dapat membuka materi masa depan dengan mengubah parameter URL.
4. **Fleksibilitas Mengulang**:
   - Materi yang telah terbuka tidak akan terkunci kembali sehingga peserta yang sempat berhalangan dapat mengejar ketertinggalan tanpa kehilangan hak belajar.

---

### D. SISTEM EVALUASI, SKOR, DAN KELULUSAN

#### 1. Komposisi Nilai Akhir (Skala 0–100):
- **Evaluasi Mingguan (Setiap Ahad)**: Bobot **25%**
- **Evaluasi Komprehensif Bulanan (Bulan 1, 2, 3)**: Bobot **30%**
- **Tugas Praktik & Jurnal Muhasabah**: Bobot **20%**
- **Evaluasi Akhir Hari Ke-90**: Bobot **25%**

#### 2. Kategori Predikat:
- **90 – 100**: *Sangat Baik (Mumtaz)*
- **80 – 89**: *Baik (Jayyid Jiddan)*
- **70 – 79**: *Cukup (Jayyid)*
- **< 70**: *Perlu Bimbingan (Remedial)*

#### 3. Standar Syarat Kelulusan Resmi:
1. Nilai komposit akhir minimal **75**.
2. Minimal **80%** materi harian diselesaikan.
3. Seluruh evaluasi bulanan dan evaluasi akhir telah dikerjakan.
4. Tugas akhir (*Rencana Hidup Husnul Khatimah*) telah diserahkan.
5. Verifikasi dan otorisasi disetujui oleh Pembimbing.

---

### E. TATA CARA PENERBITAN DAN VERIFIKASI SERTIFIKAT

1. **Penerbitan**:
   - Sertifikat digital diterbitkan dengan nomor seri unik (contoh: `MH-2026-89412`).
   - Dilengkapi segel emas resmi lembaga dan tanda tangan digital pembimbing.
   - Disediakan tombol **Cetak / Unduh PDF** dengan format tata letak elegan.
2. **Verifikasi Publik**:
   - Setiap sertifikat memuat **Kode QR** dan token verifikasi unik.
   - Pihak luar dapat memeriksa keaslian sertifikat melalui halaman `/verifikasi/:token` secara instan.

---

### F. PANDUAN PENGOPERASIAN DATABASE

Skema relasional lengkap 16 tabel telah disiapkan pada file `src/db/schema.sql`.
Untuk menerapkan skema pada basis data PostgreSQL atau Supabase produksi:
1. Buka console database PostgreSQL / SQL Editor Supabase.
2. Jalankan isi berkas `src/db/schema.sql`.
3. Seluruh tabel, indeks foreign key, dan Row Level Security (RLS) akan aktif otomatis.
