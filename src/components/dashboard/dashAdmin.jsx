'use client';
import NavbarDash from '@/components/dashboard/dashNavbar';
import DashboardKehadiran from '@/components/dashboard/admin/dashKehadiran';
import DashPeserta from '@/components/dashboard/admin/dashPeserta';
import DashboardProfil from '@/components/dashProfilePeserta';
import DashTugas from '@/components/dashboard/admin/dashTugasAdmin';
import DashTugas2 from '@/components/dashboard/admin/dashTugasAdmin2';
import PresensiAdmin from '@/components/presensi/presensiAdmin';
import { useState, useEffect } from 'react';

const DashAdmin = ({ dataHadir, dataPeserta, dataTugas, dataTugas2 }) => {
  const [activeNavId, setActiveNavId] = useState('dashboard');
  const [kehadiran, setKehadiran] = useState([]);
  const [peserta, setPeserta] = useState([]);
  const [tugas, setTugas] = useState([]);
  const [tugas2, setTugas2] = useState([]);

  useEffect(() => {
    if (dataHadir && Array.isArray(dataHadir)) {
      setKehadiran(dataHadir);
    }
    if (dataPeserta && Array.isArray(dataPeserta)) {
      setPeserta(dataPeserta);
    }
    if (dataTugas && Array.isArray(dataTugas)) {
      setTugas(dataTugas);
    }
    if (dataTugas2 && Array.isArray(dataTugas2)) {
      setTugas2(dataTugas2);
    }
  }, [dataHadir, dataTugas, dataPeserta, dataTugas2]);

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
      case 'tugas_2':
        return <DashTugas2 data={tugas2} />;
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
};

export default DashAdmin;
