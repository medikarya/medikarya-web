import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
// ClientLayout moved to per-area layouts to avoid shipping client-only code to auth pages
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        <head>
          {/* Preconnect to font provider to reduce font load time */}
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* Clerk assets often come from a CDN — preconnect helps reduce handshake time */}
          <link rel="preconnect" href="https://cdn.clerk.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://api.clerk.dev" crossOrigin="anonymous" />
          {/* If your build places font files under /media, consider preloading critical fonts here.
              Example (uncomment and set correct href if you know the exact path):
          <link rel="preload" href="/media/your-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          */}
        </head>
        <body className={cn(geistSans.variable, geistMono.variable, geistSans.className)}>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
