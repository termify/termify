import { AiFillSchedule } from "react-icons/ai";


export default function Header(){
    return(
        <header className="bg-slate-50 p-3 shadow-md flex">
            <h1 className="text-2xl font-bold underline underline-offset-4 flex items-center gap-2 text-slate-900" >Terminapp <AiFillSchedule className="xl:h-12 xl:w-12" /></h1>
        </header>
    )
}