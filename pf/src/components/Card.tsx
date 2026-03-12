"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

interface CardProps {
  id: string;
  title: string;
  displayLabel: string;
  cardNumber: number;
  isProfile: boolean;
  isClickable: boolean;
  path: string;
  badge?: string;
  onHover?: (index: number) => void;
  profileData?: {
    name: string;
    age: number;
    skills: string[];
    tags: string[];
    motto: string;
    bio?: string;
    subheading?: string;
    ctaLink?: string;
    quickFacts?: Array<{ icon: string; label: string; value: string }>;
    techBadges?: string[];
    status?: string;
  };
}

interface CardWithRefProps extends CardProps {
  forwardedRef?: (el: HTMLDivElement | null) => void;
}

export default function Card({
  forwardedRef,
  id,
  title,
  displayLabel,
  cardNumber,
  isProfile,
  isClickable,
  path,
  badge,
  onHover,
  profileData,
}: CardWithRefProps) {
  const router = useRouter();
  const internalCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Consistent, smoothed 3D Tilt Effect on Mouse Move
  useEffect(() => {
    const card = internalCardRef.current;
    if (!card) return;

    let target = { x: 0, y: 0 };
    let rafId: number | null = null;

    const maxDeg = 10; // maximum tilt in degrees
    const ease = 0.12; // lerp easing (0-1)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Make direction consistent: mouse right -> rotateY positive
      const rotateY = ((x - centerX) / centerX) * maxDeg;
      const rotateX = ((centerY - y) / centerY) * maxDeg;

      target = { x: rotateX, y: rotateY };
    };

    const handleMouseLeave = () => {
      target = { x: 0, y: 0 };
    };

    const animate = () => {
      setTilt((prev) => {
        const nx = prev.x + (target.x - prev.x) * ease;
        const ny = prev.y + (target.y - prev.y) * ease;
        return { x: Number(nx.toFixed(4)), y: Number(ny.toFixed(4)) };
      });
      rafId = requestAnimationFrame(animate);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isClickable]);

  // Register external ref
  useEffect(() => {
    if (forwardedRef) {
      forwardedRef(internalCardRef.current);
    }
  }, [forwardedRef]);

  // Use the internal ref and bind to external ref
  return (
    <div
      ref={internalCardRef}
      data-card-index={cardNumber}
      onClick={() => isClickable && router.push(path)}
      onMouseEnter={() => onHover?.(cardNumber)}
      className={`group relative w-[65vw] md:w-[350px] h-full shrink-0 border-r border-white/15 overflow-hidden 
        ${isProfile ? "w-[90vw] md:w-[600px]" : ""} 
        ${isClickable ? "cursor-pointer" : "cursor-default"} 
        transition-all duration-700 
        ${isProfile ? "" : "md:grayscale md:hover:grayscale-0"}`}
      style={
        (tilt.x !== 0 || tilt.y !== 0)
          ? {
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d" as any,
            }
          : { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)", transformStyle: "preserve-3d" as any }
      }
    >
      {/* Splash Animation */}
      <div className="splash z-20" />

      {/* Background Image - Only for non-profile cards */}
      {!isProfile && (
        <div className="absolute inset-0 z-0">
          <Image 
            src="/strips/bg1.png" 
            alt={title} 
            fill 
            className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-black/80 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Card Number - Top Section */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-10 mt-20 md:mt-16">
        {/* Removed numbering - now empty */}
      </div>

      {/* Badge (For non-profile cards) */}
      {/* Removed - no circular badges */}

      {/* Profile Card Content */}
      {isProfile && profileData ? (
        <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">

          {/* BLACK BACKGROUND */}
          <div className="absolute inset-0 z-0 bg-black" />

          {/* LOGO CONTAINER */}
          <div className="absolute top-6 left-6 z-30 w-12 h-12">
            <Image src="/logo.jpg" alt="logo" fill className="object-contain rounded-lg" />
          </div>

          {/* MAIN LAYOUT CONTAINER - Left (Picture + Name + Button) + Right (Facts) */}
          <div className="relative z-20 flex flex-col md:flex-row items-start gap-8 md:gap-16">

            {/* LEFT SECTION: PROFILE IMAGE + NAME + BUTTON */}
            <div className="flex flex-col items-center md:items-start gap-4 flex-shrink-0">

              {/* PROFILE IMAGE */}
              <div className="w-64 h-64 rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl bg-white/5">
                <Image src="/profilepic.jpg" alt={profileData.name} fill className="object-cover" />
              </div>

              {/* NAME */}
              <h2 className="text-4xl font-bold tracking-tight text-white text-center md:text-left">
                {profileData.name}
              </h2>

              {/* BUTTON */}
              <button
                onClick={() => window.location.href = "/about"}
                className="px-6 py-2 bg-brand-red text-white font-semibold text-sm rounded hover:bg-red-600 transition-colors duration-300 hover:shadow-lg"
              >
                More About Me
              </button>
            </div>

            {/* RIGHT SECTION: STATUS + TEXT CONTENT */}
            <div className="flex-1 min-w-0">

              {/* STATUS INDICATOR SECTION - Different Style */}
              {profileData.status && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400 inline-block animate-pulse" />
                    <span className="text-green-300 text-sm font-semibold uppercase tracking-wide">
                      {profileData.status}
                    </span>
                  </div>
                </div>
              )}

              {/* QUICK FACTS SECTION */}
              {profileData.quickFacts && (
                <div className="space-y-4">
                  {profileData.quickFacts.map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {/* Fact Icon */}
                      <span className="text-lg flex-shrink-0">{fact.icon}</span>
                      
                      {/* Fact Content */}
                      <div className="min-w-0">
                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                          {fact.label}
                        </p>
                        <p className="text-sm text-white/80 whitespace-pre-line break-words">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TECH BADGES SECTION */}
              {profileData.techBadges && profileData.techBadges.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-6">
                  {profileData.techBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold text-white/80 bg-white/10 border border-white/20 rounded-full hover:bg-brand-red/20 hover:border-brand-red transition-all duration-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Bottom Pop-up for Navigation Cards */
        <div className="absolute bottom-0 left-0 w-full h-auto bg-black/90 backdrop-blur-sm px-8 md:px-12 py-6 md:py-8 flex flex-col justify-end 
          transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
          transition-all duration-500 ease-out z-30">
          <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            {displayLabel}
          </h3>
          <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-white/50 text-xs leading-relaxed">
            {badge} items • Click to explore
          </p>
        </div>
      )}
    </div>
  );
}
