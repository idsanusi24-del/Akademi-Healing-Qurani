import { Assessment } from '../types';

export const FINAL_ASSESSMENT: Assessment = {
  id: 'eval-final-90',
  title: 'Evaluasi Akhir Komprehensif: Menata Hidup Menuju Akhir Hidup yang Indah (90 Hari)',
  assessmentType: 'akhir',
  dayNumber: 90,
  monthNumber: 3,
  durationMinutes: 120,
  passingScore: 75,
  maxScore: 100,
  questions: [
    // --- Bagian 1: Akidah, Tauhid & Niat (No. 1-10) ---
    {
      id: 'final-q1',
      type: 'pilihan_ganda',
      questionText: 'Apakah makna kalimat Tauhid "Laa Ilaaha Illallaah" yang paling tepat menurut kaidah para ulama Ahlus Sunnah wal Jama\'ah?',
      options: [
        'Tidak ada Tuhan pencipta selain Allah semata',
        'Tidak ada sesembahan yang berhak diibadahi dengan benar kecuali Allah semata',
        'Tidak ada penguasa alam semesta selain Allah',
        'Tidak ada yang memberi rezeki selain Allah'
      ],
      correctAnswer: 1,
      points: 2,
      explanation: 'Makna syar\'i kalimat tauhid adalah "Laa ma\'buuda bi-haqqin illallaah" (Tiada sesembahan yang berhak disembah dengan haq selain Allah).'
    },
    {
      id: 'final-q2',
      type: 'pilihan_ganda',
      questionText: 'Manakah dari pernyataan berikut yang membedakan antara Tauhid Rububiyyah dan Tauhid Uluhiyyah?',
      options: [
        'Rububiyyah mengesakan perbuatan Allah (mencipta, menguasai, mengatur), sedangkan Uluhiyyah mengesakan Allah dalam perbuatan hamba (berdoa, shalat, menyembelih, berharap)',
        'Rububiyyah hanya wajib diyakini oleh para malaikat',
        'Uluhiyyah sudah diakui penuh oleh kaum musyrikin Quraisy terdahulu',
        'Keduanya sama persis tanpa perbedaan penerapan'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Orang kafir Quraisy mengakui tauhid rububiyyah (QS. Luqman: 25), namun mereka menolak tauhid uluhiyyah karena menyembah berhala sebagai perantara.'
    },
    {
      id: 'final-q3',
      type: 'pilihan_ganda',
      questionText: 'Apakah bahaya laten dari perbuatan syirik ashghar (syirik kecil) seperti riya dan sum\'ah?',
      options: [
        'Menggugurkan pahala amal kebajikan yang dirasuki oleh riya tersebut',
        'Mengeluarkan pelakunya secara otomatis dari agama Islam selamanya',
        'Membatalkan seluruh pernikahan kaum muslimin',
        'Hanya berdampak pada hilangnya nafsu makan'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Syirik kecil menghapuskan pahala amal yang dicampurinya dan pelakunya diancam dosa besar tanpa keluar dari millah.'
    },
    {
      id: 'final-q4',
      type: 'pilihan_ganda',
      questionText: 'Hadis masyhur "Innamal a\'maalu bin-niyyaat" menegaskan fungsi niat dalam syariat Islam untuk:',
      options: [
        'Membedakan ibadah dari kebiasaan (adat) serta membedakan tujuan penghambaan semata karena Allah atau karena makhluk',
        'Menghalalkan transaksi penipuan jika tujuannya menyumbang masjid',
        'Sebagai formalitas lisan tanpa perlu dihadirkan di hati',
        'Menaikkan popularitas sosial penuntut ilmu'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Niat berfungsi ganda: tamyizul \'ibadat \'anil \'adat dan tamyizul ma\'shud bil \'amal.'
    },
    {
      id: 'final-q5',
      type: 'pilihan_ganda',
      questionText: 'Bagaimanakah sikap seorang mukmin dalam mengimani takdir Allah (Qadha dan Qadar)?',
      options: [
        'Mengimani ilmu, penulisan di Lauhul Mahfuzh, kehendak (masyi\'ah), dan ciptaan Allah atas segala sesuatu, disertai ikhtiar yang diperintahkan syariat',
        'Pasrah total tanpa ikhtiar karena takdir sudah tertulis',
        'Mengingkari bahwa Allah mengetahui masa depan manusia',
        'Menyalahkan takdir Allah saat berbuat maksiat'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Empat maratib qadar: al-\'Ilm, al-Kitabah, al-Masyi\'ah, dan al-Khalq.'
    },
    {
      id: 'final-q6',
      type: 'pilihan_ganda',
      questionText: 'Apakah definisi Ihsan yang diajarkan oleh Rasulullah shallallahu alaihi wasallam dalam Hadis Jibril?',
      options: [
        'Engkau beribadah kepada Allah seakan-akan engkau melihat-Nya; jika engkau tidak melihat-Nya, maka sesungguhnya Dia melihatmu',
        'Engkau bersedekah kepada seluruh fakir miskin di kotamu',
        'Engkau menghafal 30 juz Al-Qur\'an dalam waktu satu bulan',
        'Engkau menunaikan haji setiap tahun'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Muslim: "Anta\'budallaaha ka-annaka taraah, fa-in lam takun taraahu fa-innahu yaraak."'
    },
    {
      id: 'final-q7',
      type: 'pilihan_ganda',
      questionText: 'Apakah hukum menggantungkan jimat, rajah, atau penangkal bala dengan keyakinan bahwa benda fisik itu sendiri yang mendatangkan manfaat atau mudharat?',
      options: [
        'Syirik akbar (syirik besar) yang merusak pokok tauhid',
        'Sunnah yang dianjurkan untuk keselamatan bayi',
        'Mubah bagi orang awam yang tidak paham bahasa Arab',
        'Makruh ringan yang tidak berdosa'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Ahmad: "Man \'allaqa tamimatan faqad asyrak" (Barangsiapa menggantungkan jimat maka ia telah berbuat syirik).'
    },
    {
      id: 'final-q8',
      type: 'pilihan_ganda',
      questionText: 'Apakah rukun iman yang menjadi muara pertanggungjawaban seluruh perbuatan manusia di dunia?',
      options: [
        'Iman kepada Hari Akhir (Hari Pembalasan)',
        'Iman kepada kemajuan peradaban teknologi',
        'Iman kepada ramalan bintang zodiak',
        'Iman kepada kekayaan materi'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Iman kepada hari akhir menumbuhkan muraqabah, kezuhudan terhadap fana, dan kesungguhan menyiapkan bekal hisab.'
    },
    {
      id: 'final-q9',
      type: 'pilihan_ganda',
      questionText: 'Manakah di antara kalimat zikir berikut yang merupakan tanaman surga (*ghirasul jannah*) yang diwasiatkan Nabi Ibrahim kepada Nabi Muhammad saat peristiwa Isra Mi\'raj?',
      options: [
        'Subhanallah wal hamdulillah wa laa ilaaha illallah wallahu akbar',
        'Astaghfirullahal \'azhiim',
        'Hasbiyallahu wa kafa',
        'Yaa Hayyu Yaa Qayyum'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis at-Tirmidzi: Nabi Ibrahim berpesan bahwa tanah surga itu subur dan tanamannya adalah empat kalimat tasbih, tahmid, tahlil, dan takbir.'
    },
    {
      id: 'final-q10',
      type: 'pilihan_ganda',
      questionText: 'Apakah yang dimaksud dengan *Istidraj* dalam peringatan Al-Qur\'an dan Sunnah?',
      options: [
        'Kenikmatan duniawi dan rezeki yang terus dilimpahkan Allah kepada hamba yang gemar bermaksiat, untuk kemudian diazab secara tiba-tiba dalam keadaan lalai',
        'Kemampuan mukjizat yang diberikan kepada para nabi',
        'Ujian sakit yang dialami oleh orang-orang beriman',
        'Kemudahan menghafal ilmu syar\'i'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'QS. Al-An\'am: 44 dan hadis Ahmad: "Jika engkau melihat Allah memberi kenikmatan duniawi pada hamba yang terus bermaksiat, ketahuilah itu adalah istidraj."'
    },

    // --- Bagian 2: Tazkiyatun Nafs & Akhlak Mulia (No. 11-20) ---
    {
      id: 'final-q11',
      type: 'pilihan_ganda',
      questionText: 'Apakah tiga pembagian kondisi nafsu (jiwa) manusia yang dijelaskan dalam Al-Qur\'an?',
      options: [
        'Nafs Ammarah bis-Suu\', Nafs Lawwamah, dan Nafs Muthmainnah',
        'Nafs Faqirah, Nafs Ghaniyyah, dan Nafs Mutakabbirah',
        'Nafs Zahidah, Nafs Raghibah, dan Nafs Khasyiah',
        'Nafs Dunyawiyyah, Nafs Barzakhiyyah, dan Nafs Ukhrawiyyah'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Nafsu pendorong maksiat (QS. Yusuf: 53), nafsu pencela diri (QS. Al-Qiyamah: 2), dan nafsu yang tenteram dalam ridha Allah (QS. Al-Fajr: 27).'
    },
    {
      id: 'final-q12',
      type: 'pilihan_ganda',
      questionText: 'Bagaimanakah penanganan syar\'i saat sifat sombong (*kibr*) terbersit di dalam kalbu seorang penuntut ilmu?',
      options: [
        'Mengingat asal penciptaan manusia dari setetes mani yang hina, akhir hidup menjadi bangkai di liang lahat, dan menyadari bahwa ilmu hanyalah titipan Allah',
        'Menyombongkan diri kembali kepada orang lain',
        'Membeli mobil baru yang lebih mewah',
        'Menghentikan seluruh aktivitas belajar'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Tadabbur kehinaan asal raga dan keluasan ilmu Allah menghancurkan berhala kesombongan diri.'
    },
    {
      id: 'final-q13',
      type: 'pilihan_ganda',
      questionText: 'Apakah tanda utama hati yang sehat (*qalb salim*) yang akan selamat menghadap Allah di hari kiamat (QS. Asy-Syu\'ara: 88-89)?',
      options: [
        'Hati yang selamat dari syirik, keraguan batin, cinta maksiat, bid\'ah, dan kedengkian terhadap sesama muslim',
        'Hati yang tidak pernah berdetak kencang saat olahraga',
        'Hati yang hanya mencintai kenikmatan materi dunia',
        'Hati yang tidak pernah menangis karena rasa takut'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Al-Qalb as-Salim adalah hati yang bersih dari syubhat yang menentang wahyu dan syahwat yang menyelisihi perintah Allah.'
    },
    {
      id: 'final-q14',
      type: 'pilihan_ganda',
      questionText: 'Apakah hakikat sifat *Iffah* (menjaga kehormatan diri) dalam ajaran akhlak Islam?',
      options: [
        'Menahan diri dari hal-hal yang tidak halal dan tidak pantas, baik dalam pandangan, ucapan, syahwat raga, maupun urusan harta',
        'Menolak bantuan orang lain saat tertimpa kelaparan parah',
        'Menyendiri di gua dan tidak pernah bertegur sapa',
        'Hanya berlaku bagi kaum wanita saja'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Al-\'Iffah adalah menahan syahwat kemaluan dan perut dari yang diharamkan Allah serta menjaga wibawa kehormatan mukmin.'
    },
    {
      id: 'final-q15',
      type: 'pilihan_ganda',
      questionText: 'Perkataan bohong atau candaan dusta yang ditujukan untuk membuat orang lain tertawa diancam dalam hadis Rasulullah dengan sabda:',
      options: [
        'Wailun lahu, wailun lahu (Celakalah baginya, celakalah baginya!)',
        'Mendapatkan pahala sedekah tawa',
        'Diperbolehkan jika dilakukan pada hari libur',
        'Hanya makruh bila pendengarnya tersenyum'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Abu Dawud & at-Tirmidzi: "Celakalah bagi orang yang berbicara lalu berdusta agar orang-orang tertawa dengannya; celakalah baginya, celakalah baginya!"'
    },
    {
      id: 'final-q16',
      type: 'pilihan_ganda',
      questionText: 'Apakah obat paling mujarab untuk menyembuhkan sifat kikir dan cinta harta yang berlebihan (*syuhh*)?',
      options: [
        'Melatih diri secara konsisten bersedekah di jalan Allah, terutama pada saat diri merasa khawatir miskin dan mendambakan kekayaan',
        'Menyimpan seluruh uang di brankas tersembunyi',
        'Mengurangi jatah makan anak yatim',
        'Membeli saham spekulatif'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Bukhari & Muslim: Sedekah paling utama adalah saat engkau sehat, merasa kikir, takut miskin, dan mengharap kekayaan.'
    },
    {
      id: 'final-q17',
      type: 'pilihan_ganda',
      questionText: 'Mengapa memaafkan kesalahan orang lain (*al-\'afwu*) memiliki kedudukan derajat yang sangat tinggi di sisi Allah (QS. Ali \'Imran: 134)?',
      options: [
        'Karena memaafkan membutuhkan penundukan ego dan amarah, dan Allah membalas orang yang pemaaf dengan ampunan-Nya yang agung',
        'Karena orang pemaaf tidak perlu membayar zakat',
        'Karena itu adalah tanda kelemahan fisik',
        'Hanya boleh dimaafkan jika pihak lain membayar uang ganti rugi'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Ganjaran bagi pemaaf adalah pahala langsung dari Allah: "Faman \'afaa wa ashlaha fa-ajruhu \'alallah" (QS. Asy-Syura: 40).'
    },
    {
      id: 'final-q18',
      type: 'pilihan_ganda',
      questionText: 'Apakah bahaya dari sifat *an-namimah* (adu domba) menurut sabda Rasulullah shallallahu alaihi wasallam?',
      options: [
        'Pelaku namimah tidak akan masuk surga (diharamkan masuk surga di awal)',
        'Hanya membuat bibir menjadi lelah',
        'Mendatangkan tambahan teman pergaulan',
        'Dimaafkan jika untuk bahan obrolan santai'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis muttafaqun alaih: "Laa yadkhulul jannata battaat / nammaam" (Tidak akan masuk surga tukang adu domba).'
    },
    {
      id: 'final-q19',
      type: 'pilihan_ganda',
      questionText: 'Apakah yang dimaksud dengan *Husnuzhan billah* (berbaik sangka kepada Allah)?',
      options: [
        'Meyakini bahwa rahmat, ampunan, pertolongan, dan hikmah Allah mendahului kemurkaan-Nya, dibuktikan dengan ketaatan beramal',
        'Merasa pasti masuk surga tanpa perlu beribadah dan bertaubat',
        'Menganggap Allah tidak akan menghukum orang yang sengaja bermaksiat',
        'Menghindari berdoa kepada Allah'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hasan al-Bashri berkata: "Orang mukmin berbaik sangka kepada Tuhannya lalu membaguskan amalnya; sedangkan orang fajir berburuk sangka lalu merusak amalnya."'
    },
    {
      id: 'final-q20',
      type: 'pilihan_ganda',
      questionText: 'Apakah tingkatan kezuhudan yang paling utama menurut Syaikhul Islam Ibnu Taimiyyah?',
      options: [
        'Meninggalkan apa yang tidak bermanfaat bagi akhirat, dan wara\' adalah meninggalkan apa yang dikhawatirkan membahayakan akhirat',
        'Memakai baju sobek-sobek di hadapan masyarakat',
        'Menolak makan daging halal',
        'Menelantarkan keluarga tanpa nafkah'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Definisi masyhur Ibnu Taimiyyah: Az-Zuhd tarku maa laa yanfa\'u fil aakhirah, wal wara\' tarku maa yukhaafu dhararuhu fil aakhirah.'
    },

    // --- Bagian 3: Fikih Ibadah & Sunnah Amaliyah (No. 21-30) ---
    {
      id: 'final-q21',
      type: 'pilihan_ganda',
      questionText: 'Apakah rukun shalat yang bila ditinggalkan secara sengaja maupun lupa menyebabkan shalat tersebut batal jika tidak diganti?',
      options: [
        'Thuma\'ninah dalam ruku\', i\'tidal, sujud, dan duduk di antara dua sujud',
        'Membaca doa qunut di waktu Subuh',
        'Memakai wewangian non-alkohol',
        'Mengangkat tangan saat bangkit dari ruku\''
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Thuma\'ninah adalah rukun fardhu shalat; hadis al-musi\'u shalatah membuktikan shalat tanpa thuma\'ninah tidak sah.'
    },
    {
      id: 'final-q22',
      type: 'pilihan_ganda',
      questionText: 'Apakah amalan sunnah rawatib muakkadah yang mengiringi shalat fardhu Zhuhur?',
      options: [
        'Empat rakaat sebelum Zhuhur dan dua rakaat sesudahnya',
        'Dua rakaat sebelum Zhuhur saja tanpa ada sesudahnya',
        'Delapan rakaat berturut-turut setelah Zhuhur',
        'Tidak ada sunnah rawatib pada shalat Zhuhur'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Ibnu Umar dan Ummu Habibah: 4 rakaat sebelum Zhuhur (2 salam) dan 2 rakaat sesudahnya.'
    },
    {
      id: 'final-q23',
      type: 'pilihan_ganda',
      questionText: 'Kapan batas akhir pelaksanaan shalat Isya menurut pendapat yang paling rajih (kuat) berdasarkan dalil hadis Abdullah bin Amr radhiyallahu anhu?',
      options: [
        'Tepat pada pertengahan malam (*nishful lail*)',
        'Hingga terbit fajar shadiq (azan Subuh)',
        'Hanya sampai pukul 21.00 malam',
        'Sampai matahari terbit keesokan harinya'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Muslim no. 612: "Wa waqtu shalaatil \'isyaa-i ilaa nishfil lailil awsat."'
    },
    {
      id: 'final-q24',
      type: 'pilihan_ganda',
      questionText: 'Bagaimanakah ketentuan sujud sahwi jika seseorang ragu-ragu dalam jumlah rakaat shalatnya (apakah baru tiga rakaat atau empat rakaat)?',
      options: [
        'Membuang keraguan dan mengambil jumlah yang paling yakin (yaitu tiga rakaat), menyelesaikan shalat, lalu sujud sahwi dua kali',
        'Membatalkan shalat seketika dan mengulang dari takbiratul ihram',
        'Memilih rakaat yang terbanyak (empat rakaat) tanpa sujud sahwi',
        'Bertanya kepada makmum di sebelah sambil berbicara'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Abu Sa\'id al-Khudri dalam Shahih Muslim: Buang keraguan dan bangun di atas keyakinan (bilangan minimal), lalu sujud sahwi sebelum salam.'
    },
    {
      id: 'final-q25',
      type: 'pilihan_ganda',
      questionText: 'Berapakah nisab zakat mal emas yang mewajibkan pembayaran zakat 2,5% setelah genap haul satu tahun Hijriyah?',
      options: [
        '85 gram emas murni',
        '50 gram emas',
        '100 gram emas',
        '20 gram emas'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Nisab zakat emas adalah 20 dinar, setara dengan 85 gram emas murni.'
    },
    {
      id: 'final-q26',
      type: 'pilihan_ganda',
      questionText: 'Apakah waktu yang paling afdhal (utama) untuk mengeluarkan zakat fitrah sebelum datang hari raya Idul Fitri?',
      options: [
        'Setelah shalat Subuh pada pagi hari raya Idul Fitri sebelum shalat Id didirikan',
        'Pada pertengahan bulan Sya\'ban',
        'Setelah selesai khutbah shalat Idul Fitri',
        'Boleh dikeluarkan di hari tasyrik'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Bukhari & Muslim dari Ibnu Umar: Rasulullah memerintahkan zakat fitrah ditunaikan sebelum manusia keluar menuju shalat Id.'
    },
    {
      id: 'final-q27',
      type: 'pilihan_ganda',
      questionText: 'Apakah amalan yang paling dicintai Allah pada hari Nahr (10 Dzulhijjah) bagi umat Islam yang memiliki kelapangan rezeki?',
      options: [
        'Menyembelih hewan qurban (*udhiyyah*)',
        'Membeli pakaian mahal',
        'Tidur seharian',
        'Makan roti gandum'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis at-Tirmidzi & Ibnu Majah mengenai keutamaan menumpahkan darah hewan qurban pada hari Idul Adha.'
    },
    {
      id: 'final-q28',
      type: 'pilihan_ganda',
      questionText: 'Apakah hukum membaca Surat Al-Kahfi pada hari Jumat atau malam Jumat sesuai sunnah Rasulullah shallallahu alaihi wasallam?',
      options: [
        'Sunnah muakkadah yang memancarkan cahaya (*nur*) bagi pembacanya di antara dua Jumat',
        'Makruh jika dibaca di siang hari',
        'Wajib yang membatalkan shalat Jumat jika tertinggal',
        'Tidak memiliki dalil sama sekali'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis shahih riwayat al-Hakim dan al-Baihaqi: Siapa membaca surat Al-Kahfi di hari Jumat disinari cahaya di antara dua Jumat.'
    },
    {
      id: 'final-q29',
      type: 'pilihan_ganda',
      questionText: 'Manakah posisi berdoa yang paling dekat antara seorang hamba dengan Tuhannya sebagaimana ditegaskan Rasulullah shallallahu alaihi wasallam?',
      options: [
        'Tatkala hamba sedang dalam keadaan sujud di hadapan Allah',
        'Saat sedang berdiri membaca surat panjang',
        'Tatkala sedang duduk tasyahhud awal',
        'Saat mengusap wajah setelah shalat'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Muslim no. 482: "Aqrabu maa yakuunul \'abdu min Rabbihi wa huwa saajid, fa aktsirud-du\'aa\'."'
    },
    {
      id: 'final-q30',
      type: 'pilihan_ganda',
      questionText: 'Apakah sunnah adab ketika bangun tidur di pagi hari sebelum mencelupkan tangan ke dalam bejana air wudhu?',
      options: [
        'Mencuci kedua tangan sebanyak tiga kali terlebih dahulu di luar bejana karena tidak mengetahui di mana tangannya bermalam',
        'Langsung minum air dingin sebanyak satu liter',
        'Mencuci muka dengan air panas',
        'Menyisir rambut sebelum membaca doa'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Bukhari & Muslim: "Idzastaiqazha ahadukum min naumihi falaa yaghmas yadahu fil inaa\' hattaa yaghsilahaa tsalaatsaa..."'
    },

    // --- Bagian 4: Fikih Muamalah, Harta Halal & Hak Sesama (No. 31-40) ---
    {
      id: 'final-q31',
      type: 'pilihan_ganda',
      questionText: 'Apakah yang dimaksud dengan konsep *Halalan Thayyiban* dalam konsumsi makanan dan pendapatan rezeki (QS. Al-Baqarah: 168)?',
      options: [
        'Halal zat dan cara perolehannya menurut syariat, serta thayyib (baik, bergizi, higienis, dan tidak membahayakan raga)',
        'Asal harganya mahal dan bermerek terkenal',
        'Makanan yang disukai oleh mayoritas masyarakat modern',
        'Halal cara mendapatkannya meskipun zat asalnya bangkai babi'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Halal syar\'i (li-dzaatihi & li-kasbihi) dan thayyib (kualitas fisik yang baik dan sehat bagi tubuh).'
    },
    {
      id: 'final-q32',
      type: 'pilihan_ganda',
      questionText: 'Manakah di antara skema transaksi berikut yang secara tegas diharamkan karena mengandung riba jahiliyah?',
      options: [
        'Pinjaman uang Rp 10.000.000 dengan syarat wajib dikembalikan menjadi Rp 11.500.000 pada bulan depan',
        'Jual beli motor tunai dengan harga kesepakatan bersama',
        'Kerja sama mudharabah dengan pembagian nisbah keuntungan 60:40',
        'Menyewa ruko selama 1 tahun dengan akad ijarah yang jelas'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Riba al-qardh / riba jahiliyah: penambahan nilai pokok atas utang piutang yang disyaratkan di awal.'
    },
    {
      id: 'final-q33',
      type: 'pilihan_ganda',
      questionText: 'Mengapa praktik penipuan timbangan, takaran, dan meteran (*tathfif*) sangat dicela dalam Al-Qur\'an (Surat Al-Muthaffifin)?',
      options: [
        'Karena mencuri hak harta orang lain secara sembunyi-sembunyi dan mengancam pelakunya dengan neraka Wail di hari kiamat',
        'Hanya dilarang bila barang dagangannya adalah emas perhiasan',
        'Boleh dilakukan asalkan pembeli tidak meneliti timbangan',
        'Hanya makruh bila pedagangnya bersedekah di hari Jumat'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'QS. Al-Muthaffifin: 1-6 mengancam para pemangkas takaran dan timbangan yang melupakan hari hisab agung.'
    },
    {
      id: 'final-q34',
      type: 'pilihan_ganda',
      questionText: 'Apakah konsekuensi menunda-nunda pembayaran utang padahal orang tersebut memiliki kemampuan materi untuk melunasinya (*mathlul ghaniyyi*)?',
      options: [
        'Termasuk kezaliman (*zhulmun*) yang menghalalkan kehormatan dan sanksi hukuman atasnya',
        'Merupakan kecerdikan manajemen kas yang terpuji',
        'Dimaafkan oleh syariat tanpa teguran',
        'Menggugurkan kewajiban pokok utang'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Bukhari & Muslim: "Mathlul ghaniyyi zhulmun" (Menunda pembayaran utang bagi orang mampu adalah sebuah kezaliman).'
    },
    {
      id: 'final-q35',
      type: 'pilihan_ganda',
      questionText: 'Apakah hukum memakan atau menguasai harta anak yatim secara zalim menurut firman Allah dalam QS. An-Nisa: 10?',
      options: [
        'Sebenarnya mereka menelan api ke dalam perutnya dan mereka akan masuk ke dalam api neraka yang menyala-nyala (*Sa\'iir*)',
        'Diperbolehkan asalkan anak yatim tersebut tinggal serumah',
        'Hanya dihukumi dosa kecil biasa',
        'Boleh jika digunakan untuk modal investasi pribadi pengasuh'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Firman Allah Ta\'ala: "Innamallaadziina ya\'kuluuna amwaalal yataamaa zhulman innamaa ya\'kuluuna fii buthuunihim naaraa."'
    },
    {
      id: 'final-q36',
      type: 'pilihan_ganda',
      questionText: 'Apakah adab syar\'i dalam bertransaksi utang piutang menurut ayat terpanjang dalam Al-Qur\'an (QS. Al-Baqarah: 282)?',
      options: [
        'Mencatatnya secara tertulis, menetapkan batas waktu pelunasan yang jelas, dan menghadirkan saksi yang adil',
        'Cukup mengingatnya dalam ingatan lisan tanpa bukti catatan',
        'Meminta jaminan bunga bulanan secara berlipat ganda',
        'Menyembunyikan transaksi dari pihak keluarga'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Ayat mudayanah (QS. Al-Baqarah: 282) memerintahkan penulisan (kitabah), ketetapan ajal (waktu), dan saksi (isyhad).'
    },
    {
      id: 'final-q37',
      type: 'pilihan_ganda',
      questionText: 'Bagaimanakah hukum seorang pegawai atau pejabat menggunakan fasilitas dinas kantor untuk kepentingan bisnis pribadi keluarganya?',
      options: [
        'Khianat terhadap amanah dan bentuk korupsi terselubung (*ghulul*) yang wajib dipertanggungjawabkan di hadapan Allah',
        'Boleh dinikmati karena sudah menjadi hak fasilitas pekerjaan',
        'Mubah jika dilakukan di luar jam kerja resmi',
        'Sunnah untuk menghemat pengeluaran rumah tangga'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Penggunaan fasilitas umum untuk kepentingan pribadi tanpa izin adalah pelanggaran amanah (ghulul).'
    },
    {
      id: 'final-q38',
      type: 'pilihan_ganda',
      questionText: 'Apakah sikap mulia seorang mukmin terhadap saudaranya yang berutang kepadanya tatkala saudaranya tersebut benar-benar jatuh miskin dan kesulitan melunasi?',
      options: [
        'Memberi tangguh waktu pembayaran hingga ia lapang, atau menyedekahkan sebagian/seluruh utang tersebut kepadanya (QS. Al-Baqarah: 280)',
        'Menyita seluruh perabot rumah tangganya dan mengusir keluarganya ke jalanan',
        'Melipatgandakan bunga denda setiap hari keterlambatan',
        'Menghina dan mempermalukannya di media sosial'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'QS. Al-Baqarah: 280: "Wa in kaana dzuu \'usratin fa nazhiratun ilaa maisarah, wa an tashaddaquu khairul lakum in kuntum ta\'lamuun."'
    },
    {
      id: 'final-q39',
      type: 'pilihan_ganda',
      questionText: 'Apakah bahaya dari transaksi perjudian (*maysir*) yang ditegaskan dalam QS. Al-Ma\'idah: 90?',
      options: [
        'Merupakan perbuatan keji dari amalan setan yang menimbulkan permusuhan, kebencian, dan memalingkan manusia dari mengingat Allah dan shalat',
        'Hanya permainan hiburan pengisi waktu senggang tanpa mudharat',
        'Dihalalkan jika sebagian keuntungannya disumbangkan ke yayasan sosial',
        'Hanya makruh bagi anak-anak muda'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Al-Khamr wal maysir adalah rijsun min \'amalisy syaithan yang merusak tatanan kalbu dan sosial masyarakat.'
    },
    {
      id: 'final-q40',
      type: 'pilihan_ganda',
      questionText: 'Hadis tentang "Tujuh Golongan yang dinaungi Allah di Padang Mahsyar" menyebutkan salah satunya adalah seorang pemuda yang:',
      options: [
        'Tumbuh dewasa dalam beribadah kepada Allah Ta\'ala',
        'Memiliki jumlah pengikut media sosial terbanyak',
        'Menghabiskan masa mudanya untuk berfoya-foya',
        'Paling mahir memenangkan perlombaan game'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Bukhari & Muslim: "Syaabbun nasya-a fii \'ibaadatillaahi Ta\'ala" (Pemuda yang tumbuh dalam ketaatan beribadah kepada Allah).'
    },

    // --- Bagian 5: Husnul Khatimah, Alam Barzakh & Bekal Akhirat (No. 41-50) ---
    {
      id: 'final-q41',
      type: 'pilihan_ganda',
      questionText: 'Apakah amalan yang pahalanya TIDAK AKAN TERPUTUS meskipun jasad manusia telah membusuk di liang lahat menurut hadis shahih riwayat Imam Muslim?',
      options: [
        'Sedekah jariyah, ilmu yang bermanfaat, dan anak shaleh yang mendoakannya',
        'Piala kejuaraan dunia, medali emas, dan nama gedung bertingkat',
        'Gelar bangsawan, sertifikat tanah, dan buku harian pribadi',
        'Koleksi busana mewah, mobil antik, dan foto keluarga'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Muslim no. 1631: "Idzaa maatal insaanu inqatha\'a \'amaluhu illaa min tsalaats: shadaqatin jaariyah, aw \'ilmin yuntafa\'u bih, aw waladin shaalihin yad\'uu lah."'
    },
    {
      id: 'final-q42',
      type: 'pilihan_ganda',
      questionText: 'Bagaimanakah urutan perjalanan ruh seorang mukmin yang saleh saat dicabut nyawanya oleh Malaikat Maut sebagaimana dijelaskan dalam hadis panjang al-Bara\' bin \'Azib radhiyallahu anhu?',
      options: [
        'Ruhnya keluar dengan lembut bagaikan tetesan air dari mulut bejana, disambut oleh para malaikat berwajah putih berseri dengan kain kafan surga beraroma kesturi harum, lalu dibawa naik melintasi langit hingga ke hadapan Allah',
        'Ruhnya dicabut bagai mencabut besi berduri dari wol basah yang merobek urat',
        'Ruhnya langsung menghilang lenyap tanpa pengawalan malaikat',
        'Ruhnya berubah menjadi hantu gentayangan yang mendatangi rumah kerabat'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis shahih riwayat Ahmad dan Abu Dawud dari al-Bara\' bin \'Azib merinci prosesi pencabutan ruh mukmin dan kafir.'
    },
    {
      id: 'final-q43',
      type: 'pilihan_ganda',
      questionText: 'Apakah tiga pertanyaan mendasar yang akan diajukan oleh dua malaikat (Munkar dan Nakir) kepada setiap mayit di alam kubur?',
      options: [
        'Man Rabbuka (Siapa Tuhanmu)? Maa Diinuka (Apa agamamu)? Man Nabiyyuka (Siapa nabimu)?',
        'Berapa tabungan bankmu? Apa merek kendaraanmu? Di mana posisi kantormu?',
        'Apa gelar sarjanamu? Siapa nama atasanmu? Apa nama partaimu?',
        'Berapa luas tanah rumahmu? Berapa sertifikat rumahmu? Apa bisnismu?'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Fitnah kubur menguji tiga pokok landasan ushuluts tsalatsah: Ma\'rifatur Rabb, Ma\'rifatud Din, dan Ma\'rifatun Nabi.'
    },
    {
      id: 'final-q44',
      type: 'pilihan_ganda',
      questionText: 'Bentuk teman setia yang akan mendatangi seorang mukmin di alam kuburnya dalam rupa seorang yang berwajah sangat tampan, berpakaian indah, dan beraroma harum semerbak adalah perwujudan dari:',
      options: [
        'Amal salehnya semasa hidup di dunia (shalat, sedekah, puasa, dan ketulusannya)',
        'Uang warisan yang ia kumpulkan semasa dinas',
        'Sahabat karibnya yang masih hidup',
        'Malaikat pencatat amal buruk'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis al-Bara\': Sosok itu berkata: "Aku adalah amal salehmu! Demi Allah dahulu engkau bersegera dalam ketaatan dan lambat dalam maksiat."'
    },
    {
      id: 'final-q45',
      type: 'pilihan_ganda',
      questionText: 'Apakah yang dimaksud dengan *Fitnah Kubur* (*Fitnatul Qabr*) dalam akidah Islam?',
      options: [
        'Ujian pertanyaan dua malaikat Munkar dan Nakir di dalam kubur mengenai keimanan hamba',
        'Banjir air yang merendam pemakaman umum',
        'Pencurian kain kafan oleh orang jahat',
        'Kerusakan batu nisan akibat gempa bumi'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Fitnah kubur adalah ujian pertanyaan Munkar dan Nakir; doa perlindungan darinya sunnah dibaca sebelum salam di setiap shalat fardhu.'
    },
    {
      id: 'final-q46',
      type: 'pilihan_ganda',
      questionText: 'Apakah dua amalan yang Rasulullah shallallahu alaihi wasallam sebutkan menjadi penyebab disiksanya penghuni dua kuburan yang beliau lewati?',
      options: [
        'Tidak menjaga kebersihan dari percikan air kencing dan gemar mengadu domba sesama manusia (*namimah*)',
        'Lupa membawa senter saat ziarah kubur',
        'Tidak menyiram bunga mawar di atas makam',
        'Tidak membangun kubah emas di atas pemakaman'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Bukhari & Muslim: "Amma ahaduhuma fakaana laa yastatiru min baulih, wa ammal aakharu fakaana yamsyii bin-namiimah."'
    },
    {
      id: 'final-q47',
      type: 'pilihan_ganda',
      questionText: 'Kapan peristiwa peniupan sangkakala pertama (*Nafkhatush Sha\'aq*) dan sangkakala kedua (*Nafkhatul Ba\'ts*) oleh Malaikat Israfil terjadi?',
      options: [
        'Tiupan pertama mematikan seluruh makhluk di langit dan di bumi, dan tiupan kedua membangkitkan seluruh manusia dari kubur menuju padang Mahsyar',
        'Tiupan pertama untuk menyalakan matahari, tiupan kedua untuk mematikan rembulan',
        'Hanya terjadi di alam mimpi para nabi',
        'Tiupan pertama hanya mematikan hewan ternak'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'QS. Az-Zumar: 68: "Wa nufikha fish-shuuri fasha\'iqa man fis-samaawaati wa man fil ardhi illaa man syaa-allaah, tsumma nufikha fiihi ukhraa fa-idzaa hum qiyaamuy yanzhuruun."'
    },
    {
      id: 'final-q48',
      type: 'pilihan_ganda',
      questionText: 'Bagaimanakah kondisi jembatan *Ash-Shirath* yang dibentangkan di atas punggung neraka Jahannam menuju surga menurut hadis shahih?',
      options: [
        'Jembatan yang lebih tipis dari sehelai rambut, lebih tajam dari sebilah pedang, licin menggelincirkan, dan dilengkapi besi pengait tajam (*kalaaliib*)',
        'Jembatan jalan tol beraspal mulus dengan penerangan lampu neon',
        'Jembatan kayu yang lebar dan tidak berbahaya sama sekali',
        'Jembatan yang hanya dilewati oleh orang-orang kafir'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'Hadis Bukhari & Muslim tentang sifat shirath: mudhadhadhatun mazilla, ada besi pengait yang menyambar manusia sesuai kadar amal mereka.'
    },
    {
      id: 'final-q49',
      type: 'pilihan_ganda',
      questionText: 'Siapakah orang yang akan menerima kitab catatan amal perbuatannya di Padang Mahsyar dengan tangan kanannya (*bi-yamiinih*)?',
      options: [
        'Orang yang beriman dan bertakwa, yang dihisab dengan hisab yang mudah (*hisaabay yasiiraa*) dan kembali kepada keluarganya di surga dengan riang gembira',
        'Orang yang mengabaikan perintah shalat fardhu semasa hidupnya',
        'Orang yang suka memakan harta riba',
        'Orang yang beramal semata-mata demi mencari pujian manusia'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'QS. Al-Insyiqaq: 7-9: "Fa ammaa man uutiya kitaabahu bi-yamiinihi fasaula yuhaasabu hisaabay yasiiraa wa yanqalibu ilaa ahlihii masruuraa."'
    },
    {
      id: 'final-q50',
      type: 'pilihan_ganda',
      questionText: 'Apakah kenikmatan tertinggi, paling agung, dan melebihi segala kenikmatan bidadari dan istana surga bagi para penghuni surga kelak?',
      options: [
        'Melihat Wajah Allah Yang Maha Mulia secara langsung tanpa penghalang (*an-nazharu ilaa Wajhillaahil Kariim*)',
        'Meminum air susu dan madu yang tidak pernah habis',
        'Mengenakan perhiasan gelang emas dan sutra hijau',
        'Memiliki seratus istana mutiara bertingkat'
      ],
      correctAnswer: 0,
      points: 2,
      explanation: 'QS. Yunus: 26 dan Hadis Muslim: "Lilladziina ahsanul husnaa wa ziyaadah" - Ziyadah adalah kenikmatan memandang Wajah Allah Yang Maha Mulia di Jannatun Na\'im.'
    }
  ]
};
