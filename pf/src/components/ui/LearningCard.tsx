import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Chip from "@/components/ui/Chip";
import type { Learning } from "@/data/projects";

type LearningCardProps = { learning: Learning; headingLevel?: "h2" | "h3" };

export default function LearningCard({ learning, headingLevel = "h3" }: LearningCardProps) {
  const Heading = headingLevel;

  return (
    <Link
      href={`/learnings/${learning.slug}`}
      className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-lg border border-line bg-surface/70 p-6 backdrop-blur transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent-fg/40 hover:shadow-elev-3"
    >
      <span
        aria-hidden="true"
        data-index={learning.label}
        className="heading-display pointer-events-none absolute -right-2 -top-6 text-[8rem] leading-none text-fg/[0.04] transition-transform duration-700 ease-out-expo group-hover:-translate-x-2 group-hover:translate-y-2 before:content-[attr(data-index)]"
      />
      <p className="eyebrow text-accent-fg">Learning {learning.label}</p>
      <Heading className="heading-display mt-auto pt-16 text-3xl transition-colors duration-300 group-hover:text-accent-fg">{learning.title}</Heading>
      <p className="mt-3 text-sm leading-relaxed text-muted">{learning.description}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
        {learning.tags.map((tag) => (
          <li key={tag}>
            <Chip>{tag}</Chip>
          </li>
        ))}
      </ul>
      <span className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm font-semibold text-fg">
        Read more
        <ArrowUpRight size={18} aria-hidden="true" className="text-accent-fg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
