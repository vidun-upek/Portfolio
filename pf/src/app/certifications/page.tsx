"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const certData = [
  { id: "ibm", title: "IBM Cloud", subtitle: "Docker & Kubernetes Specialist", desc: "Container orchestration, building images, and cloud-native deployment." },
  { id: "meta", title: "Meta", subtitle: "Frontend Developer Professional", desc: "Advanced React, UI/UX principles, and modern frontend architecture." },
  { id: "deeplearning", title: "DeepLearning.AI", subtitle: "Neural Networks & Deep Learning", desc: "Model training, backpropagation, and AI engineering." },
  { id: "google", title: "Google IT", subtitle: "Automation with Python", desc: "System administration and infrastructure automation using Python scripting." },
  { id: "aws", title: "AWS Academy", subtitle: "Cloud Foundations", desc: "Infrastructure design, serverless architecture, and cloud security." }
];

export default function CertificationsPage() {
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
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
          fastKill: true,
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
      <div ref={trackRef} className="flex h-[75vh] px-[10vw] gap-8 items-center flex-nowrap mt-10" style={{willChange: 'transform'}}>
        
        <div className="w-[500px] shrink-0 pr-10">
          <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-2">Module 03</span>
          <h1 className="text-4xl font-black uppercase italic tracking-tight leading-none mb-4">Certifications</h1>
          <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
            Verified expertise from industry leaders in Cloud, AI, and Software Engineering.
          </p>
        </div>

        {certData.map((cert, i) => (
          <div key={cert.id} className="group relative w-[380px] h-full shrink-0 rounded-2xl border border-white/20 overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700">
            <div className="splash" />
            
            <div className="absolute inset-0 z-0 bg-black" />

            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">License 0{i + 1}</span>
              
              <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{cert.title}</h2>
                <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">{cert.subtitle}</h3>
                <p className="text-xs text-white/40 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cert.desc}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="w-[10vw] shrink-0" />
      </div>
    </main>
  );
}