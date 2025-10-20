"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function Navbar() {
  return (
    <header>
      <nav
        className={cn(
          "mx-auto mt-2 flex items-center justify-between gap-3",
          "rounded-full border bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md",
          "dark:bg-black/30",
        )}
        aria-label="Primary"
      >
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-teal-600 text-white text-xs font-semibold shadow-lg">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM9 4.5L4 8v8.5h12V8l-5-3.5L9 4.5z" clipRule="evenodd" />
              <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M10 12a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-semibold text-slate-800">MediKarya</span>
        </div>

        <ul className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <li>
            <Link href="#features" className="transition-colors hover:text-foreground">
              Features
            </Link>
          </li>
          <li>
            <Link href="#how-it-works" className="transition-colors hover:text-foreground">
              How it Works
            </Link>
          </li>
          <li>
            <Link href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <SignedOut>
            <Link
              href="/login"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline"
            >
              Login
            </Link>
            <Button
              asChild
              size="sm"
              className={cn(
                "rounded-full px-4",
                "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white",
                "shadow-lg hover:shadow-xl transition-all duration-200",
              )}
            >
              <Link href="/signup" aria-label="Try MediKarya for free">
                <span className="mr-1">Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
