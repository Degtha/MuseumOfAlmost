/**
 * store.js — satu-satunya jalan masuk ke localStorage.
 *
 * Semua view membaca dan menulis melalui modul ini (single source of truth).
 * Data arsip divalidasi terlebih dahulu sebelum dipakai. Jika data rusak,
 * modul ini memulihkan sample archives dari products.js dan meninggalkan
 * notifikasi yang diambil main.js lewat consumeStorageNotice().
 */

import { ARCHIVE_TYPES, CATEGORIES, SEED_ARCHIVES } from './products.js';

export const KEYS = Object.freeze({
  archives: 'museum-of-almost:archives:v1',
  contributions: 'moa:contributions:v1',
  capsules: 'moa:capsules:v1',
  version: 'moa:version:v1',
});

/** Key lama hanya dipakai untuk migrasi sekali saat key baru belum ada. */
const LEGACY_ARCHIVES_KEY = 'moa:archives:v1';

export const SCHEMA_VERSION = '1';

const VALID_SOURCES = ['seed', 'contribution', 'admin'];

const memory = new Map();
let storageAvailable = true;
let storageNotice = null;

export function isStorageAvailable() {
  return storageAvailable;
}

export function consumeStorageNotice() {
  const notice = storageNotice;
  storageNotice = null;
  return notice;
}

