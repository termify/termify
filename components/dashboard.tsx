import React, { useState, Suspense } from "react";
import toast from "react-hot-toast";
import { hash } from "./createHash";
import LoadingSpinner from "./shared/loadingSpinner";
import { suspend } from "suspend-react";
import { useRouter } from "next/router";
import { baseUrl } from "../lib/baseUrl";

export default function Dashboard() {
	console.log("HASH", hash);

	return (
		<div className={"gap-8 flex-grow grid xl:grid-cols-2"}>
			<>
				<UserSchedule />
				<UserCredentials />
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
// "1991-10-02"
function UserCredentials() {
	const [personalData, setPersonalData] = useState<PersonalDataProps>({
		firstName: "Max",
		lastName: "Mustergott",
		birthday: `${new Date().getFullYear() - 15}-${new Date().getMonth()}-${new Date().getDate()}`,
		street: "Gute Straße 32",
		zipCode: "75175",
		city: "Pforzheim",
	});

	return (
		<div className={"p-1 shadow-xl rounded-xl bg-gradient-to-r from-sky-400 to-emerald-500 "}>
			<div className={"p-4 bg-sky-50 h-full rounded-xl"}>
				<h3
					className={
						"bg-gradient-to-r from-sky-400 to-emerald-500 text-transparent bg-clip-text font-bold inline-block drop-shadow-lg text-2xl xl:mb-8 xl:text-5xl"
					}
				>
					Persönliche Daten
				</h3>
				<div className={"p-4"}>
					<HorizontalText
						type={"Vorname"}
						value={personalData.firstName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPersonalData((prev) => ({ ...prev, firstName: e.target.value }));
						}}
					/>
					<HorizontalText
						type={"Nachname"}
						value={personalData.lastName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPersonalData((prev) => ({ ...prev, lastName: e.target.value }));
						}}
					/>
					<HorizontalText
						type={"Geburtstag"}
						value={personalData.birthday}
						inputType={"date"}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const checkYear = parseInt(e.target.value.split("-")[0]);
							const today = new Date().getFullYear();

							if (today - checkYear <= 14) {
								toast.error("Sie müssen mindestens 14 Jahre sein um Termify zu nutzen");
								return;
							}

							setPersonalData((prev) => ({ ...prev, birthday: e.target.value }));
						}}
					/>
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
					<div className={"flex justify-center mt-8 xl:mt-16"}>
						<button
							className={
								"bg-gradient-to-r from-sky-400 to-emerald-500 text-sky-50 p-2 rounded-md transition-all font-bold shadow-xl xl:p-4 xl:text-2xl xl:hover:scale-110"
							}
						>
							Daten überschreiben
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function UserSchedule() {
	const router = useRouter();
	const { id } = router.query as { id: string };

	const termine = suspend(async () => {
		const response = (await (await fetch(`${baseUrl()}/api/dbquery/booking/appointment?uuid=${id}`)).json()) as {
			timestamp: string;
			typeOfRequest: string;
		}[];

		console.log("R", response);
		return response;
	}, [id]);

	return (
		<div className={"p-1 shadow-xl rounded-xl bg-gradient-to-r from-rose-400 to-amber-500 xl:row-span-2"}>
			<div className={"p-4 bg-rose-50 h-full rounded-xl"}>
				<h3
					className={
						"bg-gradient-to-r  mb-4 from-rose-400 to-amber-500 text-transparent bg-clip-text font-bold inline-block drop-shadow-lg text-2xl xl:mb-8 xl:text-5xl"
					}
				>
					Termine
				</h3>
				<Suspense fallback={<LoadingSpinner />}>
					{termine ? (
						termine.map((e, i) => (
							<DisplayTermine key={i} index={i} timestamp={e.timestamp} typeOfRequest={e.typeOfRequest} />
						))
					) : (
						<div className={"p-4 text-rose-900"}>Es sind keine Termindaten hinterlegt</div>
					)}
				</Suspense>
			</div>
		</div>
	);
}

interface DisplayTermineProps {
	timestamp: string;
	typeOfRequest: string;
	index: number;
}

function parseUnixToDate(unixTime: string | number) {
	const unix: number = typeof unixTime === "string" ? parseInt(unixTime) : unixTime;
	const newDate = new Date(unix * 1000);

	return newDate.toLocaleDateString("de-DE", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
}

function DisplayTermine({ timestamp, typeOfRequest, index }: DisplayTermineProps) {
	return (
		<div className={`p-2 flex  ${index % 2 === 0 ? "bg-rose-200" : "bg-rose-300"}`}>
			<div className={"flex w-1/2 gap-8 text-rose-900"}>
				<label className={"font-bold"}>Anliegen:</label>
				<label>{typeOfRequest}</label>
			</div>
			<div className={"flex gap-8 text-rose-900"}>
				<label className={"font-bold"}>Wann:</label>
				<label>{parseUnixToDate(timestamp)}</label>
			</div>
		</div>
	);
}

function UserInfo() {
	return (
		<div className={"p-1 shadow-xl rounded-xl bg-gradient-to-r from-indigo-400 to-sky-500"}>
			<div className={"p-4 bg-indigo-50 h-full rounded-xl"}>
				<h3
					className={
						"bg-gradient-to-r from-indigo-400 to-sky-500 text-transparent bg-clip-text font-bold inline-block drop-shadow-lg text-2xl xl:mb-8 xl:text-5xl "
					}
				>
					Informationen
				</h3>
				<div className={"p-4 text-indigo-900"}>Es sind keine Informationen hinterlegt</div>
			</div>
		</div>
	);
}

interface HorizontalTextProps {
	type: string;
	value: string;
	inputType?: "text" | "date";
	readOnly?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
}

function HorizontalText({
	type,
	value,
	onChange,
	inputType = "text",
	autoFocus = false,
	readOnly = false,
}: HorizontalTextProps) {
	return (
		<div className={"flex justify-between text-slate-800 my-2 xl:my-3"}>
			<label className={"font-black xl:text-3xl"}>{type}</label>
			<input
				title={value}
				autoFocus={autoFocus}
				className={"px-2 w-1/2 rounded-md border-2 border-sky-400 bg-sky-100 text-sky-900  xl:text-2xl xl:px-4"}
				type={inputType}
				value={value}
				readOnly={readOnly}
				onChange={onChange}
			/>
		</div>
	);
}
