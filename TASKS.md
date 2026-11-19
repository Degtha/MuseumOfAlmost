# TASKS.md — Museum of Almost

> **Panduan kerja implementasi untuk AI coding agent**
>
> | Field | Nilai |
> |---|---|
> | Nama proyek | Museum of Almost |
> | Ringkasan | Museum digital interaktif berbasis Vite + JavaScript Vanilla yang mengarsipkan budaya, kenangan, suara, resep, tempat, dan benda yang perlahan terlupakan. Seluruh data disimpan lokal di browser melalui localStorage. |
> | Identitas | MUSEUM OF ALMOST — *A Living Digital Museum of Things We Almost Forgot.* |
> | Tagline | *Not everything lost was meant to be forgotten.* |
> | Dokumen acuan | `SPEC.md` v1.0 dan `UI-SPEC.md` v1.0 (dibaca, tidak diubah) |
> | Total milestone | **15** |
> | Total task | **95** |
> | Status implementasi | **Not Started** — semua task belum boleh dikerjakan sebelum dokumen ini ditinjau |
> | Perkiraan total | ~611 menit (~10,2 jam) jika seluruh task dikerjakan |
> | Perkiraan Versi Demonstrasi Minimum | ~543 menit (~9,1 jam), lihat Bab 2 |
> | Terakhir diperbarui | 19 November 2026 |

**Aturan penting:** jangan mengubah `SPEC.md`, `UI-SPEC.md`, atau membuat file aplikasi sebelum `TASKS.md` ini ditinjau. Task ditandai `Completed` **hanya** jika seluruh acceptance criteria task terpenuhi dan dapat diverifikasi manual.

---

## 1. Progress Tracking

### 1.1 Legenda status

| Status | Arti |
|---|---|
| `Not Started` | Belum ada pekerjaan. (Nilai awal semua task.) |
| `In Progress` | Sedang dikerjakan; acceptance criteria belum lengkap. |
| `Completed` | Semua acceptance criteria terpenuhi dan sudah diuji manual. |
| `Blocked` | Menunggu task/dependensi lain atau keputusan reviewer. |

### 1.2 Ringkasan status

| Status | Jumlah task |
|---|---|
| Not Started | 95 |
| In Progress | 0 |
| Completed | 0 |
| Blocked | 0 |

### 1.3 Progress checklist milestone

- [ ] **M1 — Project Scaffold** (TASK-001 s.d. TASK-006)
- [ ] **M2 — Landing Page: The Entrance** (TASK-007 s.d. TASK-014)
- [ ] **M3 — Archive Gallery: The Archives** (TASK-015 s.d. TASK-021)
- [ ] **M4 — Search, Filter, dan Sorting** (TASK-022 s.d. TASK-029)
- [ ] **M5 — Memory Room: Archive Detail** (TASK-030 s.d. TASK-037)
- [ ] **M6 — Leave Something Behind: Contribution** (TASK-038 s.d. TASK-044)
- [ ] **M7 — The Time Capsule** (TASK-045 s.d. TASK-051)
- [ ] **M8 — The Last Time Machine** (TASK-052 s.d. TASK-057)
- [ ] **M9 — Dashboard CRUD: Museum Management** (TASK-058 s.d. TASK-067)
- [ ] **M10 — LocalStorage dan Data Management** (TASK-068 s.d. TASK-073)
- [ ] **M11 — Responsive Design dan Accessibility** (TASK-074 s.d. TASK-079)
- [ ] **M12 — Testing dan Bug Fixing** (TASK-080 s.d. TASK-083)
- [ ] **M13 — Security Review** (TASK-084 s.d. TASK-087)
- [ ] **M14 — Production Build** (TASK-088 s.d. TASK-091)
- [ ] **M15 — Deployment** (TASK-092 s.d. TASK-095)

### 1.4 Progress checklist global

- [ ] Seluruh task P0 selesai dan lulus acceptance criteria.
- [ ] 17 kriteria penerimaan `SPEC.md` terpenuhi.
- [ ] 15 kriteria penerimaan `UI-SPEC.md` terpenuhi.
- [ ] Tidak ada error JavaScript yang mengganggu fitur utama.
- [ ] Data tetap tersedia setelah refresh.
- [ ] `TASKS.md` diperbarui dengan status terakhir sebelum diserahkan.

---

## 2. Estimasi Waktu & Strategi Satu Hari

### 2.1 Kategori prioritas

| Prioritas | Arti | Perlakuan |
|---|---|---|
| **P0 — Critical** | Wajib agar aplikasi memiliki fungsi utama museum digital. | Dikerjakan lebih dulu. |
| **P1 — High** | Penting untuk kualitas pengalaman, tapi bisa disederhanakan. | Dikerjakan jika masih ada waktu. |
| **P2 — Medium** | Penyempurnaan visual/interaksi lanjutan. | Ditunda. |
| **P3 — Low** | Aktivitas pendukung di luar inti latihan. | Ditunda bila waktu habis. |

### 2.2 Versi Demonstrasi Minimum (VDM) — target satu hari

Jika seluruh 95 task tidak memungkinkan, **VDM** adalah versi yang tetap memberikan pengalaman museum digital utuh:

**Termasuk VDM (kerjakan dalam urutan ini):**
TASK-001–006, 007–012, 014–021, 022–029, 030–034, 037–044, 045–051, 052–055, 057–067, 068–079, 080–083, 084–087.

**Dikecualikan dari VDM:**
TASK-013 (animasi hero), TASK-035–036 (audio & related archives), TASK-056 (transisi timeline), TASK-088–095 (build & deployment).

**VDM tetap memenuhi:** masuk museum → jelajah galeri → cari/filter → baca cerita → tinggalkan kenangan → tulis kapsul → lihat timeline → kelola arsip demo → data bertahan setelah refresh → tampilan desktop & smartphone.

**Tidak boleh dikorbankan:** hierarki visual charcoal/ivory/bronze, tombol CTA, empty/error state, validasi form, label DEMO/SIMULATION, kontras teks, focus ring, dan tidak adanya error JavaScript.

### 2.3 Rincian estimasi

| Kelompok | Task | Estimasi | Keterangan |
|---|---|---|---|
| Fitur wajib MVP (VDM) | 83 task | ~543 menit (~9,1 jam) | Fokus utama latihan. |
| Fitur tambahan (P1) | 4 task | ~23 menit | Animasi, audio, related, transisi. |
| Penyempurnaan & deployment (P2/P3) | 8 task | ~45 menit | Build, README, hosting. |
| **Total** | **95 task** | **~611 menit (~10,2 jam)** | — |

> Jika waktu tersisa kurang dari 30 menit di akhir sesi, hentikan di TASK-083 dan serahkan VDM. **Jangan mengorbankan kualitas pengalaman inti hanya demi menyelesaikan semua task.**

---

## 3. Dependency Management

| Task / kelompok | Bergantung pada | Alasan |
|---|---|---|
| M2 Landing | TASK-005, TASK-009, TASK-010 | Hero butuh navbar/toast, card, dan storage. |
| M3 Gallery | TASK-009, TASK-010, TASK-015 | Grid merender data seed & memakai card reusable. |
| M4 Search/Filter | TASK-018, TASK-015 | Filter bekerja di atas data yang sudah dirender. |
| M5 Memory Room | TASK-004, TASK-018, TASK-016 | Detail memakai router, kartu, dan placeholder gambar. |
| M6 Contribution | TASK-010, TASK-015, TASK-005 | Butuh storage, enum kategori, dan toast. |
| M7 Time Capsule | TASK-010, TASK-005 | Butuh storage dan toast. |
| M8 Timeline | TASK-015, TASK-016 | Butuh data contoh dan aset ilustrasi. |
| M9 Dashboard | TASK-010, TASK-015, TASK-042, TASK-005 | CRUD memakai storage, kategori, kontribusi, toast. |
| M10 Data Management | TASK-010, TASK-042, TASK-048, TASK-062 | Audit penyimpanan setelah semua fitur penulis data ada. |
| M11 Responsive & A11y | Semua view selesai | Perbaikan layout & aksesibilitas menyeluruh. |
| M12 Testing | TASK-073, TASK-079 | Uji setelah persistensi & responsivitas stabil. |
| M13 Security | TASK-083 | Audit setelah bug fungsional selesai. |
| M14 Production Build | TASK-083, TASK-087 | Build setelah fitur & keamanan final. |
| M15 Deployment | TASK-091 | Deploy setelah preview production lulus. |

