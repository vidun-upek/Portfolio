"use client";

import Link from "next/link";
import { use } from "react";
import { learningsContent } from "@/data/learnings-content";
import { learnings } from "@/data/projects";

interface LearningDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function LearningDetailPage({ params }: LearningDetailPageProps) {
  const { slug } = use(params);
  const learning = learningsContent[slug];
  const learningMeta = learnings.find(l => l.slug === slug);

  if (!learning) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4 uppercase">Learning Not Found</h1>
          <p className="text-white/60 mb-8">The learning content you're looking for doesn't exist.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-[#C03540] text-[#C03540] font-semibold uppercase text-xs tracking-widest hover:bg-[#C03540]/10 transition-all duration-300 rounded-lg">
            ← Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#C03540] text-xs font-bold uppercase tracking-[0.4em] block mb-6">Learning {learningMeta?.label} — {learning.readTime}</span>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-6 italic tracking-tighter">
            {learning.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 font-semibold leading-relaxed mb-8">
            {learning.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-white/50">
            <div>
              <span className="block text-white/30 text-xs uppercase tracking-wider mb-1">Category</span>
              <p className="font-semibold">{learning.category}</p>
            </div>
            <div>
              <span className="block text-white/30 text-xs uppercase tracking-wider mb-1">Reading Time</span>
              <p className="font-semibold">{learning.readTime}</p>
            </div>
            <div>
              <span className="block text-white/30 text-xs uppercase tracking-wider mb-1">Published</span>
              <p className="font-semibold">{learning.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 tracking-tight">Introduction</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <p className="text-lg text-white/80 leading-relaxed">
              {learning.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-12 tracking-tight">Key Learnings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {learning.keyPoints.map((point, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#C03540]/50 hover:bg-white/8 transition-all duration-300"
              >
                <h3 className="text-lg font-black text-[#C03540] mb-3 uppercase tracking-tight">
                  {point.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Tools Used */}
      <section className="py-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-12 tracking-tight">Tools & Technologies</h2>
          <div className="space-y-6">
            {learning.techTools.map((tool, idx) => (
              <div key={idx} className="border-l-4 border-[#C03540] pl-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-white/70">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-12 tracking-tight">How I Used This in Projects</h2>
          <div className="space-y-8">
            {learning.projects.map((project, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-[#C03540]/50 transition-all duration-300">
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight flex items-start gap-3">
                  <span className="text-[#C03540] text-lg">→</span>
                  {project.name}
                </h3>
                <p className="text-white/70 leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map(tool => (
                    <span 
                      key={tool}
                      className="text-xs px-3 py-1 bg-[#C03540]/10 border border-[#C03540]/50 text-[#C03540] rounded-full font-semibold uppercase tracking-wide"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/50 mb-6 block">Skills & Tags</h3>
          <div className="flex flex-wrap gap-3">
            {learning.tags.map(tag => (
              <span 
                key={tag}
                className="text-sm px-4 py-2 border border-[#C03540] text-[#C03540] rounded-full font-semibold uppercase tracking-wide hover:bg-[#C03540]/10 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/60 mb-8 text-sm uppercase tracking-widest">Want to explore more?</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C03540] text-white font-black uppercase text-sm tracking-widest hover:bg-[#D44050] transition-all duration-300 rounded-lg"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}
