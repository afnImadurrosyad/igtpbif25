'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';
<<<<<<< HEAD:src/components/dashPeserta.jsx
import { getAllPeserta } from '@/api/pesertaApi2';
=======
import { getAllPeserta } from '../../api/pesertaApi2';
>>>>>>> origin/progres1:src/components/dashboard/dashPeserta.jsx

const getStyleByIndex = (index) => {
  const isEven = index % 2 === 0;
  return {
    container: isEven ? 'bg-[#e7efcb]' : 'bg-[#b6bfa1]',
    textColor: isEven ? 'text-gray-800' : 'text-white',
  };
};

const DashPeserta = () => {
  const [allPeserta, setAllPeserta] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const articlesPerPage = 10; // Tampilkan 10 peserta per halaman

  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        const data = await getAllPeserta();
        setAllPeserta(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPeserta();
  }, []);

  const filteredPeserta = allPeserta.filter((peserta) =>
    peserta.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPeserta.length / articlesPerPage);
  const currentPeserta = filteredPeserta.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className='text-center p-10 font-semibold'>
        Memuat daftar peserta...
      </div>
    );
  }
  if (error) {
    return (
      <div className='text-center p-10 text-red-500 font-semibold'>
        Error: {error}
      </div>
    );
  }

  return (
    <div className='bg-[#F7F1E7] min-h-screen p-4 sm:p-8 font-sans'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-6 sm:mb-8'></div>

        {/* Elemen Search Bar  */}
        <div className='mb-6 relative'>
          <input
            type='text'
            placeholder='Cari nama peserta...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className='w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#686232]'
          />
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            size={20}
          />
        </div>

        <div className='bg-[#DCE2B7] p-4 sm:p-6 rounded-lg shadow-md'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2'>
            <div className='flex items-center'>
              <Users className='w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[#686232]' />
              <h2 className='text-lg sm:text-xl font-semibold text-[#2F2F30]'>
                List Peserta
              </h2>
            </div>
            <span className='text-xs sm:text-sm text-gray-600'>
              Halaman {currentPage} dari {totalPages}
            </span>
          </div>

          {/* Desktop Table Header */}
          <div className='hidden md:flex px-4 py-2 text-sm font-bold text-gray-600'>
            <p className='w-1/12'>No.</p>
            <p className='w-3/12'>Nama</p>
            <p className='w-2/12'>NIM</p>
            <p className='w-2/12'>Kelompok</p>
            <p className='w-2/12'>Daplok</p>
          </div>

          <div className='space-y-2'>
            {currentPeserta.length > 0 ? (
              currentPeserta.map((peserta, index) => {
                const { container, textColor } = getStyleByIndex(index);
                return (
                  <div key={peserta.id}>
                    {/* Desktop View */}
                    <div
                      className={`hidden md:flex items-center p-4 rounded-lg ${container}`}>
                      <p className={`w-1/12 ${textColor}`}>
                        {(currentPage - 1) * articlesPerPage + index + 1}
                      </p>
                      <p className={`w-3/12 font-medium ${textColor}`}>
                        {peserta.nama}
                      </p>
                      <p className={`w-2/12 ${textColor}`}>{peserta.nim}</p>
                      <p className={`w-2/12 ${textColor}`}>
                        {peserta.kelompok}
                      </p>
                      <p className={`w-2/12 ${textColor}`}>{peserta.daplok}</p>
                    </div>

                    {/* Mobile View - Card Style */}
                    <div
                      className={`md:hidden p-4 rounded-lg ${container} space-y-2`}>
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <p
                            className={`text-xs ${textColor} opacity-75 mb-1`}></p>
                          <p className={`font-semibold ${textColor} text-base`}>
                            {peserta.nama}
                          </p>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-sm'>
                        <div>
                          <p className={`${textColor} opacity-75 text-xs`}>
                            NIM
                          </p>
                          <p className={`${textColor} font-medium`}>
                            {peserta.nim}
                          </p>
                        </div>
                        <div>
                          <p className={`${textColor} opacity-75 text-xs`}>
                            Kelompok
                          </p>
                          <p className={`${textColor} font-medium`}>
                            {peserta.kelompok}
                          </p>
                        </div>
                        <div className='col-span-2'>
                          <p className={`${textColor} opacity-75 text-xs`}>
                            Daplok
                          </p>
                          <p className={`${textColor} font-medium`}>
                            {peserta.daplok}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className='text-center p-4 text-sm sm:text-base text-gray-600'>
                Tidak ada data yang cocok dengan pencarian Anda..
              </p>
            )}
          </div>
        </div>

        {/* Elemen Paginasi */}
        <div className='flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-8 gap-3 sm:gap-2'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='w-full sm:w-auto px-4 py-2 bg-white rounded-md shadow-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'>
            Previous
          </button>
          <span className='text-gray-700 text-sm sm:text-base'>
            Halaman {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className='w-full sm:w-auto px-4 py-2 bg-white rounded-md shadow-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashPeserta;
