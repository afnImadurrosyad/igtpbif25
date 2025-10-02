"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
const getStyleByIndex = (index, isMobile) => {
  if (isMobile) {
    const useLight = index % 2 === 0;
    return {
      container: useLight
        ? "bg-[#DCE2B7] text-[#5a5a3d]"
        : "bg-[#5a5a3d] text-[#DCE2B7]",
      textColor: useLight ? "text-[#2F2F30]" : "text-white",
    };
  }

  if (index === 0) {
    return {
      container: "bg-[#DCE2B7] text-[#5a5a3d]",
      textColor: "text-[#2F2F30]",
    };
  }

  const block = Math.floor((index - 1) / 2);
  const useDark = block % 2 === 0;
  return {
    container: useDark
      ? "bg-[#5a5a3d] text-[#DCE2B7]"
      : "bg-[#DCE2B7] text-[#5a5a3d]",
    textColor: useDark ? "text-white" : "text-[#2F2F30]",
  };
};

const HasilPencarian = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const containerDataRef = useRef(null);
  const containerNamaRef = useRef(null);
  const containerNimRef = useRef(null);
  const containerKelompokRef = useRef(null);
  const containerDaplokRef = useRef(null);
  const containerBtnRef = useRef(null);
  const btnContactDaplokRef = useRef(null);
  const containerOtherMembersRef = useRef(null);
  const titleOtherMembersRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      // Set initial state untuk semua elemen
      gsap.set(
        [
          containerRef.current,
          titleRef.current,
          containerDataRef.current,
          containerNamaRef.current,
          containerNimRef.current,
          containerKelompokRef.current,
          containerDaplokRef.current,
          containerBtnRef.current,
          containerOtherMembersRef.current,
          titleOtherMembersRef.current,
        ],
        { opacity: 0 }
      );

      // Timeline dengan animasi yang bervariasi
      const tl = gsap.timeline();

      // Container - Fade in dengan scale
      tl.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      )
        // Title - Slide dari atas
        .fromTo(
          titleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.6"
        )
        // Container data - Fade in dengan rotation
        .fromTo(
          containerDataRef.current,
          { opacity: 0, rotation: -5 },
          { opacity: 1, rotation: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        // Data fields dengan stagger dan animasi berbeda
        .fromTo(
          containerNamaRef.current,
          { opacity: 0, x: -80, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.6"
        )
        .fromTo(
          containerNimRef.current,
          { opacity: 0, x: 80, rotationY: 90 },
          { opacity: 1, x: 0, rotationY: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          containerKelompokRef.current,
          { opacity: 0, y: 50, skewY: 5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          containerDaplokRef.current,
          { opacity: 0, scale: 0.3 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        // Button dengan bounce effect
        .fromTo(
          containerBtnRef.current,
          { opacity: 0, y: 100, scale: 0.5 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "bounce.out" },
          "-=0.3"
        )
        // Other members container - slide dari kanan
        .fromTo(
          containerOtherMembersRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.7"
        )
        // Title other members - typewriter effect simulation
        .fromTo(
          titleOtherMembersRef.current,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            transformOrigin: "left center",
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  useEffect(() => {
    // Cek apakah layar kecil (misal < 768px dianggap mobile)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  if (!data) return null;

  return (
    <div
      ref={containerRef}
      className="bg-[#5a5a3d] text-white p-6 sm:p-8 rounded-2xl max-w-5xl mx-auto shadow-xl"
    >
      <h2
        ref={titleRef}
        className="text-center text-lg font-medium text-white mb-8"
      >
        Data ditemukan
      </h2>

      <div
        ref={containerDataRef}
        className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8"
      >
        <div ref={containerNamaRef}>
          <p className="text-sm text-lime-100">Nama</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {data.nama}
          </p>
        </div>
        <div ref={containerNimRef}>
          <p className="text-sm text-lime-100">NIM</p>
          <p className="text-xl sm:text-2xl font-bold text-white">{data.nim}</p>
        </div>
        <div ref={containerKelompokRef}>
          <p className="text-sm text-lime-100">Kelompok</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {data.kelompok}
          </p>
        </div>
        <div ref={containerDaplokRef}>
          <p className="text-sm text-lime-100">Daplok</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {data.daplok}
          </p>
        </div>
      </div>

      <div ref={containerBtnRef} className="text-center mb-10">
        <button
          ref={btnContactDaplokRef}
          className="bg-white text-[#5a5a3d] font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200"
          onClick={() => {
            if (data.nomerDpl) {
              window.open(`https://wa.me/${data.nomerDpl}`, "_blank");
            }
          }}
        >
          Hubungi Daplok
        </button>
      </div>

      {/* Daftar Anggota Lainnya */}
      <div
        ref={containerOtherMembersRef}
        className="bg-[#F7F1E7] p-6 rounded-lg text-[#2F2F30]"
      >
        <h3
          ref={titleOtherMembersRef}
          className="text-lg font-medium text-[#5a5a3d] mb-4"
        >
          Anggota Lainnya
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.anggotaLainnya.map((anggota, index) => {
            const { container, textColor } = getStyleByIndex(index, isMobile);
            return (
              <div
                key={anggota.nim ?? index}
                className={`flex justify-between items-center p-4 rounded-lg ${container}`}
              >
                <p className={`font-medium ${textColor}`}>{anggota.nama}</p>
                <p className={textColor}>{anggota.nim}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HasilPencarian;
