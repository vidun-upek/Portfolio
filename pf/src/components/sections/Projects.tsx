import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Spotlight from "@/components/motion/Spotlight";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { iconMap } from "@/components/ui/Icons";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { stripProjects } from "@/data/projects";

const VISIBLE_TECH = 4;

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        id="projects-title"
        index="02"
        eyebrow="Hands on Experience"
        title="Projects"
        description="Scalable architecture, pixel perfect UI, and automated deployments."
      />

      <Spotlight>
        <Stagger as="ul" className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {stripProjects.map((project) => {
            const Icon = iconMap[project.icon];
            const extra = project.tech.length - VISIBLE_TECH;
            return (
              <StaggerItem as="li" key={project.slug}>
                <Card className="h-full p-5 fit:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-9 place-items-center rounded-md border border-line bg-elevated text-accent-fg">
                      <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-subtle">{project.category}</span>
                  </div>
                  <h3 className="heading-display mt-3.5 text-2xl fit:text-xl">{project.title}</h3>
                  <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted fit:line-clamp-2">{project.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-3.5" aria-label={`${project.title} tech stack`}>
                    {project.tech.slice(0, VISIBLE_TECH).map((tech) => (
                      <li key={tech}>
                        <Chip>{tech}</Chip>
                      </li>
                    ))}
                    {extra > 0 && (
                      <li title={project.tech.slice(VISIBLE_TECH).join(", ")}>
                        <Chip tone="accent">+{extra}</Chip>
                      </li>
                    )}
                  </ul>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Spotlight>
    </Section>
  );
}
