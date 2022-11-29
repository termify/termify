import AuswahlPage from "../../components/bookingPage/auswahl";
import Taskleiste from "../../components/bookingPage/taskleiste";
import Termin from "../../components/bookingPage/termin";
import { useBookingStore } from "../../store/stores";
import { Suspense } from "react";
import Eintragung from "../../components/bookingPage/eintragung";
import Abschluss from "../../components/bookingPage/abschluss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LoadingSpinner from "../../components/shared/loadingSpinner";

const BookingPage = () => {
	const bookingPageNumber = useBookingStore((state) => state.pageIndex);

	return (
		<div>
			<Taskleiste />
			<Suspense fallback={<LoadingSpinner />}>
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
