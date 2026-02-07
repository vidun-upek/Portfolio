"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Hard Skills",
    skills: ["TypeScript", "Next.js", "Docker", "Kubernetes", "PyTorch", "MongoDB", "Express.js", "Java"]
  },
  {
    category: "Soft Skills",
    skills: ["Agile Development", "System Design", "Technical Documentation", "Collaborative Problem Solving"]
  },
  {
    category: "DevOps & Cloud",
    skills: ["CI/CD Pipelines", "Terraform", "AWS", "GitHub Actions", "Monitoring & Logging"]
  }
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="techstack" ref={containerRef} className="snap-section bg-[#080808] overflow-hidden flex items-center">
      <div ref={trackRef} className="flex h-[80vh] w-fit px-[10vw] gap-12 items-center">
        <div className="w-[400px] h-full flex flex-col justify-center shrink-0 pr-20">
             <span className="text-brand-red text-xs font-bold tracking-[0.4em] uppercase block mb-4">04 — Tech Stack</span>
             <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">Skills &<br/>Tools</h2>
        </div>

        {skillGroups.map((group, i) => (
          <div key={i} className="relative w-[500px] h-full shrink-0 rounded-2xl border border-white/5 bg-white/[0.02] p-12 flex flex-col justify-center">
             <h3 className="text-brand-red text-xs font-bold uppercase tracking-[0.5em] mb-10">{group.category}</h3>
             <div className="grid grid-cols-1 gap-6">
                {group.skills.map(skill => (
                  <div key={skill} className="flex items-center gap-4">
                    <span className="h-[1px] w-8 bg-white/20" />
                    <span className="text-2xl font-black uppercase text-white/80 hover:text-white transition-colors cursor-default">{skill}</span>
                  </div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}