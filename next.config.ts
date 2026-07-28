import type { NextConfig } from "next";

// Next.js statically optimizes most routes on this site, so a nonce-based
// script CSP (which requires a per-request response) would force everything
// to dynamic rendering. 'unsafe-inline' on script/style is a deliberate
// trade-off for a marketing site with no user-generated script content --
// every other directive is locked to 'self'.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // Vercel analytics and speed insights endpoints. The external
  // raw.githack.com HDRI dependency has been removed (WebGL hero now
  // uses self-contained directional lighting).
  "connect-src 'self' https://vitals.vercel-insights.com https://vitals.vercel-analytics.com https://wa.me",
  // Allow the Google Maps embed used on /contact (ViewOnMap component).
  "frame-src 'self' https://maps.google.com https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/quality-support",
        destination: "/quality",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
