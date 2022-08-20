import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/database";
import { Rest } from "../../../types";

interface Task extends TaskPostRequestBody{
    userid: string;
}

export interface TaskPostRequestBody{
    taskName: string;
    startTime: Date;
    duration: number;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){

    const { pid } = req.query;

    switch(req.method as Rest){
        case "GET":

            break;
        case "POST":

        const {taskName, startTime, duration} = req.body as TaskPostRequestBody;

            const success = await createTask({
                userid:pid as string,
                duration,
                startTime,
                taskName
            });

            console.log("S",success)

            if (!success){
                res.send({
                    error:true,
                    msg:"Aufgabe konnte nicht angelegt werden"
                })
                return;
            }

            res.send({
                error:false,
                msg:"Aufgabe wurde erfolgreich angelegt"
            })

            break;
    }


}


async function createTask(task:Task):Promise<boolean>{
    const newTask = await db.task.create({
        data:{
            startTime:task.startTime,
            userId: task.userid,
            taskName: task.taskName,
            duration: task.duration
        }
    })

    if (newTask) return true;
    else return false;
}


