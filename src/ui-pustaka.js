// ui-pustaka.js — SATU-SATUNYA berkas yang memanggil API JavaScript Bootstrap.
// Bila pustaka diganti suatu hari nanti, cukup berkas ini yang diubah;
// script.js tidak perlu disentuh.

function bukaKonfirmasiReset(onYa) {
  const el = document.querySelector('#modalReset');
  const modal = bootstrap.Modal.getOrCreateInstance(el);

  el.querySelector('#konfirmasiReset').onclick = () => {
    modal.hide();
    onYa();
  };

  modal.show();
}

function tampilkanToast(pesan) {
  const el = document.querySelector('#toastNotif');
  el.querySelector('#toastPesan').textContent = pesan;
  bootstrap.Toast.getOrCreateInstance(el, { delay: 2500 }).show();
}
