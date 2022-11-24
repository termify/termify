import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useBookingStore } from "../../store/stores";
import { ArrowIcon } from "../icons";

const sections: string[] = ["Auswahl", "Termin", "Eintragung", "Abschluss"];

export default function Taskleiste() {
	const bookingPageNumber = useBookingStore((state) => state.pageIndex);

	return (
		<div
			className={
				"p-2 border-slate-800 border-4 flex flex-wrap justify-between shadow-xl xl:p-0 xl:flex-nowrap xl:justify-around "
			}
		>
			<>
				{/* Desktop */}
				<div className={"hidden xl:flex xl:flex-grow"}>
					{sections.map((e, i) => (
						<TaskleisteSection key={e + i} sectionName={e} index={i + 1} last={i === sections.length - 1} />
					))}
				</div>
				{/* Mobile */}
				<motion.div
					initial={{ x: 0 }}
					animate={{ x: -((bookingPageNumber - 1) * (screen.width - screen.width * 0.04)) }}
					className={"flex items-center xl:hidden"}
				>
					<TaskleisteMobileSection index={1}>{sections[0]}</TaskleisteMobileSection>
					<TaskleisteMobileSection index={2}>{sections[1]}</TaskleisteMobileSection>
					<TaskleisteMobileSection index={3}>{sections[2]}</TaskleisteMobileSection>
					<TaskleisteMobileSection index={4}>{sections[3]}</TaskleisteMobileSection>
				</motion.div>
			</>
		</div>
	);
}

interface TaskleisteSectionProps {
	sectionName: string;
	last?: boolean;
	index: number;
}

interface TaskleisteMobileSectionProps {
	children: ReactNode;
	isArrow?: boolean;
	last?: boolean;
	index: number;
}

function TaskleisteMobileSection({ children, index, isArrow = false, last = false }: TaskleisteMobileSectionProps) {
	// 1 is first => 4 is last
	const bookingPageNumber = useBookingStore((state) => state.pageIndex);
	const setPageNumber = useBookingStore((state) => state.setPageNumber);

	return (
		<span
			className={`py-1 transition-all bg-gradient-to-r bg-clip-text text-transparent w-[95vw] text-center font-bold text-4xl  ${
				index === 1
					? "from-sky-400 to-emerald-500"
					: index === 2
					? "from-rose-400 to-amber-500"
					: index === 3
					? "from-indigo-400 to-sky-500"
					: "from-emerald-400 to-sky-500"
			}`}
		>
			{children}
		</span>
	);
}

function TaskleisteSection({ sectionName, index, last = false }: TaskleisteSectionProps) {
	const bookingPageNumber = useBookingStore((state) => state.pageIndex);

	const setPageNumber = useBookingStore((state) => state.setPageNumber);

	function checkPageIndex() {
		if (index < bookingPageNumber) setPageNumber(index);
	}

	return (
		<div className={"flex justify-around items-center flex-grow "}>
			<span
				className={`py-4 transition-all ${
					bookingPageNumber === index || bookingPageNumber > index
						? `bg-gradient-to-r ${
								index === 1
									? "from-sky-400 to-emerald-500"
									: index === 2
									? "from-rose-400 to-amber-500"
									: index === 3
									? "from-indigo-400 to-sky-500"
									: "from-emerald-400 to-sky-500"
						  } bg-clip-text text-transparent`
						: "text-slate-200"
				} ${
					bookingPageNumber === index ? "scale-110" : "scale-100"
				}  font-bold text-xs md:text-2xl xl:text-5xl cursor-pointer`}
				onClick={() => checkPageIndex()}
			>
				{sectionName}
			</span>
			{!last && (
				<ArrowIcon
					color={`${bookingPageNumber === index || bookingPageNumber > index ? "#0f172a" : "#e2e8f0"}`}
					className={`w-5 h-5 transition-all md:h-16 md:w-16 xl:h-24 xl:w-24`}
				/>
			)}
		</div>
	);
}