**Dependensi kritis:** TASK-010 (storage core) dan TASK-015 (data awal) adalah akar hampir semua fitur; kerjakan lebih awal meski urutan milestone menempatkannya setelah landing.

---

## 4. Milestone & Task Detail

---

## MILESTONE 1 — Project Scaffold

**Fokus:** menyiapkan fondasi aplikasi agar seluruh fitur memiliki tempat dan aturan yang konsisten.

### TASK-001 — Initialize Vite Project

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: None
- Track: One-Day Core

**Description:**
Inisialisasi project Vite dengan template Vanilla JavaScript. Jangan menambahkan framework atau library UI.

**Acceptance Criteria:**
- `npm run dev` berhasil menjalankan server Vite.
- Tidak ada error saat startup.
- Hanya dependensi Vite yang terpasang.

**Potential Files:**
- package.json
- package-lock.json
- vite.config.js

### TASK-002 — Create Folder Structure and Entry HTML

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-001
- Track: One-Day Core

**Description:**
Buat struktur folder `src/{styles,data,lib,components,views}` dan `public/images`, serta file `index.html` dengan `<main id="app">`, skip link, dan container toast.

**Acceptance Criteria:**
- Struktur folder sesuai `SPEC.md` Bab 5.2.
- `index.html` memuat `src/main.js` sebagai module.
- Skip link `Lewati ke konten` menjadi elemen pertama yang bisa difokus.

**Potential Files:**
- index.html
- src/main.js
- public/images/.gitkeep

### TASK-003 — Define Design Tokens and Global CSS

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-002
- Track: One-Day Core

**Description:**
Terapkan palet dan tipografi dari `UI-SPEC.md` Bab 2 (pakai nilai `#171715`, `#22221F`, `#EAE4D8`, `#CFC5B3`, `#A77B50`, `#858078`, `#777A60`), spacing scale, dan reset CSS.

**Acceptance Criteria:**
- Token warna, font, spacing, dan radius tersedia terpusat.
- Latar dominan charcoal dan teks ivory.
- Focus ring `:focus-visible` bronze didefinisikan global.

**Potential Files:**
- src/styles/tokens.css
- src/styles/global.css
- src/styles/components.css

### TASK-004 — Build Hash Router and Placeholder Views

- [ ] Status: Not Started
- Priority: P0
- Estimate: 10 minutes
- Dependencies: TASK-003
- Track: One-Day Core

**Description:**
Buat router hash untuk 7 rute dan render placeholder view ke `<main id="app">`. Router juga mengatur `document.title`, focus heading, dan scroll ke atas.

**Acceptance Criteria:**
- Rute `#/`, `#/archives`, `#/archive/:id`, `#/contribute`, `#/time-capsule`, `#/timeline`, `#/admin` dapat dibuka.
- Refresh pada rute mana pun tidak kosong.
- Tidak ada error console saat berpindah rute.

