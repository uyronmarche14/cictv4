import type { NextConfig } from "next";

// Bundle analyzer configuration
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    // Enable image optimization
    formats: ["image/webp", "image/avif"],

    // Configure image domains for external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],

    // Image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Enable placeholder blur for better UX
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    // Enable CSS optimization
    optimizeCss: process.env.NODE_ENV === "production",
    // Enable critical CSS inlining
    optimizeServerReact: true,
  },

  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate vendor chunks for better caching
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
            enforce: true,
          },
          // Separate UI components chunk
          ui: {
            test: /[\\/]src[\\/]app[\\/]components[\\/]ui[\\/]/,
            name: "ui-components",
            chunks: "all",
            priority: 20,
            minChunks: 2,
          },
          // Separate icons chunk for better tree-shaking
          icons: {
            test: /[\\/]node_modules[\\/](lucide-react|@radix-ui)[\\/]/,
            name: "icons",
            chunks: "all",
            priority: 30,
            enforce: true,
          },
          // Separate animation libraries
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|@motionone)[\\/]/,
            name: "animations",
            chunks: "all",
            priority: 25,
            enforce: true,
          },
          // Separate Cloudinary chunk
          cloudinary: {
            test: /[\\/]node_modules[\\/](next-cloudinary|cloudinary)[\\/]/,
            name: "cloudinary",
            chunks: "all",
            priority: 25,
            enforce: true,
          },
          // Common utilities
          utils: {
            test: /[\\/]src[\\/]app[\\/]lib[\\/]/,
            name: "utils",
            chunks: "all",
            priority: 15,
            minChunks: 2,
          },
        },
      };
    }

    // Add bundle analysis in development
    if (dev && !isServer) {
      config.plugins.push(
        new (require("webpack").DefinePlugin)({
          "process.env.BUNDLE_ANALYZE": JSON.stringify(
            process.env.BUNDLE_ANALYZE || "false"
          ),
        })
      );
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
