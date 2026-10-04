import { ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { learningsContent } from "@/data/learnings-content";
import type { Learning } from "@/data/projects";

type LearningCardProps = { learning: Learning; headingLevel?: "h2" | "h3" };

export default function LearningCard({ learning, headingLevel = "h3" }: LearningCardProps) {
  const Heading = headingLevel;
  const { category, readTime } = learningsContent[learning.slug];

  return (
    <Card href={`/learnings/${learning.slug}`} className="h-full p-5">
      <p className="eyebrow truncate text-[0.6875rem] text-accent-fg">{category}</p>
      <Heading className="heading-display mt-6 text-2xl">{learning.title}</Heading>
      <p className="mt-2 text-sm leading-relaxed text-muted">{learning.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
        {learning.tags.map((tag) => (
          <li key={tag}>
            <Chip>{tag}</Chip>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        <span className="flex items-center justify-between border-t border-line pt-4 text-sm font-semibold text-fg">
          Read more
          <span className="flex items-center gap-2 font-mono text-xs font-normal text-subtle">
            {readTime}
            <ArrowUpRight size={17} aria-hidden="true" className="text-accent-fg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>
    </Card>
  );
}
