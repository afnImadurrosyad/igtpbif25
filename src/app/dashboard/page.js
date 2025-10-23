'use client';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { useAuth } from '@/contexts/AuthContext';

export default function Page() {
  const { role, loading } = useAuth(); // pastikan kamu punya state loading di AuthContext

  if (loading) return <p>Loading...</p>;

  if (role === 'user') {
    return <DashPeserta />;
  } else if (role === 'admin') {
    return <DashAdmin />;
  } else {
    return <p>Unauthorized or no role detected.</p>;
  }
}
