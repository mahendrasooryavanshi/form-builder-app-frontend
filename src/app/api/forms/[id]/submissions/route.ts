import { adminApi } from "../../../../lib/apiClient";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
    const data = await adminApi.get(`/forms/${params.id}/submissions`);
    return NextResponse.json(data);
}
