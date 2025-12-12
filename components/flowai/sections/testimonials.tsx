"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, ArrowRight, TrendingUp, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import { motion, Variants } from "framer-motion"

export default function TestimonialsSection() {
  const anticipationQuotes = [
    {
      name: "Riya S.",
      role: "3rd Year MBBS, KEM Mumbai",
      avatar: "/placeholder-user.jpg",
      content: "I have my medicine finals in 2 months. I need something like this to practice cases without the fear of being judged by residents.",
      tag: "Needs Practice"
    },
    {
      name: "Dr. A. Verma",
      role: "Intern, AIIMS Delhi",
      avatar: "/placeholder-user.jpg",
      content: "Theory is fine, but I freeze in the ER. Joining the waitlist because I want to simulate emergencies before I face them IRL.",
      tag: "Clinical Confidence"
    },
    {
      name: "Sameer K.",
      role: "Final Year, MMC Chennai",
      avatar: "/placeholder-user.jpg",
      content: "Textbooks don't talk back. I want to see if my history-taking skills actually lead to the right diagnosis.",
      tag: "Better than Books"
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-3xl text-center mb-12">
          <motion.div variants={itemVariants} className="inline-flex justify-center w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 mb-6 hover:bg-brand-100 transition-colors">
              <TrendingUp className="h-4 w-4" />
              High Demand: 450+ Students Joined This Week
            </div>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Don't Just Read Medicine.<br />
            <span className="text-brand-600">Practice It.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-4 text-slate-600 text-base sm:text-lg px-4">
            Join hundreds of students from top institutes like <span className="font-semibold text-slate-800">AIIMS</span>, <span className="font-semibold text-slate-800">JIPMER</span>, and <span className="font-semibold text-slate-800">KEM</span> who are waiting to experience the future of clinical training.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-sm sm:max-w-xl md:max-w-2xl px-8 sm:px-0"
          >
            <CarouselContent>
              {anticipationQuotes.map((quote, index) => (
                <CarouselItem key={index} className="pt-2 pb-6">
                  <Card
                    className={cn(
                      "group relative overflow-hidden rounded-[2rem] border-0 bg-white/80 shadow-lg backdrop-blur-sm mx-1 sm:mx-2 h-full",
                      "hover:shadow-xl hover:bg-white/90 transition-all duration-500 ease-out"
                    )}
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-accent-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardContent className="relative p-6 px-4 sm:p-10 flex flex-col items-center text-center pb-10 sm:pb-14 h-full justify-between">
                      <Badge variant="secondary" className="mb-6 bg-brand-100 text-brand-700 hover:bg-brand-200 border-none">
                        Why I Joined the Waitlist
                      </Badge>

                      <blockquote className="mb-6 sm:mb-8 text-base sm:text-xl leading-relaxed text-slate-700 font-medium">
                        "{quote.content}"
                      </blockquote>

                      <div className="flex items-center gap-3 mt-auto">
                        <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                          <AvatarImage src={quote.avatar} alt={quote.name} />
                          <AvatarFallback className="bg-gradient-to-br from-brand-100 to-accent-100 text-slate-600 font-semibold text-xs">
                            {quote.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="font-semibold text-slate-900 text-sm">
                            {quote.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {quote.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12 xl:-left-16 h-10 w-10 border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-200" />
            <CarouselNext className="hidden sm:flex -right-12 xl:-right-16 h-10 w-10 border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-200" />

            {/* Mobile Navigation */}
            <div className="flex sm:hidden justify-center gap-4 mt-6">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-200" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-200" />
            </div>
          </Carousel>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-xl"
          >
            <Users className="h-4 w-4" />
            <span>Join the Waitlist</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            Limited spots available for the beta pilot.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}