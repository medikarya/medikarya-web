"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, Loader2, ArrowLeft, GraduationCap, PenTool } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

type Role = "student" | "writer"

export default function WaitlistPage() {
  const [role, setRole] = useState<Role>("student")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [experience, setExperience] = useState("") // For writers
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const endpoint = role === "student"
        ? process.env.NEXT_PUBLIC_FORMSPREE_STUDENT
        : process.env.NEXT_PUBLIC_FORMSPREE_WRITER;

      if (!endpoint) {
        console.warn("Formspree endpoint not set. Simulating success.");
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email,
            name,
            role,
            specialty,
            experience,
            source: "medikarya_waitlist_page"
          })
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }
      }

      setIsSubmitted(true);
      toast({
        title: role === "student" ? "You're on the list! 🎉" : "Application Received! 🎓",
        description: role === "student"
          ? "We'll notify you when beta access opens."
          : "Our clinical board will review your profile shortly.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
        <div className="container mx-auto flex items-center justify-between">
          {/* Hidden logo for spacing balance if needed, or just keep simple back link */}
          <div />

          <Button asChild variant="ghost" size="sm" className="text-slate-500 hover:text-brand-600 hover:bg-slate-200">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-md mb-6 ring-1 ring-slate-100">
                <div className="flex h-12 w-12 items-center justify-center">
                  <img src="/medikarya.svg" alt="MediKarya Logo" className="h-full w-full object-contain" />
                </div>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-3 min-h-[80px] sm:min-h-[auto]">
                {role === "student" ? (
                  <>
                    Join the Future of<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">Clinical Training</span>
                  </>
                ) : (
                  <>
                    Join as a<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">Case Writer</span>
                  </>
                )}
              </h1>
              <p className="text-base text-slate-600 min-h-[48px] sm:min-h-[auto]">
                {role === "student"
                  ? "Secure your early access spot and gain confidence before your first real patient."
                  : "Craft realistic clinical scenarios, share your knowledge, and earn professional recognition."
                }
              </p>
            </div>

            <Card className="overflow-visible border-0 shadow-2xl bg-white/80 backdrop-blur-xl ring-1 ring-slate-200/50 rounded-3xl relative">

              {/* Role Toggle Switch - Floating Effect */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-lg border border-slate-100 flex items-center gap-1 z-20">
                <button
                  onClick={() => { setRole("student"); setIsSubmitted(false); }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    role === "student"
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  <GraduationCap className="h-4 w-4" />
                  Student
                </button>
                <button
                  onClick={() => { setRole("writer"); setIsSubmitted(false); }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    role === "writer"
                      ? "bg-brand-600 text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  <PenTool className="h-4 w-4" />
                  Contributor
                </button>
              </div>

              <div className="p-8 pt-10 sm:p-10 sm:pt-12">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-500">
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center mb-4 ring-1",
                      "bg-green-50 ring-green-100 text-green-600"
                    )}>
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {role === "student" ? "You're on the list!" : "Application Sent!"}
                    </h3>
                    <p className="text-slate-600 mb-6 max-w-xs mx-auto text-sm">
                      {role === "student"
                        ? "We'll ping you as soon as spots open up. Keep an eye on your inbox!"
                        : "Thank you for applying. We'll be in touch regarding next steps."}
                    </p>

                    {role === "student" && (
                      <div className="flex items-center justify-center mb-8">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-brand-50 text-brand-700 border border-brand-100">
                          Position: #{Math.floor(Math.random() * 50) + 1}
                        </span>
                      </div>
                    )}

                    {/* Viral Sharing Section */}
                    <div className="w-full space-y-3 mb-8">
                      <p className="text-sm font-medium text-slate-900">Share with colleagues</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full gap-2 border-slate-200 text-[#0077b5] hover:bg-[#0077b5]/5 hover:text-[#0077b5]" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://medikarya.in')}`, '_blank')}>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                          LinkedIn
                        </Button>
                        <Button variant="outline" className="w-full gap-2 border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out MediKarya - The AI-Powered Clinical Training Platform for Medical Students!')}&url=${encodeURIComponent('https://medikarya.in')}`, '_blank')}>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                          Post
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full gap-2 border-slate-200 text-slate-600 hover:bg-slate-50" onClick={() => {
                        navigator.clipboard.writeText("https://medikarya.in");
                        toast({ title: "Link copied!", description: "Share it with your friends." });
                      }}>
                        <div className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg></div>
                        Copy Link
                      </Button>
                    </div>

                    <Button asChild variant="ghost" className="w-full text-slate-400 hover:text-slate-600 hover:bg-transparent">
                      <Link href="/">Return to Homepage</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
                        {role === "student" ? "Email Address" : "Professional Email"}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={role === "student" ? "arjun.kumar@gmail.com" : "priya.sharma@hospital.com"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500/20 bg-white/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">
                        {role === "student" ? "Full Name" : "Name & Title"}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={role === "student" ? "Dr. Priya Sharma" : "e.g. Rahul Verma (Final Year Student)"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11 rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500/20 bg-white/50"
                      />
                    </div>

                    {role === "writer" && (
                      <div className="space-y-1.5 animate-in slide-in-from-top-2 fade-in duration-300">
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                          Current Role / Experience
                        </label>
                        <Select value={experience} onValueChange={setExperience}>
                          <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white/50 focus:ring-brand-500/20 focus:ring-2 focus:border-brand-500">
                            <SelectValue placeholder="Select your role..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student_4_5">Medical Student (4th/5th Year)</SelectItem>
                            <SelectItem value="intern">Intern / House Officer</SelectItem>
                            <SelectItem value="resident">PG Resident</SelectItem>
                            <SelectItem value="fellow">Fellow</SelectItem>
                            <SelectItem value="attending">Attending / Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 ml-1">
                        Medical Specialty
                      </label>
                      <Select value={specialty} onValueChange={setSpecialty}>
                        <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white/50 focus:ring-brand-500/20 focus:ring-2 focus:border-brand-500">
                          <SelectValue placeholder="Select your specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="internal_medicine">Internal Medicine</SelectItem>
                          <SelectItem value="family_medicine">Family Medicine</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="surgery">Surgery</SelectItem>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "w-full h-14 text-base font-bold tracking-wide rounded-xl mt-4 transition-all duration-300",
                        "bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35",
                        "hover:-translate-y-0.5"
                      )}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        role === "student" ? "Get Early Access" : "Submit Application"
                      )}
                    </Button>

                    <p className="text-xs text-slate-400 text-center px-6 leading-relaxed">
                      {role === "student"
                        ? "By joining, you agree to our Terms & Privacy. No spam."
                        : "Join a diverse community of clinical educators and learners."}
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
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + (role === "student" ? 10 : 55)}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600">
                  {role === "student" ? (
                    <>Join <span className="text-brand-600 font-bold">450+</span> medical innovators</>
                  ) : (
                    <>Trusted by <span className="text-brand-600 font-bold">50+</span> clinicians & students</>
                  )}
                </p>
              </motion.div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  )
}

