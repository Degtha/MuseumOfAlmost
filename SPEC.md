# SPEC.md — Museum of Almost

> **Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS) — MVP satu hari**
>
> | Field | Nilai |
> |---|---|
> | Nama aplikasi | Museum of Almost |
> | Versi dokumen | 1.0 |
> | Tanggal | 19 November 2026 |
> | Status | **Menunggu tinjauan** — implementasi belum dimulai |
> | Peran penulis | System Analyst & Software Engineer |
> | Target implementasi | Aplikasi web statis lokal (Vite + JavaScript Vanilla) |
> | Konsep utama | *A living digital museum that preserves the things humanity is slowly forgetting.* |
> | Tagline | *Not everything lost was meant to be forgotten.* |

Dokumen ini adalah satu-satunya keluaran pada tahap ini. **Jangan menulis kode aplikasi sebelum spesifikasi ini ditinjau dan disetujui.**

---

## 1. Gambaran Umum Aplikasi

Museum of Almost adalah museum digital interaktif yang berfungsi sebagai arsip untuk menyimpan, mendokumentasikan, dan memperkenalkan kembali hal-hal yang perlahan terlupakan oleh masyarakat.

Objek arsip dapat berupa:

- Permainan tradisional yang mulai ditinggalkan.
- Suara dan kebiasaan kehidupan sehari-hari.
- Tradisi dan budaya lokal.
- Resep makanan turun-temurun.
- Cerita masyarakat dan kenangan masa kecil.
- Tempat atau bangunan yang telah mengalami perubahan.
- Benda sederhana yang memiliki nilai sejarah dan emosional.

Kalimat pembuka yang **wajib tampil persis** pada halaman entrance:

> "If everything disappeared tomorrow, what would you wish we had saved today?"

Pengalaman utama harus terasa seperti **memasuki museum digital**, bukan membuka katalog, dashboard, atau daftar data biasa. Storytelling, ritme visual, typography, dan transisi menjadi bagian dari fungsi, bukan sekadar dekorasi.

### 1.1 Prinsip pengalaman

| Prinsip | Perilaku dalam aplikasi |
|---|---|
| Immersive | Hero full-viewport, latar charcoal, grain halus, animasi pembuka bertahap. |
| Editorial | Detail arsip dibaca seperti artikel, bukan tabel. |
| Interaktif | Pengunjung dapat menyaring, memilih periode, dan meninggalkan kenangan. |
| Terukur | Statistik dan perubahan data langsung terlihat di galeri dan dashboard. |
| Jujur | Semua konten ilustratif diberi label; kapsul waktu dan dashboard diberi label simulasi/demo. |

---

## 2. Tujuan Aplikasi

1. Menjadi ruang digital untuk mengarsipkan budaya, tradisi, suara, benda, dan kenangan masyarakat.
2. Meningkatkan kesadaran generasi muda terhadap sesuatu yang berpotensi terlupakan.
3. Menghadirkan pengalaman eksplorasi arsip yang interaktif dan menarik.
4. Memberikan ruang kepada pengunjung untuk berkontribusi melalui cerita dan kenangan mereka.
5. Memperkenalkan konsep pelestarian budaya melalui teknologi digital.

---

## 3. Target Pengguna

Aplikasi memiliki dua peran dalam **satu perangkat yang sama**.

### 3.1 Pengunjung Museum

Kebutuhan:

- Menjelajahi koleksi arsip digital.
- Mencari dan memfilter koleksi.
- Melihat detail cerita setiap arsip.
- Mendengarkan rekaman suara jika tersedia.
- Mengirimkan kenangan atau cerita.
- Membuat pesan untuk kapsul waktu digital.

Perilaku khas: datang lewat halaman entrance, menjelajah galeri, membuka 1–3 arsip, lalu mungkin meninggalkan kontribusi.

### 3.2 Pengelola Museum (Mode Demo)

Kebutuhan:

- Mengakses dashboard pengelolaan demo.
- Menambahkan, mengedit, dan menghapus arsip.
- Mengelola kategori dan informasi arsip.
- Mengatur status unggulan.
- Melihat statistik koleksi dan kontribusi.
- Melihat daftar kontribusi pengunjung.

**Tidak ada autentikasi, login palsu, atau role-based access control.** Dashboard diakses melalui tautan navigasi yang diberi label eksplisit:

> `Museum Management — MODE DEMO / tanpa login`

Label ini harus terlihat baik di header maupun di dalam dashboard.

---

## 4. Fitur MVP — Spesifikasi Perilaku

Legenda prioritas:

- **[P0] Wajib MVP** — harus ada sebelum aplikasi dinyatakan selesai.
- **[P1] Dapat disederhanakan** — boleh versi minimal jika waktu mepet.
- **[P2] Ditunda** — tidak dikerjakan pada latihan satu hari.

Ringkasan:

| Kode | Fitur | Prioritas |
|---|---|---|
| A | Landing Page — The Entrance | P0 (animasi sinematik: P1) |
| B | The Archives — Galeri Arsip | P0 |
| C | The Memory Room — Detail Arsip | P0 (rekomendasi & audio: P1) |
| D | Leave Something Behind — Kontribusi | P0 |
| E | The Time Capsule | P0 |
| F | The Last Time Machine — Timeline | P0 (transisi animasi: P1) |
| G | Dashboard Pengelola | P0 (konfirmasi hapus kustom: P1) |

### 4.1 A. Landing Page — The Entrance **[P0]**

