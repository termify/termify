import React, { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "./modal";
import GradientButton from "./utility/gradientButton";
import Textinput from "./utility/textinput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { Session } from "@supabase/supabase-js";
import { setCookie } from "../../lib/cookie";
import { useAuthStore } from "../../store/stores";
import { ImCross } from "react-icons/im";

interface AuthForm {
	authType: "register" | "login";
	onDone?: () => void;
}

interface AuthData {
	email: string;
	password: string;
}

interface AuthResponse {
	msg: string;
	error: boolean;
	id?: string;
	session?: Session;
}

type ModalTypes = "none" | "spinner" | "password";

export default function AuthForm({ authType, onDone }: AuthForm) {
	const [formData, setFormData] = useState<AuthData>({
		email: "",
		password: "",
	});
	const [showModal, setShowModal] = useState<{
		show: boolean;
		type?: ModalTypes;
	}>({ show: false, type: "none" });
	const router = useRouter();
	const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

	async function handleOnClick(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		switch (authType) {
			case "register":
				await register();
				break;
			case "login":
				await login();
				break;
		}
	}

	function validateForm(): boolean {
		return formData.email.includes(".");
	}

	async function register() {
		setShowModal({
			show: true,
			type: "spinner",
		});

		if (!validateForm()) {
			toast.error("Bitte tragen Sie eine valide Email-Adresse ein");
			setShowModal({ show: false });
			return;
		}

		const { msg, error }: AuthResponse = await (
			await fetch("/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					type: "register",
				},
				body: JSON.stringify(formData),
			})
		).json();

		if (error) {
			setShowModal({ show: false });
			toast.error(msg);
			return;
		}

		toast.success(msg);
		onDone!();
	}

	async function login() {
		setShowModal({ show: true, type: "spinner" });

		const { msg, error, id, session }: AuthResponse = await (
			await fetch("/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					type: "login",
				},
				body: JSON.stringify(formData),
			})
		).json();

		if (error) {
			setShowModal({ show: false });
			toast.error(msg);
			return;
		}

		const today = new Date();
		today.setFullYear(today.getFullYear() + 1);

		// sessionStorage.setItem("auth",JSON.stringify({id,token:session?.access_token}));
		setCookie("auth", JSON.stringify({ id, token: session?.access_token }), today.toUTCString());
		setLoggedIn(true);
		toast.success(msg);
		if (router.asPath === "/login") await router.push(`/user/${id}/dashboard`);
		else setShowModal({ show: false });
	}

	return (
		<div className="flex-grow flex flex-col justify-evenly items-center my-auto xl:gap-8">
			<h1 className="text-center text-3xl my-4 bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent p-2 xl:text-5xl xl:my-8">
				{authType === "register" ? "Erstellen Sie sich noch heute einen Account" : "Login"}
			</h1>
			<form
				onSubmit={handleOnClick}
				className="flex flex-col gap-4 items-center justify-start xl:flex-grow xl:justify-center xl:w-1/3"
			>
				<Textinput
					value={formData.email}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
					placeholder="Email"
					type={"email"}
				/>
				<Textinput
					value={formData.password}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
					placeholder="Password"
					type={"password"}
				/>
				<ContextSwitcher register={authType === "register"} />
				<GradientButton
					buttontext={authType === "register" ? "Registrieren" : "Einloggen"}
					design={"filled"}
					type={"submit"}
				/>
			</form>
			<button
				className={"bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent mt-8 xl:mt-0"}
				onClick={() => setShowModal({ show: true, type: "password" })}
			>
				Passwort vergessen?
			</button>
			{showModal.show ? (
				showModal.type === "spinner" ? (
					<Modal>
						<LoadingSpinner />
					</Modal>
				) : (
					<Modal>
						<ForgotPassword
							close={() => {
								setShowModal({ show: false });
							}}
						/>
					</Modal>
				)
			) : null}
		</div>
	);
}

function ForgotPassword({ close }: { close: () => void }) {
	const [inputValue, setInputValue] = useState<string>("");

	return (
		<div className="bg-slate-900/50 w-screen h-screen flex justify-center items-center p-4 xl:p-0">
			<div className={"bg-slate-50  rounded-xl p-8  xl:w-1/3 xl:h-1/2"}>
				<div className={"flex justify-end"}>
					<button
						onClick={close}
						title={"Beenden"}
						className={"p-1 rounded-md transition-all xl:hover:scale-110 xl:hover:bg-slate-200"}
					>
						<ImCross />
					</button>
				</div>
				<div className={"flex flex-col justify-center items-center gap-8"}>
					<h3
						className={
							"text-center text-4xl font-bold bg-gradient-to-t from-sky-400 to-emerald-500 bg-clip-text text-transparent py-6"
						}
					>
						Passwort vergessen?
					</h3>
					<p className={"text-center"}>
						Kein Problem! Tragen Sie einfach Ihre Email Adresse ein und wir setzen Ihr Passwort zurück
					</p>
					<input
						className={"p-2 border-2 border-sky-500 rounded-md"}
						title={"Email"}
						placeholder={"Email Adresse"}
						type={"email"}
						value={inputValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
					/>
					<button
						className={
							"bg-gradient-to-r from-sky-400 to-emerald-500 text-sky-50 font-bold p-2 rounded-md transition-transform xl:hover:scale-110 "
						}
					>
						Passwort zurücksetzen
					</button>
				</div>
			</div>
		</div>
	);
}

function LoadingSpinner() {
	return (
		<div className="bg-slate-900/50 w-screen h-screen flex justify-center items-center">
			<AiOutlineLoading3Quarters className="w-12 h-12 text-emerald-400 animate-spin" />
		</div>
	);
}

function ContextSwitcher({ register }: { register: boolean }) {
	return (
		<div className="text-xs bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent">
			{register ? (
				<Link href={"/login"}>
					<a>Sie haben schon einen Account?</a>
				</Link>
			) : (
				<Link href={"/register"}>
					<a>Noch keinen Account?</a>
				</Link>
			)}
		</div>
	);
}
