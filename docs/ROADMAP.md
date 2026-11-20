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
| **P11** | Kode dipecah menjadi ≥ 3 modul ES (`import`/`export`) | #1 Tambah mata kuliah dan hitung IPK; #2 skala nilai dipindah ke satu modul data | `src/data.js` (skala nilai), `src/hitung.js` (hitung IPK), `src/main.js` (penghubung), `src/ui-pustaka.js`; aplikasi tetap berjalan |
| **P12** | Komponen reusable, penyimpanan aman dan berversi, README + CHANGELOG, tag rilis | #3 Data tersimpan otomatis (berversi, ekspor/impor JSON); #4 statistik sebagai komponen reusable | Komponen mis. kartu mata kuliah; `CHANGELOG.md`; tag `v0.3.0` |
| **P13** | Konsep produk (Tugas 7) | Penyempurnaan #4 statistik (Could); pengecekan semua kriteria sukses | Dokumen konsep produk; hasil uji kriteria sukses 1–4 |
| **P14** | Demo Akhir | Semua fitur Must dan Should stabil; #5 impor portal tetap **Won't** | Demo langsung; uji 3 pengguna sasaran (waktu penyelesaian dan titik bingung); tag rilis akhir |

## Catatan pembaruan

- **P10 (Sprint 2 — Selesai):** Status ditandai **Selesai** karena perbaikan skala/label nilai D dan pemecahan sebaran nilai 8 tingkat standar PENS sudah di-*merge* ke `main`, didokumentasikan pada `docs/DEBUG_LOG.md`, serta aset proyek (`growth-illustration.svg` dan `profile-avatar.svg`) telah dicatat di `assets/manifest.json` melalui *commit* `chore:` terpisah tanpa kendala 404.
- Nama modul pada P11 dapat berubah mengikuti kebutuhan; syaratnya minimal 3 modul ES.