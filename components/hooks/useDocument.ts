import { useEffect, useState } from "react";


export default function useDocument(){

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(()=>{
        setLoaded(true);
    },[])

    return { loaded }
}