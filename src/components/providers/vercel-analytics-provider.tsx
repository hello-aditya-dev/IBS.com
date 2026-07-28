"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * VercelAnalyticsIsland — Conditionally loads Vercel analytics.
 *
 * In local testing, Vercel script endpoints return 404, producing
 * console errors that don't reflect production behavior. On Vercel
 * infrastructure, the CDN serves these scripts correctly.
 *
 * The `NEXT_PUBLIC_VERCEL_ENV` environment variable is set at build
 * time by Vercel's build system to "production" or "preview". When
 * building locally, it's undefined, so analytics are not rendered,
 * avoiding 404 console noise.
 *
 * Analytics remain installed in the codebase and render in production.
 */
export function VercelAnalyticsIsland() {
  const isVercel =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

  if (!isVercel) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
