'use client';
import { getSupabaseClient } from '@/utils/supabaseClient';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardKehadiran = ({ data }) => {
  const [dataKehadiran, setDataKehadiran] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setDataKehadiran(data);
    }
  }, [data]);

  if (!dataKehadiran || dataKehadiran.length === 0) {
    return (
      <div className='p-8 text-center text-gray-600 font-semibold'>
        Memuat data kehadiran...
      </div>
    );
  }

  const dataGrafik = {
    labels: dataKehadiran.map((d) => `Kelompok ${d.kelompok}`),
    datasets: [
      {
        label: 'Peserta Hadir',
        data: dataKehadiran.map((d) => d.hadir),
        backgroundColor: 'rgb(220, 226, 183)',
        borderColor: 'rgb(220, 226, 183)',
      },
      {
        label: 'Tidak Hadir',
        data: dataKehadiran.map((d) => d.total - d.hadir),
        backgroundColor: 'rgb(104, 98, 50)',
        borderColor: 'rgb(104, 98, 50)',
      },
    ],
  };

  const opsiGrafik = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Kehadiran Peserta per Kelompok',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Jumlah Peserta' },
      },
    },
  };

  return (
    <div className='bg-[#F7F1E7] min-h-screen p-4 sm:p-8 font-sans'>
      <div className='max-w-7xl mx-auto flex flex-col gap-8'>
        <h1 className='text-2xl font-bold text-gray-800 text-center'>
          Rekap Kehadiran Peserta per Kelompok
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {dataKehadiran.map((item) => (
            <div
              key={item.kelompok}
              className='bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition'>
              <div>
                <h2 className='text-lg font-semibold text-[#686232]'>
                  Kelompok {item.kelompok}
                </h2>
                <p className='text-sm text-gray-500 mt-1'>
                  {item.hadir} hadir dari {item.total} peserta
                </p>
              </div>

              <div className='mt-4'>
                <div className='w-full bg-gray-200 rounded-full h-2.5'>
                  <div
                    className='bg-[#DCE2B7] h-2.5 rounded-full'
                    style={{ width: `${item.persentase}%` }}></div>
                </div>
                <p className='text-right text-sm text-gray-600 mt-1'>
                  {item.persentase}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-white rounded-lg shadow-md p-4 h-[400px]'>
          <Bar options={opsiGrafik} data={dataGrafik} />
        </div>
      </div>
    </div>
  );
};

export default DashboardKehadiran;
