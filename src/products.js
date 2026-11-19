/**
 * products.js — katalog konten awal Museum of Almost.
 *
 * Di arsitektur yang diminta, file ini berperan sebagai "data products" museum:
 * kategori, 8 arsip contoh, dan 4 periode timeline. Semua teks bersifat ilustratif.
 *
 * imageUrl sengaja kosong agar tidak bergantung pada aset eksternal. Jika aset
 * lokal ditambahkan kemudian (mis. /images/congklak.svg), isi field ini dan
 * ui.js tetap menyediakan fallback placeholder bila gambar gagal dimuat.
 */

export const CATEGORIES = Object.freeze([
  'Cultural Heritage',
  'Childhood Memories',
  'Forgotten Sounds',
  'Traditional Food',
  'Lost Places',
  'Everyday Life',
]);

export const CATEGORY_INITIALS = Object.freeze({
  'Cultural Heritage': 'CH',
  'Childhood Memories': 'CM',
  'Forgotten Sounds': 'FS',
  'Traditional Food': 'TF',
  'Lost Places': 'LP',
  'Everyday Life': 'EL',
});

export const OPENING_QUESTION =
  'If everything disappeared tomorrow, what would you wish we had saved today?';

export const TAGLINE = 'Not everything lost was meant to be forgotten.';

