
export default function Termin({onClick}:any){
    return(
            <div>
            Auswahl
            <button className="bg-red-300" onClick={onClick} >Termin</button>
            Eintragung
            Abschluss
        </div>
    )
}