"use client"

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

export function SmoothScroller({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    useLayoutEffect(() => {
        // Initialize Lenis with "heavy" premium feel
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}
