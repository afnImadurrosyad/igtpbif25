'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu PPLK?",
      answer: "PPLK (Praktik Pengenalan Lapangan Kependidikan) adalah program mata kuliah yang memberikan kesempatan kepada mahasiswa untuk mengenal, mengamati, dan memahami berbagai aspek pendidikan di lapangan secara langsung."
    },
    {
      question: "Apa tujuan dari diadakannya PPLK?",
      answer: "Tujuan PPLK adalah untuk memberikan pengalaman praktis kepada mahasiswa dalam memahami lingkungan pendidikan, mengembangkan kompetensi profesional, dan mempersiapkan diri sebagai calon pendidik yang berkualitas."
    },
    {
      question: "Bagaimana cara mengedit informasi media sosial di profil saya?",
      answer: "Anda dapat mengedit informasi media sosial dengan masuk ke pengaturan profil, pilih bagian 'Media Sosial', kemudian tambahkan atau ubah link akun media sosial Anda seperti Instagram, Twitter, atau LinkedIn."
    },
    {
      question: "Apa fungsi dari QR Code di halaman profil?",
      answer: "QR Code di halaman profil berfungsi untuk memudahkan orang lain mengakses profil Anda dengan cepat. Cukup pindai QR Code tersebut menggunakan kamera smartphone untuk langsung membuka halaman profil Anda."
    },
    {
      question: "Apa bentuk dukungan fakultas terhadap mahasiswa yang ingin meneliti dan membuat inovasi baru?",
      answer: "Fakultas menyediakan berbagai dukungan seperti pendanaan penelitian, akses laboratorium, bimbingan dosen pembimbing, workshop pengembangan riset, serta kesempatan untuk mempresentasikan hasil penelitian dalam seminar dan konferensi."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#5a5a3d' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[350px,1fr] gap-8">
          {/* Sidebar */}
          <div>
            <h1 className="text-5xl font-bold mb-8" style={{ 
              color: '#5a5a3d',
              fontFamily: 'serif',
              letterSpacing: '2px'
            }}>
              FREQUENTLY<br />ASKED<br />QUESTIONS
            </h1>
            
            <div className="space-y-4">
              <button 
                className="w-full text-left px-6 py-4 rounded-lg flex items-center justify-between transition-all hover:opacity-80"
                style={{ backgroundColor: '#e8dcc8' }}
              >
                <span style={{ color: '#5a5a3d', fontWeight: '500' }}>Visit FAQ</span>
                <span style={{ color: '#5a5a3d' }}>→</span>
              </button>
              
              <button 
                className="w-full text-left px-6 py-4 rounded-lg flex items-center justify-between transition-all hover:opacity-80"
                style={{ backgroundColor: '#e8dcc8' }}
              >
                <span style={{ color: '#5a5a3d', fontWeight: '500' }}>Visit Dokumentasi</span>
                <span style={{ color: '#5a5a3d' }}>→</span>
              </button>
              
              <button 
                className="w-full text-left px-6 py-4 rounded-lg flex items-center justify-between transition-all hover:opacity-80"
                style={{ backgroundColor: '#e8dcc8' }}
              >
                <span style={{ color: '#5a5a3d', fontWeight: '500' }}>Visit Ketentuan Atribut</span>
                <span style={{ color: '#5a5a3d' }}>→</span>
              </button>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4" lg:space-base>
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-lg overflow-hidden transition-all"
                style={{ backgroundColor: '#5a5a3d' }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:opacity-90 transition-opacity"
                >
                  <span className="text-white font-medium text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ 
                      color: 'white',
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                    size={24}
                  />
                </button>
                
                <div 
                  className="overflow-hidden transition-all duration-300"
                  style={{ 
                    maxHeight: openIndex === index ? '500px' : '0'
                  }}
                >
                  <div className="px-6 py-5 border-t" style={{ 
                    backgroundColor: '#6b6b4d',
                    borderColor: '#7a7a5a'
                  }}>
                    <p className="text-white leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}