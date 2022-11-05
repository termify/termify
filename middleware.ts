import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest){

    //TODO: Reactivate after explaining other team member
    if (req.nextUrl.pathname.startsWith('/user')) {
        const cookie = req.cookies.get("auth");

        if (cookie && req.nextUrl.search){
            const params = req.nextUrl.searchParams.get("id");
            const cookieValues = JSON.parse(cookie) as {id: string; token:string;};
            if (cookieValues.id !== params){
                return NextResponse.redirect(new URL(`/user/${cookieValues.id}/dashboard`, req.url))
            }
        }


        // if (!cookie){
        //     return NextResponse.rewrite(new URL('/register', req.url))
        // }
    }

    if (
        req.nextUrl.pathname === "/" ||
        req.nextUrl.pathname === "/register" ||
        req.nextUrl.pathname === "/login" 
        ){
        const cookie = req.cookies.get("auth");
        
        if (cookie){
            const cookieValues = JSON.parse(cookie) as {id:string; token:string;};

            return NextResponse.redirect(new URL(`/user/${cookieValues.id}/dashboard`, req.url))
    
        }
    }

}