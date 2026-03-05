"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section on homepage
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sectionIds = ["techstack", "projects", "education", "certifications", "learnings", "contact"];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Nav links shown on the homepage (sections)
  const sectionLinks = [
    { label: "Stack", id: "techstack" },
    { label: "Projects", id: "projects" },
    { label: "Education", id: "education" },
    { label: "Certs", id: "certifications" },
    { label: "Learnings", id: "learnings" },
    { label: "Contact", id: "contact" },
  ];

  // Nav links shown on sub-pages
  const pageLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "dark:bg-black/80 bg-white/80 backdrop-blur-md dark:border-b dark:border-white/10 border-b border-black/10"
          : ""
      }`}
    >
      <div className="px-8 md:px-16 xl:px-32 h-16 flex items-center justify-center max-w-screen-2xl mx-auto w-full">

        {/* Centre links */}
        <ul className="hidden md:flex items-center gap-10">
          {isHome
            ? sectionLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 relative pb-2 group dark:text-white/50 text-black/50 dark:hover:text-white hover:text-black"
                  >
                    {link.label}
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(192,53,64)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </li>
              ))
            : pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 relative pb-2 group ${
                      pathname === link.href
                        ? "dark:text-white text-black"
                        : "dark:text-white/50 text-black/50 dark:hover:text-white hover:text-black"
                    }`}
                  >
                    {link.label}
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(192,53,64)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    {/* Active page underline */}
                    {pathname === link.href && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(192,53,64)]" />
                    )}
                  </Link>
                </li>
              ))}
        </ul>

        {/* Right CTA: CV and Theme toggle - absolute positioned */}
        <div className="absolute right-8 md:right-16 xl:right-32 flex items-center gap-3">
          {!isHome && (
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.3em] dark:text-white/40 text-black/40 dark:hover:text-white hover:text-black transition-colors duration-300">
              ← Home
            </Link>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center border dark:border-white/20 border-black/20 rounded dark:text-white/60 text-black/60 hover:border-[rgb(192,53,64)] hover:text-[rgb(192,53,64)] transition-all duration-300"
          >
            {theme === "dark" ? (
              /* Sun — shown in dark mode, click to go light */
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon — shown in light mode, click to go dark */
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <Link
            href="/cv"
            className="text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 border dark:border-white/20 border-black/20 dark:text-white/60 text-black/60 hover:border-[rgb(192,53,64)] hover:text-[rgb(192,53,64)] transition-all duration-300 rounded"
          >
            CV
          </Link>
        </div>
      </div>
    </nav>
  );
}