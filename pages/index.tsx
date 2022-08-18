import type { NextPage } from 'next'
import { useState } from 'react'
import  { TestComponent } from '../components/shared/container'

const Home: NextPage = () => {

  const [counter, setCounter] = useState<number>(0) 

  return (
    <div className='flex flex-col h-full gap-8 justify-center items-center' >
      <TestComponent name='Kevin' rasse="vogel" />
      <TestComponent name='Eddy' rasse="vogel" />
    </div>
  )
}

export default Home
