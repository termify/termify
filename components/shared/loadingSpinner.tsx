import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSpinner() {
	return (
		<div className={"w-full h-52 flex justify-center "}>
			<div className={"flex gap-4 items-center"}>
				<p className={"xl:text-3xl"}>Daten werden geladen ...</p>
				<AiOutlineLoading3Quarters className={"h-12 w-12 animate-spin text-sky-500 xl:h-16 xl:w-16"} />
			</div>
		</div>
	);
}
