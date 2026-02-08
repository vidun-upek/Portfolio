"use client";

const skillGroups = [
  {
    category: "Frontend",
    skills: ["TypeScript", "Next.js 15", "React", "Tailwind CSS", "GSAP", "Framer Motion"],
    icon: "{ }",
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST / GraphQL"],
    icon: "< />",
  },
  {
    category: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Git / GitHub"],
    icon: ">>_",
  },
  {
    category: "Soft Skills",
    skills: ["Strategic Thinking", "Agile Workflow", "System Design", "Rapid Prototyping"],
    icon: "◈",
  },
];

export default function SkillsSection() {
  return (
    <div className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-20">
      <div className="max-w-6xl w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillGroups.map((group, i) => (
          <div
            key={i}
            className="strip-card splash-container relative rounded-2xl border border-white/5 p-8 bg-[#050505]"
          >
            <div className="font-display text-2xl text-white/90 mb-4">{group.category}</div>
            <div className="space-y-2">
              {group.skills.map((skill) => (
                <div key={skill} className="font-body text-sm text-white/60">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}