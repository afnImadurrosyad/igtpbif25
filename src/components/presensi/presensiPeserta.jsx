"use client";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function PresensiPeserta() {
  const theme = {
    primary: "#DCE2B7",
    bg: "#F7F1E7",
    accent: "#686232",
    text: "#5A5A3D",
  };
  const [sizeQr, setSizeQr] = useState(320);
  useEffect(()=>{
    const handleResize = () => {
      setSizeQr(window.innerWidth < 786 ? 220 : 320);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])
  const { user, nim, namaPeserta } = useAuth();

  if (!user) {
    return (
      <div>
        <h2 className="text-xl font-semibold">QR Presensi Peserta</h2>
        <div className="text-sm text-gray-600 mt-2">Memuat identitas...</div>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: theme.primary }}
    >
      <div
        className="w-full max-w-xl rounded-2xl shadow-md p-8"
        style={{ backgroundColor: theme.bg }}
      >
        <h2 className="text-xl font-semibold" style={{ color: theme.text }}>
          QR Presensi Peserta
        </h2>
        <div className="border rounded p-4 space-y-2">
          <div className="text-base pb-4">
            {namaPeserta.nama ? (
              <div style={{ color: theme.text }}>
                Nama: <b>{namaPeserta.nama}</b>
              </div>
            ) : null}
            <div style={{ color: theme.text }}>
              NIM: <b>{nim}</b>
            </div>
          </div>
          <div className="flex justify-center">
            <QRCodeSVG size={sizeQr} value={nim}></QRCodeSVG>
          </div>
          <div
            className="text-center text-sm font-semibold pt-4"
            style={{ color: theme.text }}
          >
            Berikan QR ini kepada daplok/mentor untuk discan
          </div>
        </div>
      </div>
    </div>
  );
}
