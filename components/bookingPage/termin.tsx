import { useMemo, useState } from "react";
import ScheduleClass from "../../lib/schedule";
import { useBookingStore, useScheduleStore } from "../../store/stores";
import Schedule from "../schedule/schedule";
import TimeSlots from "../schedule/timeslots";
import { suspend } from "suspend-react";
import { useBaseUrl } from "../../lib/baseUrl";
import { GetResponse } from "../../pages/api/dbquery/booking/partnercalendar";

export default function Termin() {
	const pickedDay = useScheduleStore((state) => state.pickedDay);
	const [dateWasPicked, setDateWasPicked] = useState<boolean>(false);
	const setAllowedDates = useScheduleStore((state) => state.setAllowedDates);
	const bookingData = useBookingStore((state) => state.bookingData);
	const baseUrl = useBaseUrl();

	useMemo(() => {
		setDateWasPicked(
			new Date(pickedDay.day, pickedDay.month, pickedDay.year).toDateString() !== ScheduleClass.defaultDay
		);
	}, [pickedDay]);

	suspend(async () => {
		const calendarResponse = (await (
			await fetch(`${baseUrl}/api/dbquery/booking/partnercalendar`)
		).json()) as GetResponse;

		setAllowedDates(calendarResponse.openingData);
		return calendarResponse;
	}, [`termin-${JSON.stringify(bookingData)}`]);

	return (
		<div className={`container mx-auto p-4 xl:my-auto`}>
			<div className={"hidden xl:block"}>
				<div className={`grid xl:grid-cols-2 xl:shadow xl:h-[70vh] `}>
					<Schedule />
					<TimeSlots />
				</div>
			</div>
			<div className={"xl:hidden"}>
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
