"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

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

  // All nav sections for homepage
  const homeNavItems = [
    { label: "About", type: "scroll" as const, id: "hero" },
    { label: "Stack", type: "scroll" as const, id: "techstack" },
    { label: "Projects", type: "scroll" as const, id: "projects" },
    { label: "Education", type: "scroll" as const, id: "education" },
    { label: "Certs", type: "scroll" as const, id: "certifications" },
    { label: "Learnings", type: "scroll" as const, id: "learnings" },
    { label: "Contact", type: "scroll" as const, id: "contact" },
  ];

  // Nav items for sub-pages
  const subPageNavItems = [
    { label: "About", type: "link" as const, href: "/" },
    { label: "Contact", type: "link" as const, href: "/contact" },
  ];

  const navItems = isHome ? homeNavItems : subPageNavItems;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "dark:bg-black/80 bg-white/80 backdrop-blur-md dark:border-b dark:border-white/10 border-b border-black/10"
          : ""
      }`}
    >
      <div className="h-16 flex items-center justify-center max-w-screen-2xl mx-auto w-full">
        {/* Centered nav links */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) =>
            item.type === "scroll" ? (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id!)}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 relative pb-2 group text-white"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(192,53,64)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href!}
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 relative pb-2 group text-white`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(192,53,64)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(192,53,64)]" />
                  )}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right CTA: Home link and CV - absolute positioned */}
        <div className="absolute right-8 md:right-16 xl:right-32 flex items-center gap-3">
          {!isHome && (
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 text-white">
              ← Home
            </Link>
          )}

          <Link href="/CW.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 border border-white/20 text-white transition-all duration-300 rounded relative group">
            CV
            <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[rgb(192,53,64)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </div>
      </div>
    </nav>
  );
}