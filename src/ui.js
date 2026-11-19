/**
 * ui.js — shell, komponen, dan seluruh tampilan museum.
 *
 * View mengembalikan { html, mount } agar renderApp bisa memasang event
 * setelah markup entered. Semua teks pengguna diescape; tidak ada innerHTML
 * dari input mentah.
 */

import {
  CATEGORIES,
  CATEGORY_INITIALS,
  OPENING_QUESTION,
  TAGLINE,
  TIMELINE_PERIODS,
} from './products.js';
import * as store from './store.js';

const ICONS = {
  arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6 6-6-6 6-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.5 6 .9-4.35 4.2 1.03 6L12 16.8 6.62 19.6l1.03-6L3.3 9.4l6-.9z"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4l10-10-4-4L4 16zM14 6l4 4"/></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-9 0 1 13h10l1-13"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 2 20h20zM12 10v4m0 3h.01"/></svg>',
};

function svg(name) {
  return `<span class="icon" aria-hidden="true">${ICONS[name] ?? ''}</span>`;
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pad(value, length = 3) {
  return String(value).padStart(length, '0');
}

function formatDate(iso, withTime = false) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Tanggal tidak diketahui';
  const options = withTime
    ? { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { day: 'numeric', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
}

let toastTimer;
export function toast(message, type = 'success') {
  const region = document.getElementById('toast-region');
  if (!region) return;
  const isError = type === 'error';
  region.innerHTML = `
    <div class="toast toast--${isError ? 'error' : 'success'}">
      ${svg(isError ? 'alert' : 'check')}
      <span>${escapeHtml(message)}</span>
      <button type="button" class="toast__close" data-toast-close aria-label="Tutup notifikasi">${svg('close')}</button>
    </div>`;
  region.querySelector('[data-toast-close]')?.addEventListener('click', clearToast);
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(clearToast, 4000);
}

function clearToast() {
  const region = document.getElementById('toast-region');
  if (region) region.innerHTML = '';
}

/* ------------------------------------------------------------------ shell */

const NAV_ITEMS = [
  { label: 'EXPLORE', href: '#/', key: 'entrance' },
  { label: 'COLLECTIONS', href: '#/archives', key: 'collections' },
  { label: 'TIME MACHINE', href: '#/timeline', key: 'timeline' },
  { label: 'TIME CAPSULE', href: '#/time-capsule', key: 'time-capsule' },
  { label: 'ABOUT', href: '#/#about', key: 'about' },
  { label: 'CONTRIBUTE', href: '#/contribute', key: 'contribute', cta: true },
  { label: 'MANAGEMENT — DEMO', href: '#/admin', key: 'admin', demo: true },
];

function currentNavKey(route) {
  if (route.name === 'archive') return 'collections';
  if (route.name === 'notfound') return '';
  return route.name;
}

function navLink(item, activeKey, mobile = false) {
  const active = item.key === activeKey ? ' is-active' : '';
  const classes = ['nav__link', active, item.cta ? 'nav__link--cta' : '', item.demo ? 'nav__link--demo' : '']
    .filter(Boolean)
    .join(' ');
  const badge = item.demo ? '<span class="demo-badge">DEMO</span>' : '';
  return `<a class="${classes}" href="${item.href}"${mobile ? ' data-mobile-link' : ''}${
    active ? ' aria-current="page"' : ''
  }>${escapeHtml(item.label)}${badge}</a>`;
}

let scrollListenerAttached = false;
let menuListenerAttached = false;

export function renderShell(route) {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (!headerEl || !footerEl) return;

  const activeKey = currentNavKey(route);
  headerEl.innerHTML = `
    <nav class="navbar" aria-label="Navigasi utama">
      <a class="wordmark" href="#/" aria-label="Museum of Almost — beranda">
        <span class="wordmark__mono">MoA</span>
        <span class="wordmark__text">MUSEUM OF ALMOST</span>
      </a>
      <div class="nav__desktop">${NAV_ITEMS.map((item) => navLink(item, activeKey)).join('')}</div>
      <button type="button" class="nav__toggle" aria-label="Buka menu" aria-expanded="false" aria-controls="mobile-menu">
        ${svg('menu')}<span class="nav__toggle-close">${svg('close')}</span>
      </button>
    </nav>
    <div class="nav__overlay" data-menu-overlay hidden></div>
    <div class="nav__mobile" id="mobile-menu" hidden>
      ${NAV_ITEMS.map((item, index) =>
        item.demo
          ? `<div class="nav__divider"></div>${navLink(item, activeKey, true)}`
          : navLink(item, activeKey, true),
      ).join('')}
    </div>`;

  footerEl.innerHTML = `
    <div class="footer__inner">
      <div>
        <p class="wordmark wordmark--footer"><span class="wordmark__mono">MoA</span> MUSEUM OF ALMOST</p>
        <p class="footer__tagline">${escapeHtml(TAGLINE)}</p>
      </div>
      <nav class="footer__nav" aria-label="Navigasi footer">
        ${NAV_ITEMS.slice(1, 6)
          .map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`)
          .join('')}
      </nav>
      <p class="footer__notice">
        Seluruh data hanya tersimpan di perangkat ini. Tidak ada login, server, atau sinkronisasi.
        <span class="demo-badge">MODE DEMO</span>
      </p>
    </div>`;

  wireNavigation();
}

function wireNavigation() {
  const toggle = document.querySelector('.nav__toggle');
  const panel = document.getElementById('mobile-menu');
  const overlay = document.querySelector('[data-menu-overlay]');
  if (!toggle || !panel || !overlay) return;

  const closeMenu = (returnFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka menu');
    panel.hidden = true;
    overlay.hidden = true;
    document.body.classList.remove('menu-open');
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open) return closeMenu(true);
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Tutup menu');
    panel.hidden = false;
    overlay.hidden = false;
    document.body.classList.add('menu-open');
    panel.querySelector('a')?.focus();
  });

  overlay.addEventListener('click', () => closeMenu(true));
  panel.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu(false);
  });

  if (!menuListenerAttached) {
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (document.body.classList.contains('menu-open')) closeMenu(true);
      document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
    });
    menuListenerAttached = true;
  }

  if (!scrollListenerAttached) {
    window.addEventListener(
      'scroll',
      () => document.querySelector('.navbar')?.classList.toggle('is-scrolled', window.scrollY > 80),
      { passive: true },
    );
    scrollListenerAttached = true;
  }
}

/* ------------------------------------------------------------- components */

function mediaBlock(item, variant = '') {
  const url = store.safeImageUrl(item.imageUrl);
  const initial = CATEGORY_INITIALS[item.category] || 'MoA';
  const alt = escapeHtml(`Dokumentasi arsip: ${item.title}`);
  if (url) {
    return `<div class="media ${variant}">
      <img src="${escapeHtml(url)}" alt="${alt}" loading="lazy" data-fallback-initial="${initial}" />
      <span class="media__fallback" aria-hidden="true">${escapeHtml(initial)}</span>
    </div>`;
  }
  return `<div class="media media--placeholder ${variant}" role="img" aria-label="${alt}">
    <span class="media__initial" aria-hidden="true">${escapeHtml(initial)}</span>
    <span class="media__grain" aria-hidden="true"></span>
  </div>`;
}

function archiveCard(item, index, options = {}) {
  const featured = item.featured
    ? `<span class="badge badge--featured">${svg('star')} UNGGULAN</span>`
    : '';
  const contribution =
    item.source === 'contribution'
      ? '<span class="badge badge--contribution">KONTRIBUSI PENGUNJUNG</span>'
      : '';
  const period = item.period || 'Periode tidak diketahui';
  const isNew = options.newId === item.id ? ' is-new' : '';
  return `<article class="archive-card${isNew}" data-archive-id="${escapeHtml(item.id)}">
    <a class="archive-card__link" href="#/archive/${encodeURIComponent(item.id)}" aria-label="Buka arsip ${escapeHtml(item.title)}">
      ${mediaBlock(item, 'media--card')}
      <div class="archive-card__body">
        <div class="archive-card__top"><span class="archive-no">NO. ${pad(index + 1)}</span>${featured}${contribution}</div>
        <p class="eyebrow eyebrow--category">${escapeHtml(item.category)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="meta">${escapeHtml(period)} · ${escapeHtml(item.archiveType)}</p>
        <p class="archive-card__desc">${escapeHtml(item.description)}</p>
        <span class="archive-card__cta">Buka arsip ${svg('arrowRight')}</span>
      </div>
    </a>
  </article>`;
}

function statsMarkup(stats, available) {
  const value = (number) => (available ? pad(number) : '—');
  return `<div class="stats">
    <div class="stat"><span class="stat__number">${value(stats.archives)}</span><span class="stat__label">ARSIP</span></div>
    <div class="stat"><span class="stat__number">${value(stats.categories)}</span><span class="stat__label">KATEGORI</span></div>
    <div class="stat"><span class="stat__number">${value(stats.contributions)}</span><span class="stat__label">KONTRIBUSI</span></div>
  </div>`;
}

function sectionLabel(text) {
  return `<p class="eyebrow">${escapeHtml(text)}</p>`;
}

function emptyState(title, description, buttonHtml = '') {
  return `<div class="empty-state">
    <div class="empty-state__illustration" aria-hidden="true"><span></span><span></span><span></span></div>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(description)}</p>
    ${buttonHtml}
  </div>`;
}

/* ------------------------------------------------------------------ views */

function viewEntrance() {
  const archives = store.getArchives();
  const stats = store.getStats();
  const available = store.isStorageAvailable();
  const featured = archives.filter((item) => item.featured).slice(0, 3);

  const html = `
    <section class="hero">
      <div class="hero__copy">
        <p class="eyebrow hero__eyebrow" style="--i:0">A DIGITAL ARCHIVE — EST. 2026</p>
        <h1 class="hero__title" tabindex="-1" style="--i:1">Museum of<br />Almost</h1>
        <p class="hero__subtitle" style="--i:2">A Living Digital Museum of Things We Almost Forgot.</p>
        <blockquote class="hero__question" style="--i:3">${escapeHtml(OPENING_QUESTION)}</blockquote>
        <div class="hero__actions" style="--i:4">
          <a class="btn btn--primary" href="#/archives">ENTER THE MUSEUM ${svg('arrowRight')}</a>
          <a class="btn btn--text" href="#/#about">DISCOVER OUR PURPOSE <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div class="hero__visual" aria-hidden="true">
        <div class="hero__plate"><span class="hero__mono">MoA</span><span class="hero__caption">ARCHIVE / 001</span></div>
      </div>
    </section>

    <section class="section" id="about">
      ${sectionLabel('WHY WE EXIST')}
      <h2 tabindex="-1">We keep what time lets go.</h2>
      <div class="values">
        <article><span class="values__no">01</span><h3>REMEMBER</h3><p>Mengakui bahwa hal kecil sering kali paling sulit ditinggalkan.</p></article>
        <article><span class="values__no">02</span><h3>RECORD</h3><p>Menulis ulang cerita sebelum detailnya hilang dari ingatan.</p></article>
        <article><span class="values__no">03</span><h3>RETURN</h3><p>Membuka kembali arsip agar generasi berikutnya bisa menemuinya.</p></article>
      </div>
    </section>

    <section class="section">
      <div class="section__head">
        <div>${sectionLabel('EXHIBITION')}<h2 tabindex="-1">Featured Archives</h2></div>
        <a class="text-link" href="#/archives">Lihat semua koleksi ${svg('arrowRight')}</a>
      </div>
      <div class="featured-grid">
        ${featured.map((item, index) => archiveCard(item, index)).join('') || emptyState('Belum ada arsip unggulan.', 'Tandai arsip sebagai unggulan dari dashboard demo.')}
      </div>
    </section>

    <section class="section">
      ${sectionLabel('DIGITAL COLLECTION')}
      <h2 tabindex="-1">Museum Statistics</h2>
      ${statsMarkup(stats, available)}
      ${available ? '' : '<p class="notice notice--warning">Statistik tidak dapat dibaca dari penyimpanan lokal.</p>'}
    </section>

    <section class="section closing">
      <p class="eyebrow">PRESERVE WHAT MATTERS</p>
      <blockquote>${escapeHtml(TAGLINE)}</blockquote>
      <a class="btn btn--primary" href="#/contribute">LEAVE SOMETHING BEHIND ${svg('arrowRight')}</a>
    </section>`;

  return { html };
}

function viewArchives(route) {
  const all = store.getArchives();
  const newId = route.query.get('new');
  const state = { q: '', category: '', sort: 'newest', featured: false };

  const gridMarkup = (list) =>
    list.length
      ? list.map((item, index) => archiveCard(item, index, { newId })).join('')
      : emptyState(
          'Tidak ada arsip yang cocok.',
          'Coba kata kunci lain, pilih kategori berbeda, atau hapus filter yang aktif.',
          '<button type="button" class="btn btn--primary" data-reset-filter>Hapus filter</button>',
        );

  const filtered = () => {
    const q = state.q.trim().toLocaleLowerCase('id');
    const list = all.filter((item) => {
      const matchesSearch =
        !q ||
        item.title.toLocaleLowerCase('id').includes(q) ||
        item.description.toLocaleLowerCase('id').includes(q);
      const matchesCategory = !state.category || item.category === state.category;
      const matchesFeatured = !state.featured || item.featured;
      return matchesSearch && matchesCategory && matchesFeatured;
    });
    const byTitle = (a, b) => a.title.localeCompare(b.title, 'id');
    if (state.sort === 'az') list.sort(byTitle);
    else if (state.sort === 'za') list.sort((a, b) => -byTitle(a, b));
    else if (state.sort === 'oldest') list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    else list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return list;
  };

  const hasActiveFilter = () =>
    Boolean(state.q || state.category || state.featured || state.sort !== 'newest');

  const html = `
    <section class="page-head">
      <div>
        ${sectionLabel('DIGITAL COLLECTION')}
        <h1 tabindex="-1">Things We Almost Forgot.</h1>
        <p>Explore memories, traditions, sounds and forgotten stories.</p>
      </div>
      <p class="page-head__count">${pad(all.length)} ARSIP DALAM KOLEKSI</p>
    </section>

    <section class="toolbar" aria-label="Filter arsip">
      <label class="search">
        <span class="sr-only">Cari arsip</span>
        ${svg('search')}
        <input type="search" id="archive-search" placeholder="Search archives..." autocomplete="off" />
      </label>
      <div class="toolbar__row">
        <label class="field field--inline">
          <span class="field__label">CATEGORY</span>
          <select id="archive-category">
            <option value="">Semua kategori</option>
            ${CATEGORIES.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}
          </select>
        </label>
        <label class="field field--inline">
          <span class="field__label">SORT</span>
          <select id="archive-sort">
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">Judul A–Z</option>
            <option value="za">Judul Z–A</option>
          </select>
        </label>
        <label class="checkbox">
          <input type="checkbox" id="archive-featured" />
          <span>Hanya arsip unggulan</span>
        </label>
      </div>
      <div class="toolbar__result">
        <span id="archive-count" role="status" aria-live="polite">Menampilkan ${all.length} dari ${all.length} arsip</span>
        <button type="button" class="text-link" data-reset-filter hidden>Hapus filter</button>
      </div>
    </section>

    <section class="archive-grid" id="archive-grid">${gridMarkup(filtered())}</section>`;

  const mount = (root) => {
    const grid = root.querySelector('#archive-grid');
    const count = root.querySelector('#archive-count');
    const reset = root.querySelector('[data-reset-filter]');
    const search = root.querySelector('#archive-search');
    const category = root.querySelector('#archive-category');
    const sort = root.querySelector('#archive-sort');
    const featured = root.querySelector('#archive-featured');

    const update = () => {
      const list = filtered();
      grid.innerHTML = gridMarkup(list);
      count.textContent = `Menampilkan ${list.length} dari ${all.length} arsip`;
      reset.hidden = !hasActiveFilter();
      if (newId) highlightNewCard(root, newId);
    };

    const clear = () => {
      state.q = '';
      state.category = '';
      state.sort = 'newest';
      state.featured = false;
      search.value = '';
      category.value = '';
      sort.value = 'newest';
      featured.checked = false;
      update();
    };

    search.addEventListener('input', (event) => {
      state.q = event.target.value;
      update();
    });
    search.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        search.value = '';
        state.q = '';
        update();
      }
    });
    category.addEventListener('change', (event) => {
      state.category = CATEGORIES.includes(event.target.value) ? event.target.value : '';
      update();
    });
    sort.addEventListener('change', (event) => {
      state.sort = ['newest', 'oldest', 'az', 'za'].includes(event.target.value)
        ? event.target.value
        : 'newest';
      update();
    });
    featured.addEventListener('change', (event) => {
      state.featured = event.target.checked;
      update();
    });
    root.addEventListener('click', (event) => {
      if (event.target.closest('[data-reset-filter]')) clear();
    });

    if (newId) window.setTimeout(() => highlightNewCard(root, newId), 60);
  };

  return { html, mount };
}

function highlightNewCard(root, id) {
  const card = root.querySelector(`[data-archive-id="${CSS.escape(id)}"]`);
  if (!card || card.dataset.highlighted) return;
  card.dataset.highlighted = 'true';
  card.classList.add('is-new');
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => card.classList.remove('is-new'), 5000);
}

function backLink() {
  return '<a class="text-link text-link--back" href="#/archives">' + svg('arrowLeft') + ' Kembali ke galeri</a>';
}

function viewArchiveDetail(route) {
  const item = store.getArchive(route.id);
  if (!item) {
    return {
      html: `<section class="page-head">${sectionLabel('THE MEMORY ROOM')}<h1 tabindex="-1">Arsip tidak ditemukan</h1></section>
        ${emptyState('Arsip tidak ditemukan.', 'Id arsip tidak valid atau data sudah dihapus dari perangkat ini.', backLink())}`,
    };
  }

  const all = store.getArchives();
  const number = pad(all.findIndex((entry) => entry.id === item.id) + 1);
  const paragraphs = (item.story || item.description)
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
  const related = all
    .filter((entry) => entry.id !== item.id && entry.category === item.category)
    .slice(0, 3);
  for (const entry of all) {
    if (related.length >= 3) break;
    if (entry.id !== item.id && entry.featured && !related.includes(entry)) related.push(entry);
  }

  const metadata = [
    ['ORIGIN', item.origin || 'Tidak diketahui'],
    ['PERIOD', item.period || 'Tidak diketahui'],
    ['TYPE', item.archiveType],
    ['STATUS', item.featured ? 'UNGGULAN' : 'ARSIP'],
  ];

  const html = `
    <article class="detail">
      <div class="detail__nav">${backLink()}<p class="breadcrumb">HOME / COLLECTIONS / ARCHIVE ${number}</p></div>
      <header class="detail__header">
        <p class="eyebrow">ARCHIVE NO. ${number} <span class="dot">·</span> ${escapeHtml(item.category)}</p>
        <h1 tabindex="-1">${escapeHtml(item.title)}</h1>
      </header>

      <div class="detail__layout">
        <figure class="detail__figure">
          ${mediaBlock(item, 'media--detail')}
          <figcaption>Fig. 01 — Dokumentasi arsip</figcaption>
        </figure>
        <aside class="metadata" aria-label="Metadata arsip">
          ${metadata
            .map(
              ([label, value]) =>
                `<div class="metadata__row"><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`,
            )
            .join('')}
        </aside>
      </div>

      <section class="detail__story">
        ${sectionLabel('STORY')}
        <div class="prose">
          ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        </div>
        ${
          item.historicalValue
            ? `<blockquote class="pullquote">${escapeHtml(item.historicalValue)}</blockquote>`
            : ''
        }
        ${
          item.audioUrl
            ? `<section class="audio">
                ${sectionLabel('AUDIO ARCHIVE')}
                <audio controls preload="none" aria-label="Rekaman audio ${escapeHtml(item.title)}">
                  <source src="${escapeHtml(item.audioUrl)}" />
                  Browser Anda tidak mendukung pemutar audio.
                </audio>
                <p class="audio__fallback" hidden>Audio tidak tersedia pada perangkat ini</p>
              </section>`
            : ''
        }
      </section>

      ${
        related.length
          ? `<section class="detail__related">
              ${sectionLabel('RELATED ARCHIVES')}
              <div class="related-grid">
                ${related
                  .map(
                    (entry) => `<a class="related-card" href="#/archive/${encodeURIComponent(entry.id)}">
                      ${mediaBlock(entry, 'media--related')}
                      <span class="meta">${escapeHtml(entry.category)}</span>
                      <strong>${escapeHtml(entry.title)}</strong>
                    </a>`,
                  )
                  .join('')}
              </div>
            </section>`
          : ''
      }
      <div class="detail__back">${backLink()}</div>
    </article>`;

  const mount = (root) => {
    const audio = root.querySelector('audio');
    audio?.addEventListener('error', () => {
      audio.hidden = true;
      const fallback = root.querySelector('.audio__fallback');
      if (fallback) fallback.hidden = false;
    });
  };

  return { html, mount };
}

const CONTRIBUTION_RULES = {
  title: (value) =>
    value.length >= 3 && value.length <= 100 ? '' : 'Judul harus 3–100 karakter.',
  category: (value) => (CATEGORIES.includes(value) ? '' : 'Pilih salah satu kategori.'),
  origin: (value) => (value.length <= 100 ? '' : 'Asal daerah maksimal 100 karakter.'),
  period: (value) => (value.length <= 40 ? '' : 'Periode maksimal 40 karakter.'),
  story: (value) =>
    value.length >= 20 && value.length <= 2000 ? '' : 'Cerita harus 20–2000 karakter.',
};

function viewContribute() {
  const html = `
    <section class="page-head">
      <div>
        ${sectionLabel('CONTRIBUTE TO THE ARCHIVE')}
        <h1 tabindex="-1">Leave Something Behind.</h1>
        <p>Simpan satu kenangan agar tidak ikut hilang. Cerita Anda menjadi bagian dari koleksi lokal di perangkat ini.</p>
      </div>
    </section>

    <div class="split">
      <form class="panel form" id="contribution-form" novalidate>
        <div class="form-errors" id="contribution-errors" role="alert" hidden></div>
        <div class="field">
          <label class="field__label" for="con-title">01 / Nama arsip atau kenangan <span class="required">*</span></label>
          <input id="con-title" name="title" type="text" minlength="3" maxlength="100" placeholder="Mis. Permainan di halaman belakang" aria-describedby="err-con-title" />
          <p class="field__error" id="err-con-title" role="alert"></p>
        </div>
        <div class="field">
          <label class="field__label" for="con-category">02 / Kategori <span class="required">*</span></label>
          <select id="con-category" name="category" aria-describedby="err-con-category">
            <option value="">Pilih kategori</option>
            ${CATEGORIES.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}
          </select>
          <p class="field__error" id="err-con-category" role="alert"></p>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field__label" for="con-origin">03 / Asal daerah</label>
            <input id="con-origin" name="origin" type="text" maxlength="100" placeholder="Mis. Bandung" aria-describedby="err-con-origin" />
            <p class="field__error" id="err-con-origin" role="alert"></p>
          </div>
          <div class="field">
            <label class="field__label" for="con-period">04 / Tahun atau periode</label>
            <input id="con-period" name="period" type="text" maxlength="40" placeholder="Mis. 1990-an" aria-describedby="err-con-period" />
            <p class="field__error" id="err-con-period" role="alert"></p>
          </div>
        </div>
        <div class="field">
          <label class="field__label" for="con-story">05 / Cerita / deskripsi <span class="required">*</span></label>
          <textarea id="con-story" name="story" rows="7" minlength="20" maxlength="2000" placeholder="Ceritakan apa yang Anda ingat..." aria-describedby="err-con-story"></textarea>
          <p class="field__error" id="err-con-story" role="alert"></p>
        </div>
        <div class="field">
          <label class="field__label" for="con-image">06 / Foto (opsional)</label>
          <div class="dropzone">
            <input id="con-image" name="image" type="file" accept="image/png,image/jpeg,image/webp,image/gif" aria-describedby="err-con-image" />
            <p>PNG / JPEG / WebP / GIF · maksimal 2 MB</p>
          </div>
          <p class="field__error" id="err-con-image" role="alert"></p>
        </div>
        <button class="btn btn--primary btn--block" type="submit">PRESERVE THIS MEMORY ${svg('arrowRight')}</button>
      </form>

      <aside class="curator">
        ${sectionLabel('CATATAN KURATOR')}
        <blockquote>"Every object holds a small universe."</blockquote>
        <div class="curator__envelope" aria-hidden="true"><span>MoA</span></div>
        <p class="curator__notice">
          Kontribusi Anda hanya tersimpan secara lokal pada perangkat dan browser yang Anda gunakan.
          Tidak dikirim ke server, tidak dapat dilihat pengguna lain, dan akan hilang jika data browser dibersihkan.
        </p>
      </aside>
    </div>`;

  const mount = (root) => {
    const form = root.querySelector('#contribution-form');
    const errorSummary = root.querySelector('#contribution-errors');
    let imageData = null;

    const fields = Object.keys(CONTRIBUTION_RULES).map((name) => ({
      name,
      input: form.elements.namedItem(name),
      error: root.querySelector(`#err-con-${name}`),
    }));

    const showError = (field, message) => {
      field.error.textContent = message;
      field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
    };

    const validateField = (field) => {
      const message = CONTRIBUTION_RULES[field.name](field.input.value.trim());
      showError(field, message);
      return !message;
    };

    fields.forEach((field) => {
      field.input.addEventListener('blur', () => validateField(field));
      field.input.addEventListener('input', () => {
        if (field.input.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    form.elements.namedItem('image').addEventListener('change', (event) => {
      const file = event.target.files?.[0];
      const imageError = root.querySelector('#err-con-image');
      imageData = null;
      imageError.textContent = '';
      if (!file) return;
      const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
      if (!allowed.includes(file.type)) {
        imageError.textContent = 'Format gambar tidak didukung. Gunakan PNG, JPEG, WebP, atau GIF.';
        event.target.value = '';
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        imageError.textContent = 'Ukuran gambar melebihi 2 MB. Pilih file yang lebih kecil.';
        event.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        imageData = typeof reader.result === 'string' ? reader.result : null;
      };
      reader.onerror = () => {
        imageError.textContent = 'Gambar gagal dibaca. Coba file lain.';
        event.target.value = '';
      };
      reader.readAsDataURL(file);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const invalid = fields.filter((field) => !validateField(field));
      if (invalid.length) {
        errorSummary.hidden = false;
        errorSummary.innerHTML = `<strong>Periksa kembali:</strong><ul>${invalid
          .map((field) => `<li>${escapeHtml(field.error.textContent)}</li>`)
          .join('')}</ul>`;
        invalid[0].input.focus();
        return;
      }
      errorSummary.hidden = true;
      errorSummary.innerHTML = '';

      try {
        const { archive } = store.saveContribution({
          title: form.elements.namedItem('title').value.trim(),
          category: form.elements.namedItem('category').value,
          origin: form.elements.namedItem('origin').value.trim(),
          period: form.elements.namedItem('period').value.trim(),
          story: form.elements.namedItem('story').value.trim(),
          imageUrl: imageData,
        });
        toast('Kenangan Anda tersimpan di perangkat ini.');
        window.location.hash = `#/archives?new=${encodeURIComponent(archive.id)}`;
      } catch (error) {
        toast(error.message || 'Gagal menyimpan. Penyimpanan lokal mungkin penuh.', 'error');
      }
    });
  };

  return { html, mount };
}

function viewTimeCapsule() {
  const currentYear = new Date().getFullYear();
  const html = `
    <section class="page-head">
      <div>
        ${sectionLabel('A MESSAGE TO THE FUTURE')}
        <h1 tabindex="-1">A Message to the Future.</h1>
        <p>Tulis sesuatu yang ingin dibaca generasi mendatang. Simulasi lokal, tanpa pengiriman nyata.</p>
      </div>
      <span class="badge badge--simulation">LOCAL SIMULATION</span>
    </section>

    <p class="notice">Simulasi lokal — pesan tidak dikirim ke masa depan dan hanya tersimpan di perangkat ini.</p>

    <div class="split split--capsule">
      <form class="panel envelope" id="capsule-form" novalidate>
        <p class="envelope__seal-label">SEALED BY</p>
        <div class="field">
          <label class="field__label sr-only" for="cap-author">Nama atau nama samaran</label>
          <input id="cap-author" name="author" type="text" minlength="2" maxlength="60" placeholder="Nama atau nama samaran" aria-describedby="err-cap-author" />
          <p class="field__error" id="err-cap-author" role="alert"></p>
        </div>
        <div class="field">
          <label class="field__label" for="cap-message">MESSAGE</label>
          <textarea id="cap-message" name="message" rows="6" minlength="10" maxlength="1000" placeholder="Tulis pesan untuk masa depan..." aria-describedby="err-cap-message"></textarea>
          <p class="field__error" id="err-cap-message" role="alert"></p>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field__label" for="cap-year">TARGET YEAR (OPSIONAL)</label>
            <input id="cap-year" name="targetYear" type="number" inputmode="numeric" placeholder="${currentYear + 20}" aria-describedby="err-cap-year" />
            <p class="field__error" id="err-cap-year" role="alert"></p>
          </div>
          <div class="field">
            <span class="field__label">WRITTEN IN ${currentYear}</span>
            <p class="readonly-value">${formatDate(new Date().toISOString())}</p>
          </div>
        </div>
        <button class="btn btn--primary btn--block" type="submit">SEAL THIS MESSAGE ${svg('star')}</button>
      </form>

      <section class="capsules" aria-label="Daftar kapsul">
        <h2 tabindex="-1">Sealed Letters</h2>
        <div id="capsule-list"></div>
      </section>
    </div>`;

  const mount = (root) => {
    const form = root.querySelector('#capsule-form');
    const list = root.querySelector('#capsule-list');

    const renderList = () => {
      const capsules = store.getCapsules();
      list.innerHTML = capsules.length
        ? capsules
            .map(
              (capsule, index) => `<article class="capsule-card">
                <div class="capsule-card__top"><span class="archive-no">CAPSULE ${pad(index + 1)}</span><span class="wax-seal" aria-hidden="true">MoA</span></div>
                <p class="capsule-card__message">${escapeHtml(capsule.message)}</p>
                <footer class="capsule-card__footer">
                  <span>— ${escapeHtml(capsule.author)} · ${escapeHtml(formatDate(capsule.createdAt))}</span>
                  ${capsule.targetYear ? `<span>Target: ${capsule.targetYear}</span>` : ''}
                  <button type="button" class="btn btn--danger btn--small" data-delete-capsule="${escapeHtml(capsule.id)}">Hapus</button>
                </footer>
              </article>`,
            )
            .join('')
        : emptyState('Belum ada pesan dalam kapsul. Tulis yang pertama.', 'Pesan yang disegel akan tampil di sini.', '');
    };

    const validate = () => {
      const author = form.elements.namedItem('author');
      const message = form.elements.namedItem('message');
      const year = form.elements.namedItem('targetYear');
      const errors = {
        author:
          author.value.trim().length >= 2 && author.value.trim().length <= 60
            ? ''
            : 'Nama harus 2–60 karakter.',
        message:
          message.value.trim().length >= 10 && message.value.trim().length <= 1000
            ? ''
            : 'Pesan harus 10–1000 karakter.',
        year: '',
      };
      if (year.value.trim()) {
        const value = Number(year.value);
        errors.year =
          Number.isInteger(value) && value >= currentYear && value <= currentYear + 100
            ? ''
            : `Tahun target harus antara ${currentYear} dan ${currentYear + 100}.`;
      }
      Object.entries(errors).forEach(([name, text]) => {
        const input = form.elements.namedItem(name === 'year' ? 'targetYear' : name);
        input.setAttribute('aria-invalid', text ? 'true' : 'false');
        root.querySelector(`#err-cap-${name}`).textContent = text;
      });
      return errors;
    };

    ['author', 'message', 'targetYear'].forEach((name) => {
      const input = form.elements.namedItem(name);
      input.addEventListener('blur', validate);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const errors = validate();
      const firstInvalid = Object.values(errors).find(Boolean);
      if (firstInvalid) {
        const key = Object.keys(errors).find((name) => errors[name]);
        form.elements.namedItem(key === 'year' ? 'targetYear' : key).focus();
        return;
      }
      try {
        store.saveCapsule({
          author: form.elements.namedItem('author').value.trim(),
          message: form.elements.namedItem('message').value.trim(),
          targetYear: form.elements.namedItem('targetYear').value.trim()
            ? Number(form.elements.namedItem('targetYear').value)
            : null,
        });
        form.reset();
        renderList();
        toast('Pesan tersimpan dalam kapsul.');
      } catch (error) {
        toast(error.message || 'Gagal menyimpan kapsul.', 'error');
      }
    });

    list.addEventListener('click', (event) => {
      const button = event.target.closest('[data-delete-capsule]');
      if (!button) return;
      if (!window.confirm('Hapus pesan ini dari kapsul?')) return;
      try {
        store.deleteCapsule(button.dataset.deleteCapsule);
        renderList();
        toast('Pesan dihapus dari kapsul.');
      } catch (error) {
        toast(error.message || 'Gagal menghapus pesan.', 'error');
      }
    });

    renderList();
  };

  return { html, mount };
}

function viewTimeline() {
  let active = 0;
  const period = () => TIMELINE_PERIODS[active];

  const html = `
    <section class="page-head">
      <div>
        ${sectionLabel('INTERACTIVE EXHIBITION')}
        <h1 tabindex="-1">Time Changes Everything.</h1>
        <p>Jelajahi empat periode untuk melihat bagaimana kebiasaan perlahan berganti.</p>
      </div>
      <span class="badge badge--simulation" title="Ilustratif, bukan data sejarah terverifikasi">SIMULATION — ilustratif</span>
    </section>

    <p class="notice">Simulasi ilustratif — tidak bersumber dari data sejarah terverifikasi.</p>

    <div class="timeline">
      <div class="timeline__track" role="group" aria-label="Pilih periode">
        ${TIMELINE_PERIODS.map(
          (item, index) => `<button type="button" class="timeline__dot${index === 0 ? ' is-active' : ''}" data-period="${index}" aria-pressed="${index === 0}">
            <span class="timeline__point" aria-hidden="true"></span><span>${item.year}</span>
          </button>`,
        ).join('')}
      </div>
      <label class="field field--inline timeline__slider">
        <span class="field__label">PERIODE</span>
        <input type="range" id="timeline-range" min="0" max="${TIMELINE_PERIODS.length - 1}" step="1" value="0" aria-label="Geser periode" />
      </label>

      <div class="timeline__panel" id="timeline-panel">
        <div class="timeline__media" aria-hidden="true"><span class="timeline__year" id="timeline-year"></span></div>
        <div class="timeline__content">
          <span class="timeline__bigyear" id="timeline-bigyear"></span>
          <h2 id="timeline-title" tabindex="-1"></h2>
          <p id="timeline-description"></p>
          <div class="timeline__nav">
            <button type="button" class="btn btn--outline" data-step="-1">${svg('arrowLeft')} Sebelumnya</button>
            <button type="button" class="btn btn--outline" data-step="1">Berikutnya ${svg('arrowRight')}</button>
          </div>
        </div>
      </div>
    </div>`;

  const mount = (root) => {
    const panel = root.querySelector('#timeline-panel');
    const dots = [...root.querySelectorAll('[data-period]')];
    const range = root.querySelector('#timeline-range');

    const update = (animate = true) => {
      const item = period();
      root.querySelector('#timeline-year').textContent = item.year;
      root.querySelector('#timeline-bigyear').textContent = item.year;
      root.querySelector('#timeline-title').textContent = item.title;
      root.querySelector('#timeline-description').textContent = item.description;
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === active);
        dot.setAttribute('aria-pressed', String(index === active));
      });
      range.value = String(active);
      if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        panel.classList.remove('is-changing');
        void panel.offsetWidth;
        panel.classList.add('is-changing');
      }
    };

    dots.forEach((dot) =>
      dot.addEventListener('click', () => {
        active = Number(dot.dataset.period);
        update();
      }),
    );
    range.addEventListener('input', (event) => {
      active = Number(event.target.value);
      update(false);
    });
    root.querySelectorAll('[data-step]').forEach((button) =>
      button.addEventListener('click', () => {
        active = Math.min(TIMELINE_PERIODS.length - 1, Math.max(0, active + Number(button.dataset.step)));
        update();
      }),
    );

    update(false);
  };

  return { html, mount };
}

