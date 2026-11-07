import { ReferenceItem, Subject } from '../types';

export const SUBJECTS: Subject[] = [
  {
    id: 'aqidah',
    name: 'Aqidah Islamiyah',
    arabicName: 'العقيدة الإسلامية',
    tagline: 'Memperbaiki keyakinan, mengikhlaskan tauhid, dan mengenal Allah.',
    description: 'Membimbing peserta memahami dasar keimanan, makna dua kalimat syahadat, tauhid rububiyah, uluhiyah, dan asma wa shifat, serta rukun iman secara shahih sesuai pemahaman Salafus Shalih.',
    learningObjectives: [
      'Memahami kedudukan akidah sebagai fondasi utama setiap amal perbuatan.',
      'Mengenal Allah melalui nama dan sifat-Nya yang mulia berdasarkan dalil tegas.',
      'Memurnikan ibadah semata-mata karena Allah dan waspada terhadap segala bentuk syirik.',
      'Memantapkan rukun iman, khususnya iman kepada hari akhir dan takdir ilahi.'
    ],
    color: 'emerald',
    iconName: 'ShieldCheck'
  },
  {
    id: 'akhlak',
    name: 'Akhlak dan Adab Islamiyah',
    arabicName: 'الأخلاق والآداب الإسلامية',
    tagline: 'Menghiasi jiwa dengan perangai terpuji dan adab kenabian.',
    description: 'Membentuk kepribadian Muslim berkarakter mulia: kejujuran, amanah, sabar, syukur, tawaduk, adab terhadap orang tua, keluarga, tetangga, dan masyarakat luas.',
    learningObjectives: [
      'Menjadikan Rasulullah shallallahu alaihi wasallam sebagai teladan utama dalam budi pekerti.',
      'Menerapkan adab berbicara, menjaga lisan dari ghibah, dusta, dan perkataan sia-sia.',
      'Menunaikan adab pergaulan islami dengan orang tua, pasangan, anak, dan tetangga.',
      'Mengendalikan amarah dan melatih kelapangan dada dalam memaafkan sesama.'
    ],
    color: 'teal',
    iconName: 'HeartHandshake'
  },
  {
    id: 'hadis',
    name: 'Hadis dan Sunnah',
    arabicName: 'الحديث والسنة النبوية',
    tagline: 'Mendalami sabda Rasulullah shallallahu alaihi wasallam yang shahih.',
    description: 'Mempelajari hadis-hadis landasan iman, niat, takwa, hak sesama manusia, serta persiapan menghadapi kematian dari kitab-kitab induk yang mu\'tabar.',
    learningObjectives: [
      'Mengenal urgensi Sunnah sebagai wahyu kedua pembimbing hidup Muslim.',
      'Memahami kaidah dasar membedakan derajat hadis shahih, hasan, dan dhaif.',
      'Menghafal dan merenungkan hadis-hadis pokok (Arba\'in Nawawiyah & Riyadhus Shalihin).',
      'Mengimplementasikan bimbingan kenabian dalam rutinitas keseharian.'
    ],
    color: 'amber',
    iconName: 'BookOpen'
  },
  {
    id: 'tazkiyatun_nafs',
    name: 'Tazkiyatun Nafs',
    arabicName: 'تزكية النفس',
    tagline: 'Membersihkan kalbu dari penyakit batin dan menghidupkan muhasabah.',
    description: 'Fokus pada penyucian hati dari riya, hasad, ujub, hubbud dunya, dan panjang angan-angan; membiasakan taubat nasuha, istighfar, dzikir, dan kesiapan menjemput ajal husnul khatimah.',
    learningObjectives: [
      'Mengenali gejala dan bahaya penyakit hati terhadap keselamatan akhirat.',
      'Menjalankan muhasabah harian secara jujur dan berkesinambungan.',
      'Membiasakan taubat, istighfar, dan pembersihan niat dalam setiap tarikan nafas.',
      'Membangun rasa takut yang proporsional (khauf) dan pengharapan yang teguh (raja\').'
    ],
    color: 'cyan',
    iconName: 'Sparkles'
  },
  {
    id: 'fikih',
    name: 'Fikih Ibadah dan Kehidupan',
    arabicName: 'فقه العبادات والحياة',
    tagline: 'Mengamalkan syariat dengan benar sesuai petunjuk Nabi.',
    description: 'Panduan praktis thaharah, wudhu, mandi wajib, shalat fardhu dan sunnah, puasa, zakat, pengurusan jenazah, wasiat, dan doa dzikir sehari-hari dengan dalil yang jelas.',
    learningObjectives: [
      'Menyempurnakan tata cara bersuci (thaharah) dan shalat sesuai sunnah Nabi.',
      'Memahami syarat, rukun, dan pembatal ibadah pokok secara runtut.',
      'Memahami adab menghadapi kematian, pengurusan jenazah, dan aturan wasiat syar\'i.',
      'Menghidupkan doa dan wirid harian yang diajarkan Rasulullah.'
    ],
    color: 'indigo',
    iconName: 'Compass'
  },
  {
    id: 'muamalah',
    name: 'Muamalah Islamiyah',
    arabicName: 'المعاملات الإسلامية',
    tagline: 'Menjaga kehalalan rezeki, adab transaksi, dan hak sesama manusia.',
    description: 'Menerapkan prinsip syariat dalam hubungan sosial, keluarga, pekerjaan, perniagaan yang jujur, menghindari riba dan kezaliman, serta melunasi utang sebelum ajal tiba.',
    learningObjectives: [
      'Mengetahui prinsip kehalalan dalam mencari nafkah dan bahaya harta haram.',
      'Menjauhi transaksi riba, gharar, penipuan, dan manipulasi pasar.',
      'Menjalankan kewajiban membayar utang dan menyelesaikan sangkutan hak sesama.',
      'Membangun keharmonisan rumah tangga dan pemenuhan hak nafkah serta waris dasar.'
    ],
    color: 'stone',
    iconName: 'Scale'
  }
];

