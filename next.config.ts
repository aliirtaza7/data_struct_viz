import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false, // Disables the build activity indicator in the bottom-right corner
  },
  reactDevOverlay: false, // Disables the React error overlay
};

export default nextConfig;
