import { supabase } from "../utils/supabaseClient";

/**
 * Find peserta by NIM with their group members
 * @param {string} nim - NIM of the student
 * @returns {Promise<Object>} Student data with group members
 */
export async function findPesertaByNim(nim) {
  if (!nim || typeof nim !== "string") {
    throw new Error("NIM harus berupa string yang valid.");
  }

  try {
    const { data: peserta, error } = await supabase
      .from("dataif25")
      .select("*")
      .eq("nim", nim.trim())
      .maybeSingle();

    if (error) {
      console.error("Error fetching peserta:", error);
      throw new Error("Gagal mengambil data peserta.");
    }

    if (!peserta) {
      throw new Error("Data peserta dengan NIM tersebut tidak ditemukan.");
    }

    // Fetch group members in parallel if peserta has a group
    let anggota = [];
    if (peserta.kelompok) {
      const { data: anggotaData, error: anggotaError } = await supabase
        .from("dataif25")
        .select("nim, nama")
        .eq("kelompok", peserta.kelompok)
        .neq("nim", peserta.nim);

      if (anggotaError) {
        console.error("Error fetching group members:", anggotaError);
        // Don't throw, just return empty array
      } else {
        anggota = anggotaData || [];
      }
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
    console.error("Error in findPesertaByNim:", err);
    throw err;
  }
}

/**
 * Get all peserta ordered by group
 * @returns {Promise<Array>} List of all students
 */
export async function getAllPeserta() {
  try {
    const { data, error } = await supabase
      .from("dataif25")
      .select("*")
      .order("kelompok", { ascending: true })
      .order("nama", { ascending: true });

    if (error) {
      console.error("Error fetching all peserta:", error);
      throw new Error("Gagal mengambil data peserta.");
    }

    return data || [];
  } catch (err) {
    console.error("Error in getAllPeserta:", err);
    throw err;
  }
}
