import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"

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
    <html lang="en" className="scroll-smooth">
      <body className={cn(geistSans.variable, geistMono.variable, geistSans.className)}>{children}</body>
    </html>
  )
}
