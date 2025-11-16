"use server";

import { redirect } from "next/navigation";

export async function createFormAction(formData: FormData): Promise<void> {
    const name = formData.get("name")?.toString();

    await fetch("https://api.yourdomain.com/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });

    redirect("/admin/forms"); // <-- Redirect after success
}
