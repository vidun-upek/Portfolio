export default function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" }) {
  const tones = {
    default: "border-line text-muted",
    accent: "border-accent-fg/30 bg-accent/10 text-accent-fg",
  };
  return (
    <span className={`inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
}
