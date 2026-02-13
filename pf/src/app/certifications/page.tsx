"use client";
import { useEffect, useRef } from "react";
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
          <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-2">Module 03</span>
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">Certifications</h1>
          <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
            Verified expertise from industry leaders in Cloud, AI, and Software Engineering.
          </p>
        </div>

        {certData.map((cert, i) => (
          <div key={cert.id} className="group relative w-[380px] h-full shrink-0 rounded-2xl border border-white/20 overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-700">
            <div className="splash" />
            
            <div className="absolute inset-0 z-0">
              <Image src="/strips/bg1.png" alt={cert.title} fill className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
            </div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">License 0{i + 1}</span>
              
              <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{cert.title}</h2>
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