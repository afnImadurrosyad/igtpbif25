import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function PresensiAdmin() {
  const theme = {
    primary: "#DCE2B7",
    bg: "#F7F1E7",
    accent: "#686232",
    text: "#5A5A3D",
  };
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (result) => {
    if (result) {
      console.log("Scan result:", result);
      // Tambahkan logika untuk memproses hasil scan
      setIsScanning(false);
    }
  };

  const handleError = (error) => {
    console.error("Scanner error:", error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Presensi Admin</h1>

        {!isScanning ? (
          <button
            onClick={() => setIsScanning(true)}
            className="text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
            style={{ background: theme.text }}
          >
            Mulai Presensi
          </button>
        ) : (
          <div className="space-y-4">
            <Scanner
              onScan={handleScan}
              onError={handleError}
              constraints={{
                facingMode: "environment",
              }}
              styles={{
                container: {
                  width: "100%",
                  maxWidth: "500px",
                },
              }}
            />
            <button
              style={{ background: theme.text }}
              onClick={() => setIsScanning(false)}
              className="text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Tutup Scanner
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
