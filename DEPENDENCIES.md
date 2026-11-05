# DEPENDENCIES — IPKalkulator

Daftar pustaka pihak ketiga yang dipakai proyek ini.

## Pustaka

| Item | Keterangan |
|---|---|
| Nama dan versi | **Bootstrap 5.3.3** (versi terkunci, bukan `@latest`) |
| Sumber | CDN jsDelivr: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/` |
| Berkas yang dimuat | `css/bootstrap.min.css` (di `index.html`, sebelum `src/style.css`) dan `js/bootstrap.bundle.min.js` (sebelum `src/ui-pustaka.js`) |
| Lisensi | MIT |
| Tujuan | Komponen antarmuka siap pakai dan aksesibel |

### Ukuran transfer (tab Network, Disable cache aktif, 3 November 2026)

| Berkas | Transfer |
|---|---|
| `bootstrap.min.css` | ± 33,9 kB |
| `bootstrap.bundle.min.js` | ± 25,2 kB |
| **Total** | **± 59,1 kB** |

## Komponen yang dipakai

| Komponen | Dipakai untuk | Dokumentasi |
|---|---|---|
| Modal | Konfirmasi "Reset semua" (`#modalReset`), menggantikan `window.confirm()` | https://getbootstrap.com/docs/5.3/components/modal/ |
| Toast | Notifikasi "Mata kuliah tersimpan" (`#toastNotif`) | https://getbootstrap.com/docs/5.3/components/toasts/ |
| Card | Kartu statistik (Total SKS, IPK, Jumlah matkul) | https://getbootstrap.com/docs/5.3/components/card/ |

## Aturan pemakaian

- **Satu pintu:** semua panggilan API JavaScript Bootstrap hanya ada di `src/ui-pustaka.js`. `src/script.js` memanggil fungsi buatan sendiri (`bukaKonfirmasiReset`, `tampilkanToast`).
- **Gaya sendiri tidak kalah:** `src/style.css` dimuat setelah Bootstrap.
- **Tema lewat variabel pustaka:** kartu statistik diatur dengan `--bs-card-*` di `.stat-card`, bukan menimpa kelas internal Bootstrap.

## Empat pertanyaan sebelum memasang pustaka

**1. Kebutuhan**
- *Masalah yang diselesaikan:* konfirmasi reset memakai `window.confirm()` yang tampilannya bawaan peramban dan tidak seragam; aplikasi juga belum memberi umpan balik setelah data disimpan.
- *Bisa dengan CSS biasa?* Tampilan kartu bisa, tetapi Modal dan Toast butuh JavaScript, pengelolaan fokus, dan aksesibilitas yang ditulis dari nol bila tanpa pustaka.
- *Komponen yang dipakai:* 3 (Modal, Toast, Card).

**2. Biaya**
- *Ukuran:* ± 59,1 kB transfer (CSS ± 33,9 kB dan JS ± 25,2 kB), diukur di tab Network.
- *Bisa diimpor sebagian?* Lewat CDN seluruh berkas dimuat; pemuatan parsial baru mungkin dengan Sass/npm, dipertimbangkan bila ukuran jadi masalah.
- *Waktu mempelajari:* singkat, karena hanya tiga komponen dan dokumentasinya jelas.

**3. Pemeliharaan**
- *Rilis terakhir:* seri 5.3 masih dirawat; versi yang dipakai dikunci pada 5.3.3. [Cek tanggal rilis di halaman rilis resmi sebelum dikumpulkan.]
- *Dokumentasi:* lengkap di getbootstrap.com/docs/5.3.
- *Bila berhenti dikembangkan:* panggilan JavaScript terkumpul di satu berkas, sehingga penggantian pustaka terlokalisasi (lihat "Rencana bila dilepas").

**4. Pemasangan**
- Versi dikunci lewat nomor versi di URL CDN (bukan `@latest`). Alasan memakai CDN: proyek ini HTML statis tanpa langkah build; migrasi ke npm (`package.json`) dipertimbangkan bila proyek berkembang.
- Dicatat di berkas ini.
- CSS sendiri dimuat setelah pustaka.

## Alasan memilih dan alternatif yang ditolak

- **Dipilih:** Bootstrap, karena punya Modal, Toast, dan Card siap pakai, dokumentasi lengkap, dan sudah dikenal dari latihan P09.
- **Ditolak:** Pico CSS (tidak menyediakan komponen Toast bawaan) dan Tailwind CSS (tidak menyediakan komponen jadi dan umumnya butuh langkah build).

## Cara memperbarui

1. Ubah nomor versi pada dua URL CDN di `index.html`.
2. Uji Modal, Toast, dan Card di lebar 400 px dan laptop; pastikan Console bersih.
3. Perbarui versi dan ukuran transfer di berkas ini.

## Risiko yang diketahui

- Bila CDN tidak dapat diakses, `bootstrap` tidak terdefinisi sehingga `bukaKonfirmasiReset` dan `tampilkanToast` gagal. Rencana: tambahkan cadangan (fallback) di `src/ui-pustaka.js`, misalnya kembali ke `window.confirm()`, pada Sprint P12.

## Rencana bila pustaka dilepas

1. Ganti isi `src/ui-pustaka.js` dengan implementasi lain (fungsi `bukaKonfirmasiReset` dan `tampilkanToast` dipertahankan), sehingga `src/script.js` tidak perlu diubah.
2. Cari kelas Bootstrap di `index.html` (`modal`, `toast`, `card`, `btn`) dan ganti dengan markup serta gaya sendiri.
3. Hapus dua tag CDN Bootstrap di `index.html` dan variabel `--bs-card-*` di `src/style.css`.