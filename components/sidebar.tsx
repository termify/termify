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
                transition={{ duration:.25}}
                className="flex flex-col w-screen h-screen"
            >
                <div className="w-full " >
                    <div className="flex justify-end items-center p-4 bg-slate-900" >
                        <h2 className="flex-grow text-center font-bold text-2xl bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent" >Navigation</h2>
                        <FaWindowClose onClick={()=>setOpen(false)}  className="bg-gradient-to-r from-sky-400 to-emerald-500 h-6 w-6 p-0.5" />
                    </div>
                    <div className="flex-grow py-8 flex flex-col gap-3 bg-slate-800 shadow-xl" >
                        <RegisterLink onClick={()=>setOpen(false)} />
                        <LoginLink onClick={()=>setOpen(false)} />
                        <SidebarLink name={"Home"} to={"/"} onClick={()=>setOpen(false)} />
                    </div>
                </div>
                <div className="flex-grow ee" onClick={()=>setOpen(false)} />
            </motion.div>
        </Modal>
    )
}


export function RegisterLink({onClick}:{onClick?: () => void}){
    return(
            <Link href={"/register"}  >
                <div onClick={onClick} className="text-center w-1/2 mx-auto rounded p-0.5 bg-gradient-to-r from-sky-400 to-emerald-500 transition-all xl:m-0 xl:w-32 xl:hover:cursor-pointer xl:hover:scale-110 " >
                    <div className="bg-slate-800 p-1.5 xl:hover:bg-transparent" >
                        <a className="p-2 bg-gradient-to-r w-full from-sky-400 to-emerald-500 bg-clip-text text-transparent select-none hover:text-slate-50"  >Registrieren</a>
                    </div>
                </div>
            </Link>

    )
}

export function LoginLink({onClick}:{onClick?: () => void}){
    return(
            <Link href={"/login"}  >
                <div onClick={onClick} className="text-center w-1/2 mx-auto rounded p-2 bg-gradient-to-r from-sky-400 to-emerald-500 transition-all xl:m-0 xl:w-32 xl:hover:cursor-pointer xl:hover:scale-110" >
                    <a className=" rounded text-slate-50 select-none"  >Login</a>
                </div>
            </Link>
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
                {/* <a onClick={onClick} className={`${router.asPath === to ? "bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent" : ""}`} >{name}</a> */}
                <a onClick={onClick} className={`${router.asPath === to ? "" : ""}`} >{name}</a>
            </Link>
        </div>
    )
}