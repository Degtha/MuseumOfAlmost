import { describe, expect, it } from 'vitest';
import { filterArchives } from '../src/archive-filter.js';
import { makeValidArchive } from './helpers.js';

const fixtures = Object.freeze([
  makeValidArchive({
    id: 'arc_congklak',
    title: 'Congklak di Teras Rumah',
    category: 'Cultural Heritage',
    description: 'Permainan tradisional memakai kerang.',
    createdAt: '2026-01-01T00:00:00.000Z',
    featured: true,
  }),
  makeValidArchive({
    id: 'arc_cendol',
    title: 'Suara Es Cendol',
    category: 'Forgotten Sounds',
    description: 'Lonceng kecil menandai sore di gang.',
    createdAt: '2026-01-02T00:00:00.000Z',
  }),
  makeValidArchive({
    id: 'arc_rendang',
    title: 'Bumbu Rendang Nenek',
    category: 'Traditional Food',
    description: 'Resep yang diukur dari segenggam tangan.',
    createdAt: '2026-01-03T00:00:00.000Z',
    featured: true,
  }),
]);

const ids = (list) => list.map((item) => item.id).sort();

describe('filterArchives — galeri The Archives', () => {
  it('menampilkan seluruh arsip dan mengurutkan terbaru ketika tidak ada filter', () => {
    const result = filterArchives(fixtures);

    expect(result).toHaveLength(3);
    expect(ids(result)).toEqual(ids(fixtures));
    expect(result[0].id).toBe('arc_rendang');
  });

  it('memfilter arsip berdasarkan kategori yang valid', () => {
    const result = filterArchives(fixtures, { category: 'Forgotten Sounds' });

    expect(ids(result)).toEqual(['arc_cendol']);
  });

  it('menghasilkan array kosong untuk kategori yang tidak memiliki arsip', () => {
    const result = filterArchives(fixtures, { category: 'Lost Places' });

    expect(result).toEqual([]);
  });

  it('mencari arsip berdasarkan kata kunci pada judul', () => {
    const result = filterArchives(fixtures, { q: 'congklak' });

    expect(ids(result)).toEqual(['arc_congklak']);
  });

  it('mencari arsip berdasarkan kata kunci pada deskripsi', () => {
    const result = filterArchives(fixtures, { q: 'lonceng' });

    expect(ids(result)).toEqual(['arc_cendol']);
  });

  it('menggabungkan pencarian kata kunci dengan filter kategori', () => {
    const cocok = filterArchives(fixtures, {
      q: 'rendang',
      category: 'Traditional Food',
    });
    const tidakCocok = filterArchives(fixtures, {
      q: 'rendang',
      category: 'Cultural Heritage',
    });

    expect(ids(cocok)).toEqual(['arc_rendang']);
    expect(tidakCocok).toEqual([]);
  });

  it('menangani array arsip kosong tanpa error', () => {
    expect(filterArchives([], { q: 'congklak' })).toEqual([]);
    expect(filterArchives(undefined)).toEqual([]);
  });

  it('mengabaikan pencarian kosong atau hanya berisi spasi', () => {
    expect(ids(filterArchives(fixtures, { q: '' }))).toEqual(ids(fixtures));
    expect(ids(filterArchives(fixtures, { q: '   ' }))).toEqual(ids(fixtures));
  });

  it('tidak mengubah array arsip asli saat memfilter dan mengurutkan', () => {
    const snapshot = fixtures.map((item) => ({ ...item }));

    const result = filterArchives(fixtures, { sort: 'az', category: '' });

    expect(fixtures).toEqual(snapshot);
    expect(result).not.toBe(fixtures);
    expect(result.map((item) => item.title)).toEqual([
      'Bumbu Rendang Nenek',
      'Congklak di Teras Rumah',
      'Suara Es Cendol',
    ]);
  });

  it('hanya mengembalikan arsip unggulan ketika filter featured aktif', () => {
    const result = filterArchives(fixtures, { featured: true });

    expect(ids(result)).toEqual(['arc_congklak', 'arc_rendang']);
  });

  it('mendukung urutan terlama dan Z–A', () => {
    expect(filterArchives(fixtures, { sort: 'oldest' }).map((item) => item.id)).toEqual([
      'arc_congklak',
      'arc_cendol',
      'arc_rendang',
    ]);
    expect(filterArchives(fixtures, { sort: 'za' }).map((item) => item.title)).toEqual([
      'Suara Es Cendol',
      'Congklak di Teras Rumah',
      'Bumbu Rendang Nenek',
    ]);
  });

  it('memakai urutan terbaru untuk nilai sort yang tidak dikenal', () => {
    const result = filterArchives(fixtures, { sort: 'tidak-dikenal' });

    expect(result[0].id).toBe('arc_rendang');
  });
});