Rute: `#/`

Elemen wajib:

1. Header dengan wordmark `MUSEUM OF ALMOST` / monogram `MoA`.
2. Hero section memuat:
   - Judul `Museum of Almost` (typography serif besar).
   - Tagline: *Not everything lost was meant to be forgotten.*
   - Kalimat pembuka persis seperti pada Bab 1.
   - Deskripsi singkat 2–3 kalimat tentang museum.
   - Tombol utama **`Enter the Museum`**.
3. Animasi pembuka sinematik **[P1]**:
   - Urutan: eyebrow → judul → tagline → pertanyaan → tombol, masing-masing jeda 120–180 ms.
   - Transformasi `translateY(12px)` + `opacity` selama ~600 ms.
   - Overlay grain halus berbasis CSS (tanpa gambar eksternal).
   - Jika `prefers-reduced-motion: reduce`, semua elemen langsung tampil tanpa animasi.
4. Pengantar singkat mengenai tujuan museum (3 paragraf pendek atau 3 kartu nilai).
5. Statistik jumlah arsip yang tersedia, dihitung **langsung dari localStorage** (bukan angka statis):
   - Total arsip.
   - Jumlah kategori aktif.
   - Jumlah kontribusi pengunjung.
6. Navigasi lanjutan ke halaman eksplorasi (`#/archives`) dan kontribusi (`#/contribute`).

Perilakan klik tombol `Enter the Museum` → `#/archives`. Tombol harus dapat dicapai dengan Tab dan memiliki focus ring yang terlihat.

### 4.2 B. The Archives — Galeri Arsip Digital **[P0]**

Rute: `#/archives`

Konten wajib:

- Minimal **8 arsip contoh** dari `seed.js` + arsip hasil kontribusi + arsip dari dashboard.
- Kartu arsip menampilkan:
  - Gambar atau placeholder lokal dengan `alt` deskriptif.
  - Nama arsip (judul).
  - Kategori.
  - Tahun/periode jika diketahui (jika `null`, tampilkan `Periode tidak diketahui`).
  - Deskripsi singkat (maks. 3 baris, ellipsis).
  - Label jenis arsip (`archiveType`).
  - Badge **`Unggulan`** jika `featured === true`.
  - Badge **`Kontribusi Pengunjung`** jika arsip berasal dari kontribusi.
  - Tombol/tautan **`Buka arsip →`**.

Kategori awal (enum tetap, 6 nilai):

1. `Cultural Heritage`
2. `Childhood Memories`
3. `Forgotten Sounds`
4. `Traditional Food`
5. `Lost Places`
6. `Everyday Life`

Toolbar dan perilaku:

| Kontrol | Perilaku |
|---|---|
| Cari | Mencari **case-insensitive** pada `title` dan `description`; substring cukup. |
| Filter kategori | Satu kategori atau `Semua kategori`. Implementasi: `select` atau chip-button (chip lebih estetik, `select` lebih ringkas). |
| Sorting | Opsi: `Judul A–Z`, `Judul Z–A`, `Terbaru`, `Terlama`. Default: `Terbaru`. Urutan `Terbaru` berdasarkan `createdAt`, bukan `period`. |
| Filter unggulan | Checkbox `Hanya arsip unggulan`. |
| Hitungan hasil | Teks `Menampilkan X dari Y arsip` di bawah toolbar, diperbarui setiap perubahan filter. |
| Reset filter | Tombol `Hapus filter` muncul hanya saat ada filter aktif. |

Empty state **[P0]**: jika hasil 0, tampilkan ilustrasi sederhana berbasis SVG/CSS, judul `Tidak ada arsip yang cocok.`, deskripsi singkat, dan tombol `Hapus filter`. Jangan menampilkan grid kosong tanpa penjelasan.

Layout: grid responsif; pada desktop arsip `featured` boleh menempati 2 kolom (asimetris), pada tablet/mobile kembali 1 kolom.

Jika URL memuat `#/archives?new=<id>` (setelah kontribusi), kartu dengan id tersebut diberi outline aksen selama ~5 detik dan di-scroll ke dalam viewport.

### 4.3 C. The Memory Room — Detail Arsip **[P0]**

Rute: `#/archive/:id`

Informasi yang ditampilkan:

- Foto utama (atau placeholder) dengan alt text.
- Nama arsip sebagai heading utama.
- Kategori, tahun/periode, asal daerah, jenis arsip.
- Cerita lengkap (2–4 paragraf dari data seed/kontribusi).
- Blok `Nilai sejarah / emosional` ditampilkan sebagai kutipan editorial (blockquote), bukan baris tabel.
- Media audio jika `audioUrl` tersedia **[P1]**:
  - Gunakan `<audio controls>` native dengan label yang jelas.
  - Jika file gagal dimuat, sembunyikan player dan tampilkan badge `Audio tidak tersedia pada perangkat ini` — jangan biomekanisme error.
- Tombol `← Kembali ke galeri` mengarah ke `#/archives`.
- Rekomendasi arsip lain **[P1]**: 3 kartu dari kategori yang sama, exclude arsip saat ini; jika kurang dari 3, isi dengan arsip unggulan lain.

Tampilan: dua kolom pada desktop (gambar sticky di kiri, cerita di kanan), satu kolom di mobile. Beri jarak antar paragraf dan ukuran line-height yang nyaman membaca (±1.7).

