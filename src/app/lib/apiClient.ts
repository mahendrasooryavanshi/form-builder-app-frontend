import "server-only";
const ADMIN_USER = process.env.ADMIN_USERNAME!;
const ADMIN_PASS = process.env.ADMIN_PASSWORD!;

// Create Basic Auth header
const authHeader = "Basic " + Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString("base64");

async function request(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${process.env.BASE_URL}/admin${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
            ...(options.headers || {}),
        },
        cache: "no-store",
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Admin API Error");
    }

    return res.json();
}

export const adminApi = {
    get: (endpoint: string) => request(endpoint, { method: "GET" }),
    post: (endpoint: string, body: any) => request(endpoint, { method: "POST", body: JSON.stringify(body) }),
    put: (endpoint: string, body: any) => request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
    delete: (endpoint: string) => request(endpoint, { method: "DELETE" }),
};
