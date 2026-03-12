// TYPES

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
  brief: string;
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
  image?: string;
};

export type Learning = {
  slug: string;
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

// PROJECTS DATA 

export const stripProjects: StripProject[] = [
  {
    slug: "crackcode",
    title: "CrackCode",
    image: "/strips/bg1.png",
    category: "Full Stack & ML",
    description: "Gamified Narrative Driven Educational Platform.",
    tech: ["React", "Node.js","Express", "MongoDB","Tailwind","Redis","Docker", "Kubernetes","CI/CD"],
    label: "01",
  },
  {
    slug: "HotelBooking",
    title: " Hotelify",
    image: "/strips/bg1.png",
    category: "Full Stack",
    description: "Seamless Experience for users to discover and book rooms, while offering a robust dashboard for hotel owners to manage their properties, track revenue, and handle room availability in real time.",
    tech: ["React", "Node.js","Express", "MongoDB", "Tailwind","stripe","clerk"],
    label: "02",
  },
  {
    slug: "Demensia",
    title: "Demensia Insight",
    image: "/strips/bg1.png",
    category: "AI / ML",
    description: "This project is a submission for the MODELX hackathon. The goal is to build a binary classification model that predicts a person's risk of dementia using only non medical variables.",
    tech: ["Python", "pandas", "numpy","matplotlib", "seaborn","Scikit-Learn","lightgbm","pickle","jupyter"],
    label: "03",
  },
  {
    slug: "devops-pipelines",
    title: "RentRide",
    image: "/strips/bg1.png",
    category: "Infrastructure , Full Stack ",
    description: "Car Rental Website Integrated with Automated CI/CD and IaC pipelines for production grade systems.",
    tech: ["React", "Node.js","Express", "MongoDB", "Tailwind","Docker", "Kubernetes","CI/CD"],
    label: "04",
  },
  {
    slug: "Divinotaste",
    title: "DivinoTaste",
    image: "/strips/bg1.png",
    category: "Full Stack , Freelance",
    description: "Building a Web Application for a Local Food service - Under Implementation",
    tech: ["React", "Node.js","Express", "MongoDB", "Tailwind"],
    label: "05",
  },
  {
    slug: "Medpredict",
    title: "Medpredict",
    image: "/strips/bg1.png",
    category: "AI / ML",
    description: "Build a predictive model to forecast the Cost of Medical Insurance using Random Forest Classification model",
    tech: ["Python", "pandas", "numpy","matplotlib", "seaborn","lightgbm","Scikit-Learn","jupyter"],
    label: "05",
  },
];

// TECH STACK DATA 

export const techStack: TechStack[] = [
  { id: "front", label: "01", title: "Frontend", desc: "Pixel perfect, highly animated user interfaces.", skills: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Figma","Photoshop"], brief: "Built responsive, accessible UI components with modern frameworks. Integrated GSAP for smooth animations and Tailwind for rapid styling. Implemented pixel perfect designs from Figma prototypes with interactive hover states." },
  { id: "back", label: "02", title: "Backend", desc: "Scalable, secure server side applications.", skills: ["Node.js", "Express","javascript", "Spring Boot","PHP","ASP.NET", "Postman"], brief: "Developed RESTful APIs using Node.js and Express. Implemented authentication, database optimization, session management and real time data handling. Tested endpoints with Postman and deployed on database platforms." },
  { id: "ml", label: "03", title: "Machine Learning", desc: "Intelligent models and deep neural networks.", skills: ["Numpy","pandas","Matplotlib","Seaborn","Plotly Express", "Pycarat", "Scikit Learn"], brief: "Developed predictive models using Regression and Classification techniques. Performed data preprocessing and feature engineering with Pandas and NumPy. Visualized model performance with Matplotlib and Seaborn for insights." },
  { id: "database", label: "04", title: "Database", desc: "Designing and managing relational and NoSQL databases.", skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"], brief: "Designed normalized schemas for PostgreSQL and document structures for MongoDB. Implemented caching strategies with Redis for performance optimization. Ensured data integrity and wrote complex queries for analytics." },
  { id: "devops", label: "05", title: "DevOps & Cloud", desc: "Zero-touch deployment pipelines and infrastructure.", skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions"], brief: "Containerized applications with Docker and orchestrated with Kubernetes. Automated deployments using GitHub Actions and CI/CD pipelines. Experience in managing AWS infrastructure and implemented monitoring solutions through Coursera Lab Exams." },
  { id: "core", label: "06", title: "Software Architecture", desc: "Engineering principles behind the code.", skills: ["System Design(UC Diagrams/Activity/Sequence/Class Diagrams)", "Agile Methodologies", "DB Design(ERD,EERD,Logical ERD)"], brief: "Applied SOLID principles and design patterns in production code. Created comprehensive system diagrams for scalability planning. Led Agile sprints and designed normalized database architectures for optimal performance." },
];

// EDUCATION DATA 

export const education: Education[] = [
  { id: "uni", label: "01", title: "University of Westminster", subtitle: "BEng (Hons) Computer Science — IIT Sri Lanka", year: "2024 — 2028", description: "Experience on Software Design and Architecture,Web design and Deployment,Database Design,Programming", skills: ["Java", "Python","Software/Database Architecture","Web Development", "Machine Learning & AI", "Client/Server develpment(Socket,Testing,DB,Node.js)" ] },
  { id: "al", label: "02", title: "Ananda College - Colombo", subtitle: "G.C.E. Advanced Level — Physical Science Stream", year: "2021 — 2023", description: "Strong academic foundation in Mathematics and Physics, paving the way for a computer science career.", skills: ["Mathematics", "Physics", "Chemistry"] },
  { id: "ol", label: "03", title: "Vidara College - Colombo", subtitle: "G.C.E. Ordinary Level", year: "2011 — 2021", description: "Completed O/L examinations with 9 A's across core academic subjects including ICT, Literature.", skills: ["English Literature", "Business Studies", "ICT"] },
];

// CERTIFICATIONS DATA

export const certifications: Certification[] = [
  { id: "course", label: "02", title: "University of Colombo - School of Computing", image: "/strips/colombo.jpeg", subtitle: "Java Foundation Course", desc: "Completed Java Course - fundamentals & OOP" },
  { id: "aws", label: "01", title: "AWS Cloud Essentials - Coursera", image: "/strips/aws.png", subtitle: "AWS Workflows", desc: "Learn about core AWS services including EC2, VPC, IAM, and S3 to architect secure, high-availability cloud infrastructure." },
  { id: "ibm", label: "02", title: "Introduction to Containers w/ Docker, Kubernetes & OpenShift - Coursera", image: "/strips/docker.png", subtitle: "Docker & Kubernetes", desc: "Container orchestration, building images, and cloud-native deployment strategies." },
  { id: "ibm2", label: "03", title: "Introduction to DevOps - Coursera", image: "/strips/DevopsIntro.png", subtitle: "DevOps", desc: "Learn about GitHub Workflows and Agile strategies." },
  { id: "deeplearning", label: "04", title: "Linear Algebra And ML for Data Science - Coursera", image: "/strips/MLmaths.png", subtitle: "Mathematics for ML", desc: "Linear algebra, matrices, graphs, differentiation & integration." },
  { id: "coursera-rest", label: "05", title: "REST API Backend Application Development - Coursera", image: "/strips/backend.png", subtitle: "Backend foundations", desc: "" },
];

// LEARNINGS DATA

export const learnings: Learning[] = [
  { slug: "react-typescript", label: "01", title: "React & TypeScript", description: "Building scalable, type safe React applications with advanced hook patterns.", tags: ["React", "TypeScript", "Hooks"] },
  { slug: "full-stack-dev", label: "02", title: "Full Stack Dev", description: "Mastering both frontend and backend to deliver complete end to end solutions.", tags: ["Node.js", "APIs", "Databases"] },
  { slug: "cloud-devops", label: "03", title: "Cloud & DevOps", description: "Deploying reliable, scalable applications using cloud native tools.", tags: ["AWS", "Docker", "CI/CD"] },
  { slug: "machine-learning", label: "04", title: "Machine Learning", description: "Deep dive into neural networks, model training, and practical AI engineering.", tags: ["PyTorch", "Pandas", "LLMs"] },
];

//  PROFILE DATA 

export const profileData: ProfileData = {
  name: "Vidun Shanuka",
  subheading: "Full Stack Developer & DevOps Enthusiast",
  status: "Available for Internships -DevOps / Full Stack / ML",
  quickFacts: [
    { icon: "📍", label: "Location", value: "Colombo, Sri Lanka" },
    { icon: "🎓", label: "Education", value: "CS Undergraduate @ IIT ·Ananda College ·Vidura College" },
    { icon: "💼", label: "Looking For", value: "DevOps / Full Stack / ML Internships" },
    { icon: "🚀", label: "Current Focus", value: "ML Integration into GitHub Workflows" },
  ],
};

//  NAVIGATION SECTIONS 

export const navSections = [
  { id: "hero", label: "Profile" },
  { id: "techstack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "learnings", label: "Learnings" },
  { id: "contact", label: "Contact" },
];