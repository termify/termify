import React, { ComponentProps, useRef, useState } from "react";
import { useAuthStore, useBookingStore } from "../../store/stores";
import { TbFiles } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { Modal } from "../shared/modal";
import AuthForm from "../shared/authForm";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Eintragung() {
	return (
		<div className={"p-4 container mx-auto w-2/3"}>
			<Reason />
		</div>
	);
}

function Reason() {
	const setBookingPage = useBookingStore((state) => state.setPageNumber);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		toast.success("Ihre Buchung wurde erfolgreich getätigt");
		setBookingPage(4);
	}

	return (
		<>
			<div>
				<div className="flex justify-center">
					<h3
						className={
							"text-center font-bold bg-gradient-to-r w-full inline-block from-indigo-400 to-sky-500 text-transparent text-2xl bg-clip-text mx-auto p-4 xl:mb-8 xl:w-1/3 xl:text-4xl "
						}
					>
						Anliegen
					</h3>
				</div>
				<form className={"flex flex-col items-center gap-4"} onSubmit={submitHandler}>
					<CustomDropdown heading={"Art des Anliegens"} required>
						<option>Bitte Anliegen wählen</option>
					</CustomDropdown>
					<CustomInput heading={"Dokumenten hochladen"} />
					<CustomTextArea heading={"Anmerkung"} />
					<div className={"flex w-full justify-center"}>
						<button
							className={
								"bg-gradient-to-r from-indigo-400 to-sky-500 shadow-md w-full max-w-[500px] text-indigo-50 p-2 font-bold rounded-md text-2xl mt-8 transition-all hover:scale-110 xl:w-1/3"
							}
							title={"Termin buchen"}
							type={"submit"}
						>
							Termin buchen
						</button>
					</div>
				</form>
			</div>

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
				className={"border-2 rounded-lg border-slate-800 shadow-md resize-y p-2 min-h-[50px] w-full max-w-[500px]"}
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
					"border-2 rounded-lg border-slate-800 shadow-md bg-white resize-y p-2 min-h-[50px] w-full max-w-[500px]"
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
}

function CustomInput({ heading, ...props }: CustomInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<File[]>([]);

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
					"h-32 border-2 max-w-[500px] w-full border-slate-800 shadow-md rounded-lg hover:bg-slate-200 hover:cursor-pointer"
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
