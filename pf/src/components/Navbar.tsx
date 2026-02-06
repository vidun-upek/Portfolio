import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-8 pointer-events-none text-white mix-blend-difference">
      <div className="w-24 pointer-events-auto"></div>
      <ul className="flex gap-12 text-xs font-bold uppercase tracking-[0.2em] pointer-events-auto">
        <li className="hover:text-brand-red transition-colors cursor-pointer">
          <Link href="/about">About</Link>
        </li>
        <li className="hover:text-brand-red transition-colors cursor-pointer">
          <a href="#socials">Socials</a>
        </li>
        <li className="hover:text-brand-red transition-colors cursor-pointer flex items-center gap-2">
          More <span>↓</span>
        </li>
      </ul>
    </nav>
  );
}