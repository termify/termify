import React, { ComponentProps, ReactNode, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
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
			<h2 className={"font-bold xl:text-3xl"}>Einstellungen Öffnungszeiten 🕰️</h2>
			<h3 className={"indent-1 xl:mt-2"}>An welchen Tagen geöffnet?</h3>
			<div className={"grid p-2  grid-cols-5 gap-4 xl:grid-cols-7 xl:my-4"}>
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
		<div className={"grid gap-2 grid-cols-2 xl:grid-cols-3 xl:gap-4 "}>
			<p className={"font-bold row-span-3"}>{parseShortDayToFull(dayName)}</p>
			<div className={"flex justify-between items-center gap-8 "}>
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
			<div className={"flex justify-between  items-center gap-8"}>
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
				className={`font-bold text-center p-1 rounded-md border-2 select-none ${
					checked ? "border-emerald-400 bg-emerald-100" : "border-rose-400 bg-rose-100"
				}  shadow-md ${
					index === 6 ? "text-rose-900" : "text-emerald-900"
				} transition-all xl:p-4 hover:xl:scale-110 hover:xl:cursor-pointer `}
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
	const [interval, setInterval] = useState<number>(30);
	const [useVacations, setUseVacations] = useState<boolean>(false);

	return (
		<GridEntrieContainer gradientType={"fromRose"}>
			<div>
				<h3 className={"font-bold xl:text-3xl"}>Buchungsintervall 🕰️ und Feiertage 🆓</h3>
				<div className={"flex flex-col gap-8 items-center xl:flex-row  xl:my-8"}>
					<div className={"flex items-center gap-8"}>
						<label className={"font-bold"}>Buchungsintervall:</label>
						<input
							title={"Interval"}
							type={"number"}
							step={15}
							value={interval}
							max={60}
							min={15}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setInterval(parseInt(e.target.value));
							}}
							className={"p-2 rounded-md border-2 border-rose-400 w-16"}
						/>
					</div>
					<div className={"my-8 flex gap-8 items-center"}>
						<label
							className={`font-bold border-2 p-2 rounded-md select-none ${
								useVacations
									? "border-emerald-500 bg-emerald-200 text-emerald-900"
									: "border-rose-500 bg-rose-200 text-rose-900"
							} transition-all hover:xl:cursor-pointer hover:xl:scale-110 xl:active:scale-95 `}
						>
							Feiertage?
							<input
								title={"Feiertage"}
								type={"checkbox"}
								checked={useVacations}
								onChange={ _ => {
									setUseVacations((prev) => !prev);
								}}
								className={"hidden"}
							/>
						</label>
					</div>
				</div>
			</div>
		</GridEntrieContainer>
	);
};

interface VacationDayProps {
	day: string;
	index: number;
	deleteEntrie: (index: number) => void;
}

function VacationDay({ day, deleteEntrie, index }: VacationDayProps) {
	return (
		<div
			onClick={() => {
				deleteEntrie(index);
			}}
			className={
				"relative p-1 bg-gradient-to-r select-none from-indigo-400 to-sky-500 rounded-md group cursor-pointer transition-all hover:scale-105"
			}
		>
			<div className={"p-2 font-bold bg-indigo-50"}>{day}</div>
			<div
				className={
					"hidden bg-indigo-100 absolute top-0 left-0 w-full h-full rounded-md group-hover:xl:flex items-center p-1 justify-around"
				}
			>
				<p className={"select-none"}>Löschen</p> <RiDeleteBinFill />
			</div>
		</div>
	);
}

// Appointment Slots => Block + Date from und Date to

export const AppointmentSlotSettings = () => {
	const [pickedBlockDate, setPickedBlockDate] = useState<string>("");
	const [blockDays, setBlockDays] = useState<string[]>([]);

	const [pickedAllowedDate, setPickedAllowedDate] = useState<string>("");
	const [whitelistDays, setAllowedDays] = useState<string[]>([]);

	function addBlock() {
		if (!pickedBlockDate) return;
		setBlockDays([...blockDays, pickedBlockDate]);
	}

	function deleteBlockEntrie(index: number) {
		blockDays.splice(index, 1);
		setBlockDays([...blockDays]);
	}

	function addAllowed() {
		if (!pickedAllowedDate) return;
		setAllowedDays([...whitelistDays, pickedAllowedDate]);
	}

	function deleteAllowedEntrie(index: number) {
		whitelistDays.splice(index, 1);
		setAllowedDays([...whitelistDays]);
	}

	return (
		<GridEntrieContainer gradientType={"fromIndigo"}>
			<div className={"h-full"}>
				<h3 className={"font-bold xl:text-3xl"}>Blocklist- 😈 und Allowedlist 😇 Tage </h3>
				<div className={"h-full flex flex-col justify-center"}>
					<div>
						<div className={"flex flex-col justify-between gap-8 items-center xl:flex-row"}>
							<label className={"font-bold"}>Blocklist:</label>
							<input
								title={"Kalendar"}
								type={"date"}
								value={pickedBlockDate}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setPickedBlockDate(e.target.value);
								}}
								className={"p-2 rounded-md border-2 border-indigo-400"}
							/>
							<button
								onClick={addBlock}
								className={
									"bg-gradient-to-r from-indigo-400 to-sky-500 p-2 text-indigo-50 font-bold rounded-md transition-all xl:hover:scale-110 xl:active:scale-95"
								}
							>
								Zur Block hinzufügen
							</button>
						</div>
						<div className={"flex p-4 flex-wrap gap-2"}>
							{blockDays.map((e, i) => (
								<VacationDay key={i} day={e} deleteEntrie={deleteBlockEntrie} index={i} />
							))}
						</div>
					</div>
					{/* Divider */}
					<div className={"w-full h-0.5 bg-indigo-500 rounded-md my-8"}></div>
					<div>
						<div className={"flex flex-col justify-between gap-8 items-center xl:flex-row"}>
							<label className={"font-bold"}>Allowed:</label>
							<input
								title={"Kalendar"}
								type={"date"}
								value={pickedAllowedDate}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setPickedAllowedDate(e.target.value);
								}}
								className={"p-2 rounded-md border-2 border-indigo-400"}
							/>
							<button
								onClick={addAllowed}
								className={
									"bg-gradient-to-r from-indigo-400 to-sky-500 p-2 text-indigo-50 font-bold rounded-md transition-all xl:hover:scale-110 xl:active:scale-95"
								}
							>
								Zur Allowed hinzufügen
							</button>
						</div>
						<div className={"flex p-4 flex-wrap gap-2 "}>
							{whitelistDays.map((e, i) => (
								<VacationDay key={i} day={e} deleteEntrie={deleteAllowedEntrie} index={i} />
							))}
						</div>
					</div>
				</div>
			</div>
		</GridEntrieContainer>
	);
};

// Webapi config
export const WebApiConfigSettings = () => {
	return (
		<GridEntrieContainer gradientType={"fromEmerald"}>
			<h3 className={"font-bold xl:text-3xl"}>WebApiConfig 🥸 </h3>
		</GridEntrieContainer>
	);
};

type GradientType = "fromSky" | "fromRose" | "fromIndigo" | "fromEmerald";

interface GridEntrieContainerProps {
	children: ReactNode;
	gradientType: GradientType;
	span?: boolean;
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
		<div className={`p-1 rounded-md bg-gradient-to-r  ${gradient}`}>
			<div className={`p-4 rounded-md ${foregroundColor} ${textColor} h-full `}>{children}</div>
		</div>
	);
};
