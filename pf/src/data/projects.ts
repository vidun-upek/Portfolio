export type StripProject = {
  slug: string;
  title: string;
  image: string; // path in /public
};

export const stripProjects: StripProject[] = [
  { slug: "meditrace", title: "MediTrace", image: "/strips/bg1.png" },
  { slug: "crackcode", title: "CrackCode", image: "/strips/bg1.png" },
  { slug: "rag-fyp", title: "RAG FYP", image: "/strips/bg1.png" },
  { slug: "devops-pipelines", title: "DevOps Pipelines", image: "/strips/bg1.png" },
];
