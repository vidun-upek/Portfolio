"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    title: "University of Westminster",
    subtitle: "Software Engineering Undergraduate",
    detail:
      "BEng (Hons) at IIT Sri Lanka. Second-year focus on Architecture and Algorithms.",
    type: "Degree",
    number: "I",
  },
  {
    title: "IBM Cloud",
    subtitle: "Docker & Kubernetes Specialist",
    detail:
      "Certified in container orchestration and cloud-native application deployment.",
    type: "Certification",
    number: "II",
  },
  {
    title: "Meta Frontend",
    subtitle: "Professional Developer Certificate",
    detail:
      "Mastery in React, UI design principles, and modern frontend workflows.",
    type: "Certification",
    number: "III",
  },
  {
    title: "AWS Academy",
    subtitle: "Cloud Foundations",
    detail:
      "Infrastructure design, serverless architecture, and cloud security protocols.",
    type: "Certification",
    number: "IV",
  },
  {
    title: "DeepLearning.AI",
    subtitle: "Neural Networks & Deep Learning",
    detail:
      "Focus on model training, backpropagation, and deep learning engineering.",
    type: "Certification",
    number: "V",
  },
  {
    title: "Google IT",
    subtitle: "Automation with Python",
    detail:
      "System administration and infrastructure automation using Python scripting.",
    type: "Certification",
    number: "VI",
  },
];

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const container = containerRef.current!;

      gsap.to(track, {
        x: () => -(track.scrollWidth - container.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - container.clientWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-[#050505] flex items-stretch overflow-hidden"
    >
      <div ref={trackRef} className="flex h-screen w-fit items-stretch">
        {/* Title Strip */}
        <div className="relative w-[35vw] shrink-0 flex flex-col justify-center border-r border-white/5 px-16 bg-[#050505]">
          <span className="font-display text-[13px] tracking-[0.5em] text-brand-red block mb-6">
            02 — Education
          </span>
          <h2 className="font-display text-[7vw] leading-[0.85] text-white uppercase">
            Learning
            <br />
            &amp; Growth
          </h2>
          <p className="mt-8 font-body text-sm text-white/30 tracking-wide max-w-xs leading-relaxed">
            Academic foundation and industry certifications that shape my
            engineering practice.
          </p>
          <div className="absolute bottom-16 left-16 right-16 h-px bg-gradient-to-r from-brand-red/40 to-transparent" />
        </div>

        {/* Education Strips */}
        {educationData.map((edu, i) => (
          <div
            key={i}
            className="strip-card splash-container relative w-[28vw] shrink-0 border-r border-white/5 cursor-pointer group"
          >
            <div className="splash-effect" />

            <div className="strip-image absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-red/10 via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="font-display text-[18vw] text-white/[0.02] select-none leading-none">
                  {edu.number}
                </span>
              </div>
            </div>

            <div className="strip-overlay absolute inset-0 bg-black/60" />

            <div className="relative z-10 h-full flex flex-col justify-between p-10">
              <div>
                <span className="font-display text-[11px] tracking-[0.4em] text-brand-red/70 group-hover:text-brand-red transition-colors duration-500">
                  {edu.type}
                </span>
              </div>
              <div>
                <h3 className="font-display text-4xl text-white/30 group-hover:text-white uppercase leading-[0.95] transition-colors duration-500 mb-3">
                  {edu.title}
                </h3>
                <p className="font-body text-sm text-white/15 group-hover:text-white/50 uppercase tracking-wider transition-colors duration-500">
                  {edu.subtitle}
                </p>
              </div>
              <div className="border-t border-white/5 group-hover:border-white/15 pt-5 transition-colors duration-500">
                <p className="font-body text-xs text-white/15 group-hover:text-white/50 leading-relaxed transition-colors duration-500">
                  {edu.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}