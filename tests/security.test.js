import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, escapeHtml } from '../src/ui.js';
import { safeMediaUrl } from '../src/store.js';

const NOMOR_VALID = '6285168934630';
const XSS_PAYLOAD = '<img src=x onerror="window.__MOA_XSS=1">';

describe('escapeHtml — mitigasi XSS', () => {
  it('mengubah tag dan atribut menjadi teks', () => {
    const result = escapeHtml(XSS_PAYLOAD);

    expect(result).toBe('&lt;img src=x onerror=&quot;window.__MOA_XSS=1&quot;&gt;');
    expect(result).not.toContain('<img');
  });

  it('meng-escape tanda kutip yang dipakai untuk attribute injection', () => {
    expect(escapeHtml('" onmouseover="alert(1)')).toBe('&quot; onmouseover=&quot;alert(1)');
  });
});

describe('safeMediaUrl — mitigasi URL media', () => {
  it('menolak skema javascript dan http', () => {
    expect(safeMediaUrl('javascript:alert(1)')).toBe('');
    expect(safeMediaUrl('https://evil.example/a.png')).toBe('');
  });

  it('menolak URL protokol-relatif dan SVG data URL', () => {
    expect(safeMediaUrl('//evil.example/a.png')).toBe('');
    expect(safeMediaUrl('data:image/svg+xml,<svg onload=alert(1)>')).toBe('');
  });

  it('menerima path lokal dan data URL gambar yang diizinkan', () => {
    expect(safeMediaUrl('./foto.jpg')).toBe('./foto.jpg');
    expect(safeMediaUrl('data:image/png;base64,AAAA')).toBe('data:image/png;base64,AAAA');
  });
});

describe('buildWhatsAppUrl — mitigasi query', () => {
  it('menolak nomor placeholder', () => {
    expect(buildWhatsAppUrl('628XXXXXXXXXX', 'Halo')).toBeNull();
  });

  it('meng-encode karakter khusus pada pesan', () => {
    expect(buildWhatsAppUrl(NOMOR_VALID, 'Halo & selamat datang!')).toBe(
      'https://wa.me/6285168934630?text=Halo%20%26%20selamat%20datang!',
    );
  });
});
