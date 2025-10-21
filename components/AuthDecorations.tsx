"use client"

import React from "react"

export default function AuthDecorations() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `
            radial-gradient(800px 600px at 20% 80%, rgba(59, 130, 246, 0.05) 0%, rgba(0,0,0,0) 50%),
            radial-gradient(600px 400px at 80% 20%, rgba(20, 184, 166, 0.05) 0%, rgba(0,0,0,0) 50%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          maskImage: "radial-gradient(100% 70% at 50% 50%, rgba(0,0,0,1), rgba(0,0,0,0.1))",
        }}
      />
    </>
  )
}
