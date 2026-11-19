import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

describe('Content-Security-Policy — konfigurasi publik', () => {
  it('mendefinisikan CSP pada index.html', () => {
    expect(html).toMatch(/http-equiv="Content-Security-Policy"/i);
  });

  it('membatasi script, objek, base URI, dan form action', () => {
    expect(html).toMatch(/default-src 'self'/);
    expect(html).toMatch(/script-src 'self'/);
    expect(html).toMatch(/object-src 'none'/);
    expect(html).toMatch(/base-uri 'none'/);
    expect(html).toMatch(/form-action 'self'/);
  });
});
