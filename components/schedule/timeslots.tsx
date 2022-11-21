import { toast } from "react-hot-toast";
import { parseDayNumberToDayString, parseDayStringToDayNumberArray, useShowPickedValue } from "../../lib/schedule";
import { useBookingStore, useScheduleStore } from "../../store/stores";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { suspend } from "suspend-react";
import { baseUrl } from "../../lib/baseUrl";
import { GetResponse, OpeningData } from "../../pages/api/dbquery/booking/partnercalendar";
import { useState } from "react";

//TODO Kevin Bläser: Ersetze Obj durch DB Query

// const times: string[] = [
// 	"09:00",
// 	"09:30",
// 	"10:00",
// 	"10:30",
// 	"11:00",
// 	"11:30",
// 	"12:00",
// 	"12:30",
// 	"13:00",
// 	"13:30",
// 	"14:00",
// 	"14:30",
// ];

interface TimeSlotsProps {
	onClick?: () => void;
}

function getTodaysTimeslot(allowedDates: OpeningData[], pickedDate: number): OpeningData {
	const weekDay: string = parseDayNumberToDayString[pickedDate];

	let returnValue: OpeningData;

	allowedDates.forEach((e) => {
		if (e.weekday === weekDay) returnValue = e;
	});

	//timeslotFrom | timeslotTo

	// @ts-ignore
	return returnValue;
}

function returnTimeslotDay(
	allowedDates: OpeningData[],
	pickedDate: number
): { from: string; to: string; set: string[] } {
	let returnData: OpeningData = {
		weekday: "",
		id: -1,
		timeslotFrom: new Date(),
		timeslotTo: new Date(),
		timeslotSet: "",
	};

	allowedDates.forEach((e) => {
		if (e.weekday === parseDayNumberToDayString[pickedDate]) returnData = e;
	});

	const timeslotString: string = returnData.timeslotSet.slice(1, returnData.timeslotSet.length - 1) as string;
	const timeslot: string[] = timeslotString.split(",");

	return {
		from: parsedTime(new Date(returnData.timeslotFrom as Date)),
		to: parsedTime(new Date(returnData.timeslotTo as Date)),
		set: timeslot,
	};
}

function parsedTime(time: Date) {
	let returntime;

	time = new Date(time as Date);
	returntime = time.getHours() - 1 + ":" + time.getMinutes();

	return returntime;
}

function parsedTimeToIntervall(from: string, to: string) {
	const fromTime = from.split(":");
	const toTime = to.split(":");

	const [fromHour, fromMinutes] = [parseInt(fromTime[0]), parseInt(fromTime[1])];
	const [toHour, toMinutes] = [parseInt(toTime[0]), parseInt(toTime[1])];

	const diff = toHour - fromHour;

	let intervall = 30;
	const divider = 60 / intervall;
	const val = diff * divider;

	const timeSlots: string[] = Array.from(new Array(val + 1)).map((e, i) => {
		if (i % 2 === 0) {
			return `${fromHour + i / divider < 10 ? `0${fromHour + i / divider}` : fromHour + i / divider}:00`;
		} else {
			const t: string = String(fromHour + i / divider);

			return `${t.split(".")[0].length === 2 ? t.split(".")[0] : `0${t.split(".")[0]}`}:30`;
		}
	});

	return timeSlots;
}

export default function TimeSlots({ onClick }: TimeSlotsProps) {
	const { picked, today } = useShowPickedValue();
	const allowedDates = useScheduleStore((state) => state.allowedDates);
	const pickedValue = useScheduleStore((state) => state.pickedDay);
	const pickedDate: number = new Date(pickedValue.year, pickedValue.month, pickedValue.day).getDay();

	const { from, to, set: times } = returnTimeslotDay(allowedDates, pickedDate);

	// const times = parsedTimeToIntervall(from, to);

	return (
		<div className={" overflow-auto transition-all xl:ml-8"}>
			<div
				className={
					" flex items-center justify-between p-4 bg-gradient-to-r from-sky-400 to-emerald-500 shadow-md text-sky-50 font-bold xl:text-2xl"
				}
			>
				{today}
				<button title={"Zurück"} className={"h-6 xl:hidden"} onClick={onClick}>
					<BsFillArrowLeftCircleFill className={"w-full h-full"} />
				</button>
			</div>
			{picked && (
				<div className={"p-4 h-full flex flex-col gap-4"}>
					{times.map((e, i) => (
						<TimeSlotEntrie key={i} time={e} />
					))}
				</div>
			)}
		</div>
	);
}

interface TimeSlotEntrieProps {
	time: string;
}

function TimeSlotEntrie({ time }: TimeSlotEntrieProps) {
	const pickedDate = useScheduleStore((state) => state.pickedDay);
	const bookingData = useBookingStore((state) => state.bookingData);
	const setBookingData = useBookingStore((state) => state.setBookingData);
	const setBookingPage = useBookingStore((state) => state.setPageNumber);

	function onClickHandler(e: React.PointerEvent<HTMLButtonElement>) {
		const isValid =
			JSON.stringify(pickedDate) !==
			JSON.stringify({
				day: 1,
				month: 1,
				year: 1900,
			});

		if (!isValid) {
			toast.error("Bitte wählen Sie ein passendes Datum");
			return;
		}

		setBookingData({
			...bookingData,
			time,
			date: pickedDate,
		});
		setBookingPage(3);
	}

	return (
		<button
			onClick={onClickHandler}
			className={
				"bg-red-300 p-1 shadow rounded bg-gradient-to-r from-sky-400 to-emerald-500 w-2/3 mx-auto transition-all xl:hover:scale-110"
			}
		>
			<div className={"bg-white p-1 shadow rounded"}>
				<p
					className={
						"text-center font-bold text-2xl bg-gradient-to-r from-sky-400 to-emerald-500 p-1 bg-clip-text text-transparent"
					}
				>
					{time}
				</p>
			</div>
		</button>
	);
}
