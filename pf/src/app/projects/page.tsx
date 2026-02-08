import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { stripProjects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = stripProjects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const techList = project.tech || [];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 p-8 z-50">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-[12px] tracking-[0.2em] text-white/50 hover:text-brand-red transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          <span>Back to Gallery</span>
        </Link>
      </nav>

      <header className="relative w-screen h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-24 w-full">
          <span className="font-display text-[13px] tracking-[0.4em] text-brand-red block mb-4">
            {project.category}
          </span>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85]">
            {project.title}
          </h1>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 md:gap-24">
        <div className="space-y-8">
          <h2 className="font-display text-3xl uppercase tracking-widest text-white/90">
            Overview
          </h2>
          <p className="font-body text-lg text-white/50 leading-relaxed">
            This is a placeholder description for{" "}
            <strong className="text-white">{project.title}</strong>. In a real
            scenario, this area would detail the problem solved, the
            architectural decisions made, and the impact of the final solution.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="font-display text-[12px] tracking-[0.2em] text-brand-red mb-6 border-b border-white/10 pb-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {techList.map((tag) => (
                <span
                  key={tag}
                  className="font-body px-3 py-1 border border-white/10 text-[10px] uppercase tracking-wider text-white/50 hover:border-brand-red hover:text-brand-red transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-[12px] tracking-[0.2em] text-brand-red mb-6 border-b border-white/10 pb-2">
              Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-between group font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span>Live Demo</span>
                  <span className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-between group font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span>GitHub Repo</span>
                  <span className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 text-center">
        <Link
          href="/"
          className="inline-block font-display text-[12px] tracking-[0.2em] text-white/30 hover:text-brand-red transition-colors"
        >
          View All Projects
        </Link>
      </footer>
    </main>
  );
}