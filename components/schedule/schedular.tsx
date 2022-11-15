import { NextPage } from "next";
import { createContext } from "react";
import { useState } from "react";
import Schedule, { ChangeMonth, ScheduleDate } from "./schedule";
import ScheduleTask from "./scheduleTask";

export const DatePickerContext = createContext<
    [ScheduleDate, React.Dispatch<React.SetStateAction<ScheduleDate>>] | null
>(null);

const Schedular = () => {
    const [pickedDay, setPickedDay] = useState<ScheduleDate>({ day: 1, month: 1, year: 1900 });
    const today = new Date();
    const [date, setDate] = useState<ScheduleDate>({
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        dayInWeek: today.getDay(),
    });

    return (
        <div className="flex-grow container mx-auto p-4 xl:w-1/2 ">
            <DatePickerContext.Provider value={[pickedDay, setPickedDay]}>
                <h2 className="text-3xl text-center my-4">Kalendar</h2>
                <ChangeMonth date={date} setDate={setDate} />
                <Schedule date={date} />
                {/* <ScheduleTask /> */}
            </DatePickerContext.Provider>
        </div>
    );
};

export default Schedular;
