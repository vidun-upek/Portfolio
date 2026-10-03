// CSS entrance for above-the-fold content: starts at first paint, no hydration wait.
export default function Rise({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`animate-rise motion-reduce:animate-none ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
