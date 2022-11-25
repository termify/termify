import { useEffect, useState } from 'react';
import { Cookie, deleteCookie, getAllCookies, getCookie, hasCookie, setCookie } from '../../lib/cookie';
import useDocument from './useDocument';

export enum CookieTypes {
    GET,
    SET,
    HAS,
}

export const useCookies = (
    cookieName: string,
    type: CookieTypes,
    newValue?: string,
    utcExpire: string = '',
    path: string = ''
) => {
    const [cookieValue, setCookieValue] = useState<Cookie>(getCookie(cookieName) as Cookie);

    switch (type) {
        case CookieTypes.GET:
            return cookieValue;
        case CookieTypes.SET:
            // setCookieValue(setCookie(cookieName,))
            return cookieValue;
    }
};

export const useGetCookie = (cookieName: string = '') => {
    const { loaded } = useDocument();
    const [value, setValue] = useState<Cookie | undefined>();

    useEffect(() => {
        if (!loaded) return;

        if (cookieName) {
            setValue(getCookie(cookieName) as Cookie);
        } else {
            setValue(getAllCookies());
        }
    }, [loaded, cookieName]);

    return value;
};

export const useSetCookie = (name: string, value: string, utcExpire: string = '', path: string = '') => {
    setCookie(name, value, utcExpire, path);
};

export const useDeleteCookie = (name: string) => {
    deleteCookie(name);
};

export const useHasCookie = (name: string) => {
    const [hasCookieState, setHasCookieState] = useState<boolean>(false);

    useEffect(() => {
        setHasCookieState(hasCookie(name));
    }, [hasCookieState, name]);

    return hasCookieState;
};
