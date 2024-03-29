import { AiFillSchedule } from "react-icons/ai";
import React, { ReactElement, useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import useDocument from "../hooks/useDocument";
import Link from "next/link";
import { AuthSession } from "../../types/storage";
import toast from "react-hot-toast";
import { AiFillHome } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { deleteCookie, getCookie } from "../../lib/cookie";
import { useAuthStore, useBookingStore } from "../../store/stores";
import { TbFileSettings } from "react-icons/tb";
import { baseUrl } from "../../lib/baseUrl";
import { useRouter } from "next/router";

export default function Header() {
	const setPageNumber = useBookingStore((state) => state.setPageNumber);
	const setBookingData = useBookingStore((state) => state.setBookingData);
	const partnerId = useAuthStore((state) => state.partnerId);
	const setPartnerId = useAuthStore((state) => state.setPartnerId);

	const router = useRouter();

	useEffect(() => {
		const { auth } = getCookie("auth") as { auth: { id: string } };
		if (!auth) return;
		console.log("Partner ID", auth.id);
		async function fetchIsSystemUser() {
			try {
				const { partnerId } = (await (
					await fetch(`${baseUrl()}/api/dbquery/booking/systemuser?id=${auth.id}`)
				).json()) as {
					partnerId: number;
				};

				setPartnerId(partnerId);
			} catch (error) {
				console.error(error);
			}
		}

		fetchIsSystemUser();
	}, [router.asPath]);

	function resetBookingState() {
		setBookingData({
			officeId: 0,
			officeName: "",
			date: {
				day: -1,
				month: -1,
				year: -1,
			},
			time: "",
		});

		setPageNumber(1);
	}

	return (
		<header className="bg-slate-900 p-3 shadow-xl flex justify-between items-center">
			<>
				<div className="xl:hover:cursor-pointer" onClick={resetBookingState}>
					<Link href={"/"}>
						<h1 className="text-2xl font-bold flex items-center gap-2 ">
							<p className="bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent">
								{process.env.APP_NAME}
							</p>
							<AiFillSchedule className="bg-gradient-to-r from-sky-400 to-emerald-500 xl:h-12 xl:w-12" />
						</h1>
					</Link>
				</div>
			</>
			<DesktopNavigation />
			<MobileNavigation />
		</header>
	);
}

function DesktopNavigation() {
	const [session, setSession] = useState<AuthSession>();
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	const partnerId = useAuthStore((state) => state.partnerId);

	useEffect(() => {
		const authCookie = getCookie("auth") as { auth: { id: string; token: string } };

		if (authCookie) {
			setSession(authCookie.auth);
		} else {
			setSession(undefined);
		}
	}, [isLoggedIn]);

	return (
		<div className="hidden gap-4 flex-grow xl:flex xl:items-center xl:justify-end">
			{session ? (
				<>
					{partnerId ? (
						<>
							<NavigationLink icon={<RiDashboardFill />} name={"Dashboard"} to={`/user/${session.id}/dashboard`} />
							<NavigationLink
								icon={<TbFileSettings color="#ffffff" />}
								name={"Konfiguration"}
								to={`/user/${session.id}/config`}
							/>
						</>
					) : (
						<NavigationLink icon={<RiDashboardFill />} name={"Dashboard"} to={`/user/${session.id}/dashboard`} />
					)}
					<LogoutLink />
				</>
			) : (
				<>
					<NavigationLink icon={<AiFillHome className="w-5 h-5" />} name={"Startseite"} to={"/"} />
					<RegisterLink />
					<LoginLink />
				</>
			)}
		</div>
	);
}

interface NavigationLink {
	name: string;
	to: string;
	icon?: ReactElement | ReactElement[];
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SpecialLink {
	name?: string;
	to?: string;
	onClick?: () => void;
}

export function NavigationLink({ name, to, setOpen, icon }: NavigationLink) {
	function onClickHandler() {
		if (setOpen) setOpen(false);
	}

	return (
		<Link href={to}>
			<div
				onClick={onClickHandler}
				className={`text-center justify-center select-none
                    cursor-pointer p-2 text-slate-100 
                    min-w-[150px]
                    rounded
                    flex items-center 
                    gap-2 transition-all 
                    xl:hover:bg-slate-800 xl:hover:scale-110 
                    `}
			>
				{/* <FaHome className="w-5 h-5" /> */}
				{icon}
				<a>{name}</a>
			</div>
		</Link>
	);
}

export function LogoutLink({ onClick }: SpecialLink) {
	const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

	async function onClickHandler() {
		toast.success("Erfolgreich ausgeloggt");
		deleteCookie("auth", "/");
		setLoggedIn(false);

		if (onClick) onClick();
	}

	return (
		<Link href={"/"}>
			<div
				onClick={onClickHandler}
				className="text-center w-1/2 mx-auto rounded flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-rose-400 to-amber-500 transition-all xl:m-0 xl:w-32 xl:hover:cursor-pointer xl:hover:scale-110"
			>
				<a className=" rounded text-slate-50 select-none">Logout</a>
				<FaSignOutAlt className="text-slate-50" />
			</div>
		</Link>
	);
}

export function RegisterLink({ onClick }: SpecialLink) {
	return (
		<Link href={"/register"}>
			<div
				onClick={onClick}
				className="text-center w-1/2 mx-auto rounded p-0.5 bg-gradient-to-r from-sky-400 to-emerald-500 transition-all xl:m-0 xl:w-32 xl:hover:cursor-pointer xl:hover:scale-110 "
			>
				<div className="bg-slate-800 p-1.5 xl:hover:bg-transparent">
					<a className="p-2 bg-gradient-to-r w-full from-sky-400 to-emerald-500 bg-clip-text text-transparent select-none hover:text-slate-50">
						Registrieren
					</a>
				</div>
			</div>
		</Link>
	);
}

export function LoginLink({ onClick }: SpecialLink) {
	return (
		<Link href={"/login"}>
			<div
				onClick={onClick}
				className="text-center w-1/2 mx-auto rounded p-2 bg-gradient-to-r from-sky-400 to-emerald-500 transition-all xl:m-0 xl:w-32 xl:hover:cursor-pointer xl:hover:scale-110"
			>
				<a className=" rounded text-slate-50 select-none">Login</a>
			</div>
		</Link>
	);
}

function MobileNavigation() {
	const [open, setOpen] = useState<boolean>(false);
	const { loaded } = useDocument();

	return (
		<div>
			<div className="w-6 h-6 xl:hidden" onClick={() => setOpen(true)}>
				<HamburgerIcon />
			</div>
			{loaded && <Sidebar open={open} setOpen={setOpen} />}
		</div>
	);
}

function HamburgerIcon() {
	return (
		<div className="h-full flex flex-col justify-around">
			<div className="bg-slate-100 w-full h-1" />
			<div className="bg-slate-100 w-full h-1" />
			<div className="bg-slate-100 w-full h-1" />
		</div>
	);
}
