import AuswahlPage from '../../components/bookingPage/auswahl';
import Taskleiste from '../../components/bookingPage/taskleiste';
import Termin from '../../components/bookingPage/termin';
import { useBookingStore } from '../../store/stores';
import { Suspense } from 'react';

const BookingPage = () => {
    const bookingPageNumber = useBookingStore((state) => state.pageIndex);
    const setPageNumber = useBookingStore((state) => state.setPageNumber);

    return (
        <>
            <Suspense fallback={<div>Lade Ämter ...</div>}>
                <Taskleiste />
                {bookingPageNumber === 1 ? <AuswahlPage /> : bookingPageNumber === 2 ? <Termin /> : null}
            </Suspense>
        </>
    );
};

export default BookingPage;
