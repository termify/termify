import { AiFillSchedule } from "react-icons/ai";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar } from "../sidebar";

export default function Header(){
    return(
        <header className="bg-slate-50 p-3 shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-bold underline underline-offset-4 flex items-center gap-2 text-slate-900" >Terminapp <AiFillSchedule className="xl:h-12 xl:w-12" /></h1>
            <Hamburger />
        </header>
    )
}

function Hamburger(){

    const [open, setOpen] = useState<boolean>(false);

    return(
        <div>
            <div className="w-6 h-6 xl:hidden" onClick={()=>{setOpen(value => !value)}} >
                <HamburgerIcon />
            </div>
            {
                open && <Sidebar closeSidebar={setOpen} />
            }
        </div>
    )
}

function HamburgerIcon(){


    return(
        <div className="h-full flex flex-col justify-around" >
            <div className="bg-slate-900 w-full h-1" />
            <div className="bg-slate-900 w-full h-1" />
            <div className="bg-slate-900 w-full h-1" />
        </div>
    )
}