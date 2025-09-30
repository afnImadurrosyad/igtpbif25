// src/api/pesertaApi.js

// Struktur data yang akan dikembalikan
const dummyData = {
  nama: 'Christian Leon Saputra',
  nim: '124140999',
  kelompok: 'Kelompok 99',
  daplok: 'Samuel Purba',
  anggotaLainnya: [
    { nama: 'Budi Santoso', nim: '124140101' },
    { nama: 'Citra Lestari', nim: '124140102' },
    { nama: 'Doni Setiawan', nim: '124140103' },
    { nama: 'Eka Putri', nim: '124140104' },
    { nama: 'Fajar Nugroho', nim: '124140105' },
  ],
};

// Fungsi 'palsu' untuk mencari data berdasarkan NIM
export const findPesertaByNim = (nim) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Jika NIM yang dicari adalah "124140999", kembalikan data
      if (nim === '124140999') {
        resolve(dummyData);
      } else {
        // Jika tidak, kembalikan error
        reject(new Error('Data peserta dengan NIM tersebut tidak ditemukan.'));
      }
    }, 1000); // Simulasi delay jaringan 1 detik
  });
};
