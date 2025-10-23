import NavbarDash from '@/components/dashboard/dashNavbar';
import DashboardKehadiran from '@/components/dashboard/admin/dashKehadiran';
import DashPeserta from '@/components/dashboard/admin/dashPeserta';
import DashboardProfil from '@/components/dashProfilePeserta';
import DashTugas from '@/components/dashboard/peserta/dashTugas';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function Page() {
  const [activeNavId, setActiveNavId] = useState('dashboard'); // Default bisa di-set ke 'dashboard' jika ingin tampil awal
  const { role } = useAuth();

  const handleNavItemClick = (itemId) => {
    console.log('Nav item clicked:', itemId);
    setActiveNavId(itemId);
    // Tidak perlu switch di sini, cukup set state. Rendering dilakukan di JSX return.
  };

  // Komponen konten berdasarkan activeNavId
  const renderContent = () => {
    switch (activeNavId) {
      case 'dashboard':
        return <DashboardKehadiran />;
      case 'peserta':
        return <DashPeserta />;
      case 'profil':
        return <DashboardProfil />;
      case 'tugas':
        return <DashTugas />;
      default:
        return null; // Atau tampilkan loading/default content
    }
  };

  // Opsional: Cek role jika diperlukan (misal hanya admin boleh akses)
  // if (role !== 'admin') {
  //   return <div>Akses ditolak</div>;
  // }

  return (
    <div className='m-0 min-h-screen bg-[#F7F1E7] '>
      <div className='flex min-h-screen'>
        <div>
          {/* Pastikan NavbarDash menerima prop onNavItemClick dan memanggilnya saat item diklik */}
          <NavbarDash
            onNavItemClick={handleNavItemClick}
            activeId={activeNavId}
          />
        </div>
        <div className='w-full'>{renderContent()}</div>
      </div>
    </div>
  );
}
