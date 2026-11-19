import { describe, expect, it } from 'vitest';
import { validateArchive, validateArchives } from '../src/store.js';
import { makeValidArchive } from './helpers.js';

function expectDitolak(result, pesan) {
  expect(result.ok).toBe(false);
  expect(result.archive).toBeNull();
  expect(result.errors.join(' ')).toContain(pesan);
}

describe('validateArchive — validasi data arsip', () => {
  it('menerima arsip yang seluruh field wajibnya valid', () => {
    const result = validateArchive(makeValidArchive());

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.archive).toMatchObject({
      id: 'arc_valid_1',
      title: 'Congklak di Teras Rumah',
      category: 'Cultural Heritage',
      featured: false,
      source: 'seed',
      contributionId: null,
    });
  });

  it('menolak judul kosong', () => {
    expectDitolak(validateArchive(makeValidArchive({ title: '   ' })), 'title harus string tidak kosong');
  });

  it('menolak kategori yang tidak terdaftar', () => {
    expectDitolak(
      validateArchive(makeValidArchive({ category: 'Kategori Fiktif' })),
      'category harus termasuk kategori yang valid',
    );
  });

  it('menolak deskripsi dengan tipe data salah', () => {
    expectDitolak(validateArchive(makeValidArchive({ description: 123 })), 'description harus string');
  });

  it('menolak field featured yang bukan boolean', () => {
    expectDitolak(
      validateArchive(makeValidArchive({ featured: 'true' })),
      'featured harus boolean',
    );
  });

  it('menolak URL gambar yang tidak diizinkan', () => {
    for (const imageUrl of ['javascript:alert(1)', 'https://example.com/a.png', 'ftp://example.com/a.png']) {
      expectDitolak(
        validateArchive(makeValidArchive({ imageUrl })),
        'imageUrl harus string kosong atau URL gambar yang valid',
      );
    }
  });

  it('menerima path lokal dan data URL gambar yang diizinkan', () => {
    for (const imageUrl of ['/images/congklak.png', './assets/wayang.webp', 'data:image/png;base64,aGVsbG8=']) {
      expect(validateArchive(makeValidArchive({ imageUrl })).ok).toBe(true);
    }
  });

  it('menolak arsip dengan field wajib yang hilang', () => {
    const incomplete = makeValidArchive();
    delete incomplete.period;

    expectDitolak(validateArchive(incomplete), 'period harus string atau null');
  });

  it('menolak ID kosong', () => {
    expectDitolak(validateArchive(makeValidArchive({ id: '' })), 'id harus string tidak kosong');
  });

  it('menerima nilai batas yang diizinkan oleh aturan validasi aktual', () => {
    const result = validateArchive(
      makeValidArchive({
        origin: '',
        period: '',
        imageUrl: '',
        audioUrl: '',
        historicalValue: '',
        story: '',
        updatedAt: null,
        contributionId: null,
        featured: false,
      }),
    );

    expect(result.ok).toBe(true);
    expect(result.archive.audioUrl).toBeNull();
  });

  it('menerima period null sesuai SPEC.md Bab 6.2', () => {
    const result = validateArchive(makeValidArchive({ period: null }));

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.archive.period).toBe('');
  });

  it('menolak source yang tidak dikenal', () => {
    expectDitolak(validateArchive(makeValidArchive({ source: 'unknown' })), 'source tidak dikenal');
  });
});

describe('validateArchives — validasi koleksi arsip', () => {
  it('menerima koleksi arsip yang seluruhnya valid', () => {
    const result = validateArchives([makeValidArchive(), makeValidArchive({ id: 'arc_kedua' })]);

    expect(result.ok).toBe(true);
    expect(result.archives).toHaveLength(2);
    expect(result.errors).toEqual([]);
  });

  it('menolak ID duplikat dalam satu koleksi', () => {
    const result = validateArchives([
      makeValidArchive({ id: 'arc_sama' }),
      makeValidArchive({ id: 'arc_sama', title: 'Arsip kedua' }),
    ]);

    expect(result.ok).toBe(false);
    expect(result.archives).toEqual([]);
    expect(result.errors.join(' ')).toContain('ID duplikat (arc_sama)');
  });

  it('menolak payload yang bukan array', () => {
    const result = validateArchives({ id: 'arc_tunggal' });

    expect(result.ok).toBe(false);
    expect(result.errors).toEqual(['Data arsip harus berbentuk array.']);
  });
});
