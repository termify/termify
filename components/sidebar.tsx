import { Modal } from "./shared/modal";
import { motion } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { LoginLink, LogoutLink, NavigationLink, RegisterLink } from "./shared/header";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { TbFileSettings } from "react-icons/tb";
import { suspend } from "suspend-react";
import { useSession } from "next-auth/react";

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [yOffset, setYOffset] = useState<number>(500);
	const divRef = useRef<HTMLDivElement>(null);
	const session = useSession();

	useEffect(() => {
		setYOffset(divRef.current!.offsetHeight);
	}, []);

	const isPartner = suspend(async () => {
		const partner = sessionStorage.getItem("partnerId");

		return !!partner;
	}, [`isPartner`]);

	return (
		<Modal>
			<motion.div
				ref={divRef}
				initial={{ y: -yOffset }}
				animate={open ? { y: 0 } : { y: -yOffset }}
				transition={{ duration: 0.25 }}
				className="flex flex-col w-screen h-screen"
			>
				<div className="w-full ">
					<div className="flex justify-end items-center p-4 bg-slate-900">
						<h2 className="flex-grow text-center font-bold text-2xl bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent">
							Navigation
						</h2>
						<FaWindowClose
							onClick={() => setOpen(false)}
							className="bg-gradient-to-r from-sky-400 to-emerald-500 h-6 w-6 p-0.5"
						/>
					</div>
					<div className="flex-grow py-8 flex flex-col items-center gap-3 bg-slate-800 shadow-xl">
						{session.status === "authenticated" ? (
							<>
								{isPartner ? (
									<>
										<NavigationLink
											icon={<RiDashboardFill />}
											name={"Dashboard"}
											to={`/user/${session.data.user.id}/dashboard`}
											setOpen={() => setOpen(false)}
										/>
										<NavigationLink
											icon={<TbFileSettings color="#ffffff" />}
											name={"Konfiguration"}
											to={`/user/${session.data.user.id}/config`}
										/>
									</>
								) : (
									<NavigationLink
										icon={<RiDashboardFill />}
										name={"Dashboard"}
										to={`/user/${session.data.user.id}/dashboard`}
										setOpen={() => setOpen(false)}
									/>
								)}

								<LogoutLink onClick={() => setOpen(false)} />
							</>
						) : (
							<>
								<NavigationLink icon={<FaHome />} name={"Startseite"} to={"/"} setOpen={() => setOpen(false)} />
								<RegisterLink onClick={() => setOpen(false)} />
								<LoginLink onClick={() => setOpen(false)} />
							</>
						)}
					</div>
				</div>
				<div className="flex-grow" onClick={() => setOpen(false)} />
			</motion.div>
		</Modal>
	);
}
