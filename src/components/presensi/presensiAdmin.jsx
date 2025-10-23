import { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

export default function PresensiAdmin() {
  const theme = {
    primary: "#DCE2B7",
    bg: "#F7F1E7",
    accent: "#686232",
    text: "#5A5A3D",
  };
  const { nim, role } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [scanStatus, setScanStatus] = useState(null); // 'success', 'error', 'duplicate'
  const [scanMessage, setScanMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [adminNama, setAdminNama] = useState(null);

  // Ambil nama admin dari tabel users berdasarkan NIM dari session
  useEffect(() => {
    const fetchAdminName = async () => {
      if (nim && role === "admin") {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("nama")
            .eq("nim", nim)
            .single();

          if (error) {
            console.error("Error fetching admin name:", error);
          } else {
            setAdminNama(data?.nama || null);
            console.log("Admin nama:", data?.nama);
          }
        } catch (err) {
          console.error("Error in fetchAdminName:", err);
        }
      }
    };

    fetchAdminName();
  }, [nim, role]);

  const handleScan = async (result) => {
    if (result && !isProcessing) {
      setIsProcessing(true);
      try {
        // Parse QR code data - asumsikan format JSON
        const qrData =
          typeof result === "string" ? result : result[0]?.rawValue;
        console.log("Scan result (raw):", qrData);
        console.log("Type of qrData:", typeof qrData);

        let pesertaData;
        let nim;

        try {
          const parsed = JSON.parse(qrData);
          console.log("Parsed as JSON:", parsed);

          // Cek apakah hasil parse adalah object dengan property nim
          if (typeof parsed === "object" && parsed !== null && parsed.nim) {
            pesertaData = parsed;
            nim = parsed.nim;
          } else if (typeof parsed === "number" || typeof parsed === "string") {
            // Jika hasil parse adalah number atau string langsung, gunakan sebagai NIM
            nim = String(parsed);
            pesertaData = { nim: nim };
          } else {
            throw new Error("Format tidak valid");
          }
        } catch (e) {
          // Jika bukan JSON, anggap sebagai NIM langsung
          nim = String(qrData);
          pesertaData = { nim: nim };
          console.log("Not JSON, using as NIM:", pesertaData);
        }

        console.log("Extracted NIM:", nim, "Type:", typeof nim);

        if (!nim || nim === "" || nim === "null" || nim === "undefined") {
          setScanStatus("error");
          setScanMessage("QR Code tidak valid - NIM tidak ditemukan");
          setIsProcessing(false);
          setTimeout(() => setScanStatus(null), 3000);
          return;
        }

        // Cek apakah peserta sudah presensi hari ini
        const today = new Date().toISOString().split("T")[0];
        console.log("Checking presensi for NIM:", nim, "on date:", today);

        const { data: existingPresensi, error: checkError } = await supabase
          .from("presensi")
          .select("*")
          .eq("nim", nim)
          .gte("waktu", `${today}T00:00:00`)
          .lte("waktu", `${today}T23:59:59`);

        console.log(
          "Existing presensi:",
          existingPresensi,
          "Error:",
          checkError
        );

        // Jika ada data presensi hari ini (array tidak kosong)
        if (existingPresensi && existingPresensi.length > 0) {
          setScanStatus("duplicate");
          setScanMessage(
            `Peserta ${pesertaData.nama || nim} sudah presensi hari ini`
          );
          setIsProcessing(false);
          setTimeout(() => {
            setScanStatus(null);
            setIsScanning(false);
          }, 2000);
          return;
        }

        // Simpan/Update data presensi ke database menggunakan upsert
        const { data, error } = await supabase
          .from("presensi")
          .upsert(
            {
              nim: nim || null,
              isHadir: true,
              waktu: new Date().toISOString(),
              admin_nama: adminNama || null,
            },
            {
              onConflict: "nim",
              ignoreDuplicates: false,
            }
          )
          .select();

        if (error) {
          console.error("Error saving presensi:", error);
          setScanStatus("error");
          setScanMessage(`Gagal menyimpan presensi: ${error.message}`);
        } else {
          console.log("Presensi saved:", data);
          setScanStatus("success");
          setScanMessage(
            `✅ Presensi berhasil dicatat untuk ${pesertaData.nama || nim}`
          );

          // Tutup scanner setelah 2 detik
          setTimeout(() => {
            setScanStatus(null);
            setIsScanning(false);
          }, 2000);
        }
      } catch (error) {
        console.error("Error processing scan:", error);
        setScanStatus("error");
        setScanMessage(`Error: ${error.message}`);
      } finally {
        setIsProcessing(false);
        // Reset status setelah 3 detik jika masih error
        if (scanStatus === "error") {
          setTimeout(() => setScanStatus(null), 3000);
        }
      }
    }
  };

  const handleError = (error) => {
    console.error("Scanner error:", error);
  };

  const toggleCamera = () => {
    setFacingMode((prevMode) =>
      prevMode === "environment" ? "user" : "environment"
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{ background: theme.bg }}
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center"
            style={{ color: theme.text }}
          >
            Presensi Admin
          </h1>

          {!isScanning ? (
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => setIsScanning(true)}
                className="w-full sm:w-auto text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105"
                style={{ background: theme.text }}
              >
                Mulai Presensi
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Status Message */}
              {scanStatus && (
                <div
                  className={`p-4 rounded-lg text-center font-semibold transition-all duration-300 ${
                    scanStatus === "success"
                      ? "bg-green-100 text-green-800 border-2 border-green-500"
                      : scanStatus === "duplicate"
                      ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-500"
                      : "bg-red-100 text-red-800 border-2 border-red-500"
                  }`}
                >
                  {scanMessage}
                </div>
              )}

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="text-center py-2">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                  <p className="mt-2 text-sm text-gray-600">Memproses...</p>
                </div>
              )}

              {/* Scanner Container */}
              <div className="relative rounded-lg overflow-hidden shadow-md">
                <Scanner
                  key={facingMode} // Force re-render when camera changes
                  onScan={handleScan}
                  onError={handleError}
                  constraints={{
                    facingMode: facingMode,
                  }}
                  styles={{
                    container: {
                      width: "100%",
                      aspectRatio: "1/1",
                    },
                  }}
                />

                {/* Overlay saat processing */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera Info */}
              <div className="text-center text-sm text-gray-600">
                <p>
                  Kamera:{" "}
                  <span className="font-semibold">
                    {facingMode === "environment" ? "Belakang" : "Depan"}
                  </span>
                </p>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={toggleCamera}
                  className="flex-1 bg-white border-2 font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow hover:shadow-md"
                  style={{ borderColor: theme.text, color: theme.text }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Ganti Kamera
                  </span>
                </button>
                <button
                  style={{ background: theme.accent }}
                  onClick={() => setIsScanning(false)}
                  className="flex-1 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow hover:shadow-md"
                >
                  Tutup Scanner
                </button>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mt-4">
                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  📱 Arahkan kamera ke QR code peserta untuk mencatat presensi
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
