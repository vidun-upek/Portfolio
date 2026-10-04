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
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pb-16 pt-24 md:pt-28 fit:flex fit:min-h-svh fit:items-center fit:pb-8 fit:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 size-[44rem] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-1/3 hidden size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(250_204_21/0.22),transparent_65%)] light:block"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <p
            style={delay(0.05)}
            className={`${rise} inline-flex items-center gap-2.5 rounded-md border border-accent-fg/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent-fg light:text-[#9a3412]`}
          >
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent-fg motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-brand" />
            </span>
            {profileData.status}
          </p>
          <p style={delay(0.12)} className={`${rise} eyebrow mt-6 text-subtle fit:mt-[min(2rem,3.5vh)]`}>
            {profileData.subheading}
          </p>

          <HeroName lines={["Vidun", "Shanuka"]} accentLine={1} className="mt-4 text-[clamp(3.25rem,15vw,4.75rem)] leading-[0.88] tracking-[-0.035em] lg:text-display" delay={0.2} />

          <p style={delay(0.3)} className={`${rise} mt-6 max-w-xl text-lead text-muted fit:mt-[min(2rem,3.5vh)]`}>
            I <Accent>build</Accent>, <Accent>ship</Accent> &amp; <Accent>scale</Accent> software that{" "}
            <span className="font-semibold text-fg">solves real world problems</span>.
          </p>

          <ul style={delay(0.4)} className={`${rise} mt-8 grid gap-2.5 sm:grid-cols-2 fit:mt-[min(2.5rem,4vh)]`}>
            {profileData.quickFacts.map(({ icon, label, value }) => {
              const Icon = iconMap[icon];
              return (
                <li
                  key={label}
                  className="flex items-start gap-3 rounded-lg border border-line bg-surface/60 p-3.5 backdrop-blur"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent/10 text-accent-fg">
                    <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-subtle">{label}</p>
                    <p className="mt-1 text-sm leading-snug text-fg">{value}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div style={delay(0.5)} className={`${rise} mt-8 flex flex-col gap-3 sm:flex-row fit:mt-[min(2.5rem,4vh)]`}>
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

    </section>
  );
}
