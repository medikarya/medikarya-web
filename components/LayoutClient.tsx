"use client"

import { AppWrapper } from "./ClientLayout"

interface LayoutClientProps {
  children: React.ReactNode
}

export function LayoutClient({ children }: LayoutClientProps) {
  return <AppWrapper>{children}</AppWrapper>
}
