/**
 * @deprecated - This component has been replaced with DottedBackground.tsx
 * The old GridCanvas, ScanlineOverlay, and Crosshair implementations have been removed.
 * Use DottedBackground instead, which is simpler and more efficient.
 */

export default function DarkBackground() {
  return null;
}


// /* ═══════════════════════════════════════════════════════════════
//    TYPES & PHYSICS
//    ═══════════════════════════════════════════════════════════════ */
// export type Mouse = MutableRefObject<{ x: number; y: number }>;

// const DOT_REPULSION_RADIUS = 140;
// const DOT_REPULSION_STRENGTH = 18;
// const SPRING_STIFFNESS = 0.08;
// const SPRING_DAMPING = 0.72;

// function springStep(pos: number, vel: number, target: number, force: number): [number, number] {
//   const springForce = (target - pos) * SPRING_STIFFNESS;
//   vel = (vel + springForce + force) * SPRING_DAMPING;
//   pos += vel;
//   return [pos, vel];
// }

// /* ═══════════════════════════════════════════════════════════════
//    useMouse — call once in page, pass ref to children
//    ═══════════════════════════════════════════════════════════════ */
// export function useMouse(): Mouse {
//   const mouse = useRef({ x: -9999, y: -9999 });

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       mouse.current = { x: e.clientX, y: e.clientY };
//     };
//     const onLeave = () => {
//       mouse.current = { x: -9999, y: -9999 };
//     };
//     const onTouch = (e: TouchEvent) => {
//       if (e.touches.length > 0) {
//         mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
//       }
//     };
//     const onTouchEnd = () => {
//       mouse.current = { x: -9999, y: -9999 };
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseleave", onLeave);
//     window.addEventListener("touchmove", onTouch, { passive: true });
//     window.addEventListener("touchend", onTouchEnd);
//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseleave", onLeave);
//       window.removeEventListener("touchmove", onTouch);
//       window.removeEventListener("touchend", onTouchEnd);
//     };
//   }, []);

//   return mouse;
// }

// /* ═══════════════════════════════════════════════════════════════
//    GridCanvas — reactive dot grid drawn on <canvas>
//    ═══════════════════════════════════════════════════════════════ */
// function GridCanvas({ mouse }: { mouse: Mouse }) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const dotsRef = useRef<
//     { ox: number; oy: number; x: number; y: number; vx: number; vy: number; baseAlpha: number }[]
//   >([]);
//   const animRef = useRef<number>(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;
//     const dpr = window.devicePixelRatio || 1;

//     const resize = () => {
//       canvas.width = window.innerWidth * dpr;
//       canvas.height = window.innerHeight * dpr;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       const gap = 36;
//       const dots: typeof dotsRef.current = [];
//       for (let x = gap; x < window.innerWidth; x += gap) {
//         for (let y = gap; y < window.innerHeight; y += gap) {
//           dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0, baseAlpha: 0.08 + Math.random() * 0.04 });
//         }
//       }
//       dotsRef.current = dots;
//     };

//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;

//     function draw() {
//       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//       const mx = mouse.current.x;
//       const my = mouse.current.y;

//       for (const d of dotsRef.current) {
//         let fx = 0, fy = 0;
//         if (mx !== -9999) {
//           const dx = d.ox - mx;
//           const dy = d.oy - my;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < DOT_REPULSION_RADIUS && dist > 0) {
//             const power = (1 - dist / DOT_REPULSION_RADIUS) ** 2;
//             fx = (dx / dist) * power * DOT_REPULSION_STRENGTH;
//             fy = (dy / dist) * power * DOT_REPULSION_STRENGTH;
//           }
//         }

//         const [nx, nvx] = springStep(d.x, d.vx, d.ox, fx);
//         const [ny, nvy] = springStep(d.y, d.vy, d.oy, fy);
//         d.x = nx; d.vx = nvx;
//         d.y = ny; d.vy = nvy;

//         const displacement = Math.sqrt((d.x - d.ox) ** 2 + (d.y - d.oy) ** 2);
//         const alpha = Math.min(d.baseAlpha + displacement * 0.012, 0.5);

//         ctx.beginPath();
//         ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,255,255,${alpha})`;
//         ctx.fill();
//       }
//       animRef.current = requestAnimationFrame(draw);
//     }

//     animRef.current = requestAnimationFrame(draw);
//     return () => cancelAnimationFrame(animRef.current);
//   }, [mouse]);

//   return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
// }

// /* ═══════════════════════════════════════════════════════════════
//    ScanlineOverlay — subtle CRT effect
//    ═══════════════════════════════════════════════════════════════ */
// function ScanlineOverlay() {
//   return (
//     <div
//       className="absolute inset-0 pointer-events-none"
//       style={{
//         background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)`,
//       }}
//     />
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    Crosshair — eased cursor follower
//    ═══════════════════════════════════════════════════════════════ */
// function Crosshair({ mouse }: { mouse: Mouse }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const pos = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     let raf: number;
//     function tick() {
//       const el = ref.current;
//       if (!el) return;
//       const mx = mouse.current.x;
//       const my = mouse.current.y;
//       if (mx !== -9999) {
//         pos.current.x += (mx - pos.current.x) * 0.12;
//         pos.current.y += (my - pos.current.y) * 0.12;
//         el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
//         el.style.opacity = "1";
//       } else {
//         el.style.opacity = "0";
//       }
//       raf = requestAnimationFrame(tick);
//     }
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [mouse]);

//   return (
//     <div ref={ref} className="fixed pointer-events-none z-50 opacity-0 transition-opacity duration-300" style={{ top: -20, left: -20, width: 40, height: 40 }}>
//       <div className="absolute rounded-sm" style={{ left: 19, top: 4, width: 1.5, height: 12, background: "rgba(192, 53, 64, 0.5)" }} />
//       <div className="absolute rounded-sm" style={{ left: 19, top: 24, width: 1.5, height: 12, background: "rgba(192, 53, 64, 0.5)" }} />
//       <div className="absolute rounded-sm" style={{ top: 19, left: 4, height: 1.5, width: 12, background: "rgba(192, 53, 64, 0.5)" }} />
//       <div className="absolute rounded-sm" style={{ top: 19, left: 24, height: 1.5, width: 12, background: "rgba(192, 53, 64, 0.5)" }} />
//       <div className="absolute rounded-full" style={{ left: 17, top: 17, width: 6, height: 6, border: "1.5px solid rgba(192, 53, 64, 0.4)" }} />
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    ██  DEFAULT EXPORT — DarkBackground
//    Fixed fullscreen layer: #050505 bg + dots + scanlines + crosshair.
//    Place ONCE at page level, before your content.
//    ═══════════════════════════════════════════════════════════════ */
// export default function DarkBackground({ mouse }: { mouse: Mouse }) {
//   return (
//     <div className="fixed inset-0 w-screen h-screen bg-[#050505] z-0 pointer-events-none">
//       <GridCanvas mouse={mouse} />
//       <ScanlineOverlay />
//       <Crosshair mouse={mouse} />
//     </div>
//   );
// }
