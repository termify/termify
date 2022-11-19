import AuswahlPage from '../../components/bookingPage/auswahl';
import Taskleiste from '../../components/bookingPage/taskleiste';
import Termin from '../../components/bookingPage/termin';
import { useBookingStore } from '../../store/stores';
import { Suspense } from 'react';
import Eintragung from '../../components/bookingPage/eintragung';
import Abschluss from '../../components/bookingPage/abschluss';

const BookingPage = () => {
    const bookingPageNumber = useBookingStore((state) => state.pageIndex);
    const setPageNumber = useBookingStore((state) => state.setPageNumber);

    return (
        <>
            <Taskleiste />
            <Suspense fallback={<div>Lade Ämter ...</div>}>
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
        </>
    );
};

export default BookingPage;
