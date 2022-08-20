import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useEffect } from "react";
import { useState } from "react";
import Schedule, { ChangeMonth, ScheduleDate } from "../../../../components/schedule/schedule";
import ScheduleTask from "../../../../components/schedule/scheduleTask";


export const DatePickerContext = createContext<[ScheduleDate,React.Dispatch<React.SetStateAction<ScheduleDate>>] | null>(null);


const SchedulePage:NextPage = () => {

    const [pickedDay, setPickedDay] = useState<ScheduleDate>({day:1,month:1,year:1900});
    const router = useRouter();
    const today = new Date();
    const [date, setDate] = useState<ScheduleDate>({
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        dayInWeek: today.getDay()
    });

    useEffect(()=>{

        if (!router.isReady) return;

        const getSession = JSON.parse(sessionStorage.getItem("auth") as string) as {id: string; token: string;};

        if (getSession){
            if (getSession.id !== router.query.id) router.push(`/user/${getSession.id}/schedule`);
        }else{
            router.push(`/register`);
        }

    },[router, router.isReady])


    return(
        <div className="flex-grow container mx-auto xl:w-1/2 ">
            <DatePickerContext.Provider value={[pickedDay, setPickedDay]} >
                <h2 className="text-3xl text-center my-4" >Kalendar</h2>
                <ChangeMonth date={date} setDate={setDate} />
                <Schedule date={date} />
                <ScheduleTask />
            </DatePickerContext.Provider>
        </div>
    )
}

export default SchedulePage;