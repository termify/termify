import Schedule, { ChangeMonth, ScheduleDate } from './schedule';
import TimeSlots from './timeslots';
import { useScheduleStore } from '../../store/stores';
import ScheduleClass from '../../lib/schedule';
import { useEffect, useState } from 'react';

const Scheduler = () => {
    const pickedDay = useScheduleStore((state) => state.pickedDay);
    const [dateWasPicked, setDateWasPicked] = useState<boolean>(false);

    useEffect(() => {
        setDateWasPicked(
            new Date(pickedDay.day, pickedDay.month, pickedDay.year).toDateString() !== ScheduleClass.defaultDay
        );
    }, [pickedDay]);

    return (
        <div className={`flex-grow container mx-auto p-4 ${dateWasPicked ? 'xl:w-2/3' : 'xl:w-1/2'}`}>
            <h2 className="text-3xl text-center my-4">Kalendar</h2>
            <div className={`flex flex-col items-center ${dateWasPicked ? '' : 'xl:flex-row xl:justify-center'}`}>
                <Schedule />
                {dateWasPicked ? <TimeSlots /> : null}
            </div>

            {/* <ScheduleTask /> */}
        </div>
    );
};

export default Scheduler;
