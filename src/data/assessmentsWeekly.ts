import { Assessment } from '../types';

export const WEEKLY_ASSESSMENTS: Assessment[] = [
  // ==================== PEKAN 1 (HARI 7) ====================
  {
    id: 'eval-week-1',
    title: 'Evaluasi Pekan 1: Fondasi Niat, Tauhid, dan Adab Muslim',
    assessmentType: 'mingguan',
    dayNumber: 7,
    weekNumber: 1,
    monthNumber: 1,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w1-q1',
        type: 'pilihan_ganda',
        questionText: 'Berdasarkan hadis Umar bin al-Khattab radhiyallahu anhu (Innamal a\'maalu bin-niyyaat), kapan suatu amal ibadah dinilai sah dan berpahala di sisi Allah?',
        options: [
          'Jika disaksikan oleh banyak orang saleh',
          'Jika didasari niat ikhlas semata mengharap ridha Allah dan sesuai tuntunan sunnah',
          'Jika disertai pengorbanan harta dalam jumlah sangat besar',
          'Jika diiringi doa berbahasa Arab yang fasih'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Dua syarat diterimanya amal adalah ikhlas karena Allah (tauhid/niat) dan mutaba\'ah (mengikuti tuntunan Rasulullah shallallahu alaihi wasallam).'
      },
      {
        id: 'w1-q2',
        type: 'pilihan_ganda',
        questionText: 'Apa bahaya utama dari penyakit batin berupa syirik kecil (riya) terhadap amal kebaikan yang telah dikerjakan?',
        options: [
          'Menghapuskan pahala amal yang dicampuri riya tersebut dan mendatangkan dosa',
          'Mengurangi umur pelakunya di dunia secara drastis',
          'Membuat harta kekayaan menjadi cepat habis',
          'Tidak berdampak apa-apa jika amalannya diiringi sedekah'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Allah Ta\'ala berfirman dalam hadis qudsi bahwa Dia adalah Dzat yang paling tidak membutuhkan sekutu. Siapa beramal mencampurkan sekutu selain Allah, Allah tinggalkan dia dan amalnya.'
      },
      {
        id: 'w1-q3',
        type: 'pilihan_ganda',
        questionText: 'Dalam menjaga lisan, apakah batasan yang diajarkan oleh Rasulullah shallallahu alaihi wasallam bagi orang yang beriman kepada Allah dan hari akhir?',
        options: [
          'Berbicara banyak hal agar suasana pergaulan menjadi meriah',
          'Berkata yang baik atau lebih baik diam',
          'Hanya berbicara ketika dimintai fatwa agama',
          'Selalu mengomentari kekurangan orang lain demi kebaikan'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata yang baik atau diam."'
      },
      {
        id: 'w1-q4',
        type: 'pilihan_ganda',
        questionText: 'Salah satu tanda utama ketenangan batin (*thuma\'ninah*) seorang hamba yang bertauhid murni adalah:',
        options: [
          'Hatinya selalu gelisah memikirkan penilaian manusia',
          'Menggantungkan segala urusan hanya kepada Allah dan merasa tenteram dengan takdir-Nya',
          'Menolak segala bentuk usaha dan ikhtiar duniawi',
          'Selalu merasa lebih mulia daripada orang lain di sekitarnya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Firman Allah: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram" (QS. Ar-Ra\'d: 28).'
      },
      {
        id: 'w1-q5',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah sikap seorang mukmin yang benar ketika terbersit bisikan rasa riya di dalam hatinya saat sedang shalat?',
        options: [
          'Segera membatalkan shalatnya dan tidak melanjutkannya lagi',
          'Melanjutkan shalat sambil terus memupuk pujian manusia',
          'Melawan bisikan tersebut, memohon perlindungan kepada Allah, dan terus menyempurnakan shalat semata karena Allah',
          'Menunda shalat hingga tidak ada orang lain di dekatnya'
        ],
        correctAnswer: 2,
        points: 10,
        explanation: 'Ulama menegaskan: Jangan membatalkan amal karena takut riya, tetapi lawanlah riya itu dan perbaharui niat ikhlas.'
      },
      {
        id: 'w1-q6',
        type: 'pilihan_ganda',
        questionText: 'Apa yang dimaksud dengan konsep Tazkiyatun Nafs dalam Al-Qur\'an (QS. Asy-Syams: 9-10)?',
        options: [
          'Mengasingkan diri selamanya dari kehidupan bermasyarakat',
          'Membersihkan jiwa dari syirik, maksiat, dan akhlak tercela serta menghiasinya dengan ketaatan',
          'Melakukan puasa tanpa pernah berbuka selama berbulan-bulan',
          'Menyucikan raga dengan mandi air kembang'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Tazkiyatun nafs adalah penyucian jiwa dari kotoran syirik dan dosa serta menyuburkannya dengan tauhid dan ketaatan.'
      },
      {
        id: 'w1-q7',
        type: 'pilihan_ganda',
        questionText: 'Dalam menyempurnakan wudhu, Rasulullah shallallahu alaihi wasallam menjanjikan bahwa orang yang berwudhu dengan sempurna:',
        options: [
          'Akan keluar dosa-dosanya dari jasadnya hingga keluar dari bawah kuku-kukunya',
          'Tidak akan pernah mengalami sakit fisik seumur hidupnya',
          'Diberikan kekayaan harta tanpa perlu berniaga',
          'Dilepaskan dari seluruh kewajiban syariat berikutnya'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis riwayat Imam Muslim dari Utsman bin Affan radhiyallahu anhu tentang fadhilah isbaghul wudhu.'
      },
      {
        id: 'w1-q8',
        type: 'pilihan_ganda',
        questionText: 'Kejujuran (*ash-shidq*) menurut hadis Abdullah bin Mas\'ud radhiyallahu anhu akan membimbing pelakunya menuju:',
        options: [
          'Ketenaran di kalangan bangsawan',
          'Kebaikan (*al-birr*), dan kebaikan akan membimbing menuju surga',
          'Kekuasaan politik duniawi',
          'Kekayaan berlimpah dalam sekejap'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Innash-shidqa yahdii ilal birri, wa innal birra yahdii ilal jannah."'
      },
      {
        id: 'w1-q9',
        type: 'pilihan_ganda',
        questionText: 'Tujuan tertinggi dari seluruh ibadah dan aktivitas seorang hamba di dunia ini sebagaimana firman Allah dalam QS. Adz-Dzariyat: 56 adalah:',
        options: [
          'Mencapai kesuksesan finansial tertinggi di hadapan manusia',
          'Beribadah dan menghambakan diri semata-mata kepada Allah',
          'Menghimpun gelar kehormatan sebanyak mungkin',
          'Mencari ketenangan hidup tanpa memikirkan akhirat'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: '"Dan tidaklah Aku ciptakan jin dan manusia melainkan agar mereka beribadah kepada-Ku."'
      },
      {
        id: 'w1-q10',
        type: 'pilihan_ganda',
        questionText: 'Apa doa yang diajarkan Rasulullah shallallahu alaihi wasallam untuk memohon perlindungan dari syirik yang kita sadari maupun tidak disadari?',
        options: [
          'Allahumma inna na\'uudzu bika min an nusyrika bika syai-an na\'lamuh, wa nastaghfiruka limaa laa na\'lamuh',
          'Rabbana aatina fid-dunya hasanah wa fil aakhirati hasanah',
          'Allahumma inni as-aluka \'ilman naafi\'aa',
          'Hasbunallahu wa ni\'mal wakiil'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Doa perlindungan dari syirik besar dan kecil yang diajarkan Rasulullah kepada Abu Bakar ash-Shiddiq radhiyallahu anhu.'
      }
    ]
  },

  // ==================== PEKAN 2 (HARI 14) ====================
  {
    id: 'eval-week-2',
    title: 'Evaluasi Pekan 2: Kekhusyukan Shalat, Zikir, dan Menjaga Indera',
    assessmentType: 'mingguan',
    dayNumber: 14,
    weekNumber: 2,
    monthNumber: 1,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w2-q1',
        type: 'pilihan_ganda',
        questionText: 'Apakah rukun bathiniyyah yang menjadi ruh dan hakikat dari ibadah shalat?',
        options: [
          'Membaca surat yang paling panjang dengan suara lantang',
          'Khusyuk dan hadirnya kalbu serta perenungan terhadap bacaan shalat',
          'Memakai pakaian serba putih buatan luar negeri',
          'Mempercepat gerakan shalat agar segera menuntaskan pekerjaan lain'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Khusyuk adalah ruh shalat; shalat tanpa kekhusyukan laksana jasad tanpa nyawa.'
      },
      {
        id: 'w2-q2',
        type: 'pilihan_ganda',
        questionText: 'Waktu yang disyariatkan untuk membaca rangkaian zikir pagi dan petang menurut pendapat mayoritas ulama adalah:',
        options: [
          'Hanya di tengah malam buta sebelum tidur',
          'Setelah Subuh hingga terbit matahari (pagi) dan setelah Ashar hingga terbenam matahari (petang)',
          'Hanya ketika menghadapi musibah besar saja',
          'Tepat saat matahari tepat berada di tengah langit (tengah hari)'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Waktu utama zikir pagi adalah ba\'da Subuh hingga syuruq, dan zikir petang ba\'da Ashar hingga Maghrib.'
      },
      {
        id: 'w2-q3',
        type: 'pilihan_ganda',
        questionText: 'Apa hikmah syar\'i diperintahkannya seorang mukmin untuk menundukkan pandangan (*ghaddhul bashar*) dalam QS. An-Nur: 30?',
        options: [
          'Agar tidak melihat kemajuan teknologi dunia',
          'Menjaga kesucian kalbu dari panah-panah beracun iblis yang merusak iman',
          'Memperlemah indera penglihatan secara sengaja',
          'Agar dianggap sebagai orang yang pemalu oleh tetangga'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Pandangan mata adalah pintu masuk terbesar ke dalam kalbu; menundukkannya adalah benteng kesucian jiwa.'
      },
      {
        id: 'w2-q4',
        type: 'pilihan_ganda',
        questionText: 'Dalam tata cara shalat, apa makna rukun *thuma\'ninah* yang wajib dipenuhi dalam setiap ruku\' dan sujud?',
        options: [
          'Membaca doa sujud sebanyak minimal seratus kali',
          'Ketenangan anggota badan sesaat sekadar seukuran membaca satu kali tasbih',
          'Menggerakkan jari jemari secara terus-menerus',
          'Mempercepat bangkit dari ruku\' untuk efisiensi waktu'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Thuma\'ninah adalah rukun shalat; orang yang shalat tanpa thuma\'ninah dihukumi belum shalat oleh Rasulullah shallallahu alaihi wasallam.'
      },
      {
        id: 'w2-q5',
        type: 'pilihan_ganda',
        questionText: 'Bacaan Sayyidul Istighfar mengandung pengakuan mendasar seorang hamba, yaitu:',
        options: [
          'Pengakuan nikmat Allah yang melimpah dan pengakuan atas dosa diri serta memohon ampunan',
          'Tuntutan agar Allah segera membalas musuh-musuh duniawi',
          'Klaim bahwa dirinya telah bebas dari segala bentuk kesalahan',
          'Permintaan agar diwafatkan tanpa melalui proses hisab sama sekali'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Sayyidul Istighfar memuat tauhid rububiyyah, uluhiyyah, ikrar nikmat (*abu-u laka bi ni\'matik*), dan ikrar dosa (*abu-u bi dzanbi*).'
      },
      {
        id: 'w2-q6',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah adab seorang Muslim saat mendengarkan azan dikumandangkan?',
        options: [
          'Terus mengobrol santai hingga azan selesai',
          'Menirukan lafal yang diucapkan muadzin kemudian bershalawat dan membaca doa wasilah',
          'Menutup telinga agar konsentrasi kerja tidak terganggu',
          'Langsung mendirikan shalat tanpa menunggu muadzin menyelesaikan azannya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Sunnah muakkadah menjawab azan, bershalawat kepada Nabi shallallahu alaihi wasallam, dan memohon al-washilah wal-fadhilah.'
      },
      {
        id: 'w2-q7',
        type: 'pilihan_ganda',
        questionText: 'Apakah keutamaan shalat sunnah Rawatib 12 rakaat sehari semalam sebagaimana disebutkan dalam hadis Ummu Habibah radhiyallahu anha?',
        options: [
          'Diberikan kekayaan seribu dirham setiap hari',
          'Allah bangunkan baginya sebuah rumah (istana) di dalam surga',
          'Terhindar dari rasa lapar selama hidup di dunia',
          'Menjadi pemimpin bagi kaumnya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Shahih Muslim no. 728: "Siapa shalat 12 rakaat sehari semalam (rawatib), dibangunkan untuknya rumah di surga."'
      },
      {
        id: 'w2-q8',
        type: 'pilihan_ganda',
        questionText: 'Menjaga pendengaran dari ghibah (menggunjing) hukumnya dalam syariat Islam adalah:',
        options: [
          'Boleh mendengarkan asalkan tidak ikut berbicara',
          'Wajib mengingkari atau meninggalkan majelis ghibah tersebut',
          'Sunnah yang tidak memiliki konsekuensi dosa',
          'Dianjurkan demi mengetahui aib sesama untuk berhati-hati'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Mendengarkan ghibah dengan ridha bersekutu dalam dosanya; wajib mengingkari atau beranjak pergi.'
      },
      {
        id: 'w2-q9',
        type: 'pilihan_ganda',
        questionText: 'Apakah amalan zikir yang ringan di lisan namun berat di timbangan amal (*mizan*) dan dicintai ar-Rahman?',
        options: [
          'Subhanallahi wa bihamdih, Subhanallahil \'azhiim',
          'Laa hawla wa laa quwwata illa billah seribu kali',
          'Hasbunallah wa ni\'mal wakiil',
          'Astaghfirullahal \'azhiim'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis penutup Shahih al-Bukhari: "Kalimataani habiibataani ilar-Rahmaan, khafiifataani \'alal lisaan, tsaqiilataani fil miizaan..."'
      },
      {
        id: 'w2-q10',
        type: 'pilihan_ganda',
        questionText: 'Mengapa menjaga pandangan mata di era gawai digital saat ini menjadi ujian tazkiyatun nafs yang sangat krusial?',
        options: [
          'Karena radiasi layar dapat merusak kesehatan mata semata',
          'Karena layar gawai membuka akses instan pada fitnah syahwat di ruang privat tanpa pengawasan orang lain kecuali Allah',
          'Karena gawai digital tidak boleh digunakan oleh penuntut ilmu',
          'Karena semua informasi di media sosial adalah haram'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Ruang privat menguji sifat muraqabatullah (merasa selalu diawasi oleh Allah di kesendirian).'
      }
    ]
  },

  // ==================== PEKAN 3 (HARI 21) ====================
  {
    id: 'eval-week-3',
    title: 'Evaluasi Pekan 3: Birrul Walidain, Silaturahim, dan Kejujuran Sosial',
    assessmentType: 'mingguan',
    dayNumber: 21,
    weekNumber: 3,
    monthNumber: 1,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w3-q1',
        type: 'pilihan_ganda',
        questionText: 'Mengapa Al-Qur\'an sering menggandengkan perintah beribadah kepada Allah dengan perintah berbakti kepada kedua orang tua (birrul walidain)?',
        options: [
          'Sebagai simbol tradisi budaya masyarakat Arab',
          'Karena orang tua adalah sebab keberadaan manusia di dunia dan hak mereka merupakan hak sesama manusia yang paling agung',
          'Agar anak terbebas dari tuntutan nafkah keluarga di masa depan',
          'Karena bakti kepada orang tua hanya wajib dilakukan saat mereka masih kaya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'QS. Al-Isra\': 23: "Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah berbuat baik kepada ibu bapak."'
      },
      {
        id: 'w3-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah batasan ketaatan seorang anak kepada perintah orang tuanya dalam syariat Islam?',
        options: [
          'Wajib ditaati dalam segala hal, termasuk bila diperintahkan bermaksiat kepada Allah',
          'Wajib ditaati dalam hal-hal ma\'ruf dan tidak bertentangan dengan syariat Allah',
          'Boleh menolak mentah-mentah dengan kata-kata kasar jika berbeda pandangan politik',
          'Ketaatan hanya berlaku sampai anak berusia akil baligh'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Kaidah syar\'i: "Laa thaa\'ata li makhluuqin fii ma\'shiyatil Khaaliq" (Tidak ada ketaatan kepada makhluk dalam bermaksiat kepada Sang Khalik).'
      },
      {
        id: 'w3-q3',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah cara seorang anak tetap berbakti kepada kedua orang tuanya yang telah wafat?',
        options: [
          'Mendoakan ampunan bagi mereka, bersedekah atas nama mereka, dan menyambung silaturahim dengan kerabat serta sahabat mereka',
          'Membuat patung peringatan di rumah',
          'Meratapi kepergian mereka setiap malam di kuburan',
          'Menghentikan seluruh amal kebaikan karena pahalanya tidak sampai'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis riwayat Abu Dawud mengenai doa istighfar, pelunasan janji/wasiat, dan menyambung hubungan kasih sahabat orang tua.'
      },
      {
        id: 'w3-q4',
        type: 'pilihan_ganda',
        questionText: 'Apakah fadhilah menyambung silaturahim dengan sanak kerabat sebagaimana dijanjikan oleh Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Dilapangkan rezekinya dan dipanjangkan umurnya (diberkahi jejak usianya)',
          'Dibebaskan dari kewajiban shalat fardhu',
          'Diberikan kekebalan dari hukum syariat',
          'Pasti menjadi penguasa di negerinya'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Man ahabba an yubsatha lahu fii rizqihi wa yunsa-a lahu fii atsarihi falyashil rahimah."'
      },
      {
        id: 'w3-q5',
        type: 'pilihan_ganda',
        questionText: 'Siapakah penyambung silaturahim yang sejati (*al-waashil*) menurut penegasan Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Orang yang membalas kunjungan kerabatnya jika mereka mengunjunginya',
          'Orang yang menyambung hubungan ketika tali kekerabatannya diputus oleh kerabatnya',
          'Orang yang hanya memberi hadiah kepada kerabat yang kaya raya',
          'Orang yang memutuskan hubungan saat dihina kerabat'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari no. 5991: "Bukanlah penyambung silaturahim itu orang yang sekadar membalas budi, tetapi yang menyambung ketika diputuskan."'
      },
      {
        id: 'w3-q6',
        type: 'pilihan_ganda',
        questionText: 'Apakah ancaman bagi orang yang dengan sengaja memutuskan tali silaturahim (*qaathi\'ur rahim*)?',
        options: [
          'Tidak akan masuk surga bersama rombongan orang-orang yang pertama',
          'Amal ibadahnya dilipatgandakan',
          'Diperbolehkan tidak membayar zakat mal',
          'Mendapatkan ampunan otomatis di hari kiamat'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Laa yadkhulul jannata qaathi\'un" (Tidak akan masuk surga pemutus tali silaturahim).'
      },
      {
        id: 'w3-q7',
        type: 'pilihan_ganda',
        questionText: 'Dalam pergaulan dengan tetangga, batas toleransi dan hak tetangga non-Muslim dalam Islam adalah:',
        options: [
          'Boleh dizalimi dan dirampas haknya',
          'Tetap memiliki hak tetangga berupa perlindungan dari gangguan, kebaikan sosial, dan santunan saat kesusahan',
          'Harus dimusuhi dan diusir dari lingkungannya',
          'Wajib diajak mengikuti ritual agamanya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Tetangga kafir yang bukan muharib tetap memiliki hak tetangga: perlindungan hak, sedekah sosial, dan adab bertetangga yang santun.'
      },
      {
        id: 'w3-q8',
        type: 'pilihan_ganda',
        questionText: 'Ketika seorang Muslim berbeda pendapat dengan saudaranya, batas maksimal masa mendiamkan (*hajr*) tanpa alasan syar\'i adalah:',
        options: [
          'Tiga hari tiga malam',
          'Satu bulan penuh',
          'Satu tahun',
          'Boleh selamanya jika merasa sakit hati'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Tidak halal bagi seorang muslim mendiamkan saudaranya lebih dari tiga hari."'
      },
      {
        id: 'w3-q9',
        type: 'pilihan_ganda',
        questionText: 'Apakah sifat orang yang paling dicintai Allah ketika terjadi perselisihan antara dua orang yang saling mendiamkan?',
        options: [
          'Orang yang menuntut ganti rugi materi',
          'Orang yang paling pertama memulai mengucapkan salam',
          'Orang yang membalas hinaan saudaranya dengan kata-kata lebih pedas',
          'Orang yang mengunggah perselisihannya ke media sosial'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Lanjutan hadis: "...dan yang terbaik di antara keduanya adalah yang lebih dahulu memulai salam."'
      },
      {
        id: 'w3-q10',
        type: 'pilihan_ganda',
        questionText: 'Mengapa ucapan "ah" atau membentak kedua orang tua dilarang keras dalam QS. Al-Isra\': 23?',
        options: [
          'Karena kalimat itu menunjukkan rasa jengkel dan merendahkan kehormatan orang tua yang telah merawat dengan penuh kasih sayang',
          'Hanya berlaku jika orang tua beragama Islam saja',
          'Larangan itu sekadar makruh tanzih tanpa dosa',
          'Agar anak tidak kehilangan warisan duniawi'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Firman Allah: "Fa laa taqul lahumaa uffiw wa laa tanharhumaa wa qul lahumaa qawlan kariimaa."'
      }
    ]
  },

  // ==================== PEKAN 4 (HARI 28) ====================
  {
    id: 'eval-week-4',
    title: 'Evaluasi Pekan 4: Harta Halal, Bahaya Riba, Sedekah Sirri, dan Syukur',
    assessmentType: 'mingguan',
    dayNumber: 28,
    weekNumber: 4,
    monthNumber: 1,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w4-q1',
        type: 'pilihan_ganda',
        questionText: 'Apakah dampak fatal dari mengonsumsi harta haram terhadap terkabulnya doa hamba sebagaimana dikisahkan dalam hadis seorang musafir yang lusuh?',
        options: [
          'Doanya tetap dikabulkan karena status musafir menghapus seluruh dosa makanannya',
          'Doanya tertolak dan terhalang dari ijabah karena makanannya haram, minumannya haram, dan pakaiannya haram',
          'Mendapatkan keringanan hisab di akhirat kelak',
          'Hanya membatalkan wudhu fisiknya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Muslim no. 1015: "Fa anna yustajaabu li dzaalik" (Bagaimana mungkin doanya akan dikabulkan jika asupan hidupnya haram).'
      },
      {
        id: 'w4-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah ancaman paling tegas dalam Al-Qur\'an (QS. Al-Baqarah: 279) bagi para pelaku transaksi riba yang menolak bertaubat?',
        options: [
          'Pengumuman perang dari Allah dan Rasul-Nya',
          'Pencabutan status kewarganegaraan',
          'Diberikan waktu toleransi tanpa batas',
          'Kewajiban membayar denda kepada penguasa'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: '"Fa-in lam taf\'aluu fa\'dzanuu bi harbin minallahi wa rasuulih" (Maka ketahuilah bahwa Allah dan Rasul-Nya akan memerangimu).'
      },
      {
        id: 'w4-q3',
        type: 'pilihan_ganda',
        questionText: 'Apakah keutamaan sedekah yang dilakukan secara tersembunyi (*sedekah sirri*) dibandingkan sedekah yang diumumkan secara terbuka?',
        options: [
          'Lebih cepat memadamkan kemurkaan Allah dan menjauhkan diri dari fitnah riya',
          'Menghilangkan kewajiban zakat fitrah',
          'Membuat penerima sedekah merasa berutang budi selamanya',
          'Pahalanya hanya sepertiga dari sedekah terang-terangan'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis: "Inna shadaqatas-sirri tuthfi-u ghadhabar-Rabb" (Sedekah tersembunyi meredam murka Rabb) dan termasuk 7 golongan yang dinaungi di padang Mahsyar.'
      },
      {
        id: 'w4-q4',
        type: 'pilihan_ganda',
        questionText: 'Apakah rukun syukur nikmat yang diajarkan oleh para ulama salafus shalih?',
        options: [
          'Syukur dengan kalbu (mengakui nikmat dari Allah), lisan (memuji-Nya), dan anggota raga (menggunakan nikmat dalam ketaatan)',
          'Hanya dengan mentraktir makan teman-teman',
          'Cukup dengan ucapan Alhamdulillah tanpa perlu shalat',
          'Menyimpan seluruh harta tanpa disedekahkan sedikit pun'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hakikat syukur terbangun di atas tiga pilar: i\'tiraf bil-qalb (kalbu), tahadduts bil-lisan (lisan), dan sharafan fii thaa\'atillah (anggota raga).'
      },
      {
        id: 'w4-q5',
        type: 'pilihan_ganda',
        questionText: 'Mengapa Islam melarang keras praktik penimbunan barang pokok (*ihtikar*) yang dibutuhkan masyarakat banyak?',
        options: [
          'Karena ihtikar memanfaatkan penderitaan umat demi meraup keuntungan sepihak secara zalim',
          'Karena barang pokok tidak boleh diperjualbelikan',
          'Karena pedagang wajib membagikan seluruh barang dagangannya secara gratis',
          'Hanya dilarang bila dilakukan pada bulan Ramadhan'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim: "Laa yahtakiru illaa khaathi\'" (Tidaklah menimbun barang pokok kecuali orang yang berdosa/zalim).'
      },
      {
        id: 'w4-q6',
        type: 'pilihan_ganda',
        questionText: 'Apakah yang dimaksud dengan konsep *Zuhud* yang hakiki menurut Imam Ahmad bin Hanbal dan Ibnul Qayyim?',
        options: [
          'Memakai pakaian compang-camping dan mengemis kepada orang lain',
          'Mengosongkan dunia dari hati, bukan sekadar mengosongkannya dari tangan',
          'Mengharamkan makanan halal yang lezat bagi diri sendiri',
          'Menolak bekerja dan menelantarkan nafkah anak dan istri'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Zuhud adalah meninggalkan apa yang tidak bermanfaat bagi akhirat; harta berada di tangan untuk ketaatan, bukan bertahta di hati.'
      },
      {
        id: 'w4-q7',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah sikap seorang mukmin terhadap perkara yang masih samar halal-haramnya (*syubhat*)?',
        options: [
          'Segera mengambilnya sebelum diambil orang lain',
          'Meninggalkannya demi menjaga kehormatan diri dan agamanya (*istibra\' li diinihi wa \'irdhihi*)',
          'Mencari celah aturan untuk melegalkannya',
          'Menghukuminya halal secara mutlak tanpa bertanya kepada ulama'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Nu\'man bin Basyir radhiyallahu anhu: "Famanittaqaasy-syubuhaat faqadistabra-a li diinihi wa \'irdhih."'
      },
      {
        id: 'w4-q8',
        type: 'pilihan_ganda',
        questionText: 'Kaidah fiqih muamalah yang sangat fundamental menyatakan bahwa hukum asal dalam segala transaksi dan muamalah duniawi adalah:',
        options: [
          'Haram sampai ada dalil yang memerintahkannya',
          'Mubah (boleh) sampai ada dalil shahih yang melarangnya',
          'Makruh secara mutlak',
          'Wajib dilakukan setiap hari'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: '"Al-ashlu fil mu\'aamalaat al-ibaahah hattaa yadulla ad-daliilu \'alaa tahriimihaa."'
      },
      {
        id: 'w4-q9',
        type: 'pilihan_ganda',
        questionText: 'Apakah yang dijanjikan oleh Allah Ta\'ala dalam QS. Ibrahim: 7 bagi hamba-hamba-Nya yang pandai bersyukur?',
        options: [
          'Allah pasti akan menambah nikmat-Nya kepada mereka',
          'Allah akan mencabut ujian hidup selamanya',
          'Mereka tidak akan dimintai pertanggungjawaban hisab',
          'Mereka langsung diangkat menjadi nabi'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: '"La-in syakartum la-aziidannakum, wa la-in kafartum inna \'adzaabii lasyadiid."'
      },
      {
        id: 'w4-q10',
        type: 'pilihan_ganda',
        questionText: 'Dalam pandangan syariat, harta yang sesungguhnya menjadi milik sejati seorang manusia setelah ia meninggal dunia adalah:',
        options: [
          'Rumah megah dan tanah yang diatasnamakan dirinya',
          'Saldo tabungan yang ditinggalkan untuk diperebutkan ahli waris',
          'Harta yang telah ia infakkan dan sedekahkan di jalan Allah semasa hidupnya',
          'Koleksi kendaraan mewah yang dipajang di garasi'
        ],
        correctAnswer: 2,
        points: 10,
        explanation: 'Hadis Bukhari: Rasulullah bertanya, "Siapakah di antara kalian yang harta ahli warisnya lebih ia cintai daripada hartanya sendiri?" Sahabat menjawab, tentu harta sendiri. Nabi bersabda: "Hartamu adalah apa yang kau infakkan, dan harta warismu adalah apa yang kau tinggalkan."'
      }
    ]
  },

  // ==================== PEKAN 5 (HARI 35) ====================
  {
    id: 'eval-week-5',
    title: 'Evaluasi Pekan 5: Menahan Amarah, Tawadhu\', dan Mengikis Hasad',
    assessmentType: 'mingguan',
    dayNumber: 35,
    weekNumber: 5,
    monthNumber: 2,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w5-q1',
        type: 'pilihan_ganda',
        questionText: 'Siapakah orang yang paling kuat menurut sabda Rasulullah shallallahu alaihi wasallam dalam hadis Abu Hurairah?',
        options: [
          'Orang yang mampu menjatuhkan lawannya dalam arena gulat',
          'Orang yang mampu menguasai dirinya tatkala emosi amarah sedang berkobar',
          'Orang yang memiliki persenjataan paling lengkap',
          'Orang yang paling lantang membentak orang lain'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Laisasy-syadiidu bish-shura\'ah, innamasy-syadiidul ladzii yamliku nafsahu \'indal ghadhab."'
      },
      {
        id: 'w5-q2',
        type: 'pilihan_ganda',
        questionText: 'Langkah praktis nabawiyah pertama yang diajarkan Rasulullah saat seseorang merasakan amarah membakar dadanya adalah:',
        options: [
          'Membaca ta\'awwudz memohon perlindungan kepada Allah dari godaan setan',
          'Membalas dengan pukulan fisik yang lebih keras',
          'Membanting barang-barang di sekitarnya',
          'Segera menulis status keluhan di ruang publik'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Nabi shallallahu alaihi wasallam bersabda: "Sungguh aku mengetahui suatu kalimat yang jika diucapkannya niscaya hilang amarahnya: A\'uudzu billahi minasy-syaithaanir-rajiim."'
      },
      {
        id: 'w5-q3',
        type: 'pilihan_ganda',
        questionText: 'Apakah definisi sombong (*al-kibr*) sebagaimana dirumuskan secara tegas oleh Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Memakai pakaian yang rapi dan alas kaki yang bersih',
          'Menolak kebenaran (*batharul haqq*) dan meremehkan sesama manusia (*ghamthun naas*)',
          'Memiliki kendaraan yang terawat dengan baik',
          'Menyukai wewangian yang harum'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Muslim no. 91: "Al-kibru batharul haqqi wa ghamthun-naas." (Sombong adalah menolak kebenaran dan merendahkan manusia).'
      },
      {
        id: 'w5-q4',
        type: 'pilihan_ganda',
        questionText: 'Bahaya penyakit hasad (dengki) digambarkan oleh para ulama laksana api yang membakar kayu bakar, karena:',
        options: [
          'Hasad melenyapkan kebaikan-kebaikan amal dan secara hakikat menentang pembagian takdir Allah Ta\'ala',
          'Hasad membuat wajah seseorang menjadi pucat pasi semata',
          'Hasad hanya membahayakan orang yang dihasadi saja',
          'Hasad diperbolehkan dalam seluruh perkara dunia'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Orang yang hasad pada hakikatnya memprotes hikmah Allah dalam membagikan karunia-Nya kepada hamba-hamba-Nya.'
      },
      {
        id: 'w5-q5',
        type: 'pilihan_ganda',
        questionText: 'Dalam konteks apa syariat Islam membolehkan rasa *ghibthah* (iri positif tanpa menginginkan nikmat orang lain hilang)?',
        options: [
          'Melihat orang yang memiliki banyak kendaraan mewah',
          'Melihat orang yang diberi Al-Qur\'an lalu mengamalkannya siang-malam, dan orang yang diberi harta lalu menginfakkannya di jalan kebenaran',
          'Melihat orang yang mahir memenangkan perdebatan di media sosial',
          'Melihat orang yang berhasil menumpuk emas tanpa membayar zakat'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Laa hasada illaa fits-natain..." (Tidak ada hasad/ghibthah yang dibenarkan kecuali pada dua orang: pemilik Al-Qur\'an dan dermawan kebenaran).'
      },
      {
        id: 'w5-q6',
        type: 'pilihan_ganda',
        questionText: 'Apakah balasan yang dijanjikan bagi hamba yang bersikap tawadhu\' (rendah hati) semata-mata karena Allah Ta\'ala?',
        options: [
          'Allah akan meninggikan derajatnya di dunia dan akhirat',
          'Orang-orang akan merendahkan dan memperbudaknya',
          'Ia akan kehilangan seluruh hartanya',
          'Ia tidak boleh menjadi pemimpin masyarakat'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim no. 2588: "Wa maa tawaadha\'a ahadun lillahi illaa rafa\'ahullah" (Tidaklah seseorang tawadhu\' karena Allah melainkan Allah akan meninggikan derajatnya).'
      },
      {
        id: 'w5-q7',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah penawar nabawiyah tatkala kita melihat kenikmatan pada diri saudara kita agar tidak terkena penyakit *\'Ain*?',
        options: [
          'Menyembunyikan rasa benci di dalam hati',
          'Mendoakan keberkahan baginya dengan mengucapkan "Baarakallahu laka" atau "Maa syaa Allah laa quwwata illa billah"',
          'Meminta bagian harta darinya secara paksa',
          'Memalingkan muka dan mencela kekurangannya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Rasulullah shallallahu alaihi wasallam bersabda: "Jika salah seorang dari kalian melihat sesuatu yang menakjubkan pada saudaranya, hendaklah ia mendoakan keberkahan baginya."'
      },
      {
        id: 'w5-q8',
        type: 'pilihan_ganda',
        questionText: 'Apakah perbedaan mendasar antara *kibr* (sombong) dan *\'ujub* (bangga diri)?',
        options: [
          'Kibr melibatkan orang lain (meremehkan orang), sedangkan \'ujub terjadi di dalam diri sendiri karena memandang tinggi amalnya sendiri tanpa mengingat karunia Allah',
          'Kibr berpahala sedangkan \'ujub berdosa',
          'Keduanya sama persis tanpa perbedaan sedikit pun',
          '\'Ujub hanya terjadi pada anak kecil'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Ibnul Qayyim menjelaskan: Sombong adalah memandang diri lebih tinggi dari orang lain, sedangkan \'ujub adalah lupa bahwa amal dan kebaikannya semata taufiq dari Allah.'
      },
      {
        id: 'w5-q9',
        type: 'pilihan_ganda',
        questionText: 'Jika seseorang sedang marah dalam keadaan berdiri, adab nabawiyah menganjurkannya untuk:',
        options: [
          'Duduk; jika belum reda kemarahannya, hendaklah berbaring',
          'Berlari secepat mungkin keluar rumah',
          'Membentak orang di depannya',
          'Menghidupkan musik keras-keras'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis riwayat Abu Dawud no. 4782 mengenai petunjuk postural saat menenangkan emosi kemarahan.'
      },
      {
        id: 'w5-q10',
        type: 'pilihan_ganda',
        questionText: 'Orang yang mampu menahan amarahnya padahal ia memiliki kemampuan untuk melampiaskannya, di hari kiamat akan:',
        options: [
          'Dipanggil oleh Allah di hadapan seluruh makhluk untuk dipersilakan memilih bidadari surga yang ia kehendaki',
          'Diberikan hisab yang paling berat',
          'Dikenakan denda atas sikap diamnya',
          'Dipisahkan dari kaum mukminin'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis hasan riwayat Abu Dawud dan at-Tirmidzi dari Mu\'adz bin Anas radhiyallahu anhu.'
      }
    ]
  },

  // ==================== PEKAN 6 (HARI 42) ====================
  {
    id: 'eval-week-6',
    title: 'Evaluasi Pekan 6: Tadabbur Al-Qur\'an, Qiyamul Lail, dan Puasa Sunnah',
    assessmentType: 'mingguan',
    dayNumber: 42,
    weekNumber: 6,
    monthNumber: 2,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w6-q1',
        type: 'pilihan_ganda',
        questionText: 'Tujuan utama diturunkannya Al-Qur\'an sebagaimana firman Allah dalam QS. Shad: 29 adalah:',
        options: [
          'Agar sekadar dijadikan hiasan dinding kaligrafi rumah',
          'Agar ayat-ayatnya ditadabburi (direnungkan maknanya) dan menjadi pelajaran bagi orang-orang yang berakal',
          'Hanya dibaca saat ada orang yang meninggal dunia',
          'Disimpan di lemari tinggi tanpa pernah dibuka'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: '"Kitaabun anzalnaahu ilaika mubaarakul liyaddabbaruu aayaatihii wa liyatadzakkara ulul albaab."'
      },
      {
        id: 'w6-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah kedudukan dan keutamaan ibadah Qiyamul Lail (shalat malam) bagi seorang peniti jalan akhirat?',
        options: [
          'Merupakan syi\'ar orang-orang saleh terdahulu, penghapus dosa, dan pencegah dari perbuatan maksiat',
          'Kewajiban fardhu yang bila tertinggal berdosa besar seperti meninggalkan shalat Subuh',
          'Ibadah yang hanya diperuntukkan bagi para nabi saja',
          'Amalan yang makruh dilakukan jika merasa lelah'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis at-Tirmidzi: "Hendaklah kalian mendirikan shalat malam, karena ia adalah kebiasaan orang-orang saleh sebelum kalian..."'
      },
      {
        id: 'w6-q3',
        type: 'pilihan_ganda',
        questionText: 'Kapan waktu sepertiga malam terakhir yang menjadi momen turunnya rahmat khusus Allah Ta\'ala untuk mengabulkan doa hamba-Nya?',
        options: [
          'Mulai pukul 19.00 sampai pukul 21.00 malam',
          'Kira-kira sepertiga malam sebelum waktu Subuh (sekitar pukul 02.00 hingga azan Subuh)',
          'Tepat saat matahari mulai tenggelam di waktu Maghrib',
          'Hanya terjadi satu kali dalam setahun pada malam Lailatul Qadar'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim tentang turunnya Allah ke langit dunia pada sepertiga malam terakhir seraya berfirman menyeru hamba-Nya yang berdoa.'
      },
      {
        id: 'w6-q4',
        type: 'pilihan_ganda',
        questionText: 'Berapakah rakaat minimal pelaksanaan shalat sunnah witir yang diajarkan dalam sunnah Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Satu rakaat',
          'Dua rakaat',
          'Tiga rakaat wajib serentak tanpa salam',
          'Lima rakaat genap'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Shalat witir minimal satu rakaat, dan paling sempurna tiga, lima, tujuh, sembilan, atau sebelas rakaat.'
      },
      {
        id: 'w6-q5',
        type: 'pilihan_ganda',
        questionText: 'Apakah hikmah agung dari disyariatkannya puasa sunnah (seperti Senin-Kamis atau Ayyamul Bidh)?',
        options: [
          'Menundukkan syahwat, melatih keikhlasan rahasia, serta mengangkat catatan amal dalam kondisi berpuasa',
          'Menghemat pengeluaran belanja keluarga secara ekstrem',
          'Membuktikan kekuatan fisik di hadapan teman sekantor',
          'Sebagai pengganti seluruh shalat yang tertinggal'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Nabi shallallahu alaihi wasallam menyukai amalnya dihadapkan kepada Allah pada hari Senin dan Kamis dalam keadaan berpuasa.'
      },
      {
        id: 'w6-q6',
        type: 'pilihan_ganda',
        questionText: 'Tanggal berapakah dalam kalender Hijriyah pelaksanaan puasa sunnah Ayyamul Bidh (hari-hari putih)?',
        options: [
          'Tanggal 1, 2, dan 3 setiap bulan',
          'Tanggal 13, 14, dan 15 setiap bulan Hijriyah',
          'Tanggal 27, 28, dan 29 setiap bulan',
          'Hanya pada tanggal 10 Muharram saja'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Wasiat Rasulullah shallallahu alaihi wasallam kepada Abu Hurairah dan Abu Dzar: berpuasa tiga hari setiap bulan (tanggal 13, 14, 15 Hijriyah).'
      },
      {
        id: 'w6-q7',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah sikap hati seorang mukmin saat membaca ayat Al-Qur\'an yang menyebutkan tentang azab neraka?',
        options: [
          'Membacanya dengan cepat tanpa memikirkan maknanya',
          'Berhenti sejenak (*waqaf*), merasa takut (*khauf*), dan memohon perlindungan kepada Allah dari siksa neraka',
          'Merasa yakin bahwa siksa tersebut hanya berlaku bagi orang lain',
          'Melewatkan ayat tersebut karena membuat suasana hati sedih'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Sunnah Rasulullah shallallahu alaihi wasallam dalam shalat malam: bila melewati ayat rahmat beliau meminta rahmat, bila melewati ayat azab beliau memohon perlindungan.'
      },
      {
        id: 'w6-q8',
        type: 'pilihan_ganda',
        questionText: 'Apakah pintu surga khusus yang disediakan oleh Allah bagi hamba-hamba-Nya yang istiqamah mengerjakan ibadah puasa?',
        options: [
          'Babush Shalat',
          'Babur Rayyan',
          'Babul Jihad',
          'Babush Shadaqah'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Sesungguhnya di surga ada sebuah pintu bernama ar-Rayyan, yang hanya dimasuki oleh orang-orang yang gemar berpuasa."'
      },
      {
        id: 'w6-q9',
        type: 'pilihan_ganda',
        questionText: 'Berapa batasan minimal khatam Al-Qur\'an yang dianjurkan oleh Rasulullah shallallahu alaihi wasallam agar tidak kehilangan tadabbur?',
        options: [
          'Tidak kurang dari tiga hari',
          'Satu jam dalam sekali duduk',
          'Hanya satu ayat seumur hidup',
          'Sepuluh juz setiap tiga puluh menit'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis riwayat Abu Dawud dari Abdullah bin \'Amr: "Laa yafqahu man qara-al Qur-aana fii aqalla min tsalaats" (Tidak paham orang yang mengkhatamkan Al-Qur\'an kurang dari tiga hari).'
      },
      {
        id: 'w6-q10',
        type: 'pilihan_ganda',
        questionText: 'Apakah amalan ringan yang pahalanya setara dengan mendirikan shalat malam suntuk semalam penuh?',
        options: [
          'Mengerjakan shalat Isya dan shalat Subuh secara berjamaah di masjid',
          'Tidur sepanjang hari di hari libur',
          'Menonton ceramah di ponsel sambil rebahan',
          'Berjalan-jalan pagi mengelilingi komplek'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim: "Siapa shalat Isya berjamaah seolah shalat setengah malam, dan siapa shalat Subuh berjamaah seolah shalat semalam suntuk."'
      }
    ]
  },

  // ==================== PEKAN 7 (HARI 49) ====================
  {
    id: 'eval-week-7',
    title: 'Evaluasi Pekan 7: Tawakal Hakiki, Ridha Takdir, dan Sabar Menghadapi Sakit',
    assessmentType: 'mingguan',
    dayNumber: 49,
    weekNumber: 7,
    monthNumber: 2,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w7-q1',
        type: 'pilihan_ganda',
        questionText: 'Apakah makna tawakal yang benar dalam syariat Islam sebagaimana dicontohkan dalam hadis "Ikatlah untamu lalu bertawakallah"?',
        options: [
          'Pasrah total tanpa melakukan ikhtiar atau sebab yang sah',
          'Menggabungkan ikhtiar maksimal yang disyariatkan dengan kepasrahan kalbu yang bulat kepada takdir Allah',
          'Hanya mengandalkan keahlian dan kecerdasan otak sendiri',
          'Meninggalkan pengobatan saat terserang penyakit berbahaya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Tawakal adalah amalan kalbu yang mensyaratkan berjalannya sebab lahiriah tanpa menyandarkan hasil kepada sebab itu sendiri melainkan kepada Allah.'
      },
      {
        id: 'w7-q2',
        type: 'pilihan_ganda',
        questionText: 'Tiga tingkatan sabar yang dirumuskan para ulama berdasarkan Al-Qur\'an adalah:',
        options: [
          'Sabar dalam ketaatan, sabar menjauhi maksiat, dan sabar menghadapi takdir yang pahit',
          'Sabar saat senang, sabar saat tidur, dan sabar saat makan',
          'Sabar menghadapi kemiskinan saja',
          'Sabar menunda shalat fardhu'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Ash-shabru \'alaa thaa\'atillah, ash-shabru \'an ma\'shiyatillah, dan ash-shabru \'alaa aqdaarillahil mu-limah.'
      },
      {
        id: 'w7-q3',
        type: 'pilihan_ganda',
        questionText: 'Apakah fadhilah agung bagi seorang mukmin tatkala ia tertimpa sakit atau kelelahan hidup menurut sabda Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Allah jadikan rasa sakit dan kepayahan itu sebagai penggugur bagi dosa-dosanya',
          'Pencabutan seluruh pahala amal saleh sebelumnya',
          'Pertanda bahwa Allah sangat membenci hamba tersebut',
          'Ia dibebaskan dari kewajiban berakhlak mulia'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: Tidaklah seorang mukmin tertimpa letih, sakit, gundah, sedih, bahkan duri yang menusuknya melainkan Allah hapuskan dosa-dosanya dengannya.'
      },
      {
        id: 'w7-q4',
        type: 'pilihan_ganda',
        questionText: 'Kapan hakikat kesabaran yang sesungguhnya diuji menurut penegasan Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Setelah bertahun-tahun meratapi kesedihan',
          'Pada benturan pertama saat musibah baru saja menimpa (*\'indash shadmatil uulaa*)',
          'Hanya ketika musibah telah berlalu dan selesai',
          'Saat orang lain mulai memuji kesabarannya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari: "Innamash-shabru \'indash-shadmatil uulaa" (Kesabaran sejati adalah pada saat kejutan pertama datang).'
      },
      {
        id: 'w7-q5',
        type: 'pilihan_ganda',
        questionText: 'Perbuatan apa yang dilarang keras saat tertimpa musibah kematian keluarga karena termasuk adat jahiliyah?',
        options: [
          'Meneteskan air mata kesedihan karena kasih sayang',
          'Niyahah (meratap dengan suara keras), merobek baju, dan menampar pipi',
          'Mendoakan ampunan bagi jenazah',
          'Mengantarkan jenazah ke pemakaman'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari: "Laisa minna man dharabal khudud wa syaqqal juyub wa da\'aa bi da\'wal jaahiliyyah."'
      },
      {
        id: 'w7-q6',
        type: 'pilihan_ganda',
        questionText: 'Kalimat *Istirja\'* (Inna lillahi wa inna ilaihi raaji\'un) yang diucapkan seorang hamba saat tertimpa musibah mengandung ikrar:',
        options: [
          'Bahwa diri dan segala yang dimilikinya adalah mutlak milik Allah dan kepada-Nya lah semuanya akan kembali',
          'Tuntutan agar Allah segera mengganti dengan harta dunia dua kali lipat',
          'Keputusasaan dari rahmat dan pertolongan Allah',
          'Pernyataan menyalahkan takdir yang telah terjadi'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'QS. Al-Baqarah: 155-156. Istirja\' mengakui kepemilikan mutlak Allah atas hamba dan tempat kembalinya.'
      },
      {
        id: 'w7-q7',
        type: 'pilihan_ganda',
        questionText: 'Apakah tingkatan sikap kalbu yang lebih tinggi dan lebih utama daripada sekadar bersabar menghadapi takdir pahit?',
        options: [
          'Keluh kesah (*al-jaza\'*)',
          'Ridha dan bersyukur atas segala ketetapan hikmah Allah Ta\'ala',
          'Memprotes keputusan takdir',
          'Mengabaikan urusan agama'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Sabar itu wajib; ridha terhadap takdir pahit adalah tingkatan mustahab yang sangat tinggi, disusul tingkatan syukur.'
      },
      {
        id: 'w7-q8',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah hukum berobat (*tadaawi*) dengan cara medis yang halal ketika seseorang tertimpa penyakit?',
        options: [
          'Dianjurkan (disunnahkan) dan tidak menafikan sifat tawakal kepada Allah',
          'Haram karena menunjukkan penolakan terhadap takdir sakit',
          'Wajib menggunakan jimat dan rajah mistis',
          'Makruh yang menghilangkan seluruh pahala sabar'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Nabi shallallahu alaihi wasallam bersabda: "Tadaawaw fa innallaha lam yadza\' daa-an illaa wadha\'a lahu dawaa-an" (Berobatlah kalian, karena Allah tidak menurunkan penyakit melainkan menurunkan obatnya).'
      },
      {
        id: 'w7-q9',
        type: 'pilihan_ganda',
        questionText: 'Mengapa syariat melarang keras seseorang berobat dengan perkara yang haram (seperti khamr atau zat najis)?',
        options: [
          'Karena Allah tidak menjadikan kesembuhan bagi umat ini pada apa yang diharamkan atas mereka',
          'Hanya karena harganya terlalu mahal',
          'Larangan itu hanya berlaku di zaman para sahabat saja',
          'Agar orang sakit meninggal lebih cepat'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Ibnu Mas\'ud radhiyallahu anhu: "Innallaha lam yaj\'al syifaa-akum fiimaa harrama \'alaikum."'
      },
      {
        id: 'w7-q10',
        type: 'pilihan_ganda',
        questionText: 'Apakah doa yang diajarkan oleh Nabi shallallahu alaihi wasallam dalam hadis Ummu Salamah tatkala tertimpa musibah?',
        options: [
          'Allahumma\'jurnii fii mushiibatii wa akhlif lii khairan minhaa',
          'Rabbana laa tu-aakhidznaa in nasiinaa',
          'Allahumma inni a\'uudzu bika minal faqr',
          'Laa ilaaha illa anta subhaanaka inni kuntu minazh-zhaalimiin'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim: "Ya Allah berilah aku pahala dalam musibahku ini dan gantikanlah bagiku dengan yang lebih baik daripadanya."'
      }
    ]
  },

  // ==================== PEKAN 8 (HARI 56) ====================
  {
    id: 'eval-week-8',
    title: 'Evaluasi Pekan 8: Muhasabah Jiwa, Taubat Nasuha, dan Menjauhi Dosa Rahasia',
    assessmentType: 'mingguan',
    dayNumber: 56,
    weekNumber: 8,
    monthNumber: 2,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w8-q1',
        type: 'pilihan_ganda',
        questionText: 'Nasihat masyhur Khalifah Umar bin al-Khattab radhiyallahu anhu mengenai hisab sebelum hari kiamat berbunyi:',
        options: [
          'Himpunlah kekayaan sebanyak-banyaknya sebelum masa tuamu',
          'Hisablah (introspeksi) diri kalian sebelum kalian dihisab di akhirat, dan timbanglah amal kalian sebelum kalian ditimbang',
          'Biarkanlah dosa berlalu tanpa perlu disesali',
          'Jangan pernah memeriksa kesalahan diri sendiri'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: '"Haasibuu anfusakum qabla an tuhaasabuu, wa tizinuu qabla an tuuzanuu."'
      },
      {
        id: 'w8-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah tiga syarat pokok taubat nasuha atas dosa yang berkaitan murni dengan hak Allah Ta\'ala?',
        options: [
          'Menyesali perbuatan (*nadam*), berhenti seketika dari maksiat, dan bertekad kuat tidak akan mengulanginya',
          'Membayar denda materi kepada pengadilan',
          'Menunggu hingga usia tua baru memohon ampunan',
          'Cukup mengucapkannya dalam hati tanpa meninggalkan maksiat'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'An-Nawawi dalam Riyadhus Shalihin menyebutkan 3 rukun taubat hak Allah: an-nadam, al-iqla\', dan al-\'azmu \'alal \'adam.'
      },
      {
        id: 'w8-q3',
        type: 'pilihan_ganda',
        questionText: 'Jika dosa yang dilakukan berkaitan dengan hak sesama manusia (seperti mengambil harta atau mencemarkan nama baik), syarat tambahan taubatnya adalah:',
        options: [
          'Cukup berpuasa tiga hari berturut-turut',
          'Mengembalikan hak/harta kepada pemiliknya atau meminta kehalalan/keridhaannya sebelum tiba hari kiamat',
          'Menghindari bertemu dengan korban selamanya',
          'Menyumbangkan harta curian ke masjid tanpa izin pemiliknya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Syarat ke-4 taubat menyangkut adami: mengembalikan hak atau memohon maaf dan keridhaan korban selagi di dunia.'
      },
      {
        id: 'w8-q4',
        type: 'pilihan_ganda',
        questionText: 'Apakah ancaman hadis Tsauban radhiyallahu anhu bagi orang-orang yang gemar bermaksiat dalam kesendirian saat tidak ada orang lain yang melihat?',
        options: [
          'Allah jadikan amal-amal kebaikan mereka yang sebesar gunung Tihamah bagai debu yang berterbangan (*habaa-an mantsuuraa*)',
          'Mereka langsung diwafatkan seketika di tempat maksiat',
          'Dosa mereka otomatis terhapus dengan shalat sunnah',
          'Mereka tidak akan dihisab di hari kiamat'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Ibnu Majah no. 4245 tentang orang yang bila bersendirian dengan hal-hal yang diharamkan Allah, mereka melanggarnya tanpa takut kepada Allah.'
      },
      {
        id: 'w8-q5',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah sikap seorang mukmin sejati terhadap dosa-dosa kecil menurut permisalan yang disampaikan Abdullah bin Mas\'ud radhiyallahu anhu?',
        options: [
          'Memandangnya remeh bagaikan lalat yang lewat di depan hidungnya',
          'Memandangnya laksana sedang duduk di kaki gunung yang ia khawatir gunung itu akan runtuh menimpanya',
          'Menganggapnya otomatis terampuni tanpa perlu taubat',
          'Menjadikannya kebiasaan harian yang santai'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari no. 6308: Seorang mukmin melihat dosanya bagai gunung yang siap menimpanya, sedangkan orang munafik melihatnya bagai lalat.'
      },
      {
        id: 'w8-q6',
        type: 'pilihan_ganda',
        questionText: 'Kapan pintu taubat ditutup bagi seorang individu secara personal?',
        options: [
          'Saat usianya mencapai 40 tahun',
          'Ketika nyawanya telah sampai di kerongkongan (*al-ghargarah*) pada saat sakaratul maut',
          'Setiap kali memasuki waktu Maghrib',
          'Bila ia telah berbuat dosa lebih dari seratus kali'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis at-Tirmidzi: "Innallaha yaqbalu taubatal \'abdi maa lam yugharghir" (Allah menerima taubat hamba selama nafas belum tercekik di kerongkongan).'
      },
      {
        id: 'w8-q7',
        type: 'pilihan_ganda',
        questionText: 'Apakah fadhilah luar biasa bagi orang yang bertaubat dengan taubat yang tulus sebagaimana firman Allah dalam QS. Al-Furqan: 70?',
        options: [
          'Allah mengganti keburukan-keburukan (dosa) masa lalu mereka menjadi kebaikan-kebaikan (*hasanaat*)',
          'Mereka tidak perlu lagi beramal saleh sesudahnya',
          'Mereka bebas dari kewajiban berbakti kepada orang tua',
          'Mereka langsung dipindahkan ke negeri lain'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: '"Fa-ulaa-ika yubaddilullaahu sayyi-aatihim hasanaat, wa kaanallaahu ghafuurar rahiimaa."'
      },
      {
        id: 'w8-q8',
        type: 'pilihan_ganda',
        questionText: 'Perbuatan menceritakan kembali aib dan maksiat masa lalu yang telah ditutupi Allah kepada orang lain dengan rasa bangga (*mujaaharah*) berakibat:',
        options: [
          'Mendapatkan ampunan lebih cepat',
          'Dikecualikan dari ampunan dan keselamatan yang dijanjikan bagi seluruh umat',
          'Menaikkan derajat kewibawaan di mata manusia',
          'Tidak berdampak apa-apa jika diniatkan untuk hiburan'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim: "Kullu ummatii mu\'aafaa illal mujaahiriin" (Setiap umatku dimaafkan dosanya kecuali orang yang terang-terangan membongkar aib maksiatnya).'
      },
      {
        id: 'w8-q9',
        type: 'pilihan_ganda',
        questionText: 'Apakah amalan yang diajarkan oleh Rasulullah shallallahu alaihi wasallam dalam shalat sunnah taubat (shalat taubah)?',
        options: [
          'Berwudhu dengan baik, shalat dua rakaat, lalu beristighfar memohon ampunan kepada Allah dengan sungguh-sungguh',
          'Shalat seratus rakaat tanpa membaca surat pendek',
          'Menghadap ke arah matahari terbit',
          'Membakar kemenyan di ruang tertutup'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Ali radhiyallahu anhu dari Abu Bakar ash-Shiddiq radhiyallahu anhu riwayat at-Tirmidzi mengenai tata cara shalat taubat.'
      },
      {
        id: 'w8-q10',
        type: 'pilihan_ganda',
        questionText: 'Apakah konsep *muraqabah* yang menjadi benteng terkuat seorang hamba dari dosa rahasia di kesendirian?',
        options: [
          'Merasa bahwa manusia selalu mengintai setiap gerak-gerik kita',
          'Keyakinan mantap bahwa Allah Ta\'ala Maha Melihat, Maha Mendengar, dan Maha Mengetahui segala rahasia hati di manapun kita berada',
          'Memasang kamera pengawas di setiap sudut kamar',
          'Mengurung diri di tempat gelap tanpa berinteraksi'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Muraqabah adalah maqam ihsan: "Anta\'budallaaha ka-annaka taraah, fa-in lam takun taraahu fa-innahu yaraak."'
      }
    ]
  },

  // ==================== PEKAN 9 (HARI 63) ====================
  {
    id: 'eval-week-9',
    title: 'Evaluasi Pekan 9: Amanah Jabatan, Adab Bertetangga, dan Muamalah Bersih',
    assessmentType: 'mingguan',
    dayNumber: 63,
    weekNumber: 9,
    monthNumber: 3,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w9-q1',
        type: 'pilihan_ganda',
        questionText: 'Apakah status jabatan, kepemimpinan, dan wewenang dalam pandangan syariat Islam sebagaimana ditegaskan Rasulullah shallallahu alaihi wasallam kepada Abu Dzar?',
        options: [
          'Sarana kehormatan untuk memperkaya keluarga dan kerabat',
          'Sebuah amanah yang pada hari kiamat akan berubah menjadi kehinaan dan penyesalan, kecuali bagi yang mengambilnya dengan benar dan menunaikan haknya',
          'Kemenangan mutlak yang harus dirayakan dengan pesta kemewahan',
          'Hak pribadi yang boleh diperjualbelikan kepada penawar tertinggi'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Muslim no. 1825: "Yaa Abaa Dzar, innahaa amaanah, wa innahaa yaumal qiyaamati khizyun wa nadaamah..."'
      },
      {
        id: 'w9-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah hukum menerima hadiah bagi seorang pejabat, panitia tender, atau pegawai yang berkaitan langsung dengan tugas pekerjaannya (*hadayatul ummal*)?',
        options: [
          'Halal mutlak sebagai tanda ucapan terima kasih',
          'Termasuk kategori *ghulul* (pengkhianatan amanah/suap terselubung) yang diharamkan syariat',
          'Sunnah yang dianjurkan untuk mempererat kemitraan',
          'Boleh diterima asalkan tidak diketahui rekan kerja lain'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis riwayat Ahmad: "Hadaayatul \'ummaali ghuluul" (Hadiah bagi para petugas/pejabat yang bertugas adalah bentuk pengkhianatan/korupsi).'
      },
      {
        id: 'w9-q3',
        type: 'pilihan_ganda',
        questionText: 'Rasulullah shallallahu alaihi wasallam bersumpah sampai tiga kali: "Demi Allah tidak beriman! Demi Allah tidak beriman!" Siapakah yang beliau maksud dalam hadis tersebut?',
        options: [
          'Orang yang tidak memiliki perhiasan emas',
          'Orang yang tetangganya tidak merasa aman dari kejahatan dan gangguannya (*bawaa-iquh*)',
          'Orang yang shalatnya tidak diimami oleh ulama besar',
          'Orang yang tidak bepergian ke luar negeri'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Bukhari no. 6016: "Man laa ya\'manu jaaruhu bawaa-iqah" (Orang yang tetangganya tidak aman dari gangguannya).'
      },
      {
        id: 'w9-q4',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah hukum mempekerjakan karyawan tetapi menunda-nunda pembayaran upahnya padahal majikan mampu membayarnya?',
        options: [
          'Merupakan kezaliman nyata, dan Rasulullah bersabda bahwa Allah akan menjadi musuh orang tersebut pada hari kiamat',
          'Merupakan strategi bisnis yang dianjurkan untuk memutar modal',
          'Hanya dihukumi makruh biasa',
          'Diperbolehkan asalkan diberi bonus makanan ringan'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Qudsi dalam Bukhari: Tiga orang yang Allah musuhi di hari kiamat, salah satunya: "Orang yang mempekerjakan buruh, ia mengambil tenaganya namun tidak membayarkan upahnya."'
      },
      {
        id: 'w9-q5',
        type: 'pilihan_ganda',
        questionText: 'Nasihat nabawiyah mengenai waktu pembayaran upah pekerja menegaskan agar upah dibayarkan:',
        options: [
          'Setelah proyek berikutnya disetujui investor',
          'Sebelum keringat pekerja itu mengering',
          'Setiap akhir tahun buku saja',
          'Hanya ketika pekerja tersebut memohon-mohon'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Ibnu Majah no. 2443: "A\'thul ajiira ajrahu qabla an yajiffa \'araquh."'
      },
      {
        id: 'w9-q6',
        type: 'pilihan_ganda',
        questionText: 'Apakah hakikat transaksi *Gharar* (ketidakjelasan/spekulasi menipu) yang dilarang keras dalam fiqih muamalah Islam?',
        options: [
          'Transaksi jual beli barang yang jelas kualitas, kuantitas, harga, dan waktu serah terimanya',
          'Transaksi yang mengandung unsur spekulasi tinggi, ketidakpastian objek akad, atau undian untung-rugi yang merugikan salah satu pihak',
          'Transaksi tawar menawar di pasar tradisional',
          'Transaksi yang pembayarannya menggunakan transfer bank'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Muslim no. 1513: Rasulullah shallallahu alaihi wasallam melarang jual beli hashah dan jual beli gharar.'
      },
      {
        id: 'w9-q7',
        type: 'pilihan_ganda',
        questionText: 'Dalam pergaulan bermasyarakat, jika kita memasak makanan yang aromanya harum semerbak ke rumah tetangga, sunnah nabawiyah mengajarkan:',
        options: [
          'Menutup jendela rapat-rapat agar tetangga tidak tahu',
          'Memperbanyak kuahnya lalu menyidukkan sebagian untuk dibagikan kepada tetangga',
          'Meminta tetangga membayar separuh harga bumbu masak',
          'Menasihati tetangga agar tidak mudah tergiur'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Muslim no. 2625 pesan Rasulullah kepada Abu Dzar: "Idzaa thabakhta maraqatan fa aktsir maa-ahaa wa ta\'aahad jiiraanaka."'
      },
      {
        id: 'w9-q8',
        type: 'pilihan_ganda',
        questionText: 'Menyebarkan kabar burung atau aib pribadi saudara sesama Muslim di grup percakapan tanpa bukti valid termasuk dosa:',
        options: [
          'Ghibah dan buhtan (fitnah kedustaan) yang dosanya lebih berat daripada dosa riba',
          'Perkara mubah untuk bahan lelucon santai',
          'Kebaikan karena meningkatkan kewaspadaan publik',
          'Ibadah lisan'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Menceritakan keburukan yang benar adalah ghibah, dan jika kabar itu tidak benar maka itu adalah fitnah buhtan (QS. Al-Hujurat: 12).'
      },
      {
        id: 'w9-q9',
        type: 'pilihan_ganda',
        questionText: 'Apakah kriteria pemimpin yang paling adil menurut sabda Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Pemimpin yang kalian cintai dan mereka mencintai kalian, kalian mendoakan mereka dan mereka mendoakan kalian',
          'Pemimpin yang paling banyak membangun menara tinggi',
          'Pemimpin yang melarang rakyatnya beribadah',
          'Pemimpin yang memungut pajak paling tinggi'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim: "Khiyaaru a-immatikumul ladziina tuhibbuunahum wa yuhibbuunakum, wa tushalluuna \'alaihim wa yushalluuna \'alaikum."'
      },
      {
        id: 'w9-q10',
        type: 'pilihan_ganda',
        questionText: 'Siapakah orang yang bangkrut (*al-muflis*) di akhirat menurut sabda Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Orang yang meninggal dunia tanpa memiliki uang dinar maupun dirham',
          'Orang yang datang di hari kiamat membawa pahala shalat, puasa, dan zakat, namun ia pernah mencela, menuduh, memakan harta, dan menumpahkan darah sesamanya sehingga pahalanya dibagi-bagikan kepada para korban',
          'Orang yang rumahnya terbakar habis di dunia',
          'Orang yang gagal dalam ujian perniagaan'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Muslim no. 2581 tentang muflis sejati: pahala amalnya habis untuk melunasi kezalimannya, lalu dosa para korban ditimpakan kepadanya hingga ia dilempar ke neraka.'
      }
    ]
  },

  // ==================== PEKAN 10 (HARI 70) ====================
  {
    id: 'eval-week-10',
    title: 'Evaluasi Pekan 10: Mengingat Kematian, Mengobati Panjang Angan-angan, dan Ziarah Kubur',
    assessmentType: 'mingguan',
    dayNumber: 70,
    weekNumber: 10,
    monthNumber: 3,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w10-q1',
        type: 'pilihan_ganda',
        questionText: 'Perintah Rasulullah shallallahu alaihi wasallam untuk memperbanyak mengingat pemutus segala kelezatan (*hadzimul ladz-dzaat*) tertuju pada peristiwa:',
        options: [
          'Kematian (*al-maut*)',
          'Peralihan kekuasaan duniawi',
          'Turunnya harga komoditas pasar',
          'Terjadinya gerhana bulan'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis at-Tirmidzi & an-Nasa\'i: "Aktsiruu min dzikri haadzimil ladz-dzaat: al-maut."'
      },
      {
        id: 'w10-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah dampak negatif dari penyakit *thulul amal* (panjang angan-angan duniawi) terhadap kalbu seorang hamba?',
        options: [
          'Menunda-nunda taubat, malas beramal saleh, dan kalbu menjadi keras terpedaya gemerlap fana',
          'Membuat badan menjadi sangat gemuk',
          'Mendorong seseorang untuk segera menginfakkan seluruh hartanya',
          'Menjadikan orang tersebut hafal Al-Qur\'an lebih cepat'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Panjang angan-angan membuat seseorang merasa ajalnya masih sangat jauh sehingga ia menunda taubat dan mengejar syahwat dunia.'
      },
      {
        id: 'w10-q3',
        type: 'pilihan_ganda',
        questionText: 'Mengapa Rasulullah shallallahu alaihi wasallam menganjurkan umatnya untuk melakukan ziarah kubur setelah sebelumnya sempat melarangnya di awal Islam?',
        options: [
          'Karena ziarah kubur dapat melembutkan hati, meneteskan air mata perenungan, dan mengingatkan peziarah pada akhirat',
          'Agar peziarah dapat meminta berkah dan berdoa meminta hajat hidup kepada mayit',
          'Agar peziarah bisa berfoto di batu nisan yang mewah',
          'Hanya sebagai tradisi wisata musiman tanpa kaitan dengan iman'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim no. 977: "Kuntu nahaitukum \'an ziyaaratil qubuur, fa zuuruuhaa fa-innahaa tudzakkirul aakhirah."'
      },
      {
        id: 'w10-q4',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah lafal doa ucapan salam yang diajarkan oleh Rasulullah shallallahu alaihi wasallam tatkala memasuki area pemakaman kaum muslimin?',
        options: [
          'Assalaamu \'alaikum daara qaumim mu\'miniin, wa innaa in syaa-allaahu bikum laahiquun...',
          'Wahai ahli kubur, bantulah kami menyelesaikan kesulitan rezeki kami di dunia',
          'Selamat tinggal wahai orang-orang yang telah hilang selamanya',
          'Maha Suci arwah para leluhur yang menguasai tanah ini'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Doa ziarah kubur sunnah memuat salam keselamatan kepada penghuni kubur mukminin dan kesadaran bahwa kita pasti akan menyusul mereka.'
      },
      {
        id: 'w10-q5',
        type: 'pilihan_ganda',
        questionText: 'Perbuatan apa yang terlarang dilakukan di atas kuburan seorang Muslim menurut sunnah nabawiyah?',
        options: [
          'Duduk di atas kuburan, menginjaknya, mendirikan bangunan megah di atasnya, dan menyemennya',
          'Mendoakan ampunan bagi mayit dari sisi luar kubur',
          'Menyiram tanah kubur dengan air sekadarnya agar tanah tidak beterbangan',
          'Menandai makam dengan sebuah batu alam sederhana tanpa tulisan keramat'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim: Rasulullah melarang mengapur kuburan, duduk di atasnya, dan mendirikan bangunan di atas kuburan.'
      },
      {
        id: 'w10-q6',
        type: 'pilihan_ganda',
        questionText: 'Nasihat bijak sahabat mulia Abdullah bin Umar radhiyallahu anhuma mengajarkan kita untuk menyikapi waktu hidup dengan cara:',
        options: [
          'Jika engkau berada di sore hari jangan menunggu pagi, dan jika di pagi hari jangan menunggu sore; pergunakan waktu sehatmu sebelum sakitmu dan hidupmu sebelum matimu',
          'Habiskan waktu mudamu untuk bersenang-senang, nanti saat pensiun baru beribadah',
          'Jangan pernah merencanakan kebaikan apa pun',
          'Tidurlah sepanjang hari agar tidak berbuat salah'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Atsar shahih dalam Shahih al-Bukhari riwayat hadis ke-40 Arbain An-Nawawiyah: "Kun fid-dunyaa ka-annaka ghariib aw \'aabiru sabiil."'
      },
      {
        id: 'w10-q7',
        type: 'pilihan_ganda',
        questionText: 'Apakah tiga perkara yang akan mengantarkan jenazah ke liang kubur, di mana dua perkara akan pulang kembali dan hanya satu perkara yang tinggal menemaninya di kubur?',
        options: [
          'Keluarganya, hartanya, dan amalnya; keluarga dan hartanya kembali pulang, sedangkan amalnya tetap tinggal bersamanya',
          'Istri, anak, dan tetangganya yang semuanya ikut dikuburkan',
          'Kain kafan, keranda, dan tanah pemakaman',
          'Gelar akademik, status sosial, dan rekening banknya'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim dari Anas bin Malik: "Yatba\'ul mayyita tsalaatsah: ahluhu wa maaluhu wa \'amaluh; fa yarji\'u itsnaan wa yabqaa ma\'ahu waahid..."'
      },
      {
        id: 'w10-q8',
        type: 'pilihan_ganda',
        questionText: 'Siapakah orang yang paling cerdas (*akyas*) menurut jawaban Rasulullah shallallahu alaihi wasallam ketika ditanya oleh seorang sahabat Anshar?',
        options: [
          'Orang yang paling mahir berhitung dan menimbun emas perak',
          'Orang yang paling banyak mengingat kematian dan paling baik persiapannya menghadapi apa yang terjadi sesudah kematian',
          'Orang yang memiliki kedudukan militer tertinggi',
          'Orang yang pandai menyembunyikan kejahatannya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis hasan riwayat Ibnu Majah: "Aktsaruhum lil mauti dzikran wa ahsanuhum limaa ba\'dahu isti\'daadan, ulaa-ika humul akyas."'
      },
      {
        id: 'w10-q9',
        type: 'pilihan_ganda',
        questionText: 'Apakah makna perumpamaan kehidupan dunia bagi seorang mukmin bagaikan pohon peneduh di tepi jalan yang disabdakan oleh Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Dunia adalah tempat tinggal abadi yang harus dibangun semegah mungkin',
          'Seorang musafir yang berteduh sejenak di bawah naungan pohon, lalu beranjak meninggalkannya untuk meneruskan perjalanan abadi',
          'Tempat yang tidak boleh disinggahi sama sekali',
          'Hutan rimba yang tidak memiliki tujuan akhir'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis at-Tirmidzi: "Maa lii wa lid-dunyaa, maa anaa fid-dunyaa illaa ka raakibin istazhalla tahta syajaratin tsumma raaha wa tarakahaa."'
      },
      {
        id: 'w10-q10',
        type: 'pilihan_ganda',
        questionText: 'Mengapa mengingat kematian tidak boleh membuat seseorang menjadi putus asa atau malas bekerja mencari nafkah halal?',
        options: [
          'Karena mengingat kematian justru memotivasi efisiensi waktu, kejujuran dalam bekerja, dan menjadikan seluruh nafkah bernilai sedekah jariyah',
          'Karena syariat melarang mengingat kematian di hari kerja',
          'Karena rezeki dunia akan otomatis datang tanpa perlu bekerja',
          'Karena kematian hanya berlaku bagi orang yang sudah tua'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Dzikrul maut adalah pendorong produktivitas kebajikan (*al-isti\'daad*), bukan dalih kemalasan atau apatisme.'
      }
    ]
  },

  // ==================== PEKAN 11 (HARI 77) ====================
  {
    id: 'eval-week-11',
    title: 'Evaluasi Pekan 11: Sakaratul Maut, Sunnah Talqin, dan Fikih Pengurusan Jenazah',
    assessmentType: 'mingguan',
    dayNumber: 77,
    weekNumber: 11,
    monthNumber: 3,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w11-q1',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah kalimat talqin yang disunnahkan untuk dituntunkan dengan lembut kepada orang yang sedang menghadapi sakaratul maut (*muhtadhar*)?',
        options: [
          'Laa ilaaha illallaah',
          'Sebutkanlah nama seluruh anak dan cucumu',
          'Bacakan rincian surat tanah dan pembagian harta',
          'Katakan bahwa engkau tidak memiliki dosa sama sekali'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim no. 916: "Laqqinuu mautaakum Laa ilaaha illallaah."'
      },
      {
        id: 'w11-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah keutamaan luar biasa bagi orang yang akhir ucapannya sebelum menghembuskan nafas terakhir adalah kalimat tauhid?',
        options: [
          'Diabadikan namanya di buku sejarah',
          'Masuk ke dalam surga (*dakhalal jannah*)',
          'Diberikan harta warisan tambahan di kubur',
          'Jenazahnya tidak perlu dimandikan'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis shahih Abu Dawud: "Man kaana aakhiru kalaamihi Laa ilaaha illallaah dakhalal jannah."'
      },
      {
        id: 'w11-q3',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah adab mentalqin orang yang sedang sekarat agar tidak membuatnya merasa terbebani atau tertekan hatinya?',
        options: [
          'Membentak di telinganya dan memaksanya bersumpah',
          'Membimbingnya dengan suara lembut dan tenang; jika ia sudah mengucapkannya satu kali jangan diajak bicara hal duniawi lain agar kalimat tauhid menjadi ucapan terakhirnya',
          'Mengulang-ulang tanpa henti meskipun orang tersebut sedang merintih kesakitan',
          'Menyerahkan bimbingan kepada orang yang tidak dikenal'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Talqin dituntunkan dengan kelembutan (*rifq*); jika mayit telah mengucapkannya jangan diinterupsi agar menjadi aakhiru kalaam.'
      },
      {
        id: 'w11-q4',
        type: 'pilihan_ganda',
        questionText: 'Apakah tindakan pertama yang disunnahkan bagi keluarga sesaat setelah seseorang dipastikan telah menghembuskan nafas terakhirnya?',
        options: [
          'Memejamkan kedua kelopak matanya yang terbuka, mendoakan kebaikan baginya, dan menutup seluruh tubuhnya dengan kain yang bersih',
          'Segera membongkar rekening banknya',
          'Merekam wajah jenazah untuk diunggah ke media sosial',
          'Menyalakan lilin di sekeliling tempat tidur'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Muslim: Rasulullah memejamkan mata Abu Salamah saat wafat seraya bersabda bahwa pandangan mata mengikuti ruh yang dicabut, lalu mendoakannya.'
      },
      {
        id: 'w11-q5',
        type: 'pilihan_ganda',
        questionText: 'Hukum fardhu kifayah bagi kaum muslimin terhadap jenazah saudara seimannya mencakup empat kewajiban pokok, yaitu:',
        options: [
          'Memandikan, mengkafani, menshalatkan, dan menguburkannya',
          'Menghias makam, membuat tugu peringatan, menyewa peratap, dan mengadakan jamuan mewah',
          'Mengumumkan di radio, memotret jenazah, mengkremasi, dan menabur bunga impor',
          'Hanya membacakan doa dari jarak jauh tanpa menyentuh jenazah'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Fardhu kifayah atas jenazah muslim: tajhiz yang terdiri dari ghusl (memandikan), takfin (mengkafani), shalat jenazah, dan dafn (menguburkan).'
      },
      {
        id: 'w11-q6',
        type: 'pilihan_ganda',
        questionText: 'Berapa lapis kain kafan putih yang paling utama (afdol) digunakan untuk membungkus jenazah laki-laki muslim sesuai sunnah Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Satu lapis kain bermotif warna-warni',
          'Tiga lapis kain putih bersih dari bahan katun',
          'Tujuh lapis kain sutra hijau',
          'Sepuluh lapis kain wol tebal'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Aisyah radhiyallahu anha dalam Bukhari & Muslim: Rasulullah dikafani dengan tiga helai kain putih Sahuliyah dari katun tanpa gamis dan surban.'
      },
      {
        id: 'w11-q7',
        type: 'pilihan_ganda',
        questionText: 'Apakah rukun-rukun dalam pelaksanaan Shalat Jenazah?',
        options: [
          'Memiliki ruku\' dan dua kali sujud panjang di tanah',
          'Berdiri tanpa ruku\' dan sujud dengan empat takbir: Takbir 1 membaca Al-Fatihah, Takbir 2 membaca Shalawat Nabi, Takbir 3 membaca Doa khusus untuk mayit, dan Takbir 4 diakhiri salam',
          'Hanya membaca tasbih berulang kali tanpa takbir',
          'Dikerjakan sambil duduk menghadap ke timur'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Shalat jenazah terdiri dari 4 takbir tanpa ruku\' dan sujud: Al-Fatihah, Shalawat Ibrahimiyah, Doa mayit (Allahummaghfir lahu...), lalu salam.'
      },
      {
        id: 'w11-q8',
        type: 'pilihan_ganda',
        questionText: 'Berapakah pahala yang dijanjikan bagi orang yang menshalatkan jenazah dan mengantarkannya hingga selesai dimakamkan menurut hadis riwayat Bukhari & Muslim?',
        options: [
          'Dua qirath pahala, di mana satu qirath besarnya laksana gunung Uhud',
          'Diberikan emas seberat tubuh jenazah',
          'Terhapus seluruh dosa besar tanpa perlu taubat',
          'Pahala yang setara dengan membangun satu jembatan dunia'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Abu Hurairah: Siapa menshalatkan jenazah mendapat 1 qirath, dan siapa menyertainya hingga dimakamkan mendapat 2 qirath; semisal 2 gunung besar (Uhud).'
      },
      {
        id: 'w11-q9',
        type: 'pilihan_ganda',
        questionText: 'Apakah petunjuk sunnah nabawiyah bagi para tetangga dan kerabat tatkala ada keluarga yang tertimpa musibah kematian?',
        options: [
          'Menuntut keluarga jenazah menyembelih sapi dan memasakkan pesta untuk para pelayat',
          'Membuatkan dan mengirimkan makanan untuk keluarga jenazah karena mereka sedang disibukkan oleh duka musibah (*Ishna\'uu li-aali Ja\'far tha\'aaman*)',
          'Mengadakan pertunjukan musik untuk menghibur kesedihan',
          'Membiarkan keluarga jenazah kelaparan'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Abu Dawud: "Buatkanlah makanan untuk keluarga Ja\'far, karena telah datang kepada mereka urusan yang menyibukkan mereka."'
      },
      {
        id: 'w11-q10',
        type: 'pilihan_ganda',
        questionText: 'Apakah anjuran Rasulullah shallallahu alaihi wasallam kepada para sahabat sesaat setelah liang kubur ditutup dan diratakan?',
        options: [
          'Segera pulang berlari meninggalkan kuburan tanpa sepatah kata pun',
          'Berdiri sejenak di sisi kubur untuk memohonkan ampunan (*istighfar*) dan keteguhan (*tasbith*) bagi mayit karena saat itu ia sedang ditanya oleh malaikat',
          'Membakar dupa di atas tanah kubur',
          'Membacakan silsilah keturunan bangsawan mayit'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Abu Dawud dari Utsman radhiyallahu anhu: "Istaghfiruu li-akhiikum was-aluu lahut-tatsbiit fa-innahul aana yus-al."'
      }
    ]
  },

  // ==================== PEKAN 12 (HARI 84) ====================
  {
    id: 'eval-week-12',
    title: 'Evaluasi Pekan 12: Fikih Wasiat, Pelunasan Utang, dan Husnuzhan kepada Allah',
    assessmentType: 'mingguan',
    dayNumber: 84,
    weekNumber: 12,
    monthNumber: 3,
    durationMinutes: 30,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'w12-q1',
        type: 'pilihan_ganda',
        questionText: 'Kaidah syar\'i yang sangat mendasar mengenai batas maksimal wasiat harta untuk pihak di luar ahli waris adalah:',
        options: [
          'Maksimal sepertiga (1/3) dari total harta peninggalan, dan sepertiga itu pun sudah banyak',
          'Boleh seluruh harta (100%) diberikan kepada orang lain',
          'Maksimal setengah (1/2) dari total harta',
          'Hanya boleh memberikan uang receh saja'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Sa\'ad bin Abi Waqqash dalam Bukhari & Muslim: "Ats-tsulutsu, wats-tsulutsu katsiir" (Sepertiga, dan sepertiga itu pun sudah banyak).'
      },
      {
        id: 'w12-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah hukum memberikan wasiat harta kepada seseorang yang telah berstatus sebagai ahli waris sah penerima bagian warisan?',
        options: [
          'Tidak boleh (tidak sah) karena ada sabda Rasulullah: "Laa washiyyata li-waarits"',
          'Wajib diberikan lebih banyak daripada ahli waris lain',
          'Dianjurkan jika ahli waris tersebut adalah anak kesayangan',
          'Bebas ditentukan oleh orang tua tanpa batas syariat'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Abu Dawud & at-Tirmidzi: "Innallaha qad a\'thaa kulla dzii haqqin haqqahu, falaa washiyyata li-waarits" (Allah telah menetapkan hak setiap ahli waris, maka tidak ada wasiat untuk ahli waris).'
      },
      {
        id: 'w12-q3',
        type: 'pilihan_ganda',
        questionText: 'Dalam urutan penunaian hak terhadap harta peninggalan jenazah sebelum harta waris dibagikan, manakah urutan yang benar menurut syariat Islam?',
        options: [
          'Bagi waris dulu, baru bayar utang jika ada sisa',
          'Biaya tajhiz jenazah, pelunasan utang piutang jenazah, penunaian wasiat (maksimal 1/3), barulah sisa harta dibagikan kepada ahli waris',
          'Sedekahkan seluruh harta ke panti asuhan dan abaikan utang',
          'Simpan harta di bank tanpa dibagi selamanya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Kaidah ta\'alluq huquq bi-tirkah: 1. Mu\'an tajhiz (biaya pemakaman), 2. Duyuun (utang piutang), 3. Washaya (wasiat sah), 4. Mawaariits (pembagian warisan).'
      },
      {
        id: 'w12-q4',
        type: 'pilihan_ganda',
        questionText: 'Apakah status ruh seorang mukmin yang meninggal dunia namun masih menyisakan utang yang belum terselesaikan di dunia menurut hadis Abu Hurairah radhiyallahu anhu?',
        options: [
          'Ruhnya langsung terbang bebas ke surga tertinggi',
          'Jiwa seorang mukmin tertahan dan terkatung-katung oleh utangnya hingga utang tersebut dilunasi',
          'Utang tersebut otomatis dianggap hangus oleh Allah tanpa hisab',
          'Keluarganya tidak berdosa jika sengaja mengabaikan utang almarhum'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis at-Tirmidzi: "Nafsul mu\'mini mu\'allaqatun bi-dainihi hattaa yuqdhaa \'anhu."'
      },
      {
        id: 'w12-q5',
        type: 'pilihan_ganda',
        questionText: 'Wasiat apakah yang paling wajib dituliskan oleh setiap Muslim yang memiliki sesuatu yang hendak ia wasiatkan menurut sabda Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Wasiat tertulis yang tersimpan di dekat kepalanya dan tidak dibiarkan berlalu dua malam melainkan wasiatnya telah tertulis rapi',
          'Wasiat rahasia yang baru boleh dibuka seratus tahun kemudian',
          'Wasiat agar dibuatkan pesta perayaan megah setiap haul',
          'Wasiat agar makamnya dihiasi batu giok marmer'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Hadis Bukhari & Muslim dari Ibnu Umar: "Maa haqqumri-in muslimin lahu syai-un yuwshii fiihi yabiitu lailataini illaa wa washiyyatuhu maktuubatun \'indahu."'
      },
      {
        id: 'w12-q6',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah sikap batin yang wajib ditanamkan oleh seorang hamba saat merasakan tanda-tanda ajal mendekat sesuai sabda Nabi shallallahu alaihi wasallam tiga hari sebelum wafatnya?',
        options: [
          'Berputus asa dari rahmat Allah karena merasa dosanya teramat banyak',
          'Janganlah salah seorang dari kalian meninggal dunia melainkan ia dalam keadaan berbaik sangka (*husnuzhan*) kepada Allah Ta\'ala atas ampunan dan rahmat-Nya',
          'Menyalahkan takdir kematian yang datang terlalu cepat',
          'Mengabaikan shalat fardhu'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis Muslim no. 2877: "Laa yamuutanna ahadukum illaa wa huwa yuhsinuzh-zhanna billahi \'azza wa jall."'
      },
      {
        id: 'w12-q7',
        type: 'pilihan_ganda',
        questionText: 'Kapan rasa takut (*khauf*) dan harapan (*raja\'*) berimbang, dan kapan *raja\'* harus lebih mendominasi dalam kehidupan seorang mukmin?',
        options: [
          'Saat sehat dan bugar, khauf dan raja\' seimbang untuk mendorong amal dan menjauhi maksiat; namun saat sakaratul maut menjelang, raja\' (harapan rahmat & ampunan) harus mendominasi',
          'Raja\' hanya boleh dirasakan oleh para nabi',
          'Khauf harus mendominasi sampai sakaratul maut agar mayit terus menangis ketakutan',
          'Keduanya tidak diperlukan jika sudah memiliki gelar sarjana'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Ulama aqidah & tasawwuf menegaskan: Saat sehat, khauf menjaga dari maksiat; saat menghadapi ajal, raja\' kepada maghfirah dan kasih sayang Allah harus lebih dominan.'
      },
      {
        id: 'w12-q8',
        type: 'pilihan_ganda',
        questionText: 'Apakah salah satu tanda agung *Husnul Khatimah* (akhir hidup yang indah) bagi seorang mukmin saat diwafatkan?',
        options: [
          'Meninggal dunia dalam keadaan sedang bermaksiat atau menari-nari',
          'Keluarnya keringat dingin di dahi jenazah (*\'araqul jabiin*) dan lisan basah mengucapkan syahadat tauhid',
          'Wajah jenazah berubah menjadi hitam legam dan menakutkan',
          'Meninggal dunia saat sedang mencuri harta anak yatim'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Hadis riwayat at-Tirmidzi & an-Nasa\'i: "Mautul mu\'mini bi\'araqil jabiin" (Kematian seorang mukmin ditandai dengan keringat di dahinya).'
      },
      {
        id: 'w12-q9',
        type: 'pilihan_ganda',
        questionText: 'Jika seseorang memiliki utang yang belum terlunasi dan ia tidak memiliki harta peninggalan sama sekali, bagaimanakah cara penyelesaiannya yang disyariatkan?',
        options: [
          'Dianjurkan bagi ahli warisnya, dermawan muslim, atau baitul mal melunasi utang tersebut demi membebaskan sang mayit dari jeratan utang',
          'Membiarkannya begitu saja agar mayit menanggung sanksinya di akhirat',
          'Menuntut mayit untuk bangkit dari kubur',
          'Menghapuskan nama keluarga mayit dari catatan kependudukan'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Sunnah nabawiyah menanggung utang mayit: Abu Qatadah radhiyallahu anhu menanggung dua dinar utang seorang jenazah sehingga Rasulullah berkenan menshalatkannya.'
      },
      {
        id: 'w12-q10',
        type: 'pilihan_ganda',
        questionText: 'Apakah warisan paling berharga yang ditinggalkan seorang Muslim bagi anak cucunya menjelang kepergiannya menghadap Allah Ta\'ala?',
        options: [
          'Gundukan tanah dan rekening saham tanpa wasiat keimanan',
          'Wasiat keteguhan iman dan tauhid agar senantiasa beribadah hanya kepada Allah dan istiqamah dalam Islam sebagaimana wasiat Nabi Ya\'qub kepada putra-putranya',
          'Tumpukan perhiasan emas yang disimpan di brankas tersembunyi',
          'Daftar musuh keluarga yang harus terus diperangi oleh keturunannya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'QS. Al-Baqarah: 133: Nabi Ya\'qub berwasiat saat ajal tiba: "Maa ta\'buduuna mim ba\'dii? Qaaluu na\'budu ilaahaka wa ilaaha aabaa-ika Ibraahiima..."'
      }
    ]
  }
];
