"use client";
import { useEffect } from "react";
import Link from "next/link";
import { clearDevNIM } from "@/utils/identity";
export default function Page() {
  useEffect(() => {
    clearDevNIM();
  }, []);
  return (
    <main className="min-h-[60vh] p-4">
      <div className="w-full max-w-md mx-auto border rounded p-4 space-y-3">
        <h1 className="text-lg font-semibold">Session Dev Dihapus</h1>
        <p className="text-sm text-gray-700">
          NIM mock untuk sesi dev sudah di bersihkan dari browser
        </p>
        <div className="flex gap-2">
          <Link
            className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-sm px-3 py-2 text-sm"
            href="/dev-login"
          >
            Set Lagi
          </Link>
          <Link
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-sm px-3 py-2 text-sm"
            href="/presensi/peserta"
          >
            Ke halaman Qr peserta
          </Link>
        </div>
      </div>
    </main>
  );
}
