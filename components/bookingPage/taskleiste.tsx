import {useBookingStore} from "../../store/store";
import {ArrowIcon} from "../icons";

const sections: string[] = ["Auswahl", "Termin", "Eintragung", "Abschluss"]

export default function Taskleiste (){

    return(
        <div className={"p-2 border-slate-800 border-4 flex flex-wrap justify-between xl:p-0 xl:flex-nowrap xl:justify-around "} >
            {
                sections.map((e,i) => <TaskleisteSection key={e+i} sectionName={e} index={i+1} last={i === sections.length-1} />)
            }
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
            <span className={`py-4 transition-all ${bookingPageNumber === index || bookingPageNumber > index ? "bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent" :"text-slate-200" } ${bookingPageNumber === index ? "scale-110" : "scale-100"}  font-bold xl:text-5xl`}  >{sectionName}</span>
            {
                !last && <ArrowIcon color={`${bookingPageNumber === index || bookingPageNumber > index ? "#0f172a" : "#e2e8f0"}`} className={`w-5 h-5 transition-all md:h-24 md:w-24`} />
            }
        </div>
    )
}

