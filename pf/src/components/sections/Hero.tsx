import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroName from "@/components/hero/HeroName";
import Portrait from "@/components/hero/Portrait";
import { buttonClass } from "@/components/ui/button";
import { iconMap } from "@/components/ui/Icons";
import { profileData } from "@/data/projects";

const rise = "animate-rise motion-reduce:animate-none";
const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

const Accent = ({ children }: { children: React.ReactNode }) => <span className="font-semibold text-accent-fg">{children}</span>;

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pb-20 pt-28 md:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 size-[44rem] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_62%)]"
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <p
            style={delay(0.05)}
            className={`${rise} inline-flex items-center gap-2.5 rounded-full border border-accent-fg/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent-fg`}
          >
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent-fg motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-accent-fg" />
            </span>
            {profileData.status}
          </p>
          <p style={delay(0.12)} className={`${rise} eyebrow mt-8 text-subtle`}>
            {profileData.subheading}
          </p>

          <HeroName lines={["Vidun", "Shanuka"]} className="mt-5 text-display" delay={0.2} />

          <p style={delay(0.3)} className={`${rise} mt-8 max-w-xl text-lead text-muted`}>
            I <Accent>build</Accent>, <Accent>ship</Accent> &amp; <Accent>scale</Accent> software that{" "}
            <span className="font-semibold text-fg">solves real world problems</span>.
          </p>

          <ul style={delay(0.4)} className={`${rise} mt-10 grid gap-3 sm:grid-cols-2`}>
            {profileData.quickFacts.map(({ icon, label, value }) => {
              const Icon = iconMap[icon];
              return (
                <li
                  key={label}
                  className="flex items-start gap-3 rounded-lg border border-line bg-surface/60 p-4 backdrop-blur transition-colors hover:border-line-strong"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent/10 text-accent-fg">
                    <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-subtle">{label}</p>
                    <p className="mt-1 text-sm leading-snug text-fg">{value}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div style={delay(0.5)} className={`${rise} mt-10 flex flex-col gap-3 sm:flex-row`}>
            <Link href="/#contact" className={buttonClass("primary")}>
              Get In Touch
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/about" className={buttonClass("secondary")}>
              More About Me
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Portrait />
        </div>
      </div>

      <Link
        href="/#techstack"
        aria-label="Scroll to tech stack"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors hover:text-fg lg:flex"
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.35em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2s_var(--ease-out-expo)_infinite] bg-accent-fg motion-reduce:animate-none" />
        </span>
      </Link>
    </section>
  );
}
