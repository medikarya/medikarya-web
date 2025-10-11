"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/lib/scroll-animation"
import { cn } from "@/lib/utils"

export default function PricingSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      id="pricing"
      className={cn(
        "mx-auto max-w-6xl px-4 py-16 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className={cn(
          "text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl transition-all duration-1000 delay-200 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>Choose Your Plan</h2>
        <p className={cn(
          "mt-2 text-slate-600 text-sm sm:text-base px-4 transition-all duration-1000 delay-400 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>Start free. Scale as your medical education needs grow.</p>
      </div>
      <div className={cn(
        "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-600 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}>
        <Plan title="Student" price="$0" features={["5 simulations/month", "Basic patient cases", "Community support"]} />
        <Plan
          title="Medical Student"
          price="$15"
          highlight
          features={["Unlimited simulations", "Advanced patient cases", "Detailed feedback reports", "Priority support"]}
        />
        <Plan
          title="Institution"
          price="Custom"
          features={["Everything in Pro", "Bulk student access", "Custom case creation", "Analytics dashboard", "Dedicated support"]}
          contact
        />
      </div>
    </section>
  )
}

function Plan({
  title,
  price,
  features,
  highlight,
  contact,
}: {
  title: string
  price: string
  features: string[]
  highlight?: boolean
  contact?: boolean
}) {
  return (
    <Card className={cn(
      highlight ? "border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 shadow-lg" : "border-slate-200 hover:shadow-md transition-shadow",
      "transition-all duration-300 ease-out h-full flex flex-col"
    )}>
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span className="text-slate-900">{title}</span>
          <span className="text-3xl font-semibold text-slate-900">{price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <ul className="mb-6 space-y-2 text-sm flex-1">
          {features.map((f) => (
            <li key={f} className="text-slate-600 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
              {f}
            </li>
          ))}
        </ul>
        <Button asChild className={`w-full rounded-full mt-auto ${highlight ? 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200' : ''}`}>
          <Link href={contact ? "/contact" : "/signup"}>
            {contact ? "Contact Us" : "Get Started"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
