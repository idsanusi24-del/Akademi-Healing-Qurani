import { Assessment } from '../types';

export const MONTHLY_ASSESSMENTS: Assessment[] = [
  // ==================== EVALUASI BULAN 1 (HARI 30) ====================
  {
    id: 'eval-month-1',
    title: 'Evaluasi Komprehensif Bulan 1: Fondasi Tauhid, Ibadah & Integritas Moral',
    assessmentType: 'bulanan',
    dayNumber: 30,
    monthNumber: 1,
    durationMinutes: 60,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'm1-q1',
        type: 'pilihan_ganda',
        questionText: 'Apakah dua rukun diterimanya amal sholeh di hadapan Allah Azza wa Jalla?',
        options: [
          'Dilakukan di bulan Ramadhan dan disaksikan banyak orang',
          'Ikhlas semata-mata karena Allah dan Mutaba\'ah (mengikuti tuntunan Rasulullah shallallahu alaihi wasallam)',
          'Memerlukan biaya besar dan pakaian serba baru',
          'Dilakukan oleh orang yang memiliki kedudukan terhormat di masyarakat'
        ],
        correctAnswer: 1,
        points: 5,
        explanation: 'Kaidah al-Fudhail bin Iyadh mengenai firman Allah "Liyabluwakum ayyukum ahsanu \'amala": amalan paling ikhlas dan paling benar (sesuai sunnah).'
      },
      {
        id: 'm1-q2',
        type: 'pilihan_ganda',
        questionText: 'Dalam tauhid asma wa shifat, prinsip manhaj ahlus sunnah wal jama\'ah adalah:',
        options: [
          'Menolak seluruh sifat Allah karena takut menyerupakan-Nya dengan makhluk',
          'Menetapkan sifat-sifat yang Allah tetapkan bagi diri-Nya tanpa tahrif, ta\'thil, takyif, dan tamtsil',
          'Menyerupakan tangan Allah dengan tangan makhluk secara fisik kasat mata',
          'Menganggap semua ayat sifat hanyalah dongeng simbolik belaka'
        ],
        correctAnswer: 1,
        points: 5,
        explanation: 'Prinsip QS. Asy-Syura: 11: "Laisa kamitslihi syai-un wa huwas-samii\'ul bashiir."'
      },
      {
        id: 'm1-q3',
        type: 'pilihan_ganda',
        questionText: 'Apakah hakikat penyakit syirik akbar (syirik besar) yang tidak akan diampuni Allah bila pelakunya mati sebelum bertaubat?',
        options: [
          'Memalingkan bentuk ibadah, doa, penyembelihan, atau tawakal kepada selain Allah',
          'Merasa malas saat bangun shalat fajar',
          'Memakan makanan yang sedikit pedas',
          'Membeli pakaian yang indah untuk hari raya'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'QS. An-Nisa: 48: "Innallaha laa yaghfiru an yusyraka bihii wa yaghfiru maa duuna dzaalika liman yasyaa\'."'
      },
      {
        id: 'm1-q4',
        type: 'pilihan_ganda',
        questionText: 'Mengapa wudhu menjadi salah satu syarat sah shalat yang paling utama?',
        options: [
          'Sebagai sarana membersihkan hadats kecil dengan air suci mensucikan sesuai tata cara Rasulullah shallallahu alaihi wasallam',
          'Sekadar untuk menyegarkan wajah di waktu terik',
          'Hanya sebagai tradisi kebersihan fisik suku Arab kuno',
          'Wudhu boleh diganti dengan tisu basah meskipun ada air berlimpah'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari & Muslim: "Laa yaqbalullaahu shalaata ahadikum idzaa ahdatsa hattaa yatawadh-dha\'."'
      },
      {
        id: 'm1-q5',
        type: 'pilihan_ganda',
        questionText: 'Apakah rukun bathiniyyah yang membedakan shalat yang bernyawa dari shalat yang hampa raga?',
        options: [
          'Khusyuk dan hadirnya penghayatan kalbu di hadapan kebesaran Allah',
          'Kecepatan ruku\' dan sujud yang mengagumkan penonton',
          'Kerasnya suara bacaan di setiap rakaat shalat siang',
          'Membayangkan bentuk rupa Allah secara kasat indera'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'QS. Al-Mu\'minun: 1-2: "Qad aflahal mu\'minuun, alladziina hum fii shalaatihim khaasyi\'uun."'
      },
      {
        id: 'm1-q6',
        type: 'pilihan_ganda',
        questionText: 'Mengapa menjaga pandangan mata dari fitnah haram (*ghaddhul bashar*) menjadi fondasi awal tazkiyatun nafs?',
        options: [
          'Karena pandangan adalah panah iblis yang paling cepat meracuni dan mengotori kalbu',
          'Karena manusia tidak diizinkan membuka matanya di luar rumah',
          'Hanya berlaku bagi laki-laki saja dan tidak bagi wanita',
          'Agar tidak melihat kekurangan fisik saudara'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Ibnul Qayyim dalam Al-Jawab Al-Kafi menjelaskan bahwa pandangan membangkitkan lintasan pikiran, lintasan membangkitkan syahwat, dan syahwat melahirkan tekad maksiat.'
      },
      {
        id: 'm1-q7',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah kedudukan birrul walidain (berbakti kepada orang tua) dalam perbandingan dengan jihad sunnah?',
        options: [
          'Bakti kepada orang tua diutamakan, sebagaimana Rasulullah memerintahkan seorang pemuda untuk berjihad dengan merawat kedua orang tuanya',
          'Jihad sunnah selalu membatalkan hak orang tua',
          'Orang tua tidak berhak atas waktu anaknya',
          'Bakti hanya wajib jika orang tua memberikan uang saku'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari: "Fafiihimaa fajaahid" (Maka pada kedua orang tuamulah hendaknya engkau berjihad merawat keduanya).'
      },
      {
        id: 'm1-q8',
        type: 'pilihan_ganda',
        questionText: 'Apakah ancaman syar\'i bagi orang yang memutuskan tali silaturahim sanak kerabat demi kepentingan materi duniawi?',
        options: [
          'Terancam terhalang masuk surga dan doanya lambat diijabah',
          'Mendapatkan tambahan rezeki yang berlimpah',
          'Dilepaskan dari kewajiban berpuasa',
          'Tidak memiliki konsekuensi akhirat apa pun'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis muttafaqun alaih: "Laa yadkhulul jannata qaathi\'ur-rahim."'
      },
      {
        id: 'm1-q9',
        type: 'pilihan_ganda',
        questionText: 'Mengapa asupan makanan dan harta haram menjadi penghalang terbesar terkabulnya doa hamba?',
        options: [
          'Karena tubuh yang tumbuh dari makanan haram tertolak di hadapan kesucian Allah Yang Maha Thayyib',
          'Hanya berlaku jika makanan haram itu dicuri pada siang hari',
          'Karena makanan haram tidak mengandung vitamin hewani',
          'Larangan itu sekadar anjuran medis kesehatan belaka'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Muslim: "Innallaha Ta\'ala thayyibun laa yaqbalu illaa thayyibaa..."'
      },
      {
        id: 'm1-q10',
        type: 'pilihan_ganda',
        questionText: 'Apakah yang dimaksud dengan praktik Riba Nasi\'ah yang diharamkan secara mutlak oleh Al-Qur\'an dan Sunnah?',
        options: [
          'Tambahan nilai yang disyaratkan atas penundaan waktu pembayaran utang piutang',
          'Jual beli emas dengan perak secara tunai serah terima langsung',
          'Memberikan hadiah sukarela tanpa syarat saat melunasi utang',
          'Menyimpan uang di brankas besi pribadi'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Kaidah syar\'i: "Kullu qardhin jarra manfa\'atan fahuwa ribaa" (Setiap utang piutang yang mensyaratkan keuntungan adalah riba).'
      },
      {
        id: 'm1-q11',
        type: 'pilihan_ganda',
        questionText: 'Apakah keutamaan sedekah tersembunyi (*sedekah sirri*) dibanding sedekah terang-terangan?',
        options: [
          'Lebih ampuh memadamkan kemurkaan Allah dan menjamin keselamatan dari riya',
          'Menghilangkan pahala zakat fardhu',
          'Pahalanya lebih sedikit dibanding sedekah yang diumumkan di spanduk',
          'Hanya sah bila nominalnya mencapai jutaan rupiah'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis: "Shadaqatus-sirri tuthfi-u ghadhabar-Rabb" dan termasuk salah satu dari 7 golongan yang dinaungi di bawah Arsy.'
      },
      {
        id: 'm1-q12',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah hakikat syukur yang sempurna kepada Allah atas nikmat kesehatan dan kelapangan rezeki?',
        options: [
          'Mengakui karunia itu di kalbu, memuji Allah dengan lisan, dan menggunakan raga dalam ketaatan beribadah',
          'Cukup mengucapkan hamdalah tanpa perlu melaksanakan shalat',
          'Membelanjakannya untuk pesta pora dan pamer gaya hidup',
          'Menyembunyikan kekayaan dengan berpura-pura menjadi pengemis'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Tiga rukun syukur: I\'tiraf bil qalb, tahadduts bil lisan, dan istikhdam fil tha\'ah.'
      },
      {
        id: 'm1-q13',
        type: 'pilihan_ganda',
        questionText: 'Apakah yang dimaksud dengan *Al-Ghibah* menurut penjelasan resmi Rasulullah shallallahu alaihi wasallam dalam hadis Abu Hurairah?',
        options: [
          'Menyebutkan sesuatu tentang saudaramu yang tidak ia sukai',
          'Memuji saudara di hadapan khalayak ramai',
          'Mengingatkan saudara akan kesalahan dengan nasihat privat empat mata',
          'Mendoakan kebaikan bagi saudara di waktu mustajab'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Muslim: "Dzikruka akhaaka bimaa yakrah" (Engkau menyebutkan tentang saudaramu perkara yang ia benci jika mendengarnya).'
      },
      {
        id: 'm1-q14',
        type: 'pilihan_ganda',
        questionText: 'Jika tuduhan keburukan yang kita sebarkan tentang seseorang ternyata tidak sesuai dengan fakta aslinya, maka perbuatan tersebut dinamakan:',
        options: [
          'Buhtan (kedustaan dan fitnah besar) yang dosanya jauh lebih pedih',
          'Ghibah ringan yang dimaafkan',
          'Candaan mubah',
          'Kritik yang membangun'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Rasulullah shallallahu alaihi wasallam bersabda: "Jika pada dirinya ada apa yang engkau katakan maka engkau mengghibahnya, dan jika tidak ada maka engkau telah menuduhnya secara dusta (buhtan)."'
      },
      {
        id: 'm1-q15',
        type: 'pilihan_ganda',
        questionText: 'Apakah bahaya dari sifat pemarah yang tidak terkendali dalam tinjauan kebersihan jiwa?',
        options: [
          'Membakar akal sehat, merusak hubungan ukhuwah, dan menjadi pintu utama setan menguasai manusia',
          'Menjadikan seseorang dihormati dan disegani di surga',
          'Menaikkan derajat keilmuan secara instan',
          'Hanya berdampak pada tekanan darah tanpa kaitan dengan dosa'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Kemarahan adalah bara api yang dinyalakan setan di dalam kalbu anak Adam; menahannya adalah bukti kekuatan jiwa sejati.'
      },
      {
        id: 'm1-q16',
        type: 'pilihan_ganda',
        questionText: 'Apakah yang dimaksud dengan sifat tawadhu\' (rendah hati) di hadapan manusia?',
        options: [
          'Menerima kebenaran dari siapapun datangnya dan tidak memandang diri sendiri lebih mulia daripada orang lain',
          'Mengaku bodoh padahal sebenarnya mampu memberi solusi',
          'Memakai pakaian kotor untuk mencari simpati',
          'Tunduk kepada kemaksiatan orang lain'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Tawadhu\' adalah tunduk pada kebenaran dan tidak merendahkan sesama hamba Allah.'
      },
      {
        id: 'm1-q17',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah sikap hati seorang mukmin ketika ditimpa musibah kehilangan harta atau kesehatan?',
        options: [
          'Mengucapkan kalimat istirja\', bersabar, dan meyakini ada hikmah kebaikan di balik takdir Allah',
          'Mengutuk nasib dan menyalahkan takdir Allah di hadapan khalayak',
          'Merobek pakaian dan menampar-nampar pipi',
          'Berputus asa dan berhenti menjalankan kewajiban shalat'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'QS. Al-Baqarah: 155-156: Mukmin bersabar dan beristirja\' mengakui bahwa seluruh hidup adalah milik Allah.'
      },
      {
        id: 'm1-q18',
        type: 'pilihan_ganda',
        questionText: 'Apakah doa perlindungan yang diajarkan Rasulullah saat pagi dan petang agar terlindung dari kemalasan, sifat pengecut, dan utang?',
        options: [
          'Allahumma inni a\'uudzu bika minal hammi wal hazan, wal \'ajzi wal kasal, wal jubni wal bukhli, wa dhala\'id-daini wa ghalabatir-rijaal',
          'Rabbana aatina fid dunya hasanah',
          'Bismillahi tawakkaltu \'alallah',
          'Subhanallahi wal hamdulillahi wa laa ilaaha illallah'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Doa perlindungan komprehensif Abu Umamah yang diajarkan Rasulullah shallallahu alaihi wasallam dalam Shahih al-Bukhari.'
      },
      {
        id: 'm1-q19',
        type: 'pilihan_ganda',
        questionText: 'Mengapa seorang penuntut ilmu dan peniti jalan akhirat diwajibkan menjauhi syubhat (perkara yang samar)?',
        options: [
          'Demi menjaga kesucian agamanya dan kehormatan dirinya dari ketergelinciran ke dalam yang haram',
          'Agar dinilai sebagai orang yang paling suci oleh masyarakat',
          'Hanya agar terhindar dari denda hukum negara',
          'Karena seluruh hal di dunia ini adalah syubhat'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Arbain ke-6: "Barangsiapa menjauhi syubhat maka ia telah menyelamatkan agama dan kehormatannya."'
      },
      {
        id: 'm1-q20',
        type: 'pilihan_ganda',
        questionText: 'Apakah bekal terpenting yang harus disiapkan oleh seorang hamba setiap hari menjelang tibanya kematian?',
        options: [
          'Ketaqwaan yang tulus, amal saleh yang konsisten (*mudawamah*), dan taubat nasuha yang terus diperbaharui',
          'Koleksi emas batangan dan sertifikat tanah yang disimpan rapat',
          'Memperbanyak foto diri di berbagai tempat bersejarah',
          'Menunda amal saleh hingga memasuki usia enam puluh tahun'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'QS. Al-Baqarah: 197: "Wa tazawwaduu fa inna khairaz-zaadit-taqwaa" (Dan berbekallah kalian, sesungguhnya sebaik-baik bekal adalah taqwa).'
      }
    ]
  },

  // ==================== EVALUASI BULAN 2 (HARI 60) ====================
  {
    id: 'eval-month-2',
    title: 'Evaluasi Komprehensif Bulan 2: Pembersihan Jiwa, Sunnah Nabawiyah & Fikih Sosial',
    assessmentType: 'bulanan',
    dayNumber: 60,
    monthNumber: 2,
    durationMinutes: 60,
    passingScore: 75,
    maxScore: 100,
    questions: [
      {
        id: 'm2-q1',
        type: 'pilihan_ganda',
        questionText: 'Mengapa ibadah Qiyamul Lail (shalat malam) menjadi tolok ukur keikhlasan dan kekuatan spiritual seorang hamba?',
        options: [
          'Karena dilakukan di saat mayoritas manusia terlelap tidur, jauh dari pantauan riya, dan hening munajat kepada Allah',
          'Karena pahalanya hanya diberikan kepada orang yang shalat di luar rumah',
          'Karena shalat malam tidak membutuhkan wudhu',
          'Hanya sebagai pengganti bila lupa shalat Subuh'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Shalat malam adalah madrasah keikhlasan rahasia para kekasih Allah (QS. As-Sajdah: 16-17).'
      },
      {
        id: 'm2-q2',
        type: 'pilihan_ganda',
        questionText: 'Apakah faedah membaca Al-Qur\'an dengan metode tadabbur (perenungan makna) dibandingkan sekadar membaca lafal tanpa pemahaman?',
        options: [
          'Tadabbur melembutkan hati yang keras, menumbuhkan rasa khasy-yah (takut yang mulia), dan mengarahkan perilaku nyata dalam kehidupan',
          'Membaca tadabbur mengurangi pahala huruf Al-Qur\'an',
          'Tadabbur hanya wajib bagi orang yang bergelar doktor tafsir',
          'Tadabbur melarang seseorang untuk mengkhatamkan bacaannya'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'QS. Muhammad: 24: "Afalaa yatadabbaruunal Qur-aana am \'alaa quluubin aqfaaluhaa."'
      },
      {
        id: 'm2-q3',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah sunnah berpuasa sunnah Ayyamul Bidh yang diajarkan oleh Rasulullah shallallahu alaihi wasallam?',
        options: [
          'Berpuasa pada tanggal 13, 14, dan 15 setiap bulan qamariyah/Hijriyah',
          'Berpuasa di awal bulan Muharram saja',
          'Berpuasa setiap hari tanpa berbuka di malam hari (*wishal*)',
          'Berpuasa hanya di hari Sabtu'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari & Muslim: Puasa tiga hari setiap bulan setara dengan puasa setahun penuh.'
      },
      {
        id: 'm2-q4',
        type: 'pilihan_ganda',
        questionText: 'Apakah rukun taubat nasuha yang tidak boleh ditinggalkan tatkala seorang hamba terjerumus dalam kemaksiatan dosa?',
        options: [
          'Menyesali perbuatan, berhenti seketika, dan bertekad kuat tidak akan mengulanginya selamanya',
          'Cukup mengumumkan kesalahan di media sosial',
          'Menunggu datangnya malam tahun baru baru bertaubat',
          'Membayar upeti kepada lembaga adat'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Tiga rukun taubat menurut Imam an-Nawawi: an-nadam (penyesalan), al-iqla\' (meninggalkan), dan al-\'azm \'alaa allaa ya\'uud (tekad tidak mengulangi).'
      },
      {
        id: 'm2-q5',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah penyelesaian taubat dari dosa yang melanggar hak dan harta sesama manusia?',
        options: [
          'Wajib mengembalikan harta tersebut atau meminta kehalalan dan keridhaannya sebelum tiba hari hisab di padang Mahsyar',
          'Cukup membaca istighfar seratus kali tanpa mengembalikan barang',
          'Dosa tersebut otomatis lunas jika pelaku berangkat umrah',
          'Menunggu hingga korban meninggal dunia agar tidak malu'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari no. 2449: Menuntut pembebasan hak saudaranya hari ini sebelum dinar dan dirham tak lagi berlaku.'
      },
      {
        id: 'm2-q6',
        type: 'pilihan_ganda',
        questionText: 'Apakah yang dimaksud dengan perbuatan *Mujaharah bil Ma\'shiyah* (terang-terangan memamerkan maksiat) yang dikecualikan dari ampunan?',
        options: [
          'Seseorang yang berbuat dosa di malam hari yang telah ditutupi oleh Allah, lalu di pagi harinya ia menceritakannya dengan bangga kepada orang lain',
          'Seseorang yang beristighfar sendirian di kamarnya',
          'Seseorang yang lupa menutup auratnya karena tidak sengaja',
          'Seseorang yang menangis menyesali dosa di hadapan guru ngajinya'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari & Muslim: "Kullu ummatii mu\'aafan illal mujaahiriin..."'
      },
      {
        id: 'm2-q7',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah hakikat konsep *Muraqabatullah* dalam menyucikan kalbu dari dosa kesendirian?',
        options: [
          'Menyadari dengan penuh keyakinan bahwa Allah senantiasa mengawasi kalbu, lintasan pikiran, dan perbuatan kita di ruang privat maupun publik',
          'Meminta orang lain mengawasi gerak-gerik kita selama 24 jam',
          'Hanya merasa diawasi Allah tatkala sedang berada di dalam masjid',
          'Menganggap Allah hanya mengetahui perkara-perkara yang besar saja'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Maqam ihsan: "Beribadahlah kepada Allah seakan engkau melihat-Nya; jika engkau tidak melihat-Nya, sesungguhnya Dia melihatmu."'
      },
      {
        id: 'm2-q8',
        type: 'pilihan_ganda',
        questionText: 'Apakah bahaya dari sifat sombong (*al-kibr*) menurut hadis riwayat Abdullah bin Mas\'ud radhiyallahu anhu?',
        options: [
          'Tidak akan masuk surga orang yang di dalam hatinya terdapat kesombongan seberat biji sawi sekalipun',
          'Membuat postur tubuh menjadi membungkuk',
          'Hanya dihukumi makruh tanzih tanpa dosa',
          'Dimaafkan bila yang disombongi adalah orang miskin'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Muslim: "Laa yadkhulul jannata man kaana fii qalbihi mitsqaalu dzarratin min kibr."'
      },
      {
        id: 'm2-q9',
        type: 'pilihan_ganda',
        questionText: 'Mengapa sifat hasad (dengki) terhadap nikmat yang diterima saudara sesama muslim sangat dicela oleh syariat?',
        options: [
          'Karena hasad memakan kebaikan bagaikan api memakan kayu kering dan pada hakikatnya memprotes pembagian takdir Allah',
          'Karena hasad membuat badan menjadi kurus semata',
          'Karena hasad hanya boleh ditujukan kepada kerabat dekat',
          'Hasad diperbolehkan bila tidak diucapkan lisan'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hasad adalah bentuk ketidakridhaan terhadap keadilan karunia dan hikmah pembagian rezeki Allah Ta\'ala.'
      },
      {
        id: 'm2-q10',
        type: 'pilihan_ganda',
        questionText: 'Apakah penawar utama ketika rasa iri atau kagum yang berlebihan terlintas di hati kita agar tidak membahayakan saudara kita?',
        options: [
          'Mendoakan keberkahan bagi saudara tersebut dengan lafal "Barakallahu laka" atau "Maa syaa Allah laa quwwata illa billah"',
          'Memalingkan muka dan mencela kekurangannya',
          'Meminta bagian harta secara paksa',
          'Menulis kritik pedas tanpa nama di media'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Sunnah nabawiyah untuk menangkal \'Ain: mendoakan keberkahan (*at-tabriik*).'
      },
      {
        id: 'm2-q11',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah sikap yang benar saat seseorang dihina atau dicaci maki oleh orang lain di ruang umum?',
        options: [
          'Menahan amarah, memaafkan, dan membalas dengan keanggunan akhlak atau berpaling dari orang-orang jahil',
          'Membalas mencaci maki dengan kata-kata yang lebih kotor dan kasar',
          'Mengajak duel fisik hingga terluka',
          'Menyimpan dendam untuk dibalaskan pada keturunannya'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'QS. Al-Furqan: 63: "Wa idzaa khaathabahumul jaahiluuna qaaluu salaamaa."'
      },
      {
        id: 'm2-q12',
        type: 'pilihan_ganda',
        questionText: 'Apakah kedudukan menepati janji (*wafa\' bil \'ahdi*) dalam akhlak seorang mukmin?',
        options: [
          'Merupakan kewajiban agung keimanan; menyelisihinya secara sengaja adalah salah satu tanda kemunafikan',
          'Sekadar anjuran sopan santun tanpa konsekuensi dosa',
          'Boleh dilanggar jika pihak lain adalah orang yang lemah',
          'Hanya wajib ditepati jika ada jaminan uang muka'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari & Muslim tentang tanda munafik: "Idzaa \'aahada ghadar, wa idzaa wa\'ada akhlaf."'
      },
      {
        id: 'm2-q13',
        type: 'pilihan_ganda',
        questionText: 'Apakah hukum menerima uang pelicin atau suap (*risywah*) dalam pengurusan izin, proyek, atau memenangkan perkara hukum?',
        options: [
          'Haram mutlak dan mendapatkan laknat dari Allah dan Rasul-Nya baik bagi penyuap maupun penerima suap',
          'Halal asalkan diniatkan sebagai sedekah sukarela',
          'Mubah bila nominalnya di bawah batas tertentu',
          'Dianjurkan demi kelancaran birokrasi'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis at-Tirmidzi & Abu Dawud: "La\'ana Rasulullahi shallallahu alaihi wasallam ar-raasyi wal murtasyi" (Rasulullah melaknat penyuap dan penerima suap).'
      },
      {
        id: 'm2-q14',
        type: 'pilihan_ganda',
        questionText: 'Apakah batasan interaksi dan hak tetangga dalam ajaran Islam sebagaimana ditekankan berkali-kali oleh Malaikat Jibril kepada Rasulullah?',
        options: [
          'Jibril terus mewasiatkan berbuat baik kepada tetangga hingga Nabi mengira tetangga akan diberi hak warisan',
          'Tetangga hanya boleh disapa saat hari raya Idul Fitri saja',
          'Boleh membuang sampah di depan pagar tetangga jika ia orang yang pelit',
          'Tetangga tidak memiliki hak sosial apapun dalam Islam'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari & Muslim: "Maa zaala Jibriil yuushiinii bil-jaari hattaa zhanantu annahu sayuwarritsuh."'
      },
      {
        id: 'm2-q15',
        type: 'pilihan_ganda',
        questionText: 'Bagaimanakah hakikat tawakal kepada Allah saat menghadapi kesulitan hidup dan ikhtiar mencari rezeki?',
        options: [
          'Menempuh ikhtiar halal yang maksimal disertai kepasrahan kalbu yang bulat bahwa hasil sepenuhnya berada di tangan Allah',
          'Duduk berpangku tangan di rumah tanpa bekerja sambil menunggu kiriman dari langit',
          'Menggunakan cara-cara haram demi mempercepat hasil',
          'Mengandalkan koneksi relasi politik sebagai penentu rezeki'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Umar bin Khattab tentang burung yang keluar pagi dalam keadaan lapar dan pulang sore dalam keadaan kenyang.'
      },
      {
        id: 'm2-q16',
        type: 'pilihan_ganda',
        questionText: 'Apakah fadhilah agung bagi seorang hamba yang tabah dan sabar tatkala tertimpa ujian penyakit kronis di tubuhnya?',
        options: [
          'Penyakit tersebut menjadi kafarat (penghapus) dosa dan peninggi derajat di sisi Allah Ta\'ala',
          'Menghilangkan seluruh kewajiban shalat fardhu selamanya',
          'Menunjukkan bahwa dirinya dibenci oleh Allah',
          'Mengharuskan dirinya meminta kematian kepada Allah'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis shahih: "Tidaklah seorang muslim tertimpa kepayahan atau penyakit melainkan Allah hapuskan dengannya kesalahan-kesalahannya."'
      },
      {
        id: 'm2-q17',
        type: 'pilihan_ganda',
        questionText: 'Apakah hukum mengharapkan kematian (*tamannil maut*) karena putus asa menghadapi himpitan penderitaan duniawi?',
        options: [
          'Dilarang oleh Rasulullah shallallahu alaihi wasallam; jika terpaksa berdoalah agar dihidupkan jika hidup lebih baik dan diwafatkan jika wafat lebih baik baginya',
          'Dianjurkan agar cepat bebas dari masalah',
          'Merupakan bentuk tawakal tertinggi',
          'Wajib dilakukan jika sudah berusia lanjut'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari no. 5671: "Laa yatamannayanna ahadukumul mauta li dhurrin ashabaah..."'
      },
      {
        id: 'm2-q18',
        type: 'pilihan_ganda',
        questionText: 'Apakah amalan harian yang pahalanya laksana mengerjakan haji dan umrah secara sempurna (taammah, taammah, taammah)?',
        options: [
          'Shalat Subuh berjamaah, lalu berzikir mengingat Allah hingga matahari terbit, kemudian mendirikan shalat sunnah dua rakaat (Syuruq/Isyraq)',
          'Tidur sepanjang siang hari di hari Jumat',
          'Membeli souvenir dari kota Makkah',
          'Menonton siaran langsung Ka\'bah di televisi'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis hasan riwayat at-Tirmidzi dari Anas bin Malik radhiyallahu anhu tentang fadhilah shalat Isyraq.'
      },
      {
        id: 'm2-q19',
        type: 'pilihan_ganda',
        questionText: 'Mengapa menjaga kebersihan tempat dan pakaian dari percikan air kencing sangat ditekankan secara ketat dalam Islam?',
        options: [
          'Karena tidak berhati-hati dan menganggap remeh kencing merupakan salah satu penyebab utama siksa kubur',
          'Hanya agar pakaian tidak berbau apek semata',
          'Karena air kencing membatalkan wudhu orang lain di sekitarnya',
          'Larangan itu hanya berlaku di kamar mandi umum'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Hadis Bukhari & Muslim melewati dua kuburan yang disiksa: salah satunya karena tidak menjaga diri dari percikan kencing (*laa yastatiru min baulih*).'
      },
      {
        id: 'm2-q20',
        type: 'pilihan_ganda',
        questionText: 'Apakah tujuan utama mempelajari ilmu-ilmu syar\'i dalam program bimbingan hidup ini?',
        options: [
          'Untuk diamalkan dengan ikhlas, memperbaiki ibadah dan akhlak, serta meraih husnul khatimah yang diridhai Allah',
          'Untuk berdebat dan mengalahkan orang lain di media sosial',
          'Hanya demi mendapatkan selembar piagam kelulusan',
          'Agar dipuji sebagai ahli agama dan dipanggil ustadz'
        ],
        correctAnswer: 0,
        points: 5,
        explanation: 'Ilmu syar\'i adalah sarana ketaatan dan bekal kepulangan abadi menuju ridha Allah dan surga-Nya.'
      }
    ]
  }
];
