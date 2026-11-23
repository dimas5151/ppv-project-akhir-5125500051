# IPKalkulator

Aplikasi web untuk memantau IPK mahasiswa: tambah mata kuliah, pilih nilai huruf dan SKS, lalu IPK terhitung otomatis.

**Masalah yang diselesaikan:** mahasiswa sulit memantau IPK-nya karena harus menghitung bobot SKS dan mengonversi nilai huruf ke angka secara manual setiap kali nilai keluar.

Proyek Praktikum Pemrograman Visual (TB033109), Politeknik Elektronika Negeri Surabaya. Pengembang: Dimas Ramadhani Wairisal (NRP 5125500051).

## Cara menjalankan

Tidak perlu instalasi.

1. Unduh atau clone repositori ini:
   git clone https://github.com/dimas5151/ppv-project-akhir-5125500051.git
2. Jalankan melalui peladen lokal (misalnya Live Server di VS Code pada http://127.0.0.1:5500/index.html) atau buka index.html dengan peramban (Chrome/Firefox).
3. Butuh koneksi internet untuk memuat font dan Bootstrap 5.3.3 dari CDN.

## Fitur MVP & Status

- **Input & Validasi Mata Kuliah** (`Selesai`): Menambah mata kuliah dengan nama, nilai huruf, dan SKS beserta validasi input.
- **Perhitungan SKS, IPK & Sebaran Nilai** (`Selesai`): Menghitung total SKS, nilai IPK, dan distribusi nilai secara otomatis.
- **Hapus & Reset Mata Kuliah** (`Selesai`): Menghapus satu mata kuliah atau mereset seluruh daftar mata kuliah dengan konfirmasi.
- **Profil Mahasiswa & Pemisahan Data per Profil** (`Selesai`): Menyimpan nama dan NRP serta mengaitkan data mata kuliah sesuai profil aktif.
- **Komponen Kartu Mata Kuliah Reusable & Penyimpanan Aman `:v1`** (`Selesai`): Menggunakan `createCourseCard` (`src/komponen.js`), kunci penyimpanan berversi `:v1` (`src/storage.js`), pemulihan saat JSON rusak, dan notifikasi saat penyimpanan gagal (`src/main.js`).

## Dokumen proyek

- [Project charter](docs/CHARTER.md): masalah, persona, fitur MVP, kriteria sukses, risiko
- [Roadmap P10–P14](docs/ROADMAP.md): rencana sprint dan bukti per minggu
- [Dependencies](DEPENDENCIES.md): pustaka UI yang dipakai, versi, ukuran, dan alasannya
- [Module map](MODULE_MAP.md): peta modul ES dan alur dependensi aplikasi
- [Changelog](CHANGELOG.md): riwayat perubahan versi `v0.x`

## Kontrak Komponen & Penyimpanan

- **Komponen `createCourseCard(course, options)` (`src/komponen.js`)**: Menerima objek `course` (`id`, `name`, `sks`, `grade`) dan `options` (`onDelete`), lalu mengembalikan elemen `<li>` (`.course-item`) dengan `textContent` aman dari XSS, info SKS & bobot nilai, serta tombol **Hapus**.
- **Penyimpanan Aman Berversi `:v1` (`src/storage.js`)**: Menggunakan kunci berversi `:v1` (`ipk-tracker-courses:v1`, `ipk-tracker-profile:v1`, dan kunci turunan per profil), memvalidasi/menyaring data saat membaca, serta membungkus penulisan `localStorage` dengan `try/catch` dan cadangan memori sesi saat terjadi galat (`QuotaExceededError` / blokir penyimpanan).

## Kredit Aset & Pustaka

- **Bootstrap 5.3.3** (via CDN & pembungkus `src/ui-pustaka.js`): Komponen UI seperti modal konfirmasi dan notifikasi toast.
- **Aset SVG Lokal** (`assets/growth-illustration.svg`, `assets/profile-avatar.svg`): Ilustrasi dan avatar bawaan aplikasi.

## Struktur folder

.
├── index.html
├── CHANGELOG.md
├── DEPENDENCIES.md
├── MODULE_MAP.md
├── README.md
├── src/          # style.css, main.js, state.js, storage.js, ui.js, ui-pustaka.js, komponen.js, script.js
├── assets/       # gambar SVG dan manifest
└── docs/         # CHARTER.md, DEBUG_LOG.md, ROADMAP.md

## Status

Sprint 4 (P12) rilis `v0.4.0` selesai: menambahkan komponen `reusable` (`src/komponen.js`), kunci penyimpanan berversi `:v1` serta penanganan galat penyimpanan (`src/storage.js`, `src/main.js`), dokumentasi `CHANGELOG.md` & pembaruan `README.md` / `docs/ROADMAP.md`.

## Sumber dan bantuan

- Dibuat dengan bantuan Claude (Anthropic) dan asisten AI untuk draf dokumentasi, panduan langkah, dan penyempurnaan kode/pengujian; isi disesuaikan dan diverifikasi penulis.