**Error state [P0]**: jika `id` tidak ditemukan, tampilkan halaman `Arsip tidak ditemukan` + tombol kembali ke galeri. Jangan membiarkan halaman kosong atau melempar exception.

### 4.4 D. Leave Something Behind — Kontribusi Pengunjung **[P0]**

Rute: `#/contribute`

Formulir:

| Field | Tipe | Wajib | Ketentuan |
|---|---|---|---|
| Nama arsip / kenangan | text | Ya | 3–100 karakter |
| Kategori | select | Ya | Salah satu dari 6 kategori; tidak boleh bebas |
| Asal daerah | text | Tidak | Maks. 100 karakter |
| Cerita / deskripsi | textarea | Ya | 20–2000 karakter |
| Tahun atau periode | text | Tidak | Maks. 40 karakter, bebas (mis. `1990-an`) |
| Foto / gambar | file | Tidak | `image/png`, `image/jpeg`, `image/webp`, `image/gif`; maks. 2 MB |

Perilaku:

1. Validasi inline pada `blur` dan saat submit. Tampilkan pesan dekat field + ringkasan error di atas form. Focus otomatis ke field pertama yang invalid.
2. Gambar dibaca sebagai **data URL** (`FileReader`) dan disimpan di localStorage. Jika ukuran > 2 MB atau tipe tidak didukung → tolak dengan pesan jelas. *(P2: downscale via canvas ke maks. 1200 px.)*
3. Saat submit berhasil:
   - Buat `Contribution` baru di `moa:contributions:v1`.
   - Buat juga `Archive` bayangan di `moa:archives:v1` dengan `archiveType: 'Kontribusi Pengunjung'`, `featured: false`, `source: 'contribution'`, `contributionId: <id>` — ini **wajib** agar arsip langsung muncul di galeri dan dashboard tanpa logika deduplikasi tambahan.
   - Tampilkan notifikasi toast: `Kenangan Anda tersimpan di perangkat ini.`
   - Arahkan ke `#/archives?new=<archiveId>` dan sorot kartu baru.
4. Teks penjelasan permanen di bawah form:

   > *Kontribusi Anda hanya tersimpan secara lokal pada perangkat dan browser yang Anda gunakan. Tidak dikirim ke server, tidak dapat dilihat pengguna lain, dan akan hilang jika data browser dibersihkan.*

5. Tangani kegagalan penyimpanan (quota penuh) dengan toast error dan **jangan** mengubah form — pengguna masih bisa memperbaiki.

### 4.5 E. The Time Capsule — Kapsul Waktu Digital **[P0]**

Rute: `#/time-capsule`

Formulir:

| Field | Tipe | Wajib | Ketentuan |
|---|---|---|---|
| Nama / nama samaran | text | Ya | 2–60 karakter |
| Pesan untuk generasi mendatang | textarea | Ya | 10–1000 karakter |
| Tahun target | number | Tidak | Integer antara tahun berjalan dan tahun berjalan + 100 |
| Tahun pesan dibuat | otomatis | — | Turunan dari `createdAt`, ditampilkan sebagai teks bukan input |

Perilaku:

- Simpan ke `moa:capsules:v1`.
- Daftar pesan ditampilkan sebagai "kartu kapsul" bergaya arsip (segel lilin sederhana berbasis CSS, nomor urut, tahun besar).
- Setiap kartu menampilkan: penulis, pesan, tanggal pembuatan lengkap (format lokal, mis. `19 Nov 2026`), tahun target jika diisi, dan tombol `Hapus`.
- Hapus memerlukan konfirmasi (**P0**: `confirm()` native diperbolehkan; **P1**: modal kustom).
- Empty state: `Belum ada pesan dalam kapsul. Tulis yang pertama.`
- Label simulasi wajib terlihat:

  > *Simulasi lokal — pesan tidak dikirim ke masa depan dan hanya tersimpan di perangkat ini.*

### 4.6 F. The Last Time Machine — Timeline Interaktif **[P0]**

Rute: `#/timeline`

Konten contoh ilustratif (4 periode):

| Tahun | Judul ringkas | Fokus narasi |
|---|---|---|
| 1990 | Permainan di halaman | Anak-anak bermain congklak dan lompat tali tanpa perangkat digital. |
| 2005 | Kebiasaan mulai bergeser | Televisi, konsol, dan jam belajar mengubah ritme bermain. |
| 2020 | Layar menggantikan lapangan | Aktivitas daring aumentatif saat pembatasan mobilitas. |
| 2026 | Jejak yang tersisa | Permainan kembali dicatat sebagai arsip budaya. |

Perilaku:

- Kontrol periode: tombol tahun **[P0]** + range slider yang tersinkron **[P1]**. Keduanya harus mengubah state yang sama.
- Konten per periode: gambar/ilustrasi lokal, tahun besar, judul, deskripsi 2–3 kalimat.
- Transisi saat periode berubah **[P1]**: crossfade + `translateY(8px)` ~240 ms. Dengan `prefers-reduced-motion`, langsung berganti tanpa animasi.
- Badge label **wajib** terlihat di semua periode:

  > *Simulasi ilustratif — tidak bersumber dari data sejarah terverifikasi.*

- Navigasi keyboard: tombol tahun dapat di-Tab dan di-Enter; slider dapat diubah dengan arrow keys.

### 4.7 G. Dashboard Pengelola — Museum Management **[P0]**

Rute: `#/admin`

Pembatas demo **[P0]**: banner permanen di bagian atas dashboard bertuliskan `MODE DEMO PENGELOLA — tanpa login, data lokal perangkat ini`.

