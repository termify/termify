import create from "zustand";

type BookingDataProps = {
  officeId: number;
  officeName: string;
};
interface BookingStoreProps {
  pageIndex: number;
  setPageNumber: (newValue: number) => void;
  bookingData: BookingDataProps;
  setBookingData: (newValue: BookingDataProps) => void;
}

export const useBookingStore = create<BookingStoreProps>((set) => ({
  pageIndex: 1,
  setPageNumber: (newValue) =>
    set((prevState) => ({
      ...prevState,
      pageIndex: newValue < 1 ? 1 : newValue > 4 ? 4 : newValue,
    })),
  bookingData: {
    officeId: 0,
    officeName: "",
  },
  setBookingData: (newValue) =>
    set((prevState) => ({ ...prevState, bookingData: newValue })),
}));

interface ScheduleStore {
  date: Date;
  setDate: (newDate: Date) => void;
}

type Date = {
  day: number;
  month: number;
  year: number;
};

export const useScheduleStore = create<ScheduleStore>((set) => ({
  date: { day: 1, month: 1, year: 1900 },
  setDate: (newDate) => set((prevState) => ({ ...prevState, date: newDate })),
}));
