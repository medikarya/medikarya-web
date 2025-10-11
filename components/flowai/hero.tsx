"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/lib/scroll-animation"

export function Hero() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className={cn(
        "relative mt-6 overflow-hidden rounded-3xl border shadow-sm px-6 py-14 sm:py-16 md:py-20 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Background gradient and subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1200px 500px at 50% -10%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%),
            linear-gradient(180deg, #dbeafe 0%, #e0f2fe 45%, #ccfbf1 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
          maskImage: "radial-gradient(100% 70% at 50% 30%, rgba(0,0,0,1), rgba(0,0,0,0.05))",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className={cn(
          "mb-5 flex flex-col sm:flex-row items-center justify-center gap-2 transition-all duration-1000 delay-200 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">AI-Powered</span>
          <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs text-teal-700 shadow-sm">
            Clinical Education Platform
          </span>
        </div>

        <h1 className={cn(
          "text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-1000 delay-400 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Advance Your Clinical Skills with AI Patient Simulations
        </h1>

        <p className={cn(
          "mt-4 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg max-w-2xl mx-auto px-4 transition-all duration-1000 delay-600 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Experience realistic patient consultations, order diagnostic tests, interpret results, and develop
          clinical reasoning skills through our advanced AI-powered medical education platform.
        </p>

        <div className={cn(
          "mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 transition-all duration-1000 delay-800 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button
            asChild
            className={cn(
              "rounded-full px-5 py-5 sm:py-6 text-sm sm:text-base w-full sm:w-auto",
              "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg",
              "hover:shadow-xl transition-all duration-200",
            )}
          >
            <Link href="/signup">Start Your First Simulation</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-300 bg-white/80 backdrop-blur hover:bg-white/90 w-full sm:w-auto">
            <Link href="#how-it-works" aria-label="See how MediKarya works">
              Explore Features
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
