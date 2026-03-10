"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMouse } from "@/components/InteractiveHero";
import InteractiveHero from "@/components/InteractiveHero";

/* Scroll-triggered reveal */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* Stat item with animated border */
function StatItem({
  label,
  value,
  sub,
  delay,
}: {
  label: string;
  value: string;
  sub?: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="pl-6"
      style={{
        borderLeft: `2px solid ${visible ? "rgba(192, 53, 64, 0.6)" : "rgba(255, 255, 255, 0.06)"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <h3 className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em] mb-2 font-mono">
        {label}
      </h3>
      <p className="text-[22px] font-extrabold text-white uppercase tracking-tight">
        {value}
      </p>
      {sub && (
        <p className="text-[11px] text-white/35 mt-1 uppercase tracking-[0.15em] font-mono">
          {sub}
        </p>
      )}
    </div>
  );
}

/* 
     ABOUT PAGE
    */
export default function AboutPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse();

  /* Horizontal scroll via mouse wheel */
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

  /* Scroll progress */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/*  SCROLL PROGRESS BAR  */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[100]"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, rgba(192, 53, 64, 0.8), rgba(224, 80, 96, 0.6))",
          boxShadow: "0 0 12px rgba(192, 53, 64, 0.4)",
          transition: "width 0.05s linear",
        }}
      />

      {/* LAYER 1 — scrollable content */}
      <main
        ref={scrollRef}
        className="relative z-[2] h-screen w-full overflow-x-auto overflow-y-hidden flex flex-nowrap items-stretch no-scrollbar"
      >
        {/* SECTION 1 — HERO (transparent → dots visible behind) */}
        <section className="w-[100vw] md:w-[60vw] shrink-0 border-r border-white/[0.06] relative overflow-hidden cursor-none">
          <InteractiveHero mouse={mouse} />
        </section>

        {/* SECTION 2 — BIOGRAPHY */}
        <section className="w-[100vw] md:w-[50vw] shrink-0 border-r border-white/[0.06] bg-[#080808] p-12 md:p-20 flex flex-col justify-center relative overflow-hidden">
          {/* Faint vertical accent */}
          <div className="absolute left-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-[rgba(192,53,64,0.15)] to-transparent" />

          <Reveal>
            <span className="text-[#C03540] text-xs font-bold uppercase tracking-[0.5em] mb-12 block">
              02 — The Story
            </span>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={150}>
              <p className="text-2xl md:text-3xl font-light text-white/80 leading-normal">
                I am currently a second-year student at the{" "}
                <span className="text-white font-bold">
                  University of Westminster
                </span>{" "}
                (IIT Sri Lanka).
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-white/40 text-sm md:text-base leading-loose max-w-xl">
                My journey isn&apos;t just about writing code it&apos;s about
                engineering solutions. From building Full stack applications
                to orchestrating zero touch Kubernetes pipelines, I bridge the
                gap between development and operations.
                <br />
                <br />
                I believe in the &quot;Build, Ship, Scale&quot; philosophy.
                Whether it&apos;s training an ML model for cost prediction or
                designing a disaster management system, my goal is to create
                software that solves real world problems with precision and
                speed.
              </p>
            </Reveal>
          </div>
        </section>

        {/* SECTION 3 — LEADERSHIP, TEAMWORK & ACHIEVEMENTS */}
        <section className="w-[100vw] md:w-[50vw] shrink-0 border-r border-white/[0.06] bg-[#070707] p-12 md:p-20 flex flex-col justify-center relative overflow-hidden text-white">
          <Reveal>
            <span className="text-[#C03540] text-xs font-bold uppercase tracking-[0.5em] mb-6 block">
              03 — Leadership, Teamwork & Achievements
            </span>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={120}>
              <div>
                <h3 className="text-white font-bold mb-3">Leadership & Teamwork</h3>
                <ul className="list-disc list-inside text-sm space-y-2 text-white/85">
                  <li>Technical Lead and Founder of Project CrackCode (Gamified Educational Platform)</li>
                  <li>Team Leader | ModelX InterUniversity hackathon | Finalist</li>
                  <li>Team Leader | IEEE Global hackathon | rank 1887 out of 8000+ teams globally</li>
                  <li>Vice Captain / Open batsman / wicket keeper of School cricket Team</li>
                  <li>Cricket captain of H&amp;M Cricket sports Club</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div>
                <h3 className="text-white font-bold mb-3">Awards</h3>
                <ul className="list-disc list-inside text-sm space-y-2 text-white/85">
                  <li>Award Winner at Annual School Sports Award Ceremony - Colour’s Night Event (2016, 2017, 2018)</li>
                  <li>All Island certificate Holder in Cricket (SLSCA Tournaments) | Best Batsman Awards | Best All Arounder Awards</li>
                  <li>Award Winner &amp; Bronze Medallist at Annual School Art competitions (2013, 2014, 2016, 2017)</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div>
                <h3 className="text-white font-bold mb-3">Languages</h3>
                <p className="text-sm text-white/85">English (Fluent) &amp; Sinhala (Native)</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 4 — VITALS */}
        <section className="w-[100vw] md:w-[40vw] shrink-0 border-r border-white/[0.06] bg-[#050505] p-12 flex flex-col justify-center">
          <Reveal>
            <span className="text-[#C03540] text-xs font-bold uppercase tracking-[0.5em] mb-16 block">
              04 — Vitals
            </span>
          </Reveal>

          <div className="grid grid-cols-1 gap-12">
            <StatItem label="Location" value="Maththegoda, Colombo, Sri Lanka" delay={100} />
            <StatItem
              label="Education"
              value="BCs (Hons) Computer Science"
              sub="Informatics Institute of Technology"
              delay={250}
            />
            <StatItem label="Focus" value="DevOps • ML • Full Stack" delay={400} />
          </div>
        </section>

        {/* SECTION 5 — VISION (transparent → dots visible) */}
        <section className="w-[100vw] md:w-[40vw] shrink-0 relative flex items-center justify-center overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-20">
            <Image src="/strips/bg1.png" alt="Texture" fill className="object-cover" />
          </div>

          {/* Radial glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: "60vw",
              height: "60vw",
              background: "radial-gradient(circle, rgba(192, 53, 64, 0.06) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(40px)",
            }}
          />

          <Reveal className="relative z-10 text-center">
            <p className="text-[#C03540] text-xs font-bold uppercase tracking-[0.5em] mb-6">
              05 — Vision
            </p>
            <h2
              className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-none"
              style={{ textShadow: "0 0 80px rgba(192, 53, 64, 0.15)" }}
            >
              Build.
              <br />
              Ship.
              <br />
              Scale.
            </h2>
          </Reveal>
        </section>
      </main>
    </>
  );
}
