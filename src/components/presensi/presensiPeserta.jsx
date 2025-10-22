"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { getCurrentPeserta } from "@/utils/identity";
export default function PresensiPeserta() {
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const id = await getCurrentPeserta();
        if (alive) setIdentity(id);
      } catch (e) {
        if (alive) setErr(e?.message || "Gagal memuat identitas");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  const payload = useMemo(() => {
    if (!identity?.nim) return "";
    return JSON.stringify({
      nim: String(identity.nim).trim(),
      nama: identity.nama || "",
      kelompok: identity.kelompok || "",
      timestamps: Date.now(),
      v: 1,
    });
  }, [identity]);
  if (loading) {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <h2 className="text-xl font-semibold">QR Presensi Peserta</h2>
        <div className="text-sm text-gray-600 mt-2">Memuat identitas...</div>
      </div>
    );
  }
  if (err) {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <h2 className="text-xl font-semibold">QR Presensi Peserta</h2>
        <div className="text-sm text-red-600 mt-2">Error: {err}</div>
        <Link
          href="/dev-login"
          className="inline-flex items-center gap-2 bg-blue-600 text-white rounded px-4 py-2"
        >
          Set identitas (DEV){" "}
        </Link>
      </div>
    );
  }
  if (!identity?.nim) {
    return (
      <div className="w-full max-w-xl mx-auto p-4">
        <h2 className="text-xl font-semibold">QR Presensi Peserta</h2>
        <div className="text-sm text-red-600 mt-2">
          Tidak ada session aktif. pilih peserta dari halaman dev login
        </div>
        <Link
          href="/dev-login"
          className="inline-flex items-center gap-2 bg-blue-600 text-white rounded px-4 py-2"
        >
          Buka dev login
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold">QR Presensi Peserta</h2>
      <div className="border rounded p-4 space-y-2">
        <div className="text-sm">
          <div>
            NIM: <b>{identity.nim}</b>
          </div>
          {identity.nama ? (
            <div>
              Nama: <b>{identity.nama}</b>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center">
            <QRCodeSVG size={220} value={payload}></QRCodeSVG>
        </div>
        <div className="text-center text-sm text-gray-600">
            Berikan QR ini kepada daplok/mentor untuk discan
        </div>
        <div className="text-xs text-gray-500">
            Sumber identitas: {identity.source}
        </div>
        <div className="flex gap-2">
            <Link href="/dev-login" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-sm">
                Ganti identitas (Dev)
            </Link>
            <Link href="/dev-logout" className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 rounded px-3 py-2 text-sm text-red-700">
                Hapus session (Dev)
            </Link>
        </div>
      </div>
    </div>
  );
}
