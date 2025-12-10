"use client"

import Link from "next/link"
import { ArrowLeft, Lock, Eye, Database, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-studio-50 font-sans text-slate-600 selection:bg-brand-100 selection:text-brand-900">
            {/* Navigation */}
            <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-slate-800 text-lg">
                        <div className="flex h-8 w-8 items-center justify-center">
                            <img src="/medikarya.svg" alt="MediKarya Logo" className="h-full w-full object-contain" />
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
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-slate-600">
                        Last updated: December 10, 2025
                    </p>
                </div>

                <div className="prose prose-slate prose-lg max-w-none bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">

                    <p className="lead">
                        At MediKarya, we are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data when you visit our website or use our simulation platform.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 not-prose my-10">
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <Database className="h-6 w-6 text-brand-600 mb-3" />
                            <h4 className="font-bold text-slate-900 mb-2">What We Collect</h4>
                            <p className="text-sm text-slate-600">Email addresses, professional details (Role, Specialty), and usage data regarding your simulation performance.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <Lock className="h-6 w-6 text-brand-600 mb-3" />
                            <h4 className="font-bold text-slate-900 mb-2">How We Protect It</h4>
                            <p className="text-sm text-slate-600">We use industry-standard encryption and security measures. We never sell your data to third parties.</p>
                        </div>
                    </div>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information (like joining our Waitlist), or otherwise when you contact us.
                    </p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, job title, medical specialty, and years of experience.</li>
                        <li><strong>Simulation Data:</strong> Performance metrics, diagnosis accuracy, and learning progress logs generated while using the platform.</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                        We use the information we collect or receive:
                    </p>
                    <ul>
                        <li>To facilitate account creation and logon process.</li>
                        <li>To send you administrative information (waitlist status, product updates).</li>
                        <li>To personalize your educational experience (suggesting relevant cases).</li>
                        <li>To improve our AI models and simulation accuracy (using anonymized aggregate data).</li>
                    </ul>

                    <h3>3. Data Sharing</h3>
                    <p>
                        We do <strong>not</strong> share, sell, rent, or trade your information with third parties for their promotional purposes. We may share data with trusted service providers (like hosting or email delivery services) who are bound by confidentiality agreements.
                    </p>

                    <h3>4. Security of Your Information</h3>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. However, please remember that no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
                    </p>

                    <Separator className="my-8" />

                    <h3>5. Your Privacy Rights</h3>
                    <p>
                        Depending on your location, you may have rights to request access to, correction of, or deletion of your personal information. You can contact us at any time to exercise these rights.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        If you have questions or comments about this policy, you may email us at <a href="mailto:medikarya.in@gmail.com">medikarya.in@gmail.com</a>.
                    </p>

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
