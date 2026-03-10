"use client";

import React, { useState } from "react";
import Image from "next/image";
import { techStack as techData } from "@/data/projects";

function SectionHeader({ module, title, desc }: { module: string; title: string; desc: string }) {
  return (
    <div className="mb-16 md:mb-20">
      <span className="text-[#C03540] text-xs font-bold uppercase tracking-[0.4em] block mb-3">{module}</span>
      <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-5">{title}</h2>
      <p className="text-xs text-black/40 dark:text-white/40 uppercase tracking-widest max-w-md leading-relaxed">{desc}</p>
    </div>
  );
}

const TechStackSection = React.forwardRef<HTMLElement, {}>(function TechStackSection(_, ref) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categoryIcons: Record<string, string> = {
    Frontend: "🎨",
    Backend: "⚙️",
    "Machine Learning": "🧠",
    Database: "💾",
    "DevOps & Cloud": "☁️",
    "Software Architecture": "🏗️",
  };

  const displayTitles: Record<string, string> = {
    Frontend: "User Interfaces",
    Backend: "Server & APIs",
    "Machine Learning": "Intelligent Systems",
    Database: "Data Persistence",
    "DevOps & Cloud": "Infrastructure",
    "Software Architecture": "Engineering Principles",
  };

  return (
    <section ref={ref as any} id="techstack" className="py-24 lg:py-32 px-8 md:px-16 xl:px-32 border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader module="Module 01 — Tech Stack" title="Tech Stack" desc="Comprehensive collection of technologies, frameworks, and tools I've mastered across full-stack development, cloud infrastructure, and AI engineering." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techData.map((tech, idx) => (
            <div
              key={tech.id}
              className="tech-card relative h-80 rounded-xl border overflow-hidden transition-all duration-500"
              style={{
                borderColor: hoveredCard === tech.id ? "#C03540" : undefined,
                transform: hoveredCard === tech.id ? "translateY(-8px)" : "translateY(0)",
                boxShadow: hoveredCard === tech.id ? "0 20px 50px rgba(192, 53, 64, 0.15)" : "none",
                animation: `slideInUp 0.6s ease-out ${idx * 0.1}s backwards`,
              }}
              onMouseEnter={() => setHoveredCard(tech.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="splash-tech" style={{ animation: hoveredCard === tech.id ? "splashMove 850ms ease-out forwards" : "none" }} />

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: "linear-gradient(to right, #C03540, transparent)",
                  opacity: hoveredCard === tech.id ? 1 : 0,
                  transition: "opacity 0.5s",
                }}
              />

              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-3xl">{categoryIcons[tech.title]}</span>
                  </div>

                  <h3 className="text-xl font-black mb-1" style={{ color: "currentColor" }}>
                    {displayTitles[tech.title] || tech.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#C03540" }}>
                    {tech.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold mb-3 text-black/50 dark:text-white/50">
                    Key Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 rounded border text-black/60 dark:text-white/60"
                        style={{
                          borderColor: "rgba(192, 53, 64, 0.3)",
                          backgroundColor: "rgba(192, 53, 64, 0.05)",
                        }}
                      >
                        {skill.replace(/\(.*\)/, "").trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {hoveredCard === tech.id && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "58%",
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.88) 100%)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    animation: `slideUpBrief 0.5s ease-out forwards`,
                    zIndex: 20,
                  }}
                  className="dark:bg-gradient-to-t"
                >
                  <p className="text-xs leading-relaxed text-white/90" style={{ lineHeight: "1.6" }}>
                    {tech.brief}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpBrief {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .splash-tech {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 15;
          opacity: 0;
          transform: translateX(-120%) skewX(-18deg);
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 35%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 65%,
            transparent 100%
          );
        }

        .tech-card {
          border-color: rgba(0, 0, 0, 0.07);
          background: rgba(0, 0, 0, 0.02);
        }

        :global(.dark) .tech-card {
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.025);
        }
      `}</style>
    </section>
  );
});

export default TechStackSection;
