'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { saveRoleToLocal } from '@/utils/localRole';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, user, role } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    if (!isLogin) {
      router.push('/login');
    } else {
      router.push('/');
    }
  };

  const handleLogout = () => {
    if (isLogin) {
      router.push('/logout');
    } else {
      router.push('/');
    }
    setShowProfileDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showProfileDropdown &&
        !event.target.closest('.profile-dropdown-container')
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown]);

  return (
    <>
      <style jsx global strategy='lazyOnload'>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 font-['Inter'] bg-[#F7F1E7] border-b border-[#5a5a3d]/20 shadow-sm">
        {/* Desktop Navbar */}
        <div className='hidden md:block'>
          <div className='max-w-7xl mx-auto px-4'>
            <div className='flex items-center justify-between h-16'>
              {/* Logo */}
              <Link href='/' className='flex items-center gap-3 cursor-pointer'>
                <Image
                  src='https://res.cloudinary.com/ddzjskfyn/image/upload/v1759423035/igttpb2025logo_lfcrjn.webp'
                  alt='Logo IGTTPB'
                  width={48}
                  height={48}
                  className='object-cover'
                />
                <span className='text-xl font-bold text-[#5a5a3d]'>IGTTPB</span>
              </Link>

              {console.log('AuthContext saat ini:', {
                isLogin,
                user,
                role,
              })}

              {role != null && saveRoleToLocal(role)}
              {/* Menu Items */}
              <div className='absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8'>
                <a
                  href='#aboutIGTTPB'
                  className='text-[#5a5a3d] hover:text-[#5a5a3d]/70 transition-colors duration-300'>
                  Mengenal IGTTPB
                </a>
                <a
                  href='#cariKelompok'
                  className='text-[#5a5a3d] hover:text-[#5a5a3d]/70 transition-colors duration-300'>
                  Pengumuman
                </a>
                <a
                  href='#faq'
                  className='text-[#5a5a3d] hover:text-[#5a5a3d]/70 transition-colors duration-300'>
                  FAQ
                </a>
              </div>

              {/* Login/Profile Button */}
              <div className='relative profile-dropdown-container'>
                {!isLogin ? (
                  <button
                    onClick={handleLogin}
                    className='px-6 py-2 bg-[#5a5a3d] text-[#F7F1E7] rounded-lg hover:bg-[#5a5a3d]/80 transition-all duration-300 font-medium'>
                    Login
                  </button>
                ) : (
                  <div className='relative'>
                    <button
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
                      className='flex items-center gap-2 px-4 py-2 bg-[#5a5a3d] text-[#F7F1E7] rounded-lg hover:bg-[#5a5a3d]/80 transition-all duration-300'>
                      <User size={20} />
                      <span className='font-medium'>
                        {user?.user_metadata?.full_name || 'User'}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          showProfileDropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {showProfileDropdown && (
                      <div className='absolute right-0 mt-2 w-48 bg-[#F7F1E7] border border-[#5a5a3d]/20 rounded-lg shadow-lg overflow-hidden'>
                        <Link
                          href='/dashboard'
                          className='flex items-center gap-3 px-4 py-3 text-[#5a5a3d] hover:bg-[#5a5a3d]/10 transition-all duration-300'
                          onClick={() => setShowProfileDropdown(false)}>
                          <LayoutDashboard size={18} />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className='w-full flex items-center gap-3 px-4 py-3 text-[#5a5a3d] hover:bg-[#5a5a3d]/10 transition-all duration-300 border-t border-[#5a5a3d]/10'>
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className='md:hidden'>
          <div className='px-4 py-3'>
            <div className='flex items-center justify-between relative'>
              <div className='flex items-center gap-3'>
                <Image
                  src='https://res.cloudinary.com/ddzjskfyn/image/upload/v1759423035/igttpb2025logo_lfcrjn.webp'
                  alt='Logo IGTTPB'
                  width={48}
                  height={48}
                  className='object-cover'
                />
              </div>

              <div className='absolute left-1/2 transform -translate-x-1/2'>
                <span className='text-xl font-bold text-[#5a5a3d]'>IGTTPB</span>
              </div>

              <button
                onClick={toggleMenu}
                className='text-white focus:outline-none w-10 h-10 flex flex-col justify-center items-center gap-1.5'>
                <span
                  className={`block w-5 h-0.5 bg-[#5a5a3d] rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-2.5' : ''
                  }`}></span>
                <span
                  className={`block w-5 h-0.5 bg-[#5a5a3d] rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                <span
                  className={`block w-5 h-0.5 bg-[#5a5a3d] rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-2.5' : ''
                  }`}></span>
              </button>
            </div>

            {/* Mobile Menu with Animation */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
              <div className='mt-4 bg-[#5a5a3d]/5 backdrop-blur-sm rounded-xl border border-[#5a5a3d]/10'>
                <div
                  className={`flex flex-col p-4 space-y-1 transition-all duration-500 ease-out ${
                    isOpen
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-4 opacity-0'
                  }`}>
                  <a
                    href='#aboutIGTTPB'
                    className='text-[#5a5a3d] hover:bg-[#5a5a3d]/10 transition-all duration-300 py-3 px-4 rounded-lg font-medium'
                    onClick={() => setIsOpen(false)}>
                    Mengenal IGTTPB
                  </a>
                  <a
                    href='#cariKelompok'
                    className='text-[#5a5a3d] hover:bg-[#5a5a3d]/10 transition-all duration-300 py-3 px-4 rounded-lg font-medium'
                    onClick={() => setIsOpen(false)}>
                    Pengumuman
                  </a>
                  <a
                    href='#dresscode'
                    className='text-[#5a5a3d] hover:bg-[#5a5a3d]/10 transition-all duration-300 py-3 px-4 rounded-lg font-medium'
                    onClick={() => setIsOpen(false)}>
                    Dress Code
                  </a>
                  <a
                    href='#faq'
                    className='text-[#5a5a3d] hover:bg-[#5a5a3d]/10 transition-all duration-300 py-3 px-4 rounded-lg font-medium'
                    onClick={() => setIsOpen(false)}>
                    FAQ
                  </a>

                  {/* Mobile Login/Profile */}
                  <div className='pt-2 border-t border-[#5a5a3d]/10'>
                    {!isLogin ? (
                      <button
                        onClick={() => {
                          handleLogin();
                          setIsOpen(false);
                        }}
                        className='w-full px-4 py-3 bg-[#5a5a3d] text-[#F7F1E7] rounded-lg hover:bg-[#5a5a3d]/80 transition-all duration-300 font-medium'>
                        Login
                      </button>
                    ) : (
                      <div className='space-y-1'>
                        <Link
                          href='/dashboard'
                          className='flex items-center gap-3 text-[#5a5a3d] hover:bg-[#5a5a3d]/10 transition-all duration-300 py-3 px-4 rounded-lg font-medium'
                          onClick={() => setIsOpen(false)}>
                          <LayoutDashboard size={18} />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                          className='w-full flex items-center gap-3 text-[#5a5a3d] hover:bg-[#5a5a3d]/10 transition-all duration-300 py-3 px-4 rounded-lg font-medium'>
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
