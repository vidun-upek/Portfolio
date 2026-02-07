"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    title: "University of Westminster",
    subtitle: "BEng (Hons) Software Engineering",
    details: "Second-year undergraduate at IIT Sri Lanka. Focus: Java OOP, Data Structures, and Software Architecture.",
    year: "2024 — Present"
  },
  {
    title: "IBM Certification",
    subtitle: "Containers, Docker & Kubernetes",
    details: "Comprehensive certification on container orchestration, building images, and cloud-native deployment workflows.",
    year: "2026"
  },
  {
    title: "Full Stack Development",
    subtitle: "MERN Stack Specialization",
    details: "Intensive focus on MongoDB, Express, React, and Node.js for scalable web products.",
    year: "2025"
  }
];

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;
      const scrollAmount = trackRef.current.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollAmount}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="education" ref={containerRef} className="snap-section bg-[#050505] overflow-hidden flex items-center">
      <div ref={trackRef} className="flex h-[75vh] w-fit px-[10vw] gap-12 items-center">
        <div className="w-[400px] h-full flex flex-col justify-center shrink-0 pr-20">
             <span className="text-brand-red text-xs font-bold tracking-[0.4em] uppercase block mb-4">02 — Education</span>
             <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">Academic<br/>Path</h2>
        </div>

        {educationData.map((edu, i) => (
          <div key={i} className="relative w-[400px] h-full shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 flex flex-col justify-between group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="text-white/20 text-5xl font-black italic">0{i+1}</span>
             <div>
               <h3 className="text-3xl font-black uppercase text-white leading-tight mb-2">{edu.title}</h3>
               <p className="text-brand-red text-sm font-bold uppercase tracking-widest mb-6">{edu.subtitle}</p>
               <p className="text-white/50 text-sm leading-relaxed">{edu.details}</p>
             </div>
             <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">{edu.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}