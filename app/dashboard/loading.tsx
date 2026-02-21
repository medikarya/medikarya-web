export default function DashboardLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-accent-50">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
                <p className="text-sm text-slate-500">Loading dashboard...</p>
            </div>
        </div>
    )
}
