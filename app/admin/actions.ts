"use server"

import { auth } from "@clerk/nextjs/server"
import { supabaseServer } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

function isAdmin(userId: string | null) {
    return userId && userId === process.env.ADMIN_CLERK_USER_ID
}

export async function approveUser(id: string) {
    const { userId } = await auth()
    if (!isAdmin(userId)) throw new Error("Unauthorized")

    await supabaseServer
        .from("beta_users")
        .update({ approved: true })
        .eq("id", id)

    revalidatePath("/admin")
}

export async function revokeUser(id: string) {
    const { userId } = await auth()
    if (!isAdmin(userId)) throw new Error("Unauthorized")

    await supabaseServer
        .from("beta_users")
        .update({ approved: false })
        .eq("id", id)

    revalidatePath("/admin")
}
