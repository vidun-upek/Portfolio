import { LOGO_S, LOGO_TRANSFORM, LOGO_V } from "./logo-paths";

// Gradient stops read the theme's brand tokens, so the S shifts from crimson to sunrise in light mode.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="vs-logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--brand-1)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--brand-2)" }} />
          <stop offset="1" style={{ stopColor: "var(--brand-3)" }} />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="#0b0b0b" />
      <g fill="none" strokeWidth="3.6" strokeLinecap="square" strokeLinejoin="miter" transform={LOGO_TRANSFORM}>
        <path d={LOGO_V} stroke="#ffffff" />
        <path d={LOGO_S} stroke="url(#vs-logo-gradient)" />
      </g>
    </svg>
  );
}
