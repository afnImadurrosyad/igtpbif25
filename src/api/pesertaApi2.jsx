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

    if (error) {
      throw error; 
    }
    
    return data;
  } catch (err) {
    console.error("Error fetching all peserta:", err);
    throw err;
  }
}