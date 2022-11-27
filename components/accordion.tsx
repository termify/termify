import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

interface AccordionSection {
	title: string;
	body: string;
}

interface AccordionProps {
	title: string;
	accordionSection: AccordionSection[];
}

export default function Accordion({ title, accordionSection }: AccordionProps) {
	return (
		<div className={" mx-auto xl:w-2/3"}>
			<h4 className={"font-bold text-2xl mb-4 text-slate-800"}>{title}</h4>
			{accordionSection.map((e, i) => (
				<AccordionSection key={e.title + i} title={e.title} body={e.body} />
			))}
		</div>
	);
}

function AccordionSection({ title, body }: AccordionSection) {
	const [open, setOpen] = useState<boolean>(false);
	const [height, setHeight] = useState<number>(88);
	const heightRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setHeight(heightRef.current?.clientHeight!);
	}, []);

	return (
		<div className={" my-2 xl:my-6"}>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className={
					"flex w-full bg-gradient-to-r items-center from-sky-400 to-emerald-500 text-sky-50 font-bold  p-2 justify-between shadow-md rounded-t-md xl:text-xl"
				}
			>
				<h5>{title}</h5>
				<motion.span animate={{ rotateZ: open ? 0 : -180 }}>
					<BsFillArrowUpCircleFill className={"h-8 w-8"} />
				</motion.span>
			</button>
			<motion.div
				ref={heightRef}
				animate={{ height: open ? height : 0 }}
				className={"bg-sky-200 rounded-b-md origin-top"}
			>
				<motion.div animate={{ display: open ? "block" : "none" }} className={"p-2 text-sky-900 h-fit"}>
					{body}
				</motion.div>
			</motion.div>
		</div>
	);
}
