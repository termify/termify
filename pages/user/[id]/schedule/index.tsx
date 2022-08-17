import { NextPage } from "next";
import { useState } from "react";
import Schedule, { ChangeMonth, ScheduleDate } from "../../../../components/schedule/schedule";

const SchedulePage:NextPage = () => {

    const today = new Date();

    const [date, setDate] = useState<ScheduleDate>({
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        dayInWeek: today.getDay()
    });

    return(
        <div className="flex-grow container mx-auto xl:w-1/2 ">
            <h2 className="text-3xl text-center my-4" >Kalendar</h2>
            <ChangeMonth date={date} setDate={setDate} />
            <Schedule date={date} />
        </div>
    )
}

export default SchedulePage;