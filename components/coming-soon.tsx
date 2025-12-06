"use client"

import { Construction, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function ComingSoon() {
    const router = useRouter()

    return (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center p-4">
            <Card className="relative w-full max-w-md overflow-hidden border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-emerald-500/10" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 p-4 ring-1 ring-white/20 shadow-lg shadow-blue-500/20">
                        <Construction className="h-12 w-12 text-blue-400" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            Coming Soon
                        </h2>
                        <p className="text-muted-foreground">
                            We're working hard to bring you this feature. Stay tuned for updates!
                        </p>
                    </div>
                    <Button
                        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 px-8 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                        onClick={() => router.back()}
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Go Back
                    </Button>
                </div>
            </Card>
        </div>
    )
}
