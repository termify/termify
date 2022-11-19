import { toast } from 'react-hot-toast';
import { useShowPickedValue } from '../../lib/schedule';
import { useBookingStore, useScheduleStore } from '../../store/stores';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

//TODO Kevin Bläser: Ersetze Obj durch DB Query
const times: string[] = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
];

interface TimeSlotsProps {
    onClick?: () => void;
}

export default function TimeSlots({ onClick }: TimeSlotsProps) {
    const today = useShowPickedValue();

    return (
        <div className={' overflow-auto transition-all xl:ml-8'}>
            <div
                className={
                    ' flex items-center justify-between p-4 bg-gradient-to-r from-sky-400 to-emerald-500 shadow-md text-sky-50 font-bold xl:text-2xl'
                }
            >
                {today}
                <button title={'Zurück'} className={'h-6 xl:hidden'} onClick={onClick}>
                    <BsFillArrowLeftCircleFill className={'w-full h-full'} />
                </button>
            </div>
            <div className={'p-4 h-full flex flex-col gap-4'}>
                {times.map((e, i) => (
                    <TimeSlotEntrie key={i} time={e} />
                ))}
            </div>
        </div>
    );
}

interface TimeSlotEntrieProps {
    time: string;
}

function TimeSlotEntrie({ time }: TimeSlotEntrieProps) {
    const pickedDate = useScheduleStore((state) => state.pickedDay);
    const bookingData = useBookingStore((state) => state.bookingData);
    const setBookingData = useBookingStore((state) => state.setBookingData);
    const setBookingPage = useBookingStore((state) => state.setPageNumber);

    function onClickHandler(e: React.PointerEvent<HTMLButtonElement>) {
        const isValid =
            JSON.stringify(pickedDate) !==
            JSON.stringify({
                day: 1,
                month: 1,
                year: 1900,
            });

        if (!isValid) {
            toast.error('Bitte wählen Sie ein passendes Datum');
            return;
        }

        setBookingData({
            ...bookingData,
            time,
            date: pickedDate,
        });
        setBookingPage(3);
    }

    return (
        <button
            onClick={onClickHandler}
            className={
                'bg-red-300 p-1 shadow rounded bg-gradient-to-r from-sky-400 to-emerald-500 w-2/3 mx-auto transition-all xl:hover:scale-110'
            }
        >
            <div className={'bg-white p-1 shadow rounded'}>
                <p
                    className={
                        'text-center font-bold text-2xl bg-gradient-to-r from-sky-400 to-emerald-500 p-1 bg-clip-text text-transparent'
                    }
                >
                    {time}
                </p>
            </div>
        </button>
    );
}
