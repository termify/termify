import React, { useContext, useEffect, useMemo, useState } from "react";
import ScheduleClass from "../../lib/schedule";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";
import { DatePickerContext } from "./schedular";

interface Schedule {
  date: ScheduleDate;
}

export default function Schedule({ date }: Schedule) {
  const [gap, setGap] = useState<number>(1);
  const [daysInMonth, setDaysInMonth] = useState<number>(0);

  useEffect(() => {
    setDaysInMonth(ScheduleClass.daysInMonth(date));
  }, [daysInMonth, date.month, date.year, date]);

  return (
    <div>
      <div className="grid grid-cols-7  my-2">
        {["Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa.", "So."].map((e, i) => (
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
  );
}

function DateDay({
  dateName,
  isSunday,
}: {
  dateName: string;
  isSunday: boolean;
}) {
  return (
    <p
      className={`text-center font-bold ${
        isSunday ? "text-rose-500" : ""
      } xl:text-3xl`}
    >
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
      new Date(
        pickedDate.year,
        pickedDate.month,
        pickedDate.day
      ).toDateString() ===
        new Date(date.year, date.month, dayNumber).toDateString()
    );
  }, [
    date.month,
    date.year,
    dayNumber,
    pickedDate.day,
    pickedDate.month,
    pickedDate.year,
  ]);

  function onClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (todayIsNewerThenYesterday)
      setPickedDate({
        day: dayNumber,
        month: date.month,
        year: date.year,
      });
  }

  const tt = new Date(date?.year as number, date?.month as number, dayNumber);
  const tt2 = new Date(
    date?.year as number,
    date?.month as number,
    dayNumber - 1
  );

  const todayIsNewerThenYesterday =
    new Date() <=
    new Date(date?.year as number, date?.month as number, dayNumber);

  const setColor = picked
    ? "bg-gradient-to-r from-sky-400 to-emerald-500 text-sky-900 font-bold "
    : todayIsNewerThenYesterday
    ? "bg-gradient-to-r from-sky-400/[5%] to-emerald-500/[5%] text-sky-900"
    : "bg-slate-100/10";

  return (
    <div className={"p-1"}>
      <button
        onClick={onClickHandler}
        className={`${setColor} m-auto flex justify-center items-center rounded-full transition-colors transition-opacity transition-transform w-12 h-12 md:h-16 md:w-16 xl:text-2xl xl:h-20 xl:w-20 ${
          picked
            ? "xl:hover:from-sky-400 xl:hover:to-emerald-500"
            : "xl:hover:from-sky-400/[50%] xl:hover:to-emerald-500/[50%]"
        }
        ${todayIsNewerThenYesterday ? " xl:hover:scale-110" : ""} 
        xl:hover:cursor-pointer`}
      >
        {dayNumber}
      </button>
      {new Date(
        date?.year as number,
        date?.month as number,
        dayNumber
      ).toDateString() === new Date().toDateString() ? (
        <div
          className={
            "relative mx-auto bottom-4 w-2 h-2 bg-gradient-to-r from-sky-400 to-emerald-500 rounded-full "
          }
        />
      ) : null}
    </div>
  );
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
