export type LearningDetail = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  intro: string;
  keyPoints: Array<{
    title: string;
    description: string;
  }>;
  techTools: Array<{
    name: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    tools: string[];
  }>;
  tags: string[];
};

export const learningsContent: Record<string, LearningDetail> = {
  "react-typescript": {
    slug: "react-typescript",
    title: "React & TypeScript",
    subtitle: "Building Scalable, Type-Safe React Applications",
    category: "Frontend Development",
    readTime: "2 min read",
    date: "March 2026",
    intro:
      "React has revolutionized frontend development with its component based architecture, while TypeScript adds powerful static typing to prevent runtime errors. Together, they enable developers to build scalable, maintainable applications with confidence. I've mastered advanced hook patterns, component composition, and performance optimization techniques.",
    keyPoints: [
      {
        title: "Component Composition",
        description:
          "Learned to build reusable, composable components with clear separation of concerns using TypeScript props interfaces.",
      },
      {
        title: "Advanced Hooks",
        description:
          "Learned to leverage useCallback, useMemo, useContext, and custom hooks for state management and performance optimization.",
      },
      {
        title: "Type Safety",
        description:
          "Learned to use TypeScript to catch errors at compile time with strict typing, generics, and discriminated unions.",
      },
      {
        title: "Performance Optimization",
        description:
          "Learned to implement React.memo, code splitting, lazy loading, and proper re render optimization strategies.",
      },
    ],
    techTools: [
      {
        name: "React 18+",
        description: "Modern React with hooks, concurrent rendering, and automatic batching for optimal performance.",
      },
      {
        name: "TypeScript",
        description: "Strict type checking with interfaces, generics, and utility types for maintainable code.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility first CSS framework for rapid styling and responsive design implementation.",
      },
      {
        name: "GSAP",
        description: "Professional animation library for smooth, performant animations and transitions.",
      },
      {
        name: "Next.js 15",
        description: "React framework with SSR, file based routing, API routes, and built in optimization.",
      },
    ],
    projects: [
      {
        name: "CrackCode - Gamified Learning Platform (Nov 2025 — Mar 2026)",
        description:
          "Educational web application built using the MERN stack. Served as Technical Lead — responsible for frontend, backend, ML integration, documentation (UML, system/class diagrams), and CI/CD. Integrated cloud based code editing with real time session management, mini-games, and an AI narration agent. Deployed with Docker & Kubernetes.",
        tools: ["React", "Node.js", "Express", "MongoDB","Redis", "Tailwind", "Docker", "Kubernetes","LLM","Ai Agent" ],
      },
      {
        name: "Portfolio Website",
        description:
          "Created responsive components using React hooks and TypeScript. Implemented smooth GSAP animations, theme switching with context, and interactive UI elements with proper type safety.",
        tools: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP"],
      },
      {
        name: "Hotelify - Hotel Booking Platform",
        description:
          "Developed reusable UI components for hotel listings, booking forms, and owner dashboards. Implemented secure auth, Stripe payments (with webhook verification), real time availability checks, and admin analytics. Built scalable REST APIs and full CRUD operations.",
        tools: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Clerk", "Tailwind"],
      },
    ],
    tags: ["React", "TypeScript", "Frontend", "Hooks", "Components"],
  },

  "full-stack-dev": {
    slug: "full-stack-dev",
    title: "Full Stack Development",
    subtitle: "End to End Web Application Development",
    category: "Web Development",
    readTime: "2 min read",
    date: "March 2026",
    intro:
      "Full stack development requires expertise across the entire application lifecycle  from responsive frontend interfaces to scalable backend APIs and efficient database design. I've built complete production ready applications handling authentication, real time data, complex business logic, and deployment pipelines.",
    keyPoints: [
      {
        title: "API Design & Development",
        description:
          "Learned to create RESTful APIs with proper authentication, authorization, error handling, and documentation.",
      },
      {
        title: "Database Architecture",
        description:
          "Learned to design normalized SQL schemas and document based NoSQL structures with proper indexing and optimization.",
      },
      {
        title: "Frontend Backend Integration",
        description:
          "Learned to achieve seamless integration between frontend and backend with proper state management and data flow.",
      },
      {
        title: "Real time Features",
        description:
          "Learned to implement WebSocket connections, live notifications, and real time data synchronization.",
      },
    ],
    techTools: [
      {
        name: "Node.js & Express",
        description: "Lightweight JavaScript runtime and minimal web framework for building scalable APIs.",
      },
      {
        name: "MongoDB",
        description: "Document database for flexible data modeling and rapid development iterations.",
      },
      {
        name: "PostgreSQL",
        description: "Relational database with ACID compliance for data integrity and complex queries.",
      },
      {
        name: "JWT Authentication",
        description: "Stateless authentication mechanism for secure API endpoints and user sessions.",
      },
      {
        name: "React Frontend",
        description: "Interactive UI layer for consuming backend APIs and providing seamless user experiences.",
      },
    ],
    projects: [
      {
        name: "CrackCode Platform (Sep 2025 — Mar 2026)",
        description:
          "Led the project as Technical Lead. Implemented end to end features across frontend, backend, and ML workflows. Designed system architecture and documentation; integrated CI/CD with Docker & Kubernetes and a cloud code editor for collaborative sessions.",
        tools: ["React", "Node.js", "Express", "MongoDB", "Redis","Docker", "Kubernetes","CI/CD"],
      },
      {
        name: "Hotelify - Hotel Booking Platform (Jan 2026 — Mar 2026)",
        description:
          "Scalable reservation platform with real time search and availability, secure auth and role management using Clerk, Stripe payment integration with webhook verification, and admin dashboards for hotel owners.",
        tools: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Clerk", "Redis"],
      },
      {
        name: "RentRide - Car Rental Website (Dec 2025 — Feb 2026)",
        description:
          "Responsive MERN application for car rentals. Implemented JWT auth, booking management, and database-backed reservation flows. Containerized with Docker and deployed on Kubernetes; CI/CD via GitHub Actions.",
        tools: ["React", "Node.js", "Express", "MongoDB", "Docker", "Kubernetes", "GitHub Actions","CI/CD"],
      },
      {
        name: "DivinoTaste - Food Service Platform",
        description:
          "Restaurant ordering system with menu management, order tracking, customer reviews, and admin analytics. Real time order updates for restaurant staff.",
        tools: ["React", "Express", "MongoDB", "WebSockets"],
      },
    ],
    tags: ["Full Stack", "Node.js", "React", "APIs", "Databases"],
  },

  "cloud-devops": {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    subtitle: "Automated Deployment & Infrastructure Management",
    category: "Infrastructure & Deployment",
    readTime: "2 min read",
    date: "March 2026",
    intro:
      "Modern applications require reliable, automated deployment pipelines and cloud infrastructure. I've containerized applications with Docker, orchestrated them with Kubernetes, and automated CI/CD pipelines. This ensures applications are scalable, reliable, and can handle production workloads.",
    keyPoints: [
      {
        title: "Containerization",
        description:
          "Learned to package applications in Docker containers for consistent deployment across development, staging, and production environments.",
      },
      {
        title: "Orchestration",
        description:
          "Learned to manage containerized applications at scale with Kubernetes for high availability and automatic scaling.",
      },
      {
        title: "CI/CD Pipelines",
        description:
          "Learned to automate testing, building, and deployment using GitHub Actions for rapid and reliable releases.",
      },
      {
        title: "Cloud Services",
        description:
          "Learned to leverage AWS services for computing, storage, and managed databases for scalable infrastructure.",
      },
    ],
    techTools: [
      {
        name: "Docker",
        description: "Learned Container runtime for packaging applications with dependencies for consistent deployment.",
      },
      {
        name: "Kubernetes",
        description: "Learned Container orchestration platform for managing containerized applications at scale.",
      },
      {
        name: "GitHub Actions",
        description: "Learned CI/CD platform integrated with GitHub for automated testing and deployment workflows.",
      },
      {
        name: "AWS",
        description: "Learned Cloud computing services including EC2, S3, and Lambda for scalable infrastructure through coursera.",
      },
      {
        name: "Docker Compose",
        description: "Learned multi-container orchestration tool for local development and simple deployments.",
      },
    ],
    projects: [
      {
        name: "RentRide - Containerized Deployment",
        description:
          "Containerized the RentRide application and deployed services on Kubernetes. Implemented GitHub Actions pipelines for build and deployment and ensured scaling and monitoring readiness.",
        tools: ["Docker", "Kubernetes", "GitHub Actions"],
      },
      {
        name: "DockLens-npm package for Docker Management",
        description:
          "hat analyses Docker files to identify built inefficiencies and security risks.",
        tools: ["Node.js", "Typescript", "CLI Development", "Docker", "Static Analysis", "CI/CD integration"],
      },
    ],
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD", "DevOps"],
  },

  "machine-learning": {
    slug: "machine-learning",
    title: "Machine Learning",
    subtitle: "Data Analysis & Model Development",
    category: "AI & Machine Learning",
    readTime: "2 min read",
    date: "March 2026",
    intro:
      "Machine learning enables computers to learn patterns from data and make intelligent predictions. I've built end to end ML pipelines including data preprocessing, feature engineering, model training, evaluation, and deployment. My work spans classification, regression, and deep learning tasks.",
    keyPoints: [
      {
        title: "Data Preprocessing",
        description:
          "Learned Cleaning, normalizing, and transforming raw data with handling of missing values, outliers, and feature scaling.",
      },
      {
        title: "Feature Engineering",
        description:
          "Learned Creating meaningful features from raw data using domain knowledge and statistical techniques.",
      },
      {
        title: "Model Training & Tuning",
        description:
          "Learned Training machine learning models with hyperparameter optimization and cross-validation for robust performance.",
      },
      {
        title: "Model Evaluation",
        description:
          "Learned Comprehensive evaluation using appropriate metrics like precision, recall, F1 score, and confusion matrices.",
      },
    ],
    techTools: [
      {
        name: "Python",
        description: "Primary language for ML development with extensive library ecosystem.",
      },
      {
        name: "Pandas",
        description: "Data manipulation library for loading, cleaning, and transforming datasets.",
      },
      {
        name: "NumPy",
        description: "Numerical computing library for array operations and mathematical functions.",
      },
      {
        name: "Scikit-Learn",
        description: "Machine learning library with algorithms for classification, regression, and clustering.",
      },
      {
        name: "PyCaret",
        description: "Low-code machine learning library that simplifies model training, comparison, and deployment workflows."
      },
      {
        name: "Matplotlib",
        description: "Data visualization library used to create static, animated, and interactive charts and graphs."
      }
    ],
    projects: [
      {
        name: "DementiaInsight - Non-Medical Dementia Risk Classifier (Dec 2025)",
        description:
          "Developed an automated ML pipeline to predict dementia risk using non medical features. Implemented data processing, model training and evaluation, and a CLI prediction tool. Achieved strong performance with LightGBM and was a finalist at the ModelX Inter University Hackathon.",
        tools: ["Python", "Pandas", "LightGBM", "Scikit Learn", "Jupyter","Classification"],
      },
      {
        name: "MedPredict - Medical Cost Prediction Model (Nov 2025)",
        description:
          "Developed a Random Forest regressor to predict medical insurance costs using lifestyle and demographic indicators. Deployed via Streamlit to provide a lightweight interactive web interface.",
        tools: ["Python", "Scikit Learn", "RandomForest", "Streamlit","Classification"],
      },
    ],
    tags: ["Scikit Learn", "Python", "Data Science", "AI", "Data Visualization"],
  },
};
