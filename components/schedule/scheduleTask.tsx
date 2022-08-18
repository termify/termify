


export default function ScheduleTask(){
    return(
        <div className="bg-blue-300 flex flex-col items-center gap-4 my-4" >
            <AllTask />
            <div>New Task</div>
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

interface Task{
    taskName: string;
    timeStamp: string;
}

function Task({taskName, timeStamp}:Task){

    const dotColor:{[key: string] : string} = {
        0: "bg-slate-500",
        1: "bg-gray-500",
        2: "bg-zinc-500",
        3: "bg-neutral-500",
        4: "bg-stone-500",
        5: "bg-red-500",
        6: "bg-orange-500",
        7: "bg-amber-500",
        8: "bg-yellow-500",
        9: "bg-lime-500",
        10: "bg-green-500",
        11: "bg-emerald-500",
        12: "bg-teal-500",
        13: "bg-cyan-500",
        14: "bg-sky-500",
        15: "bg-blue-500",
        16: "bg-indigo-500",
        17: "bg-violet-500",
        18: "bg-purple-500",
        19: "bg-fuchsia-500",
        20: "bg-pink-500",
        21: "bg-rose-500"
    }   

    function returnColor():string{

        const randomValue = Math.ceil(Math.random() * Object.keys(dotColor).length);

        return dotColor[randomValue] || dotColor[0];


    }
    
    return(
        <div className="hover:bg-slate-200 p-2">
            <h3 className="font-bold" >{taskName}</h3>
            <div className="flex items-center gap-2" >
                <div className={`${returnColor()} w-2 h-2 rounded-full`} />
                <p className="text-sm" >{timeStamp}</p>
            </div>
        </div>
    )
}