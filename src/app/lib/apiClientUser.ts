export const USER_API = process.env.BASE_URL!;

async function request(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${USER_API}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "User API Error");
    }

    return res.json();
}

export const userApi = {
    get: (endpoint: string) => request(endpoint),
    post: (endpoint: string, body: any) =>
        request(endpoint, { method: "POST", body: JSON.stringify(body) }),
    put: (endpoint: string, body: any) =>
        request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
    delete: (endpoint: string) =>
        request(endpoint, { method: "DELETE" }),
};
