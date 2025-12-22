"use client"

import { useRef, MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    strength?: number // How strong the pull is (default 0.5)
}

export function MagneticButton({ children, className, strength = 0.5 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Use motion values instead of state to avoid re-renders
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Smooth spring animation for the movement
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)

    const handleMouse = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 }

        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        x.set(middleX * strength)
        y.set(middleY * strength)
    }

    const reset = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x: xSpring, y: ySpring }}
            className={cn("", className)}
        >
            {children}
        </motion.div>
    )
}
