/**
 * store.js — satu-satunya jalan masuk ke localStorage.
 *
 * Semua view membaca dan menulis melalui modul ini (single source of truth).
 * Penulisan dibungkus try/catch; kegagalan dilempar sebagai Error agar ui.js
 * bisa menampilkan toast dan form tidak berubah.
 */

import { CATEGORIES, SEED_ARCHIVES } from './products.js';

export const KEYS = Object.freeze({
  archives: 'moa:archives:v1',
  contributions: 'moa:contributions:v1',
  capsules: 'moa:capsules:v1',
  version: 'moa:version:v1',
});

export const SCHEMA_VERSION = '1';

const memory = new Map();
let storageAvailable = true;

export function isStorageAvailable() {
  return storageAvailable;
}

function rawGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    storageAvailable = false;
    return memory.has(key) ? memory.get(key) : null;
  }
}

function rawSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return;
  } catch (error) {
    storageAvailable = false;
    throw new Error('Penyimpanan lokal penuh atau tidak tersedia.');
  }
}

function rawRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    storageAvailable = false;
    memory.delete(key);
  }
}

function readJson(key, fallback) {
  const raw = rawGet(key);
  if (raw === null || raw === undefined) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  rawSet(key, JSON.stringify(value));
}

export function makeId(prefix = 'arc') {
  const random =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}_${random}`;
}

export function normalizeCategory(value) {
  return CATEGORIES.includes(value) ? value : CATEGORIES[0];
}

/** Terima hanya path relatif lokal atau data URL gambar yang diizinkan. */
export function safeImageUrl(value) {
  if (typeof value !== 'string') return '';
  const url = value.trim();
  if (/^data:image\/(png|jpeg|webp|gif);base64,[a-z0-9+/=]+$/i.test(url)) return url;
  if (/^(\.{0,2}\/|\/)[^"'<>\\]*$/i.test(url) && !/^\/\//.test(url)) return url;
  return '';
}

function normalizeArchive(item) {
  return {
    id: String(item?.id ?? makeId()),
    title: String(item?.title ?? 'Arsip tanpa judul'),
    category: normalizeCategory(item?.category),
    description: String(item?.description ?? ''),
    origin: String(item?.origin ?? ''),
    period: item?.period ? String(item.period) : null,
    imageUrl: safeImageUrl(item?.imageUrl),
    audioUrl: safeImageUrl(item?.audioUrl) || null,
    archiveType: String(item?.archiveType ?? 'Arsip'),
    historicalValue: String(item?.historicalValue ?? ''),
    featured: Boolean(item?.featured),
    createdAt:
      typeof item?.createdAt === 'string' && !Number.isNaN(Date.parse(item.createdAt))
        ? item.createdAt
        : new Date().toISOString(),
    story: String(item?.story ?? item?.description ?? ''),
    source: ['seed', 'contribution', 'admin'].includes(item?.source) ? item.source : 'admin',
    contributionId: item?.contributionId ? String(item.contributionId) : null,
  };
}

/** Seed hanya jika key arsip benar-benar belum ada (null). */
export function seedIfEmpty() {
  if (rawGet(KEYS.archives) === null) {
    writeJson(KEYS.archives, SEED_ARCHIVES.map((item) => ({ ...item })));
  }
  if (rawGet(KEYS.version) === null) {
    rawSet(KEYS.version, SCHEMA_VERSION);
  }
}

export function getArchives() {
  const list = readJson(KEYS.archives, []);
  return Array.isArray(list) ? list.map(normalizeArchive) : [];
}

export function getArchive(id) {
  return getArchives().find((item) => item.id === id) ?? null;
}

export function getContributions() {
  const list = readJson(KEYS.contributions, []);
  if (!Array.isArray(list)) return [];
  return list.map((item) => ({
    id: String(item?.id ?? makeId('con')),
    title: String(item?.title ?? ''),
    category: normalizeCategory(item?.category),
    origin: String(item?.origin ?? ''),
    story: String(item?.story ?? ''),
    period: item?.period ? String(item.period) : null,
    imageUrl: safeImageUrl(item?.imageUrl) || null,
    createdAt: String(item?.createdAt ?? new Date().toISOString()),
  }));
}

export function getCapsules() {
  const list = readJson(KEYS.capsules, []);
  if (!Array.isArray(list)) return [];
  return list.map((item) => ({
    id: String(item?.id ?? makeId('cap')),
    author: String(item?.author ?? ''),
    message: String(item?.message ?? ''),
    createdAt: String(item?.createdAt ?? new Date().toISOString()),
    targetYear:
      Number.isInteger(item?.targetYear) && item.targetYear > 0 ? item.targetYear : null,
  }));
}

export function getStats() {
  const archives = getArchives();
  return {
    archives: archives.length,
    categories: new Set(archives.map((item) => item.category)).size,
    contributions: getContributions().length,
    capsules: getCapsules().length,
  };
}

export function saveContribution(payload) {
  const createdAt = new Date().toISOString();
  const contribution = {
    id: makeId('con'),
    title: payload.title,
    category: normalizeCategory(payload.category),
    origin: payload.origin ?? '',
    story: payload.story,
    period: payload.period || null,
    imageUrl: safeImageUrl(payload.imageUrl) || null,
    createdAt,
  };

  const archive = normalizeArchive({
    id: makeId('arc'),
    title: contribution.title,
    category: contribution.category,
    description: contribution.story.slice(0, 180),
    origin: contribution.origin,
    period: contribution.period,
    imageUrl: contribution.imageUrl ?? '',
    audioUrl: null,
    archiveType: 'Kontribusi Pengunjung',
    historicalValue: '',
    featured: false,
    createdAt,
    story: contribution.story,
    source: 'contribution',
    contributionId: contribution.id,
  });

  const previousArchives = readJson(KEYS.archives, []);
  const previousContributions = readJson(KEYS.contributions, []);

  writeJson(KEYS.archives, [...previousArchives, archive]);
  try {
    writeJson(KEYS.contributions, [...previousContributions, contribution]);
  } catch (error) {
    // Rollback agar tidak ada arsip bayangan tanpa catatan kontribusi.
    try {
      writeJson(KEYS.archives, previousArchives);
    } catch {
      /* rollback gagal: use already informed by toast */
    }
    throw error;
  }
  return { contribution, archive };
}

export function saveCapsule(payload) {
  const capsule = {
    id: makeId('cap'),
    author: payload.author,
    message: payload.message,
    createdAt: new Date().toISOString(),
    targetYear: payload.targetYear ?? null,
  };
  writeJson(KEYS.capsules, [capsule, ...getCapsules()]);
  return capsule;
}

export function deleteCapsule(id) {
  writeJson(
    KEYS.capsules,
    getCapsules().filter((item) => item.id !== id),
  );
}

export function addArchive(payload) {
  const archive = normalizeArchive({ ...payload, id: makeId('arc'), createdAt: new Date().toISOString(), source: 'admin' });
  writeJson(KEYS.archives, [...getArchives(), archive]);
  return archive;
}

export function updateArchive(id, payload) {
  const archives = getArchives();
  const index = archives.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const updated = normalizeArchive({ ...archives[index], ...payload, id, createdAt: archives[index].createdAt });
  const next = [...archives];
  next[index] = updated;
  writeJson(KEYS.archives, next);
  return updated;
}

/** Hapus arsip bayangan saja; record Contribution sengaja dipertahankan. */
export function deleteArchive(id) {
  writeJson(
    KEYS.archives,
    getArchives().filter((item) => item.id !== id),
  );
}

export function toggleFeatured(id) {
  const updated = getArchives().map((item) =>
    item.id === id ? { ...item, featured: !item.featured } : item,
  );
  writeJson(KEYS.archives, updated);
  return updated.find((item) => item.id === id) ?? null;
}

export function resetDemo() {
  rawRemove(KEYS.archives);
  rawRemove(KEYS.contributions);
  rawRemove(KEYS.capsules);
  writeJson(KEYS.archives, SEED_ARCHIVES.map((item) => ({ ...item })));
  writeJson(KEYS.contributions, []);
  writeJson(KEYS.capsules, []);
  rawSet(KEYS.version, SCHEMA_VERSION);
}
