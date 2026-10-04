"use client";

// Feeds the pointer position to every [data-spotlight] card inside, so the glow tracks across the grid.
export default function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    e.currentTarget.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    });
  };

  return (
    <div onPointerMove={onPointerMove} className={className}>
      {children}
    </div>
  );
}
