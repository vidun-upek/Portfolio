"use client";

import Link from "next/link";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const itemClass =
    "text-[12px] font-semibold uppercase tracking-[0.25em] text-white/90 hover:text-[rgb(192,53,64)] transition-colors cursor-pointer";

  return (
    <div className="absolute right-32 top-8 z-50">
      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <button onClick={() => scrollTo("about")} className={itemClass}>
              About
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo("contact")} className={itemClass}>
              Contact ↓
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo("education")} className={itemClass}>
              Education ↓
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo("techstack")} className={itemClass}>
              Tech Stack ↓
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo("projects")} className={itemClass}>
              Projects ↓
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}