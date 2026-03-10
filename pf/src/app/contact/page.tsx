import Link from "next/link";

export default function ContactPage() {
  const links = [
    { label: "Email", href: "mailto:vidun.shanukaofficial@email.com", sub: "vidun.shanukaofficial@email.com" },
    { label: "GitHub", href: "https://github.com/vidun-upek", sub: "github.com/vidun-upek" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vidun-shanuka-17276a2b4/", sub: "linkedin.com/in/vidun-shanuka" },
    { label: "CV / Resume", href: "/cv", sub: "View/Download PDF" },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <span className="text-[rgb(192,53,64)] text-xs font-bold uppercase tracking-[0.4em] block mb-4">Module 06 — Contact</span>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">Let's Work<br />Together</h1>
          <p className="text-sm text-black/45 dark:text-white/45 leading-relaxed mb-8">Open to DevOps, Full Stack, and ML internship opportunities. I bring a strong engineering mindset and the drive to ship quality products fast.</p>
          <div className="flex flex-wrap gap-3">
            {['DevOps', 'Full Stack', 'ML / AI', 'Open Source'].map((tag) => (
              <span key={tag} className="text-[10px] border border-black/15 dark:border-white/15 px-3 py-1.5 uppercase tracking-widest text-black/45 dark:text-white/45 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div />

          <div className="flex flex-col gap-3 w-full lg:w-full">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href === "/cv" || link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href === "/cv" || link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between px-6 py-5 border border-black/10 dark:border-white/10 rounded-xl hover:border-[rgb(192,53,64)]/50 hover:bg-[rgb(192,53,64)]/5 transition-all duration-300"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">{link.label}</p>
                  <p className="text-[10px] text-black/25 dark:text-white/25 mt-0.5">{link.sub}</p>
                </div>
                <span className="text-black/25 dark:text-white/25 group-hover:text-[rgb(192,53,64)] transition-colors duration-300 text-lg">→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-black/15 dark:text-white/15 text-[10px] uppercase tracking-widest">© 2026 Vidun Shanuka — All Rights Reserved</p>
          <p className="text-black/15 dark:text-white/15 text-[10px] uppercase tracking-widest">Built with Next.js · TypeScript · Tailwind CSS</p>
        </div>
      </div>
    </main>
  );
}
