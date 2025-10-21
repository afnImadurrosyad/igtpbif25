'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await supabase.auth.signOut();

        router.replace('/');
      } catch (error) {
        console.error('Error :', error);
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-xl font-semibold mb-4">Logging out...</h1>
      <p>Please wait while we sign you out.</p>
    </div>
  );
}
