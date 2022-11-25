import AuswahlPage from "../../components/bookingPage/auswahl";
import Taskleiste from "../../components/bookingPage/taskleiste";
import Termin from "../../components/bookingPage/termin";
import { useBookingStore } from "../../store/stores";
import { Suspense } from "react";
import Eintragung from "../../components/bookingPage/eintragung";
import Abschluss from "../../components/bookingPage/abschluss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const BookingPage = () => {
	const bookingPageNumber = useBookingStore((state) => state.pageIndex);

	return (
		<div>
			<Taskleiste />
			<Suspense
				fallback={
					<div className={"w-full h-52 flex justify-center "}>
						<div className={"flex gap-4 items-center"}>
							<p className={"xl:text-3xl"}>Daten werden geladen ...</p>
							<AiOutlineLoading3Quarters className={"h-12 w-12 animate-spin text-sky-500 xl:h-16 xl:w-16"} />
						</div>
					</div>
				}
			>
				{bookingPageNumber === 1 ? (
					<AuswahlPage />
				) : bookingPageNumber === 2 ? (
					<Termin />
				) : bookingPageNumber === 3 ? (
					<Eintragung />
				) : bookingPageNumber === 4 ? (
					<Abschluss />
				) : null}
			</Suspense>
		</div>
	);
};

export default BookingPage;
