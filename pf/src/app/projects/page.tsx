import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="snap-container">
      {/* Page 1: About */}
      <section id="about">
        <HeroSection />
      </section>

      {/* Page 2: Education & Certifications (Horizontal) */}
      <EducationSection />

      {/* Page 3: Tech Stack / Skills (Horizontal) */}
      <SkillsSection />

      {/* Page 4: Projects (Horizontal) */}
      <ProjectsSection />

      {/* Page 5: Contact (Final Vertical Section) */}
      <section id="contact" className="snap-section">
        <ContactSection />
      </section>
    </main>
  );
}