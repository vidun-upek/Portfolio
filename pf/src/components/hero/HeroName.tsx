"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const LetterPhysics = dynamic(() => import("./LetterPhysics"), { ssr: false });

type HeroNameProps = {
  lines: string[];
  className?: string;
  delay?: number;
};

export default function HeroName({ lines, className = "", delay = 0.15 }: HeroNameProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const offsets = lines.map((_, i) => lines.slice(0, i).join("").length);

  return (
    <h1 className={`heading-display select-none ${className}`}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span ref={ref} aria-hidden="true" className="block">
        {lines.map((line, lineIndex) => (
          <span key={line} className="block whitespace-nowrap">
            {Array.from(line).map((char, charIndex) => {
              const order = offsets[lineIndex] + charIndex;
              return (
                <span
                  key={order}
                  className="inline-block animate-rise [--rise-y:0.45em] motion-reduce:animate-none"
                  style={{ animationDelay: `${delay + order * 0.035}s` }}
                >
                  <span data-letter className="inline-block will-change-transform">
                    {char}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
      <LetterPhysics targetRef={ref} />
    </h1>
  );
}
