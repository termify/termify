import { AiFillSchedule } from "react-icons/ai";
import { useEffect, useState } from "react";
import { LoginLink, RegisterLink, Sidebar } from "../sidebar";
import useDocument from "../hooks/useDocument";
import Link from "next/link";

export default function Header(){

    return(
        <header className="bg-slate-900 p-3 shadow-md flex justify-between items-center">
            <>
                <div className="xl:hover:cursor-pointer" >
                    <Link href={"/"} >
                        <h1 className="text-2xl font-bold flex items-center gap-2 " >
                            <p className="bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent" >{process.env.APP_NAME}</p>
                            <AiFillSchedule className="bg-gradient-to-r from-sky-400 to-emerald-500 xl:h-12 xl:w-12" />
                        </h1>
                    </Link>
                </div>
            </>
            <DesktopNavigation  />
            <MobileNavigation />
        </header>
    )
}

function DesktopNavigation(){


    return(
        <div className="hidden gap-4 flex-grow xl:flex xl:justify-end" >
            {
                true  && 
                <>
                    <RegisterLink />
                    <LoginLink />
                </>
            }
        </div>
    )
}

function MobileNavigation(){

    const [open, setOpen] = useState<boolean>(false);
    const { loaded } = useDocument();
    
    return(
        <div>
            <div className="w-6 h-6 xl:hidden" onClick={()=>setOpen(true)} >
                <HamburgerIcon />
            </div>
            {
                loaded && <Sidebar open={open} setOpen={setOpen} />
            }
        </div>
    )
}

function HamburgerIcon(){


    return(
        <div className="h-full flex flex-col justify-around" >
            <div className="bg-slate-100 w-full h-1" />
            <div className="bg-slate-100 w-full h-1" />
            <div className="bg-slate-100 w-full h-1" />
        </div>
    )
}