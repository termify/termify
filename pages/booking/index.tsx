import AuswahlPage from '../../components/bookingPage/auswahl';
import Taskleiste from '../../components/bookingPage/taskleiste';
import Termin from '../../components/bookingPage/termin';
import { useBookingStore } from '../../store/stores';

const BookingPage = () => {
    const bookingPageNumber = useBookingStore((state) => state.pageIndex);
    const setPageNumber = useBookingStore((state) => state.setPageNumber);

    return (
        <div>
            <Taskleiste />
            {bookingPageNumber === 1 ? <AuswahlPage /> : bookingPageNumber === 2 ? <Termin /> : null}
        </div>
    );
};

export default BookingPage;
