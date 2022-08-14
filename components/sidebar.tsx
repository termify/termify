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
                transition={{ease:"linear", duration:.15}}
                className="bg-slate-50 flex flex-col w-screen p-2 shadow-xl"
            >
                <div className="flex justify-end p-2" >
                    <FaWindowClose onClick={()=>setOpen(false)}  className="text-slate-900 h-6 w-6" />
                </div>
                <div className="flex-grow my-8 flex flex-col" >
                    <SidebarLink name={"Home"} to={"/"} />
                </div>
            </motion.div>
        </Modal>
    )
}

interface SidebarLink{
    name: string;
    to: string;
}

function SidebarLink({name, to}:SidebarLink){

    const router = useRouter();

    return(
        <div className="text-center" >
            <Link href={to} >
                <a className={`${router.asPath === to ? "underline underline-offset-4" : ""}`} >{name}</a>
            </Link>
        </div>
    )
}