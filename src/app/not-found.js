'use client';
import React, { useState, useEffect } from 'react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#DCE2B7] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-[#6b7053] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ 
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            animation: 'blob 7s infinite'
          }}
        ></div>
        <div 
          className="absolute top-40 right-10 w-96 h-96 bg-[#9cc5e8] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ 
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            animation: 'blob 7s infinite',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute -bottom-20 left-1/2 w-80 h-80 bg-[#5a5a3d] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ 
            transform: `translate(${mousePosition.y}px, ${mousePosition.x}px)`,
            animation: 'blob 7s infinite',
            animationDelay: '4s'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-[#5a5a3d] leading-none tracking-tighter">
                4
                <span className="inline-block relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#6b7053] to-[#9cc5e8]">0</span>
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-[#6b7053] to-[#9cc5e8] opacity-30"></div>
                </span>
                4
              </h1>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#6b7053]">
                Halaman Tidak Ditemukan
              </h2>
            </div>

            <p className="text-lg text-[#5a5a3d]/80 leading-relaxed max-w-md">
              Sepertinya Anda tersesat di dunia digital. Halaman yang Anda cari mungkin telah dipindahkan atau tidak pernah ada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="/"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6b7053] to-[#5a5f45] text-white px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <span className="relative z-10">Kembali ke Beranda</span>
                <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-[#5a5f45] to-[#6b7053] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Right Side - 3D Illustration */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Floating Cards */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="absolute top-0 right-10 w-32 h-40 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl transform rotate-12"
                  style={{ animation: 'float 3s ease-in-out infinite' }}
                ></div>
                <div 
                  className="absolute bottom-10 left-0 w-40 h-32 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl transform -rotate-6"
                  style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '2s' }}
                ></div>
                
                {/* Main Circle */}
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  {/* Outer rings */}
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-[#6b7053]/20"
                    style={{ animation: 'spin-slow 20s linear infinite' }}
                  ></div>
                  <div 
                    className="absolute inset-4 rounded-full border-4 border-[#9cc5e8]/20"
                    style={{ animation: 'spin-reverse 15s linear infinite' }}
                  ></div>
                  
                  {/* Glass circle */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/40 shadow-2xl flex items-center justify-center">
                    {/* Logo Image */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <img 
                        src="https://via.placeholder.com/200x200/1e3a5f/ffffff?text=IGTTPB+LOGO" 
                        alt="IGTTPB Logo" 
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  </div>
                  
                  {/* Floating particles */}
                  <div 
                    className="absolute top-10 right-0 w-4 h-4 bg-[#6b7053] rounded-full"
                    style={{ animation: 'float 3s ease-in-out infinite' }}
                  ></div>
                  <div 
                    className="absolute bottom-20 left-5 w-3 h-3 bg-[#9cc5e8] rounded-full"
                    style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '2s' }}
                  ></div>
                  <div 
                    className="absolute top-1/2 right-10 w-2 h-2 bg-[#5a5a3d] rounded-full"
                    style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '4s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}