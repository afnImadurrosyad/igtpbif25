"use client";

import { useState } from "react";
import { addTugas } from "../../../../api/tugasApi";
import { useAuth } from '../../../../contexts/AuthContext';

export default function TugasForm() {

  const { isLogin, user, nim } = useAuth();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("sending");
    e.preventDefault();

    if (!nim || !url) {
      alert("Harap isi NIM dan URL tugas terlebih dahulu!");
      return;
    }
      console.log("nim : ",nim);
      console.log("url : ",url);

    try {
      setLoading(true);
      const res = await addTugas(nim, url);
      console.log("Data berhasil disimpan:", res);
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Pengumpulan Tugas 1
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Tugas
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Masukkan URL tugas Anda"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Mengirim..." : "Kumpulkan Tugas"}
        </button>
      </form>
    </div>
  );
}
