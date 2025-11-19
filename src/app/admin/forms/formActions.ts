"use server";

import { adminApi } from "../../lib/apiClient";

export async function createFormAction(formData: FormData) {
    try {
        const body = {
            title: formData.get("title"),
            description: formData.get("description"),
            fields: JSON.parse(formData.get("fields") as string),
        };

        const response = await adminApi.post("/forms", body);

        return {
            success: true,
            message: "Form created successfully!",
            data: response,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to create form",
        };
    }
}


export async function updateFormAction(id: string, formData: FormData) {
    try {
        const body = {
            title: formData.get("title"),
            description: formData.get("description"),
            fields: JSON.parse(formData.get("fields") as string),
        };
        const updated = await adminApi.put(`/forms/${id}`, body);
        return {
            success: true,
            message: "Form updated successfully!",
            data: updated,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update form",
        };
    }
}
