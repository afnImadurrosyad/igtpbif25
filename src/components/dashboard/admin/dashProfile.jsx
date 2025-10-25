'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ComingSoon() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='min-h-screen bg-[#E9E5D6] relative overflow-hidden'>
      {/* Background Animation */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute top-32 left-20 w-80 h-80 bg-[#8EA604] rounded-full mix-blend-multiply filter blur-3xl opacity-20'
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            animation: 'blob 7s infinite',
          }}></div>
        <div
          className='absolute top-10 right-10 w-96 h-96 bg-[#F5BB00] rounded-full mix-blend-multiply filter blur-3xl opacity-20'
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            animation: 'blob 7s infinite',
            animationDelay: '3s',
          }}></div>
        <div
          className='absolute bottom-0 left-1/3 w-96 h-96 bg-[#4B3F72] rounded-full mix-blend-multiply filter blur-3xl opacity-20'
          style={{
            transform: `translate(${mousePosition.y}px, ${mousePosition.x}px)`,
            animation: 'blob 7s infinite',
            animationDelay: '5s',
          }}></div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 md:py-40'>
        <div className='max-w-3xl space-y-10'>
          {/* Title */}
          <h1 className='text-6xl md:text-8xl font-black text-[#4B3F72] leading-none tracking-tighter'>
            Coming <span className='text-[#8EA604]'>Soon</span>
          </h1>

          <p className='text-lg md:text-xl text-[#5a5a3d]/80 max-w-xl mx-auto leading-relaxed'>
            Halaman ini sedang dalam pengembangan. Kami sedang menyiapkan
            sesuatu yang spesial untuk kamu 🚀
          </p>

          {/* Countdown Dummy */}
          <div className='flex justify-center gap-4 text-[#4B3F72] font-bold text-3xl md:text-4xl'>
            <div className='flex flex-col items-center'>
              <span className='text-5xl font-black'>12</span>
              <span className='text-sm tracking-wider uppercase text-[#8EA604]'>
                Hari
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-5xl font-black'>09</span>
              <span className='text-sm tracking-wider uppercase text-[#8EA604]'>
                Jam
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-5xl font-black'>43</span>
              <span className='text-sm tracking-wider uppercase text-[#8EA604]'>
                Menit
              </span>
            </div>
          </div>

          {/* Logo / Illustration */}
          <div className='relative w-64 h-64 mx-auto'>
            <Image
              src='https://res.cloudinary.com/ddzjskfyn/image/upload/v1759423035/igttpb2025logo_lfcrjn.webp'
              alt='Logo'
              width={512}
              height={512}
              className='object-contain animate-pulse'
              style={{ animation: 'float2 6s ease-in-out infinite' }}
            />
          </div>

          {/* Button */}
          <a
            href='/'
            className='inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4B3F72] to-[#8EA604] text-white px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105'>
            Kembali ke Beranda
            <svg
              className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          25% {
            transform: translateY(-20px) rotate(4deg);
          }
          50% {
            transform: translateY(0px) rotate(0deg);
          }
          75% {
            transform: translateY(-20px) rotate(-4deg);
          }
        }
      `}</style>
    </div>
  );
}
