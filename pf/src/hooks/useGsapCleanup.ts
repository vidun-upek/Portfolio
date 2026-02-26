import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cleanupGsap = () => {
  try {
    // Kill all ScrollTrigger instances and remove pin-spacers
    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill(true);
    });
    
    // Remove all pin-spacer elements that GSAP creates
    document.querySelectorAll(".pin-spacer, .gsap-marker").forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    // Kill all tweens
    gsap.killTweensOf("*");

    // Reset scroll properties
    gsap.set("body", { overflowY: "auto", overflowX: "auto" });
    gsap.set("main", { overflowY: "auto", overflowX: "auto" });

    // Force clear GSAP internal cache
    gsap.cache.clear();
  } catch (e) {
    console.warn("GSAP cleanup error (non-critical):", e);
  }
};

export const useGsapCleanup = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Clean up GSAP when route changes
    cleanupGsap();
  }, [pathname]);

  return { cleanup: cleanupGsap };
};
