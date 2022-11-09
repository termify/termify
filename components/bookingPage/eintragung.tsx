
export default function Eintragung({onClick}:any){
    return(
        <div>
            Auswahl
            Termin
            <button className="bg-red-300" onClick={onClick} >Eintragung</button>
            Abschluss
        </div>
    )
}