import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { buttonClass } from "@/components/ui/button";
import LearningCard from "@/components/ui/LearningCard";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { learnings } from "@/data/projects";

export default function Learnings() {
  return (
    <Section id="learnings">
      <SectionHeader
        id="learnings-title"
        index="05"
        eyebrow="What I Learn Through Projects"
        title="Learnings"
        description="Key technologies and insights gained through hands-on experience."
      />

      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {learnings.map((learning) => (
          <StaggerItem as="li" key={learning.slug}>
            <LearningCard learning={learning} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10 flex justify-center">
        <Link href="/learnings" className={buttonClass("secondary")}>
          View all learnings
          <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
