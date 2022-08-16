import React, { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "./modal";
import GradientButton from "./utility/gradientButton";
import Textinput from "./utility/textinput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
        <div className="h-full w-full" >
            <h1 className="text-center text-2xl my-4 text-slate-900" >{authType === "register" ? "Erstellen Sie sich noch heute einen Account" : "Login"}</h1>
            <form onSubmit={handleOnClick} className="flex flex-col gap-4 items-center"  >
                <Textinput value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setFormData({...formData,email:e.target.value})}} placeholder="Email" type={"email"} required />
                <Textinput value={formData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFormData({...formData,password: e.target.value})} placeholder="Password" type={"password"} required />
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