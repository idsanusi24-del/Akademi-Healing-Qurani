# BIMBINGAN BELAJAR MENATA HIDUP
### *Menuju Akhir Hidup yang Indah*

Platform pembelajaran Islam terpadu 90 hari kalender dengan sistem kurikulum harian, dalil Al-Qur'an dan Hadits shahih, jurnal refleksi muhasabah, mutaba'ah amal yaumiyah, 210 bank soal evaluasi akademik (pekanan, bulanan, dan akhir), serta sertifikat kelulusan resmi ber-QR Code.

---

## 🚀 Panduan Upload ke GitHub & Hosting Online Gratis

Ada dua cara mudah untuk mengunggah proyek ini ke **GitHub** dan menjadikannya online secara permanen dengan domain sendiri atau domain gratis:

---

### CARA 1: Upload Langsung Menggunakan GitHub Desktop / Web (Paling Mudah)

1. **Unduh Berkas Proyek:**
   - Unduh berkas ZIP proyek dari website atau dari folder `public/menata-hidup-source-code.zip`.
   - Ekstrak berkas ZIP tersebut di komputer/laptop Anda.

2. **Buat Repositori Baru di GitHub:**
   - Masuk ke akun Anda di [https://github.com](https://github.com).
   - Klik tombol hijau **New** (Buat Repositori Baru).
   - Beri nama repositori, contoh: `menata-hidup` atau `bimbingan-menata-hidup`.
   - Pilih **Public** (atau Private sesuai preferensi Anda).
   - Klik **Create repository**.

3. **Unggah File:**
   - Di halaman repositori baru, pilih tautan **"uploading an existing file"**.
   - Tarik dan lepaskan (*drag and drop*) seluruh berkas proyek yang telah diekstrak (kecuali folder `node_modules` jika ada).
   - Klik **Commit changes**.

---

### CARA 2: Upload Menggunakan Perintah Git (Terminal / Command Prompt)

Buka terminal di dalam folder proyek ini, lalu jalankan:

```bash
# 1. Inisialisasi Git
git init

# 2. Tambahkan seluruh berkas ke staging
git add .

# 3. Lakukan Commit pertama
git commit -m "feat: rilis resmi platform bimbingan belajar menata hidup 90 hari"

# 4. Ubah nama branch utama ke main
git branch -M main

# 5. Sambungkan ke repositori GitHub Anda (ganti USERNAME dan REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 6. Kirim kode ke GitHub
git push -u origin main
```

---

## 🌐 Cara Menjadikan Website Online dari GitHub (Hosting Gratis)

Setelah kode Anda berada di GitHub, Anda bisa menghubungkannya ke layanan hosting modern gratis dalam hitungan detik. Setiap kali Anda mengubah kode di GitHub, website akan ter-update otomatis (*auto deploy*):

### Opsi A: Menggunakan Vercel (Sangat Direkomendasikan & 100% Gratis)
1. Buka [https://vercel.com](https://vercel.com) dan masuk menggunakan akun **GitHub** Anda.
2. Klik tombol **"Add New..."** > pilih **"Project"**.
3. Pilih repositori `menata-hidup` dari daftar GitHub Anda, lalu klik **Import**.
4. Di bagian *Build and Output Settings*:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Klik **Deploy**.
6. Selesai! Website Anda langsung aktif secara global dengan alamat seperti `https://menata-hidup.vercel.app`. Anda juga bisa menghubungkan domain pribadi Anda (misal: `www.menatahidup.id`) secara gratis.

### Opsi B: Menggunakan Netlify (Alternatif Gratis)
1. Masuk ke [https://www.netlify.com](https://www.netlify.com) dengan akun GitHub.
2. Klik **"Add new site"** > **"Import an existing project"** > **GitHub**.
3. Pilih repositori `menata-hidup`.
4. Build command: `npm run build`, Publish directory: `dist`.
5. Klik **Deploy site**.

---

## 💻 Menjalankan di Komputer Lokal (Development)

Jika Anda ingin menjalankan atau mengembangkan website ini di komputer Anda sendiri:

```bash
# 1. Pastikan Node.js (v18+) telah terpasang di komputer
# 2. Instal dependensi:
npm install

# 3. Jalankan server lokal:
npm run dev
```

Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 📋 Fitur Utama Sistem

* **90 Hari Kurikulum Berurutan:** Materi harian terbuka bertahap tepat pukul 23.59 WIB.
* **15 Evaluasi Akademik Lengkap:**
  - 12 Evaluasi Pekanan (10 pilihan ganda tiap pekan = 120 soal).
  - 2 Evaluasi Bulanan (20 pilihan ganda tiap bulan = 40 soal).
  - 1 Evaluasi Akhir Komprehensif (50 pilihan ganda = 50 soal).
  - Dibuka resmi pukul 23.50 WIB pada hari pelaksanaan.
* **Pusat Siaran WhatsApp:** Siaran materi harian 1-klik langsung ke WhatsApp Grup dan integrasi webhook otomatis (Fonnte/Wablas).
* **Desain Editorial Mushaf Premium:** Palet warna *Museum Navy* `#0A192F`, *Off-White* `#FBF9F5`, dan aksen emas tua `#B4863A`.
* **PWA (Progressive Web App):** Dapat diinstal langsung di layar beranda ponsel Android dan iOS tanpa Play Store.
* **Sertifikat Kelulusan Resmi:** Verifikasi nomor register dan kode QR digital.
