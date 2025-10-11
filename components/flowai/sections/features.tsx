"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, TestTube, FileText, Users, Heart, Activity } from "lucide-react"
import { useScrollAnimation } from "@/lib/scroll-animation"
import { cn } from "@/lib/utils"

export default function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation()

  const features = [
    {
      title: "AI Patient Consultations",
      desc: "Engage in realistic patient consultations with intelligent AI that responds like real patients, complete with symptoms, medical history, and emotional responses.",
      icon: Stethoscope,
      color: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Smart Diagnostic Testing",
      desc: "Order appropriate medical tests and receive accurate, simulated results for comprehensive learning and clinical decision-making practice.",
      icon: TestTube,
      color: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "Personalized Clinical Feedback",
      desc: "Get detailed, evidence-based feedback on your diagnostic reasoning, clinical decision-making, and patient communication skills from AI medical experts.",
      icon: FileText,
      color: "bg-green-50",
      iconColor: "text-green-600"
    },
  ]
  return (
    <section
      ref={ref}
      id="features"
      className={cn(
        "mx-auto max-w-6xl px-4 py-16 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className={cn(
          "text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl transition-all duration-1000 delay-200 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>Core Features</h2>
        <p className={cn(
          "mt-2 text-slate-600 text-sm sm:text-base px-4 transition-all duration-1000 delay-400 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Everything you need to develop clinical expertise through interactive AI simulations designed by medical professionals.
        </p>
      </div>
      <div className={cn(
        "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-600 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}>
        {features.map((f, index) => {
          const Icon = f.icon
          return (
            <Card
              key={f.title}
              className={cn(
                "rounded-2xl border-slate-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1",
                "transform transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.color} mb-4`}>
                  <Icon className={`h-6 w-6 ${f.iconColor}`} />
                </div>
                <CardTitle className="text-slate-900 text-lg sm:text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 leading-relaxed pt-0">{f.desc}</CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
