import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ARCHIVE_IMAGES, SEED_ARCHIVES } from '../src/products.js';
import { safeImageUrl } from '../src/store.js';

describe('ilustrasi arsip lokal', () => {
  it('menyediakan ilustrasi untuk setiap arsip bawaan', () => {
    for (const archive of SEED_ARCHIVES) {
      expect(ARCHIVE_IMAGES[archive.id]).toBe(`./image/${archive.id}.svg`);
    }
  });

  it('semua path ilustrasi diterima oleh validator media', () => {
    for (const path of Object.values(ARCHIVE_IMAGES)) {
      expect(safeImageUrl(path)).toBe(path);
    }
  });

  it('file SVG ilustrasi ada dan berupa SVG dengan viewBox konsisten', () => {
    for (const archive of SEED_ARCHIVES) {
      const file = new URL(`../public/image/${archive.id}.svg`, import.meta.url);
      expect(existsSync(file)).toBe(true);
      const svg = readFileSync(file, 'utf8');
      expect(svg).toMatch(/^<svg /);
      expect(svg).toContain('viewBox="0 0 800 600"');
    }
  });
});
