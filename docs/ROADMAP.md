# Roadmap — IPKalkulator

Pemetaan sprint P10–P14 ke deliverable dan bukti. Fitur merujuk ke nomor di [CHARTER.md](CHARTER.md) bagian 3. Roadmap ini diperbarui setiap minggu.

## Sprint 1 (P09) — sedang/selesai

| Item | Bukti |
|---|---|
| Project charter | `docs/CHARTER.md` |
| Repositori proyek publik, struktur folder, README awal | Riwayat commit GitHub |
| Satu pustaka UI (Bootstrap 5.3.3, versi terkunci), ≥ 3 komponen | Tangkapan layar 400 px dan laptop |
| Satu berkas pembungkus pustaka + `DEPENDENCIES.md` | `src/ui-pustaka.js`, `DEPENDENCIES.md` |

## Sprint P10–P14

| Minggu | Deliverable | Fitur MVP yang dikerjakan | Bukti |
|---|---|---|---|
| **P10** | Debug ≥ 2 bug nyata dengan DevTools; kerja di cabang lalu digabung (merge) | #2 Skala nilai PENS lengkap (kandidat bug: skala baru 4 tingkat dan D bernilai 0, seharusnya 1); validasi input SKS dan nama (kandidat bug kedua) | Tabel diagnosis (gejala, alat, penyebab, perbaikan, uji ulang); cabang mis. `fix/skala-nilai-pens` dan `fix/validasi-input`; riwayat merge |
| **P11** | Kode dipecah menjadi ≥ 3 modul ES (`import`/`export`) | #1 Tambah mata kuliah dan hitung IPK; #2 skala nilai dipindah ke satu modul data | `src/data.js` (skala nilai), `src/hitung.js` (hitung IPK), `src/main.js` (penghubung), `src/ui-pustaka.js`; aplikasi tetap berjalan |
| **P12** | Komponen reusable, penyimpanan aman dan berversi, README + CHANGELOG, tag rilis | #3 Data tersimpan otomatis (berversi, ekspor/impor JSON); #4 statistik sebagai komponen reusable | Komponen mis. kartu mata kuliah; `CHANGELOG.md`; tag `v0.3.0` |
| **P13** | Konsep produk (Tugas 7) | Penyempurnaan #4 statistik (Could); pengecekan semua kriteria sukses | Dokumen konsep produk; hasil uji kriteria sukses 1–4 |
| **P14** | Demo Akhir | Semua fitur Must dan Should stabil; #5 impor portal tetap **Won't** | Demo langsung; uji 3 pengguna sasaran (waktu penyelesaian dan titik bingung); tag rilis akhir |

## Catatan pembaruan

- Bug pada P10 masih **kandidat** dan diperbarui setelah benar-benar ditemukan dan dibuktikan lewat DevTools.
- Nama modul pada P11 dapat berubah mengikuti kebutuhan; syaratnya minimal 3 modul ES.
