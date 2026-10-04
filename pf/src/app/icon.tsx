import { renderLogoIcon } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return renderLogoIcon(size.width, 14);
}
