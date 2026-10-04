import { Reveal } from "@/components/motion/Reveal";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
};

export default function SectionHeader({ index, eyebrow, title, description, id }: SectionHeaderProps) {
  return (
    <Reveal className="mb-10 grid gap-5 md:grid-cols-12 md:items-end fit:mb-8">
      <div className="md:col-span-8">
        <p className="eyebrow mb-3 flex items-center gap-3 text-accent-fg">
          <span>{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-brand" />
          <span>{eyebrow}</span>
        </p>
        <h2 id={id} className="heading-display text-h1">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted md:col-span-4 md:justify-self-end">{description}</p>
      )}
    </Reveal>
  );
}
