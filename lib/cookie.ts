
export interface Cookie{
    [key: string] : string;
}

export const setCookie = (cookie: string) => {
    document.cookie = cookie;
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

export const getCookie = (cookie:string): Cookie | undefined => {
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