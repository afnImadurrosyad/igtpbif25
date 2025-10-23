"use client";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function PresensiPeserta() {
  const theme = {
    primary: "#DCE2B7",
    bg: "#F7F1E7",
    accent: "#686232",
    text: "#5A5A3D",
  };

  const [sizeQr, setSizeQr] = useState(320);
  const [sudahAbsen, setSudahAbsen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [presensiInfo, setPresensiInfo] = useState(null);
  const { user, nim, namaPeserta } = useAuth();

  // Handle responsive QR size
  useEffect(() => {
    const handleResize = () => {
      setSizeQr(window.innerWidth < 786 ? 220 : 320);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cek apakah sudah absen hari ini
  useEffect(() => {
    const checkAbsensi = async () => {
      if (!nim) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const today = new Date().toISOString().split("T")[0];

        const { data, error } = await supabase
          .from("presensi")
          .select("*")
          .eq("nim", nim)
          .gte("waktu", `${today}T00:00:00`)
          .lte("waktu", `${today}T23:59:59`);

        if (error) {
          console.error("Error checking absensi:", error);
        } else if (data && data.length > 0) {
          setSudahAbsen(true);
          setPresensiInfo(data[0]);
          console.log("Sudah absen hari ini:", data[0]);
        } else {
          setSudahAbsen(false);
        }
      } catch (err) {
        console.error("Error in checkAbsensi:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAbsensi();
  }, [nim]);

  // Loading state saat belum login
  if (!user) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ backgroundColor: theme.bg }}
      >
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

  // Loading state saat cek database
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: theme.primary }}
      >
        <div
          className="w-full max-w-md p-8 rounded-xl shadow-md"
          style={{ backgroundColor: theme.bg }}
        >
          <div className="text-center">
            <div
              className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 mb-4"
              style={{ borderTopColor: theme.accent }}
            ></div>
            <p style={{ color: theme.text }} className="font-medium">
              Mengecek status presensi...
            </p>
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
          {/* Informasi Peserta */}
          <div className="text-base text-center space-y-2">
            {namaPeserta?.nama ? (
              <div style={{ color: theme.text }}>
                <span className="font-medium">Nama:</span>{" "}
                <b>{namaPeserta.nama}</b>
              </div>
            ) : null}
            <div style={{ color: theme.text }}>
              <span className="font-medium">NIM:</span> <b>{nim}</b>
            </div>
          </div>

          {/* Kondisi: Sudah Absen atau Belum */}
          {sudahAbsen ? (
            // Tampilan jika SUDAH ABSEN
            <div className="py-6 space-y-4">
              <div className="flex justify-center">
                <div
                  className="rounded-full p-4"
                  style={{ backgroundColor: "#22c55e" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold" style={{ color: "#15803d" }}>
                  ✅ Sudah Presensi Hari Ini
                </h3>
                <p className="text-sm" style={{ color: "#16a34a" }}>
                  Anda sudah tercatat hadir pada hari ini
                </p>

                {presensiInfo && (
                  <div
                    className="rounded-lg p-4 text-left space-y-2 mt-4"
                    style={{
                      backgroundColor: "white",
                      border: `1px solid ${theme.accent}`,
                    }}
                  >
                    <div className="text-sm" style={{ color: theme.text }}>
                      <span className="font-semibold">📅 Waktu Presensi:</span>
                      <br />
                      {new Date(presensiInfo.waktu).toLocaleString("id-ID", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </div>
                    {presensiInfo.admin_nama && (
                      <div className="text-sm" style={{ color: theme.text }}>
                        <span className="font-semibold">👤 Dicatat oleh:</span>
                        <br />
                        {presensiInfo.admin_nama}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Tampilan jika BELUM ABSEN (tampilkan QR Code)
            <>
              <div className="flex justify-center w-full">
                <div
                  className="p-3 rounded-xl shadow-sm flex items-center justify-center"
                  style={{
                    backgroundColor: theme.primary,
                    border: `1.5px solid ${theme.accent}`,
                    padding: window.innerWidth < 640 ? "0.75rem" : "1rem",
                    maxWidth: "90vw",
                  }}
                >
                  <div
                    className="flex justify-center items-center"
                    style={{
                      width: "100%",
                      maxWidth: sizeQr + 16,
                    }}
                  >
                    <QRCodeSVG
                      size={sizeQr}
                      value={nim}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: sizeQr,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="text-center text-sm font-medium pt-2"
                style={{ color: theme.text }}
              >
                📱 Berikan QR ini kepada daplok/mentor untuk discan
              </div>

              <div
                className="text-center text-xs pt-1"
                style={{ color: "#6b7280" }}
              >
                QR Code akan hilang otomatis setelah presensi tercatat
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
