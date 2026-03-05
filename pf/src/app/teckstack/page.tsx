"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { techStack } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function TechStackPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!trackRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const scrollAmount = Math.max(0, trackRef.current!.scrollWidth - window.innerWidth);
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
    }, containerRef);
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill(true));
      document.querySelectorAll(".pin-spacer").forEach(spacer => {
        const parent = spacer.parentElement;
        if (!parent) return;
        while (spacer.firstChild) parent.insertBefore(spacer.firstChild, spacer);
        parent.removeChild(spacer);
      });
      try { ctx.revert(); } catch (_) {}
    };
  }, []);

  return (
    <main ref={containerRef} className="scroll-container flex items-center">
      <div ref={trackRef} className="flex h-[75vh] px-[10vw] gap-8 items-center flex-nowrap mt-10" style={{ perspective: "1200px" }}>
        
        <div className="w-[350px] shrink-0 pr-10">
          <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-2">Module 04</span>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">Tech Stack</h1>
          <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
            The tools, languages, and frameworks used to build scalable systems.
          </p>
        </div>

        {techStack.map((tech, i) => (
          <div
            key={tech.id}
            className="tech-card group relative w-[380px] h-full shrink-0 rounded-2xl border border-white/20 overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700"
            style={{
              boxShadow: "0 0 0 1px rgba(192, 53, 64, 0)",
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget;
              gsap.to(card, {
                boxShadow: "0 0 30px rgba(192, 53, 64, 0.6), 0 0 60px rgba(192, 53, 64, 0.3), inset 0 0 20px rgba(192, 53, 64, 0.1)",
                scale: 1.08,
                y: -12,
                z: 60,
                rotateX: -5,
                rotateY: 0,
                rotateZ: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              gsap.to(card, {
                boxShadow: "0 0 0 1px rgba(192, 53, 64, 0)",
                scale: 1,
                y: 0,
                z: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            }}
          >
            <div className="splash" />
            
            <div className="absolute inset-0 z-0">
              <Image src="/strips/bg1.png" alt={tech.title} fill className="object-cover opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 group-hover:via-black/50 transition-all duration-700" />
              
              {/* Enhanced glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-radial pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 50%, rgba(192, 53, 64, 0.15) 0%, transparent 70%)",
              }} />
            </div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em] group-hover:text-[rgb(255,150,150)] transition-colors duration-500">Stack 0{i + 1}</span>
              
              <div>
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-2 group-hover:text-[rgb(255,220,220)] transition-colors duration-500">{tech.title}</h2>
                <p className="text-xs text-white/50 group-hover:text-white/70 leading-relaxed mb-6 h-10 transition-colors duration-500">{tech.desc}</p>
                
                <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-3">
                  {tech.skills.map((skill, idx) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 transform transition-all duration-300"
                      style={{
                        transitionDelay: `${idx * 50}ms`,
                      }}
                    >
                      <div className="h-[1px] w-6 bg-[rgb(192,53,64)] group-hover:w-8 transition-all duration-500" />
                      <span className="text-sm font-bold text-white/80 group-hover:text-[rgb(255,200,200)] uppercase tracking-wider transition-colors duration-500">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-[10vw] shrink-0" />
      </div>
    </main>
  );
}