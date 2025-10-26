'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';
import { clearRoleFromLocal } from '@/utils/localRole';

export default function Logout() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  useEffect(() => {
    const logout = async () => {
      try {
        await supabase.auth.signOut();
        clearRoleFromLocal();
        router.push('/');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    logout();
  }, [router]);

  return (
    <div className=' bg-gray-200 text-gray-800 flex flex-col items-center justify-center min-h-screen text-center'>
      <h1 className='text-xl font-semibold mb-4'>Logging out...</h1>
      <p>Please wait while we sign you out.</p>
    </div>
  );
}
