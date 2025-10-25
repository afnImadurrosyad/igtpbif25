import { supabase } from "../utils/supabaseClient";

/**
 * Add or update tugas for a student
 * @param {string} nim - Student's NIM
 * @param {string} url - URL of the assignment
 * @returns {Promise<Object>} Updated data
 */
export async function addTugas(nim, url) {
  if (!nim || !url) {
    throw new Error("NIM dan URL tugas harus diisi.");
  }

  // Validate URL format
  try {
    new URL(url);
  } catch {
    throw new Error("Format URL tidak valid.");
  }

  try {
    const { data, error } = await supabase
      .from("presensi")
      .upsert({ nim: nim.trim(), tugas_1: url.trim() }, { onConflict: "nim" })
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error upserting tugas:", error);
      throw new Error("Gagal menyimpan tugas.");
    }

    return data;
  } catch (err) {
    console.error("Error in addTugas:", err);
    throw err;
  }
}

/**
 * Get tugas for a student
 * @param {string} nim - Student's NIM
 * @returns {Promise<Object>} Student's assignment data
 */
export async function getTugasByNim(nim) {
  if (!nim) {
    throw new Error("NIM harus diisi.");
  }

  try {
    const { data, error } = await supabase
      .from("presensi")
      .select("tugas_1")
      .eq("nim", nim.trim())
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching tugas:", error);
      throw new Error("Gagal mengambil data tugas.");
    }

    return data;
  } catch (err) {
    console.error("Error in getTugasByNim:", err);
    throw err;
  }
}
