import { supabase } from '../utils/supabaseClient';

export async function findPesertaByNim(nim) {
  try {
    const { data: peserta, error } = await supabase
      .from('dataif25')
      .select('*')
      .eq('nim', nim)
      .single();

    if (error || !peserta) {
      throw new Error('Data peserta dengan NIM tersebut tidak ditemukan.');
    }

    const { data: anggota, error: anggotaError } = await supabase
      .from('dataif25')
      .select('nim, nama')
      .eq('kelompok', peserta.kelompok)
      .neq('nim', peserta.nim);

    if (anggotaError) {
      throw new Error('Gagal mengambil anggota.');
    }

    const result = {
      nama: peserta.nama,
      nim: peserta.nim,
      kelompok: peserta.kelompok,
      daplok: peserta.daplok,
      nomerDpl: peserta.no_dpl,
      anggotaLainnya: anggota.map((a) => ({
        nama: a.nama,
        nim: a.nim,
      })),
    };

    return result;
  } catch (err) {
    throw err;
  }
}

export async function getAllPeserta() {
  try {
    const { data, error } = await supabase
      .from('dataif25')
      .select('*')
      .order('kelompok', { ascending: true }); // Urut berdasarkan kelompok.
    if (data) {
      console.log('Data peserta berhasil diambil:', data);
    }
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error fetching all peserta:', err);
    throw err;
  }
}

export async function ambilDataPresensi() {
  try {
    const { data, error } = await supabase
      .from('presensi')
      .select('nim, nama, kelompok, isHadir');

    if (error) throw error;
    if (!data) return [];

    console.log('Data presensi berhasil diambil:', data);

    // Buat map per kelompok
    const kelompokMap = {};

    data.forEach((item) => {
      const kelompok = item.kelompok || 'Tidak diketahui';
      if (!kelompokMap[kelompok]) {
        kelompokMap[kelompok] = {
          total: 0,
          hadir: 0,
          tidakHadir: 0,
          listHadir: [],
          listTidakHadir: [],
        };
      }

      kelompokMap[kelompok].total += 1;
      if (item.isHadir === true) {
        kelompokMap[kelompok].hadir += 1;
        kelompokMap[kelompok].listHadir.push(item.nama || item.nim);
      } else {
        kelompokMap[kelompok].tidakHadir += 1;
        kelompokMap[kelompok].listTidakHadir.push(item.nama || item.nim);
      }
    });

    // Ubah menjadi array siap pakai untuk UI
    const kelompokArray = Object.entries(kelompokMap).map(([kelompok, d]) => ({
      kelompok,
      total: d.total,
      hadir: d.hadir,
      tidakHadir: d.tidakHadir,
      persentase: ((d.hadir / d.total) * 100).toFixed(1),
      listHadir: d.listHadir,
      listTidakHadir: d.listTidakHadir,
    }));

    return kelompokArray;
  } catch (err) {
    console.error('Gagal mengambil data presensi:', err.message);
    return [];
  }
}

export async function getTugasPeserta() {
  try {
    const { data, error: err } = await supabase
      .from('presensi')
      .select('nim, nama, kelompok, tugas_1, submitted_at, valid')
      .order('kelompok', { ascending: true })
      .order('nama', { ascending: true });
    if (data) {
      console.log('Data tugas berhasil diambil:', data);
    }

    if (err) throw err;

    const sorted = data.sort((a, b) => {
      if (a.tugas_1 && !b.tugas_1) return -1;
      if (!a.tugas_1 && b.tugas_1) return 1;
      return 0;
    });

    return sorted || [];
  } catch (err) {
    console.error('getPresensi error', err);
    setError('Gagal memuat data dari Supabase');
  }
}

export async function getResumePeserta() {
  try {
    const { data, error: err } = await supabase
      .from('presensi')
      .select('nim, nama, kelompok, tugas_2, submitted_at, valid_2')
      .order('kelompok', { ascending: true })
      .order('nama', { ascending: true });
    if (data) {
      console.log('Data tugas berhasil diambil:', data);
    }
    console.log(data);
    if (err) throw err;

    const sorted = data.sort((a, b) => {
      if (a.tugas_2 && !b.tugas_2) return -1;
      if (!a.tugas_2 && b.tugas_2) return 1;
      return 0;
    });

    return sorted || [];
  } catch (err) {
    console.error('getPresensi error', err);
    setError('Gagal memuat data dari Supabase');
  }
}
