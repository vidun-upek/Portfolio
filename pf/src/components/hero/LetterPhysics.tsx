"use client";

import { useEffect, type RefObject } from "react";

const STIFFNESS = 0.08;
const DAMPING = 0.72;
const RADIUS = 120;
const STRENGTH = 60;

type Body = { x: number; y: number; vx: number; vy: number; cx: number; cy: number };

// Spring-repulsion for [data-letter] spans: one rAF loop that sleeps when idle or off-screen.
// Fine pointers only, and skipped entirely when the user prefers reduced motion.
export default function LetterPhysics({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const root = targetRef.current;
    if (!root || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
    const bodies: Body[] = letters.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, cx: 0, cy: 0 }));
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;
    let visible = true;

    const measure = () =>
      letters.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const body = bodies[i];
        body.cx = rect.left + rect.width / 2 - body.x + window.scrollX;
        body.cy = rect.top + rect.height / 2 - body.y + window.scrollY;
      });

    const tick = () => {
      const px = pointer.x + window.scrollX;
      const py = pointer.y + window.scrollY;
      let moving = false;

      bodies.forEach((b, i) => {
        const dx = b.cx + b.x - px;
        const dy = b.cy + b.y - py;
        const dist = Math.hypot(dx, dy);
        let fx = 0;
        let fy = 0;
        if (dist > 0 && dist < RADIUS) {
          const power = (1 - dist / RADIUS) ** 2.5;
          fx = (dx / dist) * power * STRENGTH * 0.3;
          fy = (dy / dist) * power * STRENGTH;
        }
        b.vx = (b.vx - b.x * STIFFNESS + fx) * DAMPING;
        b.vy = (b.vy - b.y * STIFFNESS + fy) * DAMPING;
        b.x += b.vx;
        b.y += b.vy;
        if (fx || fy || Math.abs(b.x) + Math.abs(b.y) + Math.abs(b.vx) + Math.abs(b.vy) > 0.02) moving = true;
        letters[i].style.transform = `translate3d(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px, 0)`;
      });

      frame = moving && visible ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (frame || !visible) return;
      measure();
      frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      wake();
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
      wake();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    observer.observe(root);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      letters.forEach((el) => (el.style.transform = ""));
    };
  }, [targetRef]);

  return null;
}
