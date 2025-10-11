"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardOverview } from "../../components/dashboard/dashboard-overview"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
