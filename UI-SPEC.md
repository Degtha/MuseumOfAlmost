# UI-SPEC.md — Museum of Almost

> **Spesifikasi Antarmuka Pengguna & Design System — pendamping `SPEC.md`**
>
> | Field | Nilai |
> |---|---|
> | Nama aplikasi | Museum of Almost |
> | Versi dokumen | 1.0 |
> | Tanggal | 19 November 2026 |
> | Status | **Menunggu tinjauan** — implementasi belum dimulai |
> | Peran penulis | UI/UX Designer & Frontend Design System Specialist |
> | Dokumen sumber | `SPEC.md` v1.0 (SRS & MVP) |
> | Target | Vite + JavaScript Vanilla + CSS3, localStorage |
> | Identitas | **MUSEUM OF ALMOST** — *A Living Digital Museum of Things We Almost Forgot.* |
> | Tagline | *Not everything lost was meant to be forgotten.* |

Dokumen ini hanya berisi spesifikasi visual, struktural, dan interaksi. **Jangan menulis kode aplikasi sebelum `SPEC.md` dan `UI-SPEC.md` ditinjau.**

---

## 0. Hubungan dengan `SPEC.md` & Penyesuaian yang Disetujui

Dokumen ini memperhalus `SPEC.md`, bukan menggantikan ruang lingkupnya. Seluruh rute, field data, dan kriteria fungsional di `SPEC.md` tetap berlaku.

| Aspek | `SPEC.md` | `UI-SPEC.md` (dokumen ini) | Tindakan |
|---|---|---|---|
| Palet warna | `#141312` / `#1E1C1A` / `#F3EBDD` / `#C87941` | `#171715` / `#22221F` / `#EAE4D8` / `#A77B50` (+ kreme, abu, olive) | **Pakai palet dokumen ini.** Perbarui tabel token di `SPEC.md` Bab 8.3 setelah dokumen ini disetujui. |
| Navigasi | Entrance, Archives, Contribute, Time Capsule, Timeline, Management | Explore, Collections, Time Capsule, About, Contribute, Management | Tambahkan **Time Machine** ke navbar karena Timeline adalah fitur P0; **About** adalah anchor ke section landing, bukan rute baru. |
| Hero | Judul + tagline + pertanyaan + CTA | Ditambah subtitle, CTA sekunder `DISCOVER OUR PURPOSE`, visual utama | Sesuai permintaan desain; tidak menambah fitur baru. |
| Dashboard | Banner demo, statistik, tabel CRUD | Sidebar + tabel + modal konfirmasi | Tetap mode demo, tanpa login. |
| Gambar | Placeholder lokal + fallback | Ilustrasi/placeholder analog lokal, aspect ratio terdefinisi | Tidak ada URL eksternal. |

Rute final tetap: `#/`, `#/archives`, `#/archive/:id`, `#/contribute`, `#/time-capsule`, `#/timeline`, `#/admin`.

---

## 1. Design Direction

### 1.1 Kepribadian visual

Museum of Almost harus terasa seperti **ruang pameran seni kontemporer yang bertemu arsip digital**. Kesannya: nostalgic, mysterious, emotional, artistic, immersive, timeless, dan editorial.

| Kata kunci | Terjemahan visual |
|---|---|
| Nostalgic | Fotografi analog, grain halus, kertas tua, benda-benda lama. |
| Mysterious | Latar gelap, kontras tinggi, detail yang terungkap saat scroll/hover. |
| Emotional | Cerita ditulis besar, whitespace memberi ruang untuk merenung. |
| Artistic | Layout asimetris, komposisi tidak simetris, tipografi display sebagai "pameran". |
| Immersive | Hero full-viewport, transisi halaman, ritme antar section yang lambat dan disengaja. |
| Timeless | Serif klasik + sans-serif netral; hindari tren visual musiman. |
| Editorial | Nomor arsip, katalog metadata, label pameran, kutipan, dan byline. |

### 1.2 Referensi mental

- Museum seni kontemporer: ruang gelap, karya disorot, label kecil di bawah.
- Arsip fotografik: amplop manila, nomor inventaris, cap tanggal, kertas agak menguning.
- Jurnal budaya: serif besar, kolom sempit untuk membaca, footer catatan kaki.

### 1.3 Anti-pattern (dilarang)

- Dashboard SaaS dengan kartu metrik warna-warni dan sidebar biru.
- E-commerce: badge diskon, keranjang, harga, CTA agresif.
- Blog template: sidebar populated, daftar Artikel Terbaru yang padat.
- Katalog produk: grid seragam tanpa hierarki, thumbnail kecil semua.
- Landing page generik: gradient ungu, ilustrasi 3D, bullet "Why choose us".
- Card fatigue: seluruh halaman dipenuhi kartu dengan tinggi dan radius identik.

### 1.4 Prinsip komposisi

1. **Satu fokus per layar.** Setiap viewport memiliki satu elemen dominan (judul, gambar, atau kutipan).
2. **Whitespace sebagai ruang pameran.** Jangan takut kosong; jarak antar section minimal 96 px di desktop.
3. **Asimetris, bukan berantakan.** Grid tetap 12 kolom; konten sengaja tidak simetris.
4. **Garis tipis sebagai struktur.** Gunakan 1px border untuk memisahkan, bukan shadow tebal.
5. **Metadata sebagai dekorasi.** Nomor arsip dan label katalog menjadi elemen visual, bukan sekadar teks tambahan.
6. **Konsistensi ritual.** Header, label section, dan footer identik di semua halaman.

---

## 2. Design System

### 2.1 Color Palette

| Nama token | Nilai | Peran utama | Penggunaan |
|---|---|---|---|
| `color-bg` | `#171715` | Deep Charcoal | Background halaman utama, 80–90% area layar. |
| `color-surface` | `#22221F` | Soft Black | Card, panel, section berlapis, input field. |
| `color-text` | `#EAE4D8` | Warm Ivory | Heading, body teks utama, ikon aktif. |
| `color-text-muted` | `#CFC5B3` | Muted Cream | Paragraf sekunder, deskripsi, navigasi tidak aktif. |
| `color-accent` | `#A77B50` | Archive Bronze | CTA primer, underline aktif, angka arsip, segel kapsul. |
| `color-meta` | `#858078` | Dusty Grey | Metadata, tanggal, kapasitas kecil, placeholder. |
| `color-category` | `#777A60` | Faded Olive | Label kategori tertentu, badge budaya/tradisi. |

**Ketentuan penggunaan warna**

- Background dominan gelap. Jangan gunakan latar terang penuh.
- Bronze hanya untuk elemen penting: maksimalkan dampak dengan menggunakannya pada ±5–10% area.
-hindari neon, biru menyala, hijau cerah, merah terang, dan gradien warna-warni.
- Untuk menyampaikan status, selalu pasangkan warna dengan **teks dan/atau ikon**.
- Soft Black vs Deep Charcoal hanya berbeda tipis → selalu tambahkan border `1px` atau perubahan kalem saat keduanya bersentuhan.

**Kontras terhadap `#171715` (diukur, WCAG relatif luminance)**

| Pasangan | Rasio | Keputusan |
|---|---|---|
| Warm Ivory / charcoal | **14.18:1** | Aman untuk semua ukuran teks. |
| Muted Cream / charcoal | **10.51:1** | Aman untuk semua ukuran teks. |
| Archive Bronze / charcoal | **4.78:1** | Lulus AA teks normal; aman untuk CTA dan angka. |
| Dusty Grey / charcoal | **4.58:1** | Lulus AA teks normal, tetapi gunakan minimal 14 px / weight 500. |
| Faded Olive / charcoal | **4.05:1** | **Tidak** untuk teks normal; hanya untuk label ≥18,66 px bold, ikon, dan area non-teks (minimal 3:1). |
| Soft Black / charcoal | **1.13:1** | Bukan untuk teks. Hanya pemisah permukaan + border. |

> Validasi ulang dengan color contrast checker setelah implementasi token final.

### 2.2 Typography

**Keluarga font**

| Peran | Pilihan utama | Fallback lokal |
|---|---|---|
| Display / Heading | Cormorant Garamond | Playfair Display → DM Serif Display → `Georgia, 'Times New Roman', serif` |
| Body / Interface | Inter | Manrope → DM Sans → `system-ui, -apple-system, 'Segoe UI', sans-serif` |

Maksimal **dua keluarga font**. Jangan menambahkan font monospace khusus; nomor arsip memakai font display dengan `font-variant-numeric: lining-nums`.

**Skala tipografi**

