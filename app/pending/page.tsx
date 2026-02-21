import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function PendingPage() {
    const { userId } = await auth()

    // If not logged in at all, push to login
    if (!userId) {
        redirect("/login")
    }

    const user = await currentUser()
    const email = user?.primaryEmailAddress?.emailAddress
    const name = user?.firstName
        ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`
        : email ?? "there"

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30 flex flex-col items-center justify-center px-4">
            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-80 h-80 bg-brand-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-200/15 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md text-center space-y-6">
                {/* Logo */}
                <div className="flex justify-center mb-2">
                    <div className="h-14 w-14 flex items-center justify-center">
                        <img
                            src="https://www.medikarya.in/medikarya.svg"
                            alt="MediKarya"
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>

                {/* Status icon */}
                <div className="flex justify-center">
                    <div className="h-20 w-20 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shadow-sm">
                        <Clock className="h-10 w-10 text-amber-500" />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Access pending approval
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Hi {name}, your account is in our review queue. We&apos;ll notify
                        you as soon as access is granted.
                    </p>
                </div>

                {/* Email pill */}
                {email && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm">
                        <Mail className="h-4 w-4" />
                        {email}
                    </div>
                )}

                {/* Info box */}
                <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-left space-y-2 shadow-sm">
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                        What happens next?
                    </p>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-brand-100 text-brand-600 text-xs flex items-center justify-center font-bold">1</span>
                            Our team reviews your account (usually within 24–48 hrs)
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-brand-100 text-brand-600 text-xs flex items-center justify-center font-bold">2</span>
                            You&apos;ll receive an email when access is granted
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-brand-100 text-brand-600 text-xs flex items-center justify-center font-bold">3</span>
                            Sign back in and start practising cases
                        </li>
                    </ul>
                </div>

                {/* Sign out */}
                <SignOutButton redirectUrl="/">
                    <Button
                        variant="outline"
                        className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                        Sign out
                    </Button>
                </SignOutButton>
            </div>
        </div>
    )
}
