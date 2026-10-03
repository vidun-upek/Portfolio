import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/site";

const socials = [
  { label: "GitHub", href: siteConfig.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.linkedin, Icon: LinkedinIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <p className="text-sm text-muted">© {new Date().getFullYear()} {siteConfig.name} — All Rights Reserved</p>
          <p className="font-mono text-xs text-subtle">Built with Next.js · TypeScript · Tailwind CSS</p>
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-10 place-items-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <Icon size={16} />
            </a>
          ))}
          <a
            href="#main"
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-md border border-line text-muted transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-accent-fg/60 hover:text-accent-fg"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
