"use client";
import DashAdmin from "@/components/dashboard/dashAdmin";
import DashPeserta from "@/components/dashboard/dashPeserta";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const { role, isLogin } = useAuth();

  // Loading while waiting role resolution from AuthContext
  if (isLogin && !role) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Menentukan role pengguna...</p>
      </div>
    );
  }

  // Not logged in
  if (!isLogin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">
          Silakan login untuk mengakses dashboard.
        </p>
      </div>
    );
  }

  if (role === "user") return <DashPeserta />;
  if (["admin", "mentor", "daplok"].includes(role)) return <DashAdmin />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-600">Unauthorized: Role tidak dikenali.</p>
    </div>
  );
}
