import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [counter, setCounter] = useState<number>(0) 

  return (
    <div className='flex flex-col bg-red-300 h-full gap-8 justify-center items-center' >
      
    </div>
  )
}

export default Home
