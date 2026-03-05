'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

const SPRING_STIFFNESS = 0.08;
const SPRING_DAMPING = 0.72;
const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 60;

interface MousePos {
  x: number;
  y: number;
}

function springStep(pos: number, vel: number, target: number, force: number): [number, number] {
  const springForce = (target - pos) * SPRING_STIFFNESS;
  vel = (vel + springForce + force) * SPRING_DAMPING;
  pos += vel;
  return [pos, vel];
}

function SpringLetter({
  char,
  mouse,
  fontSize,
  fontWeight,
}: {
  char: string;
  mouse: React.MutableRefObject<MousePos>;
  fontSize: string;
  fontWeight: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const state = useRef({ y: 0, vy: 0, x: 0, vx: 0, glow: 0 });
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    function tick() {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      let fx = 0,
        fy = 0;
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
      s.y = ny;
      s.vy = nvy;
      s.x = nx;
      s.vx = nvx;

      const displacement = Math.sqrt(ny * ny + nx * nx);
      s.glow = Math.min(displacement / 30, 1);

      el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      el.style.textShadow =
        s.glow > 0.05
          ? `0 0 ${8 + s.glow * 30}px rgba(192, 53, 64, ${s.glow * 0.7}), 0 0 ${2 + s.glow * 12}px rgba(255, 255, 255, ${s.glow * 0.3})`
          : 'none';

      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, [mouse]);

  if (char === ' ') {
    return <span style={{ display: 'inline-block', width: '0.35em', fontSize }} />;
  }

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-block',
        fontSize,
        fontWeight,
        color: '#ffffff',
        letterSpacing: '-0.02em',
        willChange: 'transform',
        cursor: 'default',
        userSelect: 'none',
        lineHeight: 0.85,
      }}
    >
      {char}
    </span>
  );
}

function AnimatedTagline({ text, delay = 0 }: { text: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span style={{ display: 'inline-block', overflow: 'hidden' }}>
      <span
        style={{
          display: 'inline-block',
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: visible ? 1 : 0,
        }}
      >
        {text}
      </span>
    </span>
  );
}

