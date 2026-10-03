import type { Metadata } from "next";
import Image from "next/image";
import codeBg from "@/assets/images/code-bg.jpg";
import HeroName from "@/components/hero/HeroName";
import HorizontalScroll from "@/components/motion/HorizontalScroll";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { achievements, story, vitals } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: "The story, leadership, achievements and vision behind Vidun Shanuka's Build, Ship, Scale philosophy.",
  alternates: { canonical: "/about" },
};

const corners = ["left-6 top-20 border-l border-t", "right-6 top-20 border-r border-t", "bottom-6 left-6 border-b border-l", "bottom-6 right-6 border-b border-r"];

function Panel({ children, className = "", label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <section
      aria-label={label}
      className={`relative flex flex-col justify-center overflow-hidden border-b border-line px-gutter py-section hscroll:h-screen hscroll:shrink-0 hscroll:border-b-0 hscroll:border-r hscroll:px-[5vw] hscroll:py-24 ${className}`}
    >
      {children}
    </section>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow mb-10 text-accent-fg">{children}</h2>;
}

export default function AboutPage() {
  return (
    <HorizontalScroll label="About Vidun Shanuka">
      <Panel label="Identity" className="min-h-[100svh] items-center text-center hscroll:w-[60vw]">
        {corners.map((position) => (
          <span key={position} aria-hidden="true" className={`absolute size-8 border-accent/60 ${position}`} />
        ))}
        <p className="eyebrow absolute left-10 top-24 text-accent-fg">Identity</p>
        <p
          aria-hidden="true"
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 whitespace-nowrap [writing-mode:vertical-rl] font-mono text-[0.625rem] uppercase tracking-[0.4em] text-subtle xl:block"
        >
          Software Engineer • DevOps • Full Stack
        </p>

        <HeroName lines={["Vidun", "Shanuka"]} className="text-[clamp(3.5rem,1rem+7.5vw,8.5rem)] leading-[0.85]" />

        <Reveal delay={0.9} className="mt-10 flex flex-col items-center gap-6">
          <span aria-hidden="true" className="h-0.5 w-16 bg-accent" />
          <p className="flex gap-3 font-mono text-xs uppercase tracking-[0.45em] text-muted">
            Build <span className="text-accent-fg">•</span> Ship <span className="text-accent-fg">•</span> Scale
          </p>
        </Reveal>

        <p aria-hidden="true" className="eyebrow absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-subtle hscroll:flex">
          <span className="h-px w-6 bg-line-strong" />
          Scroll to explore
          <span className="h-px w-6 bg-line-strong" />
        </p>
      </Panel>

      <Panel className="bg-surface/60 hscroll:w-[50vw]">
        <Reveal>
          <PanelLabel>The Story</PanelLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] font-light leading-snug text-fg/85">
            {story.lead} <strong className="font-extrabold text-fg">{story.university}</strong> {story.leadSuffix}
          </p>
        </Reveal>
        <Stagger className="mt-10 max-w-xl space-y-5" delay={0.2}>
          {story.paragraphs.map((paragraph) => (
            <StaggerItem key={paragraph}>
              <p className="leading-relaxed text-muted">{paragraph}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Panel>

      <Panel className="hscroll:w-[58vw]">
        <Reveal>
          <PanelLabel>Leadership, Teamwork & Achievements</PanelLabel>
        </Reveal>
        <Stagger className="grid max-w-3xl gap-8 hscroll:grid-cols-2 hscroll:gap-x-12" stagger={0.12}>
          {achievements.map((group) => (
            <StaggerItem key={group.title} className={group.items.length > 3 ? "hscroll:row-span-2" : ""}>
              <h3 className="text-lg font-bold">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Panel>

      <Panel className="bg-surface/60 hscroll:w-[38vw]">
        <Reveal>
          <PanelLabel>Info</PanelLabel>
        </Reveal>
        <Stagger as="dl" className="space-y-10" stagger={0.12}>
          {vitals.map(({ label, value, sub }) => (
            <StaggerItem key={label} className="border-l-2 border-accent pl-6">
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-subtle">{label}</dt>
              <dd className="mt-2 text-2xl font-extrabold uppercase tracking-tight">{value}</dd>
              {sub && <dd className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">{sub}</dd>}
            </StaggerItem>
          ))}
        </Stagger>
      </Panel>

      <Panel label="Vision" className="items-center text-center hscroll:w-[42vw] hscroll:border-r-0">
        <Image src={codeBg} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover opacity-10 grayscale dark:opacity-15" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow),transparent_65%)]" />
        <Reveal className="relative">
          <p className="eyebrow mb-6 text-accent-fg">Vision</p>
          <p className="heading-display text-[clamp(3.5rem,2rem+5vw,7rem)] leading-[0.9]">
            Build.
            <br />
            Ship.
            <br />
            <span className="text-accent-fg">Scale.</span>
          </p>
        </Reveal>
      </Panel>
    </HorizontalScroll>
  );
}
