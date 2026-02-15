"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. THE TOUCHPAD FIX
  // This ensures horizontal scrolling works perfectly with both
  // vertical mouse wheels AND native touchpad swipes.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: "auto" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <main
      ref={scrollRef}
      className="h-screen w-full bg-[#050505] overflow-x-auto overflow-y-hidden flex flex-nowrap items-stretch no-scrollbar"
    >
      {/* SECTION 1: HERO PROFILE 
        Huge, impactful introduction.
      */}
      <section className="w-[100vw] md:w-[60vw] shrink-0 border-r border-white/10 relative group overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/strips/bg1.png" // Replace with a real photo of you later
            alt="Vidun Shanuka"
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105 opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full p-12 flex flex-col justify-end pb-24">
          <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.5em] mb-4">
            01 — The Profile
          </span>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85] mb-6">
            Vidun<br />Shanuka
          </h1>
          <p className="text-white/60 text-sm md:text-lg max-w-md leading-relaxed">
            A software engineering undergraduate with a relentless focus on
            scalable architecture, DevOps automation, and intelligent systems.
          </p>
        </div>
      </section>

      {/* SECTION 2: BIOGRAPHY 
        Editorial style text layout.
      */}
      <section className="w-[100vw] md:w-[50vw] shrink-0 border-r border-white/10 bg-[#080808] p-12 md:p-20 flex flex-col justify-center">
        <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.5em] mb-12">
          02 — The Story
        </span>
        
        <div className="space-y-10">
          <p className="text-2xl md:text-3xl font-light text-white/80 leading-normal">
            I am currently a second-year student at the <span className="text-white font-bold">University of Westminster</span> (IIT Sri Lanka).
          </p>
          <p className="text-white/40 text-sm md:text-base leading-loose max-w-xl">
            My journey isn't just about writing code; it's about engineering solutions. 
            From building full-stack MERN applications to orchestrating zero-touch 
            Kubernetes pipelines, I bridge the gap between development and operations.
            <br /><br />
            I believe in the "Build, Ship, Scale" philosophy. Whether it's training 
            an ML model for cost prediction or designing a disaster management system, 
            my goal is to create software that solves real-world problems with 
            precision and speed.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE VITALS 
        Grid layout for quick stats.
      */}
      <section className="w-[100vw] md:w-[40vw] shrink-0 border-r border-white/10 bg-[#050505] p-12 flex flex-col justify-center">
        <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.5em] mb-16">
          03 — Vitals
        </span>

        <div className="grid grid-cols-1 gap-12">
          {/* Item 1 */}
          <div className="border-l-2 border-white/10 pl-6 hover:border-[rgb(192,53,64)] transition-colors duration-300">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Location</h3>
            <p className="text-2xl font-bold text-white uppercase">Pannipitiya, <br/>Sri Lanka</p>
          </div>

          {/* Item 2 */}
          <div className="border-l-2 border-white/10 pl-6 hover:border-[rgb(192,53,64)] transition-colors duration-300">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Education</h3>
            <p className="text-xl font-bold text-white uppercase">BEng (Hons) Software Engineering</p>
            <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">Informatics Institute of Technology</p>
          </div>

          {/* Item 3 */}
          <div className="border-l-2 border-white/10 pl-6 hover:border-[rgb(192,53,64)] transition-colors duration-300">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Focus</h3>
            <p className="text-xl font-bold text-white uppercase">DevOps • ML • Full Stack</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: PHILOSOPHY / END 
        Final statement piece.
      */}
      <section className="w-[100vw] md:w-[40vw] shrink-0 bg-[#050505] relative flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <Image src="/strips/bg1.png" alt="Texture" fill className="object-cover" />
         </div>
         
         <div className="relative z-10 text-center">
            <p className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.5em] mb-6">
               04 — Vision
            </p>
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none">
               Build.<br/>
               Ship.<br/>
               Scale.
            </h2>
         </div>
      </section>
    </main>
  );
}