import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req:NextApiRequest, res:NextApiResponse){

    const { pid } = req.query;

    console.log("PID",pid);

}