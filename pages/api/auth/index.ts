import { Session, User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { db, supabase } from "../../../lib/database";

interface RequestBody{
    email: string;
    password: string;
}

interface AuthResponse{
    msg: string;
    error:boolean;
    id?:string;
    session?:Session;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>){

    if (req.method !== "POST") res.send({error: true, msg:"Oups, da ist was schief gelaufen, wir arbeiten daran... 🚧"})


    switch(req.headers["type"]){
        case "register":
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
            break;
        case "login":
            const {user,session, error} = await loginAccount(req.body);

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
                id: user?.id,
                session: session!
            });
            break;
        case "logout":

            const logoutResponse = await supabase.auth.api.signOut(req.body.token as string);

            if (logoutResponse.error){
                res.send({
                    error: true,
                    msg: "Fehler beim ausloggen"
                });
            }

            res.send({
                error: false,
                msg: "Erfolgreich ausgeloggt"
            })

            break;
    }


}


async function registerAccount(authData:RequestBody): Promise<boolean>{
    const {error, user, session} = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password
    });

    if (!error && user){
        await db.user.create({
            data:{
                uuid: user.id,
                email: user.email as string,
            }
        })
    }

    return error ? true : false;
}

async function loginAccount(authData:RequestBody): Promise<{error: boolean, user: User | null, session: Session | null}>{
    const {error, user, session} = await supabase.auth.signIn({
        email: authData.email,
        password: authData.password
    });

    if (error){
        return {
            error: true,
            user: null,
            session: null
        }
    }else{
        return{
            error: false,
            user,
            session
        }
    }

}