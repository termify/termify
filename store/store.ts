import create from "zustand";


interface BookingStoreProps{
    pageIndex: number;
    setPageNumber: (newValue: number) => void;
}

export const useBookingStore = create<BookingStoreProps>((set) => ({
    pageIndex: 1,
    setPageNumber: (newValue) => set((state) => ({...state, pageIndex: newValue < 1 ? 1 : newValue > 4 ? 4 : newValue }))
}))

