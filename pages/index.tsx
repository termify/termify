import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [counter, setCounter] = useState<number>(0) 

  return (
    <div className='flex flex-col gap-8 w-screen h-screen justify-center items-center' >
      <h1 className='text-3xl font-bold' >Hier kommt eine sexy App... also bald</h1>
      <div className='flex flex-col items-center gap-4' >
        <p className='text-xl' > <span className='text-4xl font-bold' >{counter}</span> Personen gefällt diese Nachricht 👍</p>
        <button onClick={()=>{setCounter(counter+1)}} className='bg-gradient-to-t from-sky-600 to-emerald-400 w-1/3 shadow-lg rounded p-2 text-4xl transition-all hover:scale-110' >👍</button>
      </div>
    </div>
  )
}

export default Home
