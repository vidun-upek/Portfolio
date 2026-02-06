import { stripProjects } from "@/data/projects";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = stripProjects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <Link href="/" className="text-white/70 hover:text-white text-sm">
          ← Back
        </Link>

        <h1 className="mt-6 text-4xl font-semibold">{project.title}</h1>
        <p className="mt-3 text-white/70">
          Add your full project details here: overview, stack, features,
          screenshots, GitHub link, demo link.
        </p>

        <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-black">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-10 space-y-4 text-white/80">
          <p>
            <b>Problem:</b> (write here)
          </p>
          <p>
            <b>Solution:</b> (write here)
          </p>
          <p>
            <b>Tech stack:</b> (write here)
          </p>
          <p>
            <b>Highlights:</b> (write here)
          </p>
        </div>
      </div>
    </main>
  );
}
