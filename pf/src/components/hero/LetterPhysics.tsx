"use client";

import { useEffect, type RefObject } from "react";

const STIFFNESS = 0.08;
const DAMPING = 0.72;
const RADIUS = 120;
const STRENGTH = 60;
const SWEEP_MS = 2200;
const CYCLE_MS = 4800;

type Body = { x: number; y: number; vx: number; vy: number; cx: number; cy: number };

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

// Spring-repulsion for [data-letter] spans. Fine pointers drive it directly; touch devices
// get an automatic sweep instead, since finger tracking on phones feels jittery.
export default function LetterPhysics({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const root = targetRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const autoplay = !window.matchMedia("(pointer: fine)").matches;
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
    const bodies: Body[] = letters.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, cx: 0, cy: 0 }));
    const box = { left: 0, right: 0, midY: 0, scale: 1 };
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;
    let visible = true;
    let start = 0;
    let cycle = -1;

    const measure = () => {
      letters.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const body = bodies[i];
        body.cx = rect.left + rect.width / 2 - body.x + window.scrollX;
        body.cy = rect.top + rect.height / 2 - body.y + window.scrollY;
      });
      const rect = root.getBoundingClientRect();
      box.left = rect.left + window.scrollX;
      box.right = rect.right + window.scrollX;
      box.midY = rect.top + rect.height / 2 + window.scrollY;
      box.scale = Math.min(1, Math.max(0.45, rect.height / 180));
    };

    // Page-space pointer: the real cursor, or a virtual one gliding along the name's midline.
    const pointerAt = (time: number) => {
      if (!autoplay) return { x: pointer.x + window.scrollX, y: pointer.y + window.scrollY };
      const current = Math.floor((time - start) / CYCLE_MS);
      if (current !== cycle) {
        cycle = current;
        measure();
      }
      const phase = ((time - start) % CYCLE_MS) / SWEEP_MS;
      if (phase > 1) return { x: -9999, y: -9999 };
      const pad = RADIUS * box.scale;
      return { x: box.left - pad + (box.right - box.left + pad * 2) * easeInOut(phase), y: box.midY };
    };

    const tick = (time: number) => {
      const { x: px, y: py } = pointerAt(time);
      const radius = RADIUS * box.scale;
      const strength = STRENGTH * box.scale * (autoplay ? 0.7 : 1);
      let moving = autoplay;

      bodies.forEach((b, i) => {
        const dx = b.cx + b.x - px;
        const dy = b.cy + b.y - py;
        const dist = Math.hypot(dx, dy);
        let fx = 0;
        let fy = 0;
        if (dist > 0 && dist < radius) {
          const power = (1 - dist / radius) ** 2.5;
          fx = (dx / dist) * power * strength * 0.3;
          fy = (dy / dist) * power * strength;
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
    const onResize = () => frame && measure();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    observer.observe(root);
    window.addEventListener("resize", onResize);
    if (autoplay) {
      // First sweep starts once the entrance animation has settled.
      start = performance.now() + 1800 - CYCLE_MS;
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      letters.forEach((el) => (el.style.transform = ""));
    };
  }, [targetRef]);

  return null;
}
