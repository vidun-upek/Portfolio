"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "CV", href: "/cv" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center bg-gradient-to-b from-[#050505] to-transparent pointer-events-none">
      <Link href="/" className="font-black text-2xl italic tracking-tighter text-white pointer-events-auto hover:scale-105 transition-transform">
        V.S<span className="text-[rgb(192,53,64)]">.</span>
      </Link>
      
      <ul className="flex gap-10 pointer-events-auto">
        {links.map((link) => (
          <li key={link.label}>
            <Link 
              href={link.href} 
              className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                pathname === link.href ? "text-[rgb(192,53,64)]" : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}