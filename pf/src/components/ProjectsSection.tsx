"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { stripProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === "undefined") return;

    // Target the scroll snap container specifically
    const scroller = document.querySelector(".snap-container");
    
    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;

      const totalWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollAmount = totalWidth - windowWidth;

      gsap.to(trackRef.current, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scroller || document.body, 
          start: "top top",
          end: `+=${scrollAmount}`, 
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="snap-section bg-[#050505] overflow-hidden flex">
      {/* Horizontal Track */}
      <div ref={trackRef} className="flex h-full w-fit">
        
        {/* Intro Card */}
        <div className="w-screen h-full flex items-center justify-center shrink-0 border-r border-white/5 p-20">
          <div className="max-w-2xl">
             <h2 className="text-6xl font-black text-white uppercase mb-6">Selected Works</h2>
             <p className="text-white/50 text-xl max-w-md">
               A collection of DevOps pipelines, Full Stack applications, and ML models.
               <br/><span className="text-brand-red text-sm mt-4 block">→ Scroll Down to Move Right</span>
             </p>
          </div>
        </div>

        {/* Project Cards */}
        {stripProjects.map((p, i) => (
          <div 
            key={p.slug} 
            className="w-[80vw] md:w-[60vw] lg:w-[45vw] h-full shrink-0 border-r border-white/5 relative group cursor-pointer overflow-hidden sword-slash"
          >
            <Image 
              src={p.image} 
              alt={p.title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
            />
            
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/0 transition-colors duration-500" />
            
            {/* Sword Slash Element */}
            <div className="absolute inset-0 sword-slash pointer-events-none" />

            <div className="absolute bottom-0 left-0 p-12 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
              <span className="text-brand-red text-xs font-bold tracking-[0.3em] uppercase block mb-2">
                Project 0{i + 1}
              </span>
              <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter relative z-10">
                {p.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Spacer */}
        <div className="w-[20vw] h-full shrink-0 bg-black/50" />
      </div>
    </div>
  );
}