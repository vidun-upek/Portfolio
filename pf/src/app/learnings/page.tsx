"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { learnings as learningsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function LearningsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
      <div ref={trackRef} className="flex h-[75vh] px-[10vw] gap-8 items-center flex-nowrap mt-10">
        
        <div className="w-[350px] shrink-0 pr-10">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.4em] block mb-2">Module 05</span>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">Learnings</h1>
          <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
            Key technologies and insights gained through hands-on experience.
          </p>
        </div>

        {learningsData.map((learning, i) => (
          <Link key={i} href={`/learnings/${learning.slug}`}>
            <div className="group relative w-[400px] h-full shrink-0 rounded-2xl border border-white/20 overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700">
              <div className="splash" />
              
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/strips/bg1.png" 
                  alt={learning.title} 
                  fill 
                  className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-black/20" />
              </div>

              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div />
                <div>
                  <span className="text-brand-red text-xs font-bold uppercase tracking-[0.4em] block mb-2">Learning {learning.label}</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-brand-red transition-colors duration-500">
                    {learning.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {learning.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {learning.tags.map(tag => (
                      <span key={tag} className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/60">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-xs text-brand-red font-semibold uppercase tracking-widest flex items-center gap-2">
                      <span>✨ Click to explore more</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <div className="w-[10vw] shrink-0" />
      </div>
    </main>
  );
}
