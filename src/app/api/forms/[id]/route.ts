import { adminApi } from "../../../lib/apiClient";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
    const data = await adminApi.get(`/forms/${params.id}`);
    return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: any) {
    const body = await req.json();
    const data = await adminApi.put(`/forms/${params.id}`, body);
    return NextResponse.json(data);
}

export async function DELETE(req: Request, { params }: any) {
    const data = await adminApi.delete(`/forms/${params.id}`);
    return NextResponse.json(data);
}
