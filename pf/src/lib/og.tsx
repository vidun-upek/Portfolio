import { ImageResponse } from "next/og";

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

export async function renderMonogram(size: number, radius: number) {
  const font = await loadGoogleFont({ family: "Archivo", weight: 900, italic: true, text: "VS" });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c03540",
          borderRadius: radius,
          color: "#ffffff",
          fontFamily: "Archivo",
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: size * 0.5,
          letterSpacing: -size * 0.03,
        }}
      >
        VS
      </div>
    ),
    { width: size, height: size, fonts: font ? [font] : undefined },
  );
}
