import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import ScheduleClass from "../../lib/schedule";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";
import { DatePickerContext } from "../../pages/user/[id]/schedule";

interface Schedule {
    date: ScheduleDate;
}

export default function Schedule({ date }: Schedule) {
    const [gap, setGap] = useState<number>(1);
    const [daysInMonth, setDaysInMonth] = useState<number>(0);

    useEffect(() => {
        setGap(new Date(date.year, date.month, 1).getDay() - 1);
    }, [date.month, date.year, gap]);

    useEffect(() => {
        setDaysInMonth(ScheduleClass.daysInMonth(date));
    }, [daysInMonth, date.month, date.year, date]);

    return (
        <div>
            <div className="flex w-full my-2">
                {["Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa.", "So."].map((e, i) => (
                    <DateDay key={e} dateName={e} isSunday={i === 6} />
                ))}
            </div>
            <div className="bg-slate-300/25 flex flex-wrap ">
                {Array.from({ length: gap }).map((e, i) => (
                    <PlaceholderDay key={i} />
                ))}
                {Array.from({ length: daysInMonth }).map((e, i) => (
                    <ScheduleDay key={i} dayNumber={i + 1} date={date} />
                ))}
            </div>
        </div>
    );
}

function DateDay({ dateName, isSunday }: { dateName: string; isSunday: boolean }) {
    return (
        <p className={`w-[14.2857%] text-center font-bold ${isSunday ? "text-rose-500" : ""}`}>
            {dateName}
        </p>
    );
}

interface ScheduleDay {
    dayNumber: number;
    date: ScheduleDate;
}

function ScheduleDay({ dayNumber, date }: ScheduleDay) {
    const dateContext = useContext(DatePickerContext);
    const [pickedDate, setPickedDate] = dateContext as [
        ScheduleDate,
        React.Dispatch<React.SetStateAction<ScheduleDate>>
    ];
    const [picked, setPicked] = useState<boolean>(false);

    const dateChanged = useMemo(() => {
        setPicked(
            new Date(pickedDate.year, pickedDate.month, pickedDate.day).toDateString() ===
                new Date(date.year, date.month, dayNumber).toDateString()
        );
    }, [date.month, date.year, dayNumber, pickedDate.day, pickedDate.month, pickedDate.year]);

    useEffect(() => {}, [dateChanged]);

    function onClickHandler(e: React.MouseEvent<HTMLDivElement>) {
        setPickedDate({
            day: dayNumber,
            month: date.month,
            year: date.year,
        });
    }

    const setColor = picked
        ? "bg-gradient-to-b from-sky-300 to-sky-500 text-sky-900"
        : new Date(date?.year as number, date?.month as number, dayNumber).toDateString() ===
          new Date().toDateString()
        ? "bg-gradient-to-b from-emerald-300 to-emerald-500 text-emerald-900"
        : "bg-gradient-to-b from-slate-100 to-slate-300 text-slate-900";

    return (
        <div
            onClick={onClickHandler}
            className={`${setColor}  w-[14.2857%] h-14 border border-slate-500 flex justify-center items-center text-xl font-bold select-none transition-all xl:hover:scale-110 xl:hover:shadow-xl xl:h-24 xl:hover:cursor-pointer`}
        >
            {dayNumber}
        </div>
    );
}

function PlaceholderDay() {
    return <div className="w-[14.2857%] h-14 xl:h-24" />;
}

export function ChangeMonth({
    date,
    setDate,
}: {
    date: ScheduleDate;
    setDate: React.Dispatch<React.SetStateAction<ScheduleDate>>;
}) {
    const [monthName, setMonthName] = useState<string>("");

    useEffect(() => {
        setMonthName(ScheduleClass.parseMonthNumberToString(date.month + 1, "de"));
    }, [monthName, date.month]);

    function decreaseMonth() {
        if (date.month - 1 === 0) {
            setDate({ ...date, month: 12, year: date.year - 1 });
            return;
        }

        setDate({ ...date, month: date.month - 1 });
    }

    function increaseMonth() {
        if (date.month + 1 === 13) {
            setDate({ ...date, month: 1, year: date.year + 1 });
            return;
        }

        setDate({ ...date, month: date.month + 1 });
    }

    return (
        <div className="mt-8">
            <p className="text-center underline underline-offset-2">{date.year}</p>
            <div className="flex justify-between items-center text-2xl">
                <button title="Button" className="p-2 mx-4 " onClick={decreaseMonth}>
                    <RiArrowDropLeftLine className="w-8 h-8 transition-all xl:w-12 xl:h-12 xl:hover:scale-110" />
                </button>
                <p className="font-bold text-md">{monthName}</p>
                <button title="Button" className="p-2 mx-4" onClick={increaseMonth}>
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
