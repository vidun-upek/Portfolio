import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { stripProjects } from "@/data/projects";

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

      <Stagger as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stripProjects.map((project, i) => (
          <StaggerItem as="li" key={project.slug}>
            <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface/70 backdrop-blur transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-elev-3">
              <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-105 pointer-fine:grayscale pointer-fine:group-hover:grayscale-0"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <span className="absolute left-5 top-5 font-mono text-xs text-white/80">{String(i + 1).padStart(2, "0")}</span>
                <span className="absolute right-5 top-5 rounded-sm bg-black/50 px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-white/90 backdrop-blur">
                  {project.category}
                </span>
                <h3 className="heading-display absolute inset-x-5 bottom-4 text-3xl text-white">{project.title}</h3>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm leading-relaxed text-muted">{project.description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label={`${project.title} tech stack`}>
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <Chip>{tech}</Chip>
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
