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
      />
      <Reveal>
        <TechStackTabs />
      </Reveal>
    </Section>
  );
}
