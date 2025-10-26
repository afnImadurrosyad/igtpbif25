'use client';
import { useEffect, useState } from 'react';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { getRoleFromLocal } from '@/utils/localRole';
import { useRouter } from 'next/navigation';
import {
  ambilDataPresensi,
  getAllPeserta,
  getTugasPeserta,
} from '@/api/pesertaApi2';

export default function Page() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [kehadiran, setKehadiran] = useState([]);
  const [peserta, setPeserta] = useState([]);
  const [tugas, setTugas] = useState([]);

  useEffect(() => {
    const storedRole = getRoleFromLocal();
    setRole(storedRole);
  }, []);

  console.log('ini role sudah = ', role);

  useEffect(() => {
    const fetchData = async () => {
      console.log('mulai fetch');
      const data = await ambilDataPresensi();
      setKehadiran(data);
    };
    fetchData();
    const fetchPeserta = async () => {
      console.log('mulai fetch 2');
      const data = await getAllPeserta();
      setPeserta(data);
    };
    fetchPeserta();
    const fetchTugas = async () => {
      console.log('mulai fetch 3');
      const data = await getTugasPeserta();
      setTugas(data);
    };
    fetchTugas();
  }, []);

  const handleHome = () => {
    router.push('/');
  };
  // ambil role dari localStorage hanya sekali saat komponen mount

  // tampilkan loading sementara role belum terambil
  if (!role) {
    console.log('role pasti null =', role);
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-700'>
        <div>Memuat Dashboard</div>
        <button onClick={handleHome}>Kembali ke beranda</button>
      </div>
    );
  }

  // arahkan sesuai role
  if (role === 'user') {
    console.log('aku user bang');
    return <DashPeserta />;
  } else if (role === 'admin' || role === 'mentor' || role === 'daplok') {
    console.log('anjay aku admin');
    return (
      <DashAdmin
        dataHadir={kehadiran}
        dataPeserta={peserta}
        dataTugas={tugas}
      />
    );
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

  // Loading while waiting role resolution from AuthContext
  if (isLogin && !role) {
    return <LoadingSpinner message='Menentukan role pengguna...' />;
  }

  // Not logged in (will redirect)
  if (!isLogin) {
    return null;
  }

  if (role === 'user') return <DashPeserta />;
  if (['admin', 'mentor', 'daplok'].includes(role)) return <DashAdmin />;

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <p className='text-red-600'>Unauthorized: Role tidak dikenali.</p>
    </div>
  );
}
