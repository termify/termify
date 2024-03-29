import create from "zustand";
import { OpeningData } from "../pages/api/dbquery/booking/partnercalendar";

type BookingDataProps = {
	officeId: number;
	officeName: string;
	date: DateProps;
	time: string;
};

interface BookingStoreProps {
	pageIndex: number;
	setPageNumber: (newValue: number) => void;
	bookingData: BookingDataProps;
	setBookingData: (newValue: BookingDataProps) => void;
	resetBookingData: () => void;
}

export const useBookingStore = create<BookingStoreProps>((set) => ({
	pageIndex: 1,
	setPageNumber: (newValue) =>
		set((prevState) => ({
			...prevState,
			pageIndex: newValue < 1 ? 1 : newValue > 4 ? 4 : newValue,
		})),
	bookingData: {
		officeId: 0,
		officeName: "",
		date: {
			day: -1,
			month: -1,
			year: -1,
		},
		time: "",
	},
	setBookingData: (newValue) => set((prevState) => ({ ...prevState, bookingData: newValue })),
	resetBookingData: () =>
		set((prevState) => ({
			...prevState,
			bookingData: {
				officeId: 0,
				officeName: "",
				date: {
					day: -1,
					month: -1,
					year: -1,
				},
				time: "",
			},
		})),
}));

export type DateProps = {
	day: number;
	month: number;
	year: number;
};

type ScheduleDateProps = DateProps & {
	dayInWeek: number;
};

interface ScheduleStoreProps {
	date: ScheduleDateProps;
	setDate: (newDate: ScheduleDateProps) => void;
	pickedDay: DateProps;
	setPickedDay: (pickedDay: DateProps) => void;
	allowedDates: OpeningData[];
	setAllowedDates: (allDates: OpeningData[]) => void;
}

export const useScheduleStore = create<ScheduleStoreProps>((set) => ({
	date: {
		day: new Date().getDate(),
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
		dayInWeek: new Date().getDay(),
	},
	setDate: (newDate) => set((prevState) => ({ ...prevState, date: newDate })),
	pickedDay: {
		day: 1,
		month: 1,
		year: 1900,
	},
	setPickedDay: (pickedDay) => set((prevState) => ({ ...prevState, pickedDay: pickedDay })),
	allowedDates: [
		{
			id: -1,
			weekday: "",
			timeslotFrom: null,
			timeslotTo: null,
			timeslotSet: [""],
		},
	],
	setAllowedDates: (allDates) => set((prevState) => ({ ...prevState, allowedDates: allDates })),
}));

type SessionData =
	| {
			id: string;
			token: string;
	  }
	| undefined;

interface AuthStoreProps {
	isLoggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
	partnerId: number;
	setPartnerId: (partnerId: number) => void;
	session: SessionData;
	setSession: (sessionData: SessionData) => void;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
	isLoggedIn: false,
	setLoggedIn: (loggedIn) => set((prevState) => ({ ...prevState, isLoggedIn: loggedIn })),
	partnerId: -1,
	setPartnerId: (partnerId) => set((prev) => ({ ...prev, partnerId: partnerId })),
	session: undefined,
	setSession: (sessionData) => set((prev) => ({ ...prev, authSession: sessionData })),
}));
