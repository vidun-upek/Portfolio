import type { Metadata } from "next";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Hero from "@/components/sections/Hero";
import Learnings from "@/components/sections/Learnings";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import { education, profileData } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: profileData.subheading,
  email: `mailto:${siteConfig.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
  alumniOf: education.map((edu) => ({ "@type": "EducationalOrganization", name: edu.title })),
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <TechStack />
      <Projects />
      <Education />
      <Certifications />
      <Learnings />
      <Contact />
    </>
  );
}
