"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { setDevNIM } from "@/utils/identity";

export default function Page() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const doSearch = async (e) => {
    e?.preventDefault?.();
    setLoading(true);
    setError("");
    setResult([]);
    try {
      let q = supabase.from("dataif25").select("nim, nama, kelompok").limit(10);
      if (/^\d+$/.test(query.trim())) {
        q = q.eq("nim", Number(query.trim()));
      } else {
        q = q.ilike("nama", `%${query.trim()}%`);
      }
      const { data, error } = await q;
      if (error) throw error;
      setResult(data || []);
    } catch (err) {
      setError(err?.message || "Gagal mencari data");
    } finally {
      setLoading(false);
    }
  };
  const choose = async (nim) => {
    setDevNIM(nim);
    router.push("/presensi/peserta");
  };
  return (
    <main className="min-h-[70vh] p-4">
      <div className="w-full max-w-lg mx-auto border rounded p-4 space-y-4">
        <h1 className="text-lg font-semibold">
          Dev Login (Pilih peserta dari DB)
        </h1>
        <form onSubmit={doSearch} className="flex gap-2">
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="Cari NIM (angka) atau Nama (teks)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2"
            disabled={loading}
          >
            {loading ? "Mencari..." : "Cari"}
          </button>
        </form>
        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        <div className="space-y-2">
          {result.map((r) => (
            <button
              key={r.nim}
              onClick={() => choose(r.nim)}
              className="w-full text-left border rounded p-2 hover:bg-gray-50"
            >
              <div className="font-medium">{r.nama || "(Tanpa Nama)"}</div>
              <div className="text-sm text-gray-600">
                NIM: {r.nim} {r.kelompok ? `• ${r.kelompok}` : ""}
              </div>
            </button>
          ))}
          {!loading && result.length === 0 && (
            <div className="text-gray-500">Tidak ada hasil</div>
          )}
        </div>
      </div>
    </main>
  );
}
