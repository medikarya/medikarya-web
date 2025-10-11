"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { LearningProgress } from "@/components/dashboard/progress"

export default function ProgressPage() {
  return (
    <DashboardLayout>
      <LearningProgress />
    </DashboardLayout>
  )
}
