import Link from "next/link";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

const base =
  "group relative isolate flex flex-col overflow-hidden rounded-lg border border-line bg-surface/70 backdrop-blur transition-colors duration-300 hover:border-line-strong";

// Shared surface for every card; the spotlight layer sits behind content via `isolate`.
export default function Card({ children, className = "", href }: CardProps) {
  const classes = `${base} ${className}`;
  const glow = <span aria-hidden="true" className="spotlight" />;

  if (href) {
    return (
      <Link href={href} data-spotlight className={classes}>
        {glow}
        {children}
      </Link>
    );
  }
  return (
    <article data-spotlight className={classes}>
      {glow}
      {children}
    </article>
  );
}
