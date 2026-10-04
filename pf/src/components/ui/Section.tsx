type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

// On laptop/desktop each section fills exactly one viewport; on mobile it flows naturally.
export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`py-section fit:flex fit:min-h-svh fit:scroll-mt-0 fit:flex-col fit:justify-center fit:pb-10 fit:pt-24 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
