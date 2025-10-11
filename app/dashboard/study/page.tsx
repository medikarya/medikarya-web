"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StudyMaterials } from "@/components/dashboard/study-materials"

export default function StudyPage() {
  return (
    <DashboardLayout>
      <StudyMaterials />
    </DashboardLayout>
  )
}
