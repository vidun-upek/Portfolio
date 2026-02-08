"use client";

export default function ContactSection() {
  const socialLinks = [
    { name: "LinkedIn", url: "#", detail: "Professional Network", icon: "Li" },
    { name: "GitHub", url: "#", detail: "Source Code", icon: "Gh" },
    { name: "Twitter", url: "#", detail: "Daily Updates", icon: "Tw" },
    { name: "Email", url: "mailto:your@email.com", detail: "Direct Inquiry", icon: "@" },
  ];

  return (
    <section className="relative h-screen w-full bg-[#050505] flex flex-col items-center justify-center px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[25%] w-px h-full bg-white/[0.03]" />
        <div className="absolute top-0 left-[50%] w-px h-full bg-white/[0.03]" />
        <div className="absolute top-0 left-[75%] w-px h-full bg-white/[0.03]" />
      </div>

      <div className="max-w-6xl w-full z-10">
        <span className="font-display text-[13px] tracking-[0.5em] text-brand-red block mb-8 text-center">
          05 — Contact
        </span>

        <h2 className="font-display text-[10vw] md:text-[8vw] text-white uppercase text-center leading-[0.85] mb-6">
          Let&apos;s
          <br />
          Connect
        </h2>

        <p className="font-body text-sm text-white/30 text-center tracking-wide max-w-md mx-auto mb-16">
          Available for internships, freelance projects, and meaningful
          collaborations. Let&apos;s build something great.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10 rounded-2xl overflow-hidden">
          {socialLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.url}
              className={`splash-container relative group p-8 md:p-10 transition-all duration-500 hover:bg-white/5 ${
                i < socialLinks.length - 1 ? "md:border-r border-white/10" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-white/10" : ""}`}
            >
              <div className="splash-effect" />

              <span className="absolute top-3 right-3 font-display text-4xl text-white/[0.03] group-hover:text-brand-red/10 transition-colors duration-500 select-none">
                {link.icon}
              </span>

              <div className="relative z-10">
                <h3 className="font-display text-xl text-white/40 group-hover:text-white uppercase tracking-wider transition-colors duration-500 mb-2">
                  {link.name}
                </h3>
                <p className="font-body text-[10px] text-white/15 group-hover:text-brand-red uppercase tracking-[0.3em] transition-colors duration-500">
                  {link.detail}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          ))}
        </div>

        <div className="mt-20 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-white/15 text-[10px] font-medium uppercase tracking-[0.3em]">
            © 2026 Vidun Shanuka — Pannipitiya, Sri Lanka
          </p>
          <p className="font-body text-white/15 text-[10px] font-medium uppercase tracking-[0.3em]">
            Built with Next.js &amp; GSAP
          </p>
        </div>
      </div>
    </section>
  );
}