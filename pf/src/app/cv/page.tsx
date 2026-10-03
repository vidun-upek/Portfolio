import { Download, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Rise from "@/components/motion/Rise";
import { buttonClass } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "View or download the CV of Vidun Shanuka.",
  alternates: { canonical: "/cv" },
};

export default function CVPage() {
  return (
    <section className="container-page pb-section pt-28 md:pt-32">
      <Rise className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-4 text-accent-fg">Resume</p>
          <h1 className="heading-display text-h1">Curriculum Vitae</h1>
          <p className="mt-4 max-w-lg text-muted">If your browser supports PDFs it will display here. Otherwise you can download the file.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={siteConfig.cv} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
            <ExternalLink size={16} aria-hidden="true" />
            Open in new tab
          </a>
          <a href={siteConfig.cv} download className={buttonClass("primary")}>
            <Download size={16} aria-hidden="true" />
            Download PDF
          </a>
        </div>
      </Rise>
      <Rise delay={0.1} className="h-[80vh] overflow-hidden rounded-xl border border-line bg-surface shadow-elev-3">
        <iframe src={siteConfig.cv} title="Curriculum Vitae of Vidun Shanuka" className="size-full border-0" />
      </Rise>
    </section>
  );
}
