"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Handle route transitions if needed
    const handleRouteChange = () => {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 100)
    }

    // Only show loading for actual navigation, not initial load
    const handlePopState = () => handleRouteChange()

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Don't show loading spinner on initial render to avoid hydration mismatch
  return (
    <>
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {children}
      </div>
      {isLoading && (
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

// Legacy export for backward compatibility (if needed)
export const ClientLayout = AppWrapper
