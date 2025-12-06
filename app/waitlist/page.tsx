"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Loader2, Stethoscope, HeartPulse, Brain, Pill, Syringe, Microscope } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Medical Icons Floating in Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const icons = [HeartPulse, Brain, Pill, Syringe, Stethoscope, Microscope];
          const Icon = icons[i % icons.length];
          const size = Math.random() * 40 + 20;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const rotation = Math.random() * 360;
          const delay = Math.random() * 5;
          const duration = 10 + Math.random() * 20;
          
          return (
            <motion.div
              key={i}
              className="absolute text-blue-200"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: rotation,
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
              }}
            >
              <Icon className="w-full h-full" />
            </motion.div>
          );
        })}
      </div>
      
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm shadow-lg mb-6 border border-blue-100">
              <Stethoscope className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600">
              Join Our Waitlist
            </h1>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl opacity-30 blur-md"></div>
              <p className="relative text-lg text-gray-800 bg-white/80 backdrop-blur-sm px-8 py-5 rounded-lg border border-blue-100 shadow-md">
                Be among the first to experience our AI-powered clinical education platform. 
                <span className="block mt-2 font-semibold text-blue-700">Limited spots available for our early access program.</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <Card className="overflow-hidden border-2 border-blue-100 shadow-2xl bg-white/90 backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:border-blue-200">
              <div className="p-8 md:p-10">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-teal-200/30 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-40 h-40 bg-blue-200/30 rounded-full filter blur-3xl"></div>
                <div className="relative z-10">
                  {isSubmitted ? (
                    <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-xl border border-blue-100 mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">You're on the list! 🎉</h3>
                        <p className="text-gray-700 mb-4">
                          Thank you for joining our waitlist. We'll notify you as soon as we're ready to launch.
                        </p>
                        <div className="flex items-center justify-center">
                          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                            Position: #{Math.floor(Math.random() * 50) + 1} in line
                          </div>
                        </div>
                      </div>
                      <Button asChild className="mt-4">
                        <Link href="/">Back to Home</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Join the Waitlist</h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Dr. Jane Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="specialty" className="text-sm font-medium text-gray-700">
                            Medical Specialty (Optional)
                          </label>
                          <select
                            id="specialty"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                        
                        <div className="mt-8">
                          <div className="relative group">
                            {/* Glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl opacity-70 blur group-hover:opacity-90 transition duration-300"></div>
                            
                            {/* Main button */}
                            <Button 
                              type="submit"
                              disabled={isLoading}
                              className={cn(
                                "relative w-full h-16 text-lg font-bold tracking-wide rounded-xl",
                                "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700",
                                "transform transition-all duration-300 shadow-xl hover:shadow-2xl",
                                "text-white flex items-center justify-center space-x-2 group",
                                "border-2 border-white/20 overflow-hidden"
                              )}
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                  <span>Securing Your Spot...</span>
                                </>
                              ) : (
                                <>
                                  <span>Join the Waitlist</span>
                                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                                    →
                                  </span>
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
                            <div className="flex -space-x-2">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <div 
                                  key={i}
                                  className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-700"
                                  style={{
                                    zIndex: 5 - i,
                                    transform: `translateX(${i * -2}px)`,
                                  }}
                                >
                                  {i === 5 ? '+' : ''}
                                </div>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              <span className="font-semibold text-blue-700">{Math.floor(Math.random() * 500) + 200}+</span> medical professionals already joined
                            </span>
                          </div>
                        </div>
                      </form>
                      
                      <p className="mt-4 text-xs text-gray-500 text-center">
                        By joining, you agree to our{' '}
                        <a href="#" className="text-blue-600 hover:underline">Terms</a> and{' '}
                        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 p-6 text-center shadow-lg"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
              <HeartPulse className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2 text-lg">Have questions about our medical platform?</h3>
            <p className="text-gray-700 mb-4">Our medical education specialists are here to help.
              <a href="mailto:support@medikarya.com" className="text-blue-600 hover:underline block mt-2">
                support@medikarya.com
              </a>
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors" aria-label="Follow us on Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors" aria-label="Connect on LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-red-500 hover:text-red-700 transition-colors" aria-label="Subscribe on YouTube">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
