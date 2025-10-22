'use client';

import React, { useEffect, useState } from 'react';

export default function DashTugasAdmin() {
  const theme = {
    primary: '#DCE2B7', 
    bg: '#F7F1E7',  
    accent: '#686232', 
  };

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskEnabled, setTaskEnabled] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  // sample data (mock)
  useEffect(() => {
    const mock = [
      { id: 'a1', link: 'https://www.instagram.com/p/bos1/', submitted_at: new Date().toISOString(), valid: true, name: 'Admin', nim: '125140001' },
      { id: 'a2', link: 'https://www.instagram.com/p/bos2/', submitted_at: new Date().toISOString(), valid: true, name: 'Ahmad Syahrono', nim: '125140002' },
      { id: 'a3', link: 'https://www.instagram.com/p/bos9/', submitted_at: new Date().toISOString(), valid: false, name: 'Ahmad', nim: '125140003' },
    ];

  
    setTimeout(() => {
      setSubmissions(mock);
      setLoading(false);
    }, 300);
  }, []);

  const toggleTask = () => {
    setBusyId('task');
    setTimeout(() => {
      setTaskEnabled((s) => !s);
      setBusyId(null);
    }, 250);
  };

  const markInvalidLocal = (id, makeInvalid = true) => {
    setBusyId(id);
    setTimeout(() => {
      setSubmissions((prev) => prev.map((p) => (p.id === id ? { ...p, valid: !makeInvalid } : p)));
      setBusyId(null);
    }, 200);
  };

  const removeLocal = (id) => {
    if (!confirm('Yakin hapus submission ini?')) return;
    setBusyId(id);
    setTimeout(() => {
      setSubmissions((prev) => prev.filter((p) => p.id !== id));
      setBusyId(null);
    }, 200);
  };

  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      alert('Link disalin ke clipboard');
    } catch {
      alert('Gagal menyalin link');
    }
  };

  return (
    <div style={{ background: theme.bg }} className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <h1 style={{ color: theme.accent }} className="text-2xl font-semibold">Tugas Twibbon</h1>

          <div className="flex items-center gap-3">
            <div style={{ color: theme.accent }} className="text-sm">Status pengumpulan:</div>
            <button
              onClick={toggleTask}
              disabled={busyId === 'task'}
              style={{
                background: taskEnabled ? theme.accent : '#b91c1c',
                color: '#fff'
              }}
              className="px-3 py-2 rounded-md font-medium shadow-sm">
              {busyId === 'task' ? 'Memproses...' : taskEnabled ? 'Aktif' : 'Dinonaktifkan'}
            </button>
          </div>
        </div>

        {/* top cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div style={{ color: theme.accent }} className="text-sm font-medium">Total Peserta Kumpul</div>
                <div className="mt-3 text-4xl font-bold" style={{ color: theme.accent }}>
                  {submissions.filter(s => s.valid !== false).length}
                  <span className="text-xl font-normal"> / {submissions.length}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">Jumlah peserta yang mengumpulkan</div>
              </div>
              <div style={{ background: theme.primary, color: theme.accent }} className="rounded-full px-4 py-3 shadow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill={theme.accent}></path></svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium mb-2" style={{ color: theme.accent }}>Status</div>
            <div className="flex items-center gap-4">
              <div>
                <div style={{ color: theme.accent }} className="text-lg font-semibold">{submissions.filter(s => s.valid !== false).length}</div>
                <div className="text-xs text-gray-500">Valid</div>
              </div>
              <div>
                <div style={{ color: '#b91c1c' }} className="text-lg font-semibold">{submissions.filter(s => s.valid === false).length}</div>
                <div className="text-xs text-gray-500">Tidak valid</div>
              </div>
            </div>
          </div>
        </div>

        {/* search (visual only) */}
        <div className="mb-4">
          <input
            placeholder="Cari NIM peserta..."
            className="w-full p-3 rounded-lg border border-gray-200 shadow-sm"
            style={{ background: '#fff' }}
            disabled
          />
          <div className="text-xs text-gray-400 mt-1">Jangan cari pake nama</div>
        </div>

        {/* submissions table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr style={{ background: theme.primary }}>
                <th className="p-4 text-left" style={{ color: theme.accent }}>No.</th>
                <th className="p-4 text-left" style={{ color: theme.accent }}>Nama (NIM)</th>
                <th className="p-4 text-left" style={{ color: theme.accent }}>Link</th>
                <th className="p-4 text-left" style={{ color: theme.accent }}>Waktu</th>
                <th className="p-4 text-left" style={{ color: theme.accent }}>Valid</th>
                <th className="p-4 text-left" style={{ color: theme.accent }}>Ubah</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-6 text-center text-gray-500">Memuat...</td></tr>
              ) : submissions.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-gray-500">Belum ada submission.</td></tr>
              ) : (
                submissions.map((s, idx) => (
                  <tr key={s.id} className="border-t last:border-b">
                    <td className="p-3 align-top text-sm">{idx + 1}</td>
                    <td className="p-3 align-top text-sm">
                      <div style={{ color: theme.accent, fontWeight: 600 }}>{s.name}</div>
                      <div className="text-xs text-gray-500">{s.nim}</div>
                    </td>
                    <td className="p-3 align-top text-sm break-words max-w-xs">
                      <a href={s.link} target="_blank" rel="noreferrer" style={{ color: theme.accent }} className="underline">{s.link}</a>
                    </td>
                    <td className="p-3 align-top text-sm">{new Date(s.submitted_at).toLocaleString()}</td>
                    <td className="p-3 align-top text-sm">{s.valid === false ? <span style={{ color: '#b91c1c' }}>Tidak valid</span> : <span style={{ color: theme.accent }}>Valid</span>}</td>
                    <td className="p-3 align-top text-sm">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => copyLink(s.link)} className="px-2 py-1 rounded border text-xs">Salin</button>

                        <button
                          onClick={() => markInvalidLocal(s.id, true)}
                          disabled={busyId === s.id}
                          className="px-2 py-1 rounded border text-xs"
                          style={{ background: '#fef3c7' }}>
                          Tandai Salah
                        </button>

                        <button
                          onClick={() => markInvalidLocal(s.id, false)}
                          disabled={busyId === s.id}
                          className="px-2 py-1 rounded border text-xs"
                          style={{ background: '#ecfdf5' }}>
                          Tandai Benar
                        </button>

                      {/* pake ga ya? */}
                        {/* <button
                          onClick={() => removeLocal(s.id)}
                          disabled={busyId === s.id}
                          className="px-2 py-1 rounded border text-xs"
                          style={{ color: '#b91c1c' }}>
                          Hapus
                        </button> */} 


                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Catatan: <br></br>
          1. Dimohon kepada Dapmen untuk memantau tugas peserta sesuai kelompok secara berkala<br></br>
          2. Klik `Tandai Salah`` jika terdapat kesalahan dalam pengumpulan tugas<br></br></div>
      </div>
    </div>
  );
}
