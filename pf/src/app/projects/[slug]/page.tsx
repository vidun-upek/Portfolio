import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { stripProjects } from "@/data/projects";

// Type definition for Next.js App Router params
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  // Await params for compatibility with latest Next.js versions
  const resolvedParams = await params;
  const project = stripProjects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-red selection:text-white overflow-x-hidden">
      
      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 p-8 z-50">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-brand-red transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span>Back to Gallery</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative w-screen h-[70vh] md:h-[85vh] overflow-hidden">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Shine/Slash Animation Overlay */}
        <div className="absolute inset-0 sword-slash pointer-events-none opacity-30" />

        {/* Title Content */}
        <div className="absolute bottom-0 left-0 p-8 md:p-24 w-full">
          <div className="overflow-hidden mb-4">
             <span className="text-brand-red text-xs md:text-sm font-bold tracking-[0.4em] uppercase block animate-slide-up">
               {project.category || "Selected Work"}
             </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter text-3d drop-shadow-2xl">
            {project.title}
          </h1>
        </div>
      </header>

      {/* Project Details Section */}
      <section className="max-w-5xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 md:gap-24">
        
        {/* Left: Main Description */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-white/90">Overview</h2>
          <p className="text-xl text-white/60 leading-relaxed font-light">
            This is a placeholder description for <strong className="text-white">{project.title}</strong>. 
            In a real scenario, this area would detail the problem solved, the architectural decisions made, 
            and the impact of the final solution. The design focuses on readability and cinematic presentation.
          </p>
          
          <p className="text-xl text-white/60 leading-relaxed font-light">
            As a Full Stack & DevOps engineer, this project demonstrates capabilities in scalable system design
            and modern UI/UX principles.
          </p>
        </div>

        {/* Right: Metadata Sidebar */}
        <div className="space-y-12">
          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red mb-6 border-b border-white/10 pb-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* Mock Tags - You can add these to your data/projects.ts later */}
              {["React", "Next.js", "TypeScript", "Tailwind", "GSAP"].map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 border border-white/10 text-[10px] uppercase tracking-wider text-white/50 hover:border-brand-red hover:text-brand-red transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red mb-6 border-b border-white/10 pb-2">
              Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center justify-between group text-sm text-white/70 hover:text-white transition-colors">
                  <span>Live Demo</span>
                  <span className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between group text-sm text-white/70 hover:text-white transition-colors">
                  <span>GitHub Repo</span>
                  <span className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </section>

      {/* Footer Navigation */}
      <footer className="border-t border-white/10 py-12 text-center">
        <Link 
          href="/" 
          className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/30 hover:text-brand-red transition-colors"
        >
          View All Projects
        </Link>
      </footer>
    </main>
  );
}