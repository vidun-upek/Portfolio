"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Mirrors the `hscroll` variant in globals.css; layout is CSS-driven, JS only maps scroll to x.
const QUERY = "(min-width: 64rem) and (min-height: 42.5rem) and (prefers-reduced-motion: no-preference)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

type HorizontalScrollProps = {
  children: React.ReactNode;
  label: string;
  trackClassName?: string;
};

export default function HorizontalScroll({ children, label, trackClassName = "" }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!enabled || !track) return;
    const observer = new ResizeObserver(() => setDistance(Math.max(0, track.scrollWidth - window.innerWidth)));
    observer.observe(track);
    return () => observer.disconnect();
  }, [enabled]);

  // Keyboard focus inside the clipped track: sync window scroll so the focused item is in view.
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!enabled || !section || !track || !distance) return;
    const onFocus = (e: FocusEvent) => {
      if (track.parentElement) track.parentElement.scrollLeft = 0;
      const offset = (e.target as HTMLElement).getBoundingClientRect().left - track.getBoundingClientRect().left;
      const progress = Math.min(1, Math.max(0, (offset - window.innerWidth * 0.15) / distance));
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + progress * distance, behavior: "instant" });
    };
    track.addEventListener("focusin", onFocus);
    return () => track.removeEventListener("focusin", onFocus);
  }, [enabled, distance]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, enabled ? -distance : 0]);

  return (
    <section
      ref={sectionRef}
      aria-label={label}
      className="relative"
      style={enabled ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="hscroll:sticky hscroll:top-0 hscroll:flex hscroll:h-screen hscroll:items-center hscroll:overflow-hidden">
        <m.div ref={trackRef} style={{ x }} className={`hscroll:flex hscroll:w-max hscroll:flex-nowrap ${trackClassName}`}>
          {children}
        </m.div>
      </div>
    </section>
  );
}
