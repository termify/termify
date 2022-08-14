import { Modal } from "./shared/modal";
import { motion } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export function Sidebar({open, setOpen}:{open:boolean; setOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    
    const [yOffset, setYOffsset] = useState<number>(500);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        setYOffsset(divRef.current!.offsetHeight);
    },[])

    return(
        <Modal>
            <motion.div
                ref={divRef}
                initial={{y:-yOffset}}
                animate={open ? {y:0} : {y:-yOffset}}
                transition={{ duration:.15}}
                className="flex flex-col w-screen shadow-xl bg-slate-800"
            >
                <div className="flex justify-end items-center p-4 bg-slate-900" >
                    <h2 className="flex-grow text-center font-bold text-2xl bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent" >Navigation</h2>
                    <FaWindowClose onClick={()=>setOpen(false)}  className="bg-gradient-to-r from-sky-400 to-emerald-500 h-6 w-6 p-0.5" />
                </div>
                <div className="flex-grow py-8 flex flex-col gap-3 bg-slate-800 shadow-xl" >
                    <SidebarLink name={"Startseite"} to={"/"} onClick={()=>setOpen(false)} />
                    <SidebarLink name={"Registrieren"} to={"/register"} onClick={()=>setOpen(false)} />
                    <SidebarLink name={"Login"} to={"/login"} onClick={()=>setOpen(false)} />
                </div>
            </motion.div>
        </Modal>
    )
}

interface SidebarLink{
    name: string;
    to: string;
    onClick: () => void
}

function SidebarLink({name, to, onClick}:SidebarLink){

    const router = useRouter();

    return(
        <div className="text-center text-slate-100" >
            <Link href={to}  >
                <a onClick={onClick} className={`${router.asPath === to ? "bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent" : ""}`} >{name}</a>
            </Link>
        </div>
    )
}