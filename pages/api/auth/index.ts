import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/database";

interface RequestBody{
    email: string;
    password: string;
}

interface AuthResponse{
    msg: string;
    error:boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>){

    if (req.method !== "POST") res.send({error: true, msg:"Oups, da ist was schief gelaufen, wir arbeiten daran... 🚧"})

    if (req.headers["type"] === "register"){
        const registerFailed = await registerAccount(req.body);

        if (registerFailed){
            res.send({
                error: true,
                msg:"Registrierung ist leider fehlgeschlagen"
            });
            return;
        }

        res.send({
            error: false,
            msg: "Registrierung war erfolgreich"
        });

    }


}


async function registerAccount(authData:RequestBody): Promise<boolean>{
    const {error, user} = await db.auth.signUp({
        email: authData.email,
        password: authData.password
    });

    return error ? true : false;

}