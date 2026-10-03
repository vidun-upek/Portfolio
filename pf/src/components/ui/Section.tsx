type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-section ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
