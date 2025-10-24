'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/utils/supabaseClient';

export default function Logout() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  useEffect(() => {
    const logout = async () => {
      try {
        // Hapus session Supabase
        const { error } = await supabase.auth.signOut();

        if (error) {
          console.error('Logout error:', error.message);
          alert('Gagal logout. Coba lagi.');
          return;
        }

        // Pastikan redirect setelah signOut selesai
        router.replace('/');
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    logout();
  }, [router, supabase]);

  return (
    <div className='bg-gray-200 text-gray-700 flex flex-col items-center justify-center min-h-screen text-center'>
      <h1 className='text-xl font-semibold mb-4'>Logging out...</h1>
      <p>Please wait while we sign you out.</p>
    </div>
  );
}
