import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegCalendarPlus } from "react-icons/fa";
import { TaskPostRequestBody } from "../../pages/api/task/[pid]";


export default function ScheduleTask(){
    return(
        <div className="flex flex-col items-center gap-4 my-4" >
            <AllTask />
            <NewTask />
        </div>
    )
}

function AllTask(){
    return(
        <div className="bg-slate-100 w-full rounded-md" >
            <Task taskName="Scrum Protokol" timeStamp={"15:20 - 16:20"} />
            <Task taskName="Geburtag" timeStamp={"12:20 - 14:20"} />
        </div>
    )
}

function NewTask(){

    const router = useRouter();
    const { id } = router.query;

    async function createNewTask(){
        const {error, msg} = await (await fetch(`/api/task/${id}/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({duration:100,startTime:new Date(),taskName:"Neuer Task"} as TaskPostRequestBody)
        })).json() as {error: boolean, msg: string}

        if (error)
            toast.error(msg);
        else
            toast.success(msg);

    }

    return(
        <div className="flex justify-end w-full" onClick={createNewTask} >
            <button className="flex items-center" >
                <p>Neuen Eintrag erstellen</p>
                <FaRegCalendarPlus className="h-12 w-12 p-2" />
            </button>
        </div>
    )
}

interface Task{
    taskName: string;
    timeStamp: string;
}

function Task({taskName, timeStamp}:Task){

    const [bgColor, setBgColor] = useState<string>("");

    const returnColor = useCallback(()=>{
        const dotColor:{[key: string] : string} = {
            1: "bg-red-500",
            2: "bg-orange-500",
            3: "bg-amber-500",
            4: "bg-yellow-500",
            5: "bg-lime-500",
            6: "bg-green-500",
            7: "bg-emerald-500",
            8: "bg-teal-500",
            9: "bg-cyan-500",
            10: "bg-sky-500",
            11: "bg-blue-500",
            12: "bg-indigo-500",
            13: "bg-violet-500",
            14: "bg-purple-500",
            15: "bg-fuchsia-500",
            16: "bg-pink-500",
            17: "bg-rose-500"
        }   

        const randomValue = Math.ceil(Math.random() * Object.keys(dotColor).length);
        
        setBgColor(dotColor[randomValue] || dotColor[0]);
    },[])

    useEffect(()=>{
        returnColor();
    },[returnColor])


    return(
        <div className="p-2 xl:hover:bg-slate-200 xl:hover:rounded xl:hover:cursor-pointer ">
            <h3 className="font-bold" >{taskName}</h3>
            <div className="flex items-center gap-2" >
                <div className={`${bgColor} w-2 h-2 rounded-full`} />
                <p className="text-sm" >{timeStamp}</p>
            </div>
        </div>
    )
}