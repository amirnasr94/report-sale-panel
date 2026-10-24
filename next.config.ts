import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  reactCompiler: true,
  turbopack: {
    root: join(__dirname, "."),
  },
  output: "export",
};

export default nextConfig;
