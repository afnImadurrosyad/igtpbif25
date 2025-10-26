'use client';

// DIPAKE JADI OPSI KE-2
import { addTugas } from "@/api/tugasApi";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";

export default function TugasResumeForm() {
  const { isLogin, user, nim } = useAuth();

  const [link, setLink] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [savedLink, setSavedLink] = useState(null);

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
          setSavedLink(data.tugas_2);
          setStatus('success');
        }
      } catch (err) {
        console.error('Gagal memuat data presensi:', err);
      }
    };

    fetchPresensi();
  }, [nim]);

  const isDriveUrl = (value) => {
    if (!value || typeof value !== 'string') return false;
    const trimmed = value.trim();
    try {
      const u = new URL(trimmed);
      const host = u.hostname.replace('www.', '').toLowerCase();
      if (!host.includes('drive.google.com')) return false;
      const okPath = /^\/folders\/[A-Za-z0-9_.-]+\/?$/.test(u.pathname);
      return okPath && trimmed.length > 10;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return;

    const trimmedLink = link.trim();

    if (!trimmedLink) {
      setMessage('URL tidak boleh kosong.');
      setStatus('error');
      return;
    }

    if (!isDriveUrl(trimmedLink)) {
      setMessage('Harap masukkan URL Google Drive yang valid.');
      setStatus('error');
      return;
    }

    if (!nim) {
      setMessage('NIM tidak tersedia. Pastikan kamu sudah login.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await addTugas(nim, trimmedLink);

      if (res && (res.ok === false || res.error)) {
        const errMsg = res.error?.message || 'Gagal mengirim tugas. Silakan coba lagi.';
        throw new Error(errMsg);
      }

      setStatus('success');
      setSavedLink(trimmedLink);
      setLink('');
      setMessage('Tugas berhasil dikirim. Terima kasih!');
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Terjadi kesalahan saat mengirim tugas.');
    }
  }

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
          Form Kumpul Resume 📸
        </h1>

        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className='space-y-5'>
            <p
              className='text-sm text-center'
              style={{ color: `${theme.accent}cc` }}>
              Silakan masukkan link Instagram yang berisi unggahan twibbon kamu.
            </p>

            <label className='block'>
              <span
                className='text-sm font-medium'
                style={{ color: theme.accent }}>
                Link Instagram
              </span>
              <input
                type='url'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder='https://'
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
              Pastikan sudah memenuhi seluruh ketentuan upload twibbon.
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
              Link twibbon kamu telah disimpan.
            </p>

            {savedLink && (
              <div
                className='mt-3 rounded-lg px-4 py-3 text-left break-words border text-sm'
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.accent,
                  color: theme.accent,
                }}>
                <div className='text-xs opacity-80 mb-1'>Link terkirim:</div>
                <a
                  href={savedLink}
                  target='_blank'
                  rel='noreferrer'
                  className='underline font-medium'
                  style={{ color: theme.accent }}>
                  {savedLink}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}