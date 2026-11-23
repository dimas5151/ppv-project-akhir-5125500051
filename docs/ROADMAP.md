# Roadmap — IPKalkulator

Pemetaan sprint P10–P14 ke deliverable dan bukti. Fitur merujuk ke nomor di [CHARTER.md](CHARTER.md) bagian 3. Roadmap ini diperbarui setiap minggu.

## Sprint 1 (P09) — Selesai

| Item | Bukti |
|---|---|
| Project charter | `docs/CHARTER.md` |
| Repositori proyek publik, struktur folder, README awal | Riwayat commit GitHub |
| Satu pustaka UI (Bootstrap 5.3.3, versi terkunci), ≥ 3 komponen | Tangkapan layar 400 px dan laptop |
| Satu berkas pembungkus pustaka + `DEPENDENCIES.md` | `src/ui-pustaka.js`, `DEPENDENCIES.md` |

## Sprint P10–P14

| Minggu | Deliverable | Fitur MVP yang dikerjakan | Bukti |
|---|---|---|---|
| **P10 (Sprint 2 — Selesai)** | Debug bug nyata, kerja di cabang lalu digabung (`merge`), dokumentasi debug log, dan pencatatan aset (`assets/manifest.json`) via *commit* `chore:` terpisah | #2 Skala nilai PENS lengkap 8 tingkat (A s.d. D) beserta label/bobot nilai D dan pemecahan sebaran nilai menjadi 8 tingkat terpisah; pengecekan aset tanpa error 404 | `docs/DEBUG_LOG.md`; cabang `fix/skala-nilai-pens` dan `fix/validasi-input`; riwayat *merge* dan *commit* (`670acfd`, `3e6d9b3`, `7815a1c`); `assets/manifest.json` (`growth-illustration.svg` 709 B, `profile-avatar.svg` 252 B) |
| **P11 (Sprint 3 — Selesai)** | Kode dipecah menjadi ≥ 3 modul ES (`import`/`export`), `MODULE_MAP.md` dibuat, dan cabang di-*merge* ke `main` | #1 Tambah mata kuliah dan hitung IPK; #2 skala nilai & logika dipindah ke modul terpisah tanpa mengubah perilaku MVP | `src/storage.js`, `src/state.js`, `src/ui.js`, `src/main.js`, `src/ui-pustaka.js`, `MODULE_MAP.md`; *merge* PR ke `main` |
| **P12 (Sprint 4 — Selesai)** | Komponen reusable, penyimpanan aman dan berversi, README + CHANGELOG, pembaruan ROADMAP, tag rilis `v0.4.0` | #3 Data tersimpan otomatis dengan kunci berversi `:v1`, pemulihan data rusak (S2), dan penanganan gagal simpan (S6); komponen kartu mata kuliah reusable (`createCourseCard`) | `src/komponen.js`, `src/storage.js`, `src/ui.js`, `src/main.js`, `CHANGELOG.md`, `README.md`, `docs/ROADMAP.md`; bukti uji manual S2 & S6; tag `v0.4.0` |
| **P13** | Konsep produk (Tugas 7) | Penyempurnaan #4 statistik (Could); pengecekan semua kriteria sukses | Dokumen konsep produk; hasil uji kriteria sukses 1–4 |
| **P14** | Demo Akhir | Semua fitur Must dan Should stabil; #5 impor portal tetap **Won't** | Demo langsung; uji 3 pengguna sasaran (waktu penyelesaian dan titik bingung); tag rilis akhir |

## Catatan pembaruan

- **P10 (Sprint 2 — Selesai):** Status ditandai **Selesai** karena perbaikan skala/label nilai D dan pemecahan sebaran nilai 8 tingkat standar PENS sudah di-*merge* ke `main`, didokumentasikan pada `docs/DEBUG_LOG.md`, serta aset proyek (`growth-illustration.svg` dan `profile-avatar.svg`) telah dicatat di `assets/manifest.json` melalui *commit* `chore:` terpisah tanpa kendala 404.
- Nama modul pada P11 dapat berubah mengikuti kebutuhan; syaratnya minimal 3 modul ES.
- **P11 (Sprint 3 — Selesai):** Status ditandai **Selesai** karena kode aplikasi dipecah menjadi modul ES (`src/storage.js`, `src/state.js`, `src/ui.js`, `src/main.js`) dengan dependensi satu arah tanpa variabel global aplikasi maupun `onclick`, didokumentasikan pada `MODULE_MAP.md`, dan di-*merge* ke `main`.
- **P12 (Sprint 4 — Selesai):** Status ditandai **Selesai** karena komponen kartu mata kuliah (`createCourseCard`) ditambahkan pada `src/komponen.js` dan dipakai di `src/ui.js`, penyimpanan di `src/storage.js` dan `src/main.js` memakai kunci `:v1` dengan pemulihan JSON rusak (S2) serta cadangan memori dan notifikasi saat gagal simpan (S6), ditambah `CHANGELOG.md`, pembaruan `README.md` & `docs/ROADMAP.md`, serta rilis tag `v0.4.0`.