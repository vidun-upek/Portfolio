"use client";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";

interface CardConfig {
  id: string;
  title: string;
  displayLabel: string;
  path: string;
  isClickable: boolean;
  badge?: string;
}

const hubCards: CardConfig[] = [
  { id: "profile", title: "Profile", displayLabel: "VIDUN SHANUKA", path: "/", isClickable: false },
  { id: "teckstack", title: "Teck Stack", displayLabel: "Tech Stack", path: "/teckstack", isClickable: true, badge: "20" },
  { id: "projects", title: "Projects", displayLabel: "Projects", path: "/projects", isClickable: true, badge: "5" },
  { id: "education", title: "Education", displayLabel: "Education", path: "/education", isClickable: true, badge: "4" },
  { id: "certifications", title: "Certifications", displayLabel: "Certifications", path: "/certifications", isClickable: true, badge: "3" },
  { id: "learnings", title: "Learnings", displayLabel: "Learnings", path: "/learnings", isClickable: true, badge: "4" },
  { id: "portfolio", title: "Portfolio", displayLabel: "Portfolio Details", path: "/portfolio", isClickable: true, badge: "6" },
];

const profileData = {
  name: "Vidun Shanuka",
  age: 21,
  skills: ["Frontend Dev", "Backend Dev", "ML Model Training", "CI/CD Pipelines"],
  tags: ["Internships", "Freelance", "Collaborations"],
  motto: "Build • Ship • Scale."
};

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: "smooth" });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        el.scrollBy({ left: 400, behavior: "smooth" });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        el.scrollBy({ left: -400, behavior: "smooth" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Use Intersection Observer to track which card is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dataIndex = (entry.target as HTMLDivElement).getAttribute("data-card-index");
            if (dataIndex !== null) {
              setCurrentCard(parseInt(dataIndex));
            }
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: 0.3, // Trigger when 30% of card is visible
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Handle card hover to update progress indicator
  const handleCardHover = (cardIndex: number) => {
    setCurrentCard(cardIndex);
  };

  // Register card refs
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <main 
      ref={scrollRef} 
      className="h-screen w-full bg-black overflow-x-auto overflow-y-hidden flex flex-nowrap items-stretch no-scrollbar scroll-smooth relative"
    >
      {hubCards.map((card, index) => (
        <Card
          key={card.id}
          forwardedRef={setCardRef(index)}
          id={card.id}
          title={card.title}
          displayLabel={card.displayLabel}
          cardNumber={index}
          isProfile={card.id === "profile"}
          isClickable={card.isClickable}
          path={card.path}
          badge={card.badge}
          profileData={card.id === "profile" ? profileData : undefined}
          onHover={() => handleCardHover(index)}
        />
      ))}

      {/* Spacing at the far right */}
      <div className="w-[15vw] shrink-0 bg-black" />

      {/* Scroll Progress Indicator - Only Dots */}
      <div className="fixed bottom-8 right-8 z-50 flex gap-2 items-center">
        {hubCards.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentCard 
                ? "bg-brand-red w-8" 
                : "bg-white/30 w-2"
            }`}
          />
        ))}
      </div>

      {/* Scroll Hint for Mobile */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 md:hidden z-40 text-white/40 text-xs animate-pulse">
        ←
      </div>
      <div className="fixed top-1/2 -translate-y-1/2 right-4 md:hidden z-40 text-white/40 text-xs animate-pulse">
        →
      </div>
    </main>
  );
}