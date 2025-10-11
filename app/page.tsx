import { Navbar } from "@/components/flowai/navbar"
import { Hero } from "@/components/flowai/hero"
import { DashboardPreview } from "@/components/flowai/dashboard-preview"
import FeaturesSection from "@/components/flowai/sections/features"
import HowItWorksSection from "@/components/flowai/sections/how-it-works"
import PricingSection from "@/components/flowai/sections/pricing"
import TestimonialsSection from "@/components/flowai/sections/testimonials"
import FAQSection from "@/components/flowai/sections/faq"
import NewsletterSection from "@/components/flowai/sections/newsletter"
import { Footer } from "@/components/flowai/footer"

export default function Page() {
  return (
    <main className="min-h-dvh">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50" />
        <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
          <Navbar />
          <Hero />
          <DashboardPreview />
        </div>
      </div>

      {/* sections */}
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
