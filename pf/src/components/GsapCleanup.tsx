"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aggressiveCleanup = () => {
  try {
    // Disable ScrollTrigger's autoRefresh to prevent DOM access during cleanup
    ScrollTrigger.config({ autoRefresh: false });

    // Get all triggers before killing them
    const triggers = ScrollTrigger.getAll();
    console.log(`[GSAP Cleanup] Killing ${triggers.length} triggers`);

    // Kill all ScrollTriggers 
    triggers.forEach((trigger) => {
      try {
        trigger.disable();
        trigger.kill(true);
      } catch (e) {
        // Silently ignore errors during cleanup
      }
    });

    // Kill all animations
    gsap.killTweensOf("*", { onComplete: false });

    // Permanently remove pin-spacers from DOM
    let pinSpacersRemoved = 0;
    document.querySelectorAll(".pin-spacer").forEach((el) => {
      try {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
          pinSpacersRemoved++;
        }
      } catch (e) {
        // Element might already be removed
      }
    });
    if (pinSpacersRemoved > 0) {
      console.log(`[GSAP Cleanup] Removed ${pinSpacersRemoved} pin-spacers`);
    }

    // Remove any GSAP-created markers
    document.querySelectorAll(".gsap-marker").forEach((el) => {
      try {
        if (el.parentNode) el.parentNode.removeChild(el);
      } catch (e) {
        // Ignore
      }
    });

    // Clear GSAP context cache
    gsap.cache.clear();

    // Re-enable ScrollTrigger 
    ScrollTrigger.config({ autoRefresh: true });

    console.log("[GSAP Cleanup] Complete");
  } catch (e) {
    console.error("[GSAP Cleanup] Error:", e);
  }
};

export default function GsapCleanup() {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  useLayoutEffect(() => {
    // Cleanup BEFORE page unmounts
    if (prevPathRef.current !== pathname) {
      aggressiveCleanup();
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  // Also cleanup on component unmount
  useLayoutEffect(() => {
    return () => {
      aggressiveCleanup();
    };
  }, []);

  return null;
}
