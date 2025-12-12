import { Navbar } from "@/components/flowai/navbar"
import { Footer } from "@/components/flowai/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function BlogPage() {
    return (
        <main className="min-h-screen flex flex-col bg-slate-50">
            <div className="flex-1 relative">
                {/* Gradient Background */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50" />

                <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
                    <Navbar />

                    <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center space-y-8 min-h-[60vh]">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-800 animate-pulse">
                            <BookOpen className="w-4 h-4" />
                            <span>Coming Soon</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl max-w-3xl">
                            MediKarya <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">Insights</span>
                        </h1>

                        <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
                            We're curating deep dives into clinical reasoning, AI-driven medical education, and the future of healthcare simulation.
                        </p>

                        <div className="flex gap-4">
                            <Button asChild size="lg" variant="outline" className="rounded-full">
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                                </Link>
                            </Button>
                            <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                                <Link href="/waitlist">
                                    Notify Me
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
