import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import Rise from "@/components/motion/Rise";
import Chip from "@/components/ui/Chip";
import { learningsContent } from "@/data/learnings-content";
import { learnings } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return learnings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const learning = learningsContent[slug];
  if (!learning) return {};
  return {
    title: learning.title,
    description: learning.subtitle,
    alternates: { canonical: `/learnings/${slug}` },
    openGraph: { type: "article", title: learning.title, description: learning.subtitle },
  };
}

function ArticleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14 md:py-20">
      <Reveal>
        <h2 className="heading-display mb-10 text-h2">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

export default async function LearningDetailPage({ params }: Props) {
  const { slug } = await params;
  const learning = learningsContent[slug];
  const index = learnings.findIndex((l) => l.slug === slug);
  if (!learning || index === -1) notFound();

  const meta = learnings[index];
  const prev = learnings[index - 1];
  const next = learnings[index + 1];
  const facts = [
    { label: "Category", value: learning.category },
    { label: "Reading Time", value: learning.readTime },
    { label: "Published", value: learning.date },
  ];

  return (
    <article className="container-page max-w-4xl pb-section pt-28 md:pt-32">
      <header className="pb-14 md:pb-20">
        <Rise delay={0.05}>
          <Link href="/learnings" className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg">
            <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
            All learnings
          </Link>
        </Rise>
        <Rise delay={0.12}>
          <p className="eyebrow text-accent-fg">
            Learning {meta.label} — {learning.readTime}
          </p>
        </Rise>
        <Rise delay={0.19}>
          <h1 className="heading-display mt-5 text-h1">{learning.title}</h1>
        </Rise>
        <Rise delay={0.26}>
          <p className="mt-6 text-lead text-muted">{learning.subtitle}</p>
        </Rise>
        <Rise delay={0.33}>
          <dl className="mt-10 grid grid-cols-1 gap-4 rounded-lg border border-line bg-surface/70 p-5 backdrop-blur sm:grid-cols-3">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-subtle">{label}</dt>
                <dd className="mt-1.5 text-sm font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </Rise>
      </header>

      <ArticleSection title="Introduction">
        <Reveal>
          <p className="border-l-2 border-accent pl-6 text-lead text-fg/90">{learning.intro}</p>
        </Reveal>
      </ArticleSection>

      <ArticleSection title="Key Learnings">
        <Stagger as="ol" className="grid gap-4 md:grid-cols-2">
          {learning.keyPoints.map((point, i) => (
            <StaggerItem as="li" key={point.title} className="rounded-lg border border-line bg-surface/70 p-6 backdrop-blur transition-colors hover:border-accent-fg/40">
              <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-accent-fg">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </ArticleSection>

      <ArticleSection title="Tools & Technologies">
        <Stagger as="dl" className="divide-y divide-line rounded-lg border border-line bg-surface/70 backdrop-blur">
          {learning.techTools.map((tool) => (
            <StaggerItem key={tool.name} className="grid gap-1 p-5 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:p-6">
              <dt className="font-semibold">{tool.name}</dt>
              <dd className="text-sm leading-relaxed text-muted">{tool.description}</dd>
            </StaggerItem>
          ))}
        </Stagger>
      </ArticleSection>

      <ArticleSection title="How I Used This in Projects">
        <Stagger className="space-y-4">
          {learning.projects.map((project) => (
            <StaggerItem key={project.name} as="article" className="rounded-lg border border-line bg-surface/70 p-6 backdrop-blur transition-colors hover:border-line-strong md:p-8">
              <h3 className="text-xl font-bold tracking-tight">{project.name}</h3>
              <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools used">
                {project.tools.map((tool) => (
                  <li key={tool}>
                    <Chip tone="accent">{tool}</Chip>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </ArticleSection>

      <section className="border-t border-line py-14">
        <h2 className="eyebrow mb-6 text-subtle">Skills & Tags</h2>
        <ul className="flex flex-wrap gap-2">
          {learning.tags.map((tag) => (
            <li key={tag}>
              <Chip tone="accent">{tag}</Chip>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="More learnings" className="grid gap-4 border-t border-line pt-14 sm:grid-cols-2">
        {prev && (
          <Link href={`/learnings/${prev.slug}`} className="group rounded-lg border border-line p-6 transition-colors hover:border-accent-fg/40">
            <span className="flex items-center gap-2 text-sm text-subtle">
              <ArrowLeft size={14} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="heading-display mt-2 block text-xl group-hover:text-accent-fg">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link href={`/learnings/${next.slug}`} className="group rounded-lg border border-line p-6 text-right transition-colors hover:border-accent-fg/40 sm:col-start-2">
            <span className="flex items-center justify-end gap-2 text-sm text-subtle">
              Next
              <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="heading-display mt-2 block text-xl group-hover:text-accent-fg">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
