'use client';
import Image from 'next/image';

export default function IgttpbDesc() {
  return (
      <div className='min-h-screen bg-gradient-to-br from-[#DCE2B7] via-[#E8EDCC] to-[#DCE2B7] p-4 sm:p-8 lg:p-48 font-poppins pb-13'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-20 items-center mt-20'>
            {/* Kolom Kiri: Judul dan Tombol */}
            <div className='animate-fade-in'>
              <div className='mb-5'>
                <p className='inline-flex items-center text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-[#5a5a3d] to-[#7a7447] px-6 py-2 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
                  Welcome to IGTTPB
                  <span className='ml-2 transition-transform duration-300 inline-block group-hover:translate-x-1'>→</span>
                </p>
              </div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#5a5a3d] mb-8 leading-tight'>
                Selamat datang di <br />
                <span className='bg-gradient-to-r from-[#5a5a3d] to-[#5a5a3d] bg-clip-text text-transparent'>IGTTPB</span>
              </h1>

              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:mb-20'>
                <button className='group bg-[#5a5a3d] text-[#F7F1E7] text-sm sm:text-base lg:text-lg px-6 py-3 lg:py-4 font-bold rounded-lg hover:bg-[#F7F1E7] hover:text-[#5a5a3d] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-[#5a5a3d] w-full sm:w-auto'>
                  <a href="#aboutIGTTPB" className='flex items-center justify-center'>
                    <span className='whitespace-nowrap'>Apa itu IGTTPB?</span>
                  </a>
                </button>
                <button className='group bg-[#F7F1E7] text-[#5a5a3d] text-sm sm:text-base lg:text-lg px-6 py-3 lg:py-4 font-bold rounded-lg hover:bg-[#5a5a3d] hover:text-[#F7F1E7] border-2 border-[#5a5a3d] hover:border-[#5a5a3d] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 w-full sm:w-auto'>
                  <a href="#cariKelompok" className='flex items-center justify-center'>
                    <span className='whitespace-nowrap'>Cari Kelompok</span>
                  </a>
                </button>
              </div>
            </div>

            {/* Kolom Kanan Atas: Lingkaran Logo/Gambar */}
            <div className='flex justify-center lg:justify-center'>
              <div className='relative flex items-center justify-center text-center'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#5a5a3d] to-[#5a5a3d] rounded-full blur-2xl opacity-30 animate-pulse'></div>
                <Image
                                  src="/Images/igttpb2025-logo.avif"
                                  alt="Logo IGTTPB2025"
                                  width={250}
                                  height={250}
                                  className="relative mb-6 rounded-full sm:h-[360px] sm:w-[360px] shadow-2xl hover:scale-105 transition-transform duration-500 ring-4 ring-[#F7F1E7] ring-offset-4 ring-offset-[#DCE2B7]"
                                />
              </div>
            </div>
          </div>
        </div>

        <div id="aboutIGTTPB" style={{ scrollMarginTop: '100px' }}>
          <div className='flex justify-center mt-32 lg:mt-48'>
            <p className='bg-gradient-to-r from-[#5a5a3d] to-[#7a7447] rounded-full px-6 py-3 text-[#F7F1E7] font-bold text-md mb-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
              About IGTTPB
            </p>
          </div>
          <h1 className='text-3xl lg:text-5xl font-extrabold text-center bg-gradient-to-r from-[#5a5a3d] to-[#5a5a3d] bg-clip-text text-transparent'>
            Apa itu IGTTPB?
          </h1>
          <p className='text-md lg:text-xl text-center max-w-4xl mx-auto mt-6 text-[#5a5a3d] leading-relaxed'>
            IGTTPB (Informatics Goes to TPB) merupakan Acara First Gathering
            Mahasiswa Baru Teknik Informatika di Institut Teknologi Sumatera.
            IGTTPB berperan sebagai wadah perkenalan diri untuk mengakrabkan
            diri dan saling mengenal satu sama lain.
          </p>
          <div className='max-w-7xl mx-auto bg-[#F7F1E7] mt-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm border border-white/20'>
            <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-8 p-10 text-[#5a5a3d]'>
              <div className='bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-[#5a5a3d]/10'>
                <div className='flex items-center mb-4'>
                  <div className='w-2 h-12 bg-gradient-to-b from-[#5a5a3d] to-[#5a5a3d] rounded-full mr-4'></div>
                  <h1 className='font-bold text-2xl text-[#5a5a3d]'>Visi Kami</h1>
                </div>
                <p className='text-lg leading-relaxed'>
                  Mewujudkan Informatics Goes To TPB (IGTTPB) 2025 sebagai wadah pengenalan, pembinaan dan
                  penguatan fondasi mahasiswa baru Teknik Informatika Itera,
                  yang dikelola secara profesional, komunikatif dan berdampak positif seluruh pihak yang terlibat.
                </p>
              </div>
              <div className='bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-[#5a5a3d]/10'>
                <div className='flex items-center mb-4'>
                  <div className='w-2 h-12 bg-gradient-to-b from-[#5a5a3d] to-[#5a5a3d] rounded-full mr-4'></div>
                  <h1 className='font-bold text-2xl text-[#5a5a3d]'>Misi Kami</h1>
                </div>
                <p className='text-lg leading-relaxed space-y-3'>
                  <span className='block'>1. Menyelenggarakan kegiatan pengenalan akademik dan sosial yang mendukung adaptasi mahasiswa baru di TPB.</span>
                  <span className='block'>2. Memberikan pembekalan akademik (materi dasar Informatika, problem-solving, komunikasi efektif) yang relevan dengan kebutuhan mahasiswa baru.</span>
                  <span className='block'>3. Membantu mahasiswa baru membangun motivasi, karakter tangguh, serta kesiapan menghadapi dunia perkuliahan.</span>
                  <span className='block'>4. Memperkenalkan HMIF sebagai organisasi mahasiswa yang aktif mendampingi proses pembinaan dan pengembangan diri.</span>
                  <span className='block'>5. Membangun hubungan harmonis antara mahasiswa baru dengan kakak tingkat, civitas akademika, serta lingkungan kampus.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }
        `}</style>
      </div>
  );
}