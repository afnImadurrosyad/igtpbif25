import NavbarDash from '@/components/dashboard/dashNavbar';
import DashboardProfil from '@/components/dashProfilePeserta';
import DashTugas from '@/components/dashboard/peserta/dashTugas';
import PresensiPeserta from '@/components/presensi/presensiPeserta';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function Page() {
  const [activeNavId, setActiveNavId] = useState('profil'); // Default ke 'profil' untuk peserta
  const { role } = useAuth();

  const handleNavItemClick = (itemId) => {
    console.log('Nav item clicked:', itemId);
    setActiveNavId(itemId);
    // Tidak perlu switch di sini, cukup set state. Rendering dilakukan di JSX return.
  };

  // Komponen konten berdasarkan activeNavId (khusus untuk peserta)
  const renderContent = () => {
    switch (activeNavId) {
      case 'profil':
        return <DashboardProfil />;
      case 'tugas':
        return <DashTugas />;
      case 'presensi':
        return <PresensiPeserta />;
      default:
        return <DashboardProfil />; // Fallback ke profil jika id tidak dikenali
    }
  };

  // Opsional: Cek role jika diperlukan (misal hanya peserta boleh akses)
  // if (role !== 'peserta') {
  //   return <div>Akses ditolak</div>;
  // }

  return (
    <div className="m-0">
      <div className="flex">
        <div>
          {/* Pastikan NavbarDash menerima prop onNavItemClick dan memanggilnya saat item diklik */}
          <NavbarDash onNavItemClick={handleNavItemClick} activeId={activeNavId} />
        </div>
        <div className="w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}