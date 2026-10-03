"use client";

import { m, type Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

const containerVariants: Variants = {
  hidden: {},
  show: ({ stagger, delay }: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};

type Tag = "div" | "ul" | "ol" | "li" | "dl" | "article";

type MotionBlockProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
};

export function Reveal({ children, className, as = "div", delay = 0 }: MotionBlockProps & { delay?: number }) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: easeOutExpo, delay }}
    >
      {children}
    </Component>
  );
}

// Animates its StaggerItem children in sequence, on scroll or immediately on mount.
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0.05,
  onMount = false,
}: MotionBlockProps & { stagger?: number; delay?: number; onMount?: boolean }) {
  const Component = m[as];
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport };
  return (
    <Component className={className} variants={containerVariants} custom={{ stagger, delay }} initial="hidden" {...trigger}>
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = "div" }: MotionBlockProps) {
  const Component = m[as];
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
