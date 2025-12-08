"use client"

import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/lib/scroll-animation"
import { AlertCircle, Clock, Users, BookOpen, AlertTriangle } from "lucide-react"

export default function ProblemsSection() {
    const { ref, isVisible } = useScrollAnimation()

    const problems = [
        {
            title: "Limited Clinical Exposure",
            description: "Medical students often struggle to encounter a wide enough variety of patient cases during clinical rotations, leaving gaps in their preparedness.",
            icon: Users,
            color: "bg-orange-50",
            iconColor: "text-orange-600",
            borderColor: "border-orange-100"
        },
        {
            title: "Fragmented Feedback",
            description: "Traditional training methods frequently lack immediate, personalized feedback, making it difficult for students to correct mistakes in real-time.",
            icon: AlertCircle,
            color: "bg-red-50",
            iconColor: "text-red-600",
            borderColor: "border-red-100"
        },
        {
            title: "Resource Constraints",
            description: "High-fidelity simulation centers are expensive, space-constrained, and require significant staffing, limiting student access and practice time.",
            icon: Clock,
            color: "bg-amber-50",
            iconColor: "text-amber-600",
            borderColor: "border-amber-100"
        }
    ]

    return (
        <section
            ref={ref}
            className={cn(
                "mx-auto max-w-7xl px-4 py-16 sm:py-24 transition-all duration-1000 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
        >
            <div className="mx-auto max-w-3xl text-center mb-16">
                <div className={cn(
                    "inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-700 mb-6 transition-all duration-1000 delay-200 ease-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <AlertTriangle className="h-4 w-4" />
                    The Challenge
                </div>
                <h2 className={cn(
                    "text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6 transition-all duration-1000 delay-400 ease-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    Traditional Medical Training <br className="hidden sm:block" />
                    <span className="text-slate-500">Has Hits Its Limits</span>
                </h2>
                <p className={cn(
                    "text-lg text-slate-600 leading-relaxed transition-all duration-1000 delay-600 ease-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    While clinical rotations are essential, they face growing challenges in providing consistent, high-quality training experiences for every student.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {problems.map((problem, index) => {
                    const Icon = problem.icon
                    return (
                        <div
                            key={problem.title}
                            className={cn(
                                "transition-all duration-1000 ease-out",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${800 + index * 100}ms` }}
                        >
                            <div className={cn(
                                "relative group h-full flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-[1px]",
                                problem.borderColor
                            )}>
                                <div className={cn(
                                    "inline-flex h-12 w-12 items-center justify-center rounded-xl mb-6 transition-transform duration-300 group-hover:scale-105",
                                    problem.color
                                )}>
                                    <Icon className={cn("h-6 w-6", problem.iconColor)} />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    {problem.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed flex-1">
                                    {problem.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
