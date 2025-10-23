'use client';

import React, { useEffect, useState } from 'react';
import { addTugas } from '../../../api/tugasApi'; // sesuaikan path jika beda
import { useAuth } from '../../../contexts/AuthContext';

export default function PesertaTwibbonForm() {
  const STORAGE_KEY = 'twibbon_submission_v1';

  // Auth/context
  const { isLogin, user, nim } = useAuth();

  // UI state
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');
  const [savedLink, setSavedLink] = useState(null);

  const theme = {
    primary: '#DCE2B7',
    bg: '#F7F1E7',
    accent: '#686232',
  };

  useEffect(() => {
    // baca localStorage saat mount — tapi jangan auto-remove
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const submission = JSON.parse(raw);
        if (submission && submission.link) {
          setSavedLink(submission.link);
          setStatus('success');
        }
      }
    } catch (e) {
      console.error('failed reading submission', e);
    }
  }, []);

  // clear transient message when status changes from error
  useEffect(() => {
    if (status === 'error') {
      const t = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(t);
    }
  }, [status]);

  // Improved Instagram URL validator:
  const isInstagramUrl = (value) => {
    if (!value || typeof value !== 'string') return false;
    const trimmed = value.trim();
    try {
      const u = new URL(trimmed);
      const host = u.hostname.replace('www.', '').toLowerCase();
      // Accept instagram.com or www.instagram.com, also allow shortlinks like ig.me or instagram.app.goo.gl if needed
      if (!host.includes('instagram.com') && !host.includes('instagr.am')) return false;
      // check for typical post/reel/story paths
      const okPath = /\/(p|reel|tv|stories)\//i.test(u.pathname) || /^\/[A-Za-z0-9_.-]+\/?$/.test(u.pathname);
      return okPath && trimmed.length > 10;
    } catch (e) {
      return false;
    }
  };

  const saveToLocalSingle = (submission) => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) return false; // only one submission allowed per client
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submission));
      return true;
    } catch (e) {
      console.error('saveToLocal error', e);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return;

    const trimmed = link.trim();
    if (!trimmed) {
      setStatus('error');
      setMessage('Masukkan link Instagram terlebih dahulu.');
      return;
    }

    if (!isInstagramUrl(trimmed)) {
      setStatus('error');
      setMessage('Tolong masukkan URL Instagram yang valid (contoh: https://www.instagram.com/p/XXXXXXXX/).');
      return;
    }

    if (!nim) {
      setStatus('error');
      setMessage('NIM tidak tersedia. Pastikan kamu sudah login.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    // payload sesuai API kamu: (nim, link) — meniru pola addTugas(nim, url)
    try {
      const res = await addTugas(nim, trimmed);
      // asumsi addTugas melempar error pada non-2xx atau mengembalikan objek hasil
      // Periksa struktur respon sesuai implementasi addTugas
      if (res && (res.ok === false || res.error)) {
        // handle known error shape
        const errMsg = res.error?.message || res.message || 'Gagal menyimpan ke server.';
        throw new Error(errMsg);
      }

      // Simpan ke local only if server sukses
      const submission = { link: trimmed, submittedAt: new Date().toISOString() };
      saveToLocalSingle(submission);

      setStatus('success');
      setSavedLink(trimmed);
      setLink('');
      setMessage('Link berhasil dikirim.');
    } catch (err) {
      console.error('submit error', err);
      // If server returns 403 (forbidden), give actionable hint
      const text = (err && err.message) ? err.message : 'Terjadi kesalahan saat mengirim. Cek konsol.';
      setStatus('error');
      setMessage(text);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: theme.bg }}
    >
      <div
        className="w-full max-w-xl rounded-2xl shadow-md p-8 border"
        style={{ backgroundColor: theme.primary, borderColor: theme.accent }}
      >
        <h1
          className="text-2xl font-semibold mb-6 text-center font-poppins"
          style={{ color: theme.accent }}
        >
          Form Kumpul Twibbon 📸
        </h1>

        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p
              className="text-sm text-center"
              style={{ color: `${theme.accent}cc` }}
            >
              Silakan masukkan link Instagram yang berisi unggahan twibbon kamu.
            </p>

            <label className="block">
              <span
                className="text-sm font-medium"
                style={{ color: theme.accent }}
              >
                Link Instagram
              </span>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://www.instagram.com/p/XXXXXXXX/"
                className="mt-1 block w-full rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none border transition-all"
                style={{
                  borderColor: theme.accent,
                  backgroundColor: theme.bg,
                  color: '#333',
                }}
              />
            </label>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition-all disabled:opacity-60 hover:opacity-90"
                style={{ backgroundColor: theme.accent }}
              >
                {status === 'submitting' ? 'Menyimpan...' : 'Kirim'}
              </button>
            </div>

            {status === 'error' && message && (
              <div
                className="p-3 rounded-md text-sm text-center border"
                style={{
                  backgroundColor: '#fef2f2',
                  color: '#b91c1c',
                  borderColor: '#fecaca',
                }}
              >
                {message}
              </div>
            )}

            <div
              className="mt-4 text-xs text-center"
              style={{ color: `${theme.accent}99` }}
            >
              Pastikan sudah memenuhi seluruh ketentuan upload twibbon.
            </div>
          </form>
        ) : (
          <div className="text-center space-y-3">
            <h2
              className="text-lg font-semibold"
              style={{ color: theme.accent }}
            >
              Terima kasih!
            </h2>
            <p className="text-sm" style={{ color: `${theme.accent}cc` }}>
              Link twibbon kamu telah disimpan.
            </p>

            {savedLink && (
              <div
                className="mt-3 rounded-lg px-4 py-3 text-left break-words border text-sm"
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.accent,
                  color: theme.accent,
                }}
              >
                <div className="text-xs opacity-80 mb-1">Link terkirim:</div>
                <a
                  href={savedLink}
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-medium"
                  style={{ color: theme.accent }}
                >
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
