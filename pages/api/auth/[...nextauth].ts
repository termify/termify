import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes, randomUUID } from "crypto";
import { db } from "../../../lib/database";
import crypto from "crypto";

export const authOptions: AuthOptions = {
    // Here comes all Providers
    providers:[
        GithubProvider({
            clientId: "",
            clientSecret: ""
        }),
        CredentialsProvider({
            name:"Credentials Provider",
            credentials:{},
            async authorize(credentials, req){
                const {email, password} = credentials as {email:string; password:string};
                
                const userExists = await db.user.findFirst({
                    where:{
                        email:email,
                        password: password
                    }
                })

                if (!userExists){
                    const newUser = await db.user.create({
                        data:{
                            uuid:crypto.randomUUID(),
                            email,
                            password
                        }
                    })
                    return {id:newUser?.uuid!,email:newUser?.email}
                }

                return {id:userExists?.uuid!,email:userExists?.email}
                
            }
        })
    ],
    session:{
        strategy: "jwt",
        maxAge: 30 * 24* 60 * 60,
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    callbacks:{
        jwt: async ({token, user}) => {
            if (user){
                token.sub = user.id;
            }
            
            return token
        },
        session: async ({session, token, user}) => {
            if (session?.user){
                // @ts-ignore
                session.user.id = token.sub;
            }

            return session
        },

    },
    pages:{
        signIn: '/login',
        signOut: '/auth/signout',
        newUser: '/auth/new-user'
    }
}

export default NextAuth(authOptions);