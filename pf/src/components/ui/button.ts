export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent shadow-elev-1 hover:bg-accent-hover light:bg-[linear-gradient(120deg,#c2410c,#d7301a)] light:hover:bg-[linear-gradient(120deg,#9a3412,#b92a16)]",
  secondary: "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:border-fg/30 hover:bg-elevated",
  ghost: "text-muted hover:text-fg",
};

export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}
