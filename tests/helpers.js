import { vi } from 'vitest';

/** Arsip valid mengikuti field model Archive di SPEC.md Bab 6.2. */
export function makeValidArchive(overrides = {}) {
  return {
    id: 'arc_valid_1',
    title: 'Congklak di Teras Rumah',
    category: 'Cultural Heritage',
    description: 'Dua baris lubang di papan kayu, segenggam kerang.',
    origin: 'Jawa',
    period: '1990-an',
    imageUrl: '',
    audioUrl: null,
    archiveType: 'Permainan Tradisional',
    historicalValue: 'Cara sebuah keluarga mengajarkan sabar.',
    featured: false,
    createdAt: '2026-01-08T07:15:00.000Z',
    story: 'Papan congklak itu selalu diletakkan di teras.',
    source: 'seed',
    contributionId: null,
    ...overrides,
  };
}

/**
 * Mock localStorage yang menyimpan data di Map. `seed()` mengisi data awal
 * tanpa tercatat sebagai pemanggilan setItem, supaya test dapat memeriksa
 * apakah aplikasi benar-benar menulis data.
 */
export function createStorageMock(initialEntries = {}) {
  const entries = new Map(Object.entries(initialEntries));

  return {
    getItem: vi.fn((key) => (entries.has(key) ? entries.get(key) : null)),
    setItem: vi.fn((key, value) => {
      entries.set(key, String(value));
    }),
    removeItem: vi.fn((key) => {
      entries.delete(key);
    }),
    clear: vi.fn(() => entries.clear()),
    key: vi.fn((index) => [...entries.keys()][index] ?? null),
    get length() {
      return entries.size;
    },
    seed(key, value) {
      entries.set(key, String(value));
    },
    raw(key) {
      return entries.has(key) ? entries.get(key) : null;
    },
  };
}
