import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {

  const [counter, setCounter] = useState<number>(0) 

  return (
    <div className='flex flex-col h-full gap-8 justify-center items-center' >

    </div>
  )
}

export default Home
