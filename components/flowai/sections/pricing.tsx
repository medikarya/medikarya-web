"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/lib/scroll-animation"
import { cn } from "@/lib/utils"

import { motion, Variants } from "framer-motion"

export default function PricingSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slightly slower stagger for cinematic feel
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
    <section id="pricing" className="bg-slate-50 py-24 sm:py-32 overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose Your Plan
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-slate-600">
            Start free. Scale as your medical education needs grow.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Plan title="Student" price="Free" features={["5 Practice Runs/month", "Common Clinical Cases", "Community support"]} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Plan
              title="Medical Student"
              price="₹1,299"
              highlight
              features={["Unlimited Practice Runs", "Complex & Rare Cases", "Detailed Feedback Reports", "Priority Support"]}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Plan
              title="Institution"
              price="Custom"
              features={["Everything in Pro", "Bulk Student Access", "Custom Case Creation", "Analytics Dashboard", "Dedicated Support"]}
              contact
            />
          </motion.div>
        </motion.div>
      </motion.div>
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
          <Link href={contact ? "/contact" : "/waitlist"} className="flex items-center justify-center gap-2">
            {contact ? "Contact Us" : "Join Waitlist"}
            {!contact && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}