'use client';
import { useState } from 'react';
import { findPesertaByNim } from '../../api/pesertaApi2.jsx';
import HasilPencarian from '@components/home/HasilPencarian.jsx';

function InfoKelompok() {
  const [nimInput, setNimInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (nimInput.length !== 9 || !/^\d+$/.test(nimInput)) {
      setError('NIM harus terdiri dari 9 angka.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    try {
      const result = await findPesertaByNim(nimInput);
      setSearchResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Latar belakang utama diubah menjadi White Flour
    <section
      className='min-h-screen bg-[#DCE2B7] flex flex-col items-center p-4 pt-12 font-sans'
      id='cariKelompok'>
      <div className='mt-44 flex flex-col items-center w-full'>
        <h1 className='text-3xl lg:text-5xl font-bold text-center text-[#5a5a3d] mb-9'>
          Cari Kelompokmu Disini
        </h1>
        {/* Bagian Input Pencarian */}
        <div className='justify-center w-full max-w-lg mb-8'>
          {/* Warna teks header diubah menjadi Tricorn Black */}
          {/* <h1 className="text-3xl font-bold text-center mb-4 text-[#2F2F30]">Cari Data Kelompok Peserta</h1> */}
          <div className='flex gap-2'>
            {/* Styling input diubah kembali ke putih dengan teks hitam */}
            <input
              type='text'
              value={nimInput}
              onChange={(e) => setNimInput(e.target.value)}
              className='flex-1 max-w- px-4 py-3 border border-gray-300 bg-[#F7F1E7] text-[#5a5a3d] placeholder-[#5a5a3d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a5a3d]'
              placeholder='Masukkan 9 digit NIM'
              maxLength={9}
            />
            {/* Styling tombol diubah menjadi Saguaro dengan teks putih */}
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className='px-6 py-3 bg-[#F7F1E7] text-[#7A7449] font-semibold rounded-md hover:bg-[#5a5a3d] hover:text-[#F7F1E7] transition-colors duration-200 disabled:bg-gray-400'>
              {isLoading ? 'Mencari...' : 'Cari'}
            </button>
          </div>
        </div>

        {/* Area untuk menampilkan hasil, error, atau loading */}
        <div className='w-full'>
          {/* Warna teks loading & error disesuaikan */}
          {isLoading && (
            <p className='text-center text-[#5a5a3d]'>Loading...</p>
          )}
          {error && (
            <p className='text-center text-red-600 font-semibold'>{error}</p>
          )}
          {searchResult && <HasilPencarian data={searchResult} />}
        </div>
      </div>
    </section>
  );
}

export default InfoKelompok;
