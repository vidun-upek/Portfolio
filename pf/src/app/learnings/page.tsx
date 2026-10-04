import type { Metadata } from "next";
import HorizontalScroll from "@/components/motion/HorizontalScroll";
import { Reveal } from "@/components/motion/Reveal";
import Spotlight from "@/components/motion/Spotlight";
import Rise from "@/components/motion/Rise";
import LearningCard from "@/components/ui/LearningCard";
import { learnings } from "@/data/projects";

const description = "Key technologies and insights gained through hands-on experience.";

export const metadata: Metadata = {
  title: "Learnings",
  description,
  alternates: { canonical: "/learnings" },
};

export default function LearningsPage() {
  return (
    <div className="pb-section pt-28 hscroll:pb-0 hscroll:pt-0">
      <Spotlight>
      <HorizontalScroll
        label="Learnings"
        trackClassName="container-page grid gap-4 sm:grid-cols-2 hscroll:max-w-none hscroll:items-center hscroll:gap-6 hscroll:px-[8vw]"
      >
        <Rise className="mb-8 sm:col-span-2 hscroll:mb-0 hscroll:w-[36rem] hscroll:shrink-0 hscroll:pr-16">
          <p className="eyebrow mb-4 flex items-center gap-3 text-accent-fg">
            <span>05</span>
            <span aria-hidden="true" className="h-px w-8 bg-accent-fg/50" />
            <span>What I Learn Through Projects</span>
          </p>
          <h1 className="heading-display text-h1">Learnings</h1>
          <p className="mt-5 max-w-sm text-lead text-muted">{description}</p>
          <p aria-hidden="true" className="eyebrow mt-10 hidden text-subtle hscroll:block">
            Scroll to explore →
          </p>
        </Rise>
        {learnings.map((learning, i) => (
          <Reveal key={learning.slug} delay={i * 0.06} className="hscroll:w-[22rem] hscroll:shrink-0">
            <LearningCard learning={learning} headingLevel="h2" />
          </Reveal>
        ))}
      </HorizontalScroll>
      </Spotlight>
    </div>
  );
}
