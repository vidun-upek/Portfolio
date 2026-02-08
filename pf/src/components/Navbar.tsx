"use client";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Education", id: "education" },
    { label: "Skills", id: "techstack" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="absolute top-0 right-0 z-50 p-6 pr-10">
      <ul className="flex items-center gap-8">
        {links.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollTo(link.id)}
              className="font-display text-[14px] tracking-[0.18em] uppercase text-white/80 hover:text-brand-red transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}