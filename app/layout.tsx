import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LayoutClient } from "@/components/LayoutClient"

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
  title: "MediKarya - AI-Powered Medical Education",
  description: "Advance your clinical skills with AI patient simulations. Practice consultations, diagnostics, and clinical reasoning with our advanced medical education platform.",
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
          <LayoutClient>
            {children}
          </LayoutClient>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
