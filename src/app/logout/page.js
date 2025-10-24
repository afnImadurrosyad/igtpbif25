'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await supabase.auth.signOut();
        router.push('/');
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }, [router]);

  return (
    <div className=' bg-gray-200 text-gray-700 flex flex-col items-center justify-center min-h-screen text-center'>
      <h1 className='text-xl font-semibold mb-4'>Logging out...</h1>
      <p>Please wait while we sign you out.</p>
    </div>
  );
}
