import { Stagger, StaggerItem } from "@/components/motion/Reveal";
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

      <Stagger as="ol" stagger={0.12} className="relative space-y-5 before:absolute before:bottom-6 before:left-[5px] before:top-6 before:w-px before:bg-gradient-to-b before:from-accent before:via-line-strong before:to-transparent">
        {education.map((edu) => (
          <StaggerItem as="li" key={edu.id} className="relative pl-8 sm:pl-10">
            <span aria-hidden="true" className="absolute left-0 top-7 size-[11px] rounded-full border-2 border-accent bg-bg" />
            <article className="grid gap-6 rounded-lg border border-line bg-surface/70 p-6 backdrop-blur transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-elev-2 md:grid-cols-12 md:p-8">
              <div className="md:col-span-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                  <time>{edu.year}</time>
                </p>
                <h3 className="heading-display mt-3 text-2xl md:text-3xl">{edu.title}</h3>
                <p className="mt-2 text-sm font-semibold text-accent-fg">{edu.subtitle}</p>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm leading-relaxed text-muted md:text-base">{edu.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Subjects">
                  {edu.skills.map((skill) => (
                    <li key={skill}>
                      <Chip>{skill}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
