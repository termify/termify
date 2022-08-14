import Link from "next/link";



export default function NotFound(){

    return(
        <div className="flex-grow flex flex-col justify-center items-center gap-4" >
            <h2 className="text-4xl text-center font-bold bg-gradient-to-r from-rose-400 to-amber-500 bg-clip-text text-transparent " >Ups... hier gibt es nichts</h2>
            <Link href={"/"} >
                <a className="bg-gradient-to-r from-rose-400 to-amber-500 rounded p-2 text-rose-50 font-bold drop-shadow-xl" >Zurück zur Startseite</a>
            </Link>
        </div>
    )

}