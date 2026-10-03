import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { certifications } from "@/data/projects";

export default function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeader
        id="certifications-title"
        index="04"
        eyebrow="Certification Courses Completed"
        title="Certifications"
        description="Verified expertise from industry leaders in Cloud, AI, and Software Engineering."
      />

      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <StaggerItem as="li" key={cert.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface/70 backdrop-blur transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-elev-3">
              <div className="relative aspect-[16/11] overflow-hidden border-b border-line bg-white">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-[transform,filter,opacity] duration-700 ease-out-expo group-hover:scale-[1.03] dark:opacity-85 dark:group-hover:opacity-100 pointer-fine:grayscale pointer-fine:group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow text-accent-fg">{cert.subtitle}</p>
                <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight">{cert.title}</h3>
                {cert.desc && <p className="mt-3 text-sm leading-relaxed text-muted">{cert.desc}</p>}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
