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
        ${isProfile ? "" : "grayscale hover:grayscale-0"}`}
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

      {/* Background Image */}
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

      {/* Card Number - Top Section */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-10 mt-20 md:mt-16">
        {/* Removed numbering - now empty */}
      </div>

      {/* Badge (For non-profile cards) */}
      {/* Removed - no circular badges */}

      {/* Profile Card Content */}
      {isProfile && profileData ? (
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10 pb-10">

          {/* Logo — absolute top-left */}
          <div className="absolute top-6 left-6 z-30 w-12 h-12">
            <Image src="/logo.jpg" alt="logo" fill className="object-contain rounded-lg" />
          </div>

          {/* Main row: profile picture (left) + all details (right) */}
          <div className="flex gap-6 items-end">

            {/* Left — profile picture, sits below logo naturally */}
            <div className="flex-shrink-0">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-white/20 relative shadow-2xl hover:border-brand-red hover:shadow-[0_0_30px_rgba(192,53,64,0.3)] transition-all duration-500 bg-white/5">
                <Image src="/profilepic.jpg" alt={profileData.name} fill className="object-cover" />
              </div>
            </div>

            {/* Right — text content */}
            <div className="flex-1 min-w-0">

              {/* Name */}
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                {profileData.name}
              </h2>

              {/* Age */}
              <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mt-2">
                Age&nbsp;{profileData.age}
              </p>

              {/* Engagement types */}
              <div className="mt-4 space-y-[5px]">
                {["Internships", "Freelance", "Collaborations"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-[5px] h-[5px] rounded-full bg-brand-red flex-shrink-0" />
                    <span className="text-[10px] text-white/60 uppercase tracking-[0.25em]">{item}</span>
                  </div>
                ))}
              </div>

              {/* Descriptor */}
              <p className="text-[11px] text-white/45 mt-4 leading-relaxed">
                Full&#8202;Stack&nbsp;Dev&nbsp;·&nbsp;ML&nbsp;Model&nbsp;Training&nbsp;·&nbsp;Agent&nbsp;Buildup&nbsp;·&nbsp;DevOps&nbsp;/&nbsp;CI·CD
              </p>

              {/* Motto */}
              <p className="text-brand-red text-[10px] font-black uppercase tracking-[0.3em] mt-5">
                {profileData.motto}
              </p>
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
