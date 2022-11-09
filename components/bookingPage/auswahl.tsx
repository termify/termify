
const testArray = ["Arbeitsamt","Finanzamt", "Bürgeramt", "Gewerbeamt", "Gesundheitsamt", "Bauamt", "Noch ein Amt","Arbeitsamt","Finanzamt", "Bürgeramt", "Gewerbeamt", "Gesundheitsamt", "Bauamt", "Noch ein Amt"];

interface AuswahlAmtProps {
    col : number;
    row : number;
}

function AuswahlAmt({col,row}:AuswahlAmtProps){
    return (

            <div className={`flex flex-col flex-wrap md:flex-row flex-${row}`}>
            {
                testArray.map((value, index) => <button className={"bg-emerald-500 p-2 m-2 basis-1/6 "} key={value + index} >{value}</button>)
            }
            </div>

    )
}

export default function AuswahlPage({onClick}:any){
    return(
        <>
            {/* <div>
                <button className="bg-red-300" onClick={onClick} >Auswahl</button>
                Termin
                Eintragung
                Abschluss
            </div> */}

            <div >
                {
                    <AuswahlAmt col={5} row={5} />
                }
            </div>
        </>
    )
}