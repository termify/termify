import { RefObject, useRef, useState } from "react";

export default function Dashboard() {
	return (
		<div className={" gap-8 flex-grow xl:grid grid-cols-2"}>
			<>
				<UserCredentials />
				<UserSchedule />
				<UserInfo />
			</>
		</div>
	);
}

interface PersonalDataProps {
	firstName: string;
	lastName: string;
	birthday: string;
	street: string;
	zipCode: string;
	city: string;
}

function UserCredentials() {
	const [personalData, setPersonalData] = useState<PersonalDataProps>({
		firstName: "Max",
		lastName: "Mustergott",
		birthday: new Date(1991, 10 - 1, 2).toLocaleString("de-DE", {
			day: "numeric",
			month: "short",
			year: "numeric",
		}),
		street: "Gute Straße 32",
		zipCode: "75175",
		city: "Pforzheim",
	});

	return (
		<div className={" p-4 shadow-xl rounded-xl xl:row-span-2"}>
			<h3
				className={
					"bg-gradient-to-r from-sky-400 to-emerald-500 text-transparent bg-clip-text font-bold inline-block drop-shadow-lg text-2xl xl:mb-8 xl:text-5xl"
				}
			>
				Persönliche Daten
			</h3>
			<div className={"p-4"}>
				<HorizontalText type={"Vorname"} value={personalData.firstName} readOnly />
				<HorizontalText type={"Nachname"} value={personalData.lastName} readOnly />
				<HorizontalText type={"Geburtstag"} value={personalData.birthday} readOnly />
				<HorizontalText
					type={"Straße"}
					value={personalData.street}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setPersonalData((prev) => ({ ...prev, street: e.target.value }));
					}}
				/>
				<HorizontalText
					type={"Postleitzahl"}
					value={personalData.zipCode}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setPersonalData((prev) => ({ ...prev, zipCode: e.target.value }));
					}}
				/>
				<HorizontalText
					type={"Stadt"}
					value={personalData.city}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setPersonalData((prev) => ({ ...prev, city: e.target.value }));
					}}
				/>
				<div className={"flex justify-center mt-8"}>
					<button
						className={
							"bg-gradient-to-r from-sky-400 to-emerald-500 text-sky-50 p-2 rounded-md transition-all font-bold shadow-xl xl:hover:scale-110"
						}
					>
						Daten überschreiben
					</button>
				</div>
			</div>
		</div>
	);
}

function UserSchedule() {
	return (
		<div className={"p-4 shadow-xl rounded-xl"}>
			<h3
				className={
					"bg-gradient-to-r from-sky-400 to-emerald-500 text-transparent bg-clip-text  font-bold inline-block drop-shadow-lg text-2xl xl:mb-8 xl:text-5xl"
				}
			>
				Termine
			</h3>
			<div className={"p-4"}>dasdsdsad</div>
		</div>
	);
}

function UserInfo() {
	return (
		<div className={"p-4 shadow-xl rounded-xl"}>
			<h3
				className={
					"bg-gradient-to-r from-sky-400 to-emerald-500 text-transparent bg-clip-text font-bold inline-block drop-shadow-lg text-2xl xl:mb-8 xl:text-5xl "
				}
			>
				Informationen
			</h3>
			<div className={"p-4"}>dasdsdsad</div>
		</div>
	);
}

interface HorizontalTextProps {
	type: string;
	value: string;
	readOnly?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function HorizontalText({ type, value, onChange, readOnly = false }: HorizontalTextProps) {
	return (
		<div className={"flex justify-between text-slate-800 my-2 xl:text-4xl xl:my-4"}>
			<label className={"font-black "}>{type}</label>
			<input
				className={
					"px-2 w-1/2 rounded-md border-2 border-sky-400 read-only:bg-slate-200 read-only:border-slate-600 xl:px-4"
				}
				type={"text"}
				value={value}
				readOnly={readOnly}
				onChange={onChange}
			/>
		</div>
	);
}
