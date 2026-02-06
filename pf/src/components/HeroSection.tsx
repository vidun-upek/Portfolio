"use client";

import Image from "next/image";
import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-black text-white">
      {/* ================= TOP (Increased to 38vh for GIF visibility) ================= */}
      <div className="relative h-[38vh] w-full overflow-hidden">
        {/* GIF Background configured for visibility and animation */}
        <Image
          src="/strips/HeroTyping.gif"
          alt="VS Code editor background"
          fill
          priority
          unoptimized={true}
          className="object-cover object-top"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(192,53,64,0.18),transparent_45%)]" />

        <Navbar />
      </div>

      {/* ================= BOTTOM (62vh) ================= */}
      <div className="relative flex h-[62vh] w-full items-center">
        <div className="mx-auto w-full max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3 md:gap-12">
            {/* -------- LEFT: PROFILE CARD -------- */}
            <div className="flex justify-center md:justify-start">
              <div className="relative h-[420px] w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-[11px] uppercase tracking-[0.35em] text-white/25">
                    Profile Photo
                  </span>
                </div>

                <div className="pointer-events-none absolute -right-12 top-12 h-44 w-44 rounded-full bg-[rgba(192,53,64,0.18)] blur-3xl" />
              </div>
            </div>

            {/* -------- CENTER: NAME + ROLES + OPEN TO -------- */}
            <div className="flex flex-col items-center text-center">
              <div className="w-[320px] md:w-[360px] text-left">
                {/* Name */}
                <h1 className="text-4xl font-bold uppercase leading-[0.9] tracking-tight md:text-5xl">
                  Vidun
                  <br />
                  Shanuka
                </h1>

                {/* Roles aligned to left edge */}
                <div className="mt-6 space-y-2 text-sm text-white/75">
                  <p>Frontend Development</p>
                  <p>Backend Development</p>
                  <p>ML Model Training</p>
                  <p>CI/CD Pipelines &amp; Cloud</p>
                </div>
              </div>

              {/* Open to pills */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <OpenPill label="Internships" />
                <OpenPill label="Freelance" />
                <OpenPill label="Collaborations" />
              </div>

              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-[rgb(192,53,64)]">
                Build • Ship • Scale
              </p>
            </div>

            {/* -------- RIGHT: WHAT I DO -------- */}
            <div className="flex justify-center md:justify-end">
              <div className="infoCard relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="splash" />

                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
                  What I do
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  I build end-to-end products with premium UX, scalable backends,
                  and smooth DevOps delivery. When ML fits the problem, I design
                  pipelines that are practical, testable, and deployable.
                </p>

                <ul className="mt-5 space-y-3 text-sm text-white/75">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(192,53,64)]" />
                    Frontend experiences that feel fast and polished
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(192,53,64)]" />
                    Backend services &amp; APIs designed to scale
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(192,53,64)]" />
                    CI/CD + cloud setups that reduce friction
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .infoCard .splash {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(-120%) skewX(-18deg);
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 35%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 0) 65%,
            transparent 100%
          );
        }

        .infoCard:hover .splash {
          animation: splashMove 750ms ease-out forwards;
        }

        @keyframes splashMove {
          0% {
            opacity: 0;
            transform: translateX(-120%) skewX(-18deg);
          }
          12% {
            opacity: 0.65;
          }
          70% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateX(140%) skewX(-18deg);
          }
        }
      `}</style>
    </section>
  );
}

function OpenPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[11px] font-semibold text-white/75 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white hover:-translate-y-0.5">
      {label}
    </span>
  );
}