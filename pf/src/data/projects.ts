export type StripProject = {
  slug: string;
  title: string;
  image: string;
  category?: string;
  description?: string;
  tech?: string[];
};

export const stripProjects: StripProject[] = [
  {
    slug: "meditrace",
    title: "MediTrace",
    image: "/strips/bg1.png",
    category: "Full Stack",
    description: "Healthcare data tracing and lineage platform.",
    tech: ["React", "Node.js", "Postgres"],
  },
  {
    slug: "crackcode",
    title: "CrackCode",
    image: "/strips/bg1.png",
    category: "EdTech",
    description: "Interactive coding challenges for learners.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    slug: "rag-fyp",
    title: "RAG FYP",
    image: "/strips/bg1.png",
    category: "AI / ML",
    description: "Retrieval-augmented generation research project.",
    tech: ["Python", "PyTorch", "LangChain"],
  },
  {
    slug: "devops-pipelines",
    title: "DevOps Pipelines",
    image: "/strips/bg1.png",
    category: "Infrastructure",
    description: "Automated CI/CD and IaC pipelines.",
    tech: ["Docker", "Kubernetes", "Terraform"],
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio V1",
    image: "/strips/bg1.png",
    category: "Frontend",
    description: "Initial portfolio showcasing projects and case studies.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
];