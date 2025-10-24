'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';

export default function Page() {
  const [roles, setRoles] = useState(null);
  const { role, checkRole } = useAuth();

  useEffect(() => {
    if (!roles || !role) {
      const interval = setInterval(async () => {
        console.log('⏳ Mengecek role ulang...... role saat ini' + role);
        await checkRole();
        setRoles(role);
      }, 1000);

      return () => clearInterval(interval); // bersihkan interval saat unmount
    }
  }, [role, checkRole, roles]);

  if (!roles) {
    console.log('🚫 Belum ada role');
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-600'>Menentukan role pengguna...</p>
      </div>
    );
  }

  if (roles === 'user') {
    console.log('✅ Role user terdeteksi');
    return <DashPeserta />;
  }

  if (['admin', 'mentor', 'daplok'].includes(roles)) {
    console.log('✅ Role admin/mentor/daplok terdeteksi');
    return <DashAdmin />;
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p className='text-red-600'>Unauthorized: Role tidak dikenali.</p>
    </div>
  );
}
