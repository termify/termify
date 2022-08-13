import { AiFillSchedule } from "react-icons/ai";
import { motion } from "framer-motion";
import { useState } from "react";

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
        <div className="w-6 h-6 xl:hidden" onClick={()=>setOpen(value => !value)} >
            <HamburgerIcon open={open} />
        </div>
    )
}

function HamburgerIcon({open}:{open:boolean}){


    return(
        <div className="h-full flex flex-col justify-around" >
            <motion.div 
                animate={open ? {rotateZ:-45,y: 8} : {}}
                className="bg-slate-900 w-full h-1" 
            />
            <motion.div 
                animate={open ? {opacity:0} : {}}
                className="bg-slate-900 w-full h-1" /
            >
            <motion.div 
                animate={open ? {rotateZ:45, y:-8} : {}}
                className="bg-slate-900 w-full h-1" 
            />
        </div>
    )
}