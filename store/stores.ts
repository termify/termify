import create from 'zustand';

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
        officeName: '',
    },
    setBookingData: (newValue) => set((prevState) => ({ ...prevState, bookingData: newValue })),
}));

interface ScheduleStoreProps {
    date: ScheduleDateProps;
    setDate: (newDate: ScheduleDateProps) => void;
    pickedDay: DateProps;
    setPickedDay: (pickedDay: DateProps) => void;
}

export type DateProps = {
    day: number;
    month: number;
    year: number;
};

type ScheduleDateProps = DateProps & {
    dayInWeek: number;
};

export const useScheduleStore = create<ScheduleStoreProps>((set) => ({
    date: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        dayInWeek: new Date().getDay(),
    },
    setDate: (newDate) => set((prevState) => ({ ...prevState, date: newDate })),
    pickedDay: {
        day: 1,
        month: 1,
        year: 1900,
    },
    setPickedDay: (pickedDay) => set((prevState) => ({ ...prevState, pickedDay: pickedDay })),
}));
