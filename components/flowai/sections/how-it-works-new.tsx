"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, TestTube, FileText, ArrowRight, CheckCircle, Clock, Users, Activity, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/lib/scroll-animation"

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation()

  const steps = [
    {
      title: "Patient Consultation",
      subtitle: "Interactive AI Assessment",
      desc: "Engage in dynamic conversations with AI patients presenting realistic symptoms and comprehensive medical histories.",
      icon: Stethoscope,
      features: [
        "Natural language processing",
        "Contextual patient responses",
        "Comprehensive symptom analysis"
      ],
      duration: "5-8 min",
      metric: "95% realism score"
    },
    {
      title: "Diagnostic Testing",
      subtitle: "Evidence-Based Ordering",
      desc: "Order appropriate diagnostic tests and receive clinically accurate results with detailed interpretations.",
      icon: TestTube,
      features: [
        "Laboratory test selection",
        "Radiology interpretation",
        "Real-time result delivery"
      ],
      duration: "3-5 min",
      metric: "98% accuracy rate"
    },
    {
      title: "Clinical Decision Making",
      subtitle: "AI-Guided Diagnosis",
      desc: "Analyze results, formulate diagnoses, and develop comprehensive treatment plans with personalized feedback.",
      icon: FileText,
      features: [
        "Differential diagnosis",
        "Treatment recommendations",
        "Clinical reasoning analysis"
      ],
      duration: "7-10 min",
      metric: "92% improvement rate"
    }
  ]

  return (
    <section
      ref={ref}
      id="how-it-works"
      className={cn(
        "mx-auto max-w-7xl px-4 py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50/30 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16">
        <div className={cn(
          "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-50 to-accent-50 px-4 sm:px-6 py-2 text-sm font-medium text-brand-700 border border-brand-100 mb-6 transition-all duration-1000 delay-200 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Activity className="h-4 w-4" />
          Evidence-Based Clinical Training
        </div>
        <h2 className={cn(
          "text-4xl sm:text-5xl font-bold tracking-tight mb-6 transition-all duration-1000 delay-400 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Clinical Excellence Through
          </span>
          <span className="bg-gradient-to-r from-brand-600 via-accent-600 to-accent-600 bg-clip-text text-transparent block mt-2">
            AI-Powered Simulation
          </span>
        </h2>
        <p className={cn(
          "text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto px-4 transition-all duration-1000 delay-600 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Experience hospital-grade medical training through our comprehensive AI simulation platform.
          Each session delivers clinical accuracy with evidence-based learning pathways designed by medical experts.
        </p>
      </div>

      <div className={cn(
        "grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto transition-all duration-1000 delay-800 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}>
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={step.title}
              className={cn(
                "group relative h-full transform transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${1000 + index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50">
                      <Icon className="h-8 w-8 text-brand-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-slate-900">
                        {step.title}
                      </h3>
                      <p className="text-sm font-medium text-brand-600 mb-3">
                        {step.subtitle}
                      </p>
                      <p className="text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">{step.metric}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                        <Clock className="h-3 w-3" />
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Professional CTA section */}
      <div className={cn(
        "mt-20 text-center transition-all duration-1000 delay-1200 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}>
        <div className="inline-flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-lg font-medium">
            <Users className="h-6 w-6" />
            <span>Trusted by leading medical institutions worldwide</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold">15,000+</div>
              <div className="text-slate-300 text-sm">Medical Students</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-slate-300 text-sm">Clinical Cases</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-slate-300 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
