'use client';
import NavbarDash from '@/components/dashboard/dashNavbar';
import DashboardKehadiran from '@/components/dashboard/admin/dashKehadiran';
import DashPeserta from '@/components/dashboard/admin/dashPeserta';
import DashboardProfil from '@/components/dashProfilePeserta';
import DashTugas from '@/components/dashboard/admin/dashTugasAdmin';
import PresensiAdmin from '@/components/presensi/presensiAdmin';
import { useState, useEffect } from 'react';
import {
  ambilDataPresensi,
  getAllPeserta,
  getTugasPeserta,
} from '@/api/pesertaApi2';

export default function Page() {
  const [activeNavId, setActiveNavId] = useState('dashboard');
  const [kehadiran, setKehadiran] = useState([]);
  const [peserta, setPeserta] = useState([]);
  const [tugas, setTugas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilDataPresensi();
      setKehadiran(data);
    };
    fetchData();
    const fetchPeserta = async () => {
      const data = await getAllPeserta();
      setPeserta(data);
    };
    fetchPeserta();
    const fetchTugas = async () => {
      const data = await getTugasPeserta();
      setTugas(data);
    };
    fetchTugas();
  }, []);

  // console.log('Peserta data:', peserta);
  // console.log('kehadiran data:', kehadiran);

  const handleNavItemClick = (itemId) => {
    setActiveNavId(itemId);
  };

  const renderContent = () => {
    switch (activeNavId) {
      case 'dashboard':
        return <DashboardKehadiran data={kehadiran} />;
      case 'peserta':
        return <DashPeserta data={peserta} />;
      case 'profil':
        return <DashboardProfil />;
      case 'tugas':
        return <DashTugas data={tugas} />;
      case 'presensi':
        return <PresensiAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className='m-0 min-h-screen bg-[#F7F1E7]'>
      <div className='flex min-h-screen'>
        <NavbarDash
          onNavItemClick={handleNavItemClick}
          activeId={activeNavId}
        />
        <div className='w-full'>{renderContent()}</div>
      </div>
    </div>
  );
}
