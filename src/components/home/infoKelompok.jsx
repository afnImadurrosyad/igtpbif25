"use client";
import { useState, useRef, useEffect } from "react";
import { findPesertaByNim } from "../../api/pesertaApi2.jsx";
import HasilPencarian from "./hasilPencarian.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function InfoKelompok() {
  const [nimInput, setNimInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (nimInput.length !== 9 || !/^\d+$/.test(nimInput)) {
      setError("NIM harus terdiri dari 9 angka.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    try {
      const result = await findPesertaByNim(nimInput);
      setSearchResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Animasi GSAP
  const containerRef = useRef(null);
  const titleFindGroup = useRef(null);
  const inputFindGroup = useRef(null);
  const btnFindGroup = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const refs = [
        { el: titleFindGroup.current, anim: { opacity: 0, y: 50 }, opts: { opacity: 1, y: 0, duration: 1 } },
        { el: inputFindGroup.current, anim: { opacity: 0, x: -50 }, opts: { opacity: 1, x: 0, duration: 1, delay: 0.2 } },
        { el: btnFindGroup.current, anim: { opacity: 0, y: 100, scale: 0.8 }, opts: { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)", delay: 0.4 } },
      ];
  
      refs.forEach(({ el, anim, opts }) => {
        if (!el) return;
        gsap.fromTo(
          el,
          anim,
          {
            ...opts,
            ease: opts.ease || "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);
    return () => {
      if (ctx) ctx.revert(); // Mengembalikan semua elemen ke state normal
    };
  }, []);
  return (
    // Latar belakang utama diubah menjadi White Flour
    <section
      className="min-h-screen bg-gradient-to-br from-[#E8EDCC] via-[#DCE2B7] to-[#E8EDCC] flex flex-col items-center p-4 pt-12 font-sans"
      id="cariKelompok"
    >
      <div ref={containerRef} className="mt-44 flex flex-col items-center w-full">
        <h1 ref={titleFindGroup} className="text-3xl lg:text-5xl font-bold text-center text-[#5a5a3d] mb-9">
          Cari Kelompokmu Disini
        </h1>
        {/* Bagian Input Pencarian */}
        <div ref={containerRef} className="justify-center w-full max-w-lg mb-8">
          {/* Warna teks header diubah menjadi Tricorn Black */}
          {/* <h1 className="text-3xl font-bold text-center mb-4 text-[#2F2F30]">Cari Data Kelompok Peserta</h1> */}
          <div className="flex gap-2">
            {/* Styling input diubah kembali ke putih dengan teks hitam */}
            <input ref={inputFindGroup}
              type="text"
              value={nimInput}
              onChange={(e) => setNimInput(e.target.value)}
              className="flex-1 max-w- px-4 py-3 border border-gray-300 bg-[#F7F1E7] text-[#5a5a3d] placeholder-[#5a5a3d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a5a3d]"
              placeholder="Masukkan 9 digit NIM"
              maxLength={9}
            />
            {/* Styling tombol diubah menjadi Saguaro dengan teks putih */}
            <button ref={btnFindGroup}
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-[#F7F1E7] text-[#7A7449] font-semibold rounded-md hover:bg-[#5a5a3d] hover:text-[#F7F1E7] transition-colors duration-200 disabled:bg-gray-400"
            >
              {isLoading ? "Mencari..." : "Cari"}
            </button>
          </div>
        </div>

        {/* Area untuk menampilkan hasil, error, atau loading */}
        <div className="w-full">
          {/* Warna teks loading & error disesuaikan */}
          {isLoading && (
            <p className="text-center text-[#5a5a3d]">Loading...</p>
          )}
          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}
          {searchResult && <HasilPencarian data={searchResult} />}
        </div>
      </div>
    </section>
  );
}

export default InfoKelompok;
