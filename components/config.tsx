import React, { ComponentProps, ReactNode, useEffect, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { baseUrl } from "../lib/baseUrl";
import ScheduleClass from "../lib/schedule";
import { useAuthStore } from "../store/stores";
import toast from "react-hot-toast";
interface OpeningDays {
	weekday: string;
	disabled: boolean;
	timeslotFrom: Date;
	timeslotTo: Date;
}

// Opening Ändern von bis => Weekday + Timeslots from und Timeslot to to irgendwas funktioniert nicht
export const OpeningSettings = () => {
	const [openeningDays, setOpeneningDays] = useState<OpeningDays[]>([]);
	const partnerId = useAuthStore((state) => state.partnerId);

	useEffect(() => {
		async function fetchOpeningDays() {
			try {
				const response = await (
					await fetch(`${baseUrl()}/api/dbquery/partnersetting/opening?partnerId=${partnerId}`)
				).json();

				setOpeneningDays(response);
			} catch (error) {
				console.error(error);
			}
		}

		fetchOpeningDays();
	}, []);

	function changeAvailablelityDate(index: number) {
		openeningDays[index].disabled = !openeningDays[index].disabled;
		// Hope
		setOpeneningDays([...openeningDays]);
	}

	function changeAvailablelityTime(index: number, type: "from" | "to", value: string) {
		const time = value.split(":");

		switch (type) {
			case "from":
				openeningDays[index].timeslotFrom = new Date(0, 0, 0, parseInt(time[0]), parseInt(time[1]));
				break;
			case "to":
				openeningDays[index].timeslotTo = new Date(0, 0, 0, parseInt(time[0]), parseInt(time[1]));
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
					<DaySlot
						key={i}
						day={e.weekday}
						index={i}
						checked={!e.disabled}
						changeAvailablelityDay={changeAvailablelityDate}
					/>
				))}
			</div>
			<div className={"flex flex-col gap-2 my-8"}>
				{openeningDays.map((e, i) => {
					if (!e.disabled) {
						return (
							<TimeSlot
								key={i}
								dayName={e.weekday}
								timeslotFrom={e.timeslotFrom}
								timeslotTo={e.timeslotTo}
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
	timeslotFrom: Date;
	timeslotTo: Date;
	index: number;
	changeAvailablelityTime: (index: number, type: "from" | "to", value: string) => void;
}

function TimeSlot({ dayName, timeslotFrom, timeslotTo, index, changeAvailablelityTime }: TimeSlotProps) {
	return (
		<div className={"grid gap-2 grid-cols-2 xl:grid-cols-3 xl:gap-4 "}>
			<p className={"font-bold row-span-3"}>{dayName}</p>
			<div className={"flex justify-between items-center gap-8"}>
				<label htmlFor={`from-${dayName}`}>Von: </label>
				<input
					title={"Von"}
					type={"time"}
					className={"p-1 rounded-md border-2 border-sky-400"}
					value={ScheduleClass.parseTimeDatetimeToTimeString(timeslotFrom)}
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
					value={ScheduleClass.parseTimeDatetimeToTimeString(timeslotTo)}
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
	const parseWeekdaytoShort: Record<string, string> = {
		Montag: "Mo.",
		Dienstag: "Di.",
		Mittwoch: "Mi.",
		Donnerstag: "Do.",
		Freitag: "Fr.",
		Samstag: "Sa.",
		Sonntag: "So.",
	};

	return (
		<div>
			<label
				className={`font-bold text-center p-1 rounded-md border-2 select-none ${
					checked ? "border-emerald-400 bg-emerald-100 text-emerald-900" : "border-rose-400 bg-rose-100 text-rose-900"
				}  shadow-md  transition-all xl:p-4 hover:xl:scale-110 hover:xl:cursor-pointer `}
			>
				{parseWeekdaytoShort[day]}
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

interface SettingsData {
	intervall: number;
	holydaysOn: boolean;
	id: number;
}

// Appointment Settings => Interval und Holidays
export const AppointmentSettings = () => {
	const [settingsData, setSettingsData] = useState<SettingsData>({ intervall: 30, holydaysOn: false, id: -1 });
	const partnerId = useAuthStore((state) => state.partnerId);

	async function updateSettings() {
		const response = await toast.promise(
			new Promise((res, rej) => {
				fetch(`${baseUrl()}/api/dbquery/partnersetting/appointmentSettings`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(settingsData),
				})
					.then((json) => json.json())
					.then((result) => res(result))
					.catch((err) => rej(err));
			}),
			{
				success: "Einstellungen wurden erfolgreich geupdatet",
				error: "Es kam zu einem Fehler beim überschreiben der Einstellungen",
				loading: "Ein Moment überschreibe Daten",
			}
		);

		console.log("Update Settings", response);
	}

	useEffect(() => {
		async function fetchSettingsData() {
			try {
				const { intervall, holydaysOn, id } = (await (
					await fetch(`${baseUrl()}/api/dbquery/partnersetting/appointmentSettings?partnerId=${partnerId}`)
				).json()) as { intervall: number; holydaysOn: boolean; id: number };

				setSettingsData({
					intervall: intervall,
					holydaysOn: holydaysOn,
					id: id,
				});
			} catch (e) {
				console.error(e);
			}
		}

		fetchSettingsData();
	}, []);

	return (
		<GridEntrieContainer gradientType={"fromRose"}>
			<div>
				<h3 className={"font-bold xl:text-3xl"}>Buchungsintervall 🕰️ und Feiertage 🆓</h3>
				<div className={"flex flex-col gap-8 items-center xl:flex-row xl:my-8"}>
					<div className={"flex items-center gap-8"}>
						<label className={"font-bold"}>Buchungsintervall:</label>
						<input
							title={"Interval"}
							type={"number"}
							step={15}
							value={settingsData.intervall}
							max={60}
							min={15}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setSettingsData((prev) => ({ ...prev, intervall: e.target.valueAsNumber }));
							}}
							className={"p-2 rounded-md border-2 border-rose-400 w-16"}
						/>
					</div>
					<div className={"my-8 flex gap-8 items-center"}>
						<label
							className={`font-bold border-2 p-2 rounded-md select-none ${
								settingsData.holydaysOn
									? "border-emerald-500 bg-emerald-200 text-emerald-900"
									: "border-rose-500 bg-rose-200 text-rose-900"
							} transition-all hover:xl:cursor-pointer hover:xl:scale-110 xl:active:scale-95 `}
						>
							Feiertage?
							<input
								title={"Feiertage"}
								type={"checkbox"}
								checked={settingsData.holydaysOn}
								onChange={(_) => {
									setSettingsData((prev) => ({ ...prev, holydaysOn: !prev.holydaysOn }));
								}}
								className={"hidden"}
							/>
						</label>
					</div>
				</div>
				<div className={"flex justify-center"}>
					<button
						onClick={updateSettings}
						className={"p-2 bg-gradient-to-r rounded-md font-bold text-rose-50 transition-all xl:hover:scale-110"}
					>
						Settings hochladen
					</button>
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
	const date = day.split("-");

	return (
		<div
			onClick={() => {
				deleteEntrie(index);
			}}
			className={
				"relative p-1 bg-gradient-to-r select-none from-indigo-400 to-sky-500 rounded-md group cursor-pointer transition-all hover:scale-105"
			}
		>
			<div className={"p-2 font-bold bg-indigo-50"}>
				{new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])).toLocaleDateString("de-DE", {
					day: "numeric",
					month: "short",
					year: "2-digit",
				})}
			</div>
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
	const partnerId = useAuthStore((state) => state.partnerId);
	const [pickedBlockDate, setPickedBlockDate] = useState<string>("");
	const [blockDays, setBlockDays] = useState<string[]>([]);

	const [pickedAllowedDate, setPickedAllowedDate] = useState<string>("");
	const [whitelistDays, setAllowedDays] = useState<string[]>([]);

	useEffect(() => {
		async function fetchBlackAndAllowedList() {
			try {
				const response = (await (
					await fetch(`${baseUrl()}/api/dbquery/partnersetting/appointmentSlots?partnerId=${partnerId}`)
				).json()) as { id: number; isBlackList: boolean; dateFrom: Date; dateTo: Date }[];

				response.forEach((e) => {
					if (e.isBlackList) {
						setAllowedDays([...whitelistDays, ScheduleClass.parseFullDateToDate(e.dateFrom)]);
					} else {
						setBlockDays([...blockDays, ScheduleClass.parseFullDateToDate(e.dateFrom)]);
					}
				});
			} catch (e) {
				console.error(e);
			}
		}

		fetchBlackAndAllowedList();
	}, []);

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
		<div className={`p-1 rounded-md bg-gradient-to-r shadow-md ${gradient}`}>
			<div className={`p-4 rounded-md ${foregroundColor} ${textColor} h-full `}>{children}</div>
		</div>
	);
};
