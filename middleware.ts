import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest){

    if (
        req.nextUrl.pathname  === '/user'
        ) {
        // const cookie = req.cookies.get("auth") ;

        // if (cookie){
        //     const cookieValue = JSON.parse(cookie) as {id: string; token: string;};
        //     console.log("CookieValue 2",cookieValue.id);
        //     return NextResponse.redirect(new URL(`/user/${cookieValue.id}/dashboard`, req.url))
        // }

        console.log("User")

    }

    if (req.nextUrl.pathname.startsWith('/user')) {
        const cookie = req.cookies.get("auth");

        console.log("Starts With 2",cookie)

        if (!cookie){
            return NextResponse.rewrite(new URL('/register', req.url))
        }
    }
    
}