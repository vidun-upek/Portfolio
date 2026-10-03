export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent shadow-elev-2 hover:bg-accent-hover hover:shadow-[0_10px_30px_-10px_var(--glow)]",
  secondary: "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:border-accent-fg/60 hover:text-accent-fg",
  ghost: "text-muted hover:text-fg",
};

export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}
