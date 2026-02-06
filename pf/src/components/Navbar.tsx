"use client";

import Link from "next/link";

export default function Navbar() {
  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const itemClass =
    "text-[12px] font-semibold uppercase tracking-[0.25em] text-white/90 hover:text-[rgb(192,53,64)] transition-colors";

  return (
    /* Increased right spacing from 20 to 32 to move navbar further left */
    <div className="absolute right-32 top-8 z-30">
      <nav>
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/about" className={itemClass}>
              About
            </Link>
          </li>

          <li>
            <Link href="/socials" className={itemClass}>
              Socials
            </Link>
          </li>

          <li>
            <Link href="/techstack" className={itemClass}>
              Tech Stack ↓
            </Link>
          </li>

          <li>
            <button onClick={scrollToProjects} className={itemClass}>
              Projects ↓
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}