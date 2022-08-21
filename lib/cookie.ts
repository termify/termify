
export interface Cookie{
    [key: string] : string;
}

export const setCookie = (name: string, value: string, utcExpire: string = "", path:string = "/") => {
    document.cookie = `${name}=${value}; ${utcExpire ? `expires=${utcExpire};` : "" } ${path ? `path=${path};` : "" } `;
}

export const getAllCookies = ():Cookie => {
    const allCookies = document.cookie.split("; ");
    const returnValue:Cookie = {};
    
    allCookies.forEach((e) => {
        const keyValue = e.split("=");
        returnValue[keyValue[0]] = keyValue[1];
    })

    return returnValue;
}

export const hasCookie = (name:string):boolean => {
    const allCookies = document.cookie.split("; ");
    const findCookie = allCookies.find(e => e.includes(name))
    
    if (!findCookie){
        return false;
    }else{
        const splittValue = findCookie?.split("=");

        if (!splittValue[1])
            return false;
        else 
            return true;
    }

}

export const getCookie = (cookie:string): unknown => {
    const returnObject:Cookie = {}

    const allCookies = document.cookie.split("; ");
    const findCookie = allCookies.find(e => e.includes(cookie))
    
    if (findCookie){
        const splittValue = findCookie?.split("=");
        returnObject[splittValue[0]] = splittValue[1];
    
        return returnObject;
    }

    return undefined;
}

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}