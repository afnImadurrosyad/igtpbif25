'use client';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';

export default function Page() {
  const { role, checkRole, nim, user } = useAuth();

  useEffect(() => {
    if (!role) {
      const interval = setInterval(async () => {
        console.log('⏳ Mengecek role ulang...... role saat ini' + role);
        await checkRole();
      }, 1000);

      return () => clearInterval(interval); // bersihkan interval saat unmount
    }
  }, [role, checkRole]);

  if (!role) {
    console.log('AuthContext saat ini:' + nim + role);
    console.log(user);
    console.log('🚫 Belum ada role');
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-600'>Menentukan role pengguna...</p>
      </div>
    );
  }

  if (role === 'user') {
    console.log('✅ Role user terdeteksi');
    return <DashPeserta />;
  }

  if (['admin', 'mentor', 'daplok'].includes(role)) {
    console.log('✅ Role admin/mentor/daplok terdeteksi');
    return <DashAdmin />;
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p className='text-red-600'>Unauthorized: Role tidak dikenali.</p>
    </div>
  );
}
