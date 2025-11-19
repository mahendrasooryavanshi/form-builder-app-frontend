import { adminApi } from "../../../lib/apiClient";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: any) {
    const data = await adminApi.delete(
        `/forms/${params.id}/fields/${params.fieldId}`
    );
    return NextResponse.json(data);
}



// GET single form
export async function GET(req: Request, { params }: any) {
    try {
        const form = await adminApi.get(`/forms/${params.id}`);
        return NextResponse.json(form);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to load form" },
            { status: 500 }
        );
    }
}

// UPDATE form
export async function PUT(req: Request, { params }: any) {
    try {
        const body = await req.json();
        const updated = await adminApi.put(`/forms/${params.id}`, body);

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to update form" },
            { status: 500 }
        );
    }
}
