'use client'; // jika kamu pakai App Router, biarkan ini. Untuk Pages Router tidak wajib.
import { useEffect } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

export default function LogoutPage() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    const signOutUser = async () => {
      await supabase.auth.signOut();
      router.push('/login');
    };
    signOutUser();
  }, [supabase, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Sedang keluar...</h2>
      <p>Anda akan diarahkan sebentar lagi.</p>
    </div>
  );
}