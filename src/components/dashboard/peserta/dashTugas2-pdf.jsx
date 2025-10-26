'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { getNimFromLocal, getNamaFromLocal } from '@/utils/localRole';

export default function TugasResumePDF() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [savedFileUrl, setSavedFileUrl] = useState(null);
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');

  const theme = {
    primary: '#DCE2B7',
    bg: '#F7F1E7',
    accent: '#686232',
  };

  // 🔹 Ambil nim dari local storage
  useEffect(() => {
    const localNim = getNimFromLocal();
    if (localNim) setNim(localNim);
    const localNama = getNamaFromLocal();
    if (localNama) setNama(localNama);
  }, []);

  // 🔹 Cek apakah user sudah pernah upload sebelumnya
  useEffect(() => {
    const fetchExisting = async () => {
      if (!nim) return;

      try {
        const { data, error } = await supabase
          .from('presensi')
          .select('tugas_2')
          .eq('nim', nim)
          .single();

        if (error) throw error;
        if (data?.tugas_2) {
          setSavedFileUrl(data.tugas_2);
          setStatus('success');
        }
      } catch (err) {
        console.error('Gagal memuat data presensi:', err);
      }
    };

    fetchExisting();
  }, [nim]);

  // 🔹 Validasi dan simpan file ke bucket
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('error');
      setMessage('Silakan pilih file PDF terlebih dahulu.');
      return;
    }

    if (file.type !== 'application/pdf') {
      setStatus('error');
      setMessage('File harus berformat PDF.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setStatus('error');
      setMessage('Ukuran file maksimal 10MB.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const fileName = `${nim}_${nama}_${Date.now()}.pdf`;
      const filePath = `uploads/${fileName}`;

      // ⬆️ Upload ke bucket "resume"
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resume')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
      console.log('Upload data:', uploadData);
      console.log('error data:', uploadError);

      if (uploadError) throw uploadError;

      // 🔗 Ambil URL publik
      const { data: publicUrlData } = supabase.storage
        .from('resume')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // 💾 Simpan ke kolom tugas_2 di tabel presensi
      const { error: updateError } = await supabase
        .from('presensi')
        .update({ tugas_2: publicUrl })
        .eq('nim', nim);

      if (updateError) throw updateError;

      setSavedFileUrl(publicUrl);
      setStatus('success');
      setMessage('File berhasil diunggah.');
    } catch (err) {
      console.error('Gagal mengunggah file:', err);
      setStatus('error');
      setMessage('Terjadi kesalahan saat upload. Silakan coba lagi.');
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
              Silakan unggah file resume kamu dalam format PDF (maks. 10MB).
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
                onChange={(e) => setFile(e.target.files[0])}
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
                {status === 'submitting' ? 'Mengunggah...' : 'Kirim'}
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
              Pastikan file sudah sesuai dengan ketentuan sebelum mengunggah.
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
              File resume kamu telah berhasil disimpan.
            </p>

            {savedFileUrl && (
              <div
                className='mt-3 rounded-lg px-4 py-3 text-left break-words border text-sm'
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.accent,
                  color: theme.accent,
                }}>
                <div className='text-xs opacity-80 mb-1'>File terkirim:</div>
                <a
                  href={savedFileUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='underline font-medium'
                  style={{ color: theme.accent }}>
                  {savedFileUrl}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