export const REFERENCES_LIBRARY: ReferenceItem[] = [
  {
    id: 'ref-quran',
    title: 'Al-Qur\'an al-Karim wa Tarjamatu Ma\'anihi',
    author: 'Kalamullah (Wahyu Ilahi)',
    category: 'umum',
    language: 'Arab & Terjemah',
    publisher: 'Mujamma\' Malik Fahd / Kemenag RI',
    publicationYear: 2022,
    edition: 'Mushaf Madinah & Standar Indonesia',
    verificationStatus: 'Terverifikasi',
    notes: 'Rujukan primer tertinggi umat Islam dalam akidah, syariat, dan akhlak.'
  },
  {
    id: 'ref-bukhari',
    title: 'Al-Jami\' ash-Shahih al-Musnad al-Mukhtashar (Shahih al-Bukhari)',
    author: 'Imam Abu Abdillah Muhammad bin Ismail al-Bukhari (194–256 H)',
    category: 'hadis',
    language: 'Arab',
    publisher: 'Dar Thuq an-Najah / Maktabah ar-Rusyd',
    edition: 'Tahqiq Muhammad Zuhair bin Nashir',
    verificationStatus: 'Terverifikasi',
    notes: 'Kitab hadis tershahih setelah Al-Qur\'an, memuat 7.563 hadis dengan sanad muttashil.'
  },
  {
    id: 'ref-muslim',
    title: 'Al-Musnad ash-Shahih al-Mukhtashar (Shahih Muslim)',
    author: 'Imam Abul Husain Muslim bin al-Hajjaj an-Naisaburi (206–261 H)',
    category: 'hadis',
    language: 'Arab',
    publisher: 'Dar Ihya al-Kutub al-Arabiyyah',
    edition: 'Tahqiq Muhammad Fuad Abdul Baqi',
    verificationStatus: 'Terverifikasi',
    notes: 'Kitab rujukan hadis shahih kedua yang memiliki susunan bab sistematis dan teruji.'
  },
  {
    id: 'ref-riyadhus',
    title: 'Riyadhus Shalihin min Kalami Sayyidil Mursalin',
    author: 'Imam Abu Zakariya Yahya bin Syaraf an-Nawawi (631–676 H)',
    category: 'akhlak',
    language: 'Arab & Terjemah',
    publisher: 'Darul Hadits / Pustaka Imam Syafi\'i',
    edition: 'Tahqiq Syaikh al-Albani / Syaikh Syu\'aib al-Arnauth',
    verificationStatus: 'Terverifikasi',
    notes: 'Kumpulan hadis tematik terlengkap mencakup adab, tazkiyah, amal saleh, dan persiapan kematian.'
  },
  {
    id: 'ref-adzkar',
    title: 'Al-Adzkar al-Muntakhabah min Kalami Sayyidil Abrar',
    author: 'Imam Abu Zakariya Yahya bin Syaraf an-Nawawi (631–676 H)',
    category: 'fikih',
    language: 'Arab & Terjemah',
    publisher: 'Darul Manar',
    edition: 'Tahqiq Basyir Muhammad Uyun',
    verificationStatus: 'Terverifikasi',
    notes: 'Buku rujukan induk dzikir, doa harian, dan adab kehidupan seorang Muslim dari bangun tidur hingga tidur kembali.'
  },
  {
    id: 'ref-wabil',
    title: 'Al-Wabil ash-Shayyib min al-Kalim ath-Thayyib',
    author: 'Imam Syamsuddin Abu Abdillah Ibn al-Qayyim al-Jauziyyah (691–751 H)',
    category: 'tazkiyatun_nafs',
    language: 'Arab & Terjemah',
    publisher: 'Dar Ibnu Hazm',
    edition: 'Tahqiq Abdurrahman bin Hasan Alu Syaikh',
    verificationStatus: 'Terverifikasi',
    notes: 'Penjelasan mendalam mengenai hakikat dzikir, kebersihan jiwa, kebahagiaan hati, dan keutamaan ikhlas.'
  },
  {
    id: 'ref-madarij',
    title: 'Madarij as-Salikin baina Manazil Iyyaka Na\'budu wa Iyyaka Nasta\'in',
    author: 'Imam Ibn al-Qayyim al-Jauziyyah (691–751 H)',
    category: 'tazkiyatun_nafs',
    language: 'Arab',
    publisher: 'Darul Hadits, Kairo',
    edition: 'Syarah Manazil as-Sa\'irin',
    verificationStatus: 'Terverifikasi',
    notes: 'Karya agung pembinaan ruhani Islam, mengupas stasiun taubat, tawakal, ridha, dan muhasabah.'
  },
  {
    id: 'ref-jami-ulum',
    title: 'Jami\' al-\'Ulum wa al-Hikam fi Syarhi Khamsina Haditsan min Jawami\'il Kalim',
    author: 'Imam Ibnu Rajab al-Hanbali (736–795 H)',
    category: 'hadis',
    language: 'Arab & Terjemah',
    publisher: 'Muassasah ar-Risalah',
    edition: 'Tahqiq Syu\'aib al-Arnauth & Ibrahim Bajis',
    verificationStatus: 'Terverifikasi',
    notes: 'Syarah 50 hadis jawami\'ul kalim, menguraikan perpaduan akidah, fiqih, dan adab secara mendalam.'
  },
  {
    id: 'ref-ushul-tsalatsah',
    title: 'Tsalatsatul Ushul wa Adillatuha (Tiga Landasan Utama)',
    author: 'Syaikh Muhammad bin Abdul Wahhab (1115–1206 H)',
    category: 'aqidah',
    language: 'Arab & Terjemah',
    publisher: 'Darul Wathan',
    edition: 'Syarah Syaikh Muhammad bin Shalih al-Utsaimin',
    verificationStatus: 'Terverifikasi',
    notes: 'Risalah ringkas nan padat mengenai tiga pertanyaan kubur: mengenal Rabb, mengenal agama Islam, dan mengenal Nabi shallallahu alaihi wasallam.'
  },
  {
    id: 'ref-tadzkirah',
    title: 'At-Tadzkirah bi Ahwal al-Mauta wa Umur al-Akhirah',
    author: 'Imam Abu Abdillah Muhammad bin Ahmad al-Qurthubi (600–671 H)',
    category: 'tazkiyah_dan_kematian',
    language: 'Arab & Terjemah',
    publisher: 'Darul Minhaj',
    edition: 'Tahqiq ash-Shadiq bin Muhammad',
    verificationStatus: 'Terverifikasi',
    notes: 'Uraian terinci tentang proses sakaratul maut, alam kubur, hari kebangkitan, hisab, surga dan neraka berdasarkan dalil shahih.'
  },
  {
    id: 'ref-minhaj-muslim',
    title: 'Minhaj al-Muslim: Kitab Akidah, Adab, Akhlak, Ibadah, wa Muamalah',
    author: 'Syaikh Abu Bakr Jabir al-Jaza\'iri (1921–2018 M)',
    category: 'muamalah',
    language: 'Arab & Terjemah',
    publisher: 'Maktabah al-Ulum wal Hikam',
    edition: 'Edisi Lengkap',
    verificationStatus: 'Terverifikasi',
    notes: 'Ensiklopedi ringkas kehidupan Muslim komprehensif dari fikih ibadah hingga transaksi muamalah dan keluarga.'
  },
  {
    id: 'ref-fiqh-sunnah',
    title: 'Fiqh as-Sunnah',
    author: 'Sayyid Sabiq (1915–2000 M)',
    category: 'fikih',
    language: 'Arab & Terjemah',
    publisher: 'Darul Fath lil I\'lam al-Arabi',
    edition: 'Disertai ta\'liq derajat hadis oleh Syaikh al-Albani',
    verificationStatus: 'Terverifikasi',
    notes: 'Pembahasan fikih lintas mazhab yang bertumpu pada dalil Al-Qur\'an dan hadis shahih.'
  }
];
