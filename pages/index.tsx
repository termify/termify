import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useGetCookie } from '../components/hooks/useCookies'




const Home: NextPage = () => {

  const auth = useGetCookie("eddy");
  const router = useRouter();

  if (auth){
    router.push("/user/test/schedule")
  }


  return (
    <div className='flex flex-col h-full gap-8 justify-center items-center' >

    </div>
  )
}

export default Home
