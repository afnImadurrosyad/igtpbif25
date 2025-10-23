'use client'
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { useAuth } from '@/contexts/AuthContext';

export default function Page() {
  const { role } = useAuth();
  if (role == 'user') {
    return <DashPeserta />;
  } else if (role == 'admin') {
    return <DashAdmin />;
  }
}
