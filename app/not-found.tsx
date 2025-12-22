import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 shadow-sm dark:bg-brand-900/20">
                <FileQuestion className="h-10 w-10 text-brand-600 dark:text-brand-400" />
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Page not found
            </h1>

            <p className="mb-8 max-w-md text-lg text-muted-foreground">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        </div>
    )
}
