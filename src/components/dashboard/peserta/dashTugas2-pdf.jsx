'use client';

import React, { useEffect, useState } from 'react';
import { addTugas } from '../../../api/tugasApi';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '@/utils/supabaseClient';

export default function TugasResumePDF() {
  {
    const { isLogin, user, nim } = useAuth();

    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [savedFileName, setSavedFileName] = useState(null);

    const theme = {
      primary: '#DCE2B7',
      bg: '#F7F1E7',
      accent: '#686232',
    };

    useEffect(() => {
      const fetchPresensi = async () => {
        if (!nim) return;

        try {
          const { data, error } = await supabase
            .from('presensi')
            .select('tugas_2')
            .eq('nim', nim)
            .single();

          if (error) throw error;

          if (data?.tugas_2) {
            setSavedFileName(data.tugas_2);
            setStatus('success');
          }
        } catch (err) {
          console.error('Gagal memuat data presensi:', err);
        }
      };

      fetchPresensi();
    }, [nim]);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (status === 'submitting' || status === 'success') return;
      if (!file) {
        setStatus('error');
        setMessage('Silakan pilih file untuk diunggah.');
        return;
      }

      setStatus('submitting');
      setMessage('');
      try {
        await addTugas(nim, 2, file);
        setStatus('success');
        setMessage('File berhasil diunggah.');
      } catch (err) {
        console.error('Gagal mengunggah file tugas:', err);
        setStatus('error');
        setMessage('Gagal mengunggah file. Silakan coba lagi.');
      }
    };

    return (
      <div
      className='min-h-screen flex items-center justify-center p-6'
      style={{ backgroundColor: theme.bg }}>
      <div
        className='w-full max-w-xl rounded-2xl shadow-md p-8 border'
        style={{ backgroundColor: theme.primary, borderColor: theme.accent }}>
        <h1
          className='text-2xl font-semibold mb-6 text-center font-poppins'
          style={{ color: theme.accent }}>
          Form Kumpul Resume 📜
        </h1>

        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className='space-y-5'>
            <p
              className='text-sm text-center'
              style={{ color: `${theme.accent}cc` }}>
              Silakan masukkan file resume berbentuk PDF kamu.
            </p>

            <label className='block'>
              <span
                className='text-sm font-medium'
                style={{ color: theme.accent }}>
                File Resume (PDF)
              </span>
              <input
                type='file'
                accept='application/pdf'
                onChange={handleFileChange}
                className='mt-1 block w-full rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none border transition-all'
                style={{
                  borderColor: theme.accent,
                  backgroundColor: theme.bg,
                  color: '#333',
                }}
              />
            </label>

            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={status === 'submitting'}
                className='px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition-all disabled:opacity-60 hover:opacity-90'
                style={{ backgroundColor: theme.accent }}>
                {status === 'submitting' ? 'Menyimpan...' : 'Kirim'}
              </button>
            </div>

            {status === 'error' && message && (
              <div
                className='p-3 rounded-md text-sm text-center border'
                style={{
                  backgroundColor: '#fef2f2',
                  color: '#b91c1c',
                  borderColor: '#fecaca',
                }}>
                {message}
              </div>
            )}

            <div
              className='mt-4 text-xs text-center'
              style={{ color: `${theme.accent}99` }}>
              Pastikan sudah memenuhi seluruh ketentuan upload resume.
            </div>
          </form>
        ) : (
          <div className='text-center space-y-3'>
            <h2
              className='text-lg font-semibold'
              style={{ color: theme.accent }}>
              Terima kasih!
            </h2>
            <p className='text-sm' style={{ color: `${theme.accent}cc` }}>
              File Resume kamu telah disimpan.
            </p>

            {savedFileName && (
              <div
                className='mt-3 rounded-lg px-4 py-3 text-left break-words border text-sm'
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.accent,
                  color: theme.accent,
                }}>
                <div className='text-xs opacity-80 mb-1'>File terkirim:</div>
                <a
                  href={savedFileName}
                  target='_blank'
                  rel='noreferrer'
                  className='underline font-medium'
                  style={{ color: theme.accent }}>
                  {savedFileName}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    );
  }
}