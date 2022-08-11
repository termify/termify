import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [counter, setCounter] = useState<number>(0) 

  return (
    <div className='container mx-auto p-4 flex flex-col gap-8 w-screen h-screen justify-center items-center' >
      <h1 className='text-xl font-bold mt-16 text-center md:text-3xl'>Hier kommt eine sexy App... also bald</h1>
      <div className='flex-grow flex flex-col items-center justify-center gap-4' >
        <p className='text-xl' > <span className='text-4xl font-bold text-center ' >{counter}</span> Personen gefällt diese Nachricht</p>
        <button onClick={()=>{setCounter(counter+1)}} className='bg-gradient-to-t from-sky-600 to-emerald-400 w-1/3 shadow-lg rounded p-2 text-4xl transition-all xl:hover:scale-110' >👍</button>
      </div>
    </div>
  )
}

export default Home
