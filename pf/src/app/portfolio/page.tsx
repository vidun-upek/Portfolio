"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, containerRef);
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill(true));
      document.querySelectorAll(".pin-spacer").forEach(spacer => {
        const parent = spacer.parentElement;
        if (!parent) return;
        while (spacer.firstChild) parent.insertBefore(spacer.firstChild, spacer);
        parent.removeChild(spacer);
      });
      try { ctx.revert(); } catch (_) {}
    };
  }, []);

  const portfolioDetails = [
    {
      section: "Architecture",
      description: "Built with Next.js 16 for optimal performance, TypeScript for type safety, and Tailwind CSS for responsive design.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
    },
    {
      section: "Performance",
      description: "Smooth horizontal scrolling with GSAP animations, optimized images with Next.js Image component, and smooth scroll behavior.",
      technologies: ["GSAP", "Image Optimization", "Smooth Scroll"]
    },
    {
      section: "Design System",
      description: "Red (#C03540) and white color scheme with careful typography hierarchy and consistent spacing for a professional look.",
      technologies: ["Design System", "Typography", "Color Theory"]
    },
    {
      section: "Deployment",
      description: "Deployed on modern hosting platforms with CI/CD pipelines for automated deployments and continuous improvements.",
      technologies: ["CI/CD", "Deployment", "Automation"]
    }
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-black pt-32 pb-16">
      <div className="px-8 md:px-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.4em] block mb-4">Module 06</span>
          <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8">
            How I Built<br />This Portfolio
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">
            A deep dive into the architecture, design decisions, and technologies that make this portfolio work. From concept to deployment, every detail is intentional.
          </p>
        </div>

        {/* Portfolio Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {portfolioDetails.map((detail, index) => (
            <div key={index} className="group">
              {/* Card */}
              <div className="relative p-8 md:p-12 rounded-2xl border border-white/10 hover:border-white/30 bg-black/50 backdrop-blur-sm transition-all duration-700 hover:bg-black/70">
                <div className="absolute top-0 left-0 w-1 h-12 bg-linear-to-b from-brand-red to-transparent rounded-r" />
                
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-brand-red transition-colors duration-500">
                  {detail.section}
                </h3>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed mb-6">
                  {detail.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {detail.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white/70 rounded hover:bg-brand-red/10 hover:text-brand-red transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-24 md:mt-32 pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <span className="text-brand-red text-xs font-bold uppercase tracking-[0.4em] block mb-3">Tech Stack</span>
              <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">Frontend</h4>
              <ul className="text-xs text-white/50 space-y-2">
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS 4</li>
                <li>• Next.js 16</li>
              </ul>
            </div>
            
            <div>
              <span className="text-brand-red text-xs font-bold uppercase tracking-[0.4em] block mb-3">Animations</span>
              <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">Motion</h4>
              <ul className="text-xs text-white/50 space-y-2">
                <li>• GSAP</li>
                <li>• CSS Transitions</li>
                <li>• Smooth Scroll</li>
                <li>• Hover Effects</li>
              </ul>
            </div>

            <div>
              <span className="text-brand-red text-xs font-bold uppercase tracking-[0.4em] block mb-3">Design</span>
              <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">System</h4>
              <ul className="text-xs text-white/50 space-y-2">
                <li>• Red & White Palette</li>
                <li>• Typography Hierarchy</li>
                <li>• Responsive Layout</li>
                <li>• Dark Theme</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 md:mt-32 pt-16 border-t border-white/10 text-center">
          <p className="text-brand-red text-xs font-black uppercase tracking-[0.2em] mb-4">
            Ready to see it in action?
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
            Build • Ship • Scale
          </h2>
          <p className="text-sm text-white/60 max-w-xl mx-auto">
            This portfolio represents my journey as a full-stack developer. Every card, animation, and detail was crafted with intention.
          </p>
        </div>
      </div>
    </main>
  );
}
