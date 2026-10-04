"use client";

import { useRef, useState } from "react";
import Chip from "@/components/ui/Chip";
import { iconMap } from "@/components/ui/Icons";
import { techStack } from "@/data/projects";

export default function TechStackTabs() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

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
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group relative flex shrink-0 items-center gap-3 rounded-md border px-3.5 py-2.5 text-left transition-colors duration-200 lg:px-4 lg:py-3 ${
                selected ? "border-line-strong bg-elevated text-fg" : "border-transparent text-muted hover:bg-elevated/60 hover:text-fg"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-2 left-0 hidden w-0.5 rounded-full bg-brand transition-opacity lg:block ${selected ? "opacity-100" : "opacity-0"}`}
              />
              <Icon size={18} strokeWidth={1.6} aria-hidden="true" className={selected ? "text-accent-fg" : ""} />
              <span className="whitespace-nowrap text-sm font-semibold lg:flex-1">{item.heading}</span>
              <span className="hidden font-mono text-[0.6875rem] uppercase tracking-wider text-subtle xl:inline">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Every panel shares one grid cell, so the card keeps the tallest panel's height on any tab. */}
      <div className="relative grid overflow-hidden rounded-lg border border-line bg-surface/70 backdrop-blur lg:col-span-7">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brand" />
        {techStack.map((item, i) => {
          const Icon = iconMap[item.icon];
          const selected = i === active;
          return (
            <div
              key={item.id}
              id={`panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              inert={!selected}
              className={`col-start-1 row-start-1 p-6 transition-[opacity,transform] duration-500 ease-out-expo md:p-8 ${
                selected ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-md border border-line bg-elevated text-accent-fg">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <p className="eyebrow text-accent-fg">{item.title}</p>
                  <h3 className="heading-display mt-1 text-h2">{item.heading}</h3>
                </div>
              </div>
              <p className="mt-6 text-base font-medium text-fg">{item.desc}</p>
              <p className="mt-3 leading-relaxed text-muted">{item.brief}</p>
              <p className="eyebrow mt-7 text-subtle">Key technologies</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <li key={skill}>
                    <Chip>{skill}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
