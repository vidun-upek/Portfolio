import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="snap-container no-scrollbar bg-black text-white">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}