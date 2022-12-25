import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useBaseUrl } from "../lib/baseUrl";

export default function UserDashboard() {
	return (
		<div className={"gap-8 flex-grow grid xl:grid-cols-2"}>
			<>
				<UserSchedule />
				<UserCredentials />
				<UserInfoComponent />
			</>
		</div>
	);
}

export interface PersonalDataProps {
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
		birthday: `${new Date().getFullYear() - 15}-${new Date().getMonth()}-${new Date().getDate()}`,
		street: "Gute Straße 32",
		zipCode: "75175",
		city: "Pforzheim",
	});

	const router = useRouter();
	const baseUrl = useBaseUrl();

	async function updateData() {
		await toast.promise(
			new Promise((res, rej) => {
				fetch(`${baseUrl}/api/dbquery/booking/user?id=${router.query.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(personalData),
				})
					.then((data) => data.json())
					.then((response) => res(response))
					.catch((err) => rej(err));
			}),
			{
				loading: "Ein Moment, überschreibe Daten 🫡",
				error: "Es kam zu einem Fehler beim überschreiben der Daten",
				success: "Daten erfolgreich überschrieben 🎉",
			}
		);
	}

	useEffect(() => {
		async function fetchPersonalData() {
			try {
				const response = (await (
					await fetch(
						`${baseUrl}/api/dbquery/booking/user?id=${router.query.id}&timestamp={${Math.floor(
							new Date().getTime() / 1000
						)}}`
					)
				).json()) as PersonalDataProps;

				if (response.zipCode.length < 5) {
					let zipCode = response.zipCode;
					for (let i = response.zipCode.length; i < 5; i++) {
						zipCode = `0${zipCode}`;
					}

					response.zipCode = zipCode;
				}

				setPersonalData(response);
			} catch (e) {
				console.error("e", e);
			}
		}

		fetchPersonalData();
	}, []);

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
					<HorizontalTextComponent
						type={"Vorname"}
						value={personalData.firstName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPersonalData((prev) => ({ ...prev, firstName: e.target.value }));
						}}
					/>
					<HorizontalTextComponent
						type={"Nachname"}
						value={personalData.lastName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPersonalData((prev) => ({ ...prev, lastName: e.target.value }));
						}}
					/>
					<HorizontalTextComponent
						type={"Geburtstag"}
						value={personalData.birthday}
						inputType={"date"}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							// const checkYear = parseInt(e.target.value.split("-")[0]);
							// const today = new Date().getFullYear();

							// if (today - checkYear <= 14) {
							// 	toast.error("Sie müssen mindestens 14 Jahre sein, um Termify zu nutzen");
							// 	return;
							// }

							console.log("Das ist Value", e.target.value);

							setPersonalData((prev) => ({ ...prev, birthday: e.target.value }));
						}}
					/>
					<HorizontalTextComponent
						type={"Straße"}
						value={personalData.street}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPersonalData((prev) => ({ ...prev, street: e.target.value }));
						}}
					/>
					<HorizontalTextComponent
						type={"Postleitzahl"}
						inputType={"tel"}
						value={personalData.zipCode}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (e.target.value.length > 5) return;
							setPersonalData((prev) => ({ ...prev, zipCode: e.target.value }));
						}}
					/>
					<HorizontalTextComponent
						type={"Stadt"}
						value={personalData.city}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPersonalData((prev) => ({ ...prev, city: e.target.value }));
						}}
					/>
					<div className={"flex justify-center mt-8 xl:mt-16"}>
						<button
							onClick={updateData}
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
	const [termine, setTermine] = useState<
		{
			timestamp: string;
			typeOfRequest: string;
		}[]
	>([]);
	const baseUrl = useBaseUrl();

	useEffect(() => {
		async function fetchTermine() {
			const response = (await (await fetch(`${baseUrl}/api/dbquery/booking/appointment?uuid=${id}`)).json()) as {
				timestamp: string;
				typeOfRequest: string;
			}[];
			setTermine(response);
		}

		fetchTermine();
	}, []);

	return (
		<div className={"p-1 shadow-xl rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 xl:row-span-2"}>
			<div className={"p-4 bg-amber-50 h-full rounded-xl"}>
				<h3
					className={
						"bg-gradient-to-r  mb-4 from-amber-400 to-pink-500 text-transparent bg-clip-text font-bold inline-block drop-shadow-lg text-2xl xl:mb-8 xl:text-5xl"
					}
				>
					Termine
				</h3>
				<div className={"overflow-y-scroll h-[70vh] rounded-xl"}>
					{termine && termine.length > 0 ? (
						termine.map((e, i) => (
							<DisplayTermineComponent
								key={i}
								index={i}
								timestamp={e.timestamp}
								typeOfRequest={e.typeOfRequest}
								first={i === 0}
								last={i === termine.length - 1}
							/>
						))
					) : (
						<div className={"p-4 text-rose-900"}>Es sind keine Termindaten hinterlegt</div>
					)}
				</div>
			</div>
		</div>
	);
}

interface DisplayTermineProps {
	timestamp: string;
	typeOfRequest: string;
	index: number;
	first: boolean;
	last: boolean;
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

function DisplayTermineComponent({ timestamp, typeOfRequest, index, first, last }: DisplayTermineProps) {
	return (
		<div
			className={`p-2  ${index % 2 === 1 ? "bg-amber-200" : "bg-amber-300"} grid grid-cols-2 ${
				first ? "rounded-t-md" : last ? "rounded-b-md" : ""
			}`}
		>
			<div className={"flex flex-col justify-around items-center text-amber-900 "}>
				<label className={"font-bold xl:text-xl"}>Anliegen:</label>
				<label className={"text-center text-sm xl:text-base"}>{typeOfRequest}</label>
			</div>
			<div className={"flex flex-col justify-around items-center text-amber-900 "}>
				<label className={"font-bold  xl:text-xl"}>Wann:</label>
				<label className={"text-center text-sm xl:text-base"}>{parseUnixToDate(timestamp)}</label>
			</div>
		</div>
	);
}

function UserInfoComponent() {
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
	inputType?: "text" | "date" | "number" | "tel";
	readOnly?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
}

function HorizontalTextComponent({
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
				autoFocus={autoFocus}
				className={"px-2 w-1/2 rounded-md border-2 border-sky-400 bg-sky-100 text-sky-900 xl:text-2xl xl:px-4"}
				type={inputType}
				value={value}
				readOnly={readOnly}
				onChange={onChange}
			/>
		</div>
	);
}
