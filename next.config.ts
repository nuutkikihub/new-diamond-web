import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages cannot run the Worker; export static files only in its build.
  ...(process.env.GITHUB_PAGES === "true" ? { output: "export" as const } : {}),
};

export default nextConfig;
