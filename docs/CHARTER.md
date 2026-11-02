# Project Charter — IPKalkulator

Dimas Ramadhani Wairisal · NRP 5125500051 · PPV Project Akhir (Sprint 1)

## 1. Masalah
Mahasiswa sulit memantau IPK-nya karena harus menghitung bobot SKS dan mengonversi nilai huruf ke angka secara manual setiap kali nilai keluar.

## 2. Pengguna sasaran dan persona
Mahasiswa D3 Politeknik Elektronika Negeri Surabaya (PENS) pada semester awal hingga menengah.

**Rizky**, 20 tahun, mahasiswa D3 Teknologi Multimedia dan Broadcasting. Harinya diisi kuliah teori dan praktikum. Ia hanya ingin tahu posisi IPK-nya setiap kali nilai mata kuliah keluar. Selama ini ia menghitung di spreadsheet atau kalkulator ponsel. Skala nilai PENS punya delapan tingkat, sehingga ia mudah keliru mengonversi nilai dan menimbang SKS tiap mata kuliah.

Skala nilai PENS: A = 4, A- = 3,75, AB = 3,5, B+ = 3,25, B = 3, BC = 2,5, C = 2, D = 1.

## 3. Fitur MVP (MoSCoW)

| # | Fitur | Prioritas | Alasan |
|---|---|---|---|
| 1 | Tambah mata kuliah (nama, nilai huruf, SKS); IPK terhitung otomatis | **Must** | Inti aplikasi; tanpa ini IPK tidak bisa dipantau |
| 2 | Skala nilai PENS lengkap (8 tingkat) | **Must** | Skala yang kurang membuat IPK salah; kode awal baru memuat 4 tingkat |
| 3 | Data tersimpan otomatis di peramban | **Should** | Menghemat pengisian ulang, tetapi aplikasi tetap berguna tanpanya |
| 4 | Statistik total SKS dan sebaran nilai | **Could** | Pelengkap; Rizky hanya butuh angka IPK |
| 5 | Impor nilai otomatis dari portal akademik | **Won't** | Sengaja tidak dibuat: butuh akses sistem kampus dan nilai utama belum diuji |

## 4. Kriteria sukses

1. Pengguna baru mengisi 5 mata kuliah dan melihat IPK dalam ≤ 2 menit tanpa bantuan (uji pada minimal 3 orang).
2. IPK di aplikasi sama dengan hitungan manual pada 5 kasus uji yang mencakup kedelapan nilai huruf (selisih 0,00).
3. Data tetap ada setelah tab ditutup dan dibuka lagi pada 3 dari 3 percobaan.
4. Semua halaman terbaca tanpa terpotong di lebar 400 px.

## 5. Risiko dan antisipasi

| # | Risiko | Antisipasi |
|---|---|---|
| 1 | Data hilang saat data peramban dibersihkan atau ganti perangkat (disimpan di `localStorage`) | Ekspor/impor JSON dan penyimpanan berversi (Sprint P12) |
| 2 | Skala nilai berubah atau keliru dimasukkan | Skala disimpan di satu berkas data dan dicek ke ketentuan akademik PENS |
| 3 | Input tidak valid (SKS kosong/0, nama kosong) membuat IPK salah | Validasi input dan uji kasus tepi |
| 4 | Pustaka UI membuat halaman berat atau merusak tampilan | Versi terkunci, satu berkas pembungkus, ukuran dicek di tab Network, uji di 400 px |

## 6. Catatan
Arah produk tetap sama dengan prototipe Tugas 4 (kalkulator IPK); tidak ada perubahan arah.
