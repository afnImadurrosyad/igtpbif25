'use client';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { useAuth } from '@/contexts/AuthContext';

export default function Page() {
  const { role, loading } = useAuth();

  // Tampilkan loading dulu sampai data user siap
  if (role === undefined || role === null) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-600'>Memuat data pengguna...</p>
      </div>
    );
  }

  // Render berdasarkan role
  if (role === 'user') {
    return <DashPeserta />;
  }

  if (role === 'admin') {
    return <DashAdmin />;
  }

  // fallback jika role tidak dikenal
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p className='text-red-600'>Unauthorized: Role tidak dikenali.</p>
    </div>
  );
}
