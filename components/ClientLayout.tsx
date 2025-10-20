"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { Loader2 } from "lucide-react"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isSignedIn && (pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
      setIsTransitioning(true)
      router.push("/dashboard")
    }
  }, [isSignedIn, pathname, router])

  useEffect(() => {
    // Show spinner on any pathname change
    setIsTransitioning(true)

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Hide spinner after 1.5 seconds (adjust based on typical load times)
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, 1500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname])

  return (
    <>
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-slate-600">Loading...</p>
          </div>
        </div>
      )}
    </>
  )
}
