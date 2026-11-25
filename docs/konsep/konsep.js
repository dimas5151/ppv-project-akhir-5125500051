// konsep.js — Konsep produk IPKalkulator (Tugas 7 / Minggu 13)
const KONSEP = {
  nama: 'IPKalkulator',
  tagline: 'Pantau IPK skala 8 tingkat PENS dengan perhitungan otomatis dan penyimpanan aman.',
  persona: {
    nama: 'Rizky, 20 tahun',
    siapa: 'Mahasiswa semester 3 D3 Teknologi Multimedia dan Broadcasting PENS yang rutin mengecek IPK.',
    keseharian: 'Padat jadwal kuliah, praktikum lab, dan tugas proyek; mengecek nilai keluar serta memantau IPK berkala.',
    masalah: 'Mudah keliru mengonversi 8 tingkat nilai PENS dan menghitung bobot SKS manual, serta rawan kehilangan/gangguan data di peramban.',
  },
  masalah:
    'Mahasiswa program vokasi PENS menghadapi skala penilaian delapan tingkat dengan bobot SKS berbeda tiap mata kuliah. Menghitung dan memantau IPK secara manual di kalkulator atau spreadsheet memakan waktu dan rawan salah konversi. Selain itu, data tersimpan di peramban berisiko rusak atau gagal disimpan saat kuota penuh.',
  solusi:
    'IPKalkulator menyajikan kalkulator IPK berbasis web dengan skala delapan tingkat PENS yang menghitung total SKS dan IPK otomatis saat data diubah. Aplikasi memakai penyimpanan lokal berversi yang menyaring data rusak, memberi notifikasi saat penyimpanan gagal, dan terdokumentasi di repositori proyek akhir dari rilis awal hingga Sprint 4.',
  fitur: [
    {
      nama: 'Input mata kuliah & hitung IPK otomatis (skala 8 tingkat PENS)',
      prioritas: 'wajib',
      alasan: 'Menjawab langsung masalah konversi nilai PENS dan perhitungan bobot SKS (sudah ada sejak v0.1.0 / v0.2.0).',
    },
    {
      nama: 'Kelola daftar mata kuliah & komponen kartu reusable',
      prioritas: 'wajib',
      alasan: 'Memungkinkan hapus/reset mata kuliah dengan aman memakai textContent (src/komponen.js & src/ui.js, v0.1.0–v0.4.0).',
    },
    {
      nama: 'Penyimpanan aman berversi :v1 & penanganan gagal simpan',
      prioritas: 'wajib',
      alasan: 'Mencegah aplikasi crash saat JSON rusak serta menjaga sesi dan notifikasi saat simpan gagal (v0.4.0, src/storage.js & src/main.js).',
    },
    {
      nama: 'Statistik sebaran nilai & profil mahasiswa',
      prioritas: 'sebaiknya',
      alasan: 'Memberi ringkasan tambahan dan pemisahan profil (v0.1.0–v0.3.0), pelengkap alur hitung IPK utama.',
    },
    {
      nama: 'Ekspor / impor berkas JSON lintas perangkat',
      prioritas: 'sebaiknya',
      alasan: 'Membantu cadangan data antar-perangkat, namun bukan syarat utama untuk pemakaian harian.',
    },
    {
      nama: 'Integrasi portal akademik & akun server cloud',
      prioritas: 'belum',
      alasan: 'Membutuhkan akses sistem kampus dan infrastruktur backend; ditunda agar fokus pada ketahanan inti aplikasi.',
    },
  ],
  pembanding: [
    {
      nama: 'Spreadsheet (Excel / Google Sheets)',
      kelebihan: 'Fleksibel untuk menyusun tabel dan rumus tambahan sendiri.',
      kekurangan: 'Harus mengatur rumus & skala manual; kurang praktis saat dibuka cepat di layar kecil.',
    },
    {
      nama: 'Kalkulator IPK / SKS Web Umum',
      kelebihan: 'Cepat diakses lewat peramban tanpa instalasi.',
      kekurangan: 'Umumnya memakai skala 4 huruf standar dan belum menekankan penanganan data penyimpanan rusak.',
    },
  ],
  pembeda:
    'Fokus pada skala 8 tingkat PENS dengan komponen kartu mata kuliah reusable dan penyimpanan berversi :v1 yang tahan data rusak serta gagal simpan.',
};