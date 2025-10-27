'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { getNimFromLocal, getNamaFromLocal } from '@/utils/localRole';

export default function TugasResumeHybrid() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [savedUrl, setSavedUrl] = useState(null);
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');

  const theme = {
    primary: '#DCE2B7',
    bg: '#F7F1E7',
    accent: '#686232',
  };

  // Ambil data user lokal
  useEffect(() => {
    const localNim = getNimFromLocal();
    if (localNim) setNim(localNim);
    const localNama = getNamaFromLocal();
    if (localNama) setNama(localNama);
  }, []);

  // Cek apakah user sudah pernah upload
  useEffect(() => {
    const fetchExisting = async () => {
      if (!nim) return;
      try {
        const { data, error } = await supabase
          .from('presensi')
          .select('tugas_2')
          .eq('nim', nim)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (data?.tugas_2) {
          setSavedUrl(data.tugas_2);
          setStatus('success');
        }
      } catch (err) {
        console.error('Gagal memuat data tugas:', err);
      }
    };

    fetchExisting();
  }, [nim]);

  const isValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // --- PRIORITAS: LINK ---
    if (link && link.trim() !== '') {
      if (!isValidUrl(link.trim())) {
        setStatus('error');
        setMessage('Link tidak valid. Pastikan format URL benar.');
        return;
      }

      setStatus('submitting');
      try {
        console.log(link);
        console.log(link.trim());
        const { error: updateError } = await supabase
          .from('presensi')
          .update({ tugas_2: link.trim() })
          .eq('nim', nim);

        if (updateError) throw updateError;

        setSavedUrl(link.trim());
        setStatus('success');
        setMessage('Link berhasil disimpan.');
      } catch (err) {
        console.error('Gagal menyimpan link:', err);
        setStatus('error');
        setMessage('Terjadi kesalahan saat menyimpan link.');
      }
      return;
    }

    // --- FALLBACK: FILE PDF ---
    if (!file) {
      setStatus('error');
      setMessage('Silakan masukkan link atau pilih file PDF untuk diunggah.');
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

    try {
      const fileName = `${nim}_${nama}_${Date.now()}.pdf`;
      const filePath = `uploads/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resume')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('resume')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from('presensi')
        .update({ tugas_2: publicUrl })
        .eq('nim', nim);

      if (updateError) throw updateError;

      setSavedUrl(publicUrl);
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
              Kamu bisa mengumpulkan tugas dengan **upload file PDF** atau **link
              Google Drive** (previewable).
            </p>

            {/* Input link */}
            <label className='block'>
              <span
                className='text-sm font-medium'
                style={{ color: theme.accent }}>
                Link Google Drive / URL
              </span>
              <input
                type='url'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder='https://drive.google.com/file/d/XXXX/view'
                className='mt-1 block w-full rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none border transition-all'
                style={{
                  borderColor: theme.accent,
                  backgroundColor: theme.bg,
                  color: '#333',
                }}
              />
            </label>

            {/* Divider “atau” */}
            <div className='flex items-center justify-center gap-3'>
              <div
                className='flex-grow h-px'
                style={{ backgroundColor: `${theme.accent}44` }}
              />
              <span
                className='text-sm font-medium'
                style={{ color: `${theme.accent}aa` }}>
                atau
              </span>
              <div
                className='flex-grow h-px'
                style={{ backgroundColor: `${theme.accent}44` }}
              />
            </div>

            {/* Input file */}
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

            {/* Tombol kirim */}
            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={status === 'submitting'}
                className='px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition-all disabled:opacity-60 hover:opacity-90'
                style={{ backgroundColor: theme.accent }}>
                {status === 'submitting' ? 'Menyimpan...' : 'Kirim'}
              </button>
            </div>

            {/* Error message */}
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
              Pastikan file atau link sudah benar sebelum mengirim.
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
              Tugas kamu telah berhasil disimpan.
            </p>

            {savedUrl && (
              <div
                className='mt-3 rounded-lg px-4 py-3 text-left break-words border text-sm'
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.accent,
                  color: theme.accent,
                }}>
                <div className='text-xs opacity-80 mb-1'>File/Link terkirim:</div>
                <a
                  href={savedUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='underline font-medium'
                  style={{ color: theme.accent }}>
                  {savedUrl}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
