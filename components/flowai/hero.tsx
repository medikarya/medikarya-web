"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform, useSpring, Variants } from "framer-motion"
import { MouseEvent, useRef } from "react"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  // --- Mouse Tracking ---
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  // Grid Physics: Inverse movement for depth
  const gridX = useSpring(useTransform(mouseX, [0, 1000], [0, -20]), { stiffness: 50, damping: 20 })
  const gridY = useSpring(useTransform(mouseY, [0, 1000], [0, -20]), { stiffness: 50, damping: 20 })

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // --- Story Bridge Logic (Parallax Exit) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // --- Parallax & Motion Values ---
  // Adjusted ranges (0.4 -> 0.9) to keep content visible longer on mobile
  const opacity = useTransform(scrollYProgress, [0.4, 0.9], [1, 0])
  const scale = useTransform(scrollYProgress, [0.4, 0.9], [1, 0.95])
  const blur = useTransform(scrollYProgress, [0.4, 0.9], ["0px", "10px"])
  const y = useTransform(scrollYProgress, [0.4, 0.9], [0, -50])

  // Create Motion Templates at top level (Rules of Hooks)
  const blurFilter = useMotionTemplate`blur(${blur})`
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
        800px circle at ${mouseX}px ${mouseY}px,
        rgba(14, 165, 233, 0.05), 
        transparent 80%
    )
  `

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2 + 0.2,
        duration: 1.0,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  }

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      animate="visible"
      style={{ opacity, scale, filter: blurFilter, y }}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative mt-6 overflow-hidden rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-brand-900/5 px-6 py-20 sm:py-24 md:py-32 group origin-top",
        "bg-white"
      )}
    >
      {/* 1. Aurora Background (Breathing, Subtle) */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          backgroundImage: `
                        radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 60%),
                        conic-gradient(from 0deg at 50% 50%, var(--brand-50), var(--accent-50), #f0f9ff, var(--brand-50))
                    `,
          filter: "blur(60px)"
        }}
      />

      {/* 2. Interactive Spotlight (Follows Mouse) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: spotlightBackground
        }}
      />

      {/* 3. Silk Grid Physics (Moves opposite to mouse) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-50px] opacity-[0.15] mix-blend-multiply transition-transform duration-75 ease-out"
        style={{
          x: gridX,
          y: gridY,
          backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(100% 100% at 50% 30%, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">

        {/* Badge: Value Prop with Shimmer */}
        <motion.div
          variants={contentVariants}
          custom={0}
          className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 relative inline-block"
        >
          <div className="relative overflow-hidden rounded-full border border-brand-200 bg-white/60 backdrop-blur-md px-4 py-1.5 shadow-sm">
            <span className="relative z-10 text-xs font-bold tracking-wide text-brand-700 uppercase">
              AI-Powered Simulation
            </span>
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 -translate-x-full"
              animate={{ translateX: ["100%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                repeatDelay: 3,
                ease: "linear"
              }}
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)"
              }}
            />
          </div>
        </motion.div>

        {/* Headline: The Challenge */}
        <motion.h1
          variants={contentVariants}
          custom={1}
          className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl text-slate-900 mb-8 leading-[1.05]"
        >
          Gain Clinical Confidence <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600">
            Before The First Patient
          </span>
        </motion.h1>

        {/* Description: The Solution */}
        <motion.p
          variants={contentVariants}
          custom={2}
          className="text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl max-w-2xl mx-auto px-4 mb-10"
        >
          Simulate patient consults, order diagnostics, and interpret results in a risk-free environment.
          <strong className="font-semibold text-slate-800"> Bridge the gap between textbooks and the wards.</strong>
        </motion.p>

        {/* Buttons: The Action */}
        <motion.div
          variants={contentVariants}
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 mb-16"
        >
          <Button
            asChild
            size="lg"
            className={cn(
              "group rounded-full px-8 py-6 text-base font-semibold w-full sm:w-auto",
              "bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10",
              "hover:scale-[1.02] transition-all duration-300 ease-out border border-slate-800",
            )}
          >
            <Link href="/waitlist" className="flex items-center justify-center gap-2">
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium border-slate-200 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 w-full sm:w-auto hover:scale-[1.02]"
          >
            <Link href="#video-demo" aria-label="Watch MediKarya in action" className="flex items-center justify-center gap-2 text-slate-700">
              <Play className="h-4 w-4 fill-slate-700" />
              Watch Demo
            </Link>
          </Button>
        </motion.div>

        {/* Story Bridge: The Connection */}
        <motion.div
          variants={contentVariants}
          custom={4}
          className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            The Problem
          </span>
          <div className="w-px h-8 bg-slate-300 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-brand-500"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

      </div>
    </motion.section>
  )
}

export default Hero
