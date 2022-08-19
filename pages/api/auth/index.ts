import { User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/database";

interface RequestBody{
    email: string;
    password: string;
}

interface AuthResponse{
    msg: string;
    error:boolean;
    id?:string;
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

    }else{
        const {user, error} = await loginAccount(req.body);

        if (error){
            res.send({
                error: true,
                msg:"Login ist leider fehlgeschlagen"
            });
            return;
        }

        res.send({
            error: false,
            msg: "Login war erfolgreich",
            id: user?.id
        });
    }

}


async function registerAccount(authData:RequestBody): Promise<boolean>{
    const {error, user, session} = await db.auth.signUp({
        email: authData.email,
        password: authData.password
    });

    return error ? true : false;
}

async function loginAccount(authData:RequestBody): Promise<{error: boolean, user: User | null}>{
    const {error, user, session} = await db.auth.signIn({
        email: authData.email,
        password: authData.password
    });

    if (error){
        return {
            error: true,
            user: null
        }
    }else{
        return{
            error: false,
            user
        }
    }

}