Ringkasan (dihitung real-time dari localStorage):

- Total seluruh arsip.
- Jumlah kategori unik yang digunakan.
- Jumlah kontribusi pengunjung.
- *(Opsional)* jumlah kapsul waktu.

Daftar arsip **[P0]** menampilkan: judul, kategori, periode, status unggulan, dan aksi `Edit`, `Hapus`, `Unggulkan/Batalkan unggulan`.

CRUD arsip:

- **Tambah**: form memuat semua field `Archive` kecuali `id` dan `createdAt`.
- **Edit**: field diisi data lama; `createdAt` tidak diubah.
- **Hapus**: konfirmasi wajib; setelah hapus, toast + daftar diperbarui. Jika arsip tersebut berasal dari kontribusi, **jangan** menghapus record `Contribution` — hanya arsip bayangannya yang dihapus, agar statistik kontribusi tetap akurat.
- **Status unggulan**: toggle dengan `aria-pressed`, perubahan langsung tersimpan.

Tab `Kontribusi` **[P0]**: daftar semua `Contribution` dengan judul, kategori, asal, tanggal, dan cuplikan cerita. Tidak perlu CRUD kontribusi di MVP.

Reset data demo **[P0]**:

- Tombol `Reset data demo` dengan konfirmasi:

  > *Reset semua data demo? Seluruh arsip akan kembali ke 8 data awal. Kontribusi dan pesan kapsul Anda akan hilang.*

- Jika disetujui: hapus 3 key data, tulis ulang seed arsip, perbarui `moa:version:v1`, tampilkan toast `Data demo berhasil direset.`.

Sinkronisasi data **[P0]**: dashboard, galeri, landing, dan detail **harus membaca sumber localStorage yang sama**. Setelah edit/tambah/hapus, navigasi ke galeri langsung menunjukkan perubahan tanpa refresh manual.

---

## 5. Arsitektur & Teknologi

### 5.1 Pendekatan

Single-page application (SPA) berbasis **hash routing** di satu `index.html`. Hash dipilih karena:

- Tidak memerlukan konfigurasi fallback server pada Vite.
- Tetap bekerja saat halaman di-refresh.
- Mudah diimplementasikan dengan Vanilla JS.

Rute:

| Hash | Halaman |
|---|---|
| `#/` | Entrance |
| `#/archives` | Galeri (opsional query `?new=<id>`) |
| `#/archive/:id` | Memory Room |
| `#/contribute` | Form kontribusi |
| `#/time-capsule` | Kapsul waktu |
| `#/timeline` | Timeline |
| `#/admin` | Dashboard demo |

Router bertugas: parse hash → render view ke `<main id="app">` → set `document.title` → focus heading utama → scroll ke atas.

### 5.2 Struktur folder yang disarankan

```text
museum-of-almost/
├── index.html
├── package.json
├── vite.config.js
├── SPEC.md
├── public/
│   └── images/              # placeholder SVG/WebP lokal
└── src/
    ├── main.js              # bootstrap + router
    ├── router.js
    ├── styles/
    │   ├── tokens.css       # warna, font, spacing
    │   ├── global.css       # reset, tipografi, layout
    │   └── components.css   # kartu, form, toast, badge
    ├── data/
    │   ├── categories.js
    │   └── seed.js          # 8 arsip awal + konten timeline
    ├── lib/
    │   ├── storage.js       # read/write/seed/reset
    │   ├── sanitize.js      # escapeHtml, safe file handling
    │   ├── validation.js
    │   └── format.js        # tanggal, periode, slug id
    ├── components/
    │   ├── header.js
    │   ├── footer.js
    │   ├── archiveCard.js
    │   ├── toast.js
    │   └── confirmDialog.js
    └── views/
        ├── entrance.js
        ├── archives.js
        ├── memoryRoom.js
        ├── contribute.js
        ├── timeCapsule.js
        ├── timeline.js
        └── admin.js
```

### 5.3 Stack

**Digunakan:** Vite, JavaScript Vanilla (ES6+), HTML5, CSS3, LocalStorage.

**Ikon:** gunakan inline SVG sederhana. Lucide Icons **opsional** (`lucide` via npm) hanya jika diperlukan; hindari CDN eksternal agar aplikasi tetap berjalan offline.

**Tidak digunakan:** React, Vue, Angular, backend, database eksternal, autentikasi, API berbayar, layanan cloud.

---

## 6. Model Data & Penyimpanan

### 6.1 Konstanta localStorage

| Key | Isi |
|---|---|
| `moa:archives:v1` | `Archive[]` — seed + kontribusi + arsip buatan admin |
| `moa:contributions:v1` | `Contribution[]` |
| `moa:capsules:v1` | `TimeCapsule[]` |
| `moa:version:v1` | string versi skema, mis. `"1"` |

Aturan penyimpanan **[P0]**:

1. Saat aplikasi dibuka, `seedIfEmpty()` hanya menulis seed jika key arsip **benar-benar belum ada** (`null`).
2. **Dilarang** menimpa data pengguna yang sudah ada saat inisialisasi ulang.
3. `moa:version:v1` hanya dipakai penanda; jangan menghapus data hanya karena versi berbeda.
4. Semua penulisan dibungkus `try/catch`; kegagalan (quota/private mode) ditampilkan sebagai toast error.
5. Reset data demo adalah **satu-satunya** jalur yang boleh menghapus key.

