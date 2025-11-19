import { adminApi } from "../../lib/apiClient";
import { NextResponse } from "next/server";

// GET: Fetch all forms
export async function GET() {
    try {
        const forms = await adminApi.get("/forms");
        return NextResponse.json(forms);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch forms" },
            { status: 500 }
        );
    }
}
// POST: Create form
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = await adminApi.post("/forms", body);
        console.log(result, ">>>>>>>>>>>>> create form")
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to create form" },
            { status: 500 }
        );
    }
}