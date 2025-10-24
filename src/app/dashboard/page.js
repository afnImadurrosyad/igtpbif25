'use client';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { useAuth } from '@/contexts/AuthContext';

export default function Page() {
  const { role } = useAuth();

  // Jika role belum siap (undefined/null), tampilkan placeholder ringan
  if (!role) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-600'>Menentukan role pengguna...</p>
      </div>
    );
  }

  // Role user → peserta
  if (role === 'user') {
    return <DashPeserta />;
  }

  // Role admin / mentor / daplok → admin dashboard
  if (['admin', 'mentor', 'daplok'].includes(role)) {
    return <DashAdmin />;
  }

  // Fallback jika role tidak dikenali
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p className='text-red-600'>Unauthorized: Role tidak dikenali.</p>
    </div>
  );
}
