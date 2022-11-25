import { ScheduleDate } from "../components/schedule/schedule";
import { useScheduleStore } from "../store/stores";
import { OpeningData } from "../pages/api/dbquery/booking/partnercalendar";

export type Language = "de";

interface Months {
	[lang: string]: Record<string, string>;
}

export const parseDayStringToDayNumber: Record<string, number> = {
	Sonntag: 0,
	Montag: 1,
	Dienstag: 2,
	Mittwoch: 3,
	Donnerstag: 4,
	Freitag: 5,
	Samstag: 6,
};

export const parseDayNumberToDayString: Record<number, string> = {
	0: "Sonntag",
	1: "Montag",
	2: "Dienstag",
	3: "Mittwoch",
	4: "Donnerstag",
	5: "Freitag",
	6: "Samstag",
};

export const parseDayStringToDayNumberArray = (allowedDates: OpeningData[]): number[] => {
	const returnArray: number[] = [];

	allowedDates.forEach((e) => {
		returnArray.push(parseDayStringToDayNumber[e.weekday]);
	});

	return returnArray;
};

export const useDateIsValid = () => {
	const pickedValue = useScheduleStore((state) => state.pickedDay);

	return (
		JSON.stringify(pickedValue) !==
		JSON.stringify({
			day: 1,
			month: 1,
			year: 1900,
		})
	);
};

export const useShowPickedValue = () => {
	const pickedValue = useScheduleStore((state) => state.pickedDay);
	const pickedDate = new Date(pickedValue.year, pickedValue.month, pickedValue.day);

	const isValidDate =
		JSON.stringify(pickedValue) !==
		JSON.stringify({
			day: 1,
			month: 1,
			year: 1900,
		});

	return isValidDate
		? {
				picked: true,
				today: pickedDate.toLocaleDateString("de-DE", {
					weekday: "long",
					day: "numeric",
					month: "long",
				}),
		  }
		: {
				picked: false,
				today: "Bitte wählen Sie einen Tag",
		  };
};

export default class ScheduleClass {
	static defaultDay: string = new Date(1, 1, 1900).toDateString();

	static months: Months = {
		de: {
			1: "Januar",
			2: "Februar",
			3: "März",
			4: "April",
			5: "Mai",
			6: "Juni",
			7: "Juli",
			8: "August",
			9: "September",
			10: "Oktober",
			11: "November",
			12: "Dezember",
		},
	};

	public static parseMonthNumberToString(month: number, language: Language): string {
		return this.months[language][month] || "Monat";
	}

	public static daysInMonth(date: ScheduleDate): number {
		return new Date(date.year, date.month, 0).getDate();
	}
}
