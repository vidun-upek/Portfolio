import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Ensure any old path `/cv.pdf` is redirected to the single canonical PDF
      {
        source: "/cv.pdf",
        destination: "/cv.vidun.shanuka.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
