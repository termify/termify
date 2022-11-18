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
        <div className={`container mx-auto my-auto p-4 `}>
            <div className={`grid ${dateWasPicked ? 'xl:grid-cols-2' : 'xl:grid-cols-1'} xl:shadow xl:h-[60vh] `}>
                <Schedule />
                {dateWasPicked ? <TimeSlots /> : null}
            </div>

            {/* <ScheduleTask /> */}
        </div>
    );
};

export default Scheduler;
