"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { stripProjects } from "@/data/projects";

export default function StripGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Convert vertical wheel scroll to horizontal movement
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden">
      {/* Transparent navbar on top of cards */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Left oval logo (click -> home) */}
        <div className="absolute left-6 top-5 pointer-events-auto">
          <Link href="/" aria-label="Go to home">
            <div className="h-10 w-28 rounded-full border border-white/25 bg-white/5 backdrop-blur-[2px] flex items-center justify-center overflow-hidden">
              {/* ✅ Your logo image */}
              <Image
                src="/strips/logo.png"
                alt="VSU Logo"
                width={90}
                height={26}
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Center nav items */}
        <nav className="w-full flex justify-center pt-6">
          <div className="pointer-events-auto flex items-center gap-10 text-sm text-white/85">
            <Link className="hover:text-white transition" href="/about">
              About
            </Link>
            <a className="hover:text-white transition" href="#socials">
              Socials
            </a>
            <button className="hover:text-white transition flex items-center gap-1">
              More <span className="text-white/60">▾</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Horizontal strip container */}
      <div
        ref={scrollerRef}
        className="h-full flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
      >
        {/* Profile strip - WIDE */}
        <section
          className="
            snap-start shrink-0
            w-[min(42vw,560px)]
            h-full
            border-r-2 border-black
            bg-[#0f0f12]
            relative
          "
        >
          <div className="h-full px-10 pt-28 pb-10 flex flex-col items-center text-center">
            <p className="text-white/60 text-sm">DevOps • Full Stack • ML</p>

            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
              Vidun Shanuka Upek
            </h1>

            {/* Profile image centered below name */}
            <div className="mt-8">
              <div className="w-44 h-44 rounded-2xl bg-white/10 border border-white/10 grid place-items-center">
                <span className="text-white/60 text-sm">Add photo</span>
              </div>
            </div>

            <p className="mt-8 text-white/70 text-sm leading-relaxed max-w-md">
              I build clean full-stack systems, reliable DevOps pipelines, and ML
              projects. This portfolio is designed like a horizontal gallery —
              scroll to explore.
            </p>

            {/* bottom-right scroll hint */}
            <div className="absolute right-6 bottom-6 text-xs text-white/50">
              Scroll ↓ to move →
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none border-2 border-black" />
        </section>

        {/* Project strips - NARROW */}
        {stripProjects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="
              snap-start shrink-0
              w-[min(22vw,320px)]
              h-full
              border-r-2 border-black
              relative
              group
              overflow-hidden
              transition-transform duration-300
              hover:z-20 hover:scale-[1.05]
            "
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
              priority={false}
            />

            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 pointer-events-none border-2 border-black" />

            <div
              className="
                absolute left-0 right-0 bottom-0
                translate-y-full
                group-hover:translate-y-0
                transition-transform duration-300 ease-out
                bg-black
                px-6 py-5
              "
            >
              <h2 className="text-4xl font-extrabold tracking-wide uppercase">
                {p.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