### 6.2 Archive

```js
{
  id: string,              // unik, mis. "arc_" + crypto.randomUUID()
  title: string,           // wajib
  category: string,        // wajib, salah satu dari 6 kategori
  description: string,     // wajib (ringkasan untuk kartu)
  origin: string,          // opsional, ""
  period: string | null,   // opsional
  imageUrl: string,        // opsional, path lokal / data URL
  audioUrl: string | null, // opsional
  archiveType: string,     // mis. "Permainan Tradisional"
  historicalValue: string, // opsional, ""
  featured: boolean,       // default false
  createdAt: string,       // ISO 8601
  story: string,           // tambahan: cerita lengkap untuk Memory Room [P0]
  source: 'seed' | 'contribution' | 'admin', // tambahan: asal data [P0]
  contributionId: string | null              // tambahan: tautan ke Contribution
}
```

> `story`, `source`, dan `contributionId` ditambahkan dengan alasan fungsional: `story` diperlukan agar halaman detail menampilkan narasi editorial (field `description` saja terlalu pendek), sementara `source`/`contributionId` membuat arsip kontribusi langsung dikenali di galeri dan dashboard tanpa heuristics. Field lain tidak diubah.

### 6.3 Contribution

```js
{
  id: string,
  title: string,        // wajib
  category: string,     // wajib, enum 6 kategori
  origin: string,       // opsional
  story: string,        // wajib
  period: string | null,
  imageUrl: string | null, // data URL atau null
  createdAt: string     // ISO 8601
}
```

### 6.4 TimeCapsule

```js
{
  id: string,
  author: string,       // wajib (boleh nama samaran)
  message: string,      // wajib
  createdAt: string,    // ISO 8601
  targetYear: number | null // opsional
}
```

Tahun pembuatan tidak disimpan terpisah — diturunkan dari `createdAt` saat render.

### 6.5 Aturan sanitasi & validasi umum **[P0]**

- Render teks pengguna dengan `textContent` atau `escapeHtml()`; **dilarang** menyisipkan `innerHTML` dari input pengguna mentah.
- `category` harus diverifikasi terhadap enum, bukan dipercaya dari localStorage.
- `imageUrl` hanya boleh: path relatif lokal (`/images/...`, `./...`) atau `data:image/(png|jpeg|webp|gif);base64,...`. Tolak `javascript:`, `http(s):`, dan skema lain.
- Trim whitespace pada semua teks; batasi panjang sesuai tabel formulir.
- Id dibuat dengan `crypto.randomUUID()` (fallback sederhana jika tidak tersedia).
- Semua tanggal disimpan ISO; format tampilan hanya di lapisan view.

---

## 7. Konten Awal (Seed Data)

Minimal 8 arsip, relevan dengan budaya dan kehidupan masyarakat Indonesia. Konten ditulis dengan nada editorial, bukan sekadar daftar informasi kering.

| # | id | title | category | period | origin | archiveType | featured | imageUrl |
|---|---|---|---|---|---|---|---|---|
| 1 | `arc_congklak` | Congklak di Teras Rumah | Cultural Heritage | `1990-an` | Jawa | Permainan Tradisional | ✓ | `/images/congklak.svg` |
| 2 | `arc_es_cendol` | Suara Kakek Penjual Es Cendol | Forgotten Sounds | `2004` | Bandung | Rekaman Suara | — | `/images/cendol.svg` |
| 3 | `arc_rendang` | Bumbu Rendang Nenek | Traditional Food | `turun-temurun` | Minangkabau | Resep Keluarga | ✓ | `/images/rendang.svg` |
| 4 | `arc_bioskop` | Bioskop Tua di Jalan Sudirman | Lost Places | `1985–2012` | Jakarta | Bangunan Hilang | — | `/images/bioskop.svg` |
| 5 | `arc_lompat_tali` | Lompat Tali Sepulang Sekolah | Childhood Memories | `1995–2005` | Yogyakarta | Kenangan Masa Kecil | — | `/images/lompat-tali.svg` |
| 6 | `arc_sapa` | Menyapa Tetangga Lewat Pintu | Everyday Life | `1990-an` | Jawa Timur | Kebiasaan Sehari-hari | ✓ | `/images/sapa.svg` |
| 7 | `arc_wayang` | Wayang Kulit di Halaman Desa | Cultural Heritage | `1970–2000` | Jawa Tengah | Seni Pertunjukan | — | `/images/wayang.svg` |
| 8 | `arc_radio` | Radio Tua dan Kipas Tangan | Everyday Life | `1980-an` | Surakarta | Benda Sehari-hari | — | `/images/radio.svg` |

Ketentuan seed:

- `description`: 1–2 kalimat ringkas (maks. ~180 karakter) untuk kartu.
- `story`: 2–3 paragraf pendek untuk Memory Room.
- `historicalValue`: 1 kalimat refleksi emosional/historis.
- `audioUrl`: `null` untuk semua seed **[P0]**. Jika ingin ada contoh pemutar audio **[P1]**, siapkan file lokal kecil di `public/audio/` dan pakai path relatif; **jangan** merujuk ke URL eksternal.
- `imageUrl` wajib memiliki fallback: jika gambar gagal dimuat, tampilkan placeholder SVG/CSS dengan inisial kategori. Ini menghindari tampilan rusak saat path salah.
- Konten sejarah yang tidak diverifikasi harus tetap dibingkai sebagai kenangan/ilustrasi, bukan klaim faktual mutlak.

