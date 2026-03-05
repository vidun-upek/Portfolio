"use client";

import { techStack } from "@/data/projects";

const displayTitles: Record<string, string> = {
  Frontend: "User Interfaces",
  Backend: "Server & APIs",
  "Machine Learning": "Intelligent Systems",
  Database: "Data Persistence",
  "DevOps & Cloud": "Infrastructure",
  "Software Architecture": "Engineering Principles",
};

const categoryIcons: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  "Machine Learning": "🧠",
  Database: "💾",
  "DevOps & Cloud": "☁️",
  "Software Architecture": "🏗️",
};

const categoryColors: Record<string, string> = {
  front: "#FF6B6B",
  back: "#4ECDC4",
  ml: "#FFE66D",
  database: "#95E1D3",
  devops: "#A8E6CF",
  core: "#FF8B94",
};

function cleanSkill(skill: string): string {
  return skill.replace(/\(.*\)/, "").trim();
}

export default function TechStackPage() {
  const totalSkills = techStack.reduce((sum, cat) => sum + cat.skills.length, 0);

  return (
    <section id="techstack" className="min-h-screen py-24 px-6 md:px-16 xl:px-32 bg-gradient-to-b from-transparent via-transparent to-transparent">
      <div className="max-w-screen-2xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <div className="flex flex-col gap-4 mb-8">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.5em]"
              style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Expertise
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              Tech Stack
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:justify-between">
            <p
              className="max-w-xl text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              A comprehensive collection of technologies, frameworks, and tools I've mastered across full-stack development, cloud infrastructure, and AI engineering.
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-black" style={{ color: "var(--accent)" }}>
                  {techStack.length}
                </div>
                <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-dim)" }}>Categories</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black" style={{ color: "var(--accent)" }}>
                  {totalSkills}+
                </div>
                <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-dim)" }}>Technologies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, idx) => (
            <div key={tech.id} className="tech-card-enhanced group" style={{ "--card-delay": `${idx * 0.1}s` } as any}>
              {/* Animated gradient background */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${categoryColors[tech.id]}40, transparent 70%)`,
                }}
              />
              
              {/* Card content */}
              <div className="relative p-8 h-full flex flex-col bg-gradient-to-br from-transparent to-transparent border border-transparent group-hover:border-transparent rounded-lg transition-all duration-500">
                
                {/* Top section with icon and number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{categoryIcons[tech.title]}</div>
                  <div
                    className="text-xs font-bold px-3 py-1 rounded-full transition-all duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: `${categoryColors[tech.id]}20`,
                      color: categoryColors[tech.id],
                      border: `1px solid ${categoryColors[tech.id]}40`,
                    }}
                  >
                    {tech.skills.length}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black mb-2 transition-all duration-500 group-hover:translate-x-1" style={{ color: "var(--text)" }}>
                  {displayTitles[tech.title] ?? tech.title}
                </h3>

                {/* Category label */}
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: categoryColors[tech.id] }}>
                  {tech.title}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-6 flex-grow transition-all duration-500"
                  style={{ color: "var(--text-muted)" }}
                >
                  {tech.desc}
                </p>

                {/* Skills container */}
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--text-dim)" }}>
                    Key Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.slice(0, 6).map((skill, i) => (
                      <span
                        key={skill}
                        className="tech-skill-tag transition-all duration-300"
                        style={{
                          borderColor: categoryColors[tech.id],
                          "--skill-color": categoryColors[tech.id],
                          "--skill-index": i,
                        } as any}
                      >
                        {cleanSkill(skill)}
                      </span>
                    ))}
                    {tech.skills.length > 6 && (
                      <span
                        className="tech-skill-tag text-xs px-3"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--text-dim)",
                        }}
                      >
                        +{tech.skills.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Border gradient effect */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${categoryColors[tech.id]}40, transparent 70%)`,
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .tech-card-enhanced {
          position: relative;
          border-radius: 8px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
          animation: slideInUp 0.6s ease-out forwards;
          animation-delay: var(--card-delay);
          opacity: 0;
        }

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

        .tech-card-enhanced:hover {
          border-color: var(--border);
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .tech-card-enhanced:hover .tech-skill-tag {
          border-color: var(--skill-color);
          color: var(--skill-color);
          background: var(--skill-color, #FF6B6B)20;
          transform: translateY(-2px);
        }

        .tech-skill-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          padding: 6px 12px;
          border-radius: 20px;
          border: 1.5px solid var(--border);
          background: transparent;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          cursor: default;
        }

        .tech-skill-tag:hover {
          background: var(--skill-color, #FF6B6B)25 !important;
          box-shadow: 0 0 12px var(--skill-color, #FF6B6B)40;
        }
      `}</style>
    </section>
  );
}