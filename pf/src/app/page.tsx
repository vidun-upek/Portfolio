"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const hubCards = [
  { id: "profile", title: "Profile", path: "/about", isColored: true },
  { id: "education", title: "Education", path: "/education", isColored: false },
  { id: "certs", title: "Certifications", path: "/certifications", isColored: false },
  { id: "techstack", title: "Tech Stack", path: "/techstack", isColored: false },
  { id: "projects", title: "Projects", path: "/projects", isColored: false },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
        
        {/* Intro Text */}
        <div className="w-[300px] shrink-0 pr-10">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-4">
            Vidun<br/>Shanuka
          </h1>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
            Select a module to explore
          </p>
        </div>

        {/* The 5 Vertical Strip Cards */}
        {hubCards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => router.push(card.path)}
            className={`group relative w-[380px] h-full shrink-0 rounded-2xl border border-white/20 overflow-hidden cursor-pointer transition-all duration-700 
              ${card.isColored ? "" : "grayscale hover:grayscale-0"}`}
          >
            {/* The Splash Animation */}
            <div className="splash" />

            {/* Background Image (Shared for now) */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/strips/bg1.png" 
                alt={card.title} 
                fill 
                className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">
                  Module 0{index + 1}
                </span>
                <span className="text-white/20 text-4xl font-black italic group-hover:text-white transition-colors duration-500">
                  {index + 1}
                </span>
              </div>

              {/* Conditional Rendering for Profile Card */}
              {card.id === "profile" ? (
                <div className="flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 relative">
                    {/* Placeholder for Profile Pic */}
                    <Image src="/strips/logo.png" alt="Profile" fill className="object-cover" />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Vidun Shanuka</h2>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] mt-1">Age: 21</p>
                  </div>

                  <div className="space-y-1 text-xs text-white/70">
                    <p>• Frontend Development</p>
                    <p>• Backend Development</p>
                    <p>• ML Model Training</p>
                    <p>• CI/CD Pipelines & Cloud</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[9px] border border-white/20 px-2 py-1 uppercase tracking-wider text-white/60">Internships</span>
                    <span className="text-[9px] border border-white/20 px-2 py-1 uppercase tracking-wider text-white/60">Freelance</span>
                    <span className="text-[9px] border border-white/20 px-2 py-1 uppercase tracking-wider text-white/60">Collaborations</span>
                  </div>

                  <p className="text-[rgb(192,53,64)] text-[11px] font-black uppercase tracking-[0.2em] mt-4">
                    Build • Ship • Scale.
                  </p>
                </div>
              ) : (
                /* Standard Header for non-profile cards */
                <div>
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white/80 group-hover:text-white transition-colors">
                    {card.title}
                  </h2>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}