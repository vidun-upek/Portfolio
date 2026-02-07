"use client";

import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  // This ensures that when sections are pinned, GSAP recalculates positions
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  return (
    <main className="snap-container">
      {/* Page 1: About - Explicitly marked as a snap-section */}
      <section id="about" className="snap-section">
        <HeroSection />
      </section>

      {/* Page 2: Education (Horizontal) - GSAP handles its own pinning */}
      <section id="education" className="snap-section">
        <EducationSection />
      </section>

      {/* Page 3: Tech Stack (Horizontal) */}
      <section id="techstack" className="snap-section">
        <SkillsSection />
      </section>

      {/* Page 4: Projects (Horizontal) */}
      <section id="projects" className="snap-section">
        <ProjectsSection />
      </section>

      {/* Page 5: Contact (Final) */}
      <section id="contact" className="snap-section">
        <ContactSection />
      </section>
    </main>
  );
}