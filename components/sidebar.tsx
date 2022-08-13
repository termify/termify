import { Modal } from "./shared/modal";
import { motion } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export function Sidebar({closeSidebar}:{closeSidebar:React.Dispatch<React.SetStateAction<boolean>>}){
    return(
        <Modal>
            <div >
                <motion.div
                    initial={{x:window.innerWidth}}
                    animate={{x:window.innerWidth - (window.innerWidth / 2)}}
                    transition={{ease:"linear"}}
                    className="bg-slate-50 flex flex-col h-screen p-2 w-1/2 shadow-md"
                >
                    <div className="flex justify-end p-2" >
                        <FaWindowClose onClick={()=>closeSidebar(false)}  className="text-slate-900 h-6 w-6" />
                    </div>
                    <div className="flex-grow mt-8 flex flex-col" >
                        <SidebarLink name={"Home"} to={"/"} />
                    </div>
                </motion.div>
            </div>
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