function setStorageNotice(message) {
  storageNotice = message;
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

/**
 * Media-only URL validator.
 *
 * Sesuai SPEC.md: terima path relatif lokal atau data URL dengan MIME yang
 * diizinkan. Skema javascript:, http(s):, ftp:, dan protokol lain ditolak.
 */
const DATA_MEDIA_PATTERNS = Object.freeze({
  image: /^data:image\/(png|jpeg|webp|gif);base64,[a-z0-9+/]+={0,2}$/i,
  audio: /^data:audio\/(mpeg|mp3|wav|x-wav|ogg|webm);base64,[a-z0-9+/]+={0,2}$/i,
});

export function safeMediaUrl(value, kind = 'image') {
  if (typeof value !== 'string') return '';
  const url = value.trim();
  if (!url) return '';
  const dataPattern = DATA_MEDIA_PATTERNS[kind] ?? DATA_MEDIA_PATTERNS.image;
  if (dataPattern.test(url)) return url;
  if (/^(\.{0,2}\/|\/)[^"'<>\\]*$/i.test(url) && !/^\/\//.test(url)) return url;
  return '';
}

export function safeImageUrl(value) {
  return safeMediaUrl(value, 'image');
}

export function safeAudioUrl(value) {
  return safeMediaUrl(value, 'audio');
}

export function isValidMediaUrl(value, kind = 'image') {
  const url = typeof value === 'string' ? value.trim() : '';
  return Boolean(url) && safeMediaUrl(url, kind) === url;
}

function normalizeArchive(item) {
  return {
    id: String(item?.id ?? makeId()),
    title: String(item?.title ?? 'Arsip tanpa judul'),
    category: normalizeCategory(item?.category),
    description: String(item?.description ?? ''),
    origin: String(item?.origin ?? ''),
    period: typeof item?.period === 'string' ? item.period : '',
    imageUrl: safeImageUrl(item?.imageUrl),
    // null adalah representasi "kosong" untuk audioUrl sesuai model SPEC.md.
    audioUrl: safeAudioUrl(item?.audioUrl) || null,
    archiveType: ARCHIVE_TYPES.includes(item?.archiveType) ? item.archiveType : 'Arsip',
    historicalValue: String(item?.historicalValue ?? ''),
    featured: Boolean(item?.featured),
    createdAt:
      typeof item?.createdAt === 'string' && !Number.isNaN(Date.parse(item.createdAt))
        ? item.createdAt
        : new Date().toISOString(),
    updatedAt:
      typeof item?.updatedAt === 'string' && !Number.isNaN(Date.parse(item.updatedAt))
        ? item.updatedAt
        : null,
    story: String(item?.story ?? item?.description ?? ''),
    source: VALID_SOURCES.includes(item?.source) ? item.source : 'admin',
    contributionId: item?.contributionId ? String(item.contributionId) : null,
  };
}

/* ------------------------------------------------------------- validation */

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function isDateString(value) {
  return typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Date.parse(value));
}

function isValidAudioValue(value) {
  return (
    value === '' ||
    value === null ||
    (typeof value === 'string' && isValidMediaUrl(value, 'audio'))
  );
}

/**
 * Validasi satu arsip. Mengembalikan salinan yang sudah dinormalisasi hanya
 * jika semua field wajib ada dan bertipe benar.
 */
export function validateArchive(archive, index = 0, seenIds = new Set()) {
  const label = `Arsip #${index + 1}`;

  if (!isRecord(archive)) {
    return { ok: false, errors: [`${label} harus berupa objek.`], archive: null };
  }

  const errors = [];
  const requireField = (key, check, message) => {
    if (!hasOwn(archive, key) || !check(archive[key])) errors.push(`${label}: ${message}`);
  };

  requireField('id', (value) => typeof value === 'string' && value.trim().length > 0, 'id harus string tidak kosong.');
  if (typeof archive.id === 'string' && archive.id.trim() && seenIds.has(archive.id)) {
    errors.push(`${label}: ID duplikat (${archive.id}).`);
  }
  requireField('title', (value) => typeof value === 'string' && value.trim().length > 0, 'title harus string tidak kosong.');
  requireField('category', (value) => typeof value === 'string' && CATEGORIES.includes(value), 'category harus termasuk kategori yang valid.');
  requireField('description', (value) => typeof value === 'string', 'description harus string.');
  requireField('origin', (value) => typeof value === 'string', 'origin harus string.');
  requireField('period', (value) => typeof value === 'string', 'period harus string.');
  requireField(
    'imageUrl',
    (value) => typeof value === 'string' && (value === '' || isValidMediaUrl(value, 'image')),
    'imageUrl harus string kosong atau URL gambar yang valid.',
  );
  requireField('audioUrl', isValidAudioValue, 'audioUrl harus kosong atau URL audio yang valid.');
  requireField('archiveType', (value) => typeof value === 'string' && ARCHIVE_TYPES.includes(value), 'archiveType harus termasuk tipe arsip yang valid.');
  requireField('historicalValue', (value) => typeof value === 'string', 'historicalValue harus string.');
  requireField('featured', (value) => typeof value === 'boolean', 'featured harus boolean.');
  requireField('createdAt', isDateString, 'createdAt harus string tanggal yang valid.');

  if (hasOwn(archive, 'story') && archive.story !== null && typeof archive.story !== 'string') {
    errors.push(`${label}: story harus string.`);
  }
  if (hasOwn(archive, 'source') && !VALID_SOURCES.includes(archive.source)) {
    errors.push(`${label}: source tidak dikenal.`);
  }
  if (
    hasOwn(archive, 'contributionId') &&
    archive.contributionId !== null &&
    typeof archive.contributionId !== 'string'
  ) {
    errors.push(`${label}: contributionId harus string atau null.`);
  }
  if (
    hasOwn(archive, 'updatedAt') &&
    archive.updatedAt !== null &&
    !isDateString(archive.updatedAt)
  ) {
    errors.push(`${label}: updatedAt harus tanggal valid atau null.`);
  }

  if (errors.length) return { ok: false, errors, archive: null };
  return { ok: true, errors: [], archive: normalizeArchive(archive) };
}

/** Validasi seluruh koleksi, termasuk ID duplikat lintas elemen. */
export function validateArchives(value) {
  if (!Array.isArray(value)) {
    return { ok: false, errors: ['Data arsip harus berbentuk array.'], archives: [] };
  }

  const seenIds = new Set();
  const archives = [];
  const errors = [];

  value.forEach((item, index) => {
    const result = validateArchive(item, index, seenIds);
    if (result.ok) {
      seenIds.add(result.archive.id);
      archives.push(result.archive);
    } else {
      errors.push(...result.errors);
    }
  });

  return {
    ok: errors.length === 0,
    errors,
    archives: errors.length ? [] : archives,
  };
}

function parseArchives(raw) {
  if (raw === null || raw === undefined) {
    return { ok: true, missing: true, errors: [], archives: [] };
  }
  try {
    const parsed = JSON.parse(raw);
    return { ...validateArchives(parsed), missing: false };
  } catch {
    return {
      ok: false,
      missing: false,
      errors: ['JSON arsip tidak dapat di-parse.'],
      archives: [],
    };
  }
}

/* ---------------------------------------------------------- load / restore */

function seedArchives() {
  const seeds = SEED_ARCHIVES.map((item) => ({ ...item }));
  writeJson(KEYS.archives, seeds);
  if (rawGet(KEYS.version) === null) rawSet(KEYS.version, SCHEMA_VERSION);
  return seeds;
}

function recoverArchives() {
  const seeds = seedArchives();
  setStorageNotice(
    'Data arsip sebelumnya rusak atau tidak valid. Data contoh bawaan telah dipulihkan.',
  );
  return seeds;
}

export function seedIfEmpty() {
  const current = rawGet(KEYS.archives);

  if (current !== null) {
    const result = parseArchives(current);
    if (!result.ok) recoverArchives();
    else if (rawGet(KEYS.version) === null) rawSet(KEYS.version, SCHEMA_VERSION);
    return;
  }

  // Migrasi data lama agar CRUD yang sudah ada tetap kompatibel.
  const legacy = rawGet(LEGACY_ARCHIVES_KEY);
  if (legacy !== null) {
    const result = parseArchives(legacy);
    if (result.ok) {
      writeJson(KEYS.archives, result.archives);
      if (rawGet(KEYS.version) === null) rawSet(KEYS.version, SCHEMA_VERSION);
      return;
    }
    recoverArchives();
    return;
  }

  seedArchives();
}

export function getArchives() {
  if (rawGet(KEYS.archives) === null) seedIfEmpty();
  const result = parseArchives(rawGet(KEYS.archives));
  if (result.ok) return result.archives;
  return recoverArchives();
}

export function loadArchives() {
  return getArchives();
}

export function saveArchives(archives) {
  const result = validateArchives(archives);
  if (!result.ok) throw new Error(result.errors[0] ?? 'Struktur arsip tidak valid.');
  writeJson(KEYS.archives, result.archives);
  return result.archives;
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
    featured: archives.filter((item) => item.featured).length,
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

  const previousArchives = getArchives();
  const rawContributions = readJson(KEYS.contributions, []);
  const previousContributions = Array.isArray(rawContributions) ? rawContributions : [];

  saveArchives([...previousArchives, archive]);
  try {
    writeJson(KEYS.contributions, [...previousContributions, contribution]);
  } catch (error) {
    // Rollback agar tidak ada arsip bayangan tanpa catatan kontribusi.
    try {
      saveArchives(previousArchives);
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

/* -------------------------------------------------------------- archive CRUD */

export function addArchive(payload) {
  const now = new Date().toISOString();
  const archive = normalizeArchive({
    ...payload,
    id: makeId('arc'),
    createdAt: now,
    updatedAt: null,
    source: 'admin',
    contributionId: null,
  });
  saveArchives([...getArchives(), archive]);
  return archive;
}

export function updateArchive(id, payload) {
  const archives = getArchives();
  const index = archives.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const previous = archives[index];
  // ID,createdAt,dan asal data tidak boleh berubah saat diedit dari Dashboard.
  const updated = normalizeArchive({
    ...previous,
    ...payload,
    id,
    createdAt: previous.createdAt,
    updatedAt: new Date().toISOString(),
    source: previous.source,
    contributionId: previous.contributionId,
  });
  const next = [...archives];
  next[index] = updated;
  saveArchives(next);
  return updated;
}

/** Hapus arsip bayangan saja; record Contribution sengaja dipertahankan. */
export function deleteArchive(id) {
  saveArchives(getArchives().filter((item) => item.id !== id));
}

export function toggleFeatured(id) {
  const updated = getArchives().map((item) =>
    item.id === id ? { ...item, featured: !item.featured } : item,
  );
  saveArchives(updated);
  return updated.find((item) => item.id === id) ?? null;
}

/* ------------------------------------------------------- export / import */

/** JSON array dengan indentasi, siap dipakai ulang oleh importArchives(). */
export function exportArchives() {
  return JSON.stringify(getArchives(), null, 2);
}

/** Parsing + validasi tanpa menulis data. Dipakai UI sebelum konfirmasi. */
export async function parseArchivesFile(file) {
  let raw;
  if (typeof file === 'string') {
    raw = file;
  } else if (file && typeof file.text === 'function') {
    try {
      raw = await file.text();
    } catch {
      return { ok: false, errors: ['File tidak dapat dibaca.'], archives: [] };
    }
  } else {
    return { ok: false, errors: ['Pilih file JSON terlebih dahulu.'], archives: [] };
  }

  try {
    return { ...validateArchives(JSON.parse(raw)), raw };
  } catch {
    return { ok: false, errors: ['File bukan JSON yang valid.'], archives: [], raw };
  }
}

/** Terapkan hasil import. Validasi terjadi sebelum penulisan, jadi aman. */
export async function importArchives(file) {
  const parsed = await parseArchivesFile(file);
  if (!parsed.ok) throw new Error(parsed.errors[0] ?? 'File arsip tidak valid.');
  return saveArchives(parsed.archives);
}

/** Reset hanya arsip; Contribution dan Time Capsule tidak disentuh. */
export function resetDemoData() {
  return saveArchives(SEED_ARCHIVES.map((item) => ({ ...item })));
}

/** Alias untuk kompatibilitas dengan dashboard yang sudah ada. */
export const resetDemo = resetDemoData;