function archiveRow(item, index) {
  const featured = item.featured
    ? `<span class="table-featured">${svg('star')} UNGGULAN</span>`
    : '<span class="meta">—</span>';
  return `<tr data-row-id="${escapeHtml(item.id)}">
    <td>${pad(index + 1)}</td>
    <td><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.source)}</small></td>
    <td>${escapeHtml(item.category)}</td>
    <td>${escapeHtml(item.period || 'Tidak diketahui')}</td>
    <td>${featured}</td>
    <td class="table-actions">
      <button type="button" class="btn btn--small" data-admin-action="feature" data-id="${escapeHtml(item.id)}" aria-pressed="${item.featured}">Unggulkan/Batalkan</button>
      <button type="button" class="btn btn--small" data-admin-action="edit" data-id="${escapeHtml(item.id)}">Edit</button>
      <button type="button" class="btn btn--small btn--danger" data-admin-action="delete" data-id="${escapeHtml(item.id)}">Hapus</button>
    </td>
  </tr>`;
}

function viewAdmin() {
  const stats = store.getStats();
  const archives = store.getArchives();
  const contributions = store.getContributions();

  const html = `
    <div class="admin">
      <aside class="admin__sidebar" aria-label="Menu dashboard">
        <p class="wordmark"><span class="wordmark__mono">MoA</span> MANAGEMENT</p>
        <nav class="admin__tabs">
          <a href="#admin-overview" data-admin-tab>Overview</a>
          <a href="#admin-archives" data-admin-tab>Archives</a>
          <a href="#admin-contributions" data-admin-tab>Contributions</a>
          <a href="#admin-reset" data-admin-tab>Settings / Reset</a>
        </nav>
        <span class="demo-badge demo-badge--large">MODE DEMO — tanpa login</span>
      </aside>

      <div class="admin__content">
        <p class="banner banner--demo">MODE DEMO PENGELOLA — tanpa login, data lokal perangkat ini</p>

        <section id="admin-overview" class="admin__section">
          ${sectionLabel('OVERVIEW')}
          <div class="stats stats--admin">
            <div class="stat"><span class="stat__number">${pad(stats.archives)}</span><span class="stat__label">TOTAL ARCHIVES</span></div>
            <div class="stat"><span class="stat__number">${pad(stats.categories)}</span><span class="stat__label">CATEGORIES</span></div>
            <div class="stat"><span class="stat__number">${pad(stats.contributions)}</span><span class="stat__label">CONTRIBUTIONS</span></div>
          </div>
        </section>

        <section id="admin-archives" class="admin__section">
          <div class="section__head">
            <div>${sectionLabel('COLLECTION')}<h2 tabindex="-1">Archive Management</h2></div>
            <button type="button" class="btn btn--primary" data-admin-action="add">${svg('plus')} ADD ARCHIVE</button>
          </div>
          <div class="table-wrap">
            <table class="admin-table">
              <thead><tr><th>NO</th><th>TITLE</th><th>CATEGORY</th><th>PERIOD</th><th>FEATURED</th><th>ACTIONS</th></tr></thead>
              <tbody id="admin-rows">${archives.map(archiveRow).join('')}</tbody>
            </table>
          </div>
          ${archives.length ? '' : '<p class="notice">Belum ada arsip.</p>'}
        </section>

        <section id="admin-contributions" class="admin__section">
          ${sectionLabel('READ ONLY')}
          <h2 tabindex="-1">Contribution List</h2>
          ${
            contributions.length
              ? `<div class="contrib-list">${contributions
                  .map(
                    (item) => `<article><strong>${escapeHtml(item.title)}</strong>
                      <p class="meta">${escapeHtml(item.category)} · ${escapeHtml(item.origin || 'Tanpa asal')} · ${escapeHtml(formatDate(item.createdAt))}</p>
                      <p>${escapeHtml(item.story.slice(0, 160))}${item.story.length > 160 ? '…' : ''}</p></article>`,
                  )
                  .join('')}</div>`
              : emptyState('Belum ada kontribusi pengunjung.', 'Kontribusi baru akan muncul di sini.', '')
          }
        </section>

        <section id="admin-reset" class="admin__section">
          ${sectionLabel('SETTINGS')}
          <h2 tabindex="-1">Reset data demo</h2>
          <p class="notice">Mengembalikan 8 arsip awal. Kontribusi dan kapsul akan hilang.</p>
          <button type="button" class="btn btn--danger" id="reset-demo">Reset data demo</button>
        </section>
      </div>
    </div>

    <div class="modal" id="archive-modal" hidden>
      <div class="modal__overlay" data-modal-close></div>
      <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__head"><h2 id="modal-title" tabindex="-1">Tambah Arsip</h2><button type="button" class="modal__close" data-modal-close aria-label="Tutup">${svg('close')}</button></div>
        <form class="form" id="archive-form" novalidate>
          <p class="form-errors" id="archive-errors" role="alert" hidden></p>
          <div class="field"><label class="field__label" for="arc-title">Judul <span class="required">*</span></label><input id="arc-title" name="title" type="text" maxlength="100" /><p class="field__error" id="err-arc-title" role="alert"></p></div>
          <div class="field"><label class="field__label" for="arc-category">Kategori <span class="required">*</span></label><select id="arc-category" name="category"><option value="">Pilih kategori</option>${CATEGORIES.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('')}</select><p class="field__error" id="err-arc-category" role="alert"></p></div>
          <div class="field-row">
            <div class="field"><label class="field__label" for="arc-origin">Asal</label><input id="arc-origin" name="origin" type="text" maxlength="100" /></div>
            <div class="field"><label class="field__label" for="arc-period">Periode</label><input id="arc-period" name="period" type="text" maxlength="40" /></div>
          </div>
          <div class="field"><label class="field__label" for="arc-type">Jenis arsip</label><input id="arc-type" name="archiveType" type="text" maxlength="80" /></div>
          <div class="field"><label class="field__label" for="arc-description">Deskripsi <span class="required">*</span></label><textarea id="arc-description" name="description" rows="3" maxlength="180"></textarea><p class="field__error" id="err-arc-description" role="alert"></p></div>
          <div class="field"><label class="field__label" for="arc-story">Cerita <span class="required">*</span></label><textarea id="arc-story" name="story" rows="5"></textarea><p class="field__error" id="err-arc-story" role="alert"></p></div>
          <div class="field"><label class="field__label" for="arc-value">Nilai sejarah / emosional</label><textarea id="arc-value" name="historicalValue" rows="2"></textarea></div>
          <label class="checkbox"><input type="checkbox" name="featured" id="arc-featured" /><span>Arsip unggulan</span></label>
          <div class="modal__actions"><button type="button" class="btn btn--outline" data-modal-close>Batal</button><button type="submit" class="btn btn--primary">Simpan arsip</button></div>
        </form>
      </div>
    </div>`;

  const mount = (root) => {
    const modal = root.querySelector('#archive-modal');
    const form = root.querySelector('#archive-form');
    const modalTitle = root.querySelector('#modal-title');
    const errors = root.querySelector('#archive-errors');
    let editingId = null;
    let lastTrigger = null;

    const refresh = () => window.dispatchEvent(new Event('hashchange'));

    const openModal = (item, trigger) => {
      editingId = item?.id ?? null;
      lastTrigger = trigger;
      modalTitle.textContent = item ? 'Edit Arsip' : 'Tambah Arsip';
      ['title', 'category', 'origin', 'period', 'archiveType', 'description', 'story', 'historicalValue'].forEach(
        (name) => {
          if (form.elements.namedItem(name)) form.elements.namedItem(name).value = item?.[name] ?? '';
        },
      );
      form.elements.namedItem('featured').checked = Boolean(item?.featured);
      errors.hidden = true;
      errors.innerHTML = '';
      modal.hidden = false;
      form.elements.namedItem('title').focus();
    };

    const closeModal = () => {
      modal.hidden = true;
      lastTrigger?.focus();
    };

    const validateForm = () => {
      const messages = {
        title: form.elements.namedItem('title').value.trim().length >= 3 ? '' : 'Judul minimal 3 karakter.',
        category: CATEGORIES.includes(form.elements.namedItem('category').value)
          ? ''
          : 'Pilih kategori yang valid.',
        description: form.elements.namedItem('description').value.trim().length >= 10 ? '' : 'Deskripsi minimal 10 karakter.',
        story: form.elements.namedItem('story').value.trim().length >= 20 ? '' : 'Cerita minimal 20 karakter.',
      };
      Object.entries(messages).forEach(([name, text]) => {
        const input = form.elements.namedItem(name);
        input.setAttribute('aria-invalid', text ? 'true' : 'false');
        root.querySelector(`#err-arc-${name}`).textContent = text;
      });
      return messages;
    };

    root.querySelectorAll('[data-modal-close]').forEach((button) =>
      button.addEventListener('click', closeModal),
    );

    modal.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusable = [...modal.querySelectorAll('button, input, select, textarea')].filter(
        (element) => !element.disabled,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    root.querySelector('#admin-rows').addEventListener('click', (event) => {
      const button = event.target.closest('[data-admin-action]');
      if (!button) return;
      const id = button.dataset.id;
      const item = store.getArchive(id);
      if (button.dataset.adminAction === 'edit') return openModal(item, button);
      if (button.dataset.adminAction === 'feature') {
        try {
          store.toggleFeatured(id);
          toast('Status unggulan diperbarui.');
          refresh();
        } catch (error) {
          toast(error.message, 'error');
        }
        return;
      }
      if (button.dataset.adminAction === 'delete') {
        if (!window.confirm(`Hapus arsip "${item?.title ?? ''}"?`)) return;
        try {
          store.deleteArchive(id);
          toast('Arsip dihapus.');
          refresh();
        } catch (error) {
          toast(error.message, 'error');
        }
      }
    });

    root.querySelector('[data-admin-action="add"]').addEventListener('click', (event) =>
      openModal(null, event.currentTarget),
    );

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const messages = validateForm();
      if (Object.values(messages).some(Boolean)) {
        errors.hidden = false;
        errors.innerHTML = `<strong>Periksa kembali:</strong><ul>${Object.values(messages)
          .filter(Boolean)
          .map((message) => `<li>${escapeHtml(message)}</li>`)
          .join('')}</ul>`;
        return;
      }
      const payload = {
        title: form.elements.namedItem('title').value.trim(),
        category: form.elements.namedItem('category').value,
        origin: form.elements.namedItem('origin').value.trim(),
        period: form.elements.namedItem('period').value.trim(),
        archiveType: form.elements.namedItem('archiveType').value.trim() || 'Arsip',
        description: form.elements.namedItem('description').value.trim(),
        story: form.elements.namedItem('story').value.trim(),
        historicalValue: form.elements.namedItem('historicalValue').value.trim(),
        featured: form.elements.namedItem('featured').checked,
      };
      try {
        if (editingId) store.updateArchive(editingId, payload);
        else store.addArchive(payload);
        closeModal();
        toast(editingId ? 'Arsip diperbarui.' : 'Arsip ditambahkan.');
        refresh();
      } catch (error) {
        toast(error.message || 'Gagal menyimpan arsip.', 'error');
      }
    });

    root.querySelector('#reset-demo').addEventListener('click', () => {
      const message =
        'Reset semua data demo? Seluruh arsip akan kembali ke 8 data awal. Kontribusi dan pesan kapsul Anda akan hilang.';
      if (!window.confirm(message)) return;
      try {
        store.resetDemo();
        toast('Data demo berhasil direset.');
        refresh();
      } catch (error) {
        toast(error.message || 'Gagal mereset data demo.', 'error');
      }
    });

    root.querySelectorAll('[data-admin-tab]').forEach((tab) =>
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        root.querySelector(tab.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }),
    );
  };

  return { html, mount };
}

