import React, { ComponentProps, useRef, useState } from "react";
import { useAuthStore, useBookingStore } from "../../store/stores";
import { TbFiles } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { Modal } from "../shared/modal";
import AuthForm from "../shared/authForm";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { suspend } from "suspend-react";
import { baseUrl } from "../../lib/baseUrl";
import LoadingSpinner from "../shared/loadingSpinner";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";
import { getCookie } from "../../lib/cookie";

interface DataOfficeService {
	id: number;
	serviceText: string;
	serviceDescription?: string;
}

export default function Eintragung() {
	return (
		<div className={"p-4 container mx-auto w-2/3"}>
			<Reason />
		</div>
	);
}

function Reason() {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [files, setFiles] = useState<File[]>([]);
	const [reason, setReason] = useState<string>("");
	const [note, setNote] = useState<string>("");
	const setBookingPage = useBookingStore((state) => state.setPageNumber);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const bookingData = useBookingStore((state) => state.bookingData);

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setShowModal(true);

		const { auth } = getCookie("auth") as { auth: { id: string } };

		const time = bookingData.time.split(":");
		const timeStamp = Math.floor(
			new Date(
				bookingData.date.year,
				bookingData.date.month,
				bookingData.date.day,
				parseInt(time[0]),
				parseInt(time[1])
			).getTime() / 1000
		);

		try {
			if (files.length > 0) {
				for await (const file of files) {
					const { data: supabaseData, error: supabaseError } = await supabase.storage
						.from("appointment-bucket")
						.upload(`${bookingData.officeId}/${auth.id}/${timeStamp}/${file.name}`, file);
				}
			}

			const response = await (
				await fetch(`${baseUrl()}/api/dbquery/booking/appointment`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						partnerId: bookingData.officeId,
						userId: auth.id,
						timestamp: timeStamp,
						typeOfRequest: reason,
						note: note,
						attachment: files.length > 0 ? `${bookingData.officeId}/${auth.id}/${timeStamp}` : "",
					}),
				})
			).json();

			toast.success("Ihre Buchung wurde erfolgreich getätigt");
			setBookingPage(4);
		} catch (e) {
			console.error(e);
		}
	}

	const reasons = suspend(async () => {
		const response = (await (
			await fetch(`${baseUrl()}/api/dbquery/booking/officeService/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ officeId: bookingData.officeId }),
			})
		).json()) as DataOfficeService[];

		return response;
	}, [bookingData]);

	return (
		<>
			<div>
				<div className="flex justify-center">
					<h3
						className={
							"text-center font-bold bg-gradient-to-r w-full inline-block from-rose-400 to-amber-500 text-transparent text-2xl bg-clip-text mx-auto p-4 xl:mb-8 xl:w-1/3 xl:text-4xl "
						}
					>
						Anliegen
					</h3>
				</div>
				<form className={"flex flex-col items-center gap-4"} onSubmit={submitHandler}>
					<CustomDropdown
						heading={"Art des Anliegens"}
						required
						value={reason}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReason(e.target.value)}
					>
						<option>Bitte Anliegen wählen</option>
						{reasons && reasons.length > 0 ? (
							reasons.map((e, i) => <option key={i}>{e.serviceText}</option>)
						) : (
							<option>Keine Anliegen anwählbar</option>
						)}
					</CustomDropdown>
					<CustomInput heading={"Dokumenten hochladen"} files={files} setFiles={setFiles} />
					<CustomTextArea
						heading={"Anmerkung"}
						value={note}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
					/>
					<div className={"flex w-full justify-center"}>
						<button
							className={
								"bg-gradient-to-r from-rose-400 to-amber-500 shadow-md w-full max-w-[500px] text-rose-50 p-2 font-bold rounded-md text-2xl mt-8 transition-all hover:scale-110 xl:w-1/3"
							}
							title={"Termin buchen"}
							type={"submit"}
						>
							Termin buchen
						</button>
					</div>
				</form>
			</div>

			{showModal && (
				<Modal>
					<div className={"bg-slate-800/10 w-screen h-screen flex justify-center items-center"}>
						<LoadingSpinner />
					</div>
				</Modal>
			)}

			{!isLoggedIn && (
				<Modal>
					<RequestForLogin />
				</Modal>
			)}
		</>
	);
}

function RequestForLogin() {
	const setPageNumber = useBookingStore((state) => state.setPageNumber);

	function goBackToTermin() {
		setPageNumber(2);
	}

	return (
		<div className={"bg-slate-800/50 w-screen h-screen p-2 xl:p-0"}>
			<div className={"relative bg-slate-50 h-2/3 rounded-xl shadow-xl top-36 p-8 xl:left-1/4 xl:w-1/2"}>
				<div className="flex justify-end">
					<button
						title={"Zurück"}
						className={"p-2 group font-black transition-all rounded hover:xl:scale-110 hover:xl:bg-slate-200"}
						onClick={goBackToTermin}
					>
						<ImCross className={"shadow"} />
					</button>
				</div>
				<h3 className={"text-center font-bold p-2 text-slate-800 text-xl xl:text-3xl"}>
					Bitte loggen Sie sich für eine Buchung ein
				</h3>
				<AuthForm authType={"login"} />
			</div>
		</div>
	);
}

interface CustomTextAreaProps extends ComponentProps<"textarea"> {
	heading: string;
}

function CustomTextArea(props: CustomTextAreaProps) {
	return (
		<div className={"flex flex-col items-center w-full xl:w-1/3"}>
			<label className={"p-2 f ont-bold text-center xl:text-start"}>{props.heading}:</label>
			<textarea
				className={
					"border-2 rounded-lg border-rose-800 bg-rose-50 shadow-md resize-y p-2 min-h-[150px] w-full max-w-[500px]"
				}
				{...props}
			/>
		</div>
	);
}

interface CustomDropdown extends ComponentProps<"select"> {
	heading: string;
}

function CustomDropdown(props: CustomDropdown) {
	return (
		<div className={"flex flex-col items-center w-full xl:w-1/3"}>
			<label className={"p-2 font-bold text-center xl:text-start "}>{props.heading}:</label>
			<select
				className={
					"border-2 rounded-lg border-rose-800  shadow-md bg-rose-50 text-rose-900 resize-y p-2 min-h-[50px] w-full max-w-[500px]"
				}
				{...props}
			>
				{props.children}
			</select>
		</div>
	);
}

interface CustomInputProps extends ComponentProps<"input"> {
	heading: string;
	files: File[];
	setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

function CustomInput({ heading, files, setFiles, ...props }: CustomInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	function removeFile(fileName: File) {
		const index = files.findIndex((e) => e.name === fileName.name);
		files.splice(index, 1);

		setFiles([...files]);
	}

	return (
		<div className={"flex flex-col w-full items-center xl:w-1/3"}>
			<label className={"p-2 font-bold text-center"}>{heading}:</label>
			<label
				className={
					"h-32 border-2 max-w-[500px] w-full border-rose-800 bg-rose-50 shadow-md rounded-lg hover:xl:bg-gradient-to-r hover:xl:text-rose-50 hover:xl:from-rose-400 hover:xl:to-amber-500 hover:xl:cursor-pointer"
				}
			>
				<div className={" h-full flex flex-col justify-center items-center"}>
					<TbFiles className={"w-16 h-16"} />
					<p className={"font-bold text-center xl:text-start"}>Klicken um Dateien hochzuladen</p>
				</div>
				<input
					ref={inputRef}
					className={"hidden"}
					accept={"image/png, image/jpeg, application/pdf"}
					type={"file"}
					multiple
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (!e.target.files || e?.target?.files?.length === 0) return;

						for (const file of e?.target?.files) {
							setFiles((prevState) => [...prevState!, file]);
						}
					}}
					{...props}
				/>
			</label>
			<div className={"my-2 w-full"}>
				{files.map((e, i) => (
					<FileNameList key={i} file={e} removeFile={removeFile} />
				))}
			</div>
		</div>
	);
}

interface FileNameList {
	file: File;
	removeFile: (fileName: File) => void;
}

function FileNameList({ file, removeFile }: FileNameList) {
	return (
		<motion.div
			initial={{ scale: 0.5 }}
			animate={{ scale: 1 }}
			transition={{ ease: "backOut" }}
			className={"py-1 px-3 flex gap-2 justify-between"}
		>
			<p className={"truncate"}>{file.name}</p>
			<button
				onClick={() => removeFile(file)}
				type={"button"}
				className={"text-rose-500 bg-rose-200 p-1 rounded-md transition-all xl:hover:bg-rose-300 xl:hover:scale-125"}
			>
				<ImCross />
			</button>
		</motion.div>
	);
}
