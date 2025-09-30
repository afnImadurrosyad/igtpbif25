// src/components/home/HasilPencarian.jsx
"use client";

const HasilPencarian = ({ data }) => {
  return (
    // Wadah utama: Hijau Zaitun (Saguaro)
    <div className="bg-[#686232] text-white p-6 sm:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl">
      <h2 className="text-center text-lg font-medium text-white mb-8">
        Data ditemukan
      </h2>

      <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8">
        <div>
          <p className="text-sm text-lime-100">Nama</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {data.nama}
          </p>
        </div>
        <div>
          <p className="text-sm text-lime-100">NIM</p>
          <p className="text-xl sm:text-2xl font-bold text-white">{data.nim}</p>
        </div>
        <div>
          <p className="text-sm text-lime-100">Kelompok</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {data.kelompok}
          </p>
        </div>
        <div>
          <p className="text-sm text-lime-100">Daplok</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {data.daplok}
          </p>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="text-center mb-10">
        <button className="bg-white text-[#686232] font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200">
          Hubungi Daplok
        </button>
      </div>

      {/* Daftar Anggota Lainnya Container */}
      {/* Warna container anggota lainnya: Mirip Lime Granita / White Flour yang lebih gelap */}
      <div className="bg-[#F7F1E7] p-6 rounded-lg text-[#2F2F30]">
        <h3 className="text-lg font-medium text-[#686232] mb-4">
          Anggota Lainnya
        </h3>
        <div className="space-y-2">
          {/* Header Tabel */}
          <div className="flex justify-between text-sm text-[#2F2F30] px-4"></div>
          {/* Daftar Anggota dengan warna selang-seling */}
          {data.anggotaLainnya.map((anggota, index) => (
            <div
              key={index}
              className={`flex justify-between p-4 rounded-lg ${
                index % 2 === 0
                  ? "bg-[#DCE2B7] text-[#686232]" // Lebih terang dari Lime Granita
                  : "bg-[#686232] text-[#DCE2B7]" // Lebih gelap dari Lime Granita (atau Saguaro pudar)
              }`}
            >
              <p
                className={`font-medium ${
                  index % 2 === 0 ? "text-[#2F2F30]" : "text-white"
                }`}
              >
                {anggota.nama}
              </p>
              <p
                className={`${
                  index % 2 === 0 ? "text-[#2F2F30]" : "text-white"
                }`}
              >
                {anggota.nim}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HasilPencarian;
