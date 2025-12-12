import { Navbar } from "@/components/flowai/navbar"
import { Footer } from "@/components/flowai/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen flex flex-col bg-slate-50">
            <div className="flex-1 relative">
                {/* Gradient Background */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />

                <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
                    <Navbar />

                    <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center space-y-8 min-h-[60vh]">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-800 animate-pulse">
                            <FileText className="w-4 h-4" />
                            <span>Library Updating</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl max-w-3xl">
                            Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Case Studies</span>
                        </h1>

                        <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
                            Explore our comprehensive library of AI-simulated patient scenarios, from common presentations to rare clinical zebras.
                        </p>

                        <div className="flex gap-4">
                            <Button asChild size="lg" variant="outline" className="rounded-full">
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                                </Link>
                            </Button>
                            <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                                <Link href="/dashboard">
                                    Try Demo Cases
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