| Token | Ukuran (desktop) | Ukuran (mobile) | Peran |
|---|---|---|---|
| `type-display` | 96–128 px / line-height .92 | 48–64 px / .98 | Hero "MUSEUM OF ALMOST". |
| `type-h1` | 56–72 px / 1.05 | 36–44 px / 1.1 | Judul halaman, judul arsip. |
| `type-h2` | 36–44 px / 1.15 | 28–32 px / 1.2 | Judul section. |
| `type-h3` | 24–28 px / 1.25 | 20–22 px / 1.3 | Judul kartu, sub-section. |
| `type-body-lg` | 18–20 px / 1.75 | 16–17 px / 1.7 | Cerita, paragraf editorial. |
| `type-body` | 15–16 px / 1.6 | 15–16 px / 1.6 | UI, deskripsi kartu, form. |
| `type-label` | 11–12 px / 1.4 | 11–12 px / 1.4 | `ARCHIVE`, `EXHIBITION`, `DIGITAL COLLECTION`. |
| `type-meta` | 13 px / 1.5 | 13 px / 1.5 | Tanggal, periode, asal, nomor. |

**Aturan**

- Heading: letter-spacing `-0.02em` pada display, `0` pada h2/h3.
- Label: `letter-spacing: 0.18em–0.24em`, uppercase, warna bronze atau muted cream.
- Metadata: uppercase opsional, letter-spacing `0.08em`, warna Dusty Grey.
- Paragraf cerita: lebar baris maksimal **65–72 karakter** (`max-width: 62ch`).
- Jangan menggunakan font di bawah 13 px untuk teks yang dibaca.
- Hindari italic berlebihan; cukup 1–2 kutipan per halaman.

### 2.3 Spacing & Grid

| Token | Nilai |
|---|---|
| `space-1` | 4 px |
| `space-2` | 8 px |
| `space-3` | 12 px |
| `space-4` | 16 px |
| `space-6` | 24 px |
| `space-8` | 32 px |
| `space-12` | 48 px |
| `space-16` | 64 px |
| `space-24` | 96 px |
| `space-32` | 128 px |

**Grid desktop (≥1024 px):** 12 kolom, gutter 24–32 px, container maksimal 1320 px dengan padding sisi 64 px.
**Tablet (768–1023 px):** 8 kolom, gutter 24 px, padding sisi 40 px.
**Mobile (<768 px):** 4 kolom, gutter 16 px, padding sisi 20 px.

Radius: `2 px` untuk label/badge, `4 px` untuk input dan tombol, `6 px` untuk panel gambar. Hindari radius besar/pill kecuali chip filter.

### 2.4 Visual Language

| Elemen | Spesifikasi |
|---|---|
| Fotografi | Dokumenter, analog, saturasi rendah (`filter: saturate(.75) contrast(1.05)`), tone hangat. |
| Tekstur kertas | Overlay noise SVG/CSS sangat tipis, opacity 0.03–0.05, fixed, `pointer-events: none`. |
| Grain | Statis, bukan video; tidak boleh mengganggu keterbacaan teks. |
| Garis pembatas | 1 px solid `#3A3833` / bronze transparan 20% pada section penting. |
| Nomor arsip | `ARCHIVE NO. 001`, font display, bronze, letter-spacing lebar, di atas judul. |
| Label museum | `EXHIBITION`, `COLLECTION`, `DIGITAL ARCHIVE`, uppercase, 11 px. |
| Metadata katalog | Pasangan `LABEL: nilai` dengan label Dusty Grey, nilai Muted Cream. |
| Whitespace |minimum 64 px antar block di desktop, 40 px di mobile. |
| Layout asimetris | Pola: 7/5, 8/4, atau 5/7 kolom; gambar boleh bleed ke margin. |

### 2.5 Iconography

- Gunakan inline SVG stroke 1.5 px, warna `currentColor`.
- Ikon: arrow-right, arrow-left, search, filter, close, menu, play, pause, plus, edit, trash, seal, download-free (tidak dipakai), check, alert.
- Ikon **tidak boleh** menjadi satu-satunya penanda status; selalu ada teks.
- Ukuran: 16 px inline, 20 px tombol, 24 px nav mobile.

### 2.6 Elevation & Border

| Level | Penggunaan |
|---|---|
| Flat | Teks, label, latar. |
| Border 1 px | Card, input, panel, tabel. |
| Lift | Hover card: border bronze 40% + `translateY(-2px)` + bayangan sangat lemah `0 12px 30px rgba(0,0,0,.25)`. |
| Overlay | Modal & dropdown: latar `rgba(23,23,21,.86)` + blur 4 px + panel surface. |

Tidak boleh ada shadow tebal, glow, atau neumorphism.

### 2.7 Aturan state global

| State | Perlakuan |
|---|---|
| Default | Border netral, teks sesuai peran. |
| Hover | Border/underline bronze, elemen naik 1–2 px, transisi 160–200 ms. |
| Focus-visible | Outline 2 px bronze + offset 3 px; **jangan** dihapus sans fallback. |
| Active/pressed | Skala 0.98 atau background bronze 14%. |
| Selected | Border bronze + label `AKTIF`/centang, bukan hanya warna. |
| Disabled | Opacity 45%, cursor not-allowed, teks tetap terbaca. |
| Loading | Spinner stroke halus + teks `Menyimpan…`, tombol disabled. |
| Error | Border merah bata `#A65B4B` + ikon + pesan dekat field. |
| Success | Border olive/bronze + ikon centang + toast. |

---

## 3. Navigation System

### 3.1 Struktur & pemetaan rute

| Label navbar | Tujuan | Keterangan |
|---|---|---|
| `EXPLORE` | `#/` + `#about` | Halaman entrance; section about sebagai anchor. |
| `COLLECTIONS` | `#/archives` | Galeri arsip. |
| `TIME MACHINE` | `#/timeline` | **Ditambahkan** dari `SPEC.md` karena timeline fitur P0. |
| `TIME CAPSULE` | `#/time-capsule` | Kapsul pesan. |
| `ABOUT` | `#/#about` | Section pengantar di landing; tidak menambah rute baru. |
| `CONTRIBUTE` | `#/contribute` | Tombol aksen bronze. |
| `MANAGEMENT — DEMO` | `#/admin` | Dipisah secara visual dengan divider; label `DEMO` wajib. |

### 3.2 Desktop (≥1024 px)

- Navbar transparan menyatu dengan background; saat scroll > 80 px, latar berubah ke `#171715` dengan blur 8 px dan border bawah 1 px.
- Wordmark kiri: monogram `MoA` dalam kotak border bronze 1 px + teks `MUSEUM OF ALMOST` 12 px letter-spacing 0.2em.
- Menu kanan: item uppercase 11–12 px, gap 32 px, underline bronze 1 px untuk active state.
- `CONTRIBUTE` berupa tombol outline bronze; `MANAGEMENT — DEMO` lebih redup dengan badge kecil `DEMO`.
- Tinggi navbar 80 px; sticky di atas.

### 3.3 Mobile (<768 px)

- Wordmark + tombol hamburger 44×44 px.
- Menu terbuka sebagai panel full-width di bawah navbar: latar `#22221F`, border atas, item berbaris vertikal tinggi 52 px.
- Item `MANAGEMENT — DEMO` diletakkan paling bawah setelah divider.
- Saat menu terbuka: tombol hamburger berubah menjadi ikon close, latar halaman Behind menu mendapat overlay gelap 60%.
- Menu tertutup otomatis setelah item dipilih; focus dikembalikan ke tombol hamburger.

### 3.4 Active state & scroll

