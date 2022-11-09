import {useBookingStore} from "../../store/store";
import {ArrowIcon} from "../icons";


export default function Taskleiste (){

    return(
        <div className={" p-2 border-slate-700 border-4 flex flex-wrap justify-between gap-0.5 xl:p-6 xl:justify-around xl:gap-0 "} >
            <TaskleisteSection  sectionName={"Auswahl"} index={1}/>
            <TaskleisteSection  sectionName={"Termin"} index={2}/>
            <TaskleisteSection  sectionName={"Eintragung"} index={3}/>
            <TaskleisteSection  sectionName={"Abschluss"} index={4} last={true}/>
        </div>
    )
}

interface TaskleisteSectionProps{
    sectionName: string;
    last?: boolean;
    index: number;
}

function TaskleisteSection({sectionName, index, last = false}:TaskleisteSectionProps){

    const bookingPageNumber = useBookingStore((state) => state.pageIndex );

    return(
        <div className={"flex justify-around items-center flex-grow "} >
            <span className={`py-4 ${bookingPageNumber === index || bookingPageNumber > index ? "bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent" :"text-slate-200" }  font-bold xl:text-5xl`}  >{sectionName}</span>
            {
                !last && <ArrowIcon color={`${bookingPageNumber === index || bookingPageNumber > index ? "#0f172a" : "#e2e8f0"}`} className={`w-5 h-5  md:h-32 md:w-32`} />
            }
        </div>
    )
}

