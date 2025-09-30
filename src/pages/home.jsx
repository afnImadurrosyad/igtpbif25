import IgttpbDesc from '../components/home/welcomeMessage';
import InfoKelompok from '../components/home/infoKelompok';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className='min-h-screen bg-[#DCE2B7] font-poppins'>
        {/* Hero Section */}
        <div className='px-4 sm:px-8 lg:px-12 pt-24 sm:pt-32 lg:pt-16 pb-12 lg:pb-0'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-10 items-start lg:items-center lg:mt-40'>
              {/* Kolom Kiri: Judul dan Tombol */}
              <div>
                <div className='mb-5'>
                  <p className='inline-flex items-center text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#686232] px-4 sm:px-5 py-2 rounded-full text-white'>
                    Welcome to IGTTPB
                    <span className='ml-1'>→</span>
                  </p>
                </div>
                <h1 className='text-[40px] sm:text-5xl lg:text-7xl font-extrabold text-[#686232] leading-[1.1] mb-8'>
                  Selamat datang di IGTTPB
                </h1>

                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 lg:mb-20'>
                  <button className='bg-[#686232] text-[#F7F1E7] text-sm sm:text-base px-6 py-3 font-semibold rounded-xl hover:bg-[#555020] transition'>
                    Apa itu IGTTPB?
                  </button>
                  <button className='bg-[#F7F1E7] text-[#686232] text-sm sm:text-base px-6 py-3 font-semibold rounded-xl hover:bg-white transition'>
                    Cari Kelompok
                  </button>
                </div>
              </div>

              {/* Kolom Kanan: Lingkaran Logo/Gambar */}
              <div className='flex justify-center lg:justify-end'>
                <div className='w-full max-w-[380px] lg:max-w-[420px]'>
                  <img
                    src='igttpb.jpg'
                    alt='Logo IGTTPB'
                    className='w-full aspect-square rounded-full object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section*/}
        <div className='px-4 sm:px-8 lg:px-12 py-16 lg:py-52'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex justify-center mb-5'>
              <p className='bg-[#686232] rounded-full px-5 py-2 text-[#F7F1E7] font-semibold text-xs sm:text-sm'>
                About IGTTPB
              </p>
            </div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#686232] mb-6'>
              Apa itu IGTTPB?
            </h1>
            <p className='text-base sm:text-lg lg:text-xl text-center max-w-4xl mx-auto text-[#686232] leading-relaxed mb-10'>
              IGTTPB (Informatics Goes to TPB) merupakan Acara First Gathering
              Mahasiswa Baru Teknik Informatika di Institut Teknologi Sumatera.
              IGTTPB berperan sebagai wadah perkenalan diri untuk mengakrabkan
              diri dan saling mengenal satu sama lain.
            </p>
            
            <div className='bg-[#F7F1E7] rounded-2xl text-[#686232] shadow-lg'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-10'>
                <div>
                  <h1 className='font-bold text-xl sm:text-2xl mb-3'>Misi Kami</h1>
                  <p className='text-sm sm:text-base lg:text-lg leading-relaxed'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt, hic, minus vitae atque tempore mollitia autem, sit
                    saepe id consequatur nisi itaque numquam necessitatibus
                    doloremque?
                  </p>
                </div>
                <div>
                  <h1 className='font-bold text-xl sm:text-2xl mb-3'>Visi Kami</h1>
                  <p className='text-sm sm:text-base lg:text-lg leading-relaxed'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt, hic, minus vitae atque tempore mollitia autem, sit
                    saepe id consequatur nisi itaque numquam necessitatibus
                    doloremque?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}