import { useEffect, useState } from "react"
import { Cookie, getAllCookies, getCookie, setCookie } from "../../lib/cookie";
import useDocument from "./useDocument";


export const useGetCookie = (cookieName: string = "") => {

    const {loaded} = useDocument();
    const [value, setValue] = useState<Cookie | undefined>();
    
    useEffect(()=>{
        if (!loaded) return;

        if (cookieName){
            setValue(getCookie(cookieName));
        }else{
            setValue(getAllCookies());
        }

        // getAllCookies(cookieName);

    },[loaded, cookieName])

    return value;
}

export const useSetCookie = (name: string, value: string, utcExpire?: string, path?:string) => {
        setCookie(name, value,utcExpire, path);
}



