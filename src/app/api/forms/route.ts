import { adminApi } from "../../lib/apiClient";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await adminApi.get("/forms");
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const data = await adminApi.post("/forms", body);
    return NextResponse.json(data);
}
