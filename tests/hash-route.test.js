import { describe, expect, it } from 'vitest';
import { parseHash } from '../src/hash-route.js';

describe('parseHash — router hash MUSEUM OF ALMOST', () => {
  it('memakai rute entrance untuk hash kosong', () => {
    expect(parseHash('')).toMatchObject({ name: 'entrance', path: '/' });
    expect(parseHash('#/')).toMatchObject({ name: 'entrance', path: '/' });
  });

  it('membaca ID arsip tanpa encoding', () => {
    expect(parseHash('#/archive/arc_congklak')).toMatchObject({
      name: 'archive',
      id: 'arc_congklak',
    });
  });

  it('mendekode ID arsip yang ter-encode', () => {
    expect(parseHash('#/archive/arc%20congklak').id).toBe('arc congklak');
  });

  it('tidak melempar error untuk escape percent yang rusak', () => {
    expect(() => parseHash('#/archive/%ZZ')).not.toThrow();
    expect(parseHash('#/archive/%ZZ')).toMatchObject({
      name: 'notfound',
      path: '/archive/%ZZ',
    });
  });

  it('jatuh ke notfound untuk escape UTF-8 yang terpotong', () => {
    expect(() => parseHash('#/archive/%E0%A4%A')).not.toThrow();
    expect(parseHash('#/archive/%E0%A4%A').name).toBe('notfound');
  });

  it('mempertahankan query dan anchor yang valid', () => {
    const withQuery = parseHash('#/archives?sort=oldest');
    expect(withQuery.name).toBe('archives');
    expect(withQuery.query.get('sort')).toBe('oldest');

    expect(parseHash('#/#about')).toMatchObject({ name: 'entrance', anchor: 'about' });
  });

  it('mengembalikan notfound untuk rute yang tidak dikenal', () => {
    expect(parseHash('#/tidak-ada').name).toBe('notfound');
  });
});
