"use client";

import Image from "next/image";
import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-black text-white">
      {/* ═══ TOP: GIF ═══ */}
      <div className="gif-wrapper relative h-[38vh] w-full overflow-hidden cursor-pointer">
        <Image
          src="/strips/HeroTyping.gif"
          alt="VS Code editor background"
          fill
          priority
          unoptimized
          className="object-cover object-top"
        />
        <div
          className="gif-overlay absolute inset-0 bg-black/70 pointer-events-none"
          style={{ opacity: 1 }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        <Navbar />
      </div>

      {/* ═══ BOTTOM ═══ */}
      <div className="relative flex h-[62vh] w-full items-center">
        <div className="mx-auto w-full max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-10">
            {/* Profile Card */}
            <div className="flex justify-center md:justify-start">
              <div className="splash-container relative h-[320px] w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="splash-effect" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-[12px] tracking-[0.3em] text-white/20">
                    Profile Photo
                  </span>
                </div>
                <div className="pointer-events-none absolute -right-12 top-12 h-44 w-44 rounded-full bg-brand-red/15 blur-3xl" />
              </div>
            </div>

            {/* Name + Roles */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[320px] text-left">
                <h1 className="font-display text-6xl md:text-7xl uppercase leading-[0.9] tracking-wide text-white">
                  Vidun
                  <br />
                  Shanuka
                </h1>
                <div className="mt-5 space-y-1.5 font-body text-sm text-white/55 tracking-wide">
                  <p>Frontend Development</p>
                  <p>Backend Development</p>
                  <p>ML Model Training</p>
                  <p>CI/CD Pipelines &amp; Cloud</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <OpenPill label="Internships" />
                <OpenPill label="Freelance" />
                <OpenPill label="Collaborations" />
              </div>
              <p className="mt-5 font-display text-[13px] tracking-[0.35em] text-brand-red">
                Build • Ship • Scale
              </p>
            </div>

            {/* What I Do */}
            <div className="flex justify-center md:justify-end">
              <div className="splash-container relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="splash-effect" />
                <p className="font-display text-[12px] tracking-[0.3em] text-white/50 relative z-10">
                  What I Do
                </p>
                <p className="mt-3 font-body text-[13px] leading-relaxed text-white/60 relative z-10">
                  I build end-to-end products with premium UX, scalable
                  backends, and smooth DevOps delivery. When ML fits the
                  problem, I design pipelines that are practical, testable, and
                  deployable.
                </p>
                <ul className="mt-4 space-y-2.5 font-body text-[13px] text-white/60 relative z-10">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    Frontend experiences that feel fast and polished
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    Backend services &amp; APIs designed to scale
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    CI/CD + cloud setups that reduce friction
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 font-body text-[11px] font-medium text-white/55 transition-all duration-200 hover:border-brand-red/40 hover:bg-brand-red/10 hover:text-white hover:-translate-y-0.5 cursor-default">
      {label}
    </span>
  );
}