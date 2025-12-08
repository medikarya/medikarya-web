"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
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
            linear-gradient(180deg, var(--brand-100) 0%, var(--brand-50) 45%, var(--accent-100) 100%)
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
          <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">AI-Powered</span>
          <span className="rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs text-accent-700 shadow-sm">
            Clinical Education Platform
          </span>
        </div>

        <h1 className={cn(
          "text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-1000 delay-400 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Gain Clinical Confidence Before You See Your First Real Patient
        </h1>

        <p className={cn(
          "mt-4 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg max-w-2xl mx-auto px-4 transition-all duration-1000 delay-600 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Simulate patient consults, order diagnostics, interpret results — and get instant feedback so you walk into wards prepared.
        </p>

        <div className={cn(
          "mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 transition-all duration-1000 delay-800 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>


          <Button
            asChild
            className={cn(
              "group rounded-full px-6 py-4 sm:py-5 h-auto text-sm font-medium w-full sm:w-auto",
              "bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white shadow-lg",
              "hover:shadow-brand-500/20 hover:scale-[1.005] transition-all duration-300 ease-out",
            )}
          >
            <Link href="/signup" className="flex items-center justify-center gap-2">
              Start Your First Simulation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-slate-300 bg-white/80 backdrop-blur hover:bg-white/80 hover:border-brand-300 transition-colors duration-300 w-full sm:w-auto">
            <Link href="#video-demo" aria-label="Watch MediKarya in action" className="flex items-center justify-center gap-2">
              <Play className="h-4 w-4 fill-slate-900 text-slate-900" />
              Watch Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
