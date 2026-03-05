// ─── TYPES ────────────────────────────────────────────────────────

export type StripProject = {
  slug: string;
  title: string;
  image: string;
  category?: string;
  description?: string;
  tech?: string[];
  label?: string;
};

export type TechStack = {
  id: string;
  label: string;
  title: string;
  desc: string;
  skills: string[];
};

export type Education = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  skills: string[];
};

export type Certification = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  desc: string;
};

export type Learning = {
  label: string;
  title: string;
  description: string;
  tags: string[];
};

export type ProfileData = {
  name: string;
  subheading: string;
  status: string;
  quickFacts: Array<{ icon: string; label: string; value: string }>;
};

// ─── PROJECTS DATA ────────────────────────────────────────────────

export const stripProjects: StripProject[] = [
  {
    slug: "meditrace",
    title: "MediTrace",
    image: "/strips/bg1.png",
    category: "Full Stack",
    description: "Healthcare data tracing and lineage platform built for hospitals and clinics.",
    tech: ["React", "Node.js", "PostgreSQL"],
    label: "01",
  },
  {
    slug: "crackcode",
    title: "CrackCode",
    image: "/strips/bg1.png",
    category: "EdTech",
    description: "Interactive coding challenge platform for learners of all levels.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    label: "02",
  },
  {
    slug: "rag-fyp",
    title: "RAG FYP",
    image: "/strips/bg1.png",
    category: "AI / ML",
    description: "Retrieval-augmented generation research project using open-source LLMs.",
    tech: ["Python", "PyTorch", "LangChain"],
    label: "03",
  },
  {
    slug: "devops-pipelines",
    title: "DevOps Pipelines",
    image: "/strips/bg1.png",
    category: "Infrastructure",
    description: "Automated CI/CD and IaC pipelines for production-grade systems.",
    tech: ["Docker", "Kubernetes", "Terraform"],
    label: "04",
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio V1",
    image: "/strips/bg1.png",
    category: "Frontend",
    description: "My first personal portfolio showcasing projects, skills, and case studies.",
    tech: ["HTML", "CSS", "JavaScript"],
    label: "05",
  },
];

// ─── TECH STACK DATA ───────────────────────────────────────────────

export const techStack: TechStack[] = [
  { id: "front", label: "01", title: "Frontend", desc: "Pixel-perfect, highly animated user interfaces.", skills: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "GSAP"] },
  { id: "back", label: "02", title: "Backend", desc: "Scalable, secure server-side applications.", skills: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL"] },
  { id: "ml", label: "03", title: "Machine Learning", desc: "Intelligent models and deep neural networks.", skills: ["PyTorch", "TensorFlow", "Pandas", "Scikit-Learn", "Jupyter"] },
  { id: "devops", label: "04", title: "DevOps & Cloud", desc: "Zero-touch deployment pipelines and infrastructure.", skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions"] },
  { id: "core", label: "05", title: "Core Skills", desc: "Engineering principles behind the code.", skills: ["System Design", "Agile", "Data Structures", "OOP (Java)"] },
];

// ─── EDUCATION DATA ────────────────────────────────────────────────

export const education: Education[] = [
  { id: "uni", label: "01", title: "University of Westminster", subtitle: "BEng (Hons) Software Engineering — IIT Sri Lanka", year: "2024 — Present", description: "Second-year focus on Software Architecture, Advanced Data Structures, and Object-Oriented Programming with Java.", skills: ["Java", "System Architecture", "Algorithms", "OOP"] },
  { id: "al", label: "02", title: "Ananda College", subtitle: "G.C.E. Advanced Level — Physical Science Stream", year: "2021 — 2023", description: "Strong academic foundation in Mathematics and Physics, paving the way for a computer science career.", skills: ["Mathematics", "Physics", "Analytical Thinking"] },
  { id: "ol", label: "03", title: "Vidara College", subtitle: "G.C.E. Ordinary Level", year: "2011 — 2021", description: "Completed O/L examinations with strong results across core academic subjects including ICT and Mathematics.", skills: ["Mathematics", "Science", "ICT"] },
];

// ─── CERTIFICATIONS DATA ───────────────────────────────────────────

export const certifications: Certification[] = [
  { id: "ibm", label: "01", title: "IBM Cloud", subtitle: "Docker & Kubernetes Specialist", desc: "Container orchestration, building images, and cloud-native deployment strategies." },
  { id: "meta", label: "02", title: "Meta", subtitle: "Frontend Developer Professional", desc: "Advanced React patterns, UI/UX principles, and modern frontend architecture." },
  { id: "deeplearning", label: "03", title: "DeepLearning.AI", subtitle: "Neural Networks & Deep Learning", desc: "Model training, backpropagation theory, and practical AI engineering." },
  { id: "google", label: "04", title: "Google IT", subtitle: "Automation with Python", desc: "System administration and infrastructure automation using Python scripting." },
  { id: "aws", label: "05", title: "AWS Academy", subtitle: "Cloud Foundations", desc: "Infrastructure design, serverless architecture, and cloud security principles." },
];

// ─── LEARNINGS DATA ────────────────────────────────────────────────

export const learnings: Learning[] = [
  { label: "01", title: "React & TypeScript", description: "Building scalable, type-safe React applications with advanced hook patterns.", tags: ["React", "TypeScript", "Hooks"] },
  { label: "02", title: "Full Stack Dev", description: "Mastering both frontend and backend to deliver complete end-to-end solutions.", tags: ["Node.js", "APIs", "Databases"] },
  { label: "03", title: "Cloud & DevOps", description: "Deploying reliable, scalable applications using cloud-native tools.", tags: ["AWS", "Docker", "CI/CD"] },
  { label: "04", title: "Machine Learning", description: "Deep dive into neural networks, model training, and practical AI engineering.", tags: ["PyTorch", "Pandas", "LLMs"] },
];

// ─── PROFILE DATA ──────────────────────────────────────────────

export const profileData: ProfileData = {
  name: "Vidun Shanuka",
  subheading: "Full Stack Developer & DevOps Enthusiast",
  status: "Available for Internships — DevOps / Full Stack / ML",
  quickFacts: [
    { icon: "📍", label: "Location", value: "Colombo, Sri Lanka" },
    { icon: "🎓", label: "Education", value: "CS Undergraduate @ IIT\nAnanda College · Vidara College" },
    { icon: "💼", label: "Looking For", value: "DevOps / Full Stack / ML Internships" },
    { icon: "🚀", label: "Current Focus", value: "ML Integration into GitHub Workflows" },
  ],
};

// ─── NAVIGATION SECTIONS ───────────────────────────────────────────

export const navSections = [
  { id: "hero", label: "Profile" },
  { id: "techstack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "learnings", label: "Learnings" },
  { id: "contact", label: "Contact" },
];