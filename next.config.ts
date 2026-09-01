import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The sample blog figure is a drawn SVG rather than a photograph, and
    // next/image refuses SVG without this. Paired with the two settings below
    // it is Next's documented safe combination: this template has no uploads,
    // so every SVG the optimizer sees is one that shipped in the repo.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
