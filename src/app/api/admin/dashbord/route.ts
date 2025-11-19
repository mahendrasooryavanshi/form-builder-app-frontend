import { NextResponse } from "next/server";
import { adminApi } from "../../../lib/apiClient";

export async function GET() {
    try {
        const stats = await adminApi.get("/dashboard"); // this sends BasicAuth
        return NextResponse.json(stats);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Unauthorized" },
            { status: 401 }
        );
    }
}