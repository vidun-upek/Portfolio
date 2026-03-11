"use client";
import { useEffect, useRef, useState, useMemo, MutableRefObject } from "react";

/* Types & mouse tracking */
export type Mouse = MutableRefObject<{ x: number; y: number }>;

export function useMouse(): Mouse {
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return mouse;
}

/* Physics constants */
const SPRING_STIFFNESS = 0.08;
const SPRING_DAMPING = 0.72;
const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 60;

function springStep(pos: number, vel: number, target: number, force: number): [number, number] {
  const springForce = (target - pos) * SPRING_STIFFNESS;
  vel = (vel + springForce + force) * SPRING_DAMPING;
  pos += vel;
  return [pos, vel];
}

/* SpringLetter — per-letter physics loop */
export function SpringLetter({ char, mouse, fontSize }: { char: string; mouse: Mouse; fontSize: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const state = useRef({ y: 0, vy: 0, x: 0, vx: 0, glow: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    function tick() {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      let fx = 0, fy = 0;

      if (mx !== -9999) {
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const power = (1 - dist / REPULSION_RADIUS) ** 2.5;
          fy = (dy / dist) * power * REPULSION_STRENGTH;
          fx = (dx / dist) * power * REPULSION_STRENGTH * 0.3;
        }
      }

      const s = state.current;
      const [ny, nvy] = springStep(s.y, s.vy, 0, fy);
      const [nx, nvx] = springStep(s.x, s.vx, 0, fx);
      s.y = ny; s.vy = nvy;
      s.x = nx; s.vx = nvx;

      const displacement = Math.sqrt(ny * ny + nx * nx);
      s.glow = Math.min(displacement / 30, 1);

      el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      el.style.textShadow =
        s.glow > 0.05
          ? `0 0 ${8 + s.glow * 30}px rgba(192,53,64,${s.glow * 0.7}), 0 0 ${2 + s.glow * 12}px rgba(255,255,255,${s.glow * 0.3})`
          : "none";

      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [mouse]);

  if (char === " ") {
    return <span className="inline-block" style={{ width: "0.35em", fontSize }} />;
  }

  return (
    <span
      ref={ref}
      className="inline-block select-none cursor-default"
      style={{
        fontSize,
        fontWeight: 800,
        color: "#ffffff",
        letterSpacing: "-0.02em",
        willChange: "transform",
        lineHeight: 0.85,
      }}
    >
      {char}
    </span>
  );
}

/* AnimatedTagline — slide-up text reveal */
function AnimatedTagline({ text, delay = 0 }: { text: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span className="inline-block overflow-hidden">
      <span
        className="inline-block transition-transform duration-700"
        style={{
          transform: visible ? "translateY(0)" : "translateY(110%)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: visible ? 1 : 0,
        }}
      >
        {text}
      </span>
    </span>
  );
}

/* InteractiveHero component — name with cursor repulsion and labels */
export default function InteractiveHero({ mouse }: { mouse: Mouse }) {
  const nameChars = useMemo(() => "VIDUN SHANUKA".split(""), []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Corner brackets */}
      <div className="absolute top-6 left-6 w-[30px] h-[30px] border-t-[1.5px] border-l-[1.5px] border-[#C03540] opacity-40 z-10" />
      <div className="absolute top-6 right-6 w-[30px] h-[30px] border-t-[1.5px] border-r-[1.5px] border-[#C03540] opacity-40 z-10" />
      <div className="absolute bottom-6 left-6 w-[30px] h-[30px] border-b-[1.5px] border-l-[1.5px] border-[#C03540] opacity-40 z-10" />
      <div className="absolute bottom-6 right-6 w-[30px] h-[30px] border-b-[1.5px] border-r-[1.5px] border-[#C03540] opacity-40 z-10" />

      {/* Section label */}
      <div
        className="absolute top-9 left-[42px] z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}
      >
        <span className="text-[10px] font-bold text-[#C03540] opacity-70 uppercase tracking-[0.5em] font-mono">
          Identity
        </span>
      </div>

      {/* Vertical side text */}
      <div
        className="absolute right-9 top-1/2 z-10 text-[9px] font-medium text-white/15 uppercase tracking-[0.4em] font-mono whitespace-nowrap"
        style={{ transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center" }}
      >
        Software Engineer • DevOps • Full Stack
      </div>

      {/* THE NAME */}
      <div
        className="relative z-10 text-center flex flex-col items-center justify-center h-full px-4"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}
      >
        {/* First name */}
        <div className="flex justify-center" style={{ gap: 2 }}>
          {nameChars.slice(0, 5).map((ch, i) => (
            <SpringLetter key={`fn-${i}`} char={ch} mouse={mouse} fontSize="clamp(60px, 12vw, 160px)" />
          ))}
        </div>

        {/* Last name */}
        <div className="flex justify-center -mt-2" style={{ gap: 2 }}>
          {nameChars.slice(6).map((ch, i) => (
            <SpringLetter key={`ln-${i}`} char={ch} mouse={mouse} fontSize="clamp(60px, 12vw, 160px)" />
          ))}
        </div>

        {/* Accent pulse line */}
        <div
          className="w-[60px] h-[2px] mx-auto mt-6 mb-5"
          style={{ background: "rgba(192, 53, 64, 0.6)", animation: "pulse-line 3s ease-in-out infinite" }}
        />

        {/* Tagline */}
        <div className="text-xs font-medium text-white/35 uppercase tracking-[0.45em] font-mono flex gap-2 justify-center">
          <AnimatedTagline text="Build" delay={1000} />
          <span className="text-[rgba(192,53,64,0.5)]" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s 1.2s" }}>•</span>
          <AnimatedTagline text="Ship" delay={1200} />
          <span className="text-[rgba(192,53,64,0.5)]" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s 1.4s" }}>•</span>
          <AnimatedTagline text="Scale" delay={1400} />
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 text-[10px] text-white/[0.18] uppercase tracking-[0.3em] font-mono flex items-center gap-3 z-10"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s 2s" }}
      >
        <span className="inline-block w-6 h-px bg-white/15" />
        Scroll to explore
        <span className="inline-block w-6 h-px bg-white/15" />
      </div>
    </>
  );
}
