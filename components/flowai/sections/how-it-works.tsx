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
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      features: [
        "Natural language processing",
        "Contextual patient responses",
        "Comprehensive symptom analysis"
      ],
      duration: "5-8 min",
      metric: "95% realism score",
      hoverBorder: "hover:border-blue-200"
    },
    {
      title: "Diagnostic Testing",
      subtitle: "Evidence-Based Ordering",
      desc: "Order appropriate diagnostic tests and receive clinically accurate results with detailed interpretations.",
      icon: TestTube,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      features: [
        "Laboratory test selection",
        "Radiology interpretation",
        "Real-time result delivery"
      ],
      duration: "3-5 min",
      metric: "98% accuracy rate",
      hoverBorder: "hover:border-purple-200"
    },
    {
      title: "Clinical Decision Making",
      subtitle: "AI-Guided Diagnosis",
      desc: "Analyze results, formulate diagnoses, and develop comprehensive treatment plans with personalized feedback.",
      icon: FileText,
      color: "bg-green-50",
      iconColor: "text-green-600",
      features: [
        "Differential diagnosis",
        "Treatment recommendations",
        "Clinical reasoning analysis"
      ],
      duration: "7-10 min",
      metric: "92% improvement rate",
      hoverBorder: "hover:border-green-200"
    }
  ]

  return (
    <section
      ref={ref}
      id="features"
      className={cn(
        "mx-auto max-w-7xl px-4 py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50/30 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16">
        <div className={cn(
          "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 px-4 sm:px-6 py-2 text-sm font-medium text-blue-700 border border-blue-100 mb-6 transition-all duration-1000 delay-200 ease-out",
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
          <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent block mt-2">
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
                "transform transition-all duration-1000 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${1000 + index * 100}ms` }}
            >
              <div className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md ${step.hoverBorder} transition-all duration-200 hover:-translate-y-[1px] h-full flex flex-col`}>
                <div className="p-8 flex-1 flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className={`h-8 w-8 ${step.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
                        {step.title}
                      </h3>
                      <p className="text-sm font-medium text-blue-600 mb-3">
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
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
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

    </section>
  )
}
