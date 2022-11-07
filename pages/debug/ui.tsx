import { TermifyButton } from "../../components/base/customComponents";



export default function Ui(){
    return(
        <>
            <h3>UI Test Section</h3>
            <>
            <div className={"flex flex-col w-1/2 mx-auto"} >
                <h3>Buttons</h3>
                <TermifyButton colorVariant={"primary"}>Filled Primay</TermifyButton>
                <TermifyButton colorVariant={"secondary"}>Filled Secondary</TermifyButton>
            </div>
            </>
        </>
    )
}