**Potential Files:**
- src/router.js
- src/main.js
- src/views/*.js

### TASK-005 — Build Navbar, Footer, and Toast Shell

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-004
- Track: One-Day Core

**Description:**
Buat layout shell: navbar dengan wordmark `MoA`, item `EXPLORE`, `COLLECTIONS`, `TIME MACHINE`, `TIME CAPSULE`, `ABOUT`, `CONTRIBUTE`, `MANAGEMENT — DEMO`, footer, dan container toast global.

**Acceptance Criteria:**
- Navbar sticky dan active state mengikuti rute.
- Item `MANAGEMENT — DEMO` terlihat dan diberi badge DEMO.
- Toast container menerima notifikasi `role="status"`.

**Potential Files:**
- src/components/navbar.js
- src/components/footer.js
- src/components/toast.js

### TASK-006 — Verify Local Development Server

- [ ] Status: Not Started
- Priority: P0
- Estimate: 4 minutes
- Dependencies: TASK-005
- Track: One-Day Core

**Description:**
Jalankan seluruh rute placeholder di browser lokal dan pastikan lingkungan bersih sebelum mengisi fitur.

**Acceptance Criteria:**
- `npm run dev` berjalan tanpa error.
- Konsol browser bersih dari uncaught exception.
- Navigasi antar placeholder berfungsi.

**Potential Files:**
- package.json
- src/main.js

---

## MILESTONE 2 — Landing Page: The Entrance

**Fokus:** menciptakan ritus masuk ke museum sesuai `UI-SPEC.md` Bab 4.A.

### TASK-007 — Build Hero Structure and Wordmark

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-005
- Track: One-Day Core

**Description:**
Buat hero full-viewport dengan eyebrow `A DIGITAL ARCHIVE — EST. 2026`, wordmark monogram `MoA`, dan display `MUSEUM OF ALMOST` dua baris.

**Acceptance Criteria:**
- Hero memenuhi viewport dengan konten terpusat secara editorial.
- Display memakai font serif dan ukuran `type-display`.
- Wordmark konsisten dengan navbar.

**Potential Files:**
- src/views/entrance.js
- src/components/hero.js
- src/styles/home.css

### TASK-008 — Add Tagline, Subtitle, Question, and CTAs

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-007
- Track: One-Day Core

**Description:**
Tambahkan subtitle `A Living Digital Museum of Things We Almost Forgot.`, kalimat pembuka persis dari `SPEC.md`, tombol `ENTER THE MUSEUM`, dan tautan sekunder `DISCOVER OUR PURPOSE`.

**Acceptance Criteria:**
- Teks kalimat pembuka persis: "If everything disappeared tomorrow, what would you wish we had saved today?"
- CTA primer mengarah ke `#/archives`.
- CTA sekunder mengarah ke section `#about`.

**Potential Files:**
- src/components/hero.js
- src/styles/home.css

### TASK-009 — Build Reusable Archive Card Base

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-003
- Track: One-Day Core

**Description:**
Buat komponen kartu arsip reusable yang dipakai landing, galeri, related archives, dan highlight kontribusi.

**Acceptance Criteria:**
- Kartu menerima props arsip dan merender judul, kategori, gambar, dan deskripsi singkat.
- Area kartu dapat diklik sebagai satu tautan.
- State hover dan focus-visible tersedia.

**Potential Files:**
- src/components/archiveCard.js
- src/styles/components.css

### TASK-010 — Build Storage Utility Core

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-002
- Track: One-Day Core

**Description:**
Buat modul penyimpanan dengan konstanta key `moa:archives:v1`, `moa:contributions:v1`, `moa:capsules:v1`, `moa:version:v1` dan fungsi baca/tulis dasar.

**Acceptance Criteria:**
- Fungsi `read`, `write`, dan `remove` tersedia.
- Semua penulisan dibungkus `try/catch`.
- Key konsisten dipakai seluruh aplikasi.

**Potential Files:**
- src/lib/storage.js
- src/lib/format.js

### TASK-011 — Build Museum Statistics and Why We Exist

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-010
- Track: One-Day Core

**Description:**
Buat section `WHY WE EXIST` (3 nilai `REMEMBER`, `RECORD`, `RETURN`) dan `MUSEUM STATISTICS` dengan angka yang dihitung dari data arsip, kategori unik, dan kontribusi.

**Acceptance Criteria:**
- Statistik tidak statis; berubah saat data bertambah.
- Angka memakai font display bronze.
- Jika data gagal dibaca, angka menampilkan `—`.

**Potential Files:**
- src/views/entrance.js
- src/components/statisticsCard.js
- src/styles/home.css

### TASK-012 — Build Featured Archives and Footer Content

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-011, TASK-015
- Track: One-Day Core

**Description:**
Tampilkan 3 arsip `featured: true` dengan pola span 6/3/3 kolom, tambahkan closing statement dan isi footer.

**Acceptance Criteria:**
- Featured archives berasal dari data, bukan hardcode judul.
- Closing statement menampilkan tagline museum.
- Footer memuat catatan lokal-only dan label demo.

**Potential Files:**
- src/views/entrance.js
- src/components/footer.js

### TASK-013 — Add Hero Opening Animation and Reduced Motion

- [ ] Status: Not Started
- Priority: P1
- Estimate: 6 minutes
- Dependencies: TASK-007
- Track: One-Day Optional

**Description:**
Tambahkan stagger fade-in pada eyebrow, judul, subtitle, pertanyaan, dan CTA, plus grain CSS statis.

**Acceptance Criteria:**
- Urutan animasi sesuai `UI-SPEC.md` Bab 8.2.
- `prefers-reduced-motion: reduce` menonaktifkan animasi.
- Animasi hanya memakai `opacity` dan `transform`.

**Potential Files:**
- src/styles/home.css
- src/styles/global.css

### TASK-014 — Verify Landing Responsiveness

- [ ] Status: Not Started
- Priority: P0
- Estimate: 4 minutes
- Dependencies: TASK-012
- Track: One-Day Core

**Description:**
Periksa landing di 1440 px, 820 px, dan 390 px sesuai wireframe `UI-SPEC.md` Bab 5.1 dan 6.1.

**Acceptance Criteria:**
- Tidak ada horizontal overflow.
- Tombol dapat diklik dan memiliki area sentuh ≥44 px di mobile.
- Hero tetap terbaca di semua breakpoint.

**Potential Files:**
- src/styles/home.css
- src/styles/responsive.css

---

## MILESTONE 3 — Archive Gallery: The Archives

**Fokus:** membuat katalog arsip digital dengan data awal Indonesia dan layout editorial.

### TASK-015 — Define Categories and 8 Seed Archives

- [ ] Status: Not Started
- Priority: P0
- Estimate: 12 minutes
- Dependencies: TASK-010
- Track: One-Day Core

**Description:**
Buat enum 6 kategori dan 8 arsip contoh sesuai `SPEC.md` Bab 7, lengkap dengan `story`, `historicalValue`, `source: 'seed'`, dan `createdAt` ISO.

**Acceptance Criteria:**
- 8 arsip memiliki id unik dan field wajib terisi.
- 3 arsip berstatus `featured: true`.
- Kategori hanya memakai 6 nilai yang ditentukan.
- `audioUrl` bernilai `null` untuk seed.

**Potential Files:**
- src/data/categories.js
- src/data/seed.js

### TASK-016 — Create Local Placeholder Assets

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-015
- Track: One-Day Core

**Description:**
Siapkan SVG lokal ringan untuk hero, 8 arsip, dan 4 ilustrasi timeline dengan tone analog sesuai `UI-SPEC.md` Bab 11.

**Acceptance Criteria:**
- Semua aset berada di `public/images/`.
- Tidak ada URL gambar eksternal.
- Setiap file < 200 KB.

**Potential Files:**
- public/images/hero-archive.svg
- public/images/archive-*.svg
- public/images/timeline-*.svg

### TASK-017 — Build Asymmetric Archive Grid

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-009
- Track: One-Day Core

**Description:**
Buat grid 12 kolom dengan pola span 5/3/4 → 4/4/4 → 3/6/3 dan featured span lebih besar.

**Acceptance Criteria:**
- Grid tidak monoton dan sesuai wireframe galeri.
- Tablet 2 kolom, mobile 1 kolom.
- Gap 24–32 px desktop.

**Potential Files:**
- src/components/archiveGrid.js
- src/styles/archives.css

### TASK-018 — Render Archive Cards from Data

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-015, TASK-017
- Track: One-Day Core

**Description:**
Ambil arsip dari storage (seed jika kosong) dan render ke grid melalui komponen kartu.

**Acceptance Criteria:**
- Minimal 8 kartu tampil saat localStorage kosong.
- Kartu mengikuti urutan data yang diberikan.
- Tidak ada kartu duplikat.

**Potential Files:**
- src/views/archives.js
- src/components/archiveGrid.js

### TASK-019 — Add Archive Number, Metadata, and Badges

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-018
- Track: One-Day Core

**Description:**
Tambahkan `NO.001`, kategori, periode, `archiveType`, badge `UNGGULAN`, dan badge `KONTRIBUSI PENGUNJUNG` pada kartu.

**Acceptance Criteria:**
- Periode `null` ditampilkan sebagai `Periode tidak diketahui`.
- Badge unggulan memakai ikon + teks, bukan hanya warna.
- Deskripsi dibatasi 3 baris dengan ellipsis.

**Potential Files:**
- src/components/archiveCard.js
- src/styles/components.css

### TASK-020 — Wire Card Navigation to Memory Room

- [ ] Status: Not Started
- Priority: P0
- Estimate: 4 minutes
- Dependencies: TASK-018
- Track: One-Day Core

**Description:**
Pastikan seluruh kartu mengarah ke `#/archive/:id` dengan id arsip yang benar.

**Acceptance Criteria:**
- Klik kartu membuka detail arsip yang sesuai.
- Link dapat diakses dengan keyboard.
- Router tidak melempar error untuk id valid.

**Potential Files:**
- src/components/archiveCard.js
- src/router.js

### TASK-021 — Verify Gallery Fallback and Responsiveness

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-016, TASK-019
- Track: One-Day Core

**Description:**
Uji fallback gambar dan tampilan galeri di desktop, tablet, dan smartphone.

**Acceptance Criteria:**
- Gambar gagal dimuat → placeholder lokal dengan inisial kategori.
- Tidak ada broken image icon.
- Grid rapi di 1440/820/390 px.

**Potential Files:**
- src/components/archiveCard.js
- src/styles/archives.css

---

## MILESTONE 4 — Search, Filter, dan Sorting

**Fokus:** memudahkan pengunjung menemukan arsip sesuai `SPEC.md` Bab 4.2.

### TASK-022 — Build Search Bar Component

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-018
- Track: One-Day Core

**Description:**
Buat input pencarian dengan ikon search dan placeholder `Search archives...` di toolbar galeri.

**Acceptance Criteria:**
- Input memiliki label yang terlihat atau `aria-label`.
- Focus ring bronze muncul saat fokus.
- Escape mengosongkan input.

**Potential Files:**
- src/components/searchBar.js
- src/styles/filters.css

### TASK-023 — Implement Title and Description Search

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-022
- Track: One-Day Core

**Description:**
Filter arsip secara case-insensitive berdasarkan `title` dan `description` (substring).

**Acceptance Criteria:**
- `congklak` dan `teras` menemukan arsip Congklak.
- Pencarian langsung memperbarui grid tanpa refresh.
- Menghapus teks mengembalikan semua arsip.

**Potential Files:**
- src/utils/archiveFilter.js
- src/views/archives.js

### TASK-024 — Build Category Filter

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-015, TASK-018
- Track: One-Day Core

**Description:**
Buat kontrol kategori dengan opsi `Semua kategori` plus 6 kategori dari enum.

**Acceptance Criteria:**
- Memilih `Traditional Food` hanya menampilkan arsip terkait.
- Nilai kategori diverifikasi terhadap enum.
- Kategori aktif diberi penanda teks, bukan hanya warna.

**Potential Files:**
- src/components/categoryFilter.js
- src/data/categories.js

### TASK-025 — Build Sorting Control and Logic

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-018
- Track: One-Day Core

**Description:**
Sediakan opsi `Judul A–Z`, `Judul Z–A`, `Terbaru`, `Terlama` dan terapkan pada daftar hasil.

**Acceptance Criteria:**
- Default sorting adalah `Terbaru` berdasarkan `createdAt`.
- Urutan berubah sesuai opsi yang dipilih.
- Sorting tidak mengubah data asli di localStorage.

**Potential Files:**
- src/utils/archiveFilter.js
- src/views/archives.js

### TASK-026 — Build Featured-Only Toggle

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-018
- Track: One-Day Core

**Description:**
Tambahkan checkbox `Hanya arsip unggulan` pada toolbar.

**Acceptance Criteria:**
- Hanya arsip `featured: true` yang tampil saat aktif.
- Status toggle terbaca oleh screen reader.
- Dapat dikombinasikan dengan pencarian.

**Potential Files:**
- src/views/archives.js
- src/styles/filters.css

### TASK-027 — Combine Filters, Result Count, and Reset

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-023, TASK-024, TASK-025, TASK-026
- Track: One-Day Core

**Description:**
Gabungkan seluruh kontrol filter dan tampilkan hitungan `Menampilkan X dari Y arsip` plus tombol `Hapus filter`.

**Acceptance Criteria:**
- Semua filter dapat dipakai bersamaan.
- Hitungan diperbarui setiap perubahan.
- Tombol `Hapus filter` hanya muncul saat ada filter aktif.

**Potential Files:**
- src/views/archives.js
- src/utils/archiveFilter.js

### TASK-028 — Build Gallery Empty State

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-027
- Track: One-Day Core

**Description:**
Tampilkan ilustrasi kotak arsip kosong, pesan `Tidak ada arsip yang cocok.`, dan tombol `Hapus filter` saat hasil 0.

**Acceptance Criteria:**
- Grid kosong tidak ditampilkan tanpa penjelasan.
- Tombol reset mengembalikan tampilan awal.
- Empty state mengikuti tema museum.

**Potential Files:**
- src/components/emptyState.js
- src/styles/archives.css

### TASK-029 — Verify Filter Combinations

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-028
- Track: One-Day Core

**Description:**
Uji kombinasi pencarian + kategori + sorting + featured di desktop dan mobile.

**Acceptance Criteria:**
- Kriteria 4, 5, dan 6 `SPEC.md` lulus.
- Toolbar tetap mudah ditemukan di mobile.
- Tidak ada error console.

**Potential Files:**
- src/views/archives.js
- src/styles/filters.css

---

## MILESTONE 5 — Memory Room: Archive Detail

**Fokus:** menghadirkan pengalaman membaca dokumentasi artefak museum.

### TASK-030 — Build Memory Room Route and Skeleton

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-004, TASK-018
- Track: One-Day Core

**Description:**
Buat view `#/archive/:id` dengan urutan breadcrumb, nomor, judul, gambar, metadata, cerita, kutipan, audio, related, dan tombol kembali.

**Acceptance Criteria:**
- Rute terbuka untuk id seed maupun kontribusi.
- Struktur mengikuti `UI-SPEC.md` Bab 4.C.
- Satu `h1` per halaman.

**Potential Files:**
- src/views/memoryRoom.js
- src/styles/memory-room.css

### TASK-031 — Render Archive Header and Main Image

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-030, TASK-016
- Track: One-Day Core

**Description:**
Tampilkan `ARCHIVE NO. 001`, kategori, judul besar, gambar utama aspect 3:2, dan caption `Fig. 01 — Dokumentasi arsip`.

**Acceptance Criteria:**
- Data diambil dari arsip yang sesuai id.
- Gambar memiliki `alt` deskriptif.
- Fallback lokal dipakai jika gambar gagal.

**Potential Files:**
- src/views/memoryRoom.js
- src/components/archiveDetail.js

### TASK-032 — Build Sticky Metadata Panel

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-030
- Track: One-Day Core

**Description:**
Buat panel metadata `ORIGIN`, `PERIOD`, `TYPE`, `STATUS` dengan border tipis dan sticky di desktop.

**Acceptance Criteria:**
- Nilai kosong ditampilkan sebagai `Tidak diketahui`.
- Panel berubah jadi blok horizontal di mobile.
- Status arsip tidak hanya disampaikan lewat warna.

**Potential Files:**
- src/components/archiveDetail.js
- src/styles/memory-room.css

### TASK-033 — Render Story and Historical Value Quote

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-030
- Track: One-Day Core

**Description:**
Tampilkan `story` sebagai paragraf editorial lebar ≤62ch dan `historicalValue` sebagai blockquote serif italic dengan border kiri bronze.

**Acceptance Criteria:**
- Cerita 2–4 paragraf tampil lengkap.
- Line-height nyaman (~1.75).
- Bukan format tabel.

**Potential Files:**
- src/components/archiveDetail.js
- src/styles/memory-room.css

### TASK-034 — Build Back Links and Not-Found State

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-030
- Track: One-Day Core

**Description:**
Tambahkan tombol `← Kembali ke galeri` di awal dan akhir, serta halaman `Arsip tidak ditemukan` untuk id invalid.

**Acceptance Criteria:**
- Kedua tombol mengarah ke `#/archives`.
- Id invalid tidak menimbulkan exception.
- Error state memiliki tombol kembali.

**Potential Files:**
- src/views/memoryRoom.js
- src/components/emptyState.js

### TASK-035 — Implement Conditional Audio Player

- [ ] Status: Not Started
- Priority: P1
- Estimate: 6 minutes
- Dependencies: TASK-033
- Track: One-Day Optional

**Description:**
Tampilkan pemutar audio hanya jika `audioUrl` tersedia; gunakan audio lokal dan kontrol native.

**Acceptance Criteria:**
- Tidak ada autoplay.
- Jika audio gagal dimuat, tampilkan badge `Audio tidak tersedia pada perangkat ini`.
- Kontrol dapat dioperasikan dengan keyboard.

**Potential Files:**
- src/components/audioPlayer.js
- src/styles/components.css

### TASK-036 — Build Related Archives

- [ ] Status: Not Started
- Priority: P1
- Estimate: 6 minutes
- Dependencies: TASK-018, TASK-030
- Track: One-Day Optional

**Description:**
Tampilkan 3 arsip terkait dari kategori sama (exclude arsip saat ini), dilengkapi dengan arsip unggulan jika kurang.

**Acceptance Criteria:**
- Arsip saat ini tidak muncul dalam rekomendasi.
- Kartu related dapat diklik.
- Jumlah maksimal 3.

**Potential Files:**
- src/components/relatedArchives.js
- src/views/memoryRoom.js

### TASK-037 — Verify Memory Room Readability and Responsiveness

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-034
- Track: One-Day Core

**Description:**
Uji halaman detail di desktop dan mobile sesuai wireframe `UI-SPEC.md` Bab 5.3 dan 6.3.

**Acceptance Criteria:**
- Kriteria 7 `SPEC.md` lulus.
- Tidak ada overflow teks panjang.
- Kontras dan jarak baca memadai.

**Potential Files:**
- src/styles/memory-room.css

---

## MILESTONE 6 — Leave Something Behind: Contribution

**Fokus:** memungkinkan pengunjung menitipkan kenangan ke arsip lokal.

### TASK-038 — Build Contribution Page Layout

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-005
- Track: One-Day Core

**Description:**
Buat halaman `#/contribute` dengan eyebrow `CONTRIBUTE TO THE ARCHIVE`, heading `Leave Something Behind.`, dan layout dua kolom (form + catatan kurator).

**Acceptance Criteria:**
- Judul dan deskripsi sesuai `UI-SPEC.md` Bab 4.D.
- Panel form memakai `color-surface` dan border 1 px.
- Catatan kurator berisi ilustrasi amplop dan penjelasan lokal.

**Potential Files:**
- src/views/contribute.js
- src/styles/contribute.css

### TASK-039 — Build Contribution Form Fields

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-038, TASK-015
- Track: One-Day Core

**Description:**
Buat field judul, kategori (6 opsi), asal daerah, periode, textarea cerita, dan input gambar opsional dengan label jelas.

**Acceptance Criteria:**
- Setiap input memiliki `<label>` yang terhubung.
- Input gambar menerima PNG/JPEG/WebP/GIF.
- Tombol submit bertuliskan `PRESERVE THIS MEMORY`.

**Potential Files:**
- src/components/contributionForm.js
- src/styles/contribute.css

### TASK-040 — Implement Validation and Inline Errors

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-039
- Track: One-Day Core

**Description:**
Validasi pada blur dan submit: judul 3–100, cerita 20–2000, kategori wajib enum, asal ≤100, periode ≤40.

**Acceptance Criteria:**
- Error muncul dekat field dan ringkasan di atas form.
- Focus otomatis ke field pertama yang invalid.
- `aria-invalid` dan `aria-describedby` digunakan.

**Potential Files:**
- src/lib/validation.js
- src/components/contributionForm.js

### TASK-041 — Implement Image Validation and FileReader

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-039
- Track: One-Day Core

**Description:**
Periksa tipe file dan batas 2 MB, lalu baca gambar menjadi data URL dengan `FileReader`.

**Acceptance Criteria:**
- File >2 MB atau tipe lain ditolak dengan pesan jelas.
- Data URL hanya disimpan jika valid.
- Kegagalan baca tidak mengirim form.

**Potential Files:**
- src/lib/validation.js
- src/components/contributionForm.js

### TASK-042 — Implement Save Contribution and Archive Mirror

- [ ] Status: Not Started
- Priority: P0
- Estimate: 10 minutes
- Dependencies: TASK-010, TASK-015, TASK-040, TASK-041
- Track: One-Day Core

**Description:**
Simpan `Contribution` ke `moa:contributions:v1` dan buat `Archive` bayangan di `moa:archives:v1` dengan `source: 'contribution'` dan `contributionId`.

**Acceptance Criteria:**
- `archiveType` bernilai `Kontribusi Pengunjung` dan `featured: false`.
- `createdAt` berformat ISO.
- Kegagalan penyimpanan tidak mengosongkan form.

**Potential Files:**
- src/lib/storage.js
- src/lib/archive-service.js
- src/views/contribute.js

### TASK-043 — Implement Success Toast and Highlight Redirect

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-005, TASK-042
- Track: One-Day Core

**Description:**
Setelah sukses, tampilkan toast `Kenangan Anda tersimpan di perangkat ini.` dan arahkan ke `#/archives?new=<archiveId>`.

**Acceptance Criteria:**
- Toast tetap terlihat setelah perpindahan rute.
- Kartu baru tersorot ~5 detik dan di-scroll ke viewport.
- Badge `Kontribusi Pengunjung` muncul.

**Potential Files:**
- src/components/toast.js
- src/views/archives.js

### TASK-044 — Verify Local-Only Notice and Persistence

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-043
- Track: One-Day Core

**Description:**
Uji alur kontribusi lengkap termasuk refresh dan teks penjelasan penyimpanan lokal.

**Acceptance Criteria:**
- Kriteria 8 dan 9 `SPEC.md` lulus.
- Kontribusi tetap ada setelah refresh.
- Teks "hanya tersimpan di perangkat ini" terlihat permanen.

**Potential Files:**
- src/views/contribute.js

---

## MILESTONE 7 — The Time Capsule

**Fokus:** ruang pesan bergaya surat lama untuk generasi mendatang.

### TASK-045 — Build Time Capsule Page Layout

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-005
- Track: One-Day Core

**Description:**
Buat halaman `#/time-capsule` dengan eyebrow `A MESSAGE TO THE FUTURE`, heading `A Message to the Future.`, dan badge `LOCAL SIMULATION`.

**Acceptance Criteria:**
- Badge simulasi terlihat sebelum form.
- Panel form menyerupai amplop dengan border bronze tipis.
- Layout mengikuti `UI-SPEC.md` Bab 4.E.

**Potential Files:**
- src/views/timeCapsule.js
- src/styles/time-capsule.css

### TASK-046 — Build Capsule Form Fields

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-045
- Track: One-Day Core

**Description:**
Buat input `SEALED BY`, textarea `MESSAGE`, input target tahun opsional, dan teks `WRITTEN IN <tahun>` otomatis.

**Acceptance Criteria:**
- Label jelas dan terhubung ke input.
- Tahun pembuatan bukan input yang bisa diedit.
- Tombol `SEAL THIS MESSAGE` tersedia.

**Potential Files:**
- src/components/timeCapsuleForm.js
- src/styles/time-capsule.css

### TASK-047 — Implement Validation and Automatic Year

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-046
- Track: One-Day Core

**Description:**
Validasi nama 2–60 karakter, pesan 10–1000 karakter, dan target tahun integer antara tahun berjalan dan +100.

**Acceptance Criteria:**
- Error ditampilkan dekat field.
- Target tahun di luar rentang ditolak.
- Tahun pembuatan diambil dari tanggal sistem saat submit.

**Potential Files:**
- src/lib/validation.js
- src/components/timeCapsuleForm.js

### TASK-048 — Implement Save and List Capsules

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-010, TASK-047
- Track: One-Day Core

**Description:**
Simpan kapsul ke `moa:capsules:v1` dan render daftar dari storage yang sama.

**Acceptance Criteria:**
- `createdAt` tersimpan ISO dan ditampilkan sebagai tanggal lokal.
- Pesan baru muncul di urutan teratas.
- Refresh tidak menghilangkan pesan.

**Potential Files:**
- src/lib/storage.js
- src/views/timeCapsule.js

### TASK-049 — Style Capsule Cards and Empty State

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-048
- Track: One-Day Core

**Description:**
Buat kartu kapsul bergaya dokumen tersegel (nomor, segel bronze, pesan serif) dan empty state amplop kosong.

**Acceptance Criteria:**
- Empty state: `Belum ada pesan dalam kapsul. Tulis yang pertama.`
- Kartu menampilkan penulis, tanggal, dan target tahun.
- Grid 2 kolom desktop / 1 kolom mobile.

**Potential Files:**
- src/components/timeCapsuleCard.js
- src/styles/time-capsule.css

### TASK-050 — Implement Delete with Confirmation

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-048
- Track: One-Day Core

**Description:**
Tambahkan tombol `Hapus` pada setiap kartu dengan konfirmasi sebelum menghapus dari storage.

**Acceptance Criteria:**
- Batal tidak mengubah data.
- Konfirmasi menghapus hanya kapsul yang dipilih.
- Toast atau perubahan daftar memberi feedback.

**Potential Files:**
- src/views/timeCapsule.js
- src/components/confirmDialog.js

### TASK-051 — Verify Capsule Persistence

- [ ] Status: Not Started
- Priority: P0
- Estimate: 4 minutes
- Dependencies: TASK-050
- Track: One-Day Core

**Description:**
Uji simpan, refresh, hapus, dan empty state pada kapsul waktu.

**Acceptance Criteria:**
- Kriteria 10 `SPEC.md` lulus.
- Label simulasi tetap terlihat.
- Tidak ada error console.

**Potential Files:**
- src/views/timeCapsule.js

---

## MILESTONE 8 — The Last Time Machine

**Fokus:** timeline interaktif 4 periode dengan label simulasi.

### TASK-052 — Build Timeline Page and Period Data

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-015, TASK-016
- Track: One-Day Core

**Description:**
Buat halaman `#/timeline`, data 4 periode (1990, 2005, 2020, 2026), dan badge `SIMULATION` dengan teks ilustratif.

**Acceptance Criteria:**
- Data periode memiliki tahun, judul, deskripsi, dan gambar lokal.
- Badge SIMULATION terlihat di dekat heading.
- Narasi tidak diklaim sebagai sejarah terverifikasi.

**Potential Files:**
- src/data/timeline.js
- src/views/timeline.js

### TASK-053 — Build Period Buttons and State

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-052
- Track: One-Day Core

**Description:**
Buat 4 tombol tahun dengan state aktif yang ditandai titik membesar dan teks, bukan hanya warna.

**Acceptance Criteria:**
- Klik tahun mengubah state aktif.
- Tombol dapat di-Tab dan di-Enter.
- Aktif awal adalah 1990.

**Potential Files:**
- src/components/timeline.js
- src/styles/time-machine.css

### TASK-054 — Render Period Image and Story Panel

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-053
- Track: One-Day Core

**Description:**
Tampilkan gambar aspect 4:3, tahun besar, judul, dan deskripsi 2–3 kalimat sesuai periode aktif.

**Acceptance Criteria:**
- Konten berubah sesuai tahun yang dipilih.
- Gambar memiliki `alt` dan fallback lokal.
- Tombol `←` / `→` menavigasi periode.

**Potential Files:**
- src/components/timeline.js
- src/styles/time-machine.css

### TASK-055 — Implement Responsive Vertical Timeline and Keyboard

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-053
- Track: One-Day Core

**Description:**
Ubah timeline menjadi vertikal di mobile dan pastikan seluruh kontrol dapat dipakai dengan keyboard.

**Acceptance Criteria:**
- Desktop horizontal, mobile vertikal.
- Arrow keys bekerja jika slider ditambahkan.
- Tidak ada horizontal overflow.

**Potential Files:**
- src/styles/time-machine.css
- src/components/timeline.js

### TASK-056 — Implement Crossfade Transition

- [ ] Status: Not Started
- Priority: P1
- Estimate: 5 minutes
- Dependencies: TASK-054
- Track: One-Day Optional

**Description:**
Tambahkan transisi crossfade + `translateY(8px)` 240 ms saat periode berganti.

**Acceptance Criteria:**
- Transisi hanya memakai `opacity` dan `transform`.
- `prefers-reduced-motion` mematikan transisi.
- Konten tidak berkedip.

**Potential Files:**
- src/styles/time-machine.css

### TASK-057 — Verify Simulation Label and Period Switching

- [ ] Status: Not Started
- Priority: P0
- Estimate: 4 minutes
- Dependencies: TASK-055
- Track: One-Day Core

**Description:**
Uji perpindahan periode di desktop dan mobile sesuai kriteria 11 `SPEC.md`.

**Acceptance Criteria:**
- Kriteria 11 `SPEC.md` dan 10 `UI-SPEC.md` lulus.
- Label SIMULATION selalu terlihat.
- Tidak ada error console.

**Potential Files:**
- src/views/timeline.js

---

## MILESTONE 9 — Dashboard CRUD: Museum Management

**Fokus:** dashboard demo dengan label jelas dan CRUD arsip yang tersinkron dengan galeri.

### TASK-058 — Build Dashboard Shell, Sidebar, and Demo Banner

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-005
- Track: One-Day Core

**Description:**
Buat `#/admin` dengan sidebar `Overview`, `Archives`, `Contributions`, `Reset`, badge `MODE DEMO`, dan banner permanen tanpa login.

**Acceptance Criteria:**
- Banner: `MODE DEMO PENGELOLA — tanpa login, data lokal perangkat ini`.
- Sidebar berubah jadi tab horizontal di mobile.
- Tidak ada field login.

**Potential Files:**
- src/views/admin.js
- src/components/dashboardSidebar.js
- src/styles/dashboard.css

### TASK-059 — Build Overview Statistics Cards

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-010, TASK-058
- Track: One-Day Core

**Description:**
Tampilkan 3 statistik: total arsip, jumlah kategori unik, jumlah kontribusi, dihitung real-time dari storage.

**Acceptance Criteria:**
- Angka sama dengan data galeri dan kontribusi.
- Tidak memakai warna cerah atau gaya SaaS.
- Teks `DEMO` tetap terlihat.

**Potential Files:**
- src/views/admin.js
- src/components/statisticsCard.js

### TASK-060 — Build Archive Table

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-058, TASK-015
- Track: One-Day Core

**Description:**
Buat tabel `NO`, `TITLE`, `CATEGORY`, `PERIOD`, `FEATURED`, `ACTIONS` dengan empty state `Belum ada arsip.`

**Acceptance Criteria:**
- Baris hover memakai `color-surface-2`.
- Featured memakai ikon + teks `UNGGULAN`.
- Mobile menampilkan daftar kartu ringkas.

**Potential Files:**
- src/components/archiveTable.js
- src/styles/dashboard.css

### TASK-061 — Build Add/Edit Archive Modal Form

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-005, TASK-060
- Track: One-Day Core

**Description:**
Buat modal form dengan semua field `Archive` kecuali `id` dan `createdAt`, dipakai untuk tambah dan edit.

**Acceptance Criteria:**
- Modal punya focus trap, Escape close, dan klik overlay close.
- Kategori divalidasi terhadap enum.
- Field wajib divalidasi sebelum simpan.

**Potential Files:**
- src/components/archiveForm.js
- src/components/modal.js

### TASK-062 — Implement Add and Edit Archive

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-061, TASK-010
- Track: One-Day Core

**Description:**
Simpan arsip baru dan perbarui arsip existing tanpa mengubah `createdAt`.

**Acceptance Criteria:**
- Id baru unik.
- Edit tidak mengubah `createdAt`.
- Toast muncul dan tabel diperbarui.

**Potential Files:**
- src/lib/archive-service.js
- src/views/admin.js

### TASK-063 — Implement Delete with Confirmation

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-005, TASK-060
- Track: One-Day Core

**Description:**
Hapus arsip setelah konfirmasi. Untuk arsip berasal dari kontribusi, hapus hanya arsip bayangannya.

**Acceptance Criteria:**
- Batal tidak menghapus data.
- Record `Contribution` tidak ikut terhapus.
- Statistik kontribusi tetap akurat.

**Potential Files:**
- src/views/admin.js
- src/components/confirmDialog.js

### TASK-064 — Implement Featured Toggle

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-060, TASK-010
- Track: One-Day Core

**Description:**
Toggle status unggulan dengan `aria-pressed` dan simpan perubahan ke storage.

**Acceptance Criteria:**
- Perubahan langsung terlihat di tabel dan galeri.
- Status ditandai teks/ikon, bukan hanya warna.
- Refresh tidak mengembalikan status lama.

**Potential Files:**
- src/components/archiveTable.js
- src/views/admin.js

### TASK-065 — Build Contribution List

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-042, TASK-060
- Track: One-Day Core

**Description:**
Tampilkan daftar kontribusi pengunjung bersifat read-only: judul, kategori, asal, tanggal, cuplikan cerita.

**Acceptance Criteria:**
- Data berasal dari `moa:contributions:v1`.
- Tidak ada tombol edit/hapus kontribusi di MVP.
- Empty state tersedia.

**Potential Files:**
- src/views/admin.js
- src/styles/dashboard.css

### TASK-066 — Implement Reset Demo Data

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-010, TASK-058
- Track: One-Day Core

**Description:**
Tombol `Reset data demo` dengan konfirmasi eksplisit, lalu hapus 3 key data dan tulis ulang seed arsip.

**Acceptance Criteria:**
- Konfirmasi menyebut kontribusi & kapsul akan hilang.
- Batal tidak mengubah apa pun.
- Toast `Data demo berhasil direset.` muncul.

**Potential Files:**
- src/views/admin.js
- src/lib/storage.js

### TASK-067 — Verify Dashboard and Gallery Synchronization

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-064, TASK-066
- Track: One-Day Core

**Description:**
Uji bahwa tambah/edit/hapus/toggle/reset langsung terlihat di galeri, detail, dan statistik tanpa refresh manual.

**Acceptance Criteria:**
- Kriteria 12, 13, dan 15 `SPEC.md` lulus.
- Galeri dan dashboard memakai sumber localStorage sama.
- Tidak ada data basi di memori.

**Potential Files:**
- src/views/admin.js
- src/views/archives.js

---

## MILESTONE 10 — LocalStorage dan Data Management

**Fokus:** memastikan seluruh data konsisten, aman dari penimpaan, dan tangguh terhadap kegagalan.

### TASK-068 — Implement Seed-if-Empty and Version Marker

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-010, TASK-015
- Track: One-Day Core

**Description:**
Seed hanya ditulis jika key arsip benar-benar `null`, dan tulis `moa:version:v1` sebagai penanda.

**Acceptance Criteria:**
- Data pengguna yang sudah ada tidak pernah ditimpa saat aplikasi dibuka.
- Versi berbeda tidak menghapus data.
- Seed ulang hanya lewat reset demo.

**Potential Files:**
- src/lib/storage.js
- src/main.js

### TASK-069 — Implement Update and Delete Storage Helpers

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-010
- Track: One-Day Core

**Description:**
Tambahkan helper `updateById` dan `deleteById` untuk ketiga koleksi data.

**Acceptance Criteria:**
- Fungsi tidak mengubah array asli secara tidak sengaja.
- Id tidak ditemukan → tidak melempar error.
- Hasil ditulis kembali ke key yang benar.

**Potential Files:**
- src/lib/storage.js

### TASK-070 — Implement Storage Error Handling

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-005, TASK-010
- Track: One-Day Core

**Description:**
Tangani kegagalan baca/tulis (quota penuh, private mode) dengan fallback dan toast error.

**Acceptance Criteria:**
- Aplikasi tidak blank saat localStorage gagal.
- Pesan error jelas dan tidak menyalahkan pengguna.
- Form tetap berisi saat gagal menyimpan.

**Potential Files:**
- src/lib/storage.js
- src/components/toast.js

### TASK-071 — Implement Reset Across All Keys

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-066, TASK-068
- Track: One-Day Core

**Description:**
Pastikan reset menghapus arsip, kontribusi, kapsul, lalu menulis ulang seed dan versi secara atomik.

**Acceptance Criteria:**
- Setelah reset, total arsip kembali 8.
- Kontribusi dan kapsul kosong.
- Statistik landing dan dashboard ikut berubah.

**Potential Files:**
- src/lib/storage.js

### TASK-072 — Audit Single Source of Truth

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-042, TASK-048, TASK-062
- Track: One-Day Core

**Description:**
Periksa semua fitur membaca dan menulis melalui modul storage yang sama, bukan variabel lokal yang usang.

**Acceptance Criteria:**
- Tidak ada hardcode data arsip di view selain seed.
- Setelah CRUD, view lain membaca ulang storage.
- Tidak ada duplikasi key localStorage.

**Potential Files:**
- src/lib/storage.js
- src/views/*.js

### TASK-073 — Verify Persistence After Refresh

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-072
- Track: One-Day Core

**Description:**
Uji refresh setelah kontribusi, kapsul, CRUD, toggle, dan reset.

**Acceptance Criteria:**
- Kriteria 14 `SPEC.md` lulus.
- Seed tidak menimpa data pengguna.
- Tidak ada error console.

**Potential Files:**
- src/main.js
- src/lib/storage.js

---

## MILESTONE 11 — Responsive Design dan Accessibility

**Fokus:** pengalaman museum yang usable di desktop, tablet, smartphone, dan keyboard.

### TASK-074 — Implement Responsive Navbar and Hamburger

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-005
- Track: One-Day Core

**Description:**
Hamburger 44×44 px, panel vertikal, ikon close, overlay, auto-close saat pilih item, dan focus kembali ke tombol.

**Acceptance Criteria:**
- Menu terbuka/tutup dengan benar di 390 px.
- Escape menutup menu.
- Active state tetap terlihat.

**Potential Files:**
- src/components/navbar.js
- src/styles/responsive.css

### TASK-075 — Responsive Hero, Gallery, and Memory Room

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-014, TASK-021, TASK-037
- Track: One-Day Core

**Description:**
Sesuaikan hero, grid 3/2/1 kolom, toolbar, dan layout detail sesuai breakpoint `UI-SPEC.md` Bab 7.

**Acceptance Criteria:**
- 1440 px: 3 kolom asimetris; 820 px: 2 kolom; 390 px: 1 kolom.
- Hero mobile: teks di atas gambar.
- Metadata detail tidak menimpa cerita.

**Potential Files:**
- src/styles/home.css
- src/styles/archives.css
- src/styles/memory-room.css

### TASK-076 — Responsive Forms, Timeline, and Dashboard

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-044, TASK-055, TASK-058
- Track: One-Day Core

**Description:**
Form satu kolom di mobile, timeline vertikal, sidebar dashboard jadi tab, tabel jadi kartu.

**Acceptance Criteria:**
- Input tinggi minimal 44 px.
- Tabel tidak memaksa scroll horizontal di mobile.
- Modal margin 16 px dan tinggi maks 85vh.

**Potential Files:**
- src/styles/contribute.css
- src/styles/time-capsule.css
- src/styles/time-machine.css
- src/styles/dashboard.css

### TASK-077 — Accessibility Pass: Semantics, Labels, Alt, Skip Link

- [ ] Status: Not Started
- Priority: P0
- Estimate: 8 minutes
- Dependencies: TASK-075, TASK-076
- Track: One-Day Core

**Description:**
Periksa semantic HTML, satu `h1` per halaman, label input, alt text, skip link, dan status dinamis `aria-live`.

**Acceptance Criteria:**
- Kriteria 9 `SPEC.md` dan 1–15 `UI-SPEC.md` terkait aksesibilitas terpenuhi.
- Informasi tidak hanya disampaikan lewat warna.
- Kontras memenuhi AA.

**Potential Files:**
- src/views/*.js
- src/components/*.js
- index.html

### TASK-078 — Keyboard Focus and Reduced Motion Pass

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-077
- Track: One-Day Core

**Description:**
Pastikan seluruh interaksi bisa di-Tab/Enter/Space/Escape dan animasi mati saat `prefers-reduced-motion`.

**Acceptance Criteria:**
- Focus ring bronze terlihat di semua elemen interaktif.
- Modal focus trap bekerja.
- Kriteria 15 `UI-SPEC.md` lulus.

**Potential Files:**
- src/styles/global.css
- src/components/modal.js

### TASK-079 — Verify No Horizontal Overflow at 390px

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-076
- Track: One-Day Core

**Description:**
Gulir seluruh halaman pada viewport 390 px dan periksa elemen yang keluar dari viewport.

**Acceptance Criteria:**
- Kriteria 16 `SPEC.md` dan 13 `UI-SPEC.md` lulus.
- Teks panjang dipotong dengan ellipsis.
- Semua tombol utama dapat diklik.

**Potential Files:**
- src/styles/responsive.css

---

## MILESTONE 12 — Testing dan Bug Fixing

**Fokus:** verifikasi akhir terhadap seluruh kriteria penerimaan.

### TASK-080 — Run 17 SPEC Acceptance Checks

- [ ] Status: Not Started
- Priority: P0
- Estimate: 12 minutes
- Dependencies: TASK-073, TASK-079
- Track: One-Day Core

**Description:**
Jalankan 17 langkah pengujian pada `SPEC.md` Bab 11 di desktop dan smartphone emulation.

**Acceptance Criteria:**
- Setiap kriteria diberi status Lulus / Gagal.
- Kriteria gagal dicatat dengan langkah reproduksi.
- Tidak ada kriteria yang dilewati.

**Potential Files:**
- TASKS.md (catatan hasil uji)

### TASK-081 — Run 15 UI-SPEC Acceptance Checks

- [ ] Status: Not Started
- Priority: P0
- Estimate: 10 minutes
- Dependencies: TASK-079
- Track: One-Day Core

**Description:**
Jalankan 15 pemeriksaan visual pada `UI-SPEC.md` Bab 12.

**Acceptance Criteria:**
- Identitas visual konsisten di 7 halaman.
- Wireframe desktop dan mobile sesuai.
- Animasi tidak mengganggu aksesibilitas.

**Potential Files:**
- TASKS.md (catatan hasil uji)

### TASK-082 — Console Error Sweep and Bug Fixes

- [ ] Status: Not Started
- Priority: P0
- Estimate: 10 minutes
- Dependencies: TASK-080, TASK-081
- Track: One-Day Core

**Description:**
Periksa konsol browser di semua rute dan perbaiki error yang ditemukan.

**Acceptance Criteria:**
- Tidak ada uncaught exception.
- Tidak ada warning yang menandakan fitur rusak.
- Bug tercatat dan diperbaiki.

**Potential Files:**
- src/**/*.js

