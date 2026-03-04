"use client";
import { useLayoutEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps a GSAP ScrollTrigger animation in useLayoutEffect so that cleanup
 * runs SYNCHRONOUSLY before React's deletion commit — preventing the
 * "removeChild: node is not a child" crash caused by GSAP's pin-spacer
 * DOM mutations.
 *
 * @param setup    Function that sets up the GSAP context. Receives refs.
 * @param deps     Dependency array (usually [])
 * @param containerRef  The container ref for gsap.context scope
 */
export function useGsapScrollTrigger(
  containerRef: RefObject<HTMLElement | null>,
  setup: (container: HTMLElement) => gsap.Context,
  deps: React.DependencyList = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    ctxRef.current = setup(container);

    return () => {
      // 1. Kill every ScrollTrigger that exists (un-pins elements, removes pin-spacers)
      ScrollTrigger.getAll().forEach((t) => t.kill(true));

      // 2. Manually pull children out of any remaining .pin-spacer wrappers and
      //    restore them so React can safely removeChild them.
      container.querySelectorAll(".pin-spacer").forEach((spacer) => {
        const parent = spacer.parentElement;
        if (!parent) return;
        // Move all children of the pin-spacer back into the original parent
        while (spacer.firstChild) {
          parent.insertBefore(spacer.firstChild, spacer);
        }
        parent.removeChild(spacer);
      });

      // 3. Also catch any pin-spacers that GSAP hoisted to document.body
      document.querySelectorAll(".pin-spacer").forEach((spacer) => {
        const parent = spacer.parentElement;
        if (!parent) return;
        while (spacer.firstChild) {
          parent.insertBefore(spacer.firstChild, spacer);
        }
        parent.removeChild(spacer);
      });

      // 4. Revert the GSAP context (clears inline styles, animations)
      try {
        ctxRef.current?.revert();
      } catch (_) {
        // Silently ignore — node may already be removed
      }
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
