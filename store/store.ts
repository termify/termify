import create from "zustand";

type BookingDataProps = {
    officeId: number;
    officeName: string;
}
interface BookingStoreProps{
    pageIndex: number;
    setPageNumber: (newValue: number) => void;
    bookingData: BookingDataProps;
    setBookingData: (newValue: BookingDataProps) => void;
}

export const useBookingStore = create<BookingStoreProps>((set) => ({
    pageIndex: 1,
    setPageNumber: (newValue) => set((prevState) => ({...prevState, pageIndex: newValue < 1 ? 1 : newValue > 4 ? 4 : newValue })),
    bookingData: {
        officeId : 0,
        officeName : ""
    },
    setBookingData: (newValue) => set((prevState) => ({...prevState, bookingData: newValue}))
}))
