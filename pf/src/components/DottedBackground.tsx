"use client";

export default function DottedBackground() {
  return (
    <div
      className="fixed inset-0 z-[-1] bg-white dark:bg-[#050505] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}
