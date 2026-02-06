"use client";

export default function HeroSection() {
  return (
    <section className="snap-section relative bg-black flex flex-col items-center justify-center text-white overflow-hidden">
      
      {/* 3D Title */}
      <div className="relative z-10 text-center select-none">
        <h1 className="text-8xl md:text-[10rem] lg:text-[14rem] font-black uppercase leading-[0.85] tracking-tighter text-3d transition-transform duration-500 hover:scale-105">
          <span className="block text-white">Vidun</span>
          <span className="block text-white/20 -mt-4 md:-mt-12">Shanuka</span>
        </h1>
      </div>

      {/* Floating Profile Card */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center text-center z-20 hover:border-brand-red/30 transition-colors duration-300">
        <div className="w-20 h-20 mb-4 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
          <span className="text-[10px] text-white/30 uppercase">Photo</span>
        </div>
        
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">V.S. Upek</h2>
        <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">FullStack • DevOps • ML</p>
        
        <div className="mt-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/30">
          <span>Scroll</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
    </section>
  );
}