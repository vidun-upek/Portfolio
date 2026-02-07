"use client";

export default function ContactSection() {
  const socialLinks = [
    { name: "LinkedIn", url: "#", detail: "Professional Network" },
    { name: "GitHub", url: "#", detail: "Source Code" },
    { name: "Twitter", url: "#", detail: "Daily Updates" },
    { name: "Email", url: "mailto:your@email.com", detail: "Direct Inquiry" },
  ];

  return (
    <section className="relative h-screen w-full bg-[#050505] flex flex-col items-center justify-center px-8">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full z-10">
        <span className="text-brand-red text-xs font-bold tracking-[0.5em] uppercase block mb-6 text-center">
          05 — Get In Touch
        </span>
        
        <h2 className="text-7xl md:text-9xl font-black text-white uppercase italic tracking-tighter text-center leading-none mb-20">
          Let's<br/>Connect.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="contact-card relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-brand-red/50"
            >
              <div className="splash" />
              <h3 className="text-white font-black uppercase tracking-widest text-lg mb-1 relative z-10">
                {link.name}
              </h3>
              <p className="text-white/40 text-[10px] uppercase tracking-widest relative z-10">
                {link.detail}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2026 Vidun Shanuka — Pannipitiya, Sri Lanka
          </p>
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            Built with Next.js & GSAP
          </p>
        </div>
      </div>

      <style jsx global>{`
        .contact-card .splash {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(-120%) skewX(-18deg);
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 35%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 65%,
            transparent 100%
          );
        }

        .contact-card:hover .splash {
          animation: slashMove 700ms ease-out forwards;
        }

        @keyframes slashMove {
          0% { opacity: 0; transform: translateX(-120%) skewX(-18deg); }
          15% { opacity: 0.7; }
          85% { opacity: 0.3; }
          100% { opacity: 0; transform: translateX(140%) skewX(-18deg); }
        }
      `}</style>
    </section>
  );
}