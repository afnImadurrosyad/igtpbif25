import { supabase } from '../utils/supabaseClient';

export async function addTugas(nim, url) {
  try {
    const { data, error } = await supabase
      .from('presensi')
      .upsert({ nim, tugas_1: url }, { onConflict: 'nim' })
      .select()
      .maybeSingle();
  } catch (err) {
    console.error('Error inserting tugas_1:', err);
    throw err;
  }
}
