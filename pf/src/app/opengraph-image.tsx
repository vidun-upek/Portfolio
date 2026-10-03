import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profileData } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { loadGoogleFont } from "@/lib/og";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const eyebrow = profileData.subheading.toUpperCase();
  const tagline = "BUILD · SHIP · SCALE";
  const footer = "github.com/vidun-upek · Colombo, LK";

  const [portrait, display, mono] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/images/portrait.jpg")),
    loadGoogleFont({ family: "Archivo", weight: 900, italic: true, text: "VIDUNSHAK" }),
    loadGoogleFont({ family: "JetBrains Mono", weight: 600, text: eyebrow + tagline + footer }),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#08080a",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "72px 0 64px 72px" }}>
          <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 20, letterSpacing: 4, color: "#ef5a66" }}>{eyebrow}</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Archivo", fontStyle: "italic", fontWeight: 900, fontSize: 132, lineHeight: 0.88, letterSpacing: -4 }}>
            <span>VIDUN</span>
            <span>SHANUKA</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontFamily: "JetBrains Mono", fontSize: 22 }}>
            <span style={{ color: "#f5f5f7", letterSpacing: 6 }}>{tagline}</span>
            <span style={{ color: "#a1a1aa" }}>{footer}</span>
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 420, height: "100%" }}>
          <img src={`data:image/jpeg;base64,${portrait.toString("base64")}`} alt="" width={420} height={630} style={{ objectFit: "cover", objectPosition: "top" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg, #08080a 0%, rgba(8,8,10,0) 45%)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, display: "flex", background: "#c03540" }} />
        </div>
      </div>
    ),
    { ...size, fonts: [display, mono].filter((font) => font !== null) },
  );
}
