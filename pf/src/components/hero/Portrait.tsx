"use client";

import { m } from "motion/react";
import Image from "next/image";
import portrait from "@/assets/images/portrait.jpg";
import { easeOutExpo } from "@/components/motion/Reveal";

const corners = ["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"];

// Scale-only entrance keeps the image fully opaque, so it still counts as LCP immediately.
export default function Portrait() {
  return (
    <figure className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-elevated shadow-elev-3">
        <m.div className="absolute inset-0" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: easeOutExpo }}>
          <Image
            src={portrait}
            alt="Portrait of Vidun Shanuka"
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 90vw"
            className="object-cover object-top"
          />
        </m.div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {corners.map((position) => (
          <span key={position} aria-hidden="true" className={`absolute size-6 border-accent ${position}`} />
        ))}
        <figcaption className="absolute inset-x-5 bottom-5 flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/85">
          <span>Colombo, LK</span>
          <span>Build · Ship · Scale</span>
        </figcaption>
      </div>
    </figure>
  );
}
