import { NextPage } from "next";
import { createContext } from "react";
import { useState } from "react";
import Schedule, { ChangeMonth, ScheduleDate } from "./schedule";
import ScheduleTask from "./scheduleTask";

export const DatePickerContext = createContext<
  [ScheduleDate, React.Dispatch<React.SetStateAction<ScheduleDate>>] | null
>(null);

const Schedular = () => {
  const [pickedDay, setPickedDay] = useState<ScheduleDate>({
    day: 1,
    month: 1,
    year: 1900,
  });

  return (
    <div className="flex-grow container mx-auto p-4 xl:w-1/2 ">
      <DatePickerContext.Provider value={[pickedDay, setPickedDay]}>
        <h2 className="text-3xl text-center my-4">Kalendar</h2>
        <ChangeMonth />
        <Schedule />
        {/* <ScheduleTask /> */}
      </DatePickerContext.Provider>
    </div>
  );
};

export default Schedular;
