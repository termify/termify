import { useEffect, useState } from 'react';
import ScheduleClass from '../../lib/schedule';
import { useScheduleStore } from '../../store/stores';
import Schedule from '../schedule/schedule';

import TimeSlots from '../schedule/timeslots';

export default function Termin() {
    const pickedDay = useScheduleStore((state) => state.pickedDay);
    const [dateWasPicked, setDateWasPicked] = useState<boolean>(false);

    useEffect(() => {
        setDateWasPicked(
            new Date(pickedDay.day, pickedDay.month, pickedDay.year).toDateString() !== ScheduleClass.defaultDay
        );
    }, [pickedDay]);

    return (
        <div className={`container mx-auto my-auto p-4 `}>
            <div className={'hidden xl:block'}>
                <div className={`grid xl:grid-cols-2 xl:shadow xl:h-[70vh] `}>
                    <Schedule />
                    <TimeSlots />
                </div>
            </div>
            <div className={'xl:hidden'}>
                {!dateWasPicked ? (
                    <Schedule />
                ) : (
                    <TimeSlots
                        onClick={() => {
                            setDateWasPicked(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
}
