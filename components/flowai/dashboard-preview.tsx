"use client"

import { useScrollAnimation } from "@/lib/scroll-animation"
import { cn } from "@/lib/utils"

export function DashboardPreview() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      id="video-demo"
      className={cn(
        "py-16 sm:py-20 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
          See MediKarya in Action
        </h2>
        <p className="text-lg text-slate-600">
          Watch how our AI patient simulations transform medical training.
        </p>
      </div>

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-white shadow-2xl">
        {/* Responsive YouTube Video Embed */}
        <div className="relative aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE?autoplay=0"
            title="MediKarya App Demonstration"
            className="absolute inset-0 h-full w-full rounded-3xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}
