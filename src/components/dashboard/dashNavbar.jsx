'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Users, Settings, FileText, Menu, X } from 'lucide-react';

const Icons = {
  home: Home,
  users: Users,
  settings: Settings,
  fileText: FileText,
};

export default function NavbarDash({
  isMinimized: propIsMinimized,
  setIsMinimized: propSetIsMinimized,
  isMobileMenuOpen: propIsMobileMenuOpen,
  setIsMobileMenuOpen: propSetIsMobileMenuOpen,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [internalMinimized, setInternalMinimized] = useState(false);
  const [internalMobileMenu, setInternalMobileMenu] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Use internal state as fallback if props are not provided
  const isMinimized =
    propIsMinimized !== undefined ? propIsMinimized : internalMinimized;
  const setIsMinimized = propSetIsMinimized || setInternalMinimized;
  const isMobileMenuOpen =
    propIsMobileMenuOpen !== undefined
      ? propIsMobileMenuOpen
      : internalMobileMenu;
  const setIsMobileMenuOpen = propSetIsMobileMenuOpen || setInternalMobileMenu;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { title: 'Dashboard', icon: 'home', href: '/dashboard' },
    { title: 'Profile', icon: 'users', href: '/dashboard/profile' },
    { title: 'Peserta', icon: 'fileText', href: '/dashboard/peserta' },
    { title: 'Kelompok', icon: 'users', href: '/dashboard/kelompok' },
    { title: 'Tugas', icon: 'fileText', href: '/dashboard/tugas' },
    { title: 'Presensi', icon: 'fileText', href: '/presensi/admin' },
  ];

  const handleNavClick = (href) => {
    try {
      if (isMobile && typeof setIsMobileMenuOpen === 'function') {
        setIsMobileMenuOpen(false);
      }
      router.push(href);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleToggle = () => {
    if (isMobile) {
      if (typeof setIsMobileMenuOpen === 'function') {
        setIsMobileMenuOpen(!isMobileMenuOpen);
      }
    } else {
      if (typeof setIsMinimized === 'function') {
        setIsMinimized(!isMinimized);
      }
    }
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      {isMobile && (
        <div className='fixed top-0 left-0 right-0 h-16 bg-[#F7F1E7] border-b border-[#5a5a3d]/20 shadow-sm z-50 flex items-center justify-between px-4'>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-bold text-[#5a5a3d] font-poppins'>
              IGTTPB
            </span>
          </div>
          <button
            onClick={handleToggle}
            className='focus:outline-none w-10 h-10 flex flex-col justify-center items-center gap-1.5'
            type='button'
            aria-label='Toggle menu'>
            <span
              className={`block w-5 h-0.5 bg-[#5a5a3d] rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
            <span
              className={`block w-5 h-0.5 bg-[#5a5a3d] rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
            <span
              className={`block w-5 h-0.5 bg-[#5a5a3d] rounded-full transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        bg-[#F7F1E7] h-full transition-all duration-300 overflow-hidden shadow-sm
        ${
          isMobile
            ? `border-l border-[#5a5a3d]/20 right-0 w-64 top-0 ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`
            : `border-r border-[#5a5a3d]/20 left-0 top-0 ${
                isMinimized ? 'w-16' : 'w-64'
              }`
        }
      `}>
        {/* Header - Only show in desktop mode */}
        {!isMobile && (
          <div className='h-16 flex items-center justify-between px-4 border-b border-[#5a5a3d]/20'>
            {!isMinimized && (
              <div className='flex items-center gap-2'>
                <span className='text-xl font-bold text-[#5a5a3d] font-poppins'>
                  IGTTPB
                </span>
              </div>
            )}
            <button
              onClick={handleToggle}
              className='p-2 hover:bg-[#5a5a3d]/10 rounded-md transition-colors'
              type='button'
              aria-label='Toggle menu'>
              <svg
                className='w-5 h-5 text-[#5a5a3d]'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d={isMinimized ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                />
              </svg>
            </button>
          </div>
        )}

        {/* Mobile Header with Close Button */}
        {isMobile && (
          <div className='h-16 flex items-center justify-between px-4 border-b border-[#5a5a3d]/20'>
            <div className='flex items-center gap-2'>
              <span className='text-lg font-bold text-[#5a5a3d] font-poppins'>
                Menu
              </span>
            </div>
            <button
              onClick={() => {
                if (typeof setIsMobileMenuOpen === 'function') {
                  setIsMobileMenuOpen(false);
                }
              }}
              className='focus:outline-none w-10 h-10 flex flex-col justify-center items-center gap-1.5'
              type='button'
              aria-label='Close menu'>
              <span className='block w-5 h-0.5 bg-[#5a5a3d] rounded-full rotate-45 translate-y-2'></span>
              <span className='block w-5 h-0.5 bg-[#5a5a3d] rounded-full opacity-0'></span>
              <span className='block w-5 h-0.5 bg-[#5a5a3d] rounded-full -rotate-45 -translate-y-2'></span>
            </button>
          </div>
        )}

        {/* User Info */}
        {!isMinimized && (
          <div className='px-4 py-3 border-b border-[#5a5a3d]/20'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-[#5a5a3d] rounded-full flex items-center justify-center flex-shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>
              <div className='min-w-0'>
                <div className='text-sm font-medium text-[#5a5a3d] font-poppins truncate'>
                  Jeremi
                </div>
                <div className='text-xs text-[#5a5a3d]/70 font-semibold font-poppins'>
                  Admin
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div
          className='py-4 px-2 overflow-y-auto scrollbar-hide'
          style={{
            height: isMobile ? 'calc(100vh - 128px)' : 'calc(100vh - 128px)',
          }}>
          <nav className='space-y-1'>
            {navItems.map((item, index) => {
              const Icon = Icons[item.icon];
              const isActive = pathname === item.href;

              return (
                <div
                  key={`nav-${index}-${item.href}`}
                  className='relative group'>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      w-full flex items-center gap-3 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-300
                      ${
                        isMinimized && !isMobile
                          ? 'justify-center'
                          : 'justify-start'
                      }
                      ${
                        isActive
                          ? 'bg-[#5a5a3d] text-white shadow-sm'
                          : 'text-[#5a5a3d] hover:bg-[#5a5a3d]/10'
                      }
                    `}
                    type='button'
                    aria-label={item.title}>
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? 'text-white' : 'text-[#5a5a3d]'
                      }`}
                    />
                    {(!isMinimized || isMobile) && (
                      <span className='truncate font-medium font-poppins'>
                        {item.title}
                      </span>
                    )}
                  </button>

                  {/* Tooltip for minimized state - desktop only */}
                  {isMinimized && !isMobile && (
                    <div className='absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-[#5a5a3d] text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 font-poppins shadow-lg'>
                      {item.title}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity'
          onClick={() => {
            if (typeof setIsMobileMenuOpen === 'function') {
              setIsMobileMenuOpen(false);
            }
          }}
          aria-hidden='true'
        />
      )}
    </>
  );
}
