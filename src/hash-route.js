/**
 * hash-route.js — parser hash murni untuk router MUSEUM OF ALMOST.
 *
 * Menerima string hash mentah agar dapat diuji tanpa DOM. Hash dengan encoding
 * rusak tidak boleh melempar error; rute tersebut jatuh ke halaman notfound.
 */

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

export function parseHash(rawHash = '') {
  const raw = String(rawHash ?? '').replace(/^#/, '') || '/';
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
    const id = safeDecode(path.slice('/archive/'.length));
    if (id === null) return { ...base, name: 'notfound' };
    return { ...base, name: 'archive', id };
  }
  if (path === '/contribute') return { ...base, name: 'contribute' };
  if (path === '/time-capsule') return { ...base, name: 'time-capsule' };
  if (path === '/timeline') return { ...base, name: 'timeline' };
  if (path === '/admin') return { ...base, name: 'admin' };
  return { ...base, name: 'notfound' };
}
