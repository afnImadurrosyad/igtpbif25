'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu IGTTPB?",
      answer: "IGTTPB merupakan First Gathering Mahasiswa Teknik Informatika di Institut Teknologi Sumatera."
    },
    {
      question: "Apa tujuan dari diadakannya IGTTPB?",
      answer: " IGTTPB berperan sebagai wadah perkenalan diri untuk saling mengenal satu sama lain."
    },
    {
      question: "Siapa saja yang bisa mengikuti IGTTPB?",
      answer: "IGTTPB ditujukan untuk mahasiswa TPB Teknik Informatika di Institut Teknologi Sumatera."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#DCE2B7] via-[#E8EDCC] to-[#DCE2B7] px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16">
          {/* Header */}
          <div className="mb-12 lg:mb-0 lg:w-2/5 lg:flex-shrink-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ 
              color: '#5a5a3d',
              fontFamily: 'serif',
              letterSpacing: '2px',
              lineHeight: '1.2'
            }}>
              FREQUENTLY<br />ASKED<br />QUESTIONS
            </h1>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 lg:flex-1" id='faq'>
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-lg overflow-hidden transition-all shadow-md"
                style={{ backgroundColor: '#5a5a3d' }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-4 md:px-6 py-4 md:py-5 flex items-center justify-between hover:opacity-90 transition-opacity"
                >
                  <span className="text-white font-medium text-base md:text-lg pr-4">
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
                  <div className="px-4 md:px-6 py-4 md:py-5 border-t" style={{ 
                    backgroundColor: '#6b6b4d',
                    borderColor: '#7a7a5a'
                  }}>
                    <p className="text-white leading-relaxed text-sm md:text-base">
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