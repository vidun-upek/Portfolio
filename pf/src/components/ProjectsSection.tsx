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
    if (typeof window === "undefined") return;
    const scroller = document.querySelector(".snap-container");
    
    const ctx = gsap.context(() => {
      if (!trackRef.current || !containerRef.current) return;

      // Calculate the exact width of the track
      const totalWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      // Stop the scroll exactly at the end of the last card
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
    <div id="projects" ref={containerRef} className="snap-section bg-[#050505] overflow-hidden flex items-center">
      {/* Height increased to 85vh for taller cards */}
      <div ref={trackRef} className="flex h-[85vh] w-fit px-[10vw] gap-12 items-center">
        
        {/* Intro Section */}
        <div className="w-[400px] h-full flex flex-col justify-center shrink-0 pr-20">
             <span className="text-brand-red text-xs font-bold tracking-[0.4em] uppercase block mb-4">
                02 — Projects
             </span>
             <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-6">
               Selected<br/>Works
             </h2>
             <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">
               End-to-end engineering from cloud architecture to pixel-perfect interfaces.
             </p>
        </div>

        {/* Vertical Project Cards (5 cards) */}
        {stripProjects.slice(0, 5).map((p, i) => (
          <div 
            key={p.slug} 
            className="projectCard relative w-[380px] h-full shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden group cursor-pointer"
          >
            <div className="splash" />

            <div className="absolute inset-0 z-0">
              <Image 
                src={p.image} 
                alt={p.title} 
                fill 
                className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 opacity-40 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
              <span className="text-brand-red text-[10px] font-bold tracking-[0.4em] uppercase mb-2">
                Project 0{i + 1}
              </span>
              <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
                {p.title}
              </h3>
              
              <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="text-white/60 text-xs uppercase tracking-widest line-clamp-2">
                  {p.description || "Scalable system architecture and automated deployment pipelines."}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {p.tech?.slice(0, 3).map(t => (
                        <span key={t} className="text-[9px] border border-white/20 px-2 py-1 text-white/40 uppercase tracking-tighter">{t}</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Spacer removed to prevent scrolling into empty space */}
      </div>

      <style jsx global>{`
        .projectCard .splash {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 20;
          opacity: 0;
          transform: translateX(-120%) skewX(-18deg);
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 35%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0) 65%,
            transparent 100%
          );
        }

        .projectCard:hover .splash {
          animation: splashMove 850ms ease-out forwards;
        }

        @keyframes splashMove {
          0% {
            opacity: 0;
            transform: translateX(-120%) skewX(-18deg);
          }
          12% {
            opacity: 0.8;
          }
          70% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: translateX(140%) skewX(-18deg);
          }
        }
      `}</style>
    </div>
  );
}