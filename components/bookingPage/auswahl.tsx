import {ReactNode, Suspense, useEffect, useRef, useState} from "react";
import {BsFillArrowUpCircleFill, BsFillArrowDownCircleFill} from "react-icons/bs";

export default function AuswahlPage(){
    return <AuswahlAmt col={4} row={3} />
}





interface AuswahlAmtProps {
    col : number;
    row : number;
}
//TODO Kevin Bläser: AuswahlAmt Style
//TODO Kevin Bläser: DB Connect; prisma db befüllen
interface DataResponse{
    id: number;
    officeName: string;
    officeDescription?: string;
}

function AuswahlAmt({col,row}:AuswahlAmtProps){

    const [pos, setPos] = useState<number>(1);
    const [data,setData] = useState<DataResponse[]>([]);


    useEffect(()=>{

        async function fetchData(){
            const response = await (await fetch("/api/dbquery/selectauswahl")).json() as DataResponse[];
            setData(response)
        }

        fetchData();

    },[])

    function setHref(dest: number){
        setPos(dest);
        document.location.href = `#s-${dest}`
    }

    return (
            <>
                    <div className={"min-h-[3rem]"} >
                        {
                            pos !== 1 && <button title="Button" onClick={() => setHref(pos - 8)} className={"mx-auto flex justify-center"}>
                            <BsFillArrowUpCircleFill className={"h-12 w-12"}/></button>
                        }

                    </div>
                <div className={`grid grid-cols-2 grid-rows-${row} gap-3 xl:grid-cols-${col} overflow-y-hidden h-[32rem] scroll-smooth`}>
                    {
                        data.map((value, index) => <BookingButton key={value.id} index={index} >{value.officeName}</BookingButton>)
                    }
                </div>
                {
                    pos + 9 < data.length &&
                <button onClick={()=>setHref(pos + 8)} className={"mx-auto flex justify-center"} ><BsFillArrowDownCircleFill className={"h-12 w-12"} /></button>
                }
            </>

    )
}


interface BookinButtonProps{
    children: ReactNode;
    index: number;
}

function BookingButton({children, index}:BookinButtonProps){
    return(
        <button id={`s-${index}`} className={"bg-emerald-500 m-5 min-h-[8rem] xl:min-h-[13rem]"}  >
            {children}
        </button>
    )
}

