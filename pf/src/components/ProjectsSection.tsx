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
    if (!trackRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const container = containerRef.current!;

      gsap.to(track, {
        x: () => -(track.scrollWidth - container.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - container.clientWidth}`,
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
    <div
      ref={containerRef}
      className="h-screen w-full bg-[#050505] flex items-stretch overflow-hidden"
    >
      <div ref={trackRef} className="flex h-screen w-fit items-stretch">
        {/* Title Strip */}
        <div className="relative w-[35vw] shrink-0 flex flex-col justify-center border-r border-white/5 px-16 bg-[#050505]">
          <span className="font-display text-[13px] tracking-[0.5em] text-brand-red block mb-6">
            04 — Projects
          </span>
          <h2 className="font-display text-[7vw] leading-[0.85] text-white uppercase">
            Selected
            <br />
            Works
          </h2>
          <p className="mt-8 font-body text-sm text-white/30 tracking-wide max-w-xs leading-relaxed">
            End-to-end engineering from cloud architecture to pixel-perfect
            interfaces.
          </p>
          <div className="absolute bottom-16 left-16 right-16 h-px bg-gradient-to-r from-brand-red/40 to-transparent" />
        </div>

        {/* Project Strips */}
        {stripProjects.map((project, i) => {
          const techList = project.tech || [];

          return (
            <div
              key={project.slug}
              className="strip-card splash-container relative w-[30vw] shrink-0 border-r border-white/5 cursor-pointer group"
            >
              <div className="splash-effect" />

              <div className="strip-image absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="strip-overlay absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-[1]" />

              <div className="relative z-10 h-full flex flex-col justify-between p-10">
                <div className="flex justify-between items-start">
                  <span className="font-display text-[11px] tracking-[0.4em] text-brand-red/70 group-hover:text-brand-red transition-colors duration-500">
                    {project.category || "Project"}
                  </span>
                  <span className="font-display text-5xl text-white/5 group-hover:text-white/15 transition-colors duration-500 leading-none">
                    0{i + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-4xl md:text-5xl text-white/40 group-hover:text-white uppercase leading-[0.9] transition-colors duration-500 mb-4">
                    {project.title}
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <p className="font-body text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techList.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="font-body text-[10px] border border-white/20 px-3 py-1 text-white/40 uppercase tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}