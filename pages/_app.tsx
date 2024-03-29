import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/shared/header";
import Footer from "../components/shared/footer";
import Container from "../components/shared/container";
import { Toaster } from "react-hot-toast";
import ClientSideRenderContainer from "../components/shared/clientSideRenderContainer";
import Head from "next/head";
import { useBookingStore } from "../store/stores";
import { useEffect, useRef } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const bookingPageNumber = useBookingStore((state) => state.pageIndex);
	const pageDivRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		pageDivRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [bookingPageNumber]);

	return (
		<>
			<Head>
				<title>Termify</title>
				<link rel={"icon"} type={"image/png"} sizes={"64x6"} href={"/icon.png"} />
				<meta name="description" content="Nie mehr Anstehen beim Amt" key="desc" />
				{/*Facebook Meta Tags*/}
				<meta property="og:type" content="website" />
				<meta property={"og:image"} content={"https://develop-termintool.vercel.app/api/og"} />
				<meta property="og:url" content="https://develop-termintool.vercel.app/" />
				<meta property="og:description" content="Nie mehr Anstehen beim Amt" />
				<meta property="og:image" content="https://develop-termintool.vercel.app/api/og'" />
				<meta property="og:image:secure_url" content="https://develop-termintool.vercel.app/" />

				{/*Twtitter Meta Tags*/}
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="https://develop-termintool.vercel.app/" />
				<meta property="twitter:url" content="https://develop-termintool.vercel.app/" />
				<meta name="twitter:title" content="Termify" />
				<meta name="twitter:description" content="Nie mehr Anstehen beim Amt" key="desc" />
				<meta name="twitter:image" content="https://develop-termintool.vercel.app/api/og'" />

				<meta name="google" content="nositelinkssearchbox" key="sitelinks" />
				<meta name="google" content="notranslate" key="notranslate" />
			</Head>
			<ClientSideRenderContainer>
				<div ref={pageDivRef} className="min-h-screen flex flex-col">
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
