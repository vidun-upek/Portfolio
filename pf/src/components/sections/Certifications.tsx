import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Spotlight from "@/components/motion/Spotlight";
import Card from "@/components/ui/Card";
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

      <Spotlight>
        <Stagger as="ul" className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <StaggerItem as="li" key={cert.id}>
              <Card className="h-full flex-row items-start gap-4 p-4">
                <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-md border border-line bg-white sm:w-28">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    fill
                    placeholder="blur"
                    sizes="7rem"
                    className="object-cover object-top transition-[filter,opacity] duration-500 dark:opacity-85 pointer-fine:grayscale pointer-fine:group-hover:grayscale-0 dark:group-hover:opacity-100"
                  />
                </div>
                <div className="min-w-0">
                  <p className="eyebrow text-[0.6875rem] text-accent-fg">{cert.subtitle}</p>
                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">{cert.title}</h3>
                  {cert.desc && <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{cert.desc}</p>}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Spotlight>
    </Section>
  );
}
