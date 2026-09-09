import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WP Plus serves static files from public_html; no Node.js server required.
  output: "export",
};

export default nextConfig;
