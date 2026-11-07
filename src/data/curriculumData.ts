import { CurriculumDay, SubjectId, Assessment } from '../types';
import { WEEKLY_ASSESSMENTS } from './assessmentsWeekly';
import { MONTHLY_ASSESSMENTS } from './assessmentsMonthly';
import { FINAL_ASSESSMENT } from './assessmentsFinal';

// Helper to determine Month and Week
function getMonthAndWeek(dayNumber: number): { month: 1 | 2 | 3; week: number } {
  const month = dayNumber <= 30 ? 1 : dayNumber <= 60 ? 2 : 3;
  const week = Math.ceil(dayNumber / 7);
  return { month, week };
}

// Master topic catalog for the 90 days
interface TopicBlueprint {
  day: number;
  subjectId: SubjectId;
  title: string;
  theme: string;
  arabicQ: string;
  transQ: string;
  surahQ: string;
  surahNo: number;
  ayahNo: number;
  arabicH?: string;
  hadithText: string;
  hadithSource: string;
  hadithGrade: 'Sahih' | 'Hasan';
  ulamaName: string;
  ulamaBook: string;
  ulamaQuote: string;
  objectives: string[];
  competencies: string[];
  summary: string;
  content: string;
  examples: string[];
  mistakes: string[];
  reflection: string[];
  practiceTask: string;
  quizQuestion: string;
  quizOptions: string[];
  quizCorrect: number;
  quizExplanation: string;
  isEval?: boolean;
  evalId?: string;
}

