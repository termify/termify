import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	// const cookie = req.cookies.get("next-auth.session-token");

	if (req.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL(`/booking`, req.url));
	}

	// if (req.nextUrl.pathname.startsWith("/user")) {
	// 	if (!cookie) return NextResponse.redirect(new URL("/login", req.url));
	// }
}
