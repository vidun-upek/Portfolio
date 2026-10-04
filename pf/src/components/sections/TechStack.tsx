import { Reveal } from "@/components/motion/Reveal";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import TechStackTabs from "./TechStackTabs";

export default function TechStack() {
  return (
    <Section id="techstack">
      <SectionHeader
        id="techstack-title"
        index="01"
        eyebrow="Tools / Languages / Frameworks"
        title="Tech Stack"
        description="Comprehensive collection of technologies, frameworks, and tools I've mastered across full-stack development, cloud infrastructure, and AI engineering."
      />
      <Reveal>
        <TechStackTabs />
      </Reveal>
    </Section>
  );
}
