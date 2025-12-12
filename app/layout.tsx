import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LayoutClient } from "@/components/LayoutClient"
import { SmoothScroller } from "@/components/smooth-scroller"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.medikarya.in"),
  title: {
    default: "MediKarya - AI-Powered Medical Education",
    template: "%s | MediKarya"
  },
  description: "Gain clinical confidence before your first real patient. Simulate consults, order diagnostics, and get instant feedback with our advanced AI medical education platform.",
  keywords: ["Medical Education", "AI Patient Simulation", "Clinical Training", "Medical Students", "Diagnosis Practice"],
  authors: [{ name: "MediKarya Team" }], // Replace with actual author if known
  creator: "MediKarya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "MediKarya - Gain Clinical Confidence",
    description: "Gain clinical confidence before your first real patient. Simulate consults, order diagnostics, and get instant feedback.",
    siteName: "MediKarya",
    images: [
      {
        url: "/og-image.png", // Next.js will resolve this to absolute URL using metadataBase
        width: 1200,
        height: 630,
        alt: "MediKarya Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediKarya - AI-Powered Medical Education",
    description: "Advance your clinical skills with AI patient simulations.",
    images: ["/og-image.png"],
    creator: "@medikarya", // Replace with actual handle
  },
  icons: {
    icon: "/favicon.ico", // Assuming standard nextjs output or we can use the svg
    shortcut: "/medikarya.svg",
    apple: "/medikarya.png", // Usually needs specific size but this is a safe fallback
  },
  generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={cn(geistSans.variable, geistMono.variable, geistSans.className)}
          suppressHydrationWarning={true}
        >
          {/* Script to clean up browser extension attributes */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Clean up attributes added by browser extensions
                  function cleanupAttributes() {
                    const body = document.body;
                    const html = document.documentElement;

                    // Remove common extension attributes
                    const extensionAttrs = [
                      'cz-shortcut-listen',
                      'data-cursor',
                      'data-codeium',
                      'data-tabnine'
                    ];

                    extensionAttrs.forEach(attr => {
                      body.removeAttribute(attr);
                      html.removeAttribute(attr);
                    });
                  }

                  // Clean up immediately
                  cleanupAttributes();

                  // Clean up after DOM is ready
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', cleanupAttributes);
                  } else {
                    cleanupAttributes();
                  }

                  // Clean up after React hydration
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(cleanupAttributes, 100);
                  });
                })();
              `
            }}
          />
          <SmoothScroller>
            <LayoutClient>
              {children}
            </LayoutClient>
          </SmoothScroller>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
