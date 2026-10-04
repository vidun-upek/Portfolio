"use client";

import { m } from "motion/react";
import { useEffect } from "react";
import { easeOutExpo } from "@/components/motion/Reveal";

let hasNavigated = false;

// Animates page entry on client navigations only; the first load renders instantly for LCP.
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <m.div
      initial={hasNavigated ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      {children}
    </m.div>
  );
}
