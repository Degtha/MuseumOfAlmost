import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SEED_ARCHIVES } from '../src/products.js';
import { createStorageMock, makeValidArchive } from './helpers.js';

const ARCHIVES_KEY = 'museum-of-almost:archives:v1';
const VERSION_KEY = 'moa:version:v1';
const RECOVERY_NOTICE =
  'Data arsip sebelumnya rusak atau tidak valid. Data contoh bawaan telah dipulihkan.';

let storage;
let store;

beforeEach(async () => {
  storage = createStorageMock();
  vi.stubGlobal('localStorage', storage);
  vi.resetModules();
  store = await import('../src/store.js');
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('parser dan validasi localStorage MUSEUM OF ALMOST', () => {
  it('membaca JSON arsip yang valid dari museum-of-almost:archives:v1', () => {
    const archive = makeValidArchive();
    storage.seed(ARCHIVES_KEY, JSON.stringify([archive]));

    const result = store.loadArchives();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: archive.id,
      title: archive.title,
      category: archive.category,
    });
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it('mengisi data contoh ketika key arsip belum memiliki data', () => {
    const result = store.loadArchives();

    expect(result).toHaveLength(SEED_ARCHIVES.length);
    expect(result.map((item) => item.title)).toEqual(SEED_ARCHIVES.map((item) => item.title));
    expect(storage.setItem).toHaveBeenCalledWith(ARCHIVES_KEY, expect.any(String));
    expect(storage.setItem).toHaveBeenCalledWith(VERSION_KEY, '1');
  });

  it('memulihkan data contoh ketika JSON rusak atau tidak valid', () => {
    storage.seed(ARCHIVES_KEY, '{bukan-json');

    const result = store.loadArchives();

    expect(result).toHaveLength(SEED_ARCHIVES.length);
    expect(store.consumeStorageNotice()).toBe(RECOVERY_NOTICE);
  });

  it('memulihkan data contoh ketika payload bukan array', () => {
    storage.seed(ARCHIVES_KEY, JSON.stringify({ archives: [] }));

    expect(store.loadArchives()).toHaveLength(SEED_ARCHIVES.length);
    expect(store.consumeStorageNotice()).toBe(RECOVERY_NOTICE);
  });

  it('memulihkan data contoh ketika field wajib hilang', () => {
    const invalid = makeValidArchive();
    delete invalid.title;
    storage.seed(ARCHIVES_KEY, JSON.stringify([invalid]));

    expect(store.loadArchives()).toHaveLength(SEED_ARCHIVES.length);
  });

  it('memulihkan data contoh ketika tipe data field tidak sesuai', () => {
    storage.seed(ARCHIVES_KEY, JSON.stringify([makeValidArchive({ featured: 'ya' })]));

    expect(store.loadArchives()).toHaveLength(SEED_ARCHIVES.length);
  });

  it('memulihkan data contoh ketika terdapat ID duplikat', () => {
    storage.seed(
      ARCHIVES_KEY,
      JSON.stringify([
        makeValidArchive({ id: 'arc_duplikat' }),
        makeValidArchive({ id: 'arc_duplikat', title: 'Arsip kedua' }),
      ]),
    );

    expect(store.loadArchives()).toHaveLength(SEED_ARCHIVES.length);
    expect(store.consumeStorageNotice()).toBe(RECOVERY_NOTICE);
  });

  it('menimpa data rusak dengan data contoh bawaan', () => {
    storage.seed(ARCHIVES_KEY, 'not-json');

    store.loadArchives();

    expect(JSON.parse(storage.raw(ARCHIVES_KEY))).toEqual(
      SEED_ARCHIVES.map((item) => ({ ...item })),
    );
  });

  it('tidak menganggap arsip dengan period null sebagai data rusak', () => {
    const archive = makeValidArchive({ id: 'arc_period_null', period: null });
    const payload = JSON.stringify([archive]);
    storage.seed(ARCHIVES_KEY, payload);

    const result = store.loadArchives();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('arc_period_null');
    expect(result[0].period).toBe('');
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it('tidak menimpa data valid dengan data contoh', () => {
    const archive = makeValidArchive({ id: 'arc_pengguna' });
    const payload = JSON.stringify([archive]);
    storage.seed(ARCHIVES_KEY, payload);

    expect(store.loadArchives()[0].id).toBe('arc_pengguna');
    expect(store.loadArchives()).toHaveLength(1);
    expect(storage.setItem).not.toHaveBeenCalled();
    expect(storage.raw(ARCHIVES_KEY)).toBe(payload);
  });

  it('dapat membaca kembali data yang baru disimpan', () => {
    const archive = makeValidArchive({ id: 'arc_tersimpan', title: 'Arsip Tersimpan' });

    const saved = store.saveArchives([archive]);
    const loaded = store.loadArchives();

    expect(saved[0].id).toBe('arc_tersimpan');
    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toMatchObject({ id: 'arc_tersimpan', title: 'Arsip Tersimpan' });
    expect(storage.setItem).toHaveBeenCalledWith(ARCHIVES_KEY, expect.any(String));
    expect(store.exportArchives()).toContain('arc_tersimpan');
  });
});
