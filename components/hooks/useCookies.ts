import { useEffect, useState } from "react";


type CookieType = "get" | "set" | "delete";

interface UseCookie{
    type: CookieType;
    name: string;
    value?: string | number;
}

type CookieResponse = [any,boolean];

export default function useCookies({type, name, value}:UseCookie ): CookieResponse{

    const [cookie, setCookie] = useState();

    useEffect(()=>{
        
    },[])

    return [cookie, true]


}