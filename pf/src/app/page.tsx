"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SpringLetter, useMouse } from "@/components/InteractiveHero";
import { profileData, techStack, stripProjects, education, certifications, learnings, navSections } from "@/data/projects";

// Aliases for backwards compatibility with page structure
const techData = techStack;
const projectsData = stripProjects;
const educationData = education;
const certData = certifications;
const learningsData = learnings;
const sections = navSections;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function SectionHeader({ module, title, desc }: { module: string; title: string; desc: string }) {
  return (
    <div className="mb-16 md:mb-20">
      <span className="text-[#C03540] text-xs font-bold uppercase tracking-[0.4em] block mb-3">{module}</span>
      <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-5">{title}</h2>
      <p className="text-xs text-black/40 dark:text-white/40 uppercase tracking-widest max-w-md leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

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
      <main className="relative z-10 bg-white text-black dark:bg-black dark:text-white min-h-screen overflow-x-hidden">

      {/* ── SIDE PROGRESS DOTS ──────────────────────────────────────── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 items-center">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" })}
            title={label}
            className={`transition-all duration-300 rounded-full ${
              activeSection === id
                ? "w-2 h-6 bg-[#C03540]"
                : "w-2 h-2 bg-black/20 dark:bg-white/20 hover:bg-black/50 dark:hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section
        ref={setRef("hero")}
        id="hero"
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 xl:px-32 pt-28 pb-24 relative overflow-hidden border-b border-black/10 dark:border-white/10"
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center gap-14 md:gap-24">

          {/* Left — Photo + CTA */}
          <div className="flex flex-col items-center md:items-start gap-5 shrink-0">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 relative shadow-2xl">
              <Image src="/profilepic.jpg" alt="Vidun Shanuka" fill className="object-cover" priority />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Link href="/contact" className="px-8 py-3 bg-[#C03540] text-white font-bold text-[10px] uppercase tracking-widest rounded hover:bg-[#E05060] transition-colors duration-300 text-center">
                Get In Touch
              </Link>
              <Link href="/about" className="px-8 py-3 border border-black/15 dark:border-white/15 text-black dark:text-white font-bold text-[10px] uppercase tracking-widest rounded hover:border-black/40 dark:hover:border-white/40 transition-colors duration-300 text-center">
                More About Me
              </Link>
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              <span className="text-green-600 dark:text-green-300 text-[10px] font-bold uppercase tracking-wide">{profileData.status}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-3">
              <div className="flex flex-wrap justify-start" style={{ gap: "0.1em" }}>
                {["V", "I", "D", "U", "N"].map((ch, i) => (
                  <SpringLetter key={`f-${i}`} char={ch} mouse={mouse} fontSize="clamp(40px, 8vw, 100px)" />
                ))}
              </div>
              <div className="flex flex-wrap justify-start -mt-2" style={{ gap: "0.1em" }}>
                {["S", "H", "A", "N", "U", "K", "A"].map((ch, i) => (
                  <SpringLetter key={`l-${i}`} char={ch} mouse={mouse} fontSize="clamp(40px, 8vw, 100px)" />
                ))}
              </div>
            </h1>
            <p className="text-black/35 dark:text-white/35 text-xs uppercase tracking-[0.3em] mb-12">{profileData.subheading}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profileData.quickFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-base shrink-0 mt-0.5">{fact.icon}</span>
                  <div>
                    <p className="text-[10px] text-black/30 dark:text-white/30 uppercase tracking-wider font-bold mb-0.5">{fact.label}</p>
                    <p className="text-sm text-black/75 dark:text-white/75 whitespace-pre-line leading-relaxed">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-black/20 dark:text-white/20">
          <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-black/20 dark:from-white/20 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. TECH STACK
      ══════════════════════════════════════════ */}
      <section ref={setRef("techstack")} id="techstack" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="Module 01 — Tech Stack" title="Tech Stack" desc="The tools, languages, and frameworks I use to build scalable systems." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techData.map((tech) => (
              <div key={tech.id} className="group relative h-72 rounded-2xl border border-black/8 dark:border-white/10 overflow-hidden bg-gray-50 dark:bg-black hover:border-[rgb(192,53,64)]/40 transition-all duration-500">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(192,53,64,0.1) 0%, transparent 70%)" }} />
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">Stack {tech.label}</span>
                  <div>
                    <h3 className="text-3xl font-black text-black dark:text-white uppercase italic tracking-tighter leading-none mb-2">{tech.title}</h3>
                    <p className="text-[11px] text-black/35 dark:text-white/35 mb-5 leading-relaxed">{tech.desc}</p>
                    <div className="flex flex-col gap-2">
                      {tech.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-3">
                          <div className="h-px w-4 bg-[rgb(192,53,64)] shrink-0" />
                          <span className="text-[11px] font-bold text-black/65 dark:text-white/65 uppercase tracking-wider">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. PROJECTS
      ══════════════════════════════════════════ */}
      <section ref={setRef("projects")} id="projects" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="Module 02 — Projects" title="Projects" desc="Scalable architecture, pixel-perfect UI, and automated deployments." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsData.map((p) => (
              <div key={p.slug} className="group relative h-80 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden cursor-pointer grayscale hover:grayscale-0 hover:border-black/25 dark:hover:border-white/25 transition-all duration-500">
                <div className="absolute inset-0 z-0">
                  <Image src={p.image} alt={p.title} fill className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>
                <div className="relative z-10 h-full p-7 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">Project {p.label}</span>
                    <span className="text-white/25 text-[10px] uppercase tracking-wider">{p.category}</span>
                  </div>
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-3">{p.title}</h3>
                    <p className="text-[11px] text-white/50 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="text-[9px] border border-white/20 px-2 py-0.5 uppercase tracking-wider text-white/45">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. EDUCATION
      ══════════════════════════════════════════ */}
      <section ref={setRef("education")} id="education" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="Module 03 — Education" title="Education" desc="The academic foundation of algorithms, architecture, and engineering principles." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {educationData.map((edu) => (
              <div key={edu.id} className="group relative rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-black overflow-hidden hover:border-black/20 dark:hover:border-white/25 transition-all duration-500 p-8">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(192,53,64,0.07) 0%, transparent 60%)" }} />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">Academic {edu.label}</span>
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

      {/* ══════════════════════════════════════════
          5. CERTIFICATIONS
      ══════════════════════════════════════════ */}
      <section ref={setRef("certifications")} id="certifications" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="Module 04 — Certifications" title="Certifications" desc="Verified expertise from industry leaders in Cloud, AI, and Software Engineering." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certData.map((cert) => (
              <div key={cert.id} className="group relative h-56 rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-black overflow-hidden hover:border-black/20 dark:hover:border-white/25 transition-all duration-500">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, rgba(192,53,64,0.09) 0%, transparent 60%)" }} />
                <div className="relative z-10 h-full p-7 flex flex-col justify-between">
                  <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">License {cert.label}</span>
                  <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-black text-black dark:text-white uppercase italic tracking-tighter leading-none mb-1">{cert.title}</h3>
                    <p className="text-[10px] font-bold text-black/35 dark:text-white/35 uppercase tracking-wide mb-3">{cert.subtitle}</p>
                    <p className="text-[11px] text-black/25 dark:text-white/25 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{cert.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. LEARNINGS
      ══════════════════════════════════════════ */}
      <section ref={setRef("learnings")} id="learnings" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader module="Module 05 — Learnings" title="Learnings" desc="Key technologies and insights gained through hands-on experience." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningsData.map((item) => (
              <div key={item.label} className="group relative h-72 rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-black overflow-hidden hover:border-black/20 dark:hover:border-white/25 transition-all duration-500 p-7 flex flex-col justify-between">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(192,53,64,0.07) 0%, transparent 70%)" }} />
                <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em] relative z-10">Learn {item.label}</span>
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-black dark:text-white uppercase italic tracking-tighter leading-tight mb-3 group-hover:text-[rgb(192,53,64)] transition-colors duration-500">{item.title}</h3>
                  <p className="text-[11px] text-black/35 dark:text-white/35 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] border border-black/10 dark:border-white/10 px-2 py-0.5 uppercase tracking-wider text-black/35 dark:text-white/35">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CONTACT
      ══════════════════════════════════════════ */}
      <section ref={setRef("contact")} id="contact" className="py-24 lg:py-40 px-8 md:px-16 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16">

            {/* Left */}
            <div className="flex-1 max-w-lg">
              <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-4">Module 06 — Contact</span>
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
                { label: "Email", href: "mailto:vidun@email.com", sub: "vidun@email.com" },
                { label: "GitHub", href: "https://github.com", sub: "github.com/vidun" },
                { label: "LinkedIn", href: "https://linkedin.com", sub: "linkedin.com/in/vidun" },
                { label: "CV / Resume", href: "/cv", sub: "Download PDF" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
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