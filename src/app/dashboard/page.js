'use client';
import { useEffect, useState } from 'react';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { getRoleFromLocal } from '@/utils/localRole';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  const handleHome = () => {
    router.push('/');
  };
  // ambil role dari localStorage hanya sekali saat komponen mount
  useEffect(() => {
    const storedRole = getRoleFromLocal();
    setRole(storedRole);
  }, []);

  // tampilkan loading sementara role belum terambil
  if (!role) {
    console.log('role pasti null =', role);
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-700'>
        Memuat dashboard...
      </div>
    );
  }

  // arahkan sesuai role
  if (role === 'user') {
    console.log('aku user bang');
    return <DashPeserta />;
  } else if (role === 'admin' || role === 'mentor' || role === 'daplok') {
    console.log('anjay aku admin');
    return <DashAdmin />;
  } else {
    return (
      <div>
        <div className='min-h-screen flex items-center justify-center text-gray-700'>
          <div>Role tidak dikenali. atau program error</div>
          <button onClick={handleHome}>Kembali ke Beranda</button>
        </div>
      </div>
    );
  }
}
