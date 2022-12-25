import { useEffect, useState } from "react";

export const useBaseUrl = () => {

    const [baseUrl, setBaseUrl] = useState<string>("");

    useEffect(()=>{
        setBaseUrl(location.origin);
    },[])

    return baseUrl;
};
