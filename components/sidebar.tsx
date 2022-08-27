import { Modal } from "./shared/modal";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaWindowClose } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AuthSession } from "../types/storage";
import { LoginLink, LogoutLink, NavigationLink, RegisterLink } from "./shared/header";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { getCookie } from "../lib/cookie";

export function Sidebar({open, setOpen}:{open:boolean; setOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    
    const [yOffset, setYOffsset] = useState<number>(500);
    const divRef = useRef<HTMLDivElement>(null);
    const [session, setSession] = useState<AuthSession>();
    const router = useRouter();

    useEffect(()=>{
        setYOffsset(divRef.current!.offsetHeight);
    },[])

    useEffect(()=>{
        const authSession = getCookie("auth") as { auth: AuthSession};

        if (authSession){
            setSession(authSession.auth);
        }else{
            setSession(undefined)
        }

    },[router.asPath])


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
                    <div className="flex-grow py-8 flex flex-col items-center gap-3 bg-slate-800 shadow-xl" >
                    {   
                        session 
                        ?
                        <>
                            <NavigationLink icon={<RiDashboardFill />} name={"Dashboard"} to={`/user/${session.id}/dashboard`} setOpen={()=>setOpen(false)} />
                            <NavigationLink icon={<FaCalendarAlt />} name={"Kalendar"} to={`/user/${session.id}/schedule`} setOpen={()=>setOpen(false)} />
                            <LogoutLink onClick={()=>setOpen(false)} />
                        </>                 
                        :
                        <>
                            <NavigationLink icon={<FaHome />} name={"Startseite"} to={"/"} setOpen={()=>setOpen(false)} />
                            <RegisterLink onClick={()=>setOpen(false)} />
                            <LoginLink onClick={()=>setOpen(false)} />
                        </> 
                    }
                    </div>
                </div>
                <div className="flex-grow" onClick={()=>setOpen(false)} />
            </motion.div>
        </Modal>
    )
}