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
    readTime: "8 min read",
    date: "March 2026",
    intro:
      "React has revolutionized frontend development with its component-based architecture, while TypeScript adds powerful static typing to prevent runtime errors. Together, they enable developers to build scalable, maintainable applications with confidence. I've mastered advanced hook patterns, component composition, and performance optimization techniques.",
    keyPoints: [
      {
        title: "Component Composition",
        description:
          "Building reusable, composable components with clear separation of concerns using TypeScript props interfaces.",
      },
      {
        title: "Advanced Hooks",
        description:
          "Leveraging useCallback, useMemo, useContext, and custom hooks for state management and performance optimization.",
      },
      {
        title: "Type Safety",
        description:
          "Using TypeScript to catch errors at compile time with strict typing, generics, and discriminated unions.",
      },
      {
        title: "Performance Optimization",
        description:
          "Implementing React.memo, code splitting, lazy loading, and proper re-render optimization strategies.",
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
        description: "Utility-first CSS framework for rapid styling and responsive design implementation.",
      },
      {
        name: "GSAP",
        description: "Professional animation library for smooth, performant animations and transitions.",
      },
      {
        name: "Next.js 15",
        description: "React framework with SSR, file-based routing, API routes, and built-in optimization.",
      },
    ],
    projects: [
      {
        name: "CrackCode - Gamified Learning Platform",
        description:
          "Built interactive React components with TypeScript for a gamified educational platform. Implemented complex state management for quiz flows, achievements, and user progress tracking.",
        tools: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      },
      {
        name: "This Portfolio Website",
        description:
          "Created responsive components using React hooks and TypeScript. Implemented smooth GSAP animations, theme switching with context, and interactive UI elements with proper type safety.",
        tools: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP"],
      },
      {
        name: "QuickStay - Hotel Booking Platform",
        description:
          "Developed reusable UI components for hotel listings, booking forms, and user dashboards. Used TypeScript interfaces for type-safe API integration.",
        tools: ["React", "TypeScript", "Tailwind CSS", "APIs"],
      },
    ],
    tags: ["React", "TypeScript", "Frontend", "Hooks", "Components"],
  },

  "full-stack-dev": {
    slug: "full-stack-dev",
    title: "Full Stack Development",
    subtitle: "End-to-End Web Application Development",
    category: "Web Development",
    readTime: "10 min read",
    date: "March 2026",
    intro:
      "Full-stack development requires expertise across the entire application lifecycle - from responsive frontend interfaces to scalable backend APIs and efficient database design. I've built complete production-ready applications handling authentication, real-time data, complex business logic, and deployment pipelines.",
    keyPoints: [
      {
        title: "API Design & Development",
        description:
          "Creating RESTful APIs with proper authentication, authorization, error handling, and documentation.",
      },
      {
        title: "Database Architecture",
        description:
          "Designing normalized SQL schemas and document-based NoSQL structures with proper indexing and optimization.",
      },
      {
        title: "Frontend-Backend Integration",
        description:
          "Seamless integration between frontend and backend with proper state management and data flow.",
      },
      {
        title: "Real-time Features",
        description:
          "Implementing WebSocket connections, live notifications, and real-time data synchronization.",
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
        name: "CrackCode Platform",
        description:
          "Complete learning platform with user authentication, quiz system, progress tracking, and real-time leaderboards. Built with React frontend and Node.js/Express backend.",
        tools: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      },
      {
        name: "QuickStay - Hotel Booking System",
        description:
          "Full-stack booking platform with hotel listings, user authentication, booking management, and admin dashboard. Integrated Stripe for payments and Redis for caching.",
        tools: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
      },
      {
        name: "DivinoTaste - Food Service Platform",
        description:
          "Restaurant ordering system with menu management, order tracking, customer reviews, and admin analytics. Real-time order updates for restaurant staff.",
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
    readTime: "9 min read",
    date: "March 2026",
    intro:
      "Modern applications require reliable, automated deployment pipelines and cloud infrastructure. I've containerized applications with Docker, orchestrated them with Kubernetes, and automated CI/CD pipelines. This ensures applications are scalable, reliable, and can handle production workloads.",
    keyPoints: [
      {
        title: "Containerization",
        description:
          "Packaging applications in Docker containers for consistent deployment across development, staging, and production environments.",
      },
      {
        title: "Orchestration",
        description:
          "Managing containerized applications at scale with Kubernetes for high availability and automatic scaling.",
      },
      {
        title: "CI/CD Pipelines",
        description:
          "Automating testing, building, and deployment using GitHub Actions for rapid and reliable releases.",
      },
      {
        title: "Cloud Services",
        description:
          "Leveraging AWS services for computing, storage, and managed databases for scalable infrastructure.",
      },
    ],
    techTools: [
      {
        name: "Docker",
        description: "Container runtime for packaging applications with dependencies for consistent deployment.",
      },
      {
        name: "Kubernetes",
        description: "Container orchestration platform for managing containerized applications at scale.",
      },
      {
        name: "GitHub Actions",
        description: "CI/CD platform integrated with GitHub for automated testing and deployment workflows.",
      },
      {
        name: "AWS",
        description: "Cloud computing services including EC2, S3, RDS, and Lambda for scalable infrastructure.",
      },
      {
        name: "Docker Compose",
        description: "Multi-container orchestration tool for local development and simple deployments.",
      },
    ],
    projects: [
      {
        name: "Volt Drive - CI/CD Pipeline",
        description:
          "Implemented automated CI/CD pipeline for car rental platform. Containerized application with Docker, deployed to Kubernetes cluster, and set up GitHub Actions for automated testing and deployment.",
        tools: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
      },
      {
        name: "E-Commerce Platform Deployment",
        description:
          "Containerized full-stack application, created deployment manifests for Kubernetes, and established GitOps workflow for automatic deployments on code changes.",
        tools: ["Docker", "Kubernetes", "GitOps", "AWS"],
      },
      {
        name: "Microservices Infrastructure",
        description:
          "Designed and implemented microservices infrastructure with Docker containers, orchestrated with Kubernetes, and monitored with logging and alerting systems.",
        tools: ["Docker", "Kubernetes", "Prometheus", "ELK Stack"],
      },
    ],
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD", "DevOps"],
  },

  "machine-learning": {
    slug: "machine-learning",
    title: "Machine Learning",
    subtitle: "Data Analysis & Model Development",
    category: "AI & Machine Learning",
    readTime: "11 min read",
    date: "March 2026",
    intro:
      "Machine learning enables computers to learn patterns from data and make intelligent predictions. I've built end-to-end ML pipelines including data preprocessing, feature engineering, model training, evaluation, and deployment. My work spans classification, regression, and deep learning tasks.",
    keyPoints: [
      {
        title: "Data Preprocessing",
        description:
          "Cleaning, normalizing, and transforming raw data with handling of missing values, outliers, and feature scaling.",
      },
      {
        title: "Feature Engineering",
        description:
          "Creating meaningful features from raw data using domain knowledge and statistical techniques.",
      },
      {
        title: "Model Training & Tuning",
        description:
          "Training machine learning models with hyperparameter optimization and cross-validation for robust performance.",
      },
      {
        title: "Model Evaluation",
        description:
          "Comprehensive evaluation using appropriate metrics like precision, recall, F1-score, and confusion matrices.",
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
        name: "PyTorch & TensorFlow",
        description: "Deep learning frameworks for building and training neural networks.",
      },
    ],
    projects: [
      {
        name: "Dementia Risk Prediction Model",
        description:
          "Binary classification model predicting dementia risk using non-medical variables. Achieved 85% accuracy using LightGBM. Finalist in MODE-LX hackathon.",
        tools: ["Python", "Pandas", "LightGBM", "Scikit-Learn", "Jupyter"],
      },
      {
        name: "Customer Churn Prediction",
        description:
          "Built predictive model to identify customers likely to churn. Used feature engineering, various algorithms, and ensemble methods. Improved retention strategy.",
        tools: ["Python", "Pandas", "Scikit-Learn", "XGBoost"],
      },
      {
        name: "Image Classification with Deep Learning",
        description:
          "Implemented CNN using PyTorch for image classification. Trained on custom dataset with data augmentation and achieved 92% validation accuracy.",
        tools: ["PyTorch", "Python", "NumPy", "Matplotlib"],
      },
    ],
    tags: ["PyTorch", "Python", "Data Science", "AI", "Neural Networks"],
  },
};
