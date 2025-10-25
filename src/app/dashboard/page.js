'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getRoleFromLocal } from '@/utils/localRole';

export default function Page() {
  const { isLogin, isLoading } = useAuth();
  const [role, setRole] = useState(getRoleFromLocal());
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isLogin) {
      router.replace('/login');
    }
  }, [isLogin, isLoading, router]);

  // Show loading during auth initialization
  if (isLoading) {
    return <LoadingSpinner message='Memuat...' />;
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
