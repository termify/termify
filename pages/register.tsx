import { NextPage } from "next";
import React, { useState } from "react";
import AuthForm from "../components/shared/authForm";
import Container from "../components/shared/container";



const Register:NextPage = () => {

    const [done, setDone] = useState<boolean>(false);

    return(
        <Container>
            <div className="container mx-auto flex  flex-grow" >
                 {/* className="container mx-auto flex justify-center items-center xl:w-1/2" */}
                {
                    !done ? <AuthForm authType="register" setDone={setDone} /> : 
                    <h2 className="text-2xl text-center" >
                        Fast geschafft! Wir haben Ihnen eine Mail geschickt 📧
                    </h2>
                }
            </div>
        </Container>
    )
}

export default Register;