function viewNotFound(route) {
  return {
    html: `<section class="page-head">${sectionLabel('404')}<h1 tabindex="-1">Halaman tidak ditemukan</h1></section>
      ${emptyState(
        route.error || 'Halaman tidak ditemukan.',
        'Rute yang Anda buka tidak tersedia dalam museum ini.',
        '<a class="btn btn--primary" href="#/">Kembali ke beranda</a>',
      )}`,
  };
}

const VIEWS = {
  entrance: viewEntrance,
  archives: viewArchives,
  archive: viewArchiveDetail,
  contribute: viewContribute,
  'time-capsule': viewTimeCapsule,
  timeline: viewTimeline,
  admin: viewAdmin,
  notfound: viewNotFound,
};

function wireImageFallbacks(root) {
  root.querySelectorAll('img[data-fallback-initial]').forEach((image) => {
    image.addEventListener('error', () => {
      image.hidden = true;
      const fallback = image.parentElement?.querySelector('.media__fallback');
      if (fallback) fallback.hidden = false;
    });
  });
}

export function renderApp(route) {
  const root = document.getElementById('app');
  if (!root) return;
  const view = (VIEWS[route.name] ?? viewNotFound)(route);
  root.innerHTML = view.html;
  wireImageFallbacks(root);
  view.mount?.(root);
}
