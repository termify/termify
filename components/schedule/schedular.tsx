import Schedule, { ChangeMonth, ScheduleDate } from './schedule';

const Schedular = () => {
    return (
        <div className="flex-grow container mx-auto p-4 xl:w-1/2 ">
            <h2 className="text-3xl text-center my-4">Kalendar</h2>
            <ChangeMonth />
            <Schedule />
            {/* <ScheduleTask /> */}
        </div>
    );
};

export default Schedular;
