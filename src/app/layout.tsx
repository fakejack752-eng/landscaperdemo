import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Evergreen Landscape & Outdoor Living | Landscaping in Queens, Brooklyn & Nassau County",
    template: "%s | Evergreen Landscape & Outdoor Living",
  },
  description:
    "Landscaping services, garden design, patios and pavers, lawn care, and commercial grounds maintenance for Queens, Brooklyn, and Nassau County, New York. Demo website concept created by AI Automation NY.",
  keywords: [
    "landscaping services in Queens NY",
    "lawn care in Queens NY",
    "landscape design in New York",
    "patio and paver installation Queens",
    "commercial landscaping Nassau County",
    "seasonal yard cleanup Queens",
  ],
  robots: { index: false, follow: false },
  openGraph: {
    title: "Evergreen Landscape & Outdoor Living (Demo Website Concept)",
    description:
      "Outdoor spaces designed for the way you live. Landscaping services for Queens, Brooklyn & Nassau County. Demo website concept by AI Automation NY.",
    type: "website",
    siteName: "Evergreen Landscape & Outdoor Living",
    images: [
      {
        url: siteConfig.images.ogBanner.src,
        width: 1200,
        height: 630,
        alt: siteConfig.images.ogBanner.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evergreen Landscape & Outdoor Living (Demo Website Concept)",
    description:
      "Beautiful outdoor spaces, built to be enjoyed. Demo website concept for a landscaping business serving Queens, Brooklyn & Nassau County.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#163A2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
