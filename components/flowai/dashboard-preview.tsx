"use client"

import { useScrollAnimation } from "@/lib/scroll-animation"
import { cn } from "@/lib/utils"

export function DashboardPreview() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className={cn(
        "-mt-10 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-white shadow-lg">
        {/* Responsive YouTube Video Embed */}
        <div className="relative aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE?autoplay=1&mute=1"
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
