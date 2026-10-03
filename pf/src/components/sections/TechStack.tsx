import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Chip from "@/components/ui/Chip";
import { iconMap } from "@/components/ui/Icons";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { techStack } from "@/data/projects";

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

      <Stagger as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {techStack.map((tech, i) => {
          const Icon = iconMap[tech.icon];
          return (
            <StaggerItem as="li" key={tech.id}>
              <article
                tabIndex={0}
                aria-labelledby={`tech-${tech.id}`}
                className="group relative flex h-full flex-col md:min-h-[20rem] overflow-hidden rounded-lg border border-line bg-surface/70 p-6 backdrop-blur transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent-fg/40 hover:shadow-elev-3 focus-visible:border-accent-fg/40"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-fg to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100" />

                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-md border border-line bg-elevated text-accent-fg transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-105">
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <h3 id={`tech-${tech.id}`} className="mt-6 text-xl font-extrabold tracking-tight">
                  {tech.heading}
                </h3>
                <p className="eyebrow mt-2 text-accent-fg">{tech.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{tech.desc}</p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Key technologies">
                  {tech.skills.map((skill) => (
                    <li key={skill}>
                      <Chip>{skill}</Chip>
                    </li>
                  ))}
                </ul>

                {/* Touch devices show the brief inline; fine pointers reveal it on hover or focus. */}
                <div className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted pointer-fine:absolute pointer-fine:inset-x-0 pointer-fine:bottom-0 pointer-fine:m-0 pointer-fine:translate-y-full pointer-fine:bg-elevated/95 pointer-fine:p-6 pointer-fine:text-fg pointer-fine:opacity-0 pointer-fine:backdrop-blur-md pointer-fine:transition-[transform,opacity] pointer-fine:duration-500 pointer-fine:ease-out-expo pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:translate-y-0 pointer-fine:group-focus-visible:opacity-100">
                  {tech.brief}
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
