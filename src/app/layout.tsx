import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { LayoutHeader, LayoutFooter } from "@/components/layout/ClientLayoutElements";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.prix-location-benne.fr'),
  title: "Prix Location de Benne 2026 — Devis Gratuit & Tarifs par Ville",
  description: "Comparez les prix de location de bennes (3m³ à 30m³) dans votre ville. Devis gratuit en 2 min, livraison 24h. Gravats, encombrants, déchets verts. 35 000+ communes couvertes.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Prix Location de Benne 2026 — Devis Gratuit & Tarifs par Ville",
    description: "Comparez les prix de location de bennes dans votre ville. Devis gratuit, livraison 24h partout en France.",
    url: 'https://www.prix-location-benne.fr',
    siteName: 'Prix-Location-Benne.fr',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prix Location de Benne 2026 — Devis Gratuit & Tarifs",
    description: "Comparez les prix de location de bennes dans votre ville. Devis gratuit.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Prix-Location-Benne.fr",
  "url": "https://www.prix-location-benne.fr",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": "French"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Prix-Location-Benne.fr",
  "url": "https://www.prix-location-benne.fr",
  "description": "Comparateur de prix pour la location de bennes en France. Devis gratuits, tarifs par ville et département.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.prix-location-benne.fr/departements?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <LayoutHeader header={<Header />} />
        <main className="flex-1">{children}</main>
        <LayoutFooter footer={<Footer />} cta={<StickyMobileCTA />} />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8c10e507-8d64-43e3-a035-51c9a44bd635"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
