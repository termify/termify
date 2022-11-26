import { useRouter } from "next/router";
import React, { ComponentProps, ReactNode, useState } from "react";

interface OpeningDays {
	day: string;
	checked: boolean;
	from: string;
	to: string;
}

const defaultOpeneningDays: OpeningDays[] = [
	{
		day: "Mo.",
		checked: true,
		from: "00:00",
		to: "23:59",
	},
	{ day: "Di.", checked: true, from: "00:00", to: "23:59" },
	{ day: "Mi.", checked: true, from: "00:00", to: "23:59" },
	{ day: "Do.", checked: true, from: "00:00", to: "23:59" },
	{ day: "Fr.", checked: true, from: "00:00", to: "23:59" },
	{ day: "Sa.", checked: false, from: "00:00", to: "23:59" },
	{ day: "So.", checked: false, from: "00:00", to: "23:59" },
];

// Opening Ändern von bis => Weekday + Timeslots from und Timeslot to
export const OpeningSettings = () => {
	const [openeningDays, setOpeneningDays] = useState<OpeningDays[]>(defaultOpeneningDays);

	function changeAvailablelityDate(index: number) {
		openeningDays[index].checked = !openeningDays[index].checked;

		setOpeneningDays([...openeningDays]);
	}

	function changeAvailablelityTime(index: number, type: "from" | "to", value: string) {
		switch (type) {
			case "from":
				openeningDays[index].from = value;
				break;
			case "to":
				openeningDays[index].to = value;
				break;
		}

		setOpeneningDays([...openeningDays]);
	}

	return (
		<GridEntrieContainer gradientType={"fromSky"}>
			<h2 className={"font-bold text-3xl"}>Einstellungen Öffnungszeiten 🕰️</h2>
			<h3 className={"indent-1 mt-2"}>An welchen Tagen geöffnet?</h3>
			<div className={"grid grid-cols-7 my-4 gap-4 p-2"}>
				{openeningDays.map((e, i) => (
					<DaySlot key={i} day={e.day} index={i} checked={e.checked} changeAvailablelityDay={changeAvailablelityDate} />
				))}
			</div>
			<div className={"flex flex-col gap-2 my-8"}>
				{openeningDays.map((e, i) => {
					if (e.checked) {
						return (
							<TimeSlot
								key={i}
								dayName={e.day}
								from={e.from}
								to={e.to}
								index={i}
								changeAvailablelityTime={changeAvailablelityTime}
							/>
						);
					}
				})}
			</div>
		</GridEntrieContainer>
	);
};

function parseShortDayToFull(day: string) {
	switch (day) {
		case "Mo.":
			return "Montag";
		case "Di.":
			return "Dienstag";
		case "Mi.":
			return "Mittwoch";
		case "Do.":
			return "Donnerstag";
		case "Fr.":
			return "Freitag";
		case "Sa.":
			return "Samstag";
		case "So.":
			return "Sonntag";
	}
}

interface TimeSlotProps {
	dayName: string;
	from: string;
	to: string;
	index: number;
	changeAvailablelityTime: (index: number, type: "from" | "to", value: string) => void;
}

function TimeSlot({ dayName, from, to, index, changeAvailablelityTime }: TimeSlotProps) {
	return (
		<div className={"grid grid-cols-3 gap-4 "}>
			<p className={" font-bold"}>{parseShortDayToFull(dayName)}</p>
			<div className={"flex items-center gap-8"}>
				<label htmlFor={`from-${dayName}`}>Von: </label>
				<input
					title={"Von"}
					type={"time"}
					className={"p-1 rounded-md border-2 border-sky-400"}
					value={from}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						changeAvailablelityTime(index, "from", e.target.value);
					}}
				/>
			</div>
			<div className={"flex items-center gap-8"}>
				<label htmlFor={`to-${dayName}`}>Bis: </label>
				<input
					title={"Bis"}
					type={"time"}
					className={"p-1 rounded-md border-2 border-sky-400"}
					value={to}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						changeAvailablelityTime(index, "to", e.target.value);
					}}
				/>
			</div>
		</div>
	);
}

interface DaySlotProps extends ComponentProps<"input"> {
	day: string;
	index: number;
	changeAvailablelityDay: (index: number) => void;
}

function DaySlot({ day, index, checked, changeAvailablelityDay, ...props }: DaySlotProps) {
	return (
		<div>
			<label
				className={`font-bold text-center p-4 rounded-md border-2 select-none ${
					checked ? "border-emerald-400 bg-emerald-100" : "border-rose-400 bg-rose-100"
				}  shadow-md ${
					index === 6 ? "text-rose-900" : "text-emerald-900"
				} transition-all hover:xl:scale-110 hover:xl:cursor-pointer `}
			>
				{day}
				<input
					{...props}
					type={"checkbox"}
					checked={checked}
					onChange={() => {
						changeAvailablelityDay(index);
					}}
					className={"hidden"}
				/>
			</label>
		</div>
	);
}

// Appointment Settings => Interval und Holidays

export const AppointmentSettings = () => {
	return <GridEntrieContainer gradientType={"fromRose"}>Appontment Settings</GridEntrieContainer>;
};
// Appointment Slots => Blacklist + Date from und Date to

export const AppointmentSlotSettings = () => {
	return <GridEntrieContainer gradientType={"fromIndigo"}>Appointment Slot Settings</GridEntrieContainer>;
};

// Webapi config
export const WebApiConfigSettings = () => {
	return <GridEntrieContainer gradientType={"fromEmerald"}>WebApiConfig</GridEntrieContainer>;
};

type GradientType = "fromSky" | "fromRose" | "fromIndigo" | "fromEmerald";

interface GridEntrieContainerProps {
	children: ReactNode;
	gradientType: GradientType;
}

function returnGradient(gradientType: GradientType): string {
	switch (gradientType) {
		case "fromSky":
			return "from-sky-400 to-emerald-500";
		case "fromRose":
			return "from-rose-400 to-amber-500";
		case "fromIndigo":
			return "from-indigo-400 to-sky-500";
		case "fromEmerald":
			return "from-emerald-400 to-sky-500";
	}
}

function returnForegroundColor(gradientType: GradientType): string {
	switch (gradientType) {
		case "fromSky":
			return "bg-sky-50";
		case "fromRose":
			return "bg-rose-50";
		case "fromIndigo":
			return "bg-indigo-50";
		case "fromEmerald":
			return "bg-emerald-50";
	}
}

function returnTextColor(gradientType: GradientType): string {
	switch (gradientType) {
		case "fromSky":
			return "text-sky-900";
		case "fromRose":
			return "text-rose-900";
		case "fromIndigo":
			return "text-indigo-900";
		case "fromEmerald":
			return "text-emerald-900";
	}
}

const GridEntrieContainer = ({ children, gradientType }: GridEntrieContainerProps) => {
	const gradient: string = returnGradient(gradientType);
	const foregroundColor: string = returnForegroundColor(gradientType);
	const textColor: string = returnTextColor(gradientType);

	return (
		<div className={`p-1 rounded-md bg-gradient-to-r ${gradient}`}>
			<div className={`p-4 rounded-md ${foregroundColor} ${textColor}`}>{children}</div>
		</div>
	);
};
