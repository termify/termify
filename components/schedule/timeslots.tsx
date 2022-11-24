import { toast } from "react-hot-toast";
import { parseDayNumberToDayString, useShowPickedValue } from "../../lib/schedule";
import { useBookingStore, useScheduleStore } from "../../store/stores";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { OpeningData } from "../../pages/api/dbquery/booking/partnercalendar";

//TODO Kevin Bläser: Ersetze Obj durch DB Query

interface TimeSlotsProps {
	onClick?: () => void;
}

function returnTimeslotDay(allowedDates: OpeningData[], pickedDate: number): { from: string; to: string } {
	let returnData: OpeningData = {
		weekday: "",
		id: -1,
		timeslotFrom: new Date(),
		timeslotTo: new Date(),
	};

	allowedDates.forEach((e) => {
		if (e.weekday === parseDayNumberToDayString[pickedDate]) returnData = e;
	});

	return {
		from: parsedTime(new Date(returnData.timeslotFrom as Date)),
		to: parsedTime(new Date(returnData.timeslotTo as Date)),
	};
}

function parsedTime(time: Date) {
	let returntime;

	time = new Date(time as Date);
	returntime = time.getHours() - 1 + ":" + time.getMinutes();

	return returntime;
}

function parsedTimeToInterval(from: string, to: string) {
	const fromTime = from.split(":");
	const toTime = to.split(":");

	const [fromHour, _from] = [parseInt(fromTime[0]), parseInt(fromTime[1])];
	const [toHour, _to] = [parseInt(toTime[0]), parseInt(toTime[1])];

	const diff = toHour - fromHour;

	let interval = 30;
	const divider = 60 / interval;
	const val = diff * divider;

	let timeSlots: string[];
	timeSlots = Array.from(new Array(val + 1)).map((e, i) => {
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

	const { from, to } = returnTimeslotDay(allowedDates, pickedDate);

	const times = parsedTimeToInterval(from, to);

	return (
		<div className={" overflow-auto transition-all xl:ml-8"}>
			<div
				className={
					" flex items-center justify-between p-4 bg-gradient-to-r from-rose-400 to-amber-500 shadow-md text-rose-50 font-bold  xl:text-2xl"
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

	function onClickHandler() {
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
				"bg-red-300 p-1 shadow rounded bg-gradient-to-r from-rose-400 to-amber-500 w-2/3 mx-auto group transition-all xl:hover:scale-110"
			}
		>
			<div
				className={`bg-white p-1 shadow rounded xl:group-hover:bg-gradient-to-r xl:group-hover:from-rose-400 xl:group-hover:to-amber-500 xl:group-hover:shadow-none`}
			>
				<p
					className={`text-center font-bold text-2xl bg-gradient-to-r from-rose-400 to-amber-500 p-1 bg-clip-text text-transparent xl:group-hover:text-rose-100 `}
				>
					{time}
				</p>
			</div>
		</button>
	);
}
