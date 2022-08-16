import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/shared/header'
import Footer from '../components/shared/footer'
import Container from '../components/shared/container'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
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
