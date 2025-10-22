'use client';

import React from 'react';
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

// 3. Daftarkan komponen-komponen tersebut ke Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardKehadiran = () => {
  // --- DATA UNTUK GRAFIK ---
  const dataGrafik = {
    labels: ['Day 1'], // Label untuk sumbu X
    datasets: [
      {
        label: 'Peserta Hadir',
        data: [180, 210], // Data untuk Day 1 dan Day 2
        backgroundColor: 'rgb(220, 226, 183)',
        borderColor: 'rgb(220, 226, 183)',
        borderWidth: 1,
      },
      {
        label: 'Tidak Hadir',
        data: [70, 40], // Data untuk Day 1 dan Day 2
        backgroundColor: 'rgb(104, 98, 50)', // Warna merah
        borderColor: 'rgb(104, 98, 50)',
        borderWidth: 1,
      },
    ],
  };

  // --- OPSI UNTUK TAMPILAN GRAFIK ---
  const opsiGrafik = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grafik Kehadiran Peserta', // Judul grafik
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Sumbu Y dimulai dari 0
        title: {
          display: true,
          text: 'Jumlah Peserta',
        },
      },
    },
  };

  // --- DATA DUMMY  TOTAL PESERTA ---
  const totalPesertaHadir = 210;
  const totalPeserta = 250;

  return (
    <div className='bg-[#F7F1E7] h-fit p-4 sm:p-8 font-sans'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Kartu Jumlah Peserta */}
          <div className='lg:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-lg font-semibold text-gray-600 mb-4'>
              Total Peserta Hadir (Day 2)
            </h2>
            <div className='flex items-end gap-2'>
              <span className='text-5xl font-bold text-gray-800'>
                {totalPesertaHadir}
              </span>
              <span className='text-xl text-gray-500 mb-1'>
                / {totalPeserta}
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5 mt-4'>
              <div
                className='bg-blue-600 h-2.5 rounded-full'
                style={{
                  width: `${(totalPesertaHadir / totalPeserta) * 100}%`,
                }}></div>
            </div>
            <p className='text-sm text-gray-500 mt-2'>
              {((totalPesertaHadir / totalPeserta) * 100).toFixed(1)}% Kehadiran
            </p>
          </div>

          {/* Kartu Grafik */}
          <div className='lg:col-span-2 bg-white p-6 rounded-lg shadow-md'>
            <Bar options={opsiGrafik} data={dataGrafik} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardKehadiran;
