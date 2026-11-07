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

## Struktur folder

```
.
├── index.html
├── DEPENDENCIES.md
├── src/          # style.css, script.js, ui-pustaka.js
├── assets/       # gambar SVG
└── docs/         # CHARTER.md, ROADMAP.md
```

## Status

Sprint 1 (P09) selesai: charter, roadmap, struktur repositori, dan pemasangan Bootstrap 5.3.3 (Modal, Toast, Card) lewat satu berkas pembungkus `src/ui-pustaka.js`.

## Sumber dan bantuan

- Dibuat dengan bantuan Claude (Anthropic) untuk draf `docs/CHARTER.md`, `docs/ROADMAP.md`, dan panduan langkah; isi disesuaikan penulis.