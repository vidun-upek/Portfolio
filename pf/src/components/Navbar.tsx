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
    <nav className="fixed top-0 left-0 w-full z-[100] p-10 flex items-center justify-between pointer-events-none">
      {/* Logo stays on the left */}
      <Link href="/" className="font-black text-2xl italic tracking-tighter text-white pointer-events-auto hover:scale-105 transition-transform">
        V.S<span className="text-[rgb(192,53,64)]">.</span>
      </Link>
      
      {/* Links are perfectly centered */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
        <ul className="flex gap-12">
          {links.map((link) => (
            <li key={link.label}>
              <Link 
                href={link.href} 
                className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                  pathname === link.href ? "text-[rgb(192,53,64)]" : "text-white hover:text-[rgb(192,53,64)]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}