---

## 8. Kebutuhan Non-Fungsional

### 8.1 Performance

- Berjalan lokal melalui `npm install && npm run dev` (Vite).
- Navigasi dan filter terasa instan (< 100 ms untuk 8–100 arsip).
- Hindari dependensi tidak perlu; tidak ada framework UI.
- Animasi hanya `transform` dan `opacity`; hindari animasi `width/height/top/left` yang memicu layout ulang.
- Gambar placeholder berupa SVG ringan atau WebP terkompresi; hindari file > 200 KB per gambar.
- Batasi grain/overlay dengan efek CSS statis, bukan video atau gambar besar.

### 8.2 Usability

- Navigasi konsisten di semua halaman; halaman aktif diberi penanda (bukan hanya warna).
- Setiap aksi memberi feedback: toast, perubahan status, atau perhitungan ulang tampilan.
- Form memiliki label terlihat, placeholder sebagai contoh (bukan pengganti label), dan pesan error spesifik.
- Empty state dan error state informatif dengan langkah perbaikan yang jelas.
- Teks tombol menggunakan kata kerja (`Enter the Museum`, `Simpan kenangan`, `Hapus pesan`).

### 8.3 Visual Design

Pendekatan: **dark editorial museum**, minimalist, immersive, cinematic storytelling, modern digital archive.

Token warna:

| Token | Nilai | Penggunaan |
|---|---|---|
| `--bg` | `#141312` | Charcoal black, latar utama |
| `--surface` | `#1E1C1A` | Permukaan kartu/panel |
| `--surface-2` | `#2A2724` | Permukaan sekunder, hover |
| `--text` | `#F3EBDD` | Warm ivory, teks utama |
| `--text-muted` | `#A9A198` | Teks sekunder |
| `--accent` | `#C87941` | Muted bronze / burnt orange |
| `--accent-soft` | `rgba(200,121,65,.14)` | Sorotan halo |
| `--border` | `#3A3632` | Garis pemisah |

Tipografi:

- Heading: serif elegan — self-host jika aset tersedia, jika tidak gunakan `Georgia, 'Times New Roman', serif`.
- Body: sans-serif modern — `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`.
- Display hero: `clamp(3.25rem, 9vw, 8rem)`, letter-spacing negatif ringan.
- Line-height body: 1.6–1.75; paragraf cerita 1.75.

Layout:

- Asimetris pada desktop: grid 12 kolom dengan kartu unggulan menempati lebih banyak ruang.
- Whitespace proporsional; skala spacing 4/8/12/16/24/32/48/64/96 px.
- Radius kecil (2–6 px) agar kesan tetap arsip/editorial, bukan kartu aplikasi generik.
- Sharp 1px borders pada panel penting.

### 8.4 Accessibility **[P0]**

- Kontras minimal 4.5:1 untuk teks biasa dan 3:1 untuk teks besar (palet di atas memenuhi).
- Seluruh elemen interaktif dapat dicapai dan dioperasikan via keyboard; focus ring terlihat dengan `:focus-visible`.
- Skip link `Lewati ke konten` di awal dokumen.
- `alt` deskriptif pada gambar; gambar dekoratif memakai `alt=""`.
- Setiap input memiliki `<label>` yang terhubung (`for`/`id`).
- Status, error, dan toast menggunakan `role="status"` / `aria-live="polite"`; error validasi juga `aria-invalid` + `aria-describedby`.
- Informasi tidak disampaikan hanya dengan warna: status unggulan dan demo tetap memakai teks/icon.
- Dukung `prefers-reduced-motion: reduce` untuk semua animasi dan transisi.
- Heading hierarkis (`h1` per halaman, lalu `h2`, `h3`).

### 8.5 Data Persistence **[P0]**

- Data tetap ada setelah refresh.
- Seed hanya jika localStorage kosong; tidak menimpa data existing.
- Reset data demo memerlukan konfirmasi eksplisit.
- Kegagalan baca/tulis tidak boleh membuat aplikasi blank — tampilkan fallback dan pesan error.

### 8.6 Security **[P0]**

- Tanpa API key, credential, atau rahasia dalam kode.
- Tanpa backend eksternal atau permintaan jaringan ke pihak ketiga.
- Tanpa data pribadi asli; gunakan nama samaran pada contoh.
- Validasi dan sanitasi semua input pengguna (lihat 6.5).
- Batasi tipe dan ukuran file gambar: `png/jpeg/webp/gif`, maks. 2 MB.
- Jangan menjalankan perintah shell/berbahaya dari aplikasi.

---

