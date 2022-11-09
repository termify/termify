import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest){

    if (req.nextUrl.pathname === "/"){
        // const cookie = req.cookies.get("auth");
        
        // if (cookie){
        //     const cookieValues = JSON.parse(cookie) as {id:string; token:string;};

            // return NextResponse.redirect(new URL(`/user/${cookieValues.id}/dashboard`, req.url))
            return NextResponse.redirect(new URL(`/booking`, req.url))

        // }
    }

}