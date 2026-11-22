# MODULE_MAP — IPKalkulator (Sprint 3)

## Peta Modul (Dependensi Satu Arah)

```text
index.html
  ├── (script biasa) src/ui-pustaka.js
  └── (type="module") src/main.js
        ├── src/storage.js
        ├── src/state.js
        └── src/ui.js
              └── src/state.js


## Tanggung Jawab per Modul

* **`src/storage.js`**: Mengelola baca, tulis, migrasi, dan penghapusan data profil serta daftar mata kuliah di `localStorage`.
* **`src/state.js`**: Menyediakan validasi input, manipulasi daftar mata kuliah, serta perhitungan SKS, IPK, dan distribusi nilai secara murni tanpa menyentuh DOM.
* **`src/ui.js`**: Mengatur referensi elemen DOM, perpindahan halaman, animasi transisi/kartu, serta perenderan daftar mata kuliah dan ringkasan statistik.
* **`src/main.js`**: Menjadi titik masuk aplikasi (`type="module"`) yang menghubungkan penyimpanan, *state*, *event listener*, dan tampilan.

## Bagian yang Belum Dimodulkan & Alasannya

* **`src/ui-pustaka.js`**: Pembungkus UI pustaka (seperti modal konfirmasi reset dan notifikasi *toast*) yang dipertahankan sebagai skrip terpisah agar integrasi komponen pembantu tetap terjaga tanpa perlu dirombak pada tahap ini.
* **`src/script.js`**: Berkas monolit lama yang tidak lagi dimuat oleh `index.html` setelah beralih ke `src/main.js`, dan dibiarkan dulu agar riwayat/referensi kode awal tidak langsung terhapus mendadak.