## 9. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi realistis |
|---|---|---|
| Data localStorage hilang saat browser dibersihkan | Arsip, kontribusi, kapsul hilang | Tampilkan disclaimer di form kontribusi & kapsul; sediakan tombol reset yang jelas; dokumentasikan bahwa MVP memang lokal-only; tidak menjanjikan pemulihan. |
| Gambar lokal gagal dimuat karena path salah | Kartu tampak rusak | `onerror` → placeholder SVG/CSS dengan inisial kategori; validasi path relatif; cek semua aset sebelum finalisasi. |
| Kontribusi hanya tersimpan di perangkat pengguna | Pengiraan pengguna bahwa kontribusi tersebar | Teks penjelasan permanen di form + toast sukses menyebut "di perangkat ini"; tidak ada klaim sinkronisasi di UI. |
| Gambar/cerita tanpa izin → masalah hak cipta | Risiko hukum & etika | Gunakan placeholder buatan sendiri/ilustrasi SVG sederhana dan cerita fiktif/ilustratif; sertakan catatan hak cipta di README: konten contoh bukan materi pihak ketiga. |
| Konten sejarah tidak terverifikasi → informasi keliru | Misinformasi | Frame sebagai "kenangan/ilustrasi"; beri label `Simulasi ilustratif` pada timeline; hindari angka statistik sejarah yang tidak bisa dipertanggungjawabkan. |
| Animasi berlebihan → performa & aksesibilitas | Pusing, lambat, HTML tidak stabil | Batasi ke `transform`/`opacity`, durasi ≤ 600 ms, hormati `prefers-reduced-motion`, hindari parallax berat dan autoplay audio. |
| localStorage penuh (terutama data URL gambar) | Submit gagal / data corrupt | Batasi file 2 MB, tolak tipe lain, bungkus write dengan `try/catch`, toast error, jangan mengubah form saat gagal. (P2: downscale gambar.) |
| Pengguna mengira dashboard aman karena ada CRUD | Salah paham keamanan | Banner `MODE DEMO — tanpa login` permanen di header dan dashboard; tidak ada indikator "admin tersedia" yang menyesatkan. |

---

## 10. Di Luar Ruang Lingkup (Out of Scope)

Tidak termasuk MVP:

- Login dan registrasi pengguna.
- Sinkronisasi data antarperangkat.
- Database dan backend.
- Upload file ke cloud.
- Moderasi kontribusi secara online.
- Chat atau komunikasi antar pengguna.
- AI untuk menghasilkan cerita.
- Sistem pengiriman kapsul waktu otomatis.
- Peta geografis dengan data real-time.
- Integrasi pembayaran.
- Aplikasi mobile native.

Fitur yang **sengaja ditunda** namun masih dalam ranah aplikasi (lihat Bab 12): audio contoh, rekomendasi arsip lanjutan, downscale gambar, modal konfirmasi kustom, animasi scroll storytelling.

---

## 11. Kriteria Penerimaan (Manual Test)

Pengujian dilakukan di browser lokal (`npm run dev`) pada desktop dan smartphone/device emulation.

| # | Kriteria | Langkah pengujian | Hasil diharapkan |
|---|---|---|---|
| 1 | Landing page tampil benar | Buka `http://localhost:5173/#/` | Hero, judul, tagline, kalimat pembuka, tombol `Enter the Museum`, dan statistik muncul; tanpa error di console. |
| 2 | Tombol Enter bekerja | Klik `Enter the Museum` | URL berubah ke `#/archives`, galeri tampil. |
| 3 | Minimal 8 arsip contoh | Buka galeri tanpa data lokal tambahan | Minimal 8 kartu seed terlihat dengan judul, kategori, dan gambar/placeholder. |
| 4 | Pencarian judul & deskripsi | Ketik `congklak` di kolom cari; lalu ketik `teras` | Hasil menyaring kartu yang relevan; hitungan `Menampilkan X dari Y arsip` berubah; menghapus teks mengembalikan semua. |
| 5 | Filter kategori | Pilih `Traditional Food` | Hanya arsip kategori tersebut muncul; pilih `Semua kategori` → semua kembali. |
| 6 | Sorting | Pilih `Judul A–Z`, lalu `Terbaru` | Urutan kartu berubah sesuai opsi; default `Terbaru`. |
| 7 | Detail arsip | Klik `Buka arsip` pada salah satu kartu | Halaman `#/archive/:id` menampilkan foto, meta, cerita lengkap, blok nilai sejarah, dan tombol kembali; tombol kembali ke galeri berfungsi. |
| 8 | Validasi kontribusi | Buka `#/contribute`, submit kosong, lalu isi judul 2 karakter & cerita 5 karakter | Error inline muncul per field, focus ke field pertama yang invalid, data tidak tersimpan. |
| 9 | Kontribusi muncul di galeri | Isi form valid (tanpa gambar), submit | Toast sukses muncul, pengguna diarahkan ke galeri, kartu baru dengan badge `Kontribusi Pengunjung` tersorot. |
| 10 | Time Capsule simpan & tampil | Buka `#/time-capsule`, isi nama + pesan, submit | Pesan muncul di daftar dengan penulis, teks, tanggal, dan tombol hapus; refresh → pesan tetap ada. |
| 11 | Timeline berubah | Buka `#/timeline`, klik tahun 1990 lalu 2026 | Judul, gambar, dan deskripsi berganti sesuai periode; slider (jika ada) ikut berubah; label simulasi terlihat. |
| 12 | Statistik dashboard | Buka `#/admin` | Jumlah arsip = jumlah di galeri; jumlah kategori = kategori unik yang dipakai; jumlah kontribusi = jumlah record kontribusi. |
| 13 | CRUD arsip | Di dashboard: tambah arsip, edit judulnya, toggle unggulan, hapus dengan konfirmasi | Setiap operasi tersimpan, daftar diperbarui, toast muncul; galeri menunjukkan perubahan yang sama. |
| 14 | Persistensi setelah refresh | Setelah langkah 9–13, refresh halaman | Semua perubahan masih ada; arsip seed tidak ditimpa. |
| 15 | Reset data demo | Klik `Reset data demo`, batalkan sekali lalu konfirmasi | Pembatalan tidak mengubah data; konfirmasi mengembalikan 8 arsip awal dan mengosongkan kontribusi + kapsul, dengan toast. |
| 16 | Responsif | Buka di desktop lalu device emulation smartphone (≈390 px) | Header, grid, toolbar, form, dan dashboard tidak overflow; tombol tetap dapat diklik; navigasi mobile berfungsi. |
| 17 | Tidak ada error JS | Buka semua rute, jalankan alur 1–16, pantau Console | Tidak ada uncaught exception atau error yang mengganggu fitur utama. |

