"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(true) // Start as visible by default
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set visible after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { ref, isVisible }
}
