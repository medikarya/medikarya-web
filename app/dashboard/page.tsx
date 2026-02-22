import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardOverview } from "../../components/dashboard/dashboard-overview"

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
