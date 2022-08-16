import { NextPage } from "next";
import { useState } from "react";
import AuthForm from "../components/shared/authForm";



const Login:NextPage = () => {

    const [done, setDone] = useState<boolean>(false);

    return(
        <div className="h-full flex-grow container mx-auto flex justify-center items-center" >
            <AuthForm authType={"login"} setDone={setDone} />
        </div>
    )
}

export default Login;