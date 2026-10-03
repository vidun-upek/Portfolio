import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Rise from "@/components/motion/Rise";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-center justify-center pb-16 pt-32 text-center">
      <Rise>
        <p className="eyebrow text-accent-fg">Error 404</p>
        <h1 className="heading-display mt-6 text-[clamp(6rem,4rem+14vw,14rem)] leading-[0.8] tracking-tighter">
          4<span className="text-accent">0</span>4
        </h1>
        <p className="mx-auto mt-8 max-w-md text-lead text-muted">
          This page didn&apos;t ship. It may have moved, or the link might be broken.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonClass("primary")}>
            <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
            Back home
          </Link>
          <Link href="/learnings" className={buttonClass("secondary")}>
            Browse learnings
          </Link>
        </div>
      </Rise>
    </section>
  );
}
