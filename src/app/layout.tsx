import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd } from "@/components/seo/organization-jsonld";
import { WebsiteJsonLd } from "@/components/seo/website-jsonld";
import { ServiceJsonLd } from "@/components/seo/service-jsonld";
import { VercelAnalyticsIsland } from "@/components/providers/vercel-analytics-provider";
import { company } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ibsinfra.com";
const isUsingFallback = !process.env.NEXT_PUBLIC_SITE_URL;
if (isUsingFallback) {
  console.warn(
    "[seo] NEXT_PUBLIC_SITE_URL is not set — canonical tags, sitemap, and JSON-LD URLs will default to https://ibsinfra.com. Set this env var to your actual production domain.",
  );
}
const titleDefault = `${company.legalName} — Communication, Network & Security Systems`;

/** Grounded in company.ts's own service-category names and coverage area -- nothing invented. */
const keywords = [
  company.legalName,
  company.positioning,
  ...company.about.categories.map((c) => c.title),
  "IT system integrator",
  "annual maintenance contract",
  ...company.serviceAreas,
];

// Search Console / Bing Webmaster verification: set these env vars once the site is verified
// with each service, rather than hard-coding a placeholder token.
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: `%s — ${company.legalName}`,
  },
  description: company.summary,
  keywords,
  authors: [{ name: company.legalName, url: siteUrl }],
  creator: company.legalName,
  publisher: company.legalName,
  applicationName: "IBS Infra",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: company.legalName,
    title: titleDefault,
    description: company.summary,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: titleDefault,
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: titleDefault,
    description: company.summary,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
  ...((googleSiteVerification || bingSiteVerification) && {
    verification: {
      ...(googleSiteVerification && { google: googleSiteVerification }),
      ...(bingSiteVerification && { other: { "msvalidate.01": bingSiteVerification } }),
    },
  }),
};

export const viewport: Viewport = {
  themeColor: "#FBFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://vitals.vercel-analytics.com" />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <ServiceJsonLd />
        {children}
        <Toaster />
        <VercelAnalyticsIsland />
      </body>
    </html>
  );
}
