'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/utils/supabaseClient';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';

export default function Page() {
  const [role, setRole] = useState(null);
  const { user, nim } = useAuth();

  // useEffect(() => {
  //   if (!user) return;
  //   if (role) return;

  //   const interval = setInterval(async () => {
  //     console.log('⏳ Mengecek role ulang... role saat ini =', role);
  //     console.log('user saat ini');
  //     console.log(user);
  //     await checkRoleOnce(user, setRole);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [user, role]);

  if (!role) {
    checkRoleOnce(user, setRole);
    console.log(' saat ini:', nim, role);
    console.log(user);

    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-600'>Menentukan role pengguna...</p>
      </div>
    );
  }

  if (role === 'user') return <DashPeserta />;
  if (['admin', 'mentor', 'daplok'].includes(role)) return <DashAdmin />;

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p className='text-red-600'>Unauthorized: Role tidak dikenali.</p>
    </div>
  );
}

async function checkRoleOnce(user, setRole) {
  try {
    console.log('mulai');
    const email = user.email;
    const match = email.match(/\.(\d+)@student\.itera\.ac\.id$/);
    if (!match) {
      console.log('Format email tidak sesuai pola NIM');
      setRole('guest');
      return;
    }

    const nimValue = match[1];
    console.log(nimValue);
    const { data: dataPeserta } = await supabase
      .from('dataif25')
      .select('nama')
      .eq('nim', String(nimValue))
      .maybeSingle();
    console.log('berhasil di tabel 1');

    if (dataPeserta) {
      console.log('ada di peserta');
      setRole('user');
      return;
    }

    const { data: dataUser } = await supabase
      .from('users')
      .select('role')
      .eq('nim', String(nimValue))
      .maybeSingle();
    console.log('berhasil di tabel 2');

    if (dataUser) {
      console.log('ada di user');

      setRole(dataUser.role);
      return;
    }

    setRole('guest');
  } catch (err) {
    console.error('Fatal error in checkRoleOnce:', err);
    setRole('guest');
  }
}
