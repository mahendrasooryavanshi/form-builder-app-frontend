import { adminApi } from "../../../lib/apiClient";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
    const body = await req.json();
    const data = await adminApi.put(
        `/forms/${params.id}/fields/${params.fieldId}`,
        body
    );
    return NextResponse.json(data);
}

export async function DELETE(req: Request, { params }: any) {
    const data = await adminApi.delete(
        `/forms/${params.id}/fields/${params.fieldId}`
    );
    return NextResponse.json(data);
}
