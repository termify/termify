import { useBookingStore } from "../../store/stores";
import { ArrowIcon } from "../icons";

const sections: string[] = ["Auswahl", "Termin", "Eintragung", "Abschluss"];

export default function Taskleiste() {
	return (
		<div
			className={
				"p-2 border-slate-800 border-4 flex flex-wrap justify-between shadow-xl xl:p-0 xl:flex-nowrap xl:justify-around "
			}
		>
			{sections.map((e, i) => (
				<TaskleisteSection key={e + i} sectionName={e} index={i + 1} last={i === sections.length - 1} />
			))}
		</div>
	);
}

interface TaskleisteSectionProps {
	sectionName: string;
	last?: boolean;
	index: number;
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
