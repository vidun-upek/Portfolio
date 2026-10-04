import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import Chip from "@/components/ui/Chip";
import { ContactIcon } from "@/components/ui/Icons";
import { contactLinks, contactTags } from "@/data/site";

const isExternal = (href: string) => href.startsWith("http") || href.endsWith(".pdf");

export default function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-section fit:flex fit:min-h-svh fit:scroll-mt-0 fit:items-center fit:pb-10 fit:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[36rem] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)]"
      />
      <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow mb-4 flex items-center gap-3 text-accent-fg">
            <span>06</span>
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            <span>Contact</span>
          </p>
          <Heading id="contact-title" className="heading-display mb-6 text-h1">
            Let&apos;s Work
            <br />
            Together
          </Heading>
          <p className="mb-8 max-w-md text-lead text-muted">
            Open to DevOps, Full Stack, and ML internship opportunities. I bring a strong engineering mindset and the drive to ship quality products fast.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Areas of interest">
            {contactTags.map((tag) => (
              <li key={tag}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>
        </Reveal>

        <Stagger as="ul" className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8 lg:self-center">
          {contactLinks.map((link) => (
            <StaggerItem as="li" key={link.label}>
              <a
                href={link.href}
                {...(isExternal(link.href) && { target: "_blank", rel: "noopener noreferrer" })}
                className="group flex items-center gap-4 rounded-lg border border-line bg-surface/60 p-4 backdrop-blur transition-colors duration-300 hover:border-line-strong hover:bg-elevated sm:p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-md border border-line bg-elevated text-muted transition-colors group-hover:text-accent-fg">
                  <ContactIcon name={link.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-fg">{link.label}</span>
                  <span className="block truncate text-sm text-subtle">{link.sub}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-fg"
                />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
