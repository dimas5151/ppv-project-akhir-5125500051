# Changelog

Semua perubahan penting pada proyek **IPKalkulator** dicatat di berkas ini.

## [0.4.0] - 2026-11-24
### Added
- Menambahkan komponen kartu mata kuliah yang dapat digunakan kembali (`createCourseCard`) pada `src/komponen.js`.
- Menambahkan lapisan penyimpanan aman (`readKeySafe`, `writeKeySafe`, `removeKeySafe`, dan cadangan memori sementara) pada `src/storage.js`.

### Changed
- Memperbarui kunci penyimpanan mata kuliah dan profil menjadi skema berversi `:v1` (`ipk-tracker-courses:v1` dan `ipk-tracker-profile:v1`) pada `src/storage.js`.
- Memperbarui `renderCourseList` pada `src/ui.js` agar menggunakan komponen `createCourseCard`.
- Memperbarui `src/main.js` untuk menangani kegagalan penyimpanan (`QuotaExceededError` / blokir penyimpanan) dengan notifikasi *toast* dan menjaga sesi tetap berjalan.

## [0.3.0] - 2026-11
### Added
- Menambahkan pembungkus komponen antarmuka Bootstrap 5.3.3 (`src/ui-pustaka.js`) serta dokumentasi proyek awal (`docs/CHARTER.md`, `docs/ROADMAP.md`, `DEPENDENCIES.md`).

## [0.2.0] - 2026-11
### Changed
- Merapikan struktur modul aplikasi dan sinkronisasi data profil serta mata kuliah di peramban.

## [0.1.0] - 2026-11
### Added
- Rilis awal aplikasi **IPKalkulator** (form input mata kuliah, perhitungan SKS dan IPK, sebaran nilai, serta halaman profil dan statistik).