"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
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
      highlight ? "border-2 border-brand-200 bg-gradient-to-br from-brand-50/50 to-accent-50/50 shadow-lg scale-105" : "border-slate-200 hover:shadow-lg hover:scale-[1.005] hover:border-brand-100",
      "group transition-all duration-300 ease-out h-full flex flex-col"
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
            <li key={f} className="text-slate-600 flex items-center gap-2 group-hover:text-slate-700 transition-colors">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform duration-300"></div>
              {f}
            </li>
          ))}
        </ul>
        <Button
          asChild
          variant={highlight ? "default" : "outline"}
          className={`w-full rounded-full mt-auto ${highlight
            ? 'bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white shadow-lg hover:shadow-brand-500/25'
            : 'border-slate-200 hover:border-brand-200 hover:bg-brand-50 text-slate-700 hover:text-brand-700'
            } transition-all duration-300`}
        >
          <Link href={contact ? "/contact" : "/signup"} className="flex items-center justify-center gap-2">
            {contact ? "Contact Us" : "Get Started"}
            {!contact && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