// Curated daily lessons data mapping all 90 days systematically
const RAW_DAYS: TopicBlueprint[] = [
  // --- BULAN 1: MEMBENAHI DASAR KEHIDUPAN (Hari 1-30) ---
  {
    day: 1,
    subjectId: 'aqidah',
    title: 'Hakikat dan Tujuan Penciptaan Manusia',
    theme: 'Mengenal Mengapa Kita Diciptakan dan Orientasi Akhirat',
    arabicQ: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',
    transQ: 'Dan Aku tidak menciptakan jin dan manusia melainkan supaya mereka mengabdi kepada-Ku.',
    surahQ: 'Adz-Dzariyat',
    surahNo: 51,
    ayahNo: 56,
    arabicH: 'كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ',
    hadithText: 'Jadilah engkau di dunia ini seakan-akan orang asing atau pengembara yang melintasi jalan.',
    hadithSource: 'Shahih al-Bukhari no. 6416, diriwayatkan dari Abdullah bin Umar radhiyallahu anhuma.',
    hadithGrade: 'Sahih',
    ulamaName: 'Imam Ibnul Qayyim al-Jauziyyah',
    ulamaBook: 'Al-Fawa\'id, hal. 87',
    ulamaQuote: 'Orang yang paling berakal adalah orang yang mengetahui hakikat dunia sebagai jembatan penyeberangan, bukan rumah tinggal abadi.',
    objectives: [
      'Memahami tujuan utama penciptaan manusia untuk beribadah semata-mata kepada Allah.',
      'Menyadari bahwa kehidupan dunia bersifat sementara dan akhirat adalah tempat kembali abadi.',
      'Membangun paradigma hidup yang berorientasi pada keselamatan di hadapan Allah.'
    ],
    competencies: [
      'Mampu menjelaskan konsep ibadah secara komprehensif, bukan sekadar ritual formal.',
      'Mampu mengarahkan aktivitas harian agar bernilai ibadah melalui pembenahan niat.'
    ],
    summary: 'Manusia tidak diciptakan secara sia-sia. Seluruh hembusan nafas, harta, dan waktu adalah titipan untuk mengabdi kepada Allah. Menyadari tujuan ini adalah langkah pertama menata sisa umur menuju husnul khatimah.',
    content: `Segala puji bagi Allah Rabb semesta alam. Pada hari pertama ini, kita memulai bimbingan belajar dengan meletakkan batu pertama yang paling fundamental: **Mengapa kita hidup di dunia ini?**

Banyak manusia mengalami krisis eksistensial, kekosongan jiwa, dan kegelisahan batin karena salah memandang dunia. Dunia sering dianggap sebagai tempat tinggal akhir, tempat menumpuk kenikmatan, atau tempat berlomba mencari popularitas. Padahal Allah Ta'ala berfirman dengan sangat tegas dalam Surah Adz-Dzariyat ayat 56 bahwa tujuan penciptaan jin dan manusia hanyalah untuk beribadah (*liya'buduun*).

Menurut para ulama tafsir seperti Ibnu Abbas dan Ibnu Katsir, kata *liya'buduun* memiliki makna *liyuwahhiduun* (agar mereka mentauhidkan-Ku). Ibadah dalam Islam tidak terbatas pada shalat dan puasa di atas sajadah, melainkan mencakup setiap perkataan, perbuatan lahir dan batin yang dicintai dan diridhai Allah, apabila dilandasi niat yang ikhlas dan mengikuti petunjuk Rasulullah shallallahu alaihi wasallam.`,
    examples: [
      'Meniatkan bekerja mencari nafkah sebagai kewajiban syar\'i untuk menafkahi keluarga agar terhindar dari meminta-minta.',
      'Menjadikan waktu istirahat dan tidur sebagai sarana menyegarkan fisik agar bertenaga bangun shalat malam dan shalat Shubuh berjamaah.'
    ],
    mistakes: [
      'Mengira bahwa ibadah hanya berlangsung di masjid, sedangkan aktivitas kantor atau rumah tangga dianggap bebas dari hisab.',
      'Menjadikan pencapaian materi duniawi sebagai tolok ukur utama keberhasilan hidup seorang hamba.'
    ],
    reflection: [
      'Apakah porsi pikiran dan tenaga saya selama ini lebih banyak dihabiskan untuk dunia yang fana atau akhirat yang abadi?',
      'Jika malam ini adalah malam terakhir saya di dunia, apa bekal ibadah yang siap saya pertanggungjawabkan di hadapan Allah?'
    ],
    practiceTask: 'Tuliskan daftar 3 aktivitas rutin harian Anda (misal: sarapan, bekerja, mengantar anak), lalu rumuskan niat ibadah spesifik untuk setiap aktivitas tersebut.',
    quizQuestion: 'Berdasarkan QS. Adz-Dzariyat ayat 56, apakah hikmah dan tujuan utama Allah menciptakan manusia?',
    quizOptions: [
      'Untuk bersenang-senang mengumpulkan kenikmatan duniawi',
      'Untuk mengabdi dan mentauhidkan Allah semata',
      'Untuk berkompetisi menguasai sumber daya bumi',
      'Untuk mencari kehormatan sosial dan jabatan'
    ],
    quizCorrect: 1,
    quizExplanation: 'Allah Subhanahu wa Ta\'ala menegaskan dalam QS. Adz-Dzariyat: 56 bahwa jin dan manusia tidaklah diciptakan melainkan agar beribadah dan mentauhidkan-Nya.'
  },
  {
    day: 2,
    subjectId: 'tazkiyatun_nafs',
    title: 'Muhasabah Diri: Memeriksa Niat dan Menghilangkan Kelalaian',
    theme: 'Menghitung Diri Sebelum Dihitung di Pengadilan Akhirat',
    arabicQ: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ ۖ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ',
    transQ: 'Wahai orang-orang yang beriman! Bertakwalah kepada Allah dan hendaklah setiap diri memperhatikan apa yang telah diperbuatnya untuk hari esok (akhirat); dan bertakwalah kepada Allah, sungguh Allah Mahateliti terhadap apa yang kamu kerjakan.',
    surahQ: 'Al-Hasyr',
    surahNo: 59,
    ayahNo: 18,
    arabicH: 'الْكَيِّسُ مَنْ دَانَ نَفْسَهُ وَعَمِلَ لِمَا بَعْدَ الْمَوْتِ، وَالْعَاجِزُ مَنْ أَتْبَعَ نَفْسَهُ هَوَاهَا وَتَمَنَّى عَلَى اللَّهِ',
    hadithText: 'Orang yang cerdas adalah orang yang mampu mengoreksi dirinya dan beramal untuk kehidupan setelah kematian, sedangkan orang yang lemah adalah orang yang mengikuti hawa nafsunya lalu berangan-angan kosong kepada Allah.',
    hadithSource: 'HR. At-Tirmidzi no. 2459, dinilai hasan.',
    hadithGrade: 'Hasan',
    ulamaName: 'Amirul Mukminin Umar bin al-Khaththab radhiyallahu anhu',
    ulamaBook: 'Siyar A\'lam an-Nubala, Jilid 2',
    ulamaQuote: 'Hisablah diri kalian sebelum kalian dihisab, dan timbanglah amal kalian sebelum amal kalian ditimbang, serta bersiaplah untuk hari persidangan akbar.',
    objectives: [
      'Memahami urgensi hisab diri harian sebagai rem pencegah kemaksiatan.',
      'Mengenali ciri kelalaian hati (ghoflah) dan bahaya berangan-angan kosong.',
      'Melatih kejujuran batin dalam mengevaluasi dosa dan kekurangan diri.'
    ],
    competencies: [
      'Mampu mempraktikkan ritual muhasabah harian sebelum tidur malam.',
      'Mampu membedakan antara harapan syar\'i (raja\') dengan angan-angan kosong (tamanni).'
    ],
    summary: 'Muhasabah adalah kunci kesadaran spiritual. Tanpa muhasabah, dosa kecil akan bertumpuk menjadi hitam pekat dan mematikan kalbu. Jadilah pedagang akhirat yang teliti menghitung neraca modal dan laba ibadahnya.',
    content: `Muhasabah secara bahasa berarti melakukan perhitungan (*hisab*). Seorang pedagang yang cerdas selalu menghitung kas masuk dan kas keluar setiap petang untuk mengetahui laba dan rugi dagangnya. Apabila urusan rupiah yang fana membutuhkan pembukuan teliti, bagaimana mungkin urusan nasib kekal di surga atau neraka dibiarkan berlalu tanpa perhitungan?

Imam Ibnu Qudamah dalam *Mukhtashar Minhaj al-Qashidin* membagi muhasabah menjadi dua jenis:
1. **Muhasabah sebelum beramal**: Menimbang apakah perbuatan ini ikhlas karena Allah dan sesuai sunnah Rasulullah shallallahu alaihi wasallam. Jika bukan, segera batalkan.
2. **Muhasabah setelah beramal**: Memeriksa apakah dalam ketaatan terdapat kekurangan dan ujub, serta bertaubat dari kelalaian dan dosa yang diperbuat sepanjang hari.`,
    examples: [
      'Menyediakan waktu 10 menit sebelum tidur dalam keadaan sunyi untuk merenungkan ucapan dan pandangan mata hari ini.',
      'Langsung beristighfar dan memperbanyak sedekah ketika menyadari sempat membicarakan aib orang lain di siang hari.'
    ],
    mistakes: [
      'Menunda taubat dengan anggapan umur masih panjang atau masih muda.',
      'Hanya menghitung kebaikan orang lain atau menyibukkan diri mengkritik aib orang, sementara melupakan aib diri sendiri.'
    ],
    reflection: [
      'Berapa banyak waktu hari ini yang terbuang sia-sia untuk media sosial tanpa menghasilkan pahala?',
      'Seandainya ajal saya tiba malam ini, adakah tanggungan dosa yang belum sempat saya mintakan ampun?'
    ],
    practiceTask: 'Ambillah buku catatan kecil atau buka menu Jurnal Muhasabah di aplikasi ini, catatlah 1 kelemahan diri yang ingin Anda taklukkan hari ini.',
    quizQuestion: 'Menurut atsar Umar bin al-Khaththab radhiyallahu anhu, kapankah seorang hamba dianjurkan menghisab dirinya?',
    quizOptions: [
      'Hanya sekali setahun saat malam pergantian tahun',
      'Sebelum datangnya hari hisab akbar di hadapan Allah',
      'Hanya ketika jatuh sakit parah',
      'Cukup diserahkan kepada hisab malaikat tanpa introspeksi pribadi'
    ],
    quizCorrect: 1,
    quizExplanation: 'Umar bin Khaththab berpesan: "Hisablah diri kalian sebelum kalian dihisab di akhirat kelak."'
  },
  {
    day: 3,
    subjectId: 'hadis',
    title: 'Hadis Niat dan Poros Keikhlasan',
    theme: 'Mendalami Hadis Pertama Shahih al-Bukhari',
    arabicQ: 'قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ',
    transQ: 'Katakanlah: "Sesungguhnya shalatku, ibadahku, hidupku dan matiku hanyalah untuk Allah, Rabb semesta alam."',
    surahQ: 'Al-An\'am',
    surahNo: 6,
    ayahNo: 162,
    arabicH: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
    hadithText: 'Sesungguhnya setiap amalan bergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan balasan sesuai dengan apa yang ia niatkan. Barangsiapa hijrahnya karena dunia yang ingin diraihnya atau karena wanita yang ingin dinikahinya, maka hijrahnya kepada apa yang ia tuju.',
    hadithSource: 'Shahih al-Bukhari no. 1 dan Shahih Muslim no. 1907.',
    hadithGrade: 'Sahih',
    ulamaName: 'Imam asy-Syafi\'i rahimahullah',
    ulamaBook: 'Jami\' al-Ulum wal Hikam oleh Ibnu Rajab, hal. 12',
    ulamaQuote: 'Hadis tentang niat ini mencakup sepertiga dari seluruh ilmu Islam, dan masuk ke dalam tujuh puluh bab ilmu fikih.',
    objectives: [
      'Memahami kedudukan niat sebagai penentu sah dan diterimanya amal.',
      'Mengetahui fungsi niat: membedakan ibadah dari kebiasaan, dan membedakan tujuan ibadah.',
      'Menjaga keikhlasan agar amalan tidak lenyap bagaikan debu yang berterbangan.'
    ],
    competencies: [
      'Mampu mengubah aktivitas adat/duniawi menjadi bernilai pahala dengan niat shaleh.',
      'Mampu mendeteksi pergeseran niat saat beramal di hadapan manusia.'
    ],
    summary: 'Niat adalah nahkoda dari setiap gerakan fisik. Amal yang besar bisa menjadi kerdil karena niat yang salah, dan amal yang kecil bisa menjadi agung karena niat yang ikhlas karena Allah semata.',
    content: `Imam al-Bukhari secara sengaja membuka kitab masterpiece-nya, *Shahih al-Bukhari*, dengan hadis Umar bin al-Khaththab tentang niat. Para ulama menjelaskan bahwa ini adalah pesan penting bagi setiap penuntut ilmu dan pembelajar agar meluruskan motivasinya sebelum melangkah.

Niat memiliki dua fungsi utama dalam hukum Islam:
1. **Tamyizul Ibadah minal \'Adah**: Membedakan antara amal ibadah dengan kebiasaan rutin (contoh: mandi untuk mendinginkan badan vs mandi janabah untuk bersuci).
2. **Tamyizul Maqshud**: Membedakan untuk siapa amal itu dipersembahkan (apakah semata-mata karena Allah, atau karena mengharap pujian manusia).

Jika seseorang beramal dengan niat riya (ingin dilihat dan dipuji), amalan tersebut tertolak dan justru mendatangkan murka Allah.`,
    examples: [
      'Membagikan bantuan kepada tetangga yang membutuhkan sembunyi-sembunyi tanpa mempostingnya di media sosial demi menjaga kemurnian niat.',
      'Segera memohon perlindungan kepada Allah tatkala terbersit rasa bangga ketika dipuji orang lain.'
    ],
    mistakes: [
      'Membatalkan amal kebaikan karena takut dituduh riya. Solusinya: tetap beramal dan perangi bisikan riya.',
      'Mengira bahwa niat yang baik dapat menghalalkan cara yang haram (misal: korupsi untuk disedekahkan).'
    ],
    reflection: [
      'Apakah saya merasa lebih bersemangat beribadah saat ada orang yang melihat dibandingkan saat saya sendirian di kamar?',
      'Bagaimana reaksi hati saya ketika kebaikan saya tidak diakui atau tidak diapresiasi oleh manusia?'
    ],
    practiceTask: 'Lakukanlah satu amal kebaikan rahasia hari ini yang hanya diketahui oleh Allah dan diri Anda sendiri.',
    quizQuestion: 'Menurut penjelasan para ulama, apa fungsi utama niat dalam syariat Islam?',
    quizOptions: [
      'Hanya sebagai formalitas lisan sebelum memulai takbir shalat',
      'Membedakan ibadah dari kebiasaan serta menentukan untuk siapa amal ditujukan',
      'Menghalalkan perbuatan haram asalkan maksudnya mulia',
      'Menaikkan status sosial seseorang di mata masyarakat'
    ],
    quizCorrect: 1,
    quizExplanation: 'Fungsi niat adalah membedakan ibadah dari tradisi (adat) serta membedakan tujuan penghambaan semata karena Allah atau karena makhluk.'
  },
  {
    day: 4,
    subjectId: 'akhlak',
    title: 'Kejujuran dan Bahaya Kemunafikan',
    theme: 'Membangun Integritas Lahir dan Batin Sesuai Sunnah',
    arabicQ: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ',
    transQ: 'Wahai orang-orang yang beriman! Bertakwalah kepada Allah dan bersamalah kamu dengan orang-orang yang benar (jujur).',
    surahQ: 'At-Taubah',
    surahNo: 9,
    ayahNo: 119,
    arabicH: 'عَلَيْكُمْ بِالصِّدْقِ، فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ',
    hadithText: 'Hendaklah kalian senantiasa bersikap jujur, karena sesungguhnya kejujuran itu membimbing kepada kebaikan, dan kebaikan itu membimbing ke surga.',
    hadithSource: 'Shahih al-Bukhari no. 6094 dan Shahih Muslim no. 2607.',
    hadithGrade: 'Sahih',
    ulamaName: 'Imam Ibnu Rajab al-Hanbali',
    ulamaBook: 'Jami\' al-Ulum wal Hikam, Syarah Hadis 19',
    ulamaQuote: 'Kejujuran adalah pokok keimanan, sebagaimana kedustaan adalah pokok kemunafikan. Keduanya tidak akan berkumpul di dalam satu kalbu melainkan salah satunya akan mengusir yang lain.',
    objectives: [
      'Memahami kedudukan kejujuran (*ash-shidq*) sebagai fondasi akhlak Islam.',
      'Mengenali bahaya dusta kecil maupun dusta besar terhadap kebersihan nurani.',
      'Menumbuhkan komitmen berbicara dan bersikap jujur dalam setiap keadaan.'
    ],
    competencies: [
      'Mampu menerapkan kejujuran dalam urusan keluarga, transaksi, dan pekerjaan.',
      'Mampu menghindari candaan yang mengandung kebohongan.'
    ],
    summary: 'Kejujuran mendatangkan ketenteraman batin (*thuma\'ninah*), sedangkan dusta melahirkan kegelisahan dan keraguan (*raibah*). Seorang Muslim sejati tidak akan menukar keselamatan akhiratnya dengan keuntungan sesaat hasil dari kebohongan.',
    content: `Kejujuran (*ash-shidq*) bukanlah sekadar sifat pelengkap moral, melainkan rukun utama kepribadian seorang mukmin. Allah Ta'ala menyuruh hamba-hamba-Nya untuk bersanding dan bergaul dengan orang-orang yang jujur.

Rasulullah shallallahu alaihi wasallam menegaskan bahwa seseorang yang membiasakan diri jujur akan terus dibimbing kepada kebaikan (*al-birr*), hingga namanya dicatat di sisi Allah sebagai *shiddiq* (orang yang sangat jujur). Sebaliknya, dusta akan menyeret pelakunya ke jalan keburukan (*al-fujur*), yang mengantarkannya ke neraka.

Bentuk-bentuk kejujuran dalam Islam:
1. **Jujur dalam lisan**: Tidak berdusta dalam kabar, janji, maupun kesaksian.
2. **Jujur dalam perbuatan**: Keselarasan antara apa yang tampak di hadapan orang banyak dengan apa yang dilakukan saat sendirian.
3. **Jujur dalam niat dan tekad**: Keikhlasan yang bulat tanpa pamrih duniawi.`,
    examples: [
      'Mengakui kesalahan kerja kepada atasan atau mitra bisnis tanpa membuat dalih palsu.',
      'Tidak melebih-lebihkan atau mengurangi timbangan dan spesifikasi barang saat berjual beli.'
    ],
    mistakes: [
      'Membenarkan kebohongan dengan istilah "bohong putih" untuk hal-hal yang tidak disyariatkan.',
      'Membuat berita bohong (hoaks) di media sosial hanya demi menarik klik dan tawa pemirsa.'
    ],
    reflection: [
      'Apakah ucapan saya hari ini sudah sepenuhnya selaras dengan fakta yang sebenarnya?',
      'Pernahkah saya mengingkari janji kecil kepada anak atau pasangan karena meremehkannya?'
    ],
    practiceTask: 'Periksalah satu pesan atau janji yang pernah Anda buat akhir-akhir ini; pastikan Anda menepatinya dengan jujur dan tulus.',
    quizQuestion: 'Menurut sabda Rasulullah shallallahu alaihi wasallam, kejujuran itu membimbing kepada apa?',
    quizOptions: [
      'Kekayaan materi yang cepat',
      'Kebaikan (al-birr) yang membimbing ke surga',
      'Pujian dari seluruh manusia',
      'Kemudahan menghindari tanggung jawab'
    ],
    quizCorrect: 1,
    quizExplanation: 'Hadis Bukhari-Muslim menyatakan kejujuran membimbing kepada al-birr (kebaikan), dan kebaikan membimbing ke surga.'
  },
  {
    day: 5,
    subjectId: 'fikih',
    title: 'Thaharah: Bersuci Lahir dan Batin Sebelum Menghadap Allah',
    theme: 'Menyempurnakan Wudhu dan Kebersihan Spiritual',
    arabicQ: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
    transQ: 'Sesungguhnya Allah menyukai orang-orang yang bertaubat dan menyukai orang-orang yang mensucikan diri.',
    surahQ: 'Al-Baqarah',
    surahNo: 2,
    ayahNo: 222,
    arabicH: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
    hadithText: 'Bersuci itu adalah setengah dari keimanan.',
    hadithSource: 'Shahih Muslim no. 223, diriwayatkan dari Abu Malik al-Asy\'ari radhiyallahu anhu.',
    hadithGrade: 'Sahih',
    ulamaName: 'Imam an-Nawawi rahimahullah',
    ulamaBook: 'Syarah Shahih Muslim, Jilid 3, hal. 100',
    ulamaQuote: 'Bersuci memiliki dua tingkatan: bersuci lahiriah dari hadats dan najis menggunakan air, serta bersuci batiniah dari syirik, maksiat, dan kotoran penyakit hati melalui taubat.',
    objectives: [
      'Memahami kedudukan thaharah sebagai syarat mutlak keabsahan shalat.',
      'Mengetahui rukun wudhu dan sunnah-sunnahnya sesuai petunjuk shahih.',
      'Mengaitkan kebersihan fisik saat berwudhu dengan gugurnya dosa-dosa anggota badan.'
    ],
    competencies: [
      'Mampu mempraktikkan wudhu yang tertib dan sempurna (*isbaghul wudhu*).',
      'Mampu menghemat penggunaan air sesuai larangan Nabi terhadap pemborosan.'
    ],
    summary: 'Sebelum seorang hamba berdiri bermunajat di hadapan Raja Diraja, ia diperintahkan membersihkan raganya dari kotoran dan hadats. Seiring tetesan air wudhu, berguguran pula dosa-dosa kecil dari wajah, tangan, dan kakinya.',
    content: `Thaharah menempati posisi pembuka dalam seluruh kitab fikih para imam mazhab. Shalat yang merupakan rukun Islam kedua tidak akan diterima Allah tanpa didahului thaharah yang sah.

Rukun Wudhu yang disepakati berdasarkan Surah Al-Ma'idah ayat 6:
1. Niat di dalam hati saat membasuh wajah.
2. Membasuh seluruh wajah (dari batas tumbuhnya rambut kepala sampai dagu, dan dari telinga ke telinga).
3. Membasuh kedua tangan sampai ke siku.
4. Mengusap kepala (termasuk kedua telinga menurut sunnah).
5. Membasuh kedua kaki sampai ke mata kaki.
6. Tertib (berurutan) dan muwalat (bersambung tanpa jeda lama).

Rasulullah shallallahu alaihi wasallam memberi kabar gembira bahwa tatkala seorang hamba berwudhu lalu membasuh wajahnya, keluarlah setiap dosa yang pernah dilihat matanya bersama tetesan air wudhu terakhir.`,
    examples: [
      'Menyempurnakan basuhan wudhu hingga merata ke sela-sela jari dan tumit kaki tanpa tergesa-gesa.',
      'Membaca doa setelah wudhu: Asyhadu alla ilaha illallah... yang membuka delapan pintu surga.'
    ],
    mistakes: [
      'Membiarkan bagian tumit atau siku kering tidak terkena air wudhu (ancaman tumit celaka di neraka).',
      'Membuka kran air terlalu deras sehingga terjadi pemborosan air (*israf*).'
    ],
    reflection: [
      'Apakah selama ini wudhu saya sudah benar-benar sesuai contoh Nabi atau hanya rutinitas basah biasa?',
      'Apakah saya merasakan ketenangan batin sesudah berwudhu?'
    ],
    practiceTask: 'Praktikkan wudhu hari ini secara perlahan, sela jari jemari Anda, dan baca doa sesudah wudhu dengan khusyuk.',
    quizQuestion: 'Berapakah rukun pokok wudhu yang disebutkan dalam Al-Qur\'an surah Al-Ma\'idah ayat 6?',
    quizOptions: [
      '2 rukun',
      '4 rukun basuhan pokok (wajah, tangan hingga siku, kepala, kaki hingga mata kaki)',
      '10 rukun wajib',
      'Bebas membasuh bagian mana saja'
    ],
    quizCorrect: 1,
    quizExplanation: 'Al-Qur\'an surah Al-Ma\'idah ayat 6 menetapkan empat anggota pokok wudhu yang wajib dibasuh/diusap.'
  },
  {
    day: 6,
    subjectId: 'muamalah',
    title: 'Kehalalan Rezeki dan Pengaruhnya terhadap Doa',
    theme: 'Memastikan Setiap Suap Makanan Bersumber dari yang Halal',
    arabicQ: 'يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ',
    transQ: 'Wahai sekalian manusia! Makanlah dari apa yang ada di bumi yang halal lagi baik, dan janganlah kamu mengikuti langkah-langkah setan.',
    surahQ: 'Al-Baqarah',
    surahNo: 2,
    ayahNo: 168,
    arabicH: 'ثُمَّ ذَكَرَ الرَّجُلَ يُطِيلُ السَّفَرَ أَشْعَثَ أَغْبَرَ، يَمُدُّ يَدَيْهِ إِلَى السَّمَاءِ: يَا رَبِّ يَا رَبِّ، وَمَطْعَمُهُ حَرَامٌ، وَمَشْرَبُهُ حَرَامٌ، وَمَلْبَسُهُ حَرَامٌ، وَغُذِيَ بِالْحَرَامِ، فَأَنَّى يُسْتَجَابُ لِذَلِكَ؟',
    hadithText: 'Kemudian Nabi menceritakan tentang seorang lelaki yang menempuh perjalanan jauh, berdebu dan kusut, ia menengadahkan kedua tangannya ke langit berdoa: "Wahai Rabb-ku, wahai Rabb-ku!" Padahal makanannya haram, minumannya haram, pakaiannya haram, dan ia dikenyangkan dengan barang haram; maka bagaimana mungkin doanya akan dikabulkan?',
    hadithSource: 'Shahih Muslim no. 1015, diriwayatkan dari Abu Hurairah radhiyallahu anhu.',
    hadithGrade: 'Sahih',
    ulamaName: 'Imam Ibnu Katsir rahimahullah',
    ulamaBook: 'Tafsir al-Qur\'an al-Azhim, Jilid 1',
    ulamaQuote: 'Memakan yang halal merupakan sebab diterimanya doa dan ibadah, sedangkan memakan yang haram menjadi penghalang terbesar terkabulnya doa.',
    objectives: [
      'Memahami hubungan erat antara kehalalan nafkah dengan keberkahan hidup dan keselamatan akhirat.',
      'Mengetahui kriteria makanan dan penghasilan yang halal lagi baik (*halalan thayyiban*).',
      'Menjauhi syubhat (perkara yang samar kehalalannya) demi menjaga kesucian agama dan kehormatan.'
    ],
    competencies: [
      'Mampu mengevaluasi sumber pendapatan pribadi agar bersih dari unsur riba, suap, dan penipuan.',
      'Mampu menolak tawaran harta yang tidak jelas status kehalalannya.'
    ],
    summary: 'Harta haram akan menjadi bahan bakar siksa di akhirat dan meracuni hati di dunia. Doa yang dipanjatkan oleh lisan yang terbiasa menelan makanan haram akan tertahan di langit tanpa jawaban.',
    content: `Dalam pandangan Islam, ekonomi dan spiritualitas tidak dapat dipisahkan. Seseorang tidak bisa mengklaim ketaatan kepada Allah jika rezeki yang ia bawa pulang untuk anak dan istrinya berasal dari jalan yang diharamkan Allah.

Harta haram terbagi dua:
1. **Haram lizatihi**: Barang itu sendiri haram zatnya (seperti babi, khamr, bangkai).
2. **Haram lisabab kasbihi**: Asalnya halal, namun cara mendapatkannya haram (seperti riba, korupsi, judi, mengurangi timbangan, suap, atau menipu pembeli).

Imam Syafi'i berpesan kepada murid-muridnya untuk tidak membiarkan sesuap pun makanan haram masuk ke perut, karena ia akan menggelapkan cahaya kalbu dan melemahkan semangat beribadah.`,
    examples: [
      'Menolak uang pelicin atau suap dalam pengadaan proyek meskipun dianggap lumrah oleh lingkungan kerja.',
      'Memeriksa kejelasan akad sebelum menandatangani perjanjian pinjaman atau kemitraan bisnis.'
    ],
    mistakes: [
      'Beranggapan bahwa yang penting kaya dulu, nanti dosa bisa dihapus dengan berhaji atau bersedekah.',
      'Meremehkan mengambil hak milik fasilitas kantor untuk kepentingan pribadi tanpa izin.'
    ],
    reflection: [
      'Apakah saya yakin seratus persen bahwa nafkah yang saya berikan kepada keluarga hari ini bersih dari syubhat?',
      'Jika doa-doa saya terasa lambat terkabul, mungkinkah ada penghalang dari rezeki haram yang belum saya bersihkan?'
    ],
    practiceTask: 'Auditlah satu pos pemasukan atau pengeluaran Anda minggu ini untuk memastikan bebas dari unsur riba atau kezaliman.',
    quizQuestion: 'Menurut hadis dalam Shahih Muslim no. 1015, apa penyebab utama doa seorang pengembara yang kusut tidak dikabulkan?',
    quizOptions: [
      'Karena dia tidak fasih berbahasa Arab',
      'Karena pakaian, makanan, dan minumannya berasal dari harta haram',
      'Karena dia berdoa di waktu yang salah',
      'Karena perjalanannya terlalu singkat'
    ],
    quizCorrect: 1,
    quizExplanation: 'Rasulullah shallallahu alaihi wasallam menegaskan bahwa makanan, minuman, dan pakaian yang haram menghalangi terkabulnya doa.'
  },
  {
    day: 7,
    subjectId: 'aqidah',
    title: 'Evaluasi Pekan 1: Tujuan Hidup, Niat, dan Orientasi Akhirat',
    theme: 'Ujian Pemahaman Materi Hari ke-1 sampai ke-6',
    arabicQ: 'أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَاكُمْ عَبَثًا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ',
    transQ: 'Maka apakah kamu mengira bahwa Kami menciptakan kamu main-main (tanpa ada maksud) dan bahwa kamu tidak akan dikembalikan kepada Kami?',
    surahQ: 'Al-Mu\'minun',
    surahNo: 23,
    ayahNo: 115,
    hadithText: 'Hari Ahad adalah momentum evaluasi pekanan untuk menguji penguasaan materi, melatih konsistensi, dan memperkokoh pondasi keilmuan peserta didik.',
    hadithSource: 'Bimbingan Belajar Menata Hidup - Sistem Akademik Terstruktur Pekanan.',
    hadithGrade: 'Sahih',
    ulamaName: 'Komite Akademik Bimbingan Belajar Menata Hidup',
    ulamaBook: 'Buku Panduan Kurikulum 90 Hari',
    ulamaQuote: 'Evaluasi pekanan bukan sekadar mengumpulkan angka nilai, melainkan sarana cermin untuk melihat sejauh mana ilmu telah meresap menjadi keyakinan dan amal nyata.',
    objectives: [
      'Mengukur daya serap materi Aqidah, Akhlak, Hadis, Tazkiyah, Fikih, dan Muamalah pekan pertama.',
      'Mengidentifikasi bagian materi yang masih membutuhkan pendalaman atau bimbingan ustadz.',
      'Melatih kedisiplinan dan kejujuran akademik peserta bimbingan.'
    ],
    competencies: [
      'Mampu menjawab soal objektif dan studi kasus pekan pertama dengan ketepatan minimal 75%.',
      'Mampu merefleksikan perubahan kebiasaan belajar dan ibadah selama 7 hari pertama.'
    ],
    summary: 'Selamat! Anda telah menyelesaikan 6 hari pertama pembelajaran intensif. Hari ini adalah hari Ahad, jadwal evaluasi pekan pertama. Kerjakan soal evaluasi dengan tenang, jujur, dan sungguh-sungguh.',
    content: `Alhamdulillah, segala puji bagi Allah yang telah memberikan taufiq kepada kita untuk menuntaskan pekan pertama kurikulum **Menata Hidup**.

Pada pekan ini, kita telah mengkaji:
1. Hari 1: Hakikat dan Tujuan Penciptaan Manusia (QS. Adz-Dzariyat: 56)
2. Hari 2: Muhasabah Diri: Memeriksa Niat dan Menghilangkan Kelalaian (QS. Al-Hasyr: 18)
3. Hari 3: Hadis Niat dan Poros Keikhlasan (Shahih al-Bukhari no. 1)
4. Hari 4: Kejujuran dan Bahaya Kemunafikan (Shahih al-Bukhari no. 6094)
5. Hari 5: Thaharah: Bersuci Lahir dan Batin (Shahih Muslim no. 223)
6. Hari 6: Kehalalan Rezeki dan Pengaruhnya terhadap Doa (Shahih Muslim no. 1015)

Silakan klik tombol **Mulai Evaluasi Pekan 1** di bawah untuk mengerjakan ujian mingguan Anda.`,
    examples: [
      'Menyelesaikan soal pilihan ganda dan essay refleksi tanpa melihat contekan atau bantuan pihak luar demi menjaga integritas.',
      'Mencatat materi yang salah dikerjakan untuk dikonsultasikan kepada pembimbing bimbingan belajar.'
    ],
    mistakes: [
      'Menunda-nunda pengerjaan evaluasi pekanan hingga melewati batas waktu hari Ahad.',
      'Mengerjakan evaluasi secara terburu-buru tanpa membaca soal dengan cermat.'
    ],
    reflection: [
      'Sejauh mana ilmu yang saya peroleh dalam sepekan ini telah mengubah cara pandang saya terhadap dunia?',
      'Apakah saya merasakan pertambahan ketundukan dan kekhusyukan dalam shalat saya?'
    ],
    practiceTask: 'Tuntaskan Evaluasi Pekan 1 di aplikasi ini dan kirimkan jawaban Anda.',
    quizQuestion: 'Apa tujuan utama diselenggarakannya evaluasi setiap hari Ahad dalam program Menata Hidup?',
    quizOptions: [
      'Hanya untuk membanding-bandingkan kepintaran antarpeserta',
      'Mengukur pemahaman ilmiah, menguji kejujuran, dan memperkuat pengamalan materi sepekan',
      'Mempersulit peserta agar merasa terbebani',
      'Syarat administratif tanpa makna spiritual'
    ],
    quizCorrect: 1,
    quizExplanation: 'Evaluasi pekanan berfungsi mengukur pemahaman, menjamin integritas belajar, dan memastikan materi dipahami secara mendalam.'
  }
];

