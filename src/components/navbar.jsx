'use client';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style jsx global strategy="lazyOnload">{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 font-['Inter'] bg-white/10 backdrop-blur-md border-b border-white/20">
        {/* Desktop Navbar */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="text-[#686232] text-xl font-semibold">
                IGTTPB
              </div>

              {/* Menu Items */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
                <a href="#" className="text-[#686232] hover:text-[#F7F1E7] transition">
                  Mengenal IGTTPB
                </a>
                <a href="#" className="text-[#686232] hover:text-[#F7F1E7] transition">
                  Pengumuman
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[#686232] text-lg font-semibold">IGTTPB</span>
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none w-10 h-10 flex flex-col justify-center items-center gap-1.5"
              >
                <span
                  className={`block w-5 h-0.5 bg-[#686232] rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-2.5' : ''
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-[#686232] rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-[#686232] rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-2.5' : ''
                  }`}
                ></span>
              </button>
            </div>

            {/* Mobile Menu with Animation */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-2 bg-white bg-opacity-10 backdrop-blur-md rounded-lg">
                <div className={`flex flex-col p-4 space-y-3 transition-all duration-500 ease-out ${
                  isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}>
                  <a
                    href="#"
                    className="text-[#686232] hover:text-gray-300 transition py-2"
                  >
                    Mengenal IGTTPB
                  </a>
                  <a
                    href="#"
                    className="text-[#686232] hover:text-gray-300 transition py-2"
                  >
                    Pengumuman
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}