- Halaman aktif ditandai dengan **underline bronze + teks ivory**, bukan hanya warna.
- Rute `#/archive/:id` menandai `COLLECTIONS` sebagai aktif.
- `#/admin` menandai `MANAGEMENT — DEMO` aktif dengan badge.
- Smooth scroll hanya untuk anchorinternal (#about); transisi antar rute memakai fade 180 ms (lihat Bab 8).
- Skip link `Lewati ke konten` muncul saat di-Tab pertama kali.

---

## 4. Spesifikasi Layout per Halaman

### 4.A Landing Page — The Entrance (`#/`)

**Tujuan:** menciptakan ritus masuk ke museum; satu layar pertama harus terasa seperti membuka pintu galeri.

**Hierarki section:**

1. **Hero (100vh, min 680 px)**
   - Eyebrow: `A DIGITAL ARCHIVE — EST. 2026` (label, bronze).
   - Display: `MUSEUM OF ALMOST` dua baris, rata kiri pada desktop, rata tengah pada mobile.
   - Subtitle: `A Living Digital Museum of Things We Almost Forgot.` (serif italic, muted cream).
   - Pertanyaan pembuka persis dari `SPEC.md`, ditampilkan dalam kutipan besar dengan garis bronze di kiri.
   - CTA primer `[ ENTER THE MUSEUM ]` (bronze outline → isi bronze saat hover).
   - CTA sekunder `[ DISCOVER OUR PURPOSE ]` (text link + panah turun).
   - Visual utama: foto/ilustrasi arsip analog, ditempatkan **di kanan bawah** desktop, full-width di bawah teks pada mobile; di-crop ke aspect 4:5, overlap ringan ke section berikutnya.
2. **Introduction — `WHY WE EXIST`**
   - Label section + heading h2.
   - 3 paragraf pendek atau 3 kolom nilai: `REMEMBER`, `RECORD`, `RETURN`.
   - Garis horizontal tipis sebagai pembatas.
3. **Featured Archives**
   - Heading `FEATURED ARCHIVES`, sub-link `Lihat semua koleksi →`.
   - 3 card unggulan dari data `featured: true`; card pertama lebih besar (span 6 kolom), dua lainnya span 3 kolom.
4. **Museum Statistics**
   - 3 angka besar: jumlah arsip, kategori, kontribusi.
   - Angka memakai font display bronze; label di bawah dengan type-label.
5. **Closing Statement**
   - Kutipan emosional: *"Not everything lost was meant to be forgotten."*
   - CTA `LEAVE SOMETHING BEHIND →`.
6. **Footer** (lihat komponen Footer).

**State penting:** skeleton angka statistik sebelum data terbaca; jika localStorage gagal, angka menampilkan `—` dengan pesan ringan.

---

### 4.B The Archives — Archive Gallery (`#/archives`)

**Tujuan:** eksplorasi koleksi tanpa terasa seperti daftar hasil pencarian e-commerce.

**Struktur:**

1. Header halaman: label `DIGITAL COLLECTION`, h1 `Things We Almost Forgot.`, deskripsi satu kalimat, hitungan `08 ARSIP DALAM KOLEKSI` di kanan.
2. Toolbar (sticky di bawah navbar saat scroll):
   - Search bar lebar dengan ikon search, placeholder `Search archives...`.
   - `CATEGORY` select/chip, `SORT` select, toggle `FEATURED ONLY`.
   - Baris ringkas `Menampilkan X dari Y arsip` + tombol `Hapus filter` (hanya saat aktif).
3. Grid arsip dengan **pola editorial 12 kolom**:
   - Kartu 1: span 5 kolom, gambar aspect 4:3.
   - Kartu 2: span 3 kolom, gambar aspect 1:1.
   - Kartu 3: span 4 kolom, gambar aspect 3:4 (lebih tinggi).
   - Baris berikutnya: pola 4/4/4 → 3/6/3 → 5/7 secara berulang.
   - Kartu unggulan boleh span 6 kolom dengan gambar lebih besar.
4. Empty state: ilustrasi kotak arsip kosong, heading `Tidak ada arsip yang cocok.`, tombol `Hapus filter`.

**Kartu arsip memuat:** nomor arsip, gambar + `alt`, kategori (label olive), judul (h3 serif), periode (meta), deskripsi 2–3 baris, badge `FEATURED` bila aktif, badge `KONTRIBUSI PENGUNJUNG` bila relevan, tautan `Buka arsip →`.

**Interaksi:** seluruh kartu adalah satu area klik yang valid; hover mengangkat gambar 2 px dan memunculkan panah bronze; focus ring mengelilingi seluruh kartu.

---

### 4.C The Memory Room — Archive Detail (`#/archive/:id`)

**Tujuan:** pengalaman membaca dokumentasi artefak museum, bukan tabel database.

**Urutan konten (sesuai brief):**

1. Breadcrumb: `HOME / COLLECTIONS / ARCHIVE 001`.
2. `ARCHIVE NO. 001` + `CATEGORY LABEL` sejajar, dipisah titik bronze.
3. Judul besar h1 (serif, maks. 2 baris).
4. Gambar utama dominan: penuh 8 kolom kiri, aspect 3:2, dengan caption kecil `Fig. 01 — Dokumentasi arsip`.
5. Kolom kanan (4 kolom): panel metadata `ORIGIN`, `PERIOD`, `TYPE`, `STATUS`, border tipis, sticky saat scroll desktop.
6. Section `STORY`: paragraf editorial 2–4, line-height 1.75, lebar 62ch.
7. `HISTORICAL OR EMOTIONAL VALUE`: blockquote dengan border kiri bronze 2 px, serif italic 22–26 px.
8. `AUDIO ARCHIVE`: player minimalis (lihat komponen) hanya jika audio tersedia; jika tidak, sembunyikan section.
9. `RELATED ARCHIVES`: 3 card kecil, judul serif 20 px.
10. Tombol `← Kembali ke galeri` di awal dan akhir konten.

**State tambahan:** halaman tidak ditemukan → ilustrasi arsip hilang + `Arsip tidak ditemukan` + tombol galeri.

---

### 4.D Leave Something Behind — Contribution (`#/contribute`)

**Tujuan:** membuat pengunjung merasa sedang menitipkan sesuatu ke dalam brankas memory, bukan mengisi form administratif.

**Struktur:**

1. Header: eyebrow `CONTRIBUTE TO THE ARCHIVE`, h1 `Leave Something Behind.`, deskripsi 2 kalimat.
2. Layout dua kolom desktop (7/5):
   - **Kiri — form** dalam panel `#22221F` border 1 px, padding 40 px.
   - **Kanan — catatan kurator**: kutipan, ilustrasi amplop arsip, dan blok penjelasan lokal:
     > *Kontribusi Anda hanya tersimpan di perangkat ini...*
3. Field: judul kenangan, kategori (select 6 opsi), asal daerah, periode, textarea cerita, input gambar opsional dengan area drop-style (tanpa upload nyata).
4. Tombol `[ PRESERVE THIS MEMORY ]` lebar penuh di desktop 280 px, tinggi 52 px.
5. Error inline per field + ringkasan error di atas form.
6. Sukses: toast + redirect ke galeri dengan kartu tersorot (sesuai `SPEC.md`).

**Detail visual:** nomor urut field `01 / 02 / 03` di margin kiri form sebagai ornamen katalog; jangan berlebihan.

---

### 4.E The Time Capsule (`#/time-capsule`)

**Tujuan:** nuansa surat lama yang disegel untuk masa depan.

**Struktur:**

1. Header: eyebrow `A MESSAGE TO THE FUTURE`, h1 `A Message to the Future.`, deskripsi singkat + badge `LOCAL SIMULATION`.
2. Form dalam panel menyerupai amplop: border bronze tipis, sudut ada lipatan dekoratif berbasis CSS, label `SEALED BY`, `MESSAGE`, `TARGET YEAR (OPTIONAL)`, `WRITTEN IN 2026` (auto, readonly look).
3. Tombol `[ SEAL THIS MESSAGE ]` dengan ikon segel.
4. Daftar kapsul: grid 2 kolom desktop / 1 kolom mobile; setiap kartu menyerupai dokumen disegel:
   - Nomor kapsul `CAPSULE 001`, segel lilin bronze di kanan atas.
   - Isi pesan serif 18–20 px.
   - Footer: penulis, tanggal dibuat, target tahun, tombol `Hapus`.
5. Empty state: amplop kosong + `Belum ada pesan dalam kapsul. Tulis yang pertama.`

---

### 4.F The Last Time Machine — Timeline (`#/timeline`)

**Tujuan:** menjelajah perubahan waktu dengan ritme sinematik.

**Struktur:**

1. Header: eyebrow `INTERACTIVE EXHIBITION`, h1 `Time Changes Everything.`
2. Badge `SIMULATION` wajib terlihat di dekat heading, dengan tooltip/teks: *ilustratif, bukan data sejarah terverifikasi*.
3. Desktop: garis timeline horizontal di tengah dengan 4 titik tahun (1990, 2005, 2020, 2026); titik aktif membesar, berwarna bronze, diberi cincin.
4. Mobile: timeline vertikal di sisi kiri dengan titik dan tahun; area konten di bawah/kanan, scrollable.
5. Panel konten: gambar ilustratif kiri (aspect 4:3), teks kanan — tahun besar (`1990`), judul, deskripsi 2–3 kalimat.
6. Navigasi: klik titik tahun, slider opsional, tombol `←` / `→` untuk tahun sebelumnya/berikutnya.
7. Transisi konten: crossfade + geser 8 px, 240 ms.

---

### 4.G Dashboard — Museum Management Demo (`#/admin`)

**Tujuan:** tetap museum, tetapi mengutamakan kecepatan kelola.

**Struktur:**

1. Sidebar kiri 240 px (desktop): wordmark `MoA`, menu `Overview`, `Archives`, `Contributions`, `Settings / Reset`, badge `MODE DEMO` permanen di bawah.
2. Banner atas konten: `MODE DEMO PENGELOLA — tanpa login, data lokal perangkat ini`.
3. Overview: 3 statistik card (Total Archives, Categories, Contributions) dengan angka display serif, border tipis, tanpa warna cerah.
4. Archive management:
   - Toolbar: judul `Archive Management`, tombol `+ ADD ARCHIVE`, pencarian opsional.
   - Tabel: kolom `NO`, `TITLE`, `CATEGORY`, `PERIOD`, `FEATURED`, `ACTIONS`.
   - Baris: featured ditandai ikon + teks `UNGGULAN`; aksi `EDIT`, `DELETE`, toggle unggulan.
   - Empty state tabel: `Belum ada arsip.`
5. Kontribusi: tabel read-only (judul, kategori, asal, tanggal, cuplikan).
6. Modal: form tambah/edit arsip dan konfirmasi hapus/reset; panel `#22221F`, overlay gelap, focus trap.
7. Mobile: sidebar berubah menjadi header + tab horizontal; tabel berubah menjadi daftar kartu ringkas.

---

## 5. Wireframe Teks — Desktop (≈1440 px)

### 5.1 Landing Page

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ MoA  MUSEUM OF ALMOST      EXPLORE  COLLECTIONS  TIME MACHINE  TIME CAPSULE  │
│                                        ABOUT   [CONTRIBUTE]  MANAGEMENT DEMO│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                        ┌──────────────────┐  │
│   A DIGITAL ARCHIVE — EST. 2026                        │                  │  │
│                                                        │   HERO IMAGE     │  │
│   MUSEUM OF                                            │   (analog, 4:5)  │  │
│   ALMOST                                               │                  │  │
│                                                        │  Archival photo  │  │
│   A Living Digital Museum of Things We Almost Forgot.  │  of an object    │  │
│                                                        └──────────────────┘  │
│   │ "If everything disappeared tomorrow, what would                        │
│   │  you wish we had saved today?"                                         │
│                                                                            │
│   [ ENTER THE MUSEUM ]   DISCOVER OUR PURPOSE ↓                            │
├──────────────────────────────────────────────────────────────────────────────┤
│  WHY WE EXIST                                                               │
│  ─────────────────                                                          │
│  Storytelling and introduction — 3 short paragraphs or 3 value columns     │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│  FEATURED ARCHIVES                                     View all collections →│
│                                                                            │
│  ┌──────────────────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │        IMAGE 4:3         │  │  IMAGE 1:1   │  │  IMAGE 3:4   │          │
│  │ Archive 01 / FEATURED    │  │ Archive 02   │  │ Archive 03   │          │
│  │ Title — Cultural Heritage│  │ Title        │  │ Title        │          │
│  └──────────────────────────┘  └──────────────┘  └──────────────┘          │
├──────────────────────────────────────────────────────────────────────────────┤
│  MUSEUM STATISTICS                                                          │
│    008 ARSIP        006 KATEGORI        000 KONTRIBUSI                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                 PRESERVE WHAT MATTERS                                       │
│              "Not everything lost was meant to be forgotten."              │
│                      [ LEAVE SOMETHING BEHIND → ]                           │
├──────────────────────────────────────────────────────────────────────────────┤
│  FOOTER — wordmark · navigation · local-only notice · DEMO label            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Archive Gallery

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ NAVBAR (sticky, solid after scroll)                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ DIGITAL COLLECTION                                        08 ARSIP TERDAFTAR │
│ Things We Almost Forgot.                                                    │
│ Explore memories, traditions, sounds and forgotten stories.                 │
│                                                                            │
│ [ 🔍 SEARCH ARCHIVES.............................. ]                       │
│ [ CATEGORY ▼ ]  [ SORT ▼ ]  [ □ FEATURED ONLY ]     Menampilkan 8 dari 8    │
│ ──────────────────────────────────────────────────────────────────────────  │
│ ┌───────────────────────┐ ┌─────────────┐ ┌───────────────────┐            │
│ │ IMAGE 4:3   NO.001    │ │ IMAGE 1:1   │ │ IMAGE 3:4         │            │
│ │ CULTURAL HERITAGE     │ │ CHILDHOOD   │ │ FORGOTTEN SOUNDS  │            │
│ │ Congklak di Teras     │ │ Lompat Tali │ │ Suara Es Cendol   │            │
│ │ 1990-an · desc...     │ │ 1995–2005   │ │ 2004              │            │
│ │ Buka arsip →          │ │ Buka arsip →│ │ Buka arsip →      │            │
│ └───────────────────────┘ └─────────────┘ └───────────────────┘            │
│ ┌─────────────┐ ┌──────────────────────────────────┐ ┌─────────────┐      │
│ │ IMAGE 4:3   │ │ IMAGE LARGE — FEATURED           │ │ IMAGE 3:4   │      │
│ │ Archive 004 │ │ Archive 005 / UNGGULAN           │ │ Archive 006 │      │
│ └─────────────┘ └──────────────────────────────────┘ └─────────────┘      │
│ ┌───────────────────────┐ ┌────────────────────────────────────────┐       │
│ │ Archive 007           │ │ Archive 008                            │       │
│ └───────────────────────┘ └────────────────────────────────────────┘       │
├──────────────────────────────────────────────────────────────────────────────┤
│ Empty state (jika 0 hasil): [ kotak arsip ] Tidak ada arsip yang cocok.     │
│                                                    [ Hapus filter ]         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Memory Room

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ NAVBAR                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ HOME / COLLECTIONS / ARCHIVE 002                        ← Kembali ke galeri  │
│                                                                            │
│ ARCHIVE NO. 002  ·  FORGOTTEN SOUNDS                                        │
│ THE LAST ICE CREAM BELL                                                     │
│                                                                            │
│ ┌────────────────────────────────────────┐  ┌──────────────────────┐        │
│ │                                        │  │ ORIGIN: BANDUNG      │        │
│ │            MAIN IMAGE 3:2              │  │ PERIOD: 2004         │        │
│ │                                        │  │ TYPE: REKAMAN SUARA  │        │
│ │                                        │  │ STATUS: ARSIP        │        │
│ └────────────────────────────────────────┘  │ (sticky metadata)    │        │
│ Fig. 01 — Dokumentasi arsip                 └──────────────────────┘        │
│                                                                            │
│ STORY                                                                      │
│ Full archive description, 2–4 editorial paragraphs, max 62ch width.        │
│ Each paragraph has generous spacing and calm line-height.                  │
│                                                                            │
│ │ HISTORICAL OR EMOTIONAL VALUE                                            │
│ │ "A short reflective quote in serif italic."                              │
│                                                                            │
│ AUDIO ARCHIVE (if available)                                               │
│ ┌────────────────────────────────────────────────────────┐                  │
│ │ ▶  ───────●────────────────  00:42   [ minimal player ]│                  │
│ └────────────────────────────────────────────────────────┘                  │
│                                                                            │
│ RELATED ARCHIVES                                                           │
│ [ IMAGE ] Archive 01    [ IMAGE ] Archive 05    [ IMAGE ] Archive 07        │
│                                                                            │
│ ← Kembali ke galeri                                                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Contribution

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ NAVBAR                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ CONTRIBUTE TO THE ARCHIVE                                                    │
│ Leave Something Behind.                                                     │
│ Simpan satu kenangan agar tidak ikut hilang.                                │
│                                                                            │
│ ┌────────────────────────────────────────┐  ┌──────────────────────┐        │
│ │ 01 / NAMA ARSIP ATAU KENANGAN          │  │ CATATAN KURATOR      │        │
│ │ [________________________________]     │  │                      │        │
│ │ 02 / KATEGORI                          │  │ "Every object holds  │        │
│ │ [ Cultural Heritage            ▼ ]     │  │  a small universe."  │        │
│ │ 03 / ASAL DAERAH · PERIODE             │  │                      │        │
│ │ [____________] [____________]          │  │ [ ill. amplop ]      │        │
│ │ 04 / CERITA                            │  │                      │        │
│ │ [ textarea ........................ ]  │  │ Data hanya tersimpan │        │
│ │ [ textarea ........................ ]  │  │ di perangkat ini.    │        │
│ │ 05 / FOTO (OPSIONAL)                   │  │ Tidak dikirim ke     │        │
│ │ [ Pilih gambar · PNG/JPG/WebP · 2MB ]  │  │ server.              │        │
│ │                                        │  └──────────────────────┘        │
│ │ [      PRESERVE THIS MEMORY      ]     │                                 │
│ └────────────────────────────────────────┘                                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 5.5 Time Capsule

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ NAVBAR                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ A MESSAGE TO THE FUTURE                                [ LOCAL SIMULATION ]  │
│ A Message to the Future.                                                     │
│ Tulis sesuatu yang ingin dibaca generasi mendatang.                          │
│                                                                            │
│ ┌──────────────────────────────────────┐  ┌───────────────────────────────┐ │
│ │ ╭── SEALED BY ────────────────────╮  │  │ CAPSULE 001            ⬤ seal │ │
│ │ │ [______________________________] │  │  │ "Pesan dalam serif italic."  │ │
│ │ ╰────────────────────────────────╯  │  │ │                               │ │
│ │ MESSAGE                            │  │ │ — Anonim, 19 Nov 2026         │ │
│ │ [ textarea ...................... ] │  │ │ Target: 2046   [ Hapus ]      │ │
│ │ [ textarea ...................... ] │  │ └───────────────────────────────┘ │
│ │ TARGET YEAR (OPTIONAL) [____]      │  │ ┌───────────────────────────────┐ │
│ │ WRITTEN IN 2026 (auto)             │  │ │ CAPSULE 002            ⬤ seal │ │
│ │ [      SEAL THIS MESSAGE      ]    │  │ │ ...                           │ │
│ └────────────────────────────────────┘  │ └───────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 5.6 Timeline

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ NAVBAR                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ INTERACTIVE EXHIBITION                          [ SIMULATION — ilustratif ]  │
│ Time Changes Everything.                                                     │
│                                                                            │
│              1990 ──────── 2005 ─────●── 2020 ──────── 2026                 │
│                ○              ○         ● ACTIVE        ○                   │
│                                                                            │
│ ┌────────────────────────────────┐  ┌────────────────────────────────────┐  │
│ │                                │  │ 2020                               │  │
│ │      PERIOD IMAGE 4:3          │  │ Layar menggantikan lapangan        │  │
│ │      (illustrative)            │  │                                    │  │
│ │                                │  │ Cerita perubahan 2–3 paragraf.     │  │
│ └────────────────────────────────┘  │ [ ← 1990 ]        [ 2026 → ]        │  │
│                                     └────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 5.7 Dashboard

```text
┌──────────────┬───────────────────────────────────────────────────────────────┐
│ MoA          │ MODE DEMO PENGELOLA — tanpa login, data lokal perangkat ini  │
│ ───────────  │                                                               │
│ ▸ Overview   │ OVERVIEW                                                      │
│ ▸ Archives   │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐        │
│ ▸ Contrib.   │ │ 008           │ │ 006           │ │ 000           │        │
│ ▸ Reset      │ │ TOTAL ARCHIVES│ │ CATEGORIES    │ │ CONTRIBUTIONS │        │
│              │ └───────────────┘ └───────────────┘ └───────────────┘        │
│ [ MODE DEMO ]│                                                               │
│              │ ARCHIVE MANAGEMENT                     [ + ADD ARCHIVE ]     │
│              │ ┌────┬──────────────────┬──────────────┬────────┬──────────┐ │
│              │ │ NO │ TITLE            │ CATEGORY     │ FEATURED│ ACTIONS  │ │
│              │ ├────┼──────────────────┼──────────────┼────────┼──────────┤ │
│              │ │001 │ Congklak di...   │ Cultural Her.│ ✓ UNGG. │ Edit Del │ │
│              │ │002 │ Suara Es Cendol  │ Forgotten... │ —        │ Edit Del │ │
│              │ └────┴──────────────────┴──────────────┴────────┴──────────┘ │
│              │                                                               │
│              │ CONTRIBUTION LIST (read-only)          [ RESET DEMO DATA ]    │
│              │ [ judul · kategori · asal · tanggal · cuplikan ]              │
└──────────────┴───────────────────────────────────────────────────────────────┘
```

---

## 6. Wireframe Teks — Mobile (≈390 px)

### 6.1 Landing Page

```text
┌────────────────────────────────┐
│ MoA MUSEUM OF ALMOST      [≡]  │
├────────────────────────────────┤
│                                │
│   A DIGITAL ARCHIVE            │
│                                │
│   MUSEUM OF                    │
│   ALMOST                       │
│                                │
│ A Living Digital Museum        │
│ of Things We Almost Forgot     │
│                                │
│ │ If everything disappeared  │
│ │ tomorrow, what would you   │
│ │ wish we had saved today?   │
│                                │
│  [  ENTER THE MUSEUM  ]        │
│  DISCOVER OUR PURPOSE ↓        │
│                                │
│ ┌────────────────────────────┐ │
│ │       HERO IMAGE 4:5       │ │
│ └────────────────────────────┘ │
├────────────────────────────────┤
│        WHY WE EXIST            │
│  Introduction text...          │
├────────────────────────────────┤
│      FEATURED ARCHIVES         │
│  ┌──────────────────────────┐  │
│  │ IMAGE 4:3 / Archive 01   │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ IMAGE 1:1 / Archive 02   │  │
│  └──────────────────────────┘  │
├────────────────────────────────┤
│       MUSEUM STATISTICS        │
│  008 ARSIP · 006 KATEGORI      │
├────────────────────────────────┤
│   "Not everything lost was     │
│    meant to be forgotten."     │
│   [ LEAVE SOMETHING BEHIND ]   │
├────────────────────────────────┤
│           FOOTER               │
└────────────────────────────────┘
```

### 6.2 Archive Gallery

```text
┌────────────────────────────────┐
│ MoA MUSEUM OF ALMOST      [≡]  │
├────────────────────────────────┤
│ DIGITAL COLLECTION             │
│ Things We Almost Forgot        │
│ Explore forgotten stories.     │
│                                │
│ [ 🔍 SEARCH ARCHIVES...... ]   │
│ [ CATEGORY ▼            ]      │
│ [ SORT ▼               ]       │
│ [ □ FEATURED ONLY      ]       │
│ Menampilkan 8 dari 8           │
│ ─────────────────────────────  │
│ ┌────────────────────────────┐ │
│ │ IMAGE 4:3      NO.001      │ │
│ │ CULTURAL HERITAGE          │ │
│ │ Congklak di Teras Rumah    │ │
│ │ 1990-an · Deskripsi...     │ │
│ │ Buka arsip →               │ │
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ IMAGE 1:1      NO.002      │ │
│ │ Lompat Tali Sepulang Sekolah││
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ IMAGE 3:4      NO.003      │ │
│ │ ...                        │ │
│ └────────────────────────────┘ │
│ [ kotak ] Tidak ada arsip...  │
│ [ Hapus filter ]               │
└────────────────────────────────┘
```

### 6.3 Memory Room

```text
┌────────────────────────────────┐
│ MoA MUSEUM OF ALMOST      [≡]  │
├────────────────────────────────┤
│ ← Kembali ke galeri            │
│ HOME / COLLECTIONS / ARC.002   │
│                                │
│ ARCHIVE NO. 002                │
│ FORGOTTEN SOUNDS               │
│ THE LAST ICE CREAM BELL        │
│                                │
│ ┌────────────────────────────┐ │
│ │       MAIN IMAGE 3:2       │ │
│ └────────────────────────────┘ │
│ Fig. 01 — Dokumentasi          │
│                                │
│ ORIGIN: BANDUNG                │
│ PERIOD: 2004                   │
│ TYPE: REKAMAN SUARA            │
│ ─────────────────────────────  │
│ STORY                          │
│ Paragraf cerita dengan         │
│ line-height longgar dan        │
│ lebar baris nyaman.            │
│                                │
│ │ HISTORICAL VALUE           │
│ │ Kutipan serif italic.      │
│                                │
│ AUDIO ARCHIVE                  │
│ ┌────────────────────────────┐ │
│ │ ▶ ──●─────────  00:42      │ │
│ └────────────────────────────┘ │
│ RELATED ARCHIVES               │
│ [ IMAGE ] Archive 01           │
│ [ IMAGE ] Archive 05           │
│ [ IMAGE ] Archive 07           │
│ ← Kembali ke galeri            │
└────────────────────────────────┘
```

### 6.4 Contribution

```text
┌────────────────────────────────┐
│ MoA MUSEUM OF ALMOST      [≡]  │
├────────────────────────────────┤
│ CONTRIBUTE TO THE ARCHIVE      │
│ Leave Something Behind.        │
│ Penjelasan singkat.            │
│                                │
│ ┌────────────────────────────┐ │
│ │ 01 / NAMA KENANGAN         │ │
│ │ [______________________]   │ │
│ │ Error: wajib diisi.        │ │
│ │ 02 / KATEGORI              │ │
│ │ [ Cultural Heritage  ▼ ]   │ │
│ │ 03 / ASAL DAERAH           │ │
│ │ [______________________]   │ │
│ │ 04 / PERIODE               │ │
│ │ [______________________]   │ │
│ │ 05 / CERITA                │ │
│ │ [ textarea ............. ] │ │
│ │ [ textarea ............. ] │ │
│ │ 06 / FOTO (OPSIONAL)       │ │
│ │ [ Pilih gambar · maks 2MB ]│ │
│ │ [  PRESERVE THIS MEMORY  ] │ │
│ └────────────────────────────┘ │
│ Data hanya tersimpan di        │
│ perangkat ini.                 │
└────────────────────────────────┘
```

### 6.5 Time Capsule

```text
┌────────────────────────────────┐
│ MoA MUSEUM OF ALMOST      [≡]  │
├────────────────────────────────┤
│ A MESSAGE TO THE FUTURE        │
│ [ LOCAL SIMULATION ]           │
│ A Message to the Future.       │
│                                │
│ SEALED BY                      │
│ [________________________]     │
│ MESSAGE                        │
│ [ textarea ................ ]  │
│ [ textarea ................ ]  │
│ TARGET YEAR (OPSIONAL)         │
│ [________]                     │
│ WRITTEN IN 2026                │
│ [  SEAL THIS MESSAGE  ]        │
│ ─────────────────────────────  │
│ CAPSULE 001            ⬤ seal │
│ "Pesan untuk generasi..."      │
│ — Anonim · 19 Nov 2026         │
│ Target: 2046    [ Hapus ]      │
│ ┌────────────────────────────┐ │
│ │ Empty: amplop kosong       │ │
│ └────────────────────────────┘ │
└────────────────────────────────┘
```

### 6.6 Timeline

```text
┌────────────────────────────────┐
│ MoA MUSEUM OF ALMOST      [≡]  │
├────────────────────────────────┤
│ INTERACTIVE EXHIBITION         │
│ Time Changes Everything.       │
│ [ SIMULATION — ilustratif ]    │
│                                │
│ ● 1990                         │
│ │ ○ 2005                       │
│ │ ○ 2020                       │
│ │ ○ 2026                       │
│ │                                │
│ ┌────────────────────────────┐ │
│ │ PERIOD IMAGE 4:3           │ │
│ └────────────────────────────┘ │
│ 1990                           │
│ Permainan di halaman           │
│ Cerita periode 2–3 paragraf.   │
│ [ ← 1990 ]      [ 2026 → ]     │
└────────────────────────────────┘
```

### 6.7 Dashboard

```text
┌────────────────────────────────┐
│ MoA MUSEUM MANAGEMENT     [≡]  │
│ [ MODE DEMO — tanpa login ]    │
├────────────────────────────────┤
│ OVERVIEW                       │
│ ┌────────────────────────────┐ │
│ │ 008      TOTAL ARCHIVES    │ │
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ 006      CATEGORIES        │ │
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ 000      CONTRIBUTIONS     │ │
│ └────────────────────────────┘ │
│ ─────────────────────────────  │
│ ARCHIVE MANAGEMENT             │
│ [ + ADD ARCHIVE ]              │
│ ┌────────────────────────────┐ │
│ │ 001 Congklak di Teras      │ │
│ │ Cultural Heritage · UNGG.  │ │
│ │ [ Edit ] [ Hapus ]         │ │
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ 002 Suara Es Cendol        │ │
│ │ [ Edit ] [ Hapus ]         │ │
│ └────────────────────────────┘ │
│ CONTRIBUTION LIST              │
│ [ RESET DEMO DATA ]            │
└────────────────────────────────┘
```

---

## 7. Responsive Design

Pendekatan: **mobile-first**, dengan tiga breakpoint utama.

| Breakpoint | Lebar | Grid | Navbar | Galeri | Timeline | Dashboard |
|---|---|---|---|---|---|---|
| Mobile | < 768 px | 4 kolom, padding 20 px | Hamburger, panel vertikal | 1 kolom, tinggi kartu bervariasi | Vertikal di sisi kiri | Tumpuk, tabel → kartu |
| Tablet | 768–1023 px | 8 kolom, padding 40 px | Menu horizontal ringkas / hamburger | 2 kolom | Horizontal dapat digeser | Sidebar 200 px atau tab |
| Desktop | ≥ 1024 px | 12 kolom, padding 64 px, max 1320 px | Horizontal sticky | 3 kolom asimetris | Horizontal 4 titik | Sidebar 240 px + tabel |

**Aturan tambahan**

- Area sentuh minimal **44×44 px** untuk semua tombol, link, dan input di mobile.
- Gambar selalu `max-width: 100%`, tinggi otomatis; aspect ratio dijaga dengan wrapper.
- Tidak ada horizontal overflow: teks panjang dipotong dengan ellipsis, tabel dibungkus scroll container horizontal di tablet.
- Hero mobile: teks di atas, gambar di bawah; hero desktop: teks kiri, gambar kanan.
- Font display mobile turun ke 48–64 px agar tidak memotong kata.
- Jarak antar section mobile 40–56 px, desktop 96–128 px.
- Navigation aktif tetap terlihat di semua breakpoint (underline bronze + teks).
- Modal mobile: margin 16 px, tinggi maksimal 85vh, konten bisa scroll.

---

## 8. Interaction & Motion Specification

### 8.1 Token gerak

| Token | Durasi | Easing | Penggunaan |
|---|---|---|---|
| `motion-fast` | 120–160 ms | ease-out | Hover, focus, perubahan warna. |
| `motion-base` | 180–240 ms | cubic-bezier(.2,.7,.2,1) | Transisi halaman, reveal, timeline. |
| `motion-slow` | 400–600 ms | ease-out | Stagger hero, counter statistik. |

Maksimal satu animasi dominan per interaksi. Hindari animasi > 600 ms.

### 8.2 Inventaris interaksi

| Interaksi | Perilaku visual |
|---|---|
| Smooth scrolling | Anchor internal #about dan breadcrumb; durasi alami, non-instan. |
| Hero stagger | Eyebrow → judul → subtitle → kutipan → CTA, jeda 120–180 ms, `translateY(12px)` + fade. |
| Section reveal | Konten muncul saat masuk viewport: fade + geser 12 px, 400 ms, stagger 80 ms per item. |
| Image reveal galeri | Gambar naik 2 px + border bronze saat hover; kartu tidak berubah ukuran drastis. |
| Card hover/focus | Border bronze 40%, bayangan lemah, panah `→` muncul. |
| Page transition | Fade 180 ms saat hash berubah; `<main>` tidak berkedip. |
| Modal | Fade overlay 160 ms + panel scale .98 → 1, 200 ms. |
| Counter statistik | Angka berjalan 600 ms dari 0 ke nilai, sekali per mount. |
| Timeline transition | Crossfade + `translateY(8px)`, 240 ms; titik aktif membesar. |
| Form feedback | Error muncul 160 ms dekat field; sukses → toast + ring bronze singkat. |
| Toast | Masuk dari bawah/kanan, 200 ms, auto-hilang 4 detik, tombol close tersedia. |
| Audio | Tombol play/pause berubah ikon; progress bar bergerak; tidak autoplay. |

### 8.3 Reduced motion

Jika `prefers-reduced-motion: reduce`:

- Semua durasi menjadi `0.01 ms` / efek dinonaktifkan.
- Counter menampilkan angka final langsung.
- Reveal, stagger, parallax, dan transisi timeline dimatikan.
- Fungsi tetap sepenuhnya accessible; tidak ada konten yang hanya muncul setelah animasi.

### 8.4 Aturan performa gerak

- Animasi hanya `opacity` dan `transform`.
- Jangan animasi `width`, `height`, `top`, `left`, atau `box-shadow` besar.
- Grain dan texture statis, bukan video.
- Batasi jumlah elemen yang diamati Intersection Observer saat reveal.

---

## 9. Accessibility Specification

| Area | Persyaratan konkret |
|---|---|
| Semantic HTML | `header`, `nav`, `main`, `section`, `article`, `footer`, `h1` sekali per halaman, urutan heading logis. |
| Kontras | Ivory/charcoal 14.18:1, cream 10.51:1, bronze 4.78:1, grey 4.58:1 lolos AA. Olive 4.05:1 hanya untuk non-teks/label besar. |
| Alt text | Gambar arsip: `alt="Dokumentasi Congklak di teras rumah, Jawa, 1990-an"`. Dekoratif: `alt=""`. |
| Label form | Setiap input punya `<label>` terlihat; placeholder bukan pengganti label. |
| Keyboard | Semua interaksi via Tab/Enter/Space/Escape; modal focus trap; focus kembali ke trigger setelah close. |
| Focus indicator | Outline 2 px bronze, offset 3 px, terlihat di atas gelap. |
| Ukuran target | Minimal 44×44 px di mobile. |
| Ukuran teks | Minimum 13 px untuk metadata, 15 px untuk body. |
| Warna bukan satu-satunya penanda | Featured = ikon + teks `UNGGULAN`; error = ikon + pesan; demo = badge teks `DEMO`. |
| Audio | Kontrol native/custom yang bisa di-Tab, ada label, volume jelas, tidak autoplay. |
| Status dinamis | Toast dan error memakai `role="status"` / `aria-live`. |
| Motion | `prefers-reduced-motion` dihormati (Bab 8.3). |
| Bahasa | Atribut `lang` sesuai konten; istilah Inggris pada label museum ditulis sebagai proper noun. |
| Skip link | `Lewati ke konten` sebagai elemen pertama yang bisa difokus. |

---

## 10. Component Specification

### 10.1 Navbar

- **Tujuan:** orientasi dan akses ke seluruh area museum.
- **Struktur:** wordmark kiri, menu kanan, sticky.
- **Elemen:** monogram `MoA`, teks wordmark, item nav, tombol Contribute, badge DEMO.
- **Interaksi:** active underline bronze; hover cream → ivory; scroll > 80 px solid background.
- **Responsive:** hamburger + panel vertikal < 768 px.
- **State:** default, scrolled, active, hover, focus, menu open/closed.

### 10.2 Mobile Navigation

- **Tujuan:** navigasi penuh di layar sempit.
- **Struktur:** tombol 44×44 px + panel full-width + overlay.
- **Elemen:** ikon menu/close, daftar item, divider sebelum Management.
- **Interaksi:** buka/tutup, auto-close saat pilih item, Escape menutup, focus trap ringan.
- **Responsive:** hanya tampil < 768 px.
- **State:** closed, open, item active.

### 10.3 Hero Section

- **Tujuan:** pengalaman masuk yang emosional.
- **Struktur:** eyebrow, display, subtitle, kutipan, dua CTA, visual kanan/bawah.
- **Elemen:** heading display, blockquote, tombol primer & sekunder, gambar analog.
- **Interaksi:** stagger masuk, CTA primer → galeri, sekunder → #about.
- **Responsive:** dua kolom desktop, satu kolom mobile; gambar di bawah.
- **State:** animating, settled, reduced-motion.

### 10.4 Archive Card

- **Tujuan:** mewakili satu artefak di galeri.
- **Struktur:** wrapper klik, gambar, nomor, label kategori, judul, meta, deskripsi, badge.
- **Elemen:** `NO.001`, `FEATURED`, `KONTRIBUSI PENGUNJUNG`, `Buka arsip →`.
- **Interaksi:** hover angkat 2 px + panah; focus outline mengelilingi seluruh kartu; klik → Memory Room.
- **Responsive:** lebar mengikuti span grid; mobile penuh.
- **State:** default, hover, focus, featured, contribution, new-highlight.

### 10.5 Archive Grid

- **Tujuan:** menyajikan koleksi dengan ritme asimetris.
- **Struktur:** CSS grid 12 kolom dengan pola span 5/3/4 → 4/4/4 → 3/6/3.
- **Elemen:** kartu, jarak 24–32 px, featured span lebih besar.
- **Interaksi:** reflow saat filter; reveal stagger saat scroll.
- **Responsive:** 3 kolom → 2 → 1.
- **State:** populated, filtering, empty.

### 10.6 Category Filter

- **Tujuan:** menyaring 6 kategori.
- **Struktur:** select atau chip-wrap dengan label `CATEGORY`.
- **Elemen:** `Semua kategori` + 6 opsi, centerang aktif bronze.
- **Interaksi:** pilih → grid update + hitungan hasil; `Hapus filter` reset.
- **Responsive:** chip wrap di mobile, select di desktop opsional.
- **State:** default, selected, disabled saat 0 hasil.

### 10.7 Search Bar

- **Tujuan:** pencarian judul & deskripsi.
- **Struktur:** input dengan ikon search kiri, tombol clear kanan.
- **Elemen:** placeholder `Search archives...`, hitungan hasil.
- **Interaksi:** input langsung memfilter; Escape mengosongkan; focus bronze.
- **Responsive:** lebar penuh di mobile.
- **State:** empty, typing, filled, focus, error render (jarang).

### 10.8 Archive Metadata

- **Tujuan:** informasi katalog ringkas.
- **Struktur:** daftar pasangan label–nilai.
- **Elemen:** `ORIGIN`, `PERIOD`, `TYPE`, `STATUS`.
- **Interaksi:** sticky di desktop; teks bisa dipilih/di-copy.
- **Responsive:** berubah jadi blok horizontal di mobile.
- **State:** lengkap, nilai `UNKNOWN`/`Tidak diketahui`.

### 10.9 Audio Player

- **Tujuan:** memutar rekaman arsip tanpa merusak tema.
- **Struktur:** tombol play/pause, progress, waktu, label judul audio.
- **Elemen:** ikon, track tipis bronze, `00:42`, teks `Audio arsip`.
- **Interaksi:** play/pause, seek, keyboard; tidak autoplay.
- **Responsive:** lebar penuh mobile.
- **State:** idle, playing, paused, buffered, unavailable (disembunyikan).

### 10.10 Timeline

- **Tujuan:** eksplorasi 4 periode.
- **Struktur:** garis + titik tahun desktop; garis vertikal mobile; panel konten.
- **Elemen:** tahun, judul, gambar, deskripsi, badge SIMULATION, panah nav, slider opsional.
- **Interaksi:** klik titik/slider/panah → crossfade konten; arrow keys slider.
- **Responsive:** horizontal → vertikal.
- **State:** periode aktif, transisi, reduced-motion.

### 10.11 Contribution Form

- **Tujuan:** mengumpulkan kenangan pengunjung.
- **Struktur:** panel surface, field bernomor, catatan kurator di samping.
- **Elemen:** 6 field, error inline, ringkasan error, tombol `PRESERVE THIS MEMORY`.
- **Interaksi:** validasi blur + submit, focus ke error pertama, loading saat simpan, toast sukses.
- **Responsive:** satu kolom mobile; catatan kurator di bawah form.
- **State:** empty, invalid, submitting, success, quota-error.

### 10.12 Time Capsule Card

- **Tujuan:** menampilkan pesan seperti dokumen tersegel.
- **Struktur:** panel kertas tua, nomor, segel, pesan, footer metadata.
- **Elemen:** `CAPSULE 001`, ikon segel, pesan serif, penulis, tanggal, target tahun, `Hapus`.
- **Interaksi:** hover angkat tipis; hapus → konfirmasi; focus jelas.
- **Responsive:** 2 kolom desktop, 1 kolom mobile.
- **State:** default, hover, deleting, empty-list.

### 10.13 Statistics Card

- **Tujuan:** menampilkan angka koleksi.
- **Struktur:** angka display besar + label kecil + border tipis.
- **Elemen:** angka (counter), label uppercase, ikon opsional.
- **Interaksi:** counter 600 ms sekali mount; reduced-motion langsung final.
- **Responsive:** 3 kolom desktop, tumpuk mobile.
- **State:** loading (`—`), loaded, error.

### 10.14 Dashboard Sidebar

- **Tujuan:** navigasi kelola demo.
- **Struktur:** panel kiri dengan wordmark, menu, badge demo.
- **Elemen:** `Overview`, `Archives`, `Contributions`, `Reset`, `MODE DEMO`.
- **Interaksi:** active state dengan garis bronze di kiri; klik mengganti panel.
- **Responsive:** berubah jadi header + tab horizontal di mobile.
- **State:** active section, collapsed mobile.

### 10.15 Data Table

- **Tujuan:** mengelola arsip dan melihat kontribusi.
- **Struktur:** header uppercase, baris dengan border bawah, kolom aksi kanan.
- **Elemen:** `NO`, `TITLE`, `CATEGORY`, `PERIOD`, `FEATURED`, `ACTIONS`.
- **Interaksi:** hover barus surface-2; sort opsional; aksi Edit/Delete/toggle.
- **Responsive:** scroll container horizontal di tablet; kartu vertikal di mobile.
- **State:** populated, empty, hover, selected row.

### 10.16 Modal Dialog

- **Tujuan:** form arsip & konfirmasi hapus/reset tanpa meninggalkan halaman.
- **Struktur:** overlay gelap + panel surface 560 px, header, body, footer tombol.
- **Elemen:** judul, tombol close, isi form/pesan, `Batal`, `Simpan`/`Hapus`.
- **Interaksi:** Escape close, klik overlay close, focus trap, focus return.
- **Responsive:** margin 16 px, tinggi maks 85vh, scroll internal.
- **State:** open, submitting, danger (hapus/reset).

### 10.17 Toast Notification

- **Tujuan:** konfirmasi ringan tanpa mengganggu membaca.
- **Struktur:** panel kecil di kanan bawah, ikon + pesan + close.
- **Elemen:** ikon centang/alert, teks, tombol close, `role="status"`.
- **Interaksi:** masuk 200 ms, auto-hilang 4 detik, close manual.
- **Responsive:** lebar penuh minus 32 px di mobile.
- **State:** success, error, info.

### 10.18 Footer

- **Tujuan:** menutup pengalaman museum secara konsisten.
- **Struktur:** wordmark, kolom navigasi, catatan lokal-only, label demo.
- **Elemen:** tautan ke semua halaman, tagline, hak cipta ilustratif.
- **Interaksi:** tautan standar dengan hover bronze.
- **Responsive:** tumpuk di mobile.
- **State:** statis.

---

## 11. Visual Assets

### 11.1 Daftar aset yang dibutuhkan

| Aset | Digunakan di | Aspect ratio | Catatan |
|---|---|---|---|
| `hero-archive` | Landing hero | 4:5 (desktop), 4:5 mobile | Objek nostalgia/foto analog; fokus di tengah. |
| `archive-congklak` | Seed 001, featured | 4:3 | Permainan tradisional. |
| `archive-cendol` | Seed 002 | 1:1 | Penjual es cendol / lonceng. |
| `archive-rendang` | Seed 003, featured | 3:4 | Resep & bumbu keluarga. |
| `archive-bioskop` | Seed 004 | 4:3 | Bangunan tua. |
| `archive-lompat-tali` | Seed 005 | 1:1 | Kenangan masa kecil. |
| `archive-sapa` | Seed 006, featured | 3:4 | Kebiasaan bertetangga. |
| `archive-wayang` | Seed 007 | 4:3 | Seni pertunjukan. |
| `archive-radio` | Seed 008 | 3:2 | Radio/kipas tua. |
| `timeline-1990/2005/2020/2026` | Timeline | 4:3 | Ilustrasi periode, jelas simulasinya. |
| `texture-paper` (opsional) | Overlay global | tile 256×256 | Noise sangat tipis, opacity 0.03–0.05. |
| `illustration-empty` | Empty states | 1:1 | Kotak arsip / amplop. |
| `envelope-capsule` | Contribution & capsule | 4:3 | Amplop katalog. |

### 11.2 Ketentuan aset

- Prioritaskan file lokal di `public/images/`; format SVG untuk ilustrasi, WebP/JPG terkompresi untuk foto (< 200 KB per file).
- Jika foto belum tersedia, gunakan **placeholder lokal konsisten**: latar `#22221F`, garis bronze tipis, inisial kategori dalam serif besar, dan label `ARCHIVE IMAGE`.
- **Dilarang** memakai URL gambar eksternal atau gambar berhak cipta tanpa izin.
- Semua gambar arsip wajib punya `alt` deskriptif (lihat Bab 9).
- Terapkan `object-fit: cover` dan wrapper aspect ratio agar tidak ada pergeseran layout saat gambar load.
- Gambar gagal dimuat → fallback placeholder lokal yang sama (jangan ikon broken-image).
- Warna foto: saturasi rendah, tones hangat, kontras sedang; konsisten di seluruh arsip.

---

## 12. UI Acceptance Criteria

Pemeriksaan manual di desktop (1440 px) dan mobile (390 px).

| # | Kriteria | Langkah pengujian | Hasil diharapkan |
|---|---|---|---|
| 1 | Identitas visual konsisten | Buka ketujuh halaman secara berurutan | Palet charcoal/ivory/bronze, tipografi serif+sans, label museum, dan footer sama di semua halaman. |
| 2 | Landing berkesan | Buka `#/`, amati hero 3 detik | Hero full-viewport, judul besar, subtitle, kutipan pembuka, dua CTA, visual arsip, animasi stagger halus. |
| 3 | Navbar desktop & mobile | Uji klik semua item di 1440 px; buka menu di 390 px | Semua tautan berfungsi; active state jelas; hamburger membuka/tutup; item DEMO terlihat. |
| 4 | Galeri jelas & menarik | Buka `#/archives` | Pola asimetris 3/2/1 kolom sesuai breakpoint, nomor arsip, metadata, dan badge terlihat. |
| 5 | Filter & search mudah ditemukan | Lihat bagian atas galeri, lalu ketik `congklak` | Search, category, sort, featured berada dalam satu toolbar; hasil langsung menyaring. |
| 6 | Card hover & focus | Arahkan mouse ke kartu, lalu Tab ke kartu | Hover mengangkat kartu & memunculkan panah; focus outline bronze terlihat mengelilingi kartu. |
| 7 | Memory Room nyaman dibaca | Buka satu arsip, gulir cerita | Urutan breadcrumb → nomor → judul → gambar → metadata → cerita → kutipan → audio → related; lebar baris nyaman. |
| 8 | Form kontribusi mudah | Buka `#/contribute`, submit kosong | Label jelas, error dekat field, focus ke error pertama, catatan lokal-only terlihat. |
| 9 | Time Capsule seperti arsip | Buka `#/time-capsule`, lihat daftar (atau empty state) | Kartu bergaya surat tersegel, nomor, segel, penulis, tanggal, target tahun; label simulasi ada. |
| 10 | Timeline desktop & mobile | Pilih 1990 → 2026 di 1440 px dan 390 px | Titik/status berubah, gambar+teks berganti dengan transisi, label SIMULATION terlihat, mobile vertikal. |
| 11 | Dashboard terbaca | Buka `#/admin` di desktop | Sidebar, banner demo, 3 statistik, tabel rapi, aksi Edit/Delete jelas, tetap charcoal/ivory/bronze. |
| 12 | Responsif semua halaman | Uji 1440 / 820 / 390 px | Layout menyesuaikan grid, navbar, timeline, dan dashboard sesuai Bab 7. |
| 13 | Tidak ada overflow | Gulir seluruh halaman di 390 px | Tidak ada elemen keluar dari viewport; tabel tidak memaksa scroll horizontal di mobile. |
| 14 | Kontras & keterbacaan | Periksa teks utama, metadata, bronze, dan olive | Teks utama/metadata/bronze lolos AA; olive hanya dipakai untuk label besar/non-teks. |
| 15 | Animasi tidak mengganggu | Aktifkan `prefers-reduced-motion: reduce`, buka semua halaman | Semua animasi mati, konten langsung tampil, counter menampilkan angka final, fungsi tetap bekerja. |

---

## 13. Catatan Implementasi UI & Prioritas

| Prioritas | Elemen UI |
|---|---|
| **Wajib (P0)** | Token warna/typography, navbar + hamburger, hero + CTA, galeri + toolbar + card states, detail + metadata + kutipan, form kontribusi + error states, kapsul + kartu, timeline + badge SIMULATION, dashboard + banner DEMO + tabel + modal konfirmasi, responsivitas, focus ring, alt text. |
| **Dapat disederhanakan (P1)** | Stagger hero, reveal saat scroll, counter animasi, audio player kustom, slider timeline, transisi halaman. |
| **Ditunda (P2)** | Texture kertas lanjutan, efek lipatan amplop kompleks, parallax ringan, hover gambar lanjutan, dark/light toggle (tidak ada dalam scope). |

**Panduan saat waktu terdesak:** pertahankan hierarki visual, kontras, konsistensi komponen, dan responsivitas. Animasi boleh dimatikan seluruhnya sebelum mengorbankan keterbacaan atau status interaksi.

**Catatan terakhir:** dokumen ini adalah panduan desain. Implementasi UI baru dimulai setelah `SPEC.md` dan `UI-SPEC.md` ditinjau dan disetujui.
