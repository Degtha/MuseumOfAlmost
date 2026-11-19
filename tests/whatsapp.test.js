import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, isValidWhatsAppNumber } from '../src/ui.js';

const NOMOR_VALID = '6285168934630';

describe('isValidWhatsAppNumber', () => {
  it('menerima nomor internasional berupa digit tanpa tanda +', () => {
    expect(isValidWhatsAppNumber(NOMOR_VALID)).toBe(true);
  });
});

describe('buildWhatsAppUrl — tombol Hubungi via WhatsApp', () => {
  it('menghasilkan URL wa.me untuk nomor internasional yang valid', () => {
    expect(buildWhatsAppUrl(NOMOR_VALID, 'Halo')).toBe(
      'https://wa.me/6285168934630?text=Halo',
    );
  });

  it('meng-encode spasi pada pesan dengan encodeURIComponent', () => {
    expect(buildWhatsAppUrl(NOMOR_VALID, 'Halo Museum')).toBe(
      'https://wa.me/6285168934630?text=Halo%20Museum',
    );
  });

  it('meng-encode karakter khusus pada pesan', () => {
    expect(buildWhatsAppUrl(NOMOR_VALID, 'Halo & selamat datang!')).toBe(
      'https://wa.me/6285168934630?text=Halo%20%26%20selamat%20datang!',
    );
  });

  it('menolak nomor yang mengandung huruf', () => {
    expect(buildWhatsAppUrl('62851abc123', 'Halo')).toBeNull();
    expect(isValidWhatsAppNumber('62851abc123')).toBe(false);
  });

  it('menolak nomor kosong', () => {
    expect(buildWhatsAppUrl('', 'Halo')).toBeNull();
    expect(buildWhatsAppUrl(null, 'Halo')).toBeNull();
  });

  it('menolak format internasional yang tidak sesuai aturan implementasi', () => {
    for (const nomor of ['+6285168934630', '085168934630', '628']) {
      expect(buildWhatsAppUrl(nomor, 'Halo')).toBeNull();
    }
  });

  it('tidak menghasilkan URL aktif untuk nomor placeholder', () => {
    expect(buildWhatsAppUrl('628XXXXXXXXXX', 'Halo')).toBeNull();
    expect(isValidWhatsAppNumber('628XXXXXXXXXX')).toBe(false);
  });

  it('menghasilkan query text kosong untuk pesan kosong atau tidak diberikan', () => {
    expect(buildWhatsAppUrl(NOMOR_VALID, '')).toBe('https://wa.me/6285168934630?text=');
    expect(buildWhatsAppUrl(NOMOR_VALID)).toBe('https://wa.me/6285168934630?text=');
  });
});