**Definisi selesai:** ke-17 kriteria lulus pada desktop dan smartphone, dan tidak ada fitur P0 yang hilang.

---

## 12. Rencana Implementasi — Latihan Satu Hari

Total estimasi ≈ **8 jam efektif**. Jika waktu terpotong, prioritaskan P0; potong P1 lalu P2. **Jangan pernah mengorbankan kriteria 1–17.**

### Iterasi 1 — Project Setup (45–50 menit) **[P0]**

- Inisialisasi project Vite (`npm create vite@latest`, pilih Vanilla JS).
- Buat struktur folder sesuai 5.2.
- `index.html`: `<main id="app">`, skip link, container toast.
- CSS global + token warna/typography.
- Header/footer + hash router dengan 7 rute.
- **Prioritas jika mepet:** router + header dulu, footer belakangan.

### Iterasi 2 — Visual Foundation (60–70 menit) **[P0, animasi P1]**

- Landing page: hero, tagline, pertanyaan pembuka, CTA.
- Statistik dari store.
- Sistem grid asimetris, kartu dasar, badge, tombol.
- Animasi pembuka bertahap + grain CSS + `prefers-reduced-motion`.
- Placeholder SVG lokal untuk gambar.
- **Dapat disederhanakan:** grain + animasi → statis.

### Iterasi 3 — Archive Experience (100–110 menit) **[P0]**

- `seed.js` 8 arsip + 6 kategori.
- `storage.js`: read/write/seed/reset + try/catch.
- Galeri: kartu, pencarian, filter, sorting, filter unggulan, hitungan hasil, empty state.
- Memory Room: layout editorial, meta, cerita, blok nilai, tombol kembali, error state.
- **P1:** rekomendasi 3 kartu, pemutar audio dengan fallback.

### Iterasi 4 — User Interaction (100–110 menit) **[P0]**

- Form kontribusi + validasi + sanitasi + FileReader gambar (2 MB).
- Mirror `Contribution` → `Archive`, toast, redirect `?new=`.
- Time Capsule: form, daftar kartu, hapus + konfirmasi, empty state.
- Timeline: 4 periode, tombol tahun, konten ilustratif, label simulasi.
- **P1:** slider tersinkron, transisi crossfade.

### Iterasi 5 — Management Dashboard (100–110 menit) **[P0]**

- Banner mode demo + statistik real-time.
- Daftar arsip + toggle unggulan.
- Form tambah/edit arsip (shared component).
- Hapus + konfirmasi + toast.
- Tab kontribusi (read-only).
- Reset data demo + konfirmasi.
- **P1:** modal konfirmasi kustom menggantikan `confirm()`.

### Iterasi 6 — Finalization (70–80 menit) **[P0]**

- Uji 17 kriteria penerimaan desktop + smartphone.
- Perbaikan bug, overflow, kontras, focus ring, alt text.
- Uji refresh, reset, dan localStorage penuh/simulasi error.
- Rapikan animasi dan UI terakhir.
- Update README singkat: cara menjalankan, keterangan localStorage, dan hak cipta konten contoh.

### 12.1 Urutan prioritas saat waktu tidak cukup

1. **P0 inti:** router, landing + CTA, galeri + filter, detail, form kontribusi, kapsul, timeline, dashboard CRUD + reset.
2. **P0 pendukung:** empty/error state, validasi, sanitasi, aksesibilitas keyboard, responsivitas.
3. **P1:** animasi sinematik, rekomendasi, audio, slider timeline, modal kustom.
4. **P2:** downscale gambar, scroll storytelling lanjutan, ekspor data.

---

## 13. Lampiran — Keputusan & Catatan Implementasi

| Keputusan | Alasan |
|---|---|
| Hash routing, bukan History API | Tidak butuh konfigurasi server; refresh tetap bekerja di Vite statis. |
| Enum kategori disimpan terpusat di `categories.js` | Mencegah inkonsistensi antara form, filter, seed, dan dashboard. |
| Kontribusi dibayangkan ulang sebagai `Archive` | Memenuhi "arsip baru langsung muncul di galeri" tanpa query lintas key. |
| `story` ditambahkan ke model Archive | Detail harus bersifat naratif, bukan tabel; `description` dipakai untuk kartu. |
| Audio default `null` | Menghindari aset eksternal dan file besar; pemutar ditampilkan hanya jika ada file lokal. |
| Inline SVG sebelum Lucide | Menghindari dependensi/CDN, tetap offline. |
| Teks Inggris untuk konsep, teks Indonesia untuk UI operasional | Menjaga identitas tagline sesuai brief sekaligus nyaman bagi pengguna Indonesia. |
| Semua data ilustratif diberi label | Mengurangi risiko misinformasi dan hak cipta. |

**Catatan terakhir untuk agent implementasi:** spesifikasi ini sudah cukup untuk langsung mulai coding setelah ditinjau. Jangan menambahkan fitur di luar Bab 10 tanpa persetujuan. Jangan mulai membuat aplikasi sebelum spesifikasi ini dikonfirmasi.
