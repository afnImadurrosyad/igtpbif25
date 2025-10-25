'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import { clearRoleFromLocal } from '@/utils/localRole';

// Fallback: clear Supabase auth storage keys manually
function clearSupabaseAuthStorage() {
  if (typeof window === 'undefined') return;
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((k) => {
      if (k.startsWith('sb-') && k.includes('auth')) {
        localStorage.removeItem(k);
      }
    });
  } catch (e) {
    // ignore
  }
}

export default function Logout() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  useEffect(() => {
    const logout = async () => {
      try {
        // Clear localStorage first
        clearRoleFromLocal();
        clearSupabaseAuthStorage();

        // Sign out from Supabase
        const { error } = await supabase.auth.signOut({
          scope: 'global',
        });

        if (error) {
          console.error('Logout error:', error.message);
          // Even if there's an error, redirect to home
        }

        // Redirect to home page with hard reload to ensure fresh state
        if (typeof window !== 'undefined') {
          window.location.replace('/');
        } else {
          router.replace('/');
        }
      } catch (err) {
        console.error('Unexpected error during logout:', err);
        // Even if there's an error, try to force redirect
        if (typeof window !== 'undefined') {
          window.location.replace('/');
        } else {
          router.replace('/');
        }
      }
    };

    logout();
  }, [router]);

  return (
    <div className='bg-[#F7F1E7] text-[#5a5a3d] flex flex-col items-center justify-center min-h-screen text-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#5a5a3d] mx-auto mb-4'></div>
      <h1 className='text-xl font-semibold mb-2'>Logging out...</h1>
      <p className='text-sm'>Mohon tunggu sebentar.</p>
      <div onClick={handleHome}>Kembali ke Home Page</div>
    </div>
  );
}
