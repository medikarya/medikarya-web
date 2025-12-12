"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Mail, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { motion, Variants } from "framer-motion"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setEmail("")
      setIsLoading(false)
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest medical education insights and platform updates.",
      })
    }, 1000)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  if (isSubscribed) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-brand-50/50 to-accent-50/50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-brand-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2 text-slate-900">Welcome to MediKarya Updates!</h2>
              <p className="text-slate-600 mb-4">
                You're now subscribed to our newsletter. Expect monthly insights on medical education,
                new platform features, and clinical training tips.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSubscribed(false)}
                className="rounded-full border-brand-200 text-brand-600 hover:bg-brand-50"
              >
                Subscribe Another Email
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Card className="rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-brand-50/50 to-accent-50/50 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center">
              <motion.div
                className="mb-4 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-accent-100"
                variants={contentVariants}
              >
                <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-brand-600" />
              </motion.div>

              <motion.h2 variants={contentVariants} className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 text-slate-900">
                Stay Updated with Medical Education Insights
              </motion.h2>

              <motion.p variants={contentVariants} className="text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4">
                Join thousands of medical students and educators who receive our monthly newsletter
                featuring new patient cases, clinical reasoning tips, platform updates, and insights
                from leading medical professionals.
              </motion.p>

              <motion.form variants={contentVariants} onSubmit={handleSubscribe} className="mx-auto flex flex-col sm:flex-row max-w-md gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-full border-slate-200 focus:border-brand-300 focus:ring-brand-200 flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group rounded-full bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 px-6 shadow-lg hover:shadow-brand-500/25 transition-all duration-200 whitespace-nowrap"
                >
                  {isLoading ? "Subscribing..." : (
                    <span className="flex items-center gap-2">
                      Subscribe
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </motion.form>

              <motion.p variants={contentVariants} className="text-xs text-slate-500 mt-4 px-4">
                We respect your privacy. Unsubscribe at any time.
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
