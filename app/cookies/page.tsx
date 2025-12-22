"use client"

import Link from "next/link"
import { ArrowLeft, Cookie, Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-studio-50 font-sans text-slate-600 selection:bg-brand-100 selection:text-brand-900">
            {/* Navigation */}
            <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-slate-800 text-lg">
                        <div className="flex h-8 w-8 items-center justify-center">
                            <img src="https://www.medikarya.in/medikarya.svg" alt="MediKarya Logo" className="h-full w-full object-contain" />
                        </div>
                        MediKarya
                    </Link>
                    <Button asChild variant="ghost" size="sm" className="text-slate-500 hover:text-brand-600">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
                        Cookie Policy
                    </h1>
                    <p className="text-lg text-slate-600">
                        Last updated: December 10, 2025
                    </p>
                </div>

                <div className="prose prose-slate prose-lg max-w-none bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">

                    <p className="lead">
                        This Cookie Policy explains how MediKarya uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                    </p>

                    <div className="not-prose my-10 bg-brand-50 border border-brand-100 rounded-2xl p-6 flex gap-4">
                        <Cookie className="h-8 w-8 text-brand-600 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-brand-900 text-lg mb-1">What are cookies?</h3>
                            <p className="text-brand-800 text-sm">Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
                        </div>
                    </div>

                    <h3>1. Essential Cookies</h3>
                    <p>
                        These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas (like the Dashboard).
                    </p>
                    <ul>
                        <li><strong>Authentication:</strong> We use cookies to verify your account and determine when you're logged in so we can make it easier for you to access the MediKarya simulations and show you the appropriate experience and features.</li>
                        <li><strong>Security:</strong> We use cookies to help keep your account, data, and the MediKarya services safe and secure.</li>
                    </ul>

                    <h3>2. Analytics and Performance Cookies</h3>
                    <p>
                        These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                    </p>
                    <ul>
                        <li>We may use third-party analytics tools (like Vercel Analytics) to help us understand how our users use the website. These tools use cookies to collect information such as the time of visits, pages visited, and time spent on each page of the website.</li>
                    </ul>

                    <h3>3. Functionality Cookies</h3>
                    <p>
                        These cookies allow our website to remember choices you make (such as your user name, language or the region you are in) and provide enhanced, more personal features.
                    </p>

                    <Separator className="my-8" />

                    <h3>4. Managing Cookies</h3>
                    <p>
                        You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting your browser controls to block or delete cookies.
                    </p>
                    <p>
                        Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may still use our website, though your access to some functionality and areas of our website (like preserving your simulation progress) may be restricted.
                    </p>

                    <h3>5. Updates to this Policy</h3>
                    <p>
                        We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                    </p>

                    <div className="not-prose mt-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Questions?</h3>
                        <p className="text-slate-600 mb-4">
                            If you have any questions about our use of cookies or other technologies, please email us at:
                        </p>
                        <Button variant="outline" asChild>
                            <a href="mailto:medikarya.in@gmail.com">medikarya.in@gmail.com</a>
                        </Button>
                    </div>

                </div>
            </main>

            <footer className="border-t py-8 bg-white">
                <div className="container mx-auto px-4 text-center text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} MediKarya. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
