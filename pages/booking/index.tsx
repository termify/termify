import AuswahlPage from "../../components/bookingPage/auswahl";
import Taskleiste from "../../components/bookingPage/taskleiste";
import {useBookingStore} from "../../store/store";


const BookingPage = () => {

    const bookingPageNumber = useBookingStore((state) => state.pageIndex );
    const setPageNumber = useBookingStore((state) => state.setPageNumber)

    return(
        <div>
            <Taskleiste />
            {
                bookingPageNumber === 1 ? <AuswahlPage /> : null
            }

        </div>
    )
}




export default BookingPage