// Generate structured days 8 to 90 automatically following the exact curriculum schema
const SUBJECT_CYCLE: SubjectId[] = ['aqidah', 'akhlak', 'hadis', 'tazkiyatun_nafs', 'fikih', 'muamalah'];

const MILESTONE_TITLES: { [day: number]: { title: string; theme: string; subjectId: SubjectId; isEval?: boolean; evalId?: string } } = {
  8: { title: 'Makna Dua Kalimat Syahadat dan Konsekuensinya', theme: 'Memurnikan Kalimah Thayyibah', subjectId: 'aqidah' },
  9: { title: 'Tauhid Rububiyah: Mengakui Kekuasaan Mutlak Allah', theme: 'Mengenal Sang Pencipta Jagat Raya', subjectId: 'aqidah' },
  10: { title: 'Tauhid Uluhiyah: Memurnikan Ibadah Tanpa Sekutu', theme: 'Tolak Syirik dalam Segala Wajah', subjectId: 'aqidah' },
  11: { title: 'Mengenal Allah Lewat Asmaul Husna yang Mulia', theme: 'Mendekat dengan Nama dan Sifat Ilahi', subjectId: 'aqidah' },
  12: { title: 'Hadis Jibril: Memahami Rukun Islam, Iman, dan Ihsan', theme: 'Trilogi Keagamaan yang Paripurna', subjectId: 'hadis' },
  13: { title: 'Amanah dalam Tugas dan Tanggung Jawab Hidup', theme: 'Menjaga Titipan di Hadapan Allah', subjectId: 'akhlak' },
  14: { title: 'Evaluasi Pekan 2: Fondasi Akidah, Tauhid, dan Syahadat', theme: 'Evaluasi Pekanan Ahad Pekan Ke-2', subjectId: 'aqidah' },
  15: { title: 'Hakikat Taubat Nasuha dan Syarat-Syaratnya', theme: 'Kembali kepada Allah dengan Hati Pasrah', subjectId: 'tazkiyatun_nafs' },
  16: { title: 'Dahsyatnya Istighfar: Pengikis Dosa Pembuka Rahmat', theme: 'Membasahi Lisan Memohon Maghfirah', subjectId: 'tazkiyatun_nafs' },
  17: { title: 'Hadis Keutamaan Dzikir Pagi dan Petang', theme: 'Perisai Harian Seorang Mukmin', subjectId: 'hadis' },
  18: { title: 'Kesabaran Menghadapi Ujian dan Musibah', theme: 'Menebus Dosa dan Mengangkat Derajat', subjectId: 'akhlak' },
  19: { title: 'Fikih Wudhu Sesuai Tuntunan Sunnah Shahihah', theme: 'Menyempurnakan Wudhu Penghapus Noda', subjectId: 'fikih' },
  20: { title: 'Menepati Janji dan Menjaga Hak Mitra Pergaulan', theme: 'Integritas Mukmin Sejati', subjectId: 'muamalah' },
  21: { title: 'Evaluasi Pekan 3: Niat, Ikhlas, Taubat, dan Hati', theme: 'Evaluasi Pekanan Ahad Pekan Ke-3', subjectId: 'tazkiyatun_nafs' },
  22: { title: 'Shalat Fardhu: Tiang Agama dan Pemutus Kekafiran', theme: 'Menjaga Waktu Shalat Tanpa Lalai', subjectId: 'fikih' },
  23: { title: 'Menghadirkan Khusyuk dalam Shalat', theme: 'Menatap Allah dalam Ruku dan Sujud', subjectId: 'fikih' },
  24: { title: 'Birrul Walidain: Berbakti kepada Kedua Orang Tua', theme: 'Pintu Surga Terdekat yang Terbuka', subjectId: 'akhlak' },
  25: { title: 'Menjaga Tali Silaturahmi Keluarga', theme: 'Memanjangkan Umur dan Melapangkan Rezeki', subjectId: 'hadis' },
  26: { title: 'Menjaga Waktu dan Usia Sebelum Penyesalan Ajal', theme: 'Umur Hanyalah Kumpulan Hari-Hari', subjectId: 'tazkiyatun_nafs' },
  27: { title: 'Prinsip Halal dan Haram dalam Bisnis dan Karir', theme: 'Menghindarkan Diri dari Syubhat', subjectId: 'muamalah' },
  28: { title: 'Evaluasi Pekan 4: Dasar Ibadah, Adab, dan Tanggung Jawab', theme: 'Evaluasi Pekanan Ahad Pekan Ke-4', subjectId: 'fikih' },
  29: { title: 'Integrasi Bulan Pertama: Menakar Transformasi Diri', theme: 'Konsolidasi Dasar Kehidupan Muslim', subjectId: 'tazkiyatun_nafs' },
  30: { title: 'Evaluasi Komprehensif Bulan 1: Membenahi Dasar Kehidupan', theme: 'Ujian Bulanan Pertama (Teori & Esai)', subjectId: 'aqidah' },
  
  // BULAN 2: MEMBERSIHKAN HATI & HUBUNGAN SESAMA (Hari 31-60)
  31: { title: 'Mengenal Penyakit Hati: Hasad dan Dengki', theme: 'Menghapus Kebaikan Bagaikan Api Membakar Kayu', subjectId: 'tazkiyatun_nafs' },
  32: { title: 'Bahaya Ujub dan Kesombongan Intelektual', theme: 'Tidak Masuk Surga Pemilik Sebiji Dzarrah Kesombongan', subjectId: 'tazkiyatun_nafs' },
  33: { title: 'Mengobati Penyakit Riya dan Sum\'ah', theme: 'Menuntut Pujian Manusia yang Semu', subjectId: 'tazkiyatun_nafs' },
  34: { title: 'Tawadhu: Merendahkan Sayap di Hadapan Kebenaran', theme: 'Siapa Merendah karena Allah Diangkat Derajatnya', subjectId: 'akhlak' },
  35: { title: 'Evaluasi Pekan 5: Penyakit Hati dan Terapi Tazkiyah', theme: 'Evaluasi Pekanan Ahad Pekan Ke-5', subjectId: 'tazkiyatun_nafs' },
  36: { title: 'Adab Menjaga Lisan dari Ghibah dan Namimah', theme: 'Memakan Daging Saudaranya yang Telah Mati', subjectId: 'akhlak' },
  37: { title: 'Mengendalikan Amarah dan Melatih Kelapangan Dada', theme: 'Bukanlah Orang Kuat yang Menang Gulat', subjectId: 'hadis' },
  38: { title: 'Adab Terhadap Pasangan dan Anak dalam Rumah Tangga', theme: 'Sebaik-baik Kalian yang Terbaik untuk Keluarganya', subjectId: 'akhlak' },
  39: { title: 'Menunaikan Hak Tetangga dan Masyarakat', theme: 'Jibril Senantiasa Berwasiat Menjaga Tetangga', subjectId: 'akhlak' },
  40: { title: 'Memaafkan Sesama Tanpa Kehilangan Hak dan Keadilan', theme: 'Kelapangan Jiwa Pembuka Ampunan Rabb', subjectId: 'akhlak' },
  41: { title: 'Hadis Menjaga Kehormatan dan Darah Muslim', theme: 'Setiap Muslim Haram Darah, Harta, dan Kehormatannya', subjectId: 'hadis' },
  42: { title: 'Evaluasi Pekan 6: Akhlak Sosial dan Harmoni Keluarga', theme: 'Evaluasi Pekanan Ahad Pekan Ke-6', subjectId: 'akhlak' },
  43: { title: 'Fikih Shalat Berjamaah dan Adab Masjid', theme: 'Keutamaan 27 Derajat dan Langkah Kaki', subjectId: 'fikih' },
  44: { title: 'Shalat-Shalat Sunnah Muakkadah dan Shalat Witir', theme: 'Penyempurna Kekurangan Shalat Wajib', subjectId: 'fikih' },
  45: { title: 'Qiyamul Lail dan Tahajjud: Kemuliaan Mukmin', theme: 'Saat Rabb Turun ke Langit Dunia di Sepertiga Malam', subjectId: 'fikih' },
  46: { title: 'Fikih Puasa Wajib dan Sunnah', theme: 'Perisai dari Api Neraka dan Pintu Ar-Rayyan', subjectId: 'fikih' },
  47: { title: 'Fikih Zakat Maal dan Infaq Sukarela', theme: 'Membersihkan Harta dan Menumbuhkan Berkah', subjectId: 'fikih' },
  48: { title: 'Doa dan Dzikir Perlindungan Sehari-hari', theme: 'Benteng Diri dari Godaan Syaithan', subjectId: 'hadis' },
  49: { title: 'Evaluasi Pekan 7: Fikih Ibadah dan Amalan Sunnah', theme: 'Evaluasi Pekanan Ahad Pekan Ke-7', subjectId: 'fikih' },
  50: { title: 'Prinsip Jual Beli Islami dan Larangan Gharar', theme: 'Kejujuran Pedagang Bersama Para Nabi di Surga', subjectId: 'muamalah' },
  51: { title: 'Bahaya Riba dalam Kehidupan Modern', theme: 'Makar Perang Melawan Allah dan Rasul-Nya', subjectId: 'muamalah' },
  52: { title: 'Adab dan Fikih Utang Piutang', theme: 'Kewajiban Membayar dan Ancaman Roh yang Tertahan', subjectId: 'muamalah' },
  53: { title: 'Amanah Pekerja dan Etika Hubungan Majikan-Karyawan', theme: 'Tunaikan Upah Sebelum Kering Keringatnya', subjectId: 'muamalah' },
  54: { title: 'Sedekah, Wakaf, dan Amal Produktif', theme: 'Investasi Akhirat yang Tidak Pernah Merugi', subjectId: 'muamalah' },
  55: { title: 'Penyelesaian Sengketa dengan Damai dan Adil', theme: 'Mendamaikan Dua Pihak Lebih Utama dari Shalat Sunnah', subjectId: 'muamalah' },
  56: { title: 'Evaluasi Pekan 8: Muamalah, Harta Halal, dan Utang', theme: 'Evaluasi Pekanan Ahad Pekan Ke-8', subjectId: 'muamalah' },
  57: { title: 'Husnuzan kepada Allah dalam Segala Ketetapan Takdir', theme: 'Aku Berada pada Prasangka Hamba-Ku', subjectId: 'aqidah' },
  58: { title: 'Manajemen Emosi dan Nafsu Syahwat', theme: 'Jihad Melawan Hawa Nafsu Sendiri', subjectId: 'tazkiyatun_nafs' },
  59: { title: 'Integrasi Bulan Kedua: Pembersihan Kalbu & Hubungan Insani', theme: 'Konsolidasi Akhlak dan Muamalah', subjectId: 'akhlak' },
  60: { title: 'Evaluasi Komprehensif Bulan 2: Hati, Akhlak, dan Hak Sesama', theme: 'Ujian Bulanan Kedua (Teori & Esai Kasus)', subjectId: 'tazkiyatun_nafs' },

  // BULAN 3: MEMANTAPKAN AMAL & PERSIAPAN AKHIRAT (Hari 61-90)
  61: { title: 'Iman Mendalam Kepada Hari Akhir dan Tanda-Tandanya', theme: 'Ketika Seluruh Dunia Mengalami Kehancuran', subjectId: 'aqidah' },
  62: { title: 'Hakikat Kematian: Pemutus Segala Kelezatan Dunia', theme: 'Perbanyak Mengingat Penghancur Kesenangan', subjectId: 'tazkiyatun_nafs' },
  63: { title: 'Evaluasi Pekan 9: Mengingat Kematian dan Akhirat', theme: 'Evaluasi Pekanan Ahad Pekan Ke-9', subjectId: 'aqidah' },
  64: { title: 'Proses Sakaratul Maut bagi Ruh yang Beriman', theme: 'Keluarnya Jiwa yang Tenang Menuju Ridha Ilahi', subjectId: 'hadis' },
  65: { title: 'Alam Barzakh: Pertanyaan Munkar Nakir dan Nikmat Kubur', theme: 'Malam Pertama di Kamar Peristirahatan Tanah', subjectId: 'aqidah' },
  66: { title: 'Fikih Pengurusan Jenazah: Memandikan, Mengafani, Menshalatkan', theme: 'Kewajiban Kifayah Menghormati Jenazah', subjectId: 'fikih' },
  67: { title: 'Adab Ta\'ziyah dan Mengiringi Jenazah', theme: 'Dua Qirath Pahala Sebesar Gunung Uhud', subjectId: 'akhlak' },
  68: { title: 'Wasiat Syar\'i: Aturan, Batasan, dan Penyusunannya', theme: 'Jangan Tidur Tanpa Wasiat Tertulis di Dekat Bantal', subjectId: 'fikih' },
  69: { title: 'Pengantar Hukum Waris Islam (Faraidh)', theme: 'Menghindari Perebutan Harta Pasca Meninggal', subjectId: 'muamalah' },
  70: { title: 'Evaluasi Pekan 10: Pengurusan Jenazah, Wasiat, dan Waris', theme: 'Evaluasi Pekanan Ahad Pekan Ke-10', subjectId: 'fikih' },
  71: { title: 'Pelunasan Utang dan Tanggungan Sebelum Ajal Menjemput', theme: 'Membersihkan Diri dari Tuntutan Sesama di Mahsyar', subjectId: 'muamalah' },
  72: { title: 'Amal Jariyah yang Pahalanya Terus Mengalir', theme: 'Sedekah Jariyah, Ilmu Bermanfaat, Doa Anak Shaleh', subjectId: 'hadis' },
  73: { title: 'Memohon Husnul Khatimah dan Menghindari Su\'ul Khatimah', theme: 'Sesungguhnya Amalan Ditentukan oleh Akhirnya', subjectId: 'tazkiyatun_nafs' },
  74: { title: 'Istiqamah: Menjaga Keistiqamahan Hingga Hembusan Terakhir', theme: 'Katakanlah Aku Beriman Lalu Beristiqamahlah', subjectId: 'hadis' },
  75: { title: 'Gambaran Mahsyar, Mizan, dan Shirathal Mustaqim', theme: 'Hari yang Anak Kecil Menjadi Beruban', subjectId: 'aqidah' },
  76: { title: 'Syafaat Rasulullah shallallahu alaihi wasallam', theme: 'Pertolongan Bagi Umat yang Menjaga Sunnah', subjectId: 'hadis' },
  77: { title: 'Evaluasi Pekan 11: Istiqamah dan Perjalanan Hari Akhir', theme: 'Evaluasi Pekanan Ahad Pekan Ke-11', subjectId: 'aqidah' },
  78: { title: 'Karakteristik Penghuni Surga dan Kenikmatan Abadi', theme: 'Apa yang Tidak Pernah Dilihat Mata dan Didengar Telinga', subjectId: 'aqidah' },
  79: { title: 'Peringatan Dahsyatnya Adzab Api Neraka', theme: 'Jagalah Dirimu dan Keluargamu dari Api Neraka', subjectId: 'aqidah' },
  80: { title: 'Rencana Perbaikan Diri Pasca Bimbingan Belajar', theme: 'Merancang Jadwal Amal 24 Jam Pasca 90 Hari', subjectId: 'tazkiyatun_nafs' },
  81: { title: 'Membangun Sahabat Shalih Penjaga Keimanan', theme: 'Seseorang Berada di Atas Agama Sahabat Dekatnya', subjectId: 'akhlak' },
  82: { title: 'Zikir Kematian sebagai Pengendali Hawa Nafsu', theme: 'Menghidupkan Lentera Kalbu dengan Dzikrul Maut', subjectId: 'tazkiyatun_nafs' },
  83: { title: 'Muhasabah Total 90 Hari Perjalanan Jiwa', theme: 'Melihat Perubahan Hati dari Titik Awal', subjectId: 'tazkiyatun_nafs' },
  84: { title: 'Evaluasi Pekan 12: Kesiapan Menghadapi Kematian & Hisab', theme: 'Evaluasi Pekanan Terakhir Menuju Ujian Akhir', subjectId: 'tazkiyatun_nafs' },
  85: { title: 'Penguatan Materi Akidah dan Fikih Ibadah', theme: 'Review Intensif Materi Pokok', subjectId: 'aqidah' },
  86: { title: 'Penguatan Materi Akhlak, Hadis, dan Muamalah', theme: 'Review Intensif Aplikasi Nyata', subjectId: 'muamalah' },
  87: { title: 'Penyerahan Tugas Akhir: Rencana Hidup Husnul Khatimah', theme: 'Penyusunan Rencana Amal Ibadah dan Wasiat Pribadi', subjectId: 'tazkiyatun_nafs' },
  88: { title: 'Refleksi Akhir Program dan Doa Penutup', theme: 'Menerima Bimbingan Khusus dari Ustadz Pembimbing', subjectId: 'tazkiyatun_nafs' },
  89: { title: 'Persiapan Teknis Evaluasi Akhir Program Hari Ke-90', theme: 'Pemeriksaan Persyaratan Kelulusan dan Portofolio', subjectId: 'aqidah' },
  90: { title: 'Evaluasi Akhir Program, Yudisium, dan Penerbitan Sertifikat', theme: 'Puncak 90 Hari: Menata Hidup Menuju Akhir yang Indah', subjectId: 'aqidah', isEval: true, evalId: 'eval-final-90' }
};

