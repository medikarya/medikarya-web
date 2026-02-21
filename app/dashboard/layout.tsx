import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { supabaseServer } from "@/lib/supabase/server"

export default async function DashboardRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()

    if (!userId) {
        redirect("/login")
    }

    // Fetch Clerk user to get name + email for the upsert
    const user = await currentUser()

    // Use null (not "") for missing email — empty string conflicts with UNIQUE(email)
    // if multiple users have no email set (e.g. phone-auth accounts).
    const email = user?.primaryEmailAddress?.emailAddress ?? null

    const name = user?.firstName
        ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`.trim()
        : email?.split("@")[0] ?? "Unknown"

    // Upsert: creates row for new users, no-ops if clerk_user_id already exists.
    // ignoreDuplicates:true prevents overwriting approved=true on returning users.
    const { error: upsertError } = await supabaseServer
        .from("beta_users")
        .upsert(
            {
                clerk_user_id: userId,
                name,
                email,
                approved: false,
            },
            { onConflict: "clerk_user_id", ignoreDuplicates: true }
        )

    if (upsertError) {
        // Log so we can catch issues (constraint violations, network errors, etc.)
        console.error("[beta_users upsert error]", upsertError.message, { userId, email })
    }

    // maybeSingle() returns null instead of throwing on a missing row
    const { data: betaUser } = await supabaseServer
        .from("beta_users")
        .select("approved")
        .eq("clerk_user_id", userId)
        .maybeSingle()

    if (!betaUser?.approved) {
        redirect("/pending")
    }

    return <>{children}</>
}
