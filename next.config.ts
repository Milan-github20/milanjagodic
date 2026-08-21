import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    // Keep resolution inside this repo (avoids picking up C:\Users\Racunari\package-lock.json)
    root: process.cwd(),
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
