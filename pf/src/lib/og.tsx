import { ImageResponse } from "next/og";
import { LOGO_S, LOGO_TRANSFORM, LOGO_V } from "@/components/brand/logo-paths";

type FontOptions = { family: string; weight: 400 | 600 | 700 | 900; italic?: boolean; text: string };

// Fetches a subset TTF from Google Fonts for next/og; returns null so images still render offline.
export async function loadGoogleFont({ family, weight, italic = false, text }: FontOptions) {
  try {
    const query = `family=${family.replace(/ /g, "+")}:ital,wght@${italic ? 1 : 0},${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const data = await (await fetch(src)).arrayBuffer();
    return { name: family, data, weight, style: italic ? ("italic" as const) : ("normal" as const) };
  } catch {
    return null;
  }
}

// Favicon/app icon: the navbar mark with the default (dark theme) crimson gradient.
export function renderLogoIcon(size: number, radius: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0b0b", borderRadius: radius }}>
        <svg viewBox="0 0 40 40" width={size} height={size}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#c03540" />
              <stop offset="1" stopColor="#ef5a66" />
            </linearGradient>
          </defs>
          <g fill="none" strokeWidth="3.6" strokeLinecap="square" strokeLinejoin="miter" transform={LOGO_TRANSFORM}>
            <path d={LOGO_V} stroke="#ffffff" />
            <path d={LOGO_S} stroke="url(#g)" />
          </g>
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
