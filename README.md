# MUSEUM OF ALMOST

Museum digital sederhana untuk merekam "hal-hal yang hampir kita lupakan": kenangan, kebiasaan, suara, dan benda sehari-hari. Aplikasi ini berjalan sepenuhnya di browser sebagai situs statis; seluruh data disimpan di `localStorage` perangkat yang dipakai.

> **MODE DEMO.** Tidak ada server, database, login, atau sinkronisasi antarperangkat. Lihat bagian [Keterbatasan](#keterbatasan).

---

## Tujuan

Menyediakan ruang pameran digital tempat pengunjung dapat:

- menjelajahi arsip contoh tentang budaya dan kenangan sehari-hari;
- mencari, menyaring, dan mengurutkan arsip;
- menambahkan kenangan sendiri ke koleksi **di perangkatnya sendiri**;
- mencoba simulasi kapsul waktu dan linimasa periode;
- mengelola data lokal melalui dashboard demo tanpa autentikasi.

Isi arsip bawaan bersifat ilustratif, bukan dokumentasi sejarah terverifikasi.

---

## Fitur yang benar-benar tersedia

### 1. Explore / Beranda (`#/`)

- Hero dengan pertanyaan pembuka dan tagline museum.
- Bagian "Why We Exist" dan kontak WhatsApp publik.
- Arsip unggulan (maksimal 3 kartu) dari koleksi lokal.
- Statistik: jumlah arsip, kategori, arsip unggulan, kontribusi, dan kapsul.
- Tautan ke galeri dan halaman kontribusi.

Nomor WhatsApp dikonfigurasi di `src/products.js` sebagai `6285168934630` (dari `085168934630`) dan dipakai untuk tautan `wa.me`.

### 2. The Archives (`#/archives`)

- Pencarian kata kunci pada **judul** dan **deskripsi** arsip.
- Filter kategori (6 kategori bawaan).
- Pengurutan: terbaru, terlama, Judul A–Z, Judul Z–A.
- Checkbox **Hanya arsip unggulan**.
- Tombol **Hapus filter** dan informasi "Menampilkan X dari Y arsip".
- Kartu arsip menuju halaman detail; kategori, asal, periode, dan status unggulan ditampilkan.
- Logika filter berada di modul murni `src/archive-filter.js`.

### 3. The Memory Room (`#/archive/:id`)

- Judul, kategori, nomor arsip, metadata (asal, periode, tipe, status).
- Cerita arsip dan kutipan nilai sejarah/emosional.
- Pemutar audio opsional bila `audioUrl` diisi.
- Arsip terkait dari kategori yang sama atau arsip unggulan.
- Placeholder ditampilkan bila gambar tidak tersedia atau gagal dimuat.

### 4. Contribute (`#/contribute`)

- Formulir judul, kategori, asal daerah, periode, dan cerita dengan validasi sisi klien.
- Foto opsional: PNG, JPEG, WebP, atau GIF, maksimal 2 MB, disimpan sebagai data URL.
- Arsip hasil kontribusi ditambahkan ke koleksi lokal dengan `source: 'contribution'`.
- Kontribusi tidak dikirim ke server dan tidak terlihat pengguna lain.

### 5. Time Capsule (`#/time-capsule`)

- Simulasi lokal: nama, pesan, dan tahun target opsional.
- Daftar pesan yang tersimpan di browser, bisa dihapus.
- Tidak ada pengiriman nyata ke masa depan.

### 6. Time Machine (`#/timeline`)

- Empat periode ilustratif (1990, 2005, 2020, 2026).
- Navigasi lewat titik periode, slider, atau tombol Sebelumnya/Berikutnya.
- Label **SIMULATION — ilustratif** ditampilkan di halaman.

### 7. Management — Demo (`#/admin`)

Dashboard ini **tanpa login**; siapa pun yang membuka halaman di browser yang sama dapat mengubah data lokalnya.

- Overview berisi statistik koleksi.
- Tabel arsip dengan aksi tambah, edit, hapus (dengan konfirmasi), dan ubah status unggulan.
- Daftar kontribusi pengunjung bersifat read-only.
- Kelola data lokal: **Export Archives** ke JSON, **Import Archives** dari JSON dengan validasi, dan **Reset Demo Data**.
- Reset dan import hanya mengganti arsip; kontribusi dan kapsul tidak diubah.

### 8. Perilaku umum

- Routing berbasis hash (`#/`) tanpa server rewrite.
- Menu navigasi desktop dan mobile.
- HTML di-escape melalui `escapeHtml()` sebelum disisipkan ke halaman.
- URL media dibatasi pada path relatif lokal atau data URL dengan MIME yang diizinkan.
- CSP dasar didefinisikan lewat meta tag di `index.html`.
- Penanganan hash rusak: rute tidak dikenal/encoding salah menampilkan halaman 404, bukan error.
- Ilustrasi SVG lokal dipakai otomatis untuk arsip bawaan yang `imageUrl`-nya kosong. Gambar atau data URL yang diisi pengguna tetap lebih prioritas, dan data yang sudah tersimpan tidak ditimpa.
- Notifikasi `toast` untuk hasil aksi dan kondisi penyimpanan.

---

## Stack

| Bagian | Implementasi |
|---|---|
| Markup | HTML (`index.html`) |
| Gaya | CSS murni (`src/style.css`) |
| Logika | JavaScript ES modules (`src/*.js`) |
| Penyimpanan | `localStorage` browser (`src/store.js`) |
| Build/dev | Vite `7.3.8` |
| Unit test | Vitest `4.1.12` |
| Dependency aplikasi | Tidak ada framework UI, backend, atau database |

Versi terpasang berasal dari `package-lock.json`. Karena Vite 7 dipakai, gunakan Node.js **`^20.19.0 || >=22.12.0`** dan npm yang kompatibel.

Struktur utama:

```text
index.html
src/
  main.js           bootstrap dan hash router
  hash-route.js     parser hash murni
  ui.js             tampilan, formulir, dashboard demo
  store.js          localStorage, validasi, CRUD, import/ekspor
  products.js       kategori, 8 arsip contoh, 4 periode timeline, kontak
  archive-filter.js pencarian/filter/sort
  style.css         design system dan layout responsif
tests/              unit test Vitest
public/image/       ilustrasi SVG lokal untuk 8 arsip bawaan
image/              aset gambar lokal tambahan
```

---

## Cara instal

```bash
git clone <URL_REPOSITORY> museum-of-almost
cd museum-of-almost
npm install
```

Lockfile sudah ada, sehingga `npm ci` juga bisa dipakai untuk instalasi yang reproduksibel.

---

## Cara menjalankan server pengembangan

```bash
npm run dev
```

Vite akan membuka alamat lokal (default `http://localhost:5173`). Halaman yang tersedia antara lain `#/`, `#/archives`, `#/archive/arc_congklak`, `#/timeline`, `#/time-capsule`, `#/contribute`, dan `#/admin`.

---

## Cara test

```bash
npm test
```

Perintah ini menjalankan `vitest run` sekali dan selesai. Saat ini ada **8 file test / 66 test**:

| File | Yang diuji |
|---|---|
| `tests/archives.test.js` | pencarian, filter kategori, sort, filter unggulan |
| `tests/validation.test.js` | validasi arsip dan koleksi |
| `tests/storage.test.js` | baca/tulis, pemulihan data rusak, migrasi key lama |
| `tests/whatsapp.test.js` | validasi nomor dan pembentukan tautan `wa.me` |
| `tests/hash-route.test.js` | rute valid dan hash encoding rusak |
| `tests/security.test.js` | escaping HTML, URL media, query WhatsApp |
| `tests/csp.test.js` | keberadaan CSP dasar di `index.html` |
| `tests/images.test.js` | pemetaan, validitas path, dan keberadaan file SVG ilustrasi |

---

## Cara build

```bash
npm run build
```

Hasil build ditulis ke folder `dist/` berisi `index.html` dan aset di `dist/assets/`. Untuk memeriksa hasil build secara lokal:

```bash
npm run preview
```

---

## Deployment

Aplikasi ini adalah situs statis, jadi tidak perlu runtime Node, server API, database, atau variabel lingkungan di hosting.

1. Jalankan `npm run build`.
2. Unggah **isi folder `dist/`** ke host statis (misalnya layanan hosting statis, nginx, atau server statis lain).
3. Pastikan `index.html` dapat diakses pada root domain.

Catatan deployment:

- Routing memakai hash (`#/...`), jadi tidak perlu aturan *rewrite* SPA di server.
- Tanpa `vite.config.js`, Vite memakai `base: '/'`. Jika aplikasi dipasang di subpath, konfigurasi `base` harus disesuaikan saat build.
- CSP sudah berupa meta tag di `index.html`. Untuk kebijakan yang lebih ketat (misalnya `frame-ancestors`), tambahkan header di host karena direktif tersebut tidak berlaku pada CSP berbasis meta.
- Folder `dist/` dan `node_modules/` tidak perlu disertakan dalam deploy sumber; keduanya sudah ada di `.gitignore`.

---

## Keterbatasan

- **Data hanya lokal.** Arsip, kontribusi, dan kapsul tersimpan di `localStorage` browser tempat aplikasi dibuka. Data tidak sinkron ke perangkat lain dan akan hilang jika data browser dibersihkan, browser diganti, atau aplikasi dibuka dalam mode privat dengan penyimpanan terisolasi.
- **Kapasitas penyimpanan terbatas.** `localStorage` biasanya hanya beberapa MB per origin. Penulisan gagal akan memunculkan notifikasi error; data rusak dipulihkan ke 8 arsip contoh bawaan.
- **Tidak ada autentikasi backend.** Halaman `#/admin` adalah dashboard demo tanpa login. Siapa pun yang membuka halaman tersebut pada browser yang sama dapat menambah, mengubah, menghapus, mengimpor, atau mereset arsip lokal. Tidak ada pengguna, sesi, RBAC, atau audit log server.
- **Tidak ada backend, database, atau API eksternal.** Semua operasi terjadi di browser. Rencana migrasi ke arsitektur berbasis server ada di `ARCHITECTURE.md`, tetapi **belum diimplementasikan**.
- **Kontribusi bersifat lokal.** Formulir kontribusi tidak mengirim data ke kurator atau pengguna lain.
- **Time Capsule hanya simulasi.** Pesan tidak benar-benar dikirim atau dijadwalkan ke masa depan.
- **Linimasa ilustratif.** Periode 1990–2026 adalah narasi contoh, bukan data sejarah terverifikasi.
- **Konten awal contoh.** Delapan arsip bawaan dan teksnya bersifat ilustratif. `imageUrl` pada data bawaan sengaja kosong; tampilan memakai ilustrasi SVG lokal di `public/image/` sebagai fallback. `audioUrl` juga kosong sehingga tidak ada pemutar audio pada arsip bawaan.
- **Keamanan adalah pertahanan dasar sisi klien.** `escapeHtml()`, pembatasan URL media, dan CSP meta membantu mencegah beberapa masalah umum, tetapi tidak menggantikan validasi dan kontrol akses di server jika aplikasi kelak dikembangkan dengan backend.
