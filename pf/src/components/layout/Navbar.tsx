"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { easeOutExpo } from "@/components/motion/Reveal";
import { buttonClass } from "@/components/ui/button";
import { navLinks, siteConfig, type NavLink } from "@/data/site";
import ScrollProgress from "./ScrollProgress";
import ThemeToggle from "./ThemeToggle";

const observedIds = ["top", ...navLinks.flatMap((link) => (link.section ? [link.section] : []))];

const subscribeScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 24, () => false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    observedIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (link: NavLink) =>
    link.section ? isHome && activeSection === link.section : pathname.startsWith(link.href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative border-b transition-[background-color,border-color] duration-300 ${
          scrolled || open ? "border-line bg-bg/80 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/" className="heading-display text-2xl tracking-tight" onClick={() => setOpen(false)}>
            VS<span className="text-accent">.</span>
            <span className="sr-only"> {siteConfig.name}, home</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-out-expo ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={siteConfig.cv} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "hidden px-4 py-2 sm:inline-flex")}>
              CV
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-md border border-line text-fg lg:hidden"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
        <ScrollProgress />
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-6">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: easeOutExpo }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link) ? "page" : undefined}
                    className="heading-display flex items-baseline gap-4 border-b border-line py-4 text-3xl aria-[current=page]:text-accent-fg"
                  >
                    <span className="font-mono text-xs font-medium not-italic text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    {link.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="container-page pb-10">
              <a href={siteConfig.cv} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "w-full")}>
                View CV
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
