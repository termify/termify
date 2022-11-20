import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/shared/header';
import Footer from '../components/shared/footer';
import Container from '../components/shared/container';
import { Toaster } from 'react-hot-toast';
import ClientSideRenderContainer from '../components/shared/clientSideRenderContainer';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Termify</title>
                <meta property={'og:image'} content={'http://localhost:3000/api/og'} />
            </Head>
            <ClientSideRenderContainer>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <Container>
                        <Component {...pageProps} />
                    </Container>
                    <Footer />
                    <Toaster />
                </div>
            </ClientSideRenderContainer>
        </>
    );
}

export default MyApp;
