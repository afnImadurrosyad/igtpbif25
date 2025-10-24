'use client';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function Page() {
  const { role, checkRole } = useAuth(); // pastikan AuthContext ada fungsi refreshRole
  const checking = false;

  const loopCheck = () => {
    console.log('loopcek jalan');
    setInterval(async () => {
      await checkRole(); // ambil ulang role dari Supabase
      console.log('masih ngecek role dari lop cek = ' + role + 'ini hasil nya');
    }, 1000); // cek tiap 2 detik
  };

  // Cek ulang role jika masih null
  useEffect(() => {
    if (!checking) {
      const interval = setInterval(async () => {
        await checkRole(); // ambil ulang role dari Supabase
        console.log('masih ngecek role = ' + role + 'ini hasil nya');
      }, 1000); // cek tiap 2 detik

      return () => clearInterval(interval);
    }
  }, [role, checking, checkRole]);

  // Jika role belum siap
  if (!role) {
    loopCheck();
    console.log('gaada role = ' + role);
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-600'>Menentukan role pengguna...</p>
      </div>
    );
  }

  // Role user → peserta
  if (role === 'user') {
    console.log('ada user = ' + role);
    return <DashPeserta />;
  } else {
    console.log('gaada user = ' + role);
    return <DashAdmin />;
  }

  // Fallback jika role tidak dikenali
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p className='text-red-600'>Unauthorized: Role tidak dikenali.</p>
    </div>
  );
}
