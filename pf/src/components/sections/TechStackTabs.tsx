"use client";

import { AnimatePresence, m } from "motion/react";
import { useRef, useState } from "react";
import { easeOutExpo } from "@/components/motion/Reveal";
import Chip from "@/components/ui/Chip";
import { iconMap } from "@/components/ui/Icons";
import { techStack } from "@/data/projects";

export default function TechStackTabs() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const tech = techStack[active];
  const ActiveIcon = iconMap[tech.icon];

  // Roving focus per the WAI-ARIA tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + techStack.length) % techStack.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <div
        role="tablist"
        aria-label="Technology areas"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="no-scrollbar -mx-gutter flex gap-2 overflow-x-auto px-gutter lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0"
      >
        {techStack.map((item, i) => {
          const Icon = iconMap[item.icon];
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls="tech-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group relative flex shrink-0 items-center gap-3 rounded-md border px-3.5 py-2.5 text-left transition-colors duration-200 lg:px-4 lg:py-3 ${
                selected ? "border-line-strong bg-elevated text-fg" : "border-transparent text-muted hover:bg-elevated/60 hover:text-fg"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-2 left-0 hidden w-0.5 rounded-full bg-accent transition-opacity lg:block ${selected ? "opacity-100" : "opacity-0"}`}
              />
              <Icon size={18} strokeWidth={1.6} aria-hidden="true" className={selected ? "text-accent-fg" : ""} />
              <span className="whitespace-nowrap text-sm font-semibold lg:flex-1">{item.heading}</span>
              <span className="hidden font-mono text-[0.6875rem] uppercase tracking-wider text-subtle xl:inline">{item.title}</span>
            </button>
          );
        })}
      </div>

      <div
        id="tech-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tech.id}`}
        className="relative overflow-hidden rounded-lg border border-line bg-surface/70 p-6 backdrop-blur md:p-8 lg:col-span-7"
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent via-accent-fg/60 to-transparent" />
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={tech.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-md border border-line bg-elevated text-accent-fg">
                <ActiveIcon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow text-accent-fg">{tech.title}</p>
                <h3 className="heading-display mt-1.5 text-h2">{tech.heading}</h3>
              </div>
            </div>
            <p className="mt-6 text-base font-medium text-fg">{tech.desc}</p>
            <p className="mt-3 leading-relaxed text-muted">{tech.brief}</p>
            <p className="eyebrow mt-7 text-subtle">Key technologies</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {tech.skills.map((skill) => (
                <li key={skill}>
                  <Chip>{skill}</Chip>
                </li>
              ))}
            </ul>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
