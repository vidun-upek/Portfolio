"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Icons swap via the html class, so the button renders identically on server and client.
  const toggle = () => {
    const root = document.documentElement;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 400);
    }
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="relative grid size-10 place-items-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <Sun size={18} strokeWidth={1.75} aria-hidden="true" className="absolute transition-transform duration-500 ease-out-expo rotate-90 scale-0 [.light_&]:rotate-0 [.light_&]:scale-100" />
      <Moon size={18} strokeWidth={1.75} aria-hidden="true" className="absolute transition-transform duration-500 ease-out-expo rotate-0 scale-100 [.light_&]:-rotate-90 [.light_&]:scale-0" />
    </button>
  );
}
