import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open to DevOps, Full Stack, and ML internship opportunities. Get in touch with Vidun Shanuka.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-[85svh] items-center pt-16">
      <Contact headingLevel="h1" />
    </div>
  );
}
