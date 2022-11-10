import {ReactNode} from "react";

const testArray = ["Arbeitsamt","Finanzamt", "Bürgeramt", "Gewerbeamt", "Gesundheitsamt", "Bauamt", "Noch ein Amt","Arbeitsamt","Finanzamt", "Bürgeramt", "Gewerbeamt", "Gesundheitsamt", "Bauamt", "Noch ein Amt"];

export default function AuswahlPage(){
    return <AuswahlAmt col={4} row={3} />
}





interface AuswahlAmtProps {
    col : number;
    row : number;
}

function AuswahlAmt({col,row}:AuswahlAmtProps){
    return (

            <div className={`grid grid-cols-2 grid-rows-${row} gap-3 xl:grid-cols-${col}`}>
            {
                testArray.map((value, index) => <BookingButton key={value + index}  >{value}</BookingButton>)
            }
            </div>

    )
}


interface BookinButtonProps{
    children: ReactNode;
}

function BookingButton({children}:BookinButtonProps){
    return(
        <button className={"bg-emerald-500 m-5 min-h-[8rem] xl:min-h-[13rem]"}  >
            {children}
        </button>
    )
}

