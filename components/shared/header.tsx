import { AiFillSchedule } from "react-icons/ai";
import { useEffect, useState } from "react";
import { LoginLink, LogoutLink, RegisterLink, Sidebar } from "../sidebar";
import useDocument from "../hooks/useDocument";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthSession } from "../../types/storage";

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

    const [session, setSession] = useState<AuthSession>();
    const router = useRouter();


    useEffect(()=>{
        const authSession = JSON.parse(sessionStorage.getItem("auth") as string) as AuthSession;
        setSession(authSession);
    },[router.asPath])

    return(
        <div className="hidden gap-4 flex-grow xl:flex xl:items-center xl:justify-end" >
            {
                session  ?
                <>
                    <HeaderLink name={"Dashboard"} to={`/user/${session.id}/dashboard`} />
                    <HeaderLink name={"Kalendar"} to={`/user/${session.id}/schedule`} />
                    <LogoutLink />
                </>
                : 
                <>
                    <RegisterLink />
                    <LoginLink />
                </>
            }
        </div>
    )
}

interface HeaderLink{
    name: string;
    to: string;
}

function HeaderLink({name, to}:HeaderLink){

    const router = useRouter();

    return(
            <Link href={to}  >
                <a className={`${router.asPath === to ? "" : ""} text-center text-slate-100`} >{name}</a>
            </Link>
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