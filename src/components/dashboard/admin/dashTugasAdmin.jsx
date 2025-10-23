'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { getSupabaseClient } from '@/utils/supabaseClient';

export default function DashTugasAdmin() {
  const supabase = getSupabaseClient();
  const theme = {
    primary: '#DCE2B7',
    bg: '#F7F1E7',
    accent: '#686232',
  };

  const [presensi, setPresensi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  const getPresensi = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('presensi')
        .select('nim, nama, kelompok, tugas_1, submitted_at, valid')
        .order('kelompok', { ascending: true })
        .order('nama', { ascending: true });

      if (err) throw err;

      const sorted = data.sort((a, b) => {
        if (a.tugas_1 && !b.tugas_1) return -1;
        if (!a.tugas_1 && b.tugas_1) return 1;
        return 0;
      });

      setPresensi(sorted || []);
    } catch (err) {
      console.error('getPresensi error', err);
      setError('Gagal memuat data dari Supabase');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const setValidStatus = async (nim, valid) => {
    setBusyId(nim);
    try {
      const { error } = await supabase
        .from('presensi')
        .update({ valid })
        .eq('nim', nim);

      if (error) throw error;

      alert('Status validasi berhasil diperbarui!');
      // window.location.reload();
    } catch (err) {
      console.error('setValidStatus error', err);
      alert('Gagal memperbarui status validasi.');
    } finally {
      setBusyId(null);
    }
  };

  useEffect(() => {
    getPresensi();
  }, [getPresensi]);

  useEffect(() => {
    const channel = supabase
      .channel('presensi-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'presensi' },
        (payload) => {
          const { eventType, new: newRow, old: oldRow } = payload;
          setPresensi((prev) => {
            if (eventType === 'INSERT') return [newRow, ...prev];
            if (eventType === 'UPDATE')
              return prev.map((p) => (p.nim === newRow.nim ? newRow : p));
            if (eventType === 'DELETE')
              return prev.filter((p) => p.nim !== oldRow.nim);
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const totalPeserta = presensi.length;
  const sudahKumpul = presensi.filter((p) => p.tugas_1).length;
  const belumKumpul = totalPeserta - sudahKumpul;

  return (
    <div style={{ background: theme.bg }} className='min-h-screen p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <h1
          style={{ color: theme.accent }}
          className='text-2xl font-semibold mb-4'>
          Dashboard Presensi Tugas 1
        </h1>

        {/* Statistik */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='bg-white p-5 rounded-lg shadow'>
            <div
              style={{ color: theme.accent }}
              className='text-sm font-medium'>
              Total Peserta
            </div>
            <div className='mt-2 text-3xl  text-green-700 font-bold'>
              {totalPeserta}
            </div>
          </div>

          <div className='bg-white p-5 rounded-lg shadow'>
            <div
              style={{ color: theme.accent }}
              className='text-sm font-medium'>
              Sudah Mengumpulkan
            </div>
            <div className='mt-2 text-3xl font-bold text-green-700'>
              {sudahKumpul}
            </div>
          </div>

          <div className='bg-white p-5 rounded-lg shadow'>
            <div
              style={{ color: theme.accent }}
              className='text-sm font-medium'>
              Belum Mengumpulkan
            </div>
            <div className='mt-2 text-3xl font-bold text-red-600'>
              {belumKumpul}
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className='bg-white rounded-lg shadow overflow-x-auto'>
          <table className='w-full table-auto'>
            <thead>
              <tr style={{ background: theme.primary }}>
                <th className='p-3 text-left' style={{ color: theme.accent }}>
                  No
                </th>
                <th className='p-3 text-left' style={{ color: theme.accent }}>
                  Nama
                </th>
                <th className='p-3 text-left' style={{ color: theme.accent }}>
                  NIM
                </th>
                <th className='p-3 text-left' style={{ color: theme.accent }}>
                  Kelompok
                </th>
                <th className='p-3 text-left' style={{ color: theme.accent }}>
                  Link Tugas
                </th>
                <th className='p-3 text-left' style={{ color: theme.accent }}>
                  Status
                </th>
                <th className='p-3 text-left' style={{ color: theme.accent }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan='7' className='text-center p-6 text-gray-500'>
                    Memuat data...
                  </td>
                </tr>
              ) : presensi.length === 0 ? (
                <tr>
                  <td colSpan='7' className='text-center p-6 text-gray-500'>
                    Tidak ada data peserta.
                  </td>
                </tr>
              ) : (
                presensi.map((p, i) => (
                  <tr key={p.nim} className='border-t'>
                    <td className='p-3  text-gray-600 text-sm'>{i + 1}</td>
                    <td className='p-3  text-gray-600 text-sm font-medium'>
                      {p.nama}
                    </td>
                    <td className='p-3  text-gray-600 text-sm'>{p.nim}</td>
                    <td className='p-3  text-gray-600 text-sm'>{p.kelompok}</td>
                    <td className='p-3  text-gray-600 text-sm break-words max-w-xs'>
                      {p.tugas_1 ? (
                        <a
                          href={p.tugas_1}
                          target='_blank'
                          rel='noreferrer'
                          className='text-blue-600 underline'>
                          Lihat Tugas
                        </a>
                      ) : (
                        <span className='text-gray-400 italic'>
                          Belum upload
                        </span>
                      )}
                    </td>
                    <td className='p-3 text-sm'>
                      {p.tugas_1 ? (
                        p.valid ? (
                          <span className='text-green-700 font-medium'>
                            ✅ Sudah Benar
                          </span>
                        ) : (
                          <span className='text-yellow-600 font-medium'>
                            ⚠️ Belum Benar
                          </span>
                        )
                      ) : (
                        <span className='text-gray-400 italic'>
                          Belum upload
                        </span>
                      )}
                    </td>
                    <td className='p-3 text-sm'>
                      {p.tugas_1 && (
                        <div className='flex gap-2 flex-wrap'>
                          <button
                            onClick={() => setValidStatus(p.nim, true)}
                            disabled={busyId === p.nim}
                            className='px-2 py-1 text-xs rounded bg-green-100 border border-green-500 text-green-800 hover:bg-green-200'>
                            {busyId === p.nim ? '⏳ Memproses...' : 'Benar'}
                          </button>
                          <button
                            onClick={() => setValidStatus(p.nim, false)}
                            disabled={busyId === p.nim}
                            className='px-2 py-1 text-xs rounded bg-yellow-100 border border-yellow-500 text-yellow-800 hover:bg-yellow-200'>
                            {busyId === p.nim
                              ? '⏳ Memproses...'
                              : 'Belum Benar'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {error && (
          <div className='mt-4 text-sm text-red-600'>Error: {error}</div>
        )}
      </div>
    </div>
  );
}
