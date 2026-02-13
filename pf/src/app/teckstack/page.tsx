"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const techData = [
  { id: "front", title: "Frontend", desc: "Building pixel-perfect, highly animated user interfaces.", skills: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "GSAP"] },
  { id: "back", title: "Backend", desc: "Architecting scalable and secure server-side applications.", skills: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL", "REST APIs"] },
  { id: "ml", title: "Machine Learning", desc: "Training intelligent models and deep neural networks.", skills: ["PyTorch", "TensorFlow", "Pandas", "Scikit-Learn", "Jupyter"] },
  { id: "devops", title: "DevOps & Cloud", desc: "Automating zero-touch deployment pipelines and infrastructure.", skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions"] },
  { id: "core", title: "Core & Soft", desc: "The engineering principles behind the code.", skills: ["System Design", "Agile Workflow", "Data Structures", "OOP (Java)"] }
];

export default function TechStackPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="scroll-container flex items-center">
      <div ref={trackRef} className="flex h-[75vh] px-[10vw] gap-8 items-center flex-nowrap mt-10">
        
        <div className="w-[350px] shrink-0 pr-10">
          <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-2">Module 04</span>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">Tech Stack</h1>
          <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
            The tools, languages, and frameworks used to build scalable systems.
          </p>
        </div>

        {techData.map((tech, i) => (
          <div key={tech.id} className="group relative w-[380px] h-full shrink-0 rounded-2xl border border-white/20 overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700">
            <div className="splash" />
            
            <div className="absolute inset-0 z-0">
              <Image src="/strips/bg1.png" alt={tech.title} fill className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
            </div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">Stack 0{i + 1}</span>
              
              <div>
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{tech.title}</h2>
                <p className="text-xs text-white/50 leading-relaxed mb-6 h-10">{tech.desc}</p>
                
                <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-3">
                  {tech.skills.map(skill => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="h-[1px] w-6 bg-[rgb(192,53,64)]" />
                      <span className="text-sm font-bold text-white uppercase tracking-wider">{skill}</span>
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