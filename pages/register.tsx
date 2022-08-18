import { NextPage } from "next";
import React, { useState } from "react";
import AuthForm from "../components/shared/authForm";



const Register:NextPage = () => {

    const [done, setDone] = useState<boolean>(false);

    return(
        <div 
        className="h-full flex-grow container mx-auto flex justify-center items-center bg-green-300 " >
            {
                !done ? <AuthForm authType="register" setDone={setDone} /> : 
                <h2 className="text-2xl text-center" >
                    Fast geschafft! Wir haben Ihnen eine Mail geschickt 📧
                </h2>
            }
        </div>
    )
}

export default Register;