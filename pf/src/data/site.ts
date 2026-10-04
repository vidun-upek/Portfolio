const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteConfig = {
  name: "Vidun Shanuka",
  title: "Vidun Shanuka — Full Stack Developer & DevOps Enthusiast",
  description:
    "Portfolio of Vidun Shanuka, a Computer Science undergraduate in Colombo building, shipping and scaling full stack, DevOps and machine learning projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  cv: "/cv.vidun.shanuka.pdf",
  email: "vidun.shanukaofficial@gmail.com",
  github: "https://github.com/vidun-upek",
  linkedin: "https://www.linkedin.com/in/vidun-shanuka-17276a2b4/",
};

export type ContactLink = {
  label: string;
  href: string;
  sub: string;
  icon: "mail" | "github" | "linkedin" | "file";
};

export const contactLinks: ContactLink[] = [
  { label: "Email", href: `mailto:${siteConfig.email}`, sub: siteConfig.email, icon: "mail" },
  { label: "GitHub", href: siteConfig.github, sub: "github.com/vidun-upek", icon: "github" },
  { label: "LinkedIn", href: siteConfig.linkedin, sub: "linkedin.com/in/vidun-shanuka", icon: "linkedin" },
  { label: "CV / Resume", href: siteConfig.cv, sub: "View/Download PDF", icon: "file" },
];

export const contactTags = ["DevOps", "Full Stack", "ML / AI", "Open Source"];

export type NavLink = { label: string; href: string; section?: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Stack", href: "/#techstack", section: "techstack" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Education", href: "/#education", section: "education" },
  { label: "Certs", href: "/#certifications", section: "certifications" },
  { label: "Learnings", href: "/#learnings", section: "learnings" },
  { label: "Contact", href: "/#contact", section: "contact" },
];
