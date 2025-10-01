'use client';
import { useEffect, useState } from 'react';

const getStyleByIndex = (index, isMobile) => {
  if (isMobile) {
    const useLight = index % 2 === 0;
    return {
      container: useLight
        ? 'bg-[#DCE2B7] text-[#686232]'
        : 'bg-[#686232] text-[#DCE2B7]',
      textColor: useLight ? 'text-[#2F2F30]' : 'text-white',
    };
  }

  if (index === 0) {
    return {
      container: 'bg-[#DCE2B7] text-[#686232]',
      textColor: 'text-[#2F2F30]',
    };
  }

  const block = Math.floor((index - 1) / 2);
  const useDark = block % 2 === 0;
  return {
    container: useDark
      ? 'bg-[#686232] text-[#DCE2B7]'
      : 'bg-[#DCE2B7] text-[#686232]',
    textColor: useDark ? 'text-white' : 'text-[#2F2F30]',
  };
};

const HasilPencarian = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cek apakah layar kecil (misal < 768px dianggap mobile)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  if (!data) return null;

  return (
    <div className='bg-[#686232] text-white p-6 sm:p-8 rounded-2xl max-w-5xl mx-auto shadow-xl'>
      <h2 className='text-center text-lg font-medium text-white mb-8'>
        Data ditemukan
      </h2>

      <div className='grid grid-cols-2 gap-y-8 gap-x-4 mb-8'>
        <div>
          <p className='text-sm text-lime-100'>Nama</p>
          <p className='text-xl sm:text-2xl font-bold text-white'>
            {data.nama}
          </p>
        </div>
        <div>
          <p className='text-sm text-lime-100'>NIM</p>
          <p className='text-xl sm:text-2xl font-bold text-white'>{data.nim}</p>
        </div>
        <div>
          <p className='text-sm text-lime-100'>Kelompok</p>
          <p className='text-xl sm:text-2xl font-bold text-white'>
            {data.kelompok}
          </p>
        </div>
        <div>
          <p className='text-sm text-lime-100'>Daplok</p>
          <p className='text-xl sm:text-2xl font-bold text-white'>
            {data.daplok}
          </p>
        </div>
      </div>

      <div className='text-center mb-10'>
        <button
          className='bg-white text-[#686232] font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200'
          onClick={() => {
            if (data.nomerDpl) {
              window.open(`https://wa.me/${data.nomerDpl}`, '_blank');
            }
          }}>
          Hubungi Daplok
        </button>
      </div>

      {/* Daftar Anggota Lainnya */}
      <div className='bg-[#F7F1E7] p-6 rounded-lg text-[#2F2F30]'>
        <h3 className='text-lg font-medium text-[#686232] mb-4'>
          Anggota Lainnya
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {data.anggotaLainnya.map((anggota, index) => {
            const { container, textColor } = getStyleByIndex(index, isMobile);
            return (
              <div
                key={anggota.nim ?? index}
                className={`flex justify-between items-center p-4 rounded-lg ${container}`}>
                <p className={`font-medium ${textColor}`}>{anggota.nama}</p>
                <p className={textColor}>{anggota.nim}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HasilPencarian;
