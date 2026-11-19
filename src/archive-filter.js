/**
 * archive-filter.js — logika murni filter, pencarian, dan sorting galeri.
 *
 * Dipakai oleh halaman The Archives (`ui.js`) dan dapat diuji tanpa DOM.
 * Fungsi ini tidak pernah mengubah array yang diterima; hasil selection
 * dibuat dengan `filter()` lalu di-sort secara lokal.
 */

const SORT_OPTIONS = Object.freeze(['newest', 'oldest', 'az', 'za']);

function text(value) {
  return String(value ?? '');
}

/**
 * @param {Array} archives daftar arsip yang akan disaring.
 * @param {object} options { q, category, sort, featured }
 * @returns {Array} salinan arsip yang lolos filter, sudah diurutkan.
 */
export function filterArchives(archives, options = {}) {
  const source = Array.isArray(archives) ? archives : [];
  const settings = options && typeof options === 'object' ? options : {};

  const keyword = text(settings.q).trim().toLocaleLowerCase('id');
  const category = text(settings.category);
  const sort = SORT_OPTIONS.includes(settings.sort) ? settings.sort : 'newest';
  const featuredOnly = Boolean(settings.featured);

  const result = source.filter((item) => {
    const matchesSearch =
      !keyword ||
      text(item?.title).toLocaleLowerCase('id').includes(keyword) ||
      text(item?.description).toLocaleLowerCase('id').includes(keyword);
    const matchesCategory = !category || item?.category === category;
    const matchesFeatured = !featuredOnly || Boolean(item?.featured);

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const byTitle = (a, b) => text(a?.title).localeCompare(text(b?.title), 'id');

  if (sort === 'az') result.sort(byTitle);
  else if (sort === 'za') result.sort((a, b) => -byTitle(a, b));
  else if (sort === 'oldest') {
    result.sort((a, b) => text(a?.createdAt).localeCompare(text(b?.createdAt)));
  } else {
    result.sort((a, b) => text(b?.createdAt).localeCompare(text(a?.createdAt)));
  }

  return result;
}
