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
  <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: theme.bg }}>
        <div
          className="rounded-xl shadow-md px-6 py-8 text-center"
          style={{ backgroundColor: theme.primary }}
        >
          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: theme.text }}
          >
            QR Presensi Peserta
          </h2>
          <div className="text-sm" style={{ color: theme.text }}>
            Memuat identitas...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: theme.primary }}
    >
      <div
        className="w-full max-w-md p-8"
        style={{
          backgroundColor: theme.primary,
          borderColor: theme.accent,
        }}
      >
        <h2
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: theme.text }}
        >
          QR Presensi Peserta
        </h2>

<div
          className="border rounded-xl p-5 shadow-inner space-y-4"
          style={{
            backgroundColor: theme.bg,
            borderColor: theme.accent,
          }}
        >
          <div className="text-base text-center space-y-2">
            {namaPeserta.nama ? (
              <div style={{ color: theme.text }}>
                <span className="font-medium">Nama:</span>{" "}
                <b>{namaPeserta.nama}</b>
              </div>
            ) : null}
            <div style={{ color: theme.text }}>
              <span className="font-medium">NIM:</span> <b>{nim}</b>
            </div>
          </div>
          
        <div className="flex justify-center w-full">
            <div
              className="p-3 rounded-xl shadow-sm flex items-center justify-center"
              style={{
                backgroundColor: theme.primary,
                border: `1.5px solid ${theme.accent}`,
                padding: window.innerWidth < 640 ? "0.75 rem" : "1 rem",
                maxWidth: "90vw", 
              }}
            >
            <div className="flex justify-center items-center"
            style={{
              width: "100%",
              maxWidth: sizeQr + 16,
            }}>
              <QRCodeSVG size={sizeQr} value={nim} 
            style={{
              width: "100%",
              height: "auto",
              maxWidth: sizeQr,
            }}/>
            </div>
            </div>
          </div>

          <div
            className="text-center text-sm font-medium pt-2"
            style={{ color: theme.text }}
          >
            Berikan QR ini kepada daplok/mentor untuk discan
          </div>
        </div>
      </div>
    </div>
  );
}
