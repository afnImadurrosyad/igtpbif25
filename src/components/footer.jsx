import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F7F1E7] left-0 w-full z-10">
      <div className="flex flex-col md:flex-row md:items-start items-start justify-between gap-10 px-6 py-10 max-w-6xl mx-auto">
        {/* logo */}
        <div className="flex justify-center md:justify-start w-full md:w-auto order-1">
          <Image
            src="/Images/igttpb25_logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        </div>

        {/* contact */}
        <div className="text-[#5a5a3d] space-y-2.5 w-full md:w-auto order-4 md:order-2 ">
          <h2 className="text-xl font-bold text-center md:text-start">Contact Us</h2>
          <p className="mt-2 text-sm flex items-center">
            <MapPin className="mr-2 shrink-0" size={21} />
            Jl. Terusan Ryacudu · (0721) 8030188
          </p>
          <p className="mt-1.5 text-sm flex items-center">
            <Mail className="mr-2 shrink-0" size={21} />
            algovistaitera@gmail.com
          </p>
          <p className="mt-1.5 text-sm flex items-center">
            <Phone className="mr-2 shrink-0" size={21} />
            +62 812-9891-1597
          </p>
          <p className="mt-1.5 text-sm flex items-center">
            <Instagram className="mr-2 shrink-0" size={21} />
            @informatics.goestpb
          </p>
        </div>

        {/* pages */}
        <div className="text-[#5a5a3d] space-y-2.5 w-full md:w-auto order-1 md:order-3 text-center md:text-start">
          <h2 className="text-xl font-bold">Pages</h2>
          <ul className="flex flex-wrap justify-center md:block gap-x-4 gap-y-2 mt-2 font-medium">
            <li><a href="/" className="text-sm">Home</a></li>
            <li><a href="#cariKelompok" className="text-sm">Pengumuman</a></li>
            <li><a href="#faq" className="text-sm">FAQ</a></li>
          </ul>
        </div>

        {/* about */}
        <div className="text-[#5a5a3d] space-y-2.5 w-full md:max-w-xs order-2 md:order-4 text-center md:text-start">
          <h2 className="text-xl font-bold">About</h2>
          <p className="mt-2 text-sm">
            IGTTPB merupakan First Gathering Mahasiswa Teknik Informatika di Institut Teknologi Sumatera.
            IGTTPB berperan sebagai wadah perkenalan diri untuk saling mengenal satu sama lain.
          </p>
        </div>
      </div>


      {/* bottom bar */}
      <div className="w-full bg-[#5a5a3d] text-[#F7F1E7] py-2 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-2">
          <p className="whitespace-nowrap text-[10px] sm:text-[12px] md:text-sm">
            Copyright © 2025. IGTTPB25 - All Rights Reserved | Developed by Algovista
          </p>
        </div>
      </div>


    </footer>
  );
}