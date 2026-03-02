import dynamic from "next/dynamic"
import { Navbar } from "@/components/flowai/navbar"
import { Hero } from "@/components/flowai/hero"
import ProblemsSection from "@/components/flowai/sections/problems-section"
import { SmoothScroller } from "@/components/smooth-scroller"

// Lazy Load Heavy Sections (Below the fold)
const FeaturesBento = dynamic(() => import("@/components/flowai/sections/features-bento"), {
  loading: () => <div className="h-[800px] w-full bg-slate-200 animate-pulse rounded-3xl my-24 mx-auto max-w-7xl" />
})
const DashboardPreview = dynamic(() => import("@/components/flowai/dashboard-preview").then(mod => mod.DashboardPreview), {
  loading: () => <div className="h-[600px] w-full bg-slate-200 animate-pulse rounded-3xl my-24 mx-auto max-w-7xl" />
})
const FAQSection = dynamic(() => import("@/components/flowai/sections/faq"), {
  loading: () => <div className="h-[400px] w-full bg-slate-200 animate-pulse rounded-3xl my-24 mx-auto max-w-7xl" />
})
const Footer = dynamic(() => import("@/components/flowai/footer").then(mod => mod.Footer), {
  loading: () => <div className="h-[300px] w-full bg-slate-900 animate-pulse" />
})

export default function Page() {
  return (
    <SmoothScroller>
      <main className="min-h-dvh">
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50" />
          <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
            <Navbar />
            <Hero />
          </div>
        </div>

        {/* sections */}
        <ProblemsSection />
        <FeaturesBento />
        <DashboardPreview />
        <FAQSection />
        <Footer />
      </main>
    </SmoothScroller>
  )
}
