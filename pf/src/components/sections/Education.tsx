import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Spotlight from "@/components/motion/Spotlight";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { education } from "@/data/projects";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeader
        id="education-title"
        index="03"
        eyebrow="Educational Qualifications"
        title="Education"
        description="The academic foundation of algorithms, architecture, and engineering principles."
      />

      <Spotlight>
        <Stagger
          as="ol"
          stagger={0.12}
          className="relative space-y-3 before:absolute before:bottom-6 before:left-[5px] before:top-6 before:w-px before:bg-gradient-to-b before:from-(--brand-2) before:via-line-strong before:to-transparent"
        >
          {education.map((edu) => (
            <StaggerItem as="li" key={edu.id} className="relative pl-7 sm:pl-9">
              <span aria-hidden="true" className="absolute left-0 top-6 size-[11px] rounded-full border-2 border-accent bg-bg" />
              <Card className="grid gap-4 p-5 md:grid-cols-12 md:gap-6 md:p-6">
                <div className="md:col-span-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                    <time>{edu.year}</time>
                  </p>
                  <h3 className="heading-display mt-2 text-xl md:text-2xl">{edu.title}</h3>
                  <p className="mt-1.5 text-sm font-semibold text-accent-fg">{edu.subtitle}</p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm leading-relaxed text-muted">{edu.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Subjects">
                    {edu.skills.map((skill) => (
                      <li key={skill}>
                        <Chip>{skill}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Spotlight>
    </Section>
  );
}
