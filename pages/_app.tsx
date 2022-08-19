import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/shared/header'
import Footer from '../components/shared/footer'
import Container from '../components/shared/container'
import { Toaster } from 'react-hot-toast'
import { useGetCookie } from '../components/hooks/useCookies'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const auth = useGetCookie("auth-id");
  const router = useRouter();

  useEffect(()=>{
    if (!router.isReady) return;

    if (auth && router.pathname === "/"){
      router.push(`/user/${auth["auth-id"]}/dashboard`)
    }
  },[auth, router])

  return (
    <div className='min-h-screen flex flex-col' >
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
      <Toaster />
    </div>
  )
}

export default MyApp
