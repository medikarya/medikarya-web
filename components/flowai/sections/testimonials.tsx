"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, ArrowRight } from "lucide-react"
import { useScrollAnimation } from "@/lib/scroll-animation"
import { cn } from "@/lib/utils"

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation()

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Medical Student, Stanford University",
      avatar: "/placeholder-user.jpg",
      content: "MediKarya has revolutionized my clinical training. The AI patient simulations are incredibly realistic and have helped me develop better diagnostic skills before working with real patients.",
      rating: 5
    },
    {
      name: "Prof. Michael Rodriguez",
      role: "Professor of Medicine, UCLA",
      avatar: "/placeholder-user.jpg",
      content: "As an educator, I've seen remarkable improvement in my students' clinical reasoning abilities after using MediKarya. The personalized feedback system is exceptional.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Resident Physician, JohnsHopkins",
      avatar: "/placeholder-user.jpg",
      content: "The variety of patient cases and realistic scenarios in MediKarya prepared me better for residency than any textbook could. Highly recommend to all medical students.",
      rating: 5
    },
    {
      name: "Dr. James Park",
      role: "Medical Student, Harvard Medical School",
      avatar: "/placeholder-user.jpg",
      content: "The AI feedback is incredibly detailed and helpful. It's like having a personal clinical instructor available 24/7. This platform is a game-changer for medical education.",
      rating: 5
    },
    {
      name: "Dr. Lisa Thompson",
      role: "Clinical Instructor, Mayo Clinic",
      avatar: "/placeholder-user.jpg",
      content: "MediKarya's test ordering and result interpretation features provide students with invaluable hands-on experience in a safe, controlled environment.",
      rating: 5
    },
    {
      name: "Dr. Robert Kim",
      role: "Medical Student, University of Pennsylvania",
      avatar: "/placeholder-user.jpg",
      content: "The platform's ability to simulate complex patient interactions and provide immediate feedback has significantly boosted my confidence in clinical decision-making.",
      rating: 5
    }
  ]

  return (
    <section
      ref={ref}
      className={cn(
        "mx-auto max-w-7xl px-4 py-16 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h2 className={cn(
          "text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl transition-all duration-1000 delay-200 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          What Medical Professionals Say
        </h2>
        <p className={cn(
          "mt-4 text-slate-600 text-base sm:text-lg px-4 transition-all duration-1000 delay-400 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Trusted by medical students and educators worldwide for advancing clinical education through AI-powered simulations.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className={cn(
        "grid gap-6 sm:gap-8 transition-all duration-1000 delay-600 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        // Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
        "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      )}>
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className={cn(
              "group relative overflow-hidden rounded-3xl border-0 bg-white/80 shadow-lg backdrop-blur-sm",
              "hover:shadow-xl hover:bg-white/90 transition-all duration-500 ease-out",
              "hover:-translate-y-[2px]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{
              transitionDelay: `${800 + index * 100}ms`,
              background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)`
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardContent className="relative p-6 sm:p-8">
              {/* Quote icon */}
              <div className="mb-4 flex justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-lg">
                  <Quote className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Rating stars */}
              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400 transition-all duration-300 group-hover:scale-110"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              {/* Testimonial content */}
              <blockquote className="mb-6 text-sm sm:text-base leading-relaxed text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                "{testimonial.content}"
              </blockquote>

              {/* Author info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg transition-all duration-300 group-hover:ring-blue-200 group-hover:scale-105">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-teal-100 text-slate-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-400 ring-2 ring-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 truncate">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 blur-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className={cn(
        "mt-12 text-center transition-all duration-1000 delay-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <p className="text-slate-600 text-sm sm:text-base mb-4">
          Join thousands of medical professionals already using MediKarya
        </p>
        <div className="group inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
          <span>Read more success stories</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </section>
  )
}
