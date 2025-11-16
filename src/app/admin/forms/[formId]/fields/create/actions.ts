"use server";

export async function addFieldAction(formId: string, formData: FormData) {
    await fetch(`https://api.yourdomain.com/forms/${formId}/fields`, {
        method: "POST",
        body: JSON.stringify({
            label: formData.get("label"),
            type: formData.get("type"),
        }),
        headers: { "Content-Type": "application/json" },
    });
}
