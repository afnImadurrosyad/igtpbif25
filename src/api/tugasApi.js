import { supabase } from '../utils/supabaseClient';

export async function addTugasByNim(nim, url) {
  try {
    const { data: peserta, error } = await supabase
      .from('presensi')
      .select('*')
      .eq('nim', nim)
      .single();

    if (error || !peserta) {
      throw new Error('Data peserta dengan NIM tersebut tidak ditemukan.');
    }

    if (peserta) {
      const { data, error } = await supabase
        .from('presensi')
        .update({ tugas_1: url })
        .eq('nim', nim)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (err) {
    console.error("Error inserting tugas_1:", err);
    throw err;
  }
}
