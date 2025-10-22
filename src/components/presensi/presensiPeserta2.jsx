'use client';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '@/contexts/AuthContext';

export default function PresensiPeserta() {
  const { user, nim } = useAuth();
  if (!user) {
    return (
      <div className='w-full max-w-xl mx-auto p-4'>
        <h2 className='text-xl font-semibold'>QR Presensi Peserta</h2>
        <div className='text-sm text-gray-600 mt-2'>Memuat identitas...</div>
      </div>
    );
  }
  return (
    <div className='w-full max-w-xl mx-auto p-4'>
      <h2 className='text-xl font-semibold'>QR Presensi Peserta</h2>
      <div className='border rounded p-4 space-y-2'>
        <div className='text-sm'>
          {user.user_metadata.name ? (
            <div>
              Nama: <b>{user.user_metadata.name}</b>
            </div>
          ) : null}
          <div>
            NIM: <b>{nim}</b>
          </div>
        </div>
        <div className='flex justify-center'>
          <QRCodeSVG size={220} value={nim}></QRCodeSVG>
        </div>
        <div className='text-center text-sm text-gray-600'>
          Berikan QR ini kepada daplok/mentor untuk discan
        </div>
      </div>
    </div>
  );
}
