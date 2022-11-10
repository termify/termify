import AuswahlPage from "../../components/bookingPage/auswahl";
import Taskleiste from "../../components/bookingPage/taskleiste";
import {useBookingStore} from "../../store/store";


const BookingPage = () => {

    const bookingPageNumber = useBookingStore((state) => state.pageIndex );
    const setPageNumber = useBookingStore((state) => state.setPageNumber)

    return(
        <div>
            <Taskleiste />
            <div className={"flex justify-around gap-3 p-4"} >
                <button className={" bg-rose-500 p-4"} onClick={()=>setPageNumber(bookingPageNumber - 1)}  > Zurück</button>
                <button className={" bg-rose-500 p-4"} onClick={()=>setPageNumber(bookingPageNumber + 1)}  > Nächste</button>
            </div>
            {
                bookingPageNumber === 1 ? <AuswahlPage /> : null
            }

        </div>
    )
}




export default BookingPage