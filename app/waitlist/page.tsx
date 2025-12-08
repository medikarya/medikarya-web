"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Check, Loader2, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address to join the waitlist.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))

      // In a real app, you would send this data to your backend
      console.log({ email, name, specialty })

      setIsSubmitted(true)
      toast({
        title: "You're on the list! 🎉",
        description: "We'll notify you when we launch. Get ready to transform your clinical education!",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-brand-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-accent-200/20 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <header className="absolute top-0 left-0 w-full p-6 z-20">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10 py-6 sm:py-10">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-md mb-4 ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden bg-brand-50">
                  <img src="/medikarya.svg" alt="MediKarya Logo" className="h-full w-full object-cover" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-3">
                Join the Future of<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">Clinical Training</span>
              </h1>
              <p className="text-base text-slate-600">
                Secure your early access spot and gain confidence before your first real patient.
              </p>
            </div>

            <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-xl ring-1 ring-slate-200/50 rounded-3xl">
              <div className="p-6 sm:p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 ring-1 ring-green-100">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">You're on the list!</h3>
                    <p className="text-slate-600 mb-6 max-w-xs mx-auto text-sm">
                      We'll ping you as soon as spots open up. Keep an eye on your inbox!
                    </p>
                    <div className="flex items-center justify-center mb-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-brand-50 text-brand-700 border border-brand-100">
                        Position: #{Math.floor(Math.random() * 50) + 1}
                      </span>
                    </div>
                    <Button asChild variant="outline" className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 h-11 rounded-xl">
                      <Link href="/">Return to Homepage</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="doctor@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500/20 bg-white/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Dr. Jane Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11 rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500/20 bg-white/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="specialty" className="text-sm font-semibold text-slate-700 ml-1">
                        Medical Specialty
                      </label>
                      <div className="relative">
                        <select
                          id="specialty"
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white/50 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select your specialty</option>
                          <option value="internal_medicine">Internal Medicine</option>
                          <option value="family_medicine">Family Medicine</option>
                          <option value="pediatrics">Pediatrics</option>
                          <option value="surgery">Surgery</option>
                          <option value="cardiology">Cardiology</option>
                          <option value="neurology">Neurology</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "w-full h-14 text-base font-bold tracking-wide rounded-xl mt-4",
                        "bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700",
                        "shadow-lg shadow-brand-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/35 hover:-translate-y-0.5",
                      )}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Just a moment...
                        </>
                      ) : (
                        "Get Early Access"
                      )}
                    </Button>

                    <p className="text-xs text-slate-400 text-center px-6 leading-relaxed">
                      By joining, you agree to our Terms & Privacy. No spam, just updates.
                    </p>
                  </form>
                )}
              </div>
            </Card>

            {/* Social Proof Footer */}
            {!isSubmitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center justify-center space-x-3"
              >
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-50 bg-slate-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600">
                  Join <span className="text-brand-600 font-bold">450+</span> medical innovators
                </p>
              </motion.div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  )
}
