'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Users, Settings, FileText, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Sesuaikan path dengan struktur folder Anda

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
  onNavItemClick, // Callback untuk mengirim id item yang diklik
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [internalMinimized, setInternalMinimized] = useState(false);
  const [internalMobileMenu, setInternalMobileMenu] = useState(false);
  const [activeId, setActiveId] = useState(null); // State untuk active nav id

  const router = useRouter();
  const pathname = usePathname();
  const { user, role } = useAuth(); // Ambil user dan role dari AuthContext

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

  // Set initial activeId berdasarkan pathname
  useEffect(() => {
    if (pathname && navItems.length > 0) {
      const initialItem = navItems.find((item) => item.href === pathname);
      if (initialItem) {
        setActiveId(initialItem.id);
      }
    }
  }, [pathname, role]); // Dependensi pada pathname dan role (karena navItems bergantung pada role)

  // Define all navigation items with role-based access
  const allNavItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'home',
      href: '/dashboard',
      roles: ['daplok', 'mentor', 'admin'], // Semua role bisa akses
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: 'users',
      href: '/dashboard/profile',
      roles: ['user', 'daplok', 'mentor', 'admin'], // Semua role bisa akses
    },
    {
      id: 'peserta',
      title: 'Peserta',
      icon: 'fileText',
      href: '/dashboard/peserta',
      roles: ['daplok', 'mentor', 'admin'], // Hanya daplok, mentor, dan admin
    },
    {
      id: 'kelompok',
      title: 'Kelompok',
      icon: 'users',
      href: '/dashboard/kelompok',
      roles: ['daplok', 'mentor', 'admin'], // Hanya daplok, mentor, dan admin
    },
    {
      id: 'tugas',
      title: 'Tugas',
      icon: 'fileText',
      href: '/dashboard/tugas',
      roles: ['user', 'mentor', 'admin'], // User, mentor, dan admin
    },
    {
      id: 'presensi',
      title: 'Presensi',
      icon: 'fileText',
      href: '/dashboard/presensi',
      roles: ['user', 'daplok', 'mentor', 'admin'], // Daplok, mentor, dan admin
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      href: '/dashboard/settings',
      roles: ['admin'], // Hanya admin
    },
  ];

  // Filter navigation items based on user role from AuthContext
  const navItems = role
    ? allNavItems.filter((item) => item.roles.includes(role))
    : [];

  const handleNavClick = (href, itemId) => {
    try {
      if (isMobile && typeof setIsMobileMenuOpen === 'function') {
        setIsMobileMenuOpen(false);
      }

      // Update activeId secara internal
      setActiveId(itemId);

      // Kirim id item ke parent component jika callback tersedia
      if (typeof onNavItemClick === 'function') {
        onNavItemClick(itemId);
      }

      // Tidak melakukan router.push(href) lagi
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

  const handleLogout = () => {
    try {
      if (isMobile && typeof setIsMobileMenuOpen === 'function') {
        setIsMobileMenuOpen(false);
      }
      router.push('/logout');
    } catch (error) {
      console.error('Logout navigation error:', error);
    }
  };

  // Get role display name
  const getRoleDisplayName = (roleValue) => {
    const roleNames = {
      user: 'Peserta',
      daplok: 'Pendamping Kelompok',
      mentor: 'Mentor',
      admin: 'Admin',
      guest: 'Guest',
    };
    return roleNames[roleValue] || 'User';
  };

  // Get user display name from email
  const getUserDisplayName = () => {
    if (!user?.email) return 'User';

    // Ekstrak nama dari email (sebelum @)
    const emailName = user.email.split('@')[0];

    // Ekstrak NIM jika ada (format: nama.nim@...)
    const match = emailName.match(/^(.+)\.(\d{9})$/);
    if (match) {
      // Kapitalisasi nama
      const name = match[1]
        .split('.')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return name;
    }

    // Jika tidak ada NIM, capitalize email name
    return emailName
      .split('.')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      {isMobile && (
        <div className='top-0 left-0 right-0 h-16 bg-[#F7F1E7] border-b border-[#5a5a3d]/20 shadow-sm flex items-center justify-between px-4'>
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
            ? `fixed border-l border-[#5a5a3d]/20 right-0 w-64 top-0 z-50 ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`
            : `relative border-r border-[#5a5a3d]/20 left-0 top-0 ${
                isMinimized ? 'w-16' : 'w-64'
              }`
        }
      `}>
        {/* Header - Only show in desktop mode */}
        {!isMobile && (
          <div className='h-16 flex items-center justify-between px-4 border-b border-[#5a5a3d]/20'>
            {!isMinimized && (
              <div
                onClick={() => router.replace('/')}
                // onClick = {router.replace('/')}
                className='flex items-center gap-2 cursor-pointer'>
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
                  {getUserDisplayName()}
                </div>
                <div className='text-xs text-[#5a5a3d]/70 font-semibold font-poppins'>
                  {role ? getRoleDisplayName(role) : 'Loading...'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div
          className='py-4 px-2 overflow-y-auto scrollbar-hide pb-20'
          style={{
            height: isMobile ? 'calc(100vh - 128px)' : 'calc(100vh - 196px)',
          }}>
          <nav className='space-y-1'>
            {navItems.length > 0 ? (
              navItems.map((item, index) => {
                const Icon = Icons[item.icon];
                const isActive = activeId === item.id;

                return (
                  <div
                    key={`nav-${index}-${item.id}`}
                    className='relative group'>
                    <button
                      onClick={() => handleNavClick(item.href, item.id)}
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
                      aria-label={item.title}
                      data-nav-id={item.id}>
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
              })
            ) : (
              <div className='text-center text-sm text-[#5a5a3d]/70 py-4'>
                {role ? 'No menu available' : 'Loading menu...'}
              </div>
            )}
          </nav>
        </div>

        {/* Logout (sticky bottom) */}
        <div className='absolute left-0 bottom-0 w-full px-2'>
          <div className='relative group'>
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-300
                ${isMinimized && !isMobile ? 'justify-center' : 'justify-start'}
                text-[#5a5a3d] hover:bg-[#5a5a3d]/10
              `}
              type='button'
              aria-label='Logout'>
              <LogOut className={`w-5 h-5 flex-shrink-0 ${'text-[#5a5a3d]'}`} />
              {(!isMinimized || isMobile) && (
                <span className='truncate font-medium font-poppins'>
                  Logout
                </span>
              )}
            </button>

            {/* Tooltip for minimized state - desktop only */}
            {isMinimized && !isMobile && (
              <div className='absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-[#5a5a3d] text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 font-poppins shadow-lg'>
                Logout
              </div>
            )}
          </div>
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
