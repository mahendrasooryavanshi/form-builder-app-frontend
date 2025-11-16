import { adminApi } from "../../lib/apiClient";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
    const body = await req.json();
    const data = await adminApi.post(`/forms/${params.id}/fields`, body);
    return NextResponse.json(data);
}
