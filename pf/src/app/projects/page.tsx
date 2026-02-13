"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { stripProjects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const scrollAmount = trackRef.current!.scrollWidth - window.innerWidth;
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
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="scroll-container flex items-center">
      <div ref={trackRef} className="flex h-[75vh] px-[10vw] gap-8 items-center flex-nowrap mt-10">
        
        <div className="w-[350px] shrink-0 pr-10">
          <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-2">Module 05</span>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">Projects</h1>
          <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
            Scalable architecture, pixel-perfect UI, and automated deployments.
          </p>
        </div>

        {stripProjects.map((p, i) => (
          <div key={p.slug} className="group relative w-[400px] h-full shrink-0 rounded-2xl border border-white/20 overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700">
            <div className="splash" />
            
            <div className="absolute inset-0 z-0">
              <Image src={p.image} alt={p.title} fill className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-end">
              <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em] mb-2">Project 0{i + 1}</span>
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">{p.title}</h2>
              <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-xs text-white/70 leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech?.slice(0, 3).map(t => (
                    <span key={t} className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/60">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}