'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerFAQ = React.useRef(null);
  const containerLeft = React.useRef(null);
  const containerRight = React.useRef(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const refs = [
        { el: containerLeft.current, anim: { opacity: 0, x: -100 }, opts: { opacity: 1, x: 0, duration: 1 } },
        { el: containerRight.current, anim: { opacity: 0, x: 100 }, opts: { opacity: 1, x: 0, duration: 1 } },
      ];

      refs.forEach(({ el, anim, opts }) => {
        if (!el) return;
        gsap.fromTo(
          el,
          anim,
          {
            ...opts,
            ease: opts.ease || "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 20%", 
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerFAQ);

    return () => ctx.revert();
  }, []);
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
    <div ref={containerFAQ} className="min-h-screen p-8" style={{ backgroundColor: '#DCE2B7' }}>
      <div className="max-w-6xl mx-auto mt-24">
        <div className="grid md:grid-cols-[350px,1fr] gap-8">
          {/* Sidebar */}
          <div ref={containerLeft} className="flex items-center">
            <h1 className="text-5xl font-bold mb-8" style={{ 
              color: '#5a5a3d',
              fontFamily: 'serif',
              letterSpacing: '2px'
            }}>
              FREQUENTLY<br />ASKED<br />QUESTIONS
            </h1>
            {/*
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
            </div>*/}
          </div>

          {/* FAQ Accordion */}
          <div ref={containerRight} className="space-y-4 lg:space-base" id='faq' style={{ scrollMarginTop: '300px' }}>
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