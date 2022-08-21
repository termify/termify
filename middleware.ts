import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest){

    //TODO: Reactivate after explaining other team members
    // if (req.nextUrl.pathname.startsWith('/user')) {
    //     const cookie = req.cookies.get("auth");

    //     if (!cookie){
    //         console.log("Normal müsste das gehen");
    //         return NextResponse.rewrite(new URL('/register', req.url))
    //     }
    // }

    // if (
    //     req.nextUrl.pathname === "/" ||
    //     req.nextUrl.pathname === "/register" ||
    //     req.nextUrl.pathname === "/login" 
    //     ){
    //     const cookie = req.cookies.get("auth");
        
    //     if (cookie){
    //         const cookieValues = JSON.parse(cookie) as {id:string; token:string;};
    //         const uuid = cookieValues.id;
    
    //         return NextResponse.redirect(new URL(`/user/${cookieValues.id}/dashboard`, req.url))
    
    //     }
    // }

}