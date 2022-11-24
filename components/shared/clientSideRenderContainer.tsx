import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../store/stores';
import { hasCookie } from '../../lib/cookie';

interface ClientSideRenderCOntainerProps {
    children: ReactNode;
}

export default function ClientSideRenderContainer({ children }: ClientSideRenderCOntainerProps) {
    const [clientIsReady, setClientIsReady] = useState<boolean>(false);
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        setLoggedIn(hasCookie('auth'));
        setClientIsReady(true);
    }, [router.isReady]);

    return <
    >{clientIsReady ? children : null}</
    >;
}