### TASK-083 — Re-run Critical Acceptance Paths

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-082
- Track: One-Day Core

**Description:**
Ulangi alur kritis: entrance → galeri → filter → detail → kontribusi → kapsul → timeline → admin → reset → refresh.

**Acceptance Criteria:**
- Kriteria 1–17 `SPEC.md` lulus setelah perbaikan.
- Tidak ada tombol utama yang tidak berfungsi.
- Status task diperbarui menjadi Completed.

**Potential Files:**
- TASKS.md

---

## MILESTONE 13 — Security Review

**Fokus:** memastikan demo frontend aman untuk digunakan dan tidak menyesatkan.

### TASK-084 — Audit innerHTML and Render Sanitization

- [ ] Status: Not Started
- Priority: P0
- Estimate: 7 minutes
- Dependencies: TASK-083
- Track: One-Day Core

**Description:**
Cari semua penggunaan `innerHTML` dan ganti rendering teks pengguna dengan `textContent` atau `escapeHtml()`.

**Acceptance Criteria:**
- Tidak ada input pengguna yang disisipkan mentah ke DOM.
- Uji memasukkan `<script>alert(1)</script>` pada judul/cerita tidak tereksekusi.
- Teks tetap tampil apa adanya.

**Potential Files:**
- src/lib/sanitize.js
- src/components/*.js
- src/views/*.js

### TASK-085 — Validate Media URL Schemes and File Types

- [ ] Status: Not Started
- Priority: P0
- Estimate: 6 minutes
- Dependencies: TASK-041, TASK-019
- Track: One-Day Core

**Description:**
Izinkan hanya path relatif lokal dan `data:image/(png|jpeg|webp|gif);base64,...`; tolak `javascript:`, `http(s):`, dan skema lain.

**Acceptance Criteria:**
- URL media tidak valid ditolak atau jatuh ke placeholder.
- Tipe file sesuai daftar yang diizinkan.
- Tidak ada eksekusi skrip lewat atribut gambar.

**Potential Files:**
- src/lib/sanitize.js
- src/lib/validation.js

### TASK-086 — Audit Credentials, External Services, and PII

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-083
- Track: One-Day Core

**Description:**
Pastikan tidak ada API key, credential, permintaan jaringan eksternal, atau data pribadi nyata dalam source code dan data contoh.

**Acceptance Criteria:**
- Tidak ada string kredensial.
- Tidak ada fetch ke domain pihak ketiga.
- Nama pada contoh bersifat samaran/fiktif.

**Potential Files:**
- seluruh source code
- src/data/seed.js

### TASK-087 — Verify Invalid Input and Storage Failure Handling

- [ ] Status: Not Started
- Priority: P0
- Estimate: 5 minutes
- Dependencies: TASK-070, TASK-085
- Track: One-Day Core

**Description:**
Simulasikan input tidak valid, file besar, URL media rusak, dan localStorage penuh.

**Acceptance Criteria:**
- Pesan error jelas dan dekat konteks.
- Aplikasi tidak crash atau blank.
- Tidak ada klaim data tersinkron ke server.

**Potential Files:**
- src/lib/validation.js
- src/lib/storage.js

---

## MILESTONE 14 — Production Build

**Fokus:** memastikan aplikasi bisa dijalankan di luar server development.

### TASK-088 — Run Vite Production Build

- [ ] Status: Not Started
- Priority: P2
- Estimate: 5 minutes
- Dependencies: TASK-083, TASK-087
- Track: Post-MVP

**Description:**
Jalankan perintah build Vite dan pastikan proses selesai tanpa error.

**Acceptance Criteria:**
- Build exit code 0.
- Folder `dist/` terbentuk.

**Potential Files:**
- package.json
- dist/

### TASK-089 — Inspect dist Output and Asset Paths

- [ ] Status: Not Started
- Priority: P2
- Estimate: 5 minutes
- Dependencies: TASK-088
- Track: Post-MVP

**Description:**
Periksa path asset gambar, CSS, dan JS pada hasil build.

**Acceptance Criteria:**
- Semua aset lokal ikut ter-copy.
- Tidak ada path absolut yang rusak.
- Tidak ada URL eksternal.

**Potential Files:**
- vite.config.js
- dist/

### TASK-090 — Run Production Preview and Navigation Test

- [ ] Status: Not Started
- Priority: P2
- Estimate: 6 minutes
- Dependencies: TASK-089
- Track: Post-MVP

**Description:**
Jalankan preview production dan uji 7 rute utama.

**Acceptance Criteria:**
- Navigasi hash berfungsi.
- Refresh pada rute detail tidak kosong.
- Fitur utama masih berjalan.

**Potential Files:**
- package.json
- dist/

### TASK-091 — Verify Build and Preview Are Error-Free

- [ ] Status: Not Started
- Priority: P2
- Estimate: 4 minutes
- Dependencies: TASK-090
- Track: Post-MVP

**Description:**
Pantau konsol saat preview production dan pastikan tidak ada error baru.

**Acceptance Criteria:**
- Tidak ada error console.
- Aset termuat semua.
- Build siap untuk deployment.

**Potential Files:**
- dist/

---

## MILESTONE 15 — Deployment

**Fokus:** mempublikasikan versi statis dan mendokumentasikan batasan penggunaan.

### TASK-092 — Configure Base Path for Static Hosting

- [ ] Status: Not Started
- Priority: P3
- Estimate: 4 minutes
- Dependencies: TASK-091
- Track: Post-MVP

**Description:**
Sesuaikan `base` di Vite jika platform hosting memakai subpath.

**Acceptance Criteria:**
- Path asset benar di URL deployment.
- Tidak perlu fallback server untuk hash routing.

**Potential Files:**
- vite.config.js

### TASK-093 — Write README with Usage, Limits, and Licensing

- [ ] Status: Not Started
- Priority: P3
- Estimate: 8 minutes
- Dependencies: TASK-092
- Track: Post-MVP

**Description:**
Tulis README berisi cara menjalankan, penjelasan localStorage, label demo/simulasi, dan catatan hak cipta konten contoh.

**Acceptance Criteria:**
- Perintah `npm install` dan `npm run dev` terdokumentasi.
- Batasan lokal-only dijelaskan.
- Konten contoh dinyatakan ilustratif.

**Potential Files:**
- README.md

### TASK-094 — Deploy to Static Platform

- [ ] Status: Not Started
- Priority: P3
- Estimate: 8 minutes
- Dependencies: TASK-093
- Track: Post-MVP

**Description:**
Deploy ke platform statis seperti GitHub Pages, Netlify, atau Vercel tanpa credential disimpan di source code.

**Acceptance Criteria:**
- URL publik aktif.
- Tidak ada file sensitif terpublikasi.
- Proses deploy dapat diulang.

**Potential Files:**
- vite.config.js
- package.json
- file konfigurasi hosting

### TASK-095 — Verify Deployed URL, Assets, and Console

- [ ] Status: Not Started
- Priority: P3
- Estimate: 5 minutes
- Dependencies: TASK-094
- Track: Post-MVP

**Description:**
Uji website hasil deployment di desktop dan mobile.

**Acceptance Criteria:**
- Semua aset utama termuat.
- Navigasi dan fitur utama berfungsi.
- Konsol bersih dan batasan localStorage terlihat di UI.

**Potential Files:**
- README.md
- TASKS.md

---

## 5. Aturan Penyelesaian Task

1. **Satu task selesai** jika seluruh acceptance criteria task terpenuhi dan dapat diuji manual.
2. Update baris `- [ ] Status: Not Started` menjadi `- [x] Status: Completed` **hanya** setelah kriteria lulus.
3. Jika menemui hambatan, ubah status menjadi `Blocked` dan catat dependensi/alasannya.
4. Jangan menandai milestone selesai sebelum seluruh task di dalamnya `Completed`.
5. Jangan menambah fitur di luar `SPEC.md` dan `UI-SPEC.md` tanpa persetujuan.
6. Jangan mengubah isi `SPEC.md` atau `UI-SPEC.md` dalam tahap implementasi ini.
7. Jika waktu habis, serahkan VDM (Bab 2.2) dan laporkan task yang belum dikerjakan.

---

## 6. Catatan untuk AI Coding Agent

- Baca `SPEC.md` Bab 4, 5, 6, 11, 12 dan `UI-SPEC.md` Bab 2, 3, 4, 7, 9, 10 sebelum menulis kode.
- Pakai palet warna `UI-SPEC.md`, bukan nilai lama di `SPEC.md` Bab 8.3.
- Pakai hash routing; jangan memperkenalkan History API atau router pihak ketiga.
- Utamakan `textContent`/DOM API daripada `innerHTML` untuk semua teks pengguna.
- Semua penulisan localStorage wajib dibungkus `try/catch` dan menampilkan toast error.
- Jangan membuat API, backend, autentikasi, atau layanan eksternal.
- Jangan mulai coding sebelum `TASKS.md` ini ditinjau dan disetujui.
