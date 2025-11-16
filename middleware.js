// import { NextResponse } from "next/server";

// /**
//  * Middleware for admin protection.
//  * - Allows if cookie admin_auth === "true"
//  * - OR if Authorization: Basic <base64(user:pass)> matches valid credentials
//  * - Otherwise redirects to /login
//  *
//  * Note: This file is for Next.js 16 (requires default export).
//  */
// export default function middleware(request) {
//     try {
//         const url = request.nextUrl.clone();
//         const pathname = url.pathname;

//         // Allow public assets, static files, favicon, and login page itself
//         if (
//             pathname.startsWith("/_next") ||
//             pathname.startsWith("/static") ||
//             pathname.startsWith("/favicon.ico") ||
//             pathname === "/login" ||
//             pathname.startsWith("/api/public") // adjust if you have public APIs
//         ) {
//             return NextResponse.next();
//         }

//         // Only protect /admin routes
//         if (!pathname.startsWith("/admin")) {
//             return NextResponse.next();
//         }

//         // 1) Check cookie-based session (form-login flow)
//         const cookieAuth = request.cookies.get("admin_auth")?.value;
//         if (cookieAuth === "true") {
//             return NextResponse.next();
//         }

//         // 2) Check Basic Auth header (Authorization: Basic ...)
//         const authHeader = request.headers.get("authorization");
//         if (authHeader && authHeader.startsWith("Basic ")) {
//             const base64 = authHeader.split(" ")[1];
//             // Decode base64 safely
//             const decoded = Buffer.from(base64, "base64").toString();
//             const [username, password] = decoded.split(":");

//             // Replace these with your real creds or env vars
//             const VALID_USER = "admin";
//             const VALID_PASS = "admin@123";

//             if (username === VALID_USER && password === VALID_PASS) {
//                 return NextResponse.next();
//             }

//             // If header present but invalid → return 401 with WWW-Authenticate to trigger popup
//             return new Response("Invalid credentials", {
//                 status: 401,
//                 headers: {
//                     "WWW-Authenticate": 'Basic realm="Admin Area"',
//                 },
//             });
//         }

//         // 3) No cookie and no valid basic auth → redirect to custom login page
//         return NextResponse.redirect(new URL("/login", request.url));
//     } catch (err) {
//         // In case of unexpected error, deny access (safe default)
//         return new Response("Access denied", { status: 403 });
//     }
// }

// // Protect all admin routes
// export const config = {
//     matcher: ["/admin/:path*"],
// };


import { NextResponse } from "next/server";

/**
 * Middleware for admin protection.
 * - Allows if cookie admin_auth === "true"
 * - OR if Authorization: Basic <base64(user:pass)> matches valid credentials
 * - Otherwise redirects to /login
 *
 * Note: This file is for Next.js 16 (requires default export).
 */
export default function middleware(request) {
    try {
        const url = request.nextUrl.clone();
        const pathname = url.pathname;

        // Allow public assets, static files, favicon, and login page itself
        if (
            pathname.startsWith("/_next") ||
            pathname.startsWith("/static") ||
            pathname.startsWith("/favicon.ico") ||
            pathname === "/login" ||
            pathname.startsWith("/api/public") // adjust if you have public APIs
        ) {
            return NextResponse.next();
        }

        // Only protect /admin routes
        if (!pathname.startsWith("/admin")) {
            return NextResponse.next();
        }

        // 1) Check cookie-based session (form-login flow)
        const cookieAuth = request.cookies.get("admin_auth")?.value;
        if (cookieAuth === "true") {
            return NextResponse.next();
        }

        // 2) Check Basic Auth header (Authorization: Basic ...)
        const authHeader = request.headers.get("authorization");
        if (authHeader && authHeader.startsWith("Basic ")) {
            const base64 = authHeader.split(" ")[1];
            // Decode base64 safely
            const decoded = Buffer.from(base64, "base64").toString();
            const [username, password] = decoded.split(":");

            // Replace these with your real creds or env vars
            const VALID_USER = "admin";
            const VALID_PASS = "admin@123";

            if (username === VALID_USER && password === VALID_PASS) {
                return NextResponse.next();
            }

            // If header present but invalid → return 401 with WWW-Authenticate to trigger popup
            return new Response("Invalid credentials", {
                status: 401,
                headers: {
                    "WWW-Authenticate": 'Basic realm="Admin Area"',
                },
            });
        }

        // 3) No cookie and no valid basic auth → redirect to custom login page
        return NextResponse.redirect(new URL("/login", request.url));
    } catch (err) {
        // In case of unexpected error, deny access (safe default)
        return new Response("Access denied", { status: 403 });
    }
}

// Protect all admin routes
export const config = {
    matcher: ["/admin/:path*"],
};
