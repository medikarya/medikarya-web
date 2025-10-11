"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/lib/scroll-animation"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()
  const router = useRouter()
  const { ref, isVisible } = useScrollAnimation()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match. Please try again.",
        variant: "destructive"
      })
      return
    }
    toast({ title: "Account created", description: "You're all set. Welcome to FlowAI!" })
    router.push("/")
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Background decorative elements */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `
            radial-gradient(800px 600px at 20% 80%, rgba(59, 130, 246, 0.05) 0%, rgba(0,0,0,0) 50%),
            radial-gradient(600px 400px at 80% 20%, rgba(20, 184, 166, 0.05) 0%, rgba(0,0,0,0) 50%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          maskImage: "radial-gradient(100% 70% at 50% 50%, rgba(0,0,0,1), rgba(0,0,0,0.1))",
        }}
      />

      <div className="relative w-full max-w-md">
        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden rounded-3xl border bg-white/80 shadow-xl backdrop-blur-md p-8 transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-600 shadow-lg">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM9 4.5L4 8v8.5h12V8l-5-3.5L9 4.5z" clipRule="evenodd" />
                <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M10 12a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Join FlowAI</h1>
            <p className="text-sm text-slate-600">Start your journey in AI-powered medical education</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-blue-400 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                className="rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-blue-400 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
                className="rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-blue-400 transition-all duration-200"
              />
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full rounded-xl py-6 text-sm font-medium",
                "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg",
                "hover:shadow-xl transition-all duration-200"
              )}
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