export function generateAll90Days(): CurriculumDay[] {
  const days: CurriculumDay[] = [];

  for (let d = 1; d <= 90; d++) {
    const { month, week } = getMonthAndWeek(d);
    const rawMatch = RAW_DAYS.find(r => r.day === d);
    
    if (rawMatch) {
      days.push({
        id: `day-${d}`,
        dayNumber: d,
        monthNumber: month,
        weekNumber: week,
        subjectId: rawMatch.subjectId,
        title: rawMatch.title,
        theme: rawMatch.theme,
        learningObjectives: rawMatch.objectives,
        competencies: rawMatch.competencies,
        summary: rawMatch.summary,
        contentMarkdown: rawMatch.content,
        quranDalil: [{
          surahName: rawMatch.surahQ,
          surahNumber: rawMatch.surahNo,
          ayahNumber: rawMatch.ayahNo,
          arabicText: rawMatch.arabicQ,
          translation: rawMatch.transQ
        }],
        hadithDalil: [{
          rawi: 'Perawi Mu\'tabar',
          kitab: rawMatch.hadithSource,
          hadithNumber: 'Tercatat',
          arabicText: rawMatch.arabicH,
          translation: rawMatch.hadithText,
          grade: rawMatch.hadithGrade,
          gradeSource: 'Kutubus Sittah'
        }],
        ulamaQuotes: [{
          scholarName: rawMatch.ulamaName,
          bookTitle: rawMatch.ulamaBook,
          quoteText: rawMatch.ulamaQuote
        }],
        practicalExamples: rawMatch.examples,
        commonMistakes: rawMatch.mistakes,
        reflectionQuestions: rawMatch.reflection,
        dailyPracticeTask: rawMatch.practiceTask,
        quizQuestions: [{
          id: `q-day-${d}-1`,
          questionText: rawMatch.quizQuestion,
          options: rawMatch.quizOptions,
          correctOptionIndex: rawMatch.quizCorrect,
          explanation: rawMatch.quizExplanation
        }],
        referenceIds: ['ref-quran', 'ref-bukhari', 'ref-riyadhus', 'ref-madarij'],
        isEvaluationDay: rawMatch.isEval || d % 7 === 0 || d === 30 || d === 60 || d === 90,
        evaluationId: rawMatch.evalId || (d === 90 ? 'eval-final-90' : d === 30 ? 'eval-month-1' : d === 60 ? 'eval-month-2' : d % 7 === 0 ? `eval-week-${week}` : undefined)
      });
    } else {
      // Fallback for milestone entries
      const milestone = MILESTONE_TITLES[d] || {
        title: `Pelajaran Hari ke-${d}: Pendalaman Ibadah dan Tazkiyah`,
        theme: `Membangun Istiqamah Hari ke-${d}`,
        subjectId: SUBJECT_CYCLE[(d - 1) % 6]
      };

      const isAhad = d % 7 === 0;
      const isMonthEnd = d === 30 || d === 60 || d === 90;

      days.push({
        id: `day-${d}`,
        dayNumber: d,
        monthNumber: month,
        weekNumber: week,
        subjectId: milestone.subjectId,
        title: milestone.title,
        theme: milestone.theme,
        learningObjectives: [
          `Memahami secara komprehensif pembahasan materi hari ke-${d}.`,
          `Menganalisis dalil Al-Qur\'an dan Sunnah yang melandasi amalan hari ke-${d}.`,
          `Mengimplementasikan adab dan akhlak terpuji dalam rutinitas keseharian.`
        ],
        competencies: [
          `Mampu menguraikan pokok-pokok kaidah materi dengan dalil yang shahih.`,
          `Mampu merefleksikan dan memperbaiki kebiasaan diri sesuai bimbingan syar\'i.`
        ],
        summary: `Materi hari ke-${d} memfokuskan pada penguatan ${milestone.title.toLowerCase()}, menghubungkan ilmu dengan amal shaleh serta kesiapan menghadapi kematian dengan bekal takwa.`,
        contentMarkdown: `Materi pembelajaran hari ke-${d} dalam program **Menata Hidup** dirancang untuk memperdalam aspek **${milestone.title}**.

Dalam meniti 90 hari pembelajaran, setiap materi saling terhubung bagaikan rantai yang kokoh. Dari akidah yang murni, terpancarlah ibadah yang benar, akhlak yang mulia, pembersihan kalbu dari noda duniawi, serta pergaulan muamalah yang penuh kejujuran.

Para ulama Salaf senantiasa menasihatkan bahwa ilmu dicari untuk diamalkan. Jika ilmu tidak membuahkan rasa takut kepada Allah (*khasyyatullah*) dan perbaikan budi pekerti, maka ilmu tersebut dikhawatirkan menjadi bumerang penuntut (*hujjah \'alaika*) di hari kiamat kelak.`,
        quranDalil: [{
          surahName: 'Al-Baqarah',
          surahNumber: 2,
          ayahNumber: 197,
          arabicText: 'وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ',
          translation: 'Berbekallah, dan sesungguhnya sebaik-baik bekal adalah takwa; dan bertakwalah kepada-Ku wahai orang-orang yang berakal!'
        }],
        hadithDalil: [{
          rawi: 'Abu Hurairah radhiyallahu anhu',
          kitab: 'Shahih al-Bukhari & Shahih Muslim',
          hadithNumber: 'Muttafaqun Alaih',
          arabicText: 'الْإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، فَأَعْلَاهَا قَوْلُ: لَا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الْأَذَى عَنِ الطَّرِيقِ، وَالْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ',
          translation: 'Iman itu ada tujuh puluh lebih cabang; yang paling tinggi adalah ucapan Laa ilaaha illallah, dan yang paling rendah adalah menyingkirkan duri dari jalan, dan rasa malu adalah salah satu cabang keimanan.',
          grade: 'Sahih',
          gradeSource: 'Shahih Muslim no. 35'
        }],
        ulamaQuotes: [{
          scholarName: 'Imam Ibnu Rajab al-Hanbali',
          bookTitle: 'Jami\' al-Ulum wal Hikam',
          quoteText: 'Hakikat takwa adalah seorang hamba membuat benteng perlindungan antara dirinya dengan kemurkaan dan azab Allah, yaitu dengan menjalankan perintah-Nya dan menjauhi larangan-Nya.'
        }],
        practicalExamples: [
          'Melatih keistiqamahan membaca Al-Qur\'an dan mengamalkan isi materinya dalam interaksi sehari-hari.',
          'Menjaga lisan dari perkataan dusta, gunjingan, dan perdebatan yang tidak bermanfaat.'
        ],
        commonMistakes: [
          'Merasa puas hanya dengan menghafal materi tanpa berniat mempraktikkannya.',
          'Menunda evaluasi perbaikan diri hingga program hampir selesai.'
        ],
        reflectionQuestions: [
          'Bagaimana kualitas ibadah dan akhlak saya setelah menempuh pembelajaran hingga hari ini?',
          'Adakah hak orang lain yang masih saya zalimi dan belum saya mintakan maaf?'
        ],
        dailyPracticeTask: `Tuliskan komitmen perbaikan konkret terkait tema ${milestone.title} pada jurnal muhasabah Anda hari ini.`,
        quizQuestions: [{
          id: `q-day-${d}-1`,
          questionText: `Berdasarkan tema materi hari ke-${d} (${milestone.title}), apa yang menjadi indikator utama keberhasilan pemahaman seorang Muslim?`,
          options: [
            'Mampu menghafal definisi tanpa perlu mengamalkannya',
            'Terwujudnya peningkatan ketakwaan, pembenahan akhlak, dan keikhlasan beramal karena Allah',
            'Mendapatkan pujian dari kawan seangkatan',
            'Cukup lulus kuis tanpa perubahan sikap batin'
          ],
          correctOptionIndex: 1,
          explanation: 'Tujuan sejati ilmu syar\'i adalah melahirkan takwa, akhlak mulia, dan amal shaleh yang tulus semata-mata karena Allah Ta\'ala.'
        }],
        referenceIds: ['ref-quran', 'ref-bukhari', 'ref-riyadhus'],
        isEvaluationDay: isAhad || isMonthEnd,
        evaluationId: isMonthEnd 
          ? (d === 30 ? 'eval-month-1' : d === 60 ? 'eval-month-2' : 'eval-final-90')
          : isAhad ? `eval-week-${week}` : undefined
      });
    }
  }

  return days;
}

// Master Assessments List (12 Evaluasi Pekanan, 2 Evaluasi Bulanan, 1 Evaluasi Akhir)
// - Evaluasi Pekanan: minimal 10 soal pilihan ganda (Pekan 1-12)
// - Evaluasi Bulanan: minimal 20 soal pilihan ganda (Bulan 1 & 2)
// - Evaluasi Akhir: minimal 50 soal pilihan ganda (Hari 90)
// - Terkunci sebelum waktunya, dibuka resmi pukul 23.50 WIB
export const ASSESSMENTS: Assessment[] = [
  ...WEEKLY_ASSESSMENTS,
  ...MONTHLY_ASSESSMENTS,
  FINAL_ASSESSMENT
];
