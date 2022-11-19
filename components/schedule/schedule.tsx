import React, { useEffect, useMemo, useState } from 'react';
import ScheduleClass from '../../lib/schedule';
import { RiArrowDropRightLine, RiArrowDropLeftLine } from 'react-icons/ri';
import { useScheduleStore } from '../../store/stores';

export default function Schedule() {
    const date = useScheduleStore((state) => state.date);
    const [daysInMonth, setDaysInMonth] = useState<number>(0);
    const [gap, setGap] = useState<number>(new Date(date.year, date.month, 1).getDay() - 1);

    useEffect(() => {
        if (new Date(date.year, date.month, 1).getDay() - 1 === -1) {
            setGap(6);
        } else {
            setGap(new Date(date.year, date.month, 1).getDay() - 1);
        }
    }, [date.month, date.year, gap]);

    useEffect(() => {
        setDaysInMonth(ScheduleClass.daysInMonth({ ...date, month: date.month + 1 }));
    }, [daysInMonth, date.month, date.year, date]);

    return (
        <div>
            <ChangeMonth />
            <div>
                <div className="grid grid-cols-7  my-2">
                    {['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.'].map((e, i) => (
                        <DateDay key={e} dateName={e} isSunday={i === 6} />
                    ))}
                </div>
                <div className="grid grid-cols-7">
                    {Array.from({ length: gap }).map((e, i) => (
                        <div key={i} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((e, i) => (
                        <ScheduleDay key={i} dayNumber={i + 1} date={date} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DateDay({ dateName, isSunday }: { dateName: string; isSunday: boolean }) {
    return <p className={`text-center font-bold ${isSunday ? 'text-rose-500' : ''} xl:text-3xl`}>{dateName}</p>;
}

interface ScheduleDay {
    dayNumber: number;
    date: ScheduleDate;
}

function ScheduleDay({ dayNumber, date }: ScheduleDay) {
    const pickedDate = useScheduleStore((state) => state.pickedDay);
    const setPickedDate = useScheduleStore((state) => state.setPickedDay);

    const [picked, setPicked] = useState<boolean>(false);

    useMemo(() => {
        const isPicked =
            new Date(pickedDate.year, pickedDate.month, pickedDate.day).toDateString() ===
            new Date(date.year, date.month, dayNumber).toDateString();

        setPicked(isPicked);
    }, [date.month, date.year, dayNumber, pickedDate.day, pickedDate.month, pickedDate.year]);

    function onClickHandler() {
        if (todayIsNewerThenYesterday)
            setPickedDate({
                day: dayNumber,
                month: date.month,
                year: date.year,
            });
    }

    const todayIsNewerThenYesterday = new Date() <= new Date(date?.year as number, date?.month as number, dayNumber);

    const setColor = picked
        ? 'bg-gradient-to-r from-sky-400 to-emerald-500 text-sky-900 font-bold '
        : todayIsNewerThenYesterday
        ? 'bg-gradient-to-r from-sky-400/[5%] to-emerald-500/[5%] text-sky-60'
        : 'bg-slate-100/10';

    return (
        <div className={'p-1'}>
            <button
                onClick={onClickHandler}
                className={`${setColor} m-auto flex justify-center items-center rounded-full transition-colors transition-opacity transition-transform w-10 h-10 md:h-16 md:w-16 xl:text-2xl xl:h-18 xl:w-18 ${
                    picked
                        ? 'xl:hover:from-sky-400 xl:hover:to-emerald-500 text-sky-50'
                        : 'xl:hover:from-sky-400/[50%] xl:hover:to-emerald-500/[50%]'
                }
        ${todayIsNewerThenYesterday ? ' xl:hover:scale-110' : ''} 
        xl:hover:cursor-pointer`}
            >
                {dayNumber}
                {new Date(date?.year as number, date?.month as number, dayNumber).toDateString() ===
                new Date().toDateString() ? (
                    <TodayDot />
                ) : null}
            </button>
        </div>
    );
}

function TodayDot() {
    return (
        <div className="relative flex justify-center relative origin-center bottom-1 bottom-3 left-1">
            <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-400 to-emerald-500 opacity-75  "></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gradient-to-r from-sky-400 to-emerald-500 "></span>
        </div>
    );
}

export function ChangeMonth() {
    const [monthName, setMonthName] = useState<string>('');

    const date = useScheduleStore((state) => state.date);
    const setDate = useScheduleStore((state) => state.setDate);

    useEffect(() => {
        setMonthName(ScheduleClass.parseMonthNumberToString(date.month + 1, 'de'));
    }, [monthName, date.month]);

    function decreaseMonth() {
        if (date.month - 1 === -1) {
            setDate({ ...date, month: 11, year: date.year - 1 });
            return;
        }

        setDate({ ...date, month: date.month - 1 });
    }

    function increaseMonth() {
        if (date.month + 1 === 12) {
            setDate({ ...date, month: 0, year: date.year + 1 });
            return;
        }

        setDate({ ...date, month: date.month + 1 });
    }

    return (
        <div className="mt-8">
            <p className="text-center underline underline-offset-2">{date.year}</p>
            <div className="flex justify-between items-center text-2xl">
                <button title="a" className="p-2 mx-4 " onClick={decreaseMonth}>
                    <RiArrowDropLeftLine className="w-8 h-8 transition-all xl:w-12 xl:h-12 xl:hover:scale-110" />
                </button>
                <p className="font-bold text-md">{monthName}</p>
                <button title="a" className="p-2 mx-4" onClick={increaseMonth}>
                    <RiArrowDropRightLine className="w-8 h-8 transition-all xl:w-12 xl:h-12 xl:hover:scale-110" />
                </button>
            </div>
        </div>
    );
}

export interface ScheduleDate {
    day: number;
    month: number;
    year: number;
    dayInWeek?: number;
}
