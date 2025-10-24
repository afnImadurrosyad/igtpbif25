'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { saveRoleToLocal, getRoleFromLocal } from '@/utils/localRole';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';

export default function Page() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const localRole = getRoleFromLocal();

    if (localRole) {
      console.log('🧠 Role ditemukan di localStorage:', localRole);
      setRole(localRole);
    } else {
      console.log('🔍 Role belum ada, cek ke Supabase...');
      checkRoleOnce(setRole);
    }
  }, []);

  useEffect(() => {
    // Simpan otomatis setiap kali role berubah
    if (role) saveRoleToLocal(role);
  }, [role]);

  if (!role) {
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

async function checkRoleOnce(setRole) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.warn('Belum login');
      setRole(null);
      return;
    }

    console.log('Cek role untuk:', user.email);

    const email = user.email;
    const match = email.match(/\.(\d+)@student\.itera\.ac\.id$/);

    if (!match) {
      console.log('Format email tidak sesuai pola NIM');
      setRole('guest');
      return;
    }

    const nimValue = match[1];

    // 🔹 Cek di tabel dataif25
    const { data: dataPeserta, error: err1 } = await supabase
      .from('dataif25')
      .select('nama')
      .eq('nim', String(nimValue))
      .maybeSingle();

    if (dataPeserta) {
      console.log('✅ Ditemukan di dataif25 sebagai peserta');
      setRole('user');
      saveRoleToLocal('user');
      return;
    }

    // 🔹 Jika tidak ada di dataif25, cek di tabel users
    const { data: dataUser } = await supabase
      .from('users')
      .select('role')
      .eq('nim', String(nimValue))
      .maybeSingle();

    if (dataUser) {
      console.log('✅ Ditemukan di users dengan role:', dataUser.role);
      setRole(dataUser.role);
      saveRoleToLocal(dataUser.role);
      return;
    }

    console.warn('⚠️ Tidak ditemukan di kedua tabel');
    setRole('guest');
    saveRoleToLocal('guest');
  } catch (err) {
    console.error('Fatal error in checkRoleOnce:', err);
    setRole('guest');
    saveRoleToLocal('guest');
  }
}
