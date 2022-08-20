import type { NextPage } from 'next'


const Home: NextPage = () => {

  return (
    <div className='flex flex-col h-full gap-8 justify-center items-center' >
        Schnell und Sicher mit Termify alle Termine verwalten.
        <div>
          <ol>
            <li><span className='font-bold' >1.</span> Account erstellen</li>
            <li><span className='font-bold' >2.</span> Persönlichen Bereich erstellen</li>
            <li><span className='font-bold' >1.</span> Kalendar einbetten oder via API Schnittstelle ansprechen</li>
            <li><span className='font-bold' >1.</span> Los legen</li>
          </ol>
        </div>
    </div>
  )
}

export default Home
