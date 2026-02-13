"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    id: "uni",
    title: "University of Westminster",
    subtitle: "BEng (Hons) Software Engineering",
    description: "Undergraduate degree pursued at IIT Sri Lanka. Second-year focus on Software Architecture, Advanced Data Structures, and Object-Oriented Programming (OOP).",
    year: "2024 — Present",
    skills: ["Java", "System Architecture", "Algorithms"]
  },
  {
    id: "school",
    title: "High School Education",
    subtitle: "Advanced Level / Ordinary Level",
    description: "Strong foundation in Mathematics, Physics, and analytical problem-solving, setting the groundwork for an engineering career.",
    year: "Graduated",
    skills: ["Mathematics", "Physics", "Analytical Thinking"]
  }
];

export default function EducationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const scrollAmount = Math.max(0, trackRef.current!.scrollWidth - window.innerWidth);
      
      if (scrollAmount > 0) {
        gsap.to(trackRef.current, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${scrollAmount}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="scroll-container flex items-center">
      <div ref={trackRef} className="flex h-[75vh] px-[10vw] gap-8 items-center flex-nowrap mt-10">
        
        {/* Intro Text */}
        <div className="w-[350px] shrink-0 pr-10">
          <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-2">Module 02</span>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">Education</h1>
          <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
            The academic foundation of algorithms, architecture, and engineering principles.
          </p>
        </div>

        {/* Education Cards */}
        {educationData.map((edu, i) => (
          <div key={edu.id} className="group relative w-[450px] h-full shrink-0 rounded-2xl border border-white/20 overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700">
            <div className="splash" />
            
            <div className="absolute inset-0 z-0">
              <Image src="/strips/bg1.png" alt={edu.title} fill className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
            </div>

            <div className="relative z-10 h-full p-10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">Academic 0{i + 1}</span>
                <span className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">{edu.year}</span>
              </div>
              
              <div>
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{edu.title}</h2>
                <h3 className="text-sm font-bold text-[rgb(192,53,64)] uppercase tracking-widest mb-6">{edu.subtitle}</h3>
                
                <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <p className="text-xs text-white/70 leading-relaxed mb-6">{edu.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map(skill => (
                      <span key={skill} className="text-[9px] border border-white/20 px-2 py-1 uppercase tracking-wider text-white/60">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer to allow scrolling past the last card smoothly */}
        <div className="w-[10vw] shrink-0" />
      </div>
    </main>
  );
}