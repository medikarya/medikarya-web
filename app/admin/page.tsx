import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { supabaseServer } from "@/lib/supabase/server"
import { approveUser, revokeUser } from "./actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Users } from "lucide-react"

// Always re-run — never cache. Approve/revoke actions must reflect immediately.
export const dynamic = "force-dynamic"

export default async function AdminPage() {
    const { userId } = await auth()

    if (!userId || userId !== process.env.ADMIN_CLERK_USER_ID) {
        redirect("/")
    }

    const { data: users, error } = await supabaseServer
        .from("beta_users")
        .select("id, name, email, approved, created_at, clerk_user_id")
        .order("created_at", { ascending: false })

    const approved = users?.filter(u => u.approved).length ?? 0
    const pending = users?.filter(u => !u.approved).length ?? 0

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
                        <p className="text-sm text-slate-500 mt-0.5">Manage beta user access</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="font-medium">{users?.length ?? 0}</span> total
                        </div>
                        <div className="flex items-center gap-1.5 text-sm bg-green-50 border border-green-200 text-green-700 rounded-lg px-3 py-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            {approved} approved
                        </div>
                        <div className="flex items-center gap-1.5 text-sm bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-3 py-1.5">
                            <Clock className="h-4 w-4" />
                            {pending} pending
                        </div>
                    </div>
                </div>

                {/* Error state */}
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        Failed to load users: {error.message}
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide">Name</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide">Email</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide">Joined</th>
                                <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide">Status</th>
                                <th className="text-right px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {!users?.length && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-10 text-center text-slate-400 text-sm">
                                        No users yet
                                    </td>
                                </tr>
                            )}
                            {users?.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-5 py-4 font-medium text-slate-900">{user.name || "—"}</td>
                                    <td className="px-5 py-4 text-slate-500">{user.email || "—"}</td>
                                    <td className="px-5 py-4 text-slate-400 text-xs">
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleDateString("en-IN", {
                                                day: "numeric", month: "short", year: "numeric"
                                            })
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-4">
                                        {user.approved ? (
                                            <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50">
                                                Approved
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50">
                                                Pending
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        {user.approved ? (
                                            <form action={revokeUser.bind(null, user.id)}>
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer text-xs h-8"
                                                >
                                                    Revoke
                                                </Button>
                                            </form>
                                        ) : (
                                            <form action={approveUser.bind(null, user.id)}>
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white cursor-pointer text-xs h-8"
                                                >
                                                    Approve
                                                </Button>
                                            </form>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-xs text-slate-400 text-center">
                    Accessible only to the admin account · medikarya.in/admin
                </p>
            </div>
        </div>
    )
}
