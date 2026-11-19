/**
 * main.js — bootstrap dan hash router.
 *
 * Tugas: parse hash → render shell + view ke <main id="app"> → atur judul,
 * focus heading, dan posisi scroll. Semua data tetap dibaca lewat store.js.
 */

import './style.css';
import { consumeStorageNotice, seedIfEmpty } from './store.js';
import { renderApp, renderShell, toast } from './ui.js';

const TITLES = {
  entrance: 'Museum of Almost',
  archives: 'The Archives — Museum of Almost',
  archive: 'The Memory Room — Museum of Almost',
  contribute: 'Leave Something Behind — Museum of Almost',
  'time-capsule': 'The Time Capsule — Museum of Almost',
  timeline: 'The Last Time Machine — Museum of Almost',
  admin: 'Museum Management (Demo) — Museum of Almost',
  notfound: 'Halaman tidak ditemukan — Museum of Almost',
};

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathAndAnchor = '/', queryString = ''] = raw.split('?');

  let path = pathAndAnchor.startsWith('/') ? pathAndAnchor : `/${pathAndAnchor}`;
  let anchor = null;
  const anchorIndex = path.indexOf('#');
  if (anchorIndex !== -1) {
    anchor = path.slice(anchorIndex + 1) || null;
    path = path.slice(0, anchorIndex) || '/';
  }

  const query = new URLSearchParams(queryString);
  const base = { query, anchor, path };

  if (path === '/') return { ...base, name: 'entrance' };
  if (path === '/archives') return { ...base, name: 'archives' };
  if (path.startsWith('/archive/')) {
    return { ...base, name: 'archive', id: decodeURIComponent(path.slice('/archive/'.length)) };
  }
  if (path === '/contribute') return { ...base, name: 'contribute' };
  if (path === '/time-capsule') return { ...base, name: 'time-capsule' };
  if (path === '/timeline') return { ...base, name: 'timeline' };
  if (path === '/admin') return { ...base, name: 'admin' };
  return { ...base, name: 'notfound' };
}

function setFocusAndScroll(anchor) {
  const app = document.getElementById('app');
  if (anchor) {
    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const heading = target.querySelector('h1, h2');
      heading?.focus?.({ preventScroll: true });
      return;
    }
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
  app?.querySelector('h1')?.focus?.({ preventScroll: true });
}

function render() {
  const route = parseHash();
  try {
    renderShell(route);
    renderApp(route);
  } catch (error) {
    console.error(error);
    renderApp({ ...route, name: 'notfound', error: 'Terjadi kesalahan saat menampilkan halaman.' });
  }
  document.title = TITLES[route.name] ?? TITLES.notfound;
  setFocusAndScroll(route.anchor);
}

window.addEventListener('hashchange', render);

let storageNotice = null;
try {
  seedIfEmpty();
  storageNotice = consumeStorageNotice();
} catch {
  toast('Penyimpanan lokal tidak tersedia. Data tidak akan bertahan setelah refresh.', 'error');
}

render();

if (storageNotice) {
  toast(storageNotice, 'error');
}
