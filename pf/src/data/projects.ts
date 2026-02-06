export type StripProject = {
  slug: string;
  title: string;
  image: string;
  category?: string;
};

export const stripProjects: StripProject[] = [
  { slug: "meditrace", title: "MediTrace", image: "/strips/bg1.png", category: "Full Stack" },
  { slug: "crackcode", title: "CrackCode", image: "/strips/bg1.png", category: "EdTech" },
  { slug: "rag-fyp", title: "RAG FYP", image: "/strips/bg1.png", category: "AI / ML" },
  { slug: "devops-pipelines", title: "DevOps Pipelines", image: "/strips/bg1.png", category: "Infrastructure" },
  { slug: "portfolio-v1", title: "Portfolio V1", image: "/strips/bg1.png", category: "Frontend" },
];