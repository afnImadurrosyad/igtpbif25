'use client';

import { useState } from 'react';
import Image from 'next/image'; 
import { supabase } from '../../utils/supabaseClient';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat login dengan Google');
      setIsLoading(false);
    }
  };

  return (<>
    <div className="min-h-screen bg-gradient-to-br from-[#DCE2B7] via-[#E8EDCC] to-[#DCE2B7] flex items-center justify-center p-4">
      {/* Main Content */}
      <div className="w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row bg-white/95 rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Mobile Logo - Only visible on mobile */}
          <div className="lg:hidden bg-gradient-to-br from-[#DCE2B7] via-[#E8EDCC] to-[#DCE2B7] py-8 px-4">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-32 h-32 bg-white/90 rounded-full flex items-center justify-center shadow-xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/ddzjskfyn/image/upload/v1759423035/igttpb2025logo_lfcrjn.webp"
                    alt="Logo IGTTPB"
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#5a5a4a] mb-2">
                IGTTPB
              </h3>
              <p className="text-sm text-[#6b6b5a] px-4">
                Informatics Goes To Tahap Persiapan Bersama
              </p>
            </div>
          </div>

          {/* Left Side - Google Login */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#5a5a4a] mb-2">
                  Selamat Datang
                </h2>
                <p className="text-sm sm:text-base text-[#8b8b7a]">
                  Masukkan akun IGTTPB Anda
                </p>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full mt-8 mb-6 bg-white hover:bg-gray-50 text-[#5a5a4a] font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#d4d6b9] flex items-center justify-center gap-3 text-sm sm:text-base"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Masuk dengan Google
              </button>
            </div>
          </div>

          {/* Right Side - Logo & Welcome (Desktop Only) */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#DCE2B7] via-[#E8EDCC] to-[#DCE2B7] items-center justify-center p-12">
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-48 h-48 bg-white/90 rounded-full flex items-center justify-center shadow-xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/ddzjskfyn/image/upload/v1759423035/igttpb2025logo_lfcrjn.webp"
                    alt="Logo IGTTPB"
                    width={180}
                    height={180}
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#5a5a4a] mb-4">
                IGTTPB
              </h3>
              <p className="text-[#6b6b5a] max-w-sm">
                Informatics Goes To Tahap Persiapan Bersama
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}