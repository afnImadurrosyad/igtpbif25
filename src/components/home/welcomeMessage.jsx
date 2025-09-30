export default function IgttpbDesc() {
  return (
      <div className='min-h-screen bg-[#DCE2B7] p-4 sm:p-8 lg:p-12 font-poppins pb-13'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-center mt-20'>
            {/* Kolom Kiri: Judul dan Tombol */}
            <div>
              <div className='mb-5'>
                <p className='inline-flex items-center text-lg font-semibold tracking-wider uppercase bg-[#686232] px-3 py-1 rounded-full text-white'>
                  Welcome to IGTTPB
                  <span className='ml-1'>→</span>
                </p>
              </div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-extrabold '>
                Selamat datang di <br />
                IGTTPB
              </h1>

              <div className='flex space-x-4 pt-5 lg:mb-20'>
                <button className='bg-[#686232] text-[#F7F1E7] px-6 py-3 font-bold rounded-lg hover:bg-[#F7F1E7] hover:text-[#686232] transition'>
                <a href="#aboutIGTTPB">Apa itu IGTTPB?</a>
                </button>
                <button className='bg-[#F7F1E7] text-[#686232] px-6 py-3 font-bold rounded-lg hover:bg-[#DCE2B7] hover:text-[#686232] border hover:border-[#686232] transition'>
                <a href="#cariKelompok">Cari Kelompok</a>
                </button>
              </div>
            </div>

            {/* Kolom Kanan Atas: Lingkaran Logo/Gambar */}
            <div className='flex justify-center lg:justify-center'>
              <div className='flex items-center justify-center text-center  '>
                <img
                  src='igttpb.jpg'
                  alt='Logo IGTTPB'
                  className='mb-6 rounded-full h-[250px] w-[250px] sm:h-[360px] sm:w-[360px]'
                />
              </div>
            </div>
          </div>
        </div>

        <div id="aboutIGTTPB">
          <div className='flex justify-center mt-48' >
            <p className='bg-[#686232] rounded-full px-4 py-2 text-[#F7F1E7] font-bold text-md mb-3' >
              About IGTTPB
            </p>
          </div>
          <h1 className='text-3xl lg:text-5xl font-extrabold text-center text-black'>
            Apa itu IGTTPB?
          </h1>
          <p className='text-md lg:text-xl text-center max-w-4xl mx-auto mt-6'>
          Mewujudkan Informatics Goes To TPB (IGTTPB) 2025 sebagai wadah pengenalan, pembinaan dan
          penguatan fondasi mahasiswa baru Teknik Informatika Itera,
          yang dikelola secara profesional, komunikatif dan berdampak positif seluruh pihak yang terlibat.
          </p>
          <div className='max-w-7xl mx-auto bg-[#F7F1E7] mt-10 rounded-2xl'>
            <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-6 p-8'>
              <div>
                <h1 className='font-bold text-2xl mb-3'>Visi Kami</h1>
                <p className='text-lg'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, hic, minus vitae atque tempore mollitia autem, sit
                  saepe id consequatur nisi itaque numquam necessitatibus
                  doloremque?
                </p>
              </div>
              <div>
                <h1 className='font-bold text-2xl mb-3'>Misi Kami</h1>
                <p className='text-lg'>
          1.Menyelenggarakan kegiatan pengenalan akademik dan sosial yang mendukung
          adaptasi mahasiswa baru di TPB.
          2.Memberikan pembekalan akademik (materi dasar Informatika, problem-solving,
          komunikasi efektif) yang relevan dengan kebutuhan mahasiswa baru.
          3.Membantu mahasiswa baru membangun motivasi, karakter tangguh, serta
          kesiapan menghadapi dunia perkuliahan.
          4.Memperkenalkan HMIF sebagai organisasi mahasiswa yang aktif mendampingi
          proses pembinaan dan pengembangan diri.
          5.Membangun hubungan harmonis antara mahasiswa baru dengan kakak tingkat,
          civitas akademika, serta lingkungan kampus
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
