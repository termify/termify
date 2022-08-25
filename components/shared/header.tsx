import { AiFillSchedule } from "react-icons/ai";
import React, { ReactElement, useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import useDocument from "../hooks/useDocument";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthSession } from "../../types/storage";
import toast from "react-hot-toast";
import { AiFillHome } from "react-icons/ai";
import { FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { deleteCookie, getCookie } from "../../lib/cookie";

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
        const authCookie = getCookie("auth") as {auth:{id:string; token:string;}};
        
        if (authCookie){
            setSession(authCookie.auth);
        }else{
            setSession(undefined)
        }

    },[router.asPath])

    return(
        <div className="hidden gap-4 flex-grow xl:flex xl:items-center xl:justify-end" >
            {
                session  ?
                <>
                    <NavigationLink icon={<RiDashboardFill />} name={"Dashboard"} to={`/user/${session.id}/dashboard`} />
                    <NavigationLink icon={<FaCalendarAlt />} name={"Kalendar"} to={`/user/${session.id}/schedule`} />
                    <LogoutLink />
                </>
                : 
                <>
                    <NavigationLink icon={<AiFillHome className="w-5 h-5" />} name={"Startseite"} to={"/"} />
                    <RegisterLink />
                    <LoginLink />
                </>
            }
        </div>
    )
}

interface NavigationLink{
    name: string;
    to: string;
    icon?:ReactElement | ReactElement[];
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface SpecialLink{
    name?: string;
    to?: string;
    onClick?: ()=>void;
}

export function NavigationLink({name, to,setOpen, icon}:NavigationLink){

    const router = useRouter();

    function onClickHandler(){
        if (setOpen)
        setOpen(false);
    }

    return(
            <Link href={to}  >
                <div onClick={onClickHandler} 
                className={
                    `text-center justify-center select-none
                    cursor-pointer p-2 text-slate-100 
                    min-w-[150px]
                    rounded
                    flex items-center 
                    gap-2 transition-all 
                    xl:hover:bg-slate-800 xl:hover:scale-110 
                    `}
                >
                    {/* <FaHome className="w-5 h-5" /> */}
                        {icon}
                    <a>{name}</a>
                </div>
            </Link>
    )
}

export function LogoutLink({name, to,onClick}:SpecialLink){

    async function onClickHandler(){

        toast.success("Erfolgreich ausgeloggt");
        // sessionStorage.removeItem("auth");
        await deleteCookie("auth","/");
        if (onClick)
            onClick();
    }


    return(
        <Link href={"/"}  >
            <div onClick={onClickHandler} 
            className="text-center w-1/2 mx-auto rounded flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-rose-400 to-amber-500 transition-all xl:m-0 xl:w-32 xl:hover:cursor-pointer xl:hover:scale-110" >
                <a className=" rounded text-slate-50 select-none"  >Logout</a>
                <FaSignOutAlt className="text-slate-50" />
            </div>
        </Link>
    )
}

export function RegisterLink({name, to,onClick}:SpecialLink){
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

export function LoginLink({name, to,onClick}:SpecialLink){
    return(
            <Link href={"/login"}  >
                <div onClick={onClick} className="text-center w-1/2 mx-auto rounded p-2 bg-gradient-to-r from-sky-400 to-emerald-500 transition-all xl:m-0 xl:w-32 xl:hover:cursor-pointer xl:hover:scale-110" >
                    <a className=" rounded text-slate-50 select-none"  >Login</a>
                </div>
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