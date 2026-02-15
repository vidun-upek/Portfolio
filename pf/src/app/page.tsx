"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const hubCards = [
  { id: "profile", title: "Profile", path: "/about", isColored: true },
  { id: "education", title: "Education", path: "/education", isColored: false },
  { id: "certs", title: "Certifications", path: "/certifications", isColored: false },
  { id: "techstack", title: "Tech Stack", path: "/techstack", isColored: false },
  { id: "projects", title: "Projects", path: "/projects", isColored: false },
];

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // THE TOUCHPAD FIX: Maps vertical mouse wheel to horizontal scroll,
  // but allows native horizontal touchpad swipes to work perfectly!
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only intervene if they are using a vertical mouse wheel
      if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: "auto" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <main 
      ref={scrollRef} 
      className="h-screen w-full bg-black overflow-x-auto overflow-y-hidden flex flex-nowrap items-stretch no-scrollbar"
    >
      {hubCards.map((card, index) => {
        const isProfile = card.id === "profile";
        const widthClass = isProfile ? "w-[90vw] md:w-[600px]" : "w-[65vw] md:w-[350px]";

        return (
          <div
            key={card.id}
            onClick={() => router.push(card.path)}
            className={`group relative ${widthClass} h-full shrink-0 border-r border-white/15 overflow-hidden cursor-pointer transition-all duration-700 
              ${card.isColored ? "" : "grayscale hover:grayscale-0"}`}
          >
            {/* The Splash Animation */}
            <div className="splash z-20" />

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/strips/bg1.png" 
                alt={card.title} 
                fill 
                className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
            </div>

            {/* Static Top Info (Module Numbers) */}
            <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-10 mt-20 md:mt-16">
              <span className="text-[rgb(192,53,64)] text-[10px] font-bold uppercase tracking-[0.4em]">
                Mod 0{index + 1}
              </span>
              <span className="text-white/10 text-5xl font-black italic group-hover:text-white/30 transition-colors duration-500">
                {index + 1}
              </span>
            </div>

            {/* Profile Card Layout vs Other Cards */}
            {isProfile ? (
              <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-end pb-24">
                <div className="flex flex-col gap-5">
                  {/* Huge Profile Image Box */}
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/20 relative shadow-2xl">
                    <Image src="/strips/logo.png" alt="Vidun Shanuka" fill className="object-cover" />
                  </div>
                  
                  <div>
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">Vidun<br/>Shanuka</h2>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] mt-3">Age: 21</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-white/60 uppercase tracking-widest mt-2">
                    <p>• Frontend Dev</p>
                    <p>• Backend Dev</p>
                    <p>• ML Model Training</p>
                    <p>• CI/CD Pipelines</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[9px] border border-white/10 px-2 py-1 uppercase tracking-widest text-white/40">Internships</span>
                    <span className="text-[9px] border border-white/10 px-2 py-1 uppercase tracking-widest text-white/40">Freelance</span>
                    <span className="text-[9px] border border-white/10 px-2 py-1 uppercase tracking-widest text-white/40">Collaborations</span>
                  </div>

                  <p className="text-[rgb(192,53,64)] text-sm font-black uppercase tracking-[0.2em] mt-2">
                    Build • Ship • Scale.
                  </p>
                </div>
              </div>
            ) : (
              /* Bottom Horizontal Pop-up Text for Navigation Cards */
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end pb-24 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-[0.85]">
                  {card.title}
                </h2>
              </div>
            )}
          </div>
        );
      })}

      {/* Spacing at the far right so the final card doesn't hit the screen edge */}
      <div className="w-[15vw] shrink-0 bg-black" />
    </main>
  );
}