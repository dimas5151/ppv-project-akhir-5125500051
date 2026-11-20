# Debug Log - Proyek Akhir Sprint 2

Catatan perbaikan bug dan penyesuaian fitur pada aplikasi Proyek Akhir berdasarkan standar Politeknik Negeri Surabaya (PENS).

---

## Bug 1: Penyesuaian Skala Nilai dan Label Nilai D PENS
- **Cabang Git:** `main` / `fix/skala-nilai-pens`
- **Referensi Commit:** `670acfd` & `3e6d9b3`
- **Gejala (Symptom):** Skala penilaian huruf pada aplikasi sebelumnya belum sepenuhnya mencakup rentang lengkap dan penyesuaian bobot standar PENS (skala 8 tingkat dari A sampai D).
- **Penyebab (Root Cause):** Konfigurasi elemen input antarmuka dan struktur data awal masih menggunakan acuan umum, belum dispesifikasikan ke standar penilaian institusi.
- **Solusi / Perbaikan:** Melakukan pembaruan pada berkas antarmuka dan logika skrip untuk melengkapi skala nilai huruf menjadi 8 tingkat serta memperbaiki bobot nilai D secara presisi.

---

## Bug 2: Pemecahan Sebaran Nilai Menjadi 8 Tingkat Terpisah
- **Cabang Git:** `fix/validasi-input`
- **Referensi Commit:** `7815a1c`
- **Gejala (Symptom):** Grafik atau hasil perhitungan distribusi sebaran nilai masih mengelompok secara umum dan belum memecah statistik grade menjadi 8 tingkat terpisah.
- **Penyebab (Root Cause):** Algoritma pemetaan statistik dan fungsi pengelompokan data pada `src/script.js` masih menggunakan rentang pembagian lama.
- **Solusi / Perbaikan:** Memperbarui fungsi pemetaan data di `src/script.js` untuk memecah sebaran nilai secara proporsional ke dalam 8 tingkat terpisah sesuai ketentuan Sprint 2.