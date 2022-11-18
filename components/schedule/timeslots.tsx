import ScheduleClass, { useShowPickedValue } from '../../lib/schedule';

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

export default function TimeSlots() {
    const today = useShowPickedValue();

    return (
        <div className={'ml-8 overflow-auto transition-all'}>
            <div
                className={
                    'p-4 bg-gradient-to-r from-sky-400 to-emerald-500 shadow-md text-sky-50 font-bold xl:text-2xl'
                }
            >
                {today}
            </div>
            <div className={'p-2 h-full flex flex-col gap-4'}>
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
    return (
        <button
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
