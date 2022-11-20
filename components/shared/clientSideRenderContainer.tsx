import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ClientSideRenderCOntainerProps {
    children: ReactNode;
}

export default function ClientSideRenderContainer({ children }: ClientSideRenderCOntainerProps) {
    const [clientIsReady, setClientIsReady] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;

        setClientIsReady(true);
    }, [router.isReady]);

    return <>{clientIsReady ? children : null}</>;
}
