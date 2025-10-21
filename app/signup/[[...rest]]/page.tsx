"use client"

import React from "react"
import dynamic from "next/dynamic"
const SignUp = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignUp), { ssr: false })
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/lib/scroll-animation"

const AuthDecorations = dynamic(() => import("@/components/AuthDecorations"), { ssr: false })

export default function SignUpPage() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Decorations are non-critical: lazy load to reduce initial work */}
      <AuthDecorations />

      <div className="relative mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden rounded-2xl sm:rounded-3xl border bg-white/80 shadow-xl backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-1000 ease-out mx-auto my-auto",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mx-auto mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-600 shadow-lg">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM9 4.5L4 8v8.5h12V8l-5-3.5L9 4.5z" clipRule="evenodd" />
                <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M10 12a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Join MediKarya</h1>
            <p className="text-sm sm:text-base text-slate-600">Start your journey in AI-powered medical education</p>
          </div>

          {/* Clerk SignUp Component */}
          <SignUp
            signInUrl="/login"
            afterSignUpUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: "w-full rounded-xl py-4 sm:py-6 text-sm sm:text-base font-medium bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200",
                card: "shadow-none bg-transparent border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formFieldInput: "rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-blue-400 transition-all duration-200 text-sm sm:text-base",
                formFieldLabel: "text-sm font-medium text-slate-700",
                footerActionText: "text-sm text-slate-600",
                footerActionLink: "font-medium text-blue-600 hover:text-blue-700 transition-colors",
              },
            }}
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </main>
  )
}