export const SEED_ARCHIVES = Object.freeze([
  {
    id: 'arc_congklak',
    title: 'Congklak di Teras Rumah',
    category: 'Cultural Heritage',
    description:
      'Dua baris lubang di papan kayu, segenggam kerang, dan sore yang tidak pernah terasa cukup panjang.',
    origin: 'Jawa',
    period: '1990-an',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Permainan Tradisional',
    historicalValue:
      'Papan yang sering dipukul itu menyimpan cara sebuah keluarga mengajarkan sabar tanpa pernah mengatakannya.',
    featured: true,
    createdAt: '2026-01-08T07:15:00.000Z',
    story:
      'Papan congklak itu selalu diletakkan di teras, dekat pintu yang tidak pernah dikunci. Kerangnya disimpan dalam kaleng biskuit, berdenting setiap kali diaduk sebelum permainan dimulai.\n\nAnak-anak duduk bersila, bergantian memasukkan biji ke lubang satu per satu.Aturan harus dihafal, bukan dibaca. Yang kalah tertawa, yang menang diminta mengalah pada adik yang lebih kecil.\n\nKini papan itu masih ada, meski kerangnya tidak lagi lengkap. Ia menjadi pengingat bahwa pernah ada waktu ketika hiburan cukup dari tangan, tanah, dan suara berdenting.',
    source: 'seed',
    contributionId: null,
  },
  {
    id: 'arc_es_cendol',
    title: 'Suara Kakek Penjual Es Cendol',
    category: 'Forgotten Sounds',
    description:
      'Kelincingan mangkuk kaca dan lonceng kecil yang menandai sore di gang sempit Bandung.',
    origin: 'Bandung',
    period: '2004',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Rekaman Suara',
    historicalValue:
      'Suara itu bukan sekadar dagangan; ia adalah penanda waktu bagi seluruh lingkungan sebelum jam tangan menjadi penting.',
    featured: false,
    createdAt: '2026-01-09T09:40:00.000Z',
    story:
      'Loncengnya lebih dulu terdengar daripada gerobaknya. Dari ujung gang, kakek itu mendorong peralatan kayu dengan mangkuk kaca bersusun, berhenti di setiap pintu yang terbuka.\n\nEs cendolnya hangat-manis, santannya tidak pernah terlalu encer. Anak-anak mengenali langkahnya lebih cepat daripada mengenali wajah tetangga baru.\n\nRekaman ini dibayangkan kembali dari ingatan, bukan dari arsip audio resmi. Yang tersisa dari suara itu adalah cara ia menenangkan sebuah sore.',
    source: 'seed',
    contributionId: null,
  },
  {
    id: 'arc_rendang',
    title: 'Bumbu Rendang Nenek',
    category: 'Traditional Food',
    description:
      'Resep yang tidak pernah ditulis, diukur dari segenggam tangan dan lamanya api kecil di dapur.',
    origin: 'Minangkabau',
    period: 'turun-temurun',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Resep Keluarga',
    historicalValue:
      'Rendang mengajarkan bahwa beberapa pengetahuan hanya bisa diwariskan dengan berdiri di samping orang yang memasak.',
    featured: true,
    createdAt: '2026-01-10T06:05:00.000Z',
    story:
      'Tidak ada takaran sendok dalam resep ini. Nenek menyebutnya "seperlunya", lalu menambah lagi ketika warna bumbu belum mencapai cokelat yang ia maksud.\n\nKelapa parut dimasak perlahan sampai minyaknya keluar sendiri. Siapa yang sabar, ia berkata, akan mendapat rendang yang tidak cepat habis.\n\nCatatan ini ditulis ulang dari kebiasaan dapur, bukan dari buku resep. Nilainya terletak pada ritual mengaduk, bukan pada daftar bahan.',
    source: 'seed',
    contributionId: null,
  },
  {
    id: 'arc_bioskop',
    title: 'Bioskop Tua di Jalan Sudirman',
    category: 'Lost Places',
    description:
      'Dinding putih, kursi beludru merah, dan lobby yang dulu penuh sebelum film mulai diputar.',
    origin: 'Jakarta',
    period: '1985–2012',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Bangunan Hilang',
    historicalValue:
      'Bangunan yang hilang meninggalkan cara bergaul yang ikut hilang bersamanya: berdiri berdempetan di lobby sambil menunggu lampu redup.',
    featured: false,
    createdAt: '2026-01-11T14:20:00.000Z',
    story:
      'Bioskop itu tidak besar, tetapi seluruh jalan mengenalnya dari tulisan di atas pintu. Karcis dicetak kertas, dan penggemar film datang lebih awal hanya untuk duduk di baris tengah.\n\nKetika layar masih putih, orang saling menyapa. Saat lampu padam, percakapan berhenti sampai film selesai dan sorakan kecil mengiringi kredit akhir.\n\nBangunannya kini sudah digantikan fungsi lain. Arsip ini merangkum jejaknya sebagai kenangan kolektif, bukan sebagai dokumen resmi kota.',
    source: 'seed',
    contributionId: null,
  },
  {
    id: 'arc_lompat_tali',
    title: 'Lompat Tali Sepulang Sekolah',
    category: 'Childhood Memories',
    description:
      'Tali kain yang diputar dua orang, sementara yang lain bergiliran melompat sampai pelajaran selesai.',
    origin: 'Yogyakarta',
    period: '1995–2005',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Kenangan Masa Kecil',
    historicalValue:
      'Permainan ini menyimpan pelajaran pertama tentang bergiliran dan keberanian mencoba lagi setelah jatuh.',
    featured: false,
    createdAt: '2026-01-12T04:30:00.000Z',
    story:
      'Talinya bukan tali khusus, melainkan kain yang diikat berantai. Dua orang memegang ujungnya, yang lain berdiri di tengah dengan kaos yang belum sempat diganti setelah pulang sekolah.\n\nAda irama yang harus diikuti: cepat, lambat, lalu lebih tinggi. Yang berani maju diberi giliran lebih panjang, yang ragu disuruh menghitung sampai sepuluh.\n\nHalaman rumah kini lebih sering kosong. Tali itu masih tersimpan di laci, lebih pendek dari ingatan.',
    source: 'seed',
    contributionId: null,
  },
  {
    id: 'arc_sapa',
    title: 'Menyapa Tetangga Lewat Pintu',
    category: 'Everyday Life',
    description:
      'Pintu rumah yang selalu terbuka dan obrolan singkat yang tidak perlu dijadwalkan.',
    origin: 'Jawa Timur',
    period: '1990-an',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Kebiasaan Sehari-hari',
    historicalValue:
      'Menyapa tanpa janji adalah bentuk kepercayaan yang jarang disadari sampai ia tidak lagi dilakukan.',
    featured: true,
    createdAt: '2026-01-13T11:55:00.000Z',
    story:
      'Dulu pintu depan rumah hampir tidak pernah tertutup siang hari. Siapa lewat, ia berhenti sebentar, bertanya soal cuaca atau kabar anak yang sedang merantau.\n\nPercakapannya pendek, tetapi terulang setiap hari. Dari situ orang tahu kapan ada yang sakit, kapan ada yang pindah, dan kapan ada yang perlu bantuan.\n\nKebiasaan itu perlahan berganti pesan singkat. Arsip ini menyimpannya sebagai contoh betapa kecilnya sesuatu yang bisa menjaga sebuah lingkungan tetap dikenal.',
    source: 'seed',
    contributionId: null,
  },
  {
    id: 'arc_wayang',
    title: 'Wayang Kulit di Halaman Desa',
    category: 'Cultural Heritage',
    description:
      'Layar putih, bayangan hitam, dan gamelan yang terdengar sampai ke rumah-rumah paling ujung.',
    origin: 'Jawa Tengah',
    period: '1970–2000',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Seni Pertunjukan',
    historicalValue:
      'Wayang mengajarkan bahwa cerita yang terus diulang tetap bisa terasa baru ketika yang mendengarkannya berubah.',
    featured: false,
    createdAt: '2026-01-14T08:10:00.000Z',
    story:
      'Halaman desa berubah menjadi tempat pertunjukan setelah matahari terbenam. Layar dipasang, lampu dipadamkan, dan bayangan mulai bercerita tentang pilihan yang tidak pernah mudah.\n\nDalang berbicara dengan suara yang berubah-ubah, sementara gamelan mengatur kapan penonton boleh tertawa dan kapan harus diam. Anak-anak duduk paling depan meski belum paham semua dialog.\n\nCatatan ini dibingkai sebagai kenangan pertunjukan, bukan sebagai dokumentasi akademik tentang tradisi wayang.',
    source: 'seed',
    contributionId: null,
  },
  {
    id: 'arc_radio',
    title: 'Radio Tua dan Kipas Tangan',
    category: 'Everyday Life',
    description:
      'Kotak kayu berdebu yang menyimpan siaran sore, ditemani kipas yang dipegang turun-temurun.',
    origin: 'Surakarta',
    period: '1980-an',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Benda Sehari-hari',
    historicalValue:
      'Benda biasa menjadi berharga ketika ia terbukti sanggup menemani terlalu banyak sore dalam satu keluarga.',
    featured: false,
    createdAt: '2026-01-15T13:25:00.000Z',
    story:
      'Radio itu diletakkan di atas lemari, dengan antena yang harus diputar ke arah tertentu agar suaranya jernih. Setiap anggota keluarga punya acara favorit dan tahu kapan harus menyerahkan tombolnya.\n\nKipas tangan disimpan bersamanya. Saat listrik padam, kipas bekerja dan radio berhenti — dua benda yang saling melengkapi dalam rutinitas yang sederhana.\n\nKeduanya kini lebih berfungsi sebagai pengingat daripada alat. Nilainya ada pada kebiasaan yang mereka temani.',
    source: 'seed',
    contributionId: null,
  },
]);

export const TIMELINE_PERIODS = Object.freeze([
  {
    year: 1990,
    title: 'Permainan di halaman',
    description:
      'Anak-anak bermain congklak dan lompat tali tanpa perangkat digital. Halaman rumah menjadi tempat berkumpul yang tidak perlu diundang.',
    image: '',
  },
  {
    year: 2005,
    title: 'Kebiasaan mulai bergeser',
    description:
      'Televisi, konsol, dan jam belajar mengubah ritme bermain. Obrolan di teras mulai bersaing dengan acara yang tayang di layar.',
    image: '',
  },
  {
    year: 2020,
    title: 'Layar menggantikan lapangan',
    description:
      'Aktivitas daring meningkat saat mobilitas dibatasi. Kebiasaan lama tetap diingat, meski ruang untuk menjalankannya menyusut.',
    image: '',
  },
  {
    year: 2026,
    title: 'Jejak yang tersisa',
    description:
      'Permainan dan kebiasaan itu mulai dicatat kembali sebagai arsip budaya. Mengingatnya menjadi cara memilih apa yang ingin disimpan.',
    image: '',
  },
]);
