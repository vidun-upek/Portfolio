"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main>
      {/* Page 1: Hero */}
      <section id="about">
        <HeroSection />
      </section>

      {/* Page 2: Education — GSAP pins this internally */}
      <section id="education" className="py-12 md:py-24">
        <EducationSection />
      </section>

      {/* Page 3: Skills — GSAP pins this internally */}
      <section id="techstack" className="py-12 md:py-24">
        <SkillsSection />
      </section>

      {/* Page 4: Projects — GSAP pins this internally */}
      <section id="projects" className="py-12 md:py-24">
        <ProjectsSection />
      </section>

      {/* Page 5: Contact */}
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}