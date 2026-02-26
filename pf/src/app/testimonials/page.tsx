"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);
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

  const testimonials = [
    {
      text: "Vidun demonstrates exceptional problem-solving skills and delivers scalable solutions with impressive attention to detail.",
      author: "Project Lead",
      role: "Tech Company",
      highlight: "Problem-Solving"
    },
    {
      text: "A dedicated developer who consistently goes above and beyond expectations. Great team player and fast learner.",
      author: "Senior Developer",
      role: "Startup",
      highlight: "Dedication"
    },
    {
      text: "Outstanding work on the CI/CD pipeline implementation. Reduced deployment time by 60% and improved reliability.",
      author: "DevOps Manager",
      role: "Enterprise Company",
      highlight: "DevOps"
    },
    {
      text: "Impressive full-stack capabilities. Code quality is excellent and architectural decisions show maturity.",
      author: "Technical Architect",
      role: "Tech Firm",
      highlight: "Tech Skills"
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: "📁" },
    { number: "3+", label: "Years Experience", icon: "⏱️" },
    { number: "100%", label: "Client Satisfied", icon: "😊" },
    { number: "15+", label: "Skills Mastered", icon: "🎯" },
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-black pt-32 pb-16">
      <div className="px-8 md:px-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.4em] block mb-4">Testimonials & Impact</span>
          <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8">
            What Others<br />Say About Me
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">
            Feedback from colleagues, clients, and team leads who've experienced my work firsthand.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="group p-6 md:p-8 rounded-xl border border-white/10 hover:border-brand-red bg-black/50 backdrop-blur-sm transition-all duration-500 hover:bg-black/70">
              <p className="text-3xl md:text-4xl mb-3">{stat.icon}</p>
              <p className="text-2xl md:text-3xl font-black text-brand-red mb-2">{stat.number}</p>
              <p className="text-xs md:text-sm text-white/60 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-6 md:space-y-8 mb-24">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card group p-8 md:p-12 rounded-2xl border border-white/10 hover:border-[rgb(192,53,64)] bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-sm transition-all duration-500 hover:bg-gradient-to-r hover:from-black/70 hover:to-black/50">
              {/* Quote mark */}
              <div className="text-5xl md:text-7xl text-brand-red/20 font-black mb-4">
                "
              </div>
              
              {/* Testimonial text */}
              <p className="text-lg md:text-xl font-light text-white mb-6 leading-relaxed">
                {testimonial.text}
              </p>

              {/* Highlight badge */}
              <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-brand-red/10 border border-brand-red/30 text-brand-red rounded mb-6">
                {testimonial.highlight}
              </div>

              {/* Author info */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-black uppercase tracking-tight text-white">{testimonial.author}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{testimonial.role}</p>
                </div>
                <div className="text-3xl group-hover:scale-125 transition-transform duration-300">⭐</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 border-t border-white/10">
          <p className="text-brand-red text-xs font-black uppercase tracking-[0.2em] mb-4">
            Ready to Collaborate?
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
            Let's Work Together
          </h2>
          <p className="text-sm text-white/60 max-w-xl mx-auto mb-8">
            Whether you need a front-end specialist, full-stack developer, or DevOps expert, I'm ready to bring your vision to life.
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-3 bg-brand-red text-black font-black uppercase tracking-[0.2em] rounded hover:bg-white transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
