# IPKalkulator

Aplikasi web untuk memantau IPK mahasiswa: tambah mata kuliah, pilih nilai huruf dan SKS, lalu IPK terhitung otomatis.

**Masalah yang diselesaikan:** mahasiswa sulit memantau IPK-nya karena harus menghitung bobot SKS dan mengonversi nilai huruf ke angka secara manual setiap kali nilai keluar.

Proyek Praktikum Pemrograman Visual (TB033109), Politeknik Elektronika Negeri Surabaya. Pengembang: Dimas Ramadhani Wairisal (NRP 5125500051).

## Cara menjalankan

Tidak perlu instalasi.

1. Unduh atau clone repositori ini:
   ```bash
   git clone https://github.com/dimas5151/ppv-project-akhir-5125500051.git
   ```
2. Buka folder hasil clone, lalu klik dua kali `index.html` (atau buka dengan Chrome/Firefox).
3. Butuh koneksi internet untuk memuat font dan Bootstrap 5.3.3 dari CDN.

## Dokumen proyek

- [Project charter](docs/CHARTER.md): masalah, persona, fitur MVP, kriteria sukses, risiko
- [Roadmap P10–P14](docs/ROADMAP.md): rencana sprint dan bukti per minggu
- [Dependencies](DEPENDENCIES.md): pustaka UI yang dipakai, versi, ukuran, dan alasannya
- [Module map](MODULE_MAP.md): peta modul ES dan alur dependensi aplikasi

## Struktur folder

```
.
├── index.html
├── DEPENDENCIES.md
├── MODULE_MAP.md
├── src/          # style.css, main.js, state.js, storage.js, ui.js, ui-pustaka.js
├── assets/       # gambar SVG dan manifest
└── docs/         # CHARTER.md, DEBUG_LOG.md, ROADMAP.md
```

## Status

Sprint 3 (P11) selesai: kode dipecah menjadi modul ES (`src/storage.js`, `src/state.js`, `src/ui.js`, `src/main.js`) beserta `MODULE_MAP.md` dan telah di-*merge* ke `main`.

## Sumber dan bantuan

- Dibuat dengan bantuan Claude (Anthropic) untuk draf `docs/CHARTER.md`, `docs/ROADMAP.md`, dan panduan langkah; isi disesuaikan penulis.