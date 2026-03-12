"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SpringLetter, useMouse } from "@/components/InteractiveHero";
import TechStackSection from "@/components/TechStack";
import { profileData, techStack, stripProjects, education, certifications, learnings, navSections } from "@/data/projects";

// Data aliases
const techData = techStack;
const projectsData = stripProjects;
const educationData = education;
const certData = certifications;
const learningsData = learnings;
const sections = navSections;

// Components

function SectionHeader({ module, title, desc }: { module: string; title: string; desc: string }) {
  return (
    <div className="mb-16 md:mb-20">
      <span className="text-[#C03540] text-xs font-bold uppercase tracking-[0.4em] block mb-3">{module}</span>
      <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-5">{title}</h2>
      <p className="text-xs text-black/40 dark:text-white/40 uppercase tracking-widest max-w-md leading-relaxed">{desc}</p>
    </div>
  );
}

// Tech stack moved to a dedicated component in src/components/TechStack.tsx

// Main page

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mouse = useMouse();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <>
      {/* Scroll-to-top button - Fixed on right side, hidden on hero */}
      {activeSection !== "hero" && (
        <button
          onClick={() => sectionRefs.current["hero"]?.scrollIntoView({ behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#C03540] text-white shadow-lg hover:bg-[#E05060] transition-all duration-300 hover:scale-110"
          title="Back to top"
        >
          ↑
        </button>
      )}

      <main className="relative z-10 text-black dark:text-white min-h-screen overflow-x-hidden">

      {/* Side progress dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 items-center">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" })}
            title={label}
            className={`transition-all duration-300 rounded-full ${
              activeSection === id
                ? "w-3 h-8 bg-[#C03540] shadow-lg shadow-[#C03540]/50"
                : "w-3 h-3 bg-black/30 dark:bg-white/30 hover:bg-[#C03540]/60 dark:hover:bg-[#C03540]/60 hover:w-3 hover:h-6"
            }`}
          />
        ))}
      </div>

        {/* 1. Hero */}
      <section
        ref={setRef("hero")}
        id="hero"
        className="min-h-screen w-full relative overflow-hidden border-b border-black/10 dark:border-white/10 md:h-screen"
      >
        <div className="relative z-30 w-full h-full flex flex-col md:flex-row text-white">

          {/* Left: portrait */}
          <div className="w-full md:w-[28%] md:min-w-[220px] md:max-w-[360px] h-auto md:h-full shrink-0 p-5 md:pr-2 md:pt-20 pt-16 flex justify-center md:block">
            <div className="w-64 h-80 md:w-full md:h-[88%] md:mt-[6%] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
              <img
                src="/strips/myself01.png"
                alt="Vidun Shanuka"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right: content */}
          <div className="flex-1 h-full flex flex-col justify-center md:justify-center gap-5 px-5 md:px-10 md:pr-16 pt-8 md:pt-16 pb-16 md:pb-0">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C03540]/40 bg-[#C03540]/10 rounded-full w-fit mx-auto md:mx-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C03540] animate-pulse shrink-0" />
              <span className="text-[#C03540] text-xs font-bold uppercase tracking-wider">{profileData.status}</span>
            </div>

            {/* Name + Tagline inline */}
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div>
                <h1 className="font-black uppercase italic tracking-tighter leading-none text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start" style={{ gap: "0.05em" }}>
                    {["V", "I", "D", "U", "N"].map((ch, i) => (
                      <div key={`f-${i}`} className={i === 0 ? "animate-bounce" : ""}>
                        <SpringLetter char={ch} mouse={mouse} fontSize="clamp(40px, 5.5vw, 72px)" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start -mt-2" style={{ gap: "0.05em" }}>
                    {["S", "H", "A", "N", "U", "K", "A"].map((ch, i) => (
                      <div key={`l-${i}`} className={i === 6 ? "animate-bounce" : ""} style={i === 6 ? { animationDelay: "0.3s" } : {}}>
                        <SpringLetter char={ch} mouse={mouse} fontSize="clamp(40px, 5.5vw, 72px)" />
                      </div>
                    ))}
                  </div>
                </h1>
                <p className="text-black/50 dark:text-white/50 text-sm uppercase tracking-widest font-semibold mt-3 text-center md:text-left">{profileData.subheading}</p>
              </div>
              <p className="text-base md:text-2xl leading-relaxed text-black/70 dark:text-white/60 md:pt-2 flex-1 text-center md:text-left">
                I{" "}
                <span className="font-bold text-[#C03540] animate-pulse" style={{ animationDelay: "0s" }}>
                  build
                </span>
                , <span className="font-bold text-[#C03540] animate-pulse" style={{ animationDelay: "0.3s" }}>
                  ship
                </span> &amp;{" "}
                <span className="font-bold text-[#C03540] animate-pulse" style={{ animationDelay: "0.6s" }}>
                  scale
                </span> software that{" "}
                <span className="font-semibold text-black/90 dark:text-white/90">solves real-world problems</span>.
              </p>
            </div>

            {/* Quick Fact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profileData.quickFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-[#C03540]/40 transition-all duration-300">
                  <span className="text-2xl shrink-0 leading-none pt-0.5">{fact.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#C03540] uppercase tracking-wider font-bold leading-none mb-1">{fact.label}</p>
                    <p className="text-sm text-black/70 dark:text-white/70 leading-snug">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row gap-4">
              <a href="#contact" className="px-8 py-3 bg-[#C03540] text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-[#E05060] transition-all duration-300 shadow-lg shadow-[#C03540]/30 text-center">
                Get In Touch
              </a>
              <Link href="/about" className="px-8 py-3 border border-[#C03540]/50 text-[#C03540] font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-[#C03540]/10 transition-all duration-300 text-center">
                More About Me
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-black/20 dark:text-white/20">
          <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-8 bg-linear-to-b from-black/20 dark:from-white/20 to-transparent animate-pulse" />
        </div>
      </section>

        {/* 2. Tech stack */}
        <TechStackSection ref={setRef("techstack")} />

        {/* 3. Projects */}
        <section ref={setRef("projects")} id="projects" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="Hands on Experience" title="Projects" desc="Scalable architecture, pixel perfect UI, and automated deployments." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsData.map((p) => (
              <div key={p.slug} className="group relative h-80 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden cursor-pointer md:grayscale md:hover:grayscale-0 hover:border-black/25 dark:hover:border-white/25 transition-all duration-500">
                {/* Splash Animation */}
                <div className="splash" />
                
                <div className="absolute inset-0 z-0">
                  <Image src={p.image} alt={p.title} fill className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* Center-left title + tech tags */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="flex flex-col gap-3 max-w-[60vw]">
                    <span className="text-white text-2xl md:text-3xl font-black drop-shadow-sm truncate">{p.title}</span>
                    {p.tech && (
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span key={t} className="text-[10px] text-white/90 bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative z-10 h-full p-7 flex flex-col justify-between">
                  <div className="flex justify-end items-start">
                    <span className="text-white text-[10px] uppercase tracking-wider">{p.category}</span>
                  </div>
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Title displayed at top-left */}
                    <p className="text-[11px] text-white/50 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{p.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* 4. Education */}
        <section ref={setRef("education")} id="education" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="Educational Qualifications" title="Education" desc="The academic foundation of algorithms, architecture, and engineering principles." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {educationData.map((edu) => (
              <div key={edu.id} className="group relative rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-black overflow-hidden hover:border-black/20 dark:hover:border-white/25 transition-all duration-500 p-8">
                {/* Splash Animation */}
                <div className="splash" />
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(192,53,64,0.07) 0%, transparent 60%)" }} />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-black/25 dark:text-white/25 text-[10px] font-bold uppercase tracking-widest">{edu.year}</span>
                  </div>
                  <h3 className="text-xl font-black text-black dark:text-white uppercase italic tracking-tighter leading-tight mb-2">{edu.title}</h3>
                  <p className="text-[10px] font-bold text-[rgb(192,53,64)] uppercase tracking-wider mb-4">{edu.subtitle}</p>
                  <p className="text-[11px] text-black/45 dark:text-white/45 leading-relaxed mb-6">{edu.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map((skill) => (
                      <span key={skill} className="text-[9px] border border-black/15 dark:border-white/15 px-2 py-0.5 uppercase tracking-wider text-black/40 dark:text-white/40">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* 5. Certifications */}
        <section ref={setRef("certifications")} id="certifications" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="Certification Courses Completed" title="Certifications" desc="Verified expertise from industry leaders in Cloud, AI, and Software Engineering." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certData.map((cert) => (
              <div key={cert.id} className="group relative rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-black overflow-hidden hover:border-black/20 dark:hover:border-white/25 transition-all duration-500 md:grayscale md:hover:grayscale-0 cursor-pointer">
                {/* Splash Animation */}
                <div className="splash" />
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, rgba(192,53,64,0.09) 0%, transparent 60%)" }} />

                {/* Image area */}
                <div className="w-full h-40 bg-slate-800/10 flex items-center justify-center overflow-hidden relative">
                  {cert.image ? (
                    <>
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center text-white/60">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="#fff" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 relative z-10">
                  <h3 className="text-lg font-black text-black dark:text-white uppercase tracking-tight mb-1">{cert.title}</h3>
                  {cert.subtitle && <p className="text-[10px] font-bold text-[rgb(192,53,64)] uppercase tracking-wider mb-2">{cert.subtitle}</p>}
                  <p className="text-[11px] text-black/45 dark:text-white/45 leading-relaxed line-clamp-3">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* 6. Learnings */}
        <section ref={setRef("learnings")} id="learnings" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="What I Learn Through Projects" title="Learnings" desc="Key technologies and insights gained through hands-on experience." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {learningsData.map((item) => (
                <Link key={item.label} href={`/learnings/${item.slug}`}>
                <div className="group relative h-72 rounded-2xl border border-black/8 dark:border-white/10 overflow-hidden hover:border-black/20 dark:hover:border-white/25 transition-all duration-500 flex flex-col justify-between md:grayscale md:hover:grayscale-0 cursor-pointer">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/strips/bg1.png"
                      alt={item.title}
                      fill
                      className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 dark:from-black dark:via-black/70 dark:to-black/40" />
                  </div>

                  {/* Splash Animation */}
                  <div className="splash" />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(192,53,64,0.07) 0%, transparent 70%)" }} />
                  
                  <div className="relative z-10 p-7 flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em] block">Learn {item.label}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white dark:text-white uppercase italic tracking-tighter leading-tight mb-3 group-hover:text-[rgb(192,53,64)] transition-colors duration-500">{item.title}</h3>
                      <p className="text-[11px] text-white/60 dark:text-white/60 leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-[9px] border border-white/20 px-2 py-0.5 uppercase tracking-wider text-white/60">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-[9px] text-[rgb(192,53,64)] font-semibold uppercase tracking-widest flex items-center gap-2">
                          <span>→</span> Click to Explore More
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

        {/* 7. Contact */}
        <section ref={setRef("contact")} id="contact" className="py-24 lg:py-40 px-8 md:px-16 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16">

            {/* Left */}
            <div className="flex-1 max-w-lg">
              <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-4">Contact</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
                Let's Work<br />Together
              </h2>
              <p className="text-sm text-black/45 dark:text-white/45 leading-relaxed mb-8">
                Open to DevOps, Full Stack, and ML internship opportunities. I bring a strong engineering mindset and the drive to ship quality products fast.
              </p>
              <div className="flex flex-wrap gap-3">
                {["DevOps", "Full Stack", "ML / AI", "Open Source"].map((tag) => (
                  <span key={tag} className="text-[10px] border border-black/15 dark:border-white/15 px-3 py-1.5 uppercase tracking-widest text-black/45 dark:text-white/45 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {/* Right — links */}
            <div className="flex flex-col gap-3 w-full lg:w-80">
              {[
                { label: "Email", href: "mailto:vidun.shanukaofficial@gmail.com", sub: "vidun.shanukaofficial@gmail.com" },
                { label: "GitHub", href: "https://github.com/vidun-upek", sub: "github.com/vidun-upek" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/vidun-shanuka-17276a2b4/", sub: "linkedin.com/in/vidun-shanuka" },
                  { label: "CV / Resume", href: "/cv.vidun.shanuka.pdf", sub: "View/Download PDF" },
                ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href === "/cv.vidun.shanuka.pdf" || link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href === "/cv.vidun.shanuka.pdf" || link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between px-6 py-5 border border-black/10 dark:border-white/10 rounded-xl hover:border-[rgb(192,53,64)]/50 hover:bg-[rgb(192,53,64)]/5 transition-all duration-300"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">{link.label}</p>
                    <p className="text-[10px] text-black/25 dark:text-white/25 mt-0.5">{link.sub}</p>
                  </div>
                  <span className="text-black/25 dark:text-white/25 group-hover:text-[rgb(192,53,64)] transition-colors duration-300 text-lg">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <p className="text-black/15 dark:text-white/15 text-[10px] uppercase tracking-widest">© 2026 Vidun Shanuka — All Rights Reserved</p>
            <p className="text-black/15 dark:text-white/15 text-[10px] uppercase tracking-widest">Built with Next.js · TypeScript · Tailwind CSS</p>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}