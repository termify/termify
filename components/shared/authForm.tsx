import React, { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "./modal";
import GradientButton from "./utility/gradientButton";
import Textinput from "./utility/textinput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";

interface AuthForm{
    authType: "register" | "login";
    setDone:React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthData{
    email: string;
    password: string;
}

interface AuthResponse{
    msg: string;
    error: boolean;
}

export default function AuthForm({authType, setDone}:AuthForm){

    const [formData, setFormData] = useState<AuthData>({
        email:"",
        password:""
    });

    const [showModal, setShowModal] = useState<boolean>(false);

    async function handleOnClick(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        switch(authType){
            case "register":
                await register();
                break;
            case "login":
                await login();
                break;
        }

    } 

    async function register(){
        setShowModal(true);

        const {msg,error}:AuthResponse = await (await fetch("/api/auth",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                type:"register"
            },
            body:JSON.stringify(formData)
        })).json();

        if (error){
            toast.error(msg);
            return;
        }

        toast.success(msg);
        setDone(true);

    }

    async function login(){

        setShowModal(true);

        const {msg,error}:AuthResponse = await (await fetch("/api/auth",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                type:"login"
            },
            body:JSON.stringify(formData)
        })).json();

        if (error){
            toast.error(msg);
            return;
        }

        toast.success(msg);
        setDone(true);
    }

    return(
        <div className="flex-grow flex flex-col justify-evenly items-center my-auto xl:gap-8" >
            <h1 
                className="text-center text-3xl my-4 bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent p-2 xl:text-5xl xl:my-8" >
                    {
                    authType === "register" ? 
                    "Erstellen Sie sich noch heute einen Account" : 
                    "Login"
                    }
            </h1>
            <form onSubmit={handleOnClick} className="flex flex-col gap-4 items-center  justify-start xl:flex-grow xl:justify-center  xl:w-1/3"  >
                <Textinput value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setFormData({...formData,email:e.target.value})}} placeholder="Email" type={"email"} required />
                <Textinput value={formData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFormData({...formData,password: e.target.value})} placeholder="Password" type={"password"} required />
                <ContextSwitcher register={authType === "register"} />
                <GradientButton buttontext={authType  === "register" ? "Registrieren" : "Einloggen"} design={"filled"} type={"submit"} />
            </form>
            {
                showModal && <Modal>
                    <div className="bg-slate-900/50 w-screen h-screen flex justify-center items-center" >
                        <AiOutlineLoading3Quarters className="w-12 h-12 text-emerald-400 animate-spin" />
                    </div>
                </Modal>
            }
        </div>
    )
}

function ContextSwitcher({register}:{register:boolean}){

    return(
        <div className="text-xs bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent">
            {
                register ? 
                    <Link href={"/login"} >
                        <a>Sie haben schon einen Account?</a>
                    </Link>
                    :
                    <Link href={"/register"} >
                        <a>Noch keinen Account?</a>
                    </Link>
            }
        </div>
    )

}