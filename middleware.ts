import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL(`/booking`, req.url));
	}
}