function RevealSection({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
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
      { threshold: 0.15, rootMargin: '0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

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
      style={{
        borderLeft: `2px solid ${visible ? 'rgba(192,53,64,0.6)' : 'rgba(255,255,255,0.06)'}`,
        paddingLeft: 24,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: 8,
          fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          fontFamily: "'Syne', sans-serif",
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 4,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export function InteractiveHeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<MousePos>({ x: -9999, y: -9999 });
  const nameChars = useMemo(() => 'VIDUN SHANUKA'.split(''), []);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.97; }
          75% { opacity: 1; }
          80% { opacity: 0.95; }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2,
          zIndex: 99,
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, rgba(192,53,64,0.8), rgba(255,100,100,0.6))',
          transition: 'width 0.05s linear',
          boxShadow: '0 0 12px rgba(192,53,64,0.4)',
        }}
      />

      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{
          height: '100vh',
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'stretch',
          cursor: 'none',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* SECTION 1 — INTERACTIVE HERO */}
        <section
          style={{
            width: '100vw',
            minWidth: '100vw',
            flexShrink: 0,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 40px',
          }}
        >
          {/* Corner brackets */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              width: 30,
              height: 30,
              borderTop: '1.5px solid rgba(192,53,64,0.4)',
              borderLeft: '1.5px solid rgba(192,53,64,0.4)',
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 30,
              height: 30,
              borderTop: '1.5px solid rgba(192,53,64,0.4)',
              borderRight: '1.5px solid rgba(192,53,64,0.4)',
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              width: 30,
              height: 30,
              borderBottom: '1.5px solid rgba(192,53,64,0.4)',
              borderLeft: '1.5px solid rgba(192,53,64,0.4)',
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              right: 24,
              width: 30,
              height: 30,
              borderBottom: '1.5px solid rgba(192,53,64,0.4)',
              borderRight: '1.5px solid rgba(192,53,64,0.4)',
              zIndex: 10,
            }}
          />

          {/* Section label */}
          <div
            style={{
              position: 'absolute',
              top: 36,
              left: 42,
              zIndex: 10,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s',
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'rgba(192,53,64,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.5em',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              01 — Identity
            </span>
          </div>

          {/* Vertical side text */}
          <div
            style={{
              position: 'absolute',
              right: 36,
              top: '50%',
              transform: 'translateY(-50%) rotate(90deg)',
              transformOrigin: 'center',
              fontSize: 9,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.15)',
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              fontFamily: "'JetBrains Mono', monospace",
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            Software Engineer • DevOps • Full Stack
          </div>

          {/* THE NAME */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.3s',
            }}
          >
            {/* First name row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {nameChars.slice(0, 5).map((ch, i) => (
                <SpringLetter
                  key={`fn-${i}`}
                  char={ch}
                  mouse={mouse}
                  fontSize="clamp(60px, 12vw, 160px)"
                  fontWeight={800}
                />
              ))}
            </div>

            {/* Last name row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: -8 }}>
              {nameChars.slice(6).map((ch, i) => (
                <SpringLetter
                  key={`ln-${i}`}
                  char={ch}
                  mouse={mouse}
                  fontSize="clamp(60px, 12vw, 160px)"
                  fontWeight={800}
                />
              ))}
            </div>

            {/* Accent line */}
            <div
              style={{
                width: 60,
                height: 2,
                margin: '24px auto 20px',
                background: 'rgba(192,53,64,0.6)',
                animation: 'pulse-line 3s ease-in-out infinite',
              }}
            />

            {/* Tagline */}
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.45em',
                fontFamily: "'JetBrains Mono', monospace",
                display: 'flex',
                gap: 8,
                justifyContent: 'center',
              }}
            >
              <AnimatedTagline text="Build" delay={1000} />
              <span
                style={{
                  color: 'rgba(192,53,64,0.5)',
                  opacity: loaded ? 1 : 0,
                  transition: 'opacity 0.5s 1.2s',
                }}
              >
                •
              </span>
              <AnimatedTagline text="Ship" delay={1200} />
              <span
                style={{
                  color: 'rgba(192,53,64,0.5)',
                  opacity: loaded ? 1 : 0,
                  transition: 'opacity 0.5s 1.4s',
                }}
              >
                •
              </span>
              <AnimatedTagline text="Scale" delay={1400} />
            </div>
          </div>

          {/* Bottom hint */}
          <div
            style={{
              position: 'absolute',
              bottom: 36,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.18)',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontFamily: "'JetBrains Mono', monospace",
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              zIndex: 10,
              opacity: loaded ? 1 : 0,
              transition: 'opacity 1s 2s',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 24,
                height: 1,
                background: 'rgba(255,255,255,0.15)',
              }}
            />
            Scroll to explore
            <span
              style={{
                display: 'inline-block',
                width: 24,
                height: 1,
                background: 'rgba(255,255,255,0.15)',
              }}
            />
          </div>
        </section>

        {/* SECTION 2 — BIOGRAPHY */}
        <section
          style={{
            width: 'clamp(100vw, 50vw, 100vw)',
            minWidth: 'min(100vw, 700px)',
            flexShrink: 0,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '80px clamp(40px, 5vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '10%',
              bottom: '10%',
              width: 1,
              background:
                'linear-gradient(180deg, transparent, rgba(192,53,64,0.15), transparent)',
            }}
          />

          <RevealSection>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'rgba(192,53,64,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.5em',
                fontFamily: "'JetBrains Mono', monospace",
                display: 'block',
                marginBottom: 48,
              }}
            >
              02 — The Story
            </span>
          </RevealSection>

          <RevealSection delay={150}>
            <p
              style={{
                fontSize: 'clamp(22px, 2.5vw, 32px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.5,
                fontFamily: "'Syne', sans-serif",
                maxWidth: 560,
                marginBottom: 32,
              }}
            >
              Second-year student at the{' '}
              <span style={{ fontWeight: 700, color: '#fff' }}>
                University of Westminster
              </span>{' '}
              (IIT Sri Lanka).
            </p>
          </RevealSection>

          <RevealSection delay={300}>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 2,
                maxWidth: 520,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.01em',
              }}
            >
              My journey isn't just about writing code — it's about engineering
              solutions. From building full-stack MERN applications to
              orchestrating zero-touch Kubernetes pipelines, I bridge the gap
              between development and operations.
            </p>
          </RevealSection>

          <RevealSection delay={450}>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 2,
                maxWidth: 520,
                marginTop: 24,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.01em',
              }}
            >
              Whether it's training an ML model for cost prediction or designing
              a disaster management system, my goal is to create software that
              solves real-world problems with precision and speed.
            </p>
          </RevealSection>

          <RevealSection delay={600}>
            <div
              style={{
                marginTop: 48,
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: 4,
                maxWidth: 380,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'rgba(255,255,255,0.2)',
                animation: 'flicker 4s infinite',
              }}
            >
              <span style={{ color: 'rgba(192,53,64,0.5)' }}>const</span>{' '}
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>approach</span>{' '}
              <span style={{ color: 'rgba(192,53,64,0.5)' }}>=</span>{' '}
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'{'}</span>
              <br />
              {'  '}
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>build</span>:{' '}
              <span style={{ color: 'rgba(192,53,64,0.4)' }}>"fast"</span>,
              <br />
              {'  '}
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>ship</span>:{' '}
              <span style={{ color: 'rgba(192,53,64,0.4)' }}>"often"</span>,
              <br />
              {'  '}
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>scale</span>:{' '}
              <span style={{ color: 'rgba(192,53,64,0.4)' }}>"always"</span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'}'}</span>;
            </div>
          </RevealSection>
        </section>

        {/* SECTION 3 — VITALS */}
        <section
          style={{
            width: 'clamp(100vw, 40vw, 100vw)',
            minWidth: 'min(100vw, 500px)',
            flexShrink: 0,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '80px clamp(40px, 4vw, 60px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <RevealSection>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'rgba(192,53,64,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.5em',
                fontFamily: "'JetBrains Mono', monospace",
                display: 'block',
                marginBottom: 64,
              }}
            >
              03 — Vitals
            </span>
          </RevealSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <StatItem label="Location" value="Pannipitiya, Sri Lanka" delay={100} />
            <StatItem
              label="Education"
              value="BEng (Hons) Software Engineering"
              sub="Informatics Institute of Technology"
              delay={250}
            />
            <StatItem label="Focus" value="DevOps • ML • Full Stack" delay={400} />
            <StatItem label="Philosophy" value="Ship it, then iterate." delay={550} />
          </div>
        </section>

        {/* SECTION 4 — VISION / CLOSER */}
        <section
          style={{
            width: '100vw',
            minWidth: '100vw',
            flexShrink: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <RevealSection style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'rgba(192,53,64,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.5em',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 32,
              }}
            >
              04 — Vision
            </p>

            <h2
              style={{
                fontSize: 'clamp(64px, 12vw, 140px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                fontStyle: 'italic',
                letterSpacing: '-0.04em',
                color: '#fff',
                lineHeight: 0.85,
                fontFamily: "'Syne', sans-serif",
                textShadow: '0 0 80px rgba(192,53,64,0.15)',
              }}
            >
              Build.
              <br />
              Ship.
              <br />
              Scale.
            </h2>

            <div
              style={{
                width: 40,
                height: 2,
                margin: '32px auto 0',
                background: 'rgba(192,53,64,0.4)',
              }}
            />
          </RevealSection>
        </section>
      </div>
    </>
  );
}

