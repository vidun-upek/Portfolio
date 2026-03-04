"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "CV", href: "/cv" },
  ];

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-100 p-10 flex items-center justify-between pointer-events-none">
      {/* Logo and Home button on the left */}
      <div className="flex items-center gap-6 pointer-events-auto">
        {mounted && pathname !== "/" && (
          <button 
            onClick={handleHomeClick}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-brand-red transition-colors cursor-pointer bg-none border-none p-0"
          >
            Home
          </button>
        )}
      </div>
      
      {/* Links are perfectly centered */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
        <ul className="flex gap-12">
          {links.map((link) => (
            <li key={link.label}>
              <Link 
                href={link.href} 
                className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${
                  pathname === link.href ? "text-brand-red" : "text-white hover:text-brand-red"
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