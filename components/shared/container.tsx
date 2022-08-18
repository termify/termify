import { ReactElement } from "react"

interface Container{
    children: ReactElement | ReactElement[];
}

export default function Container({children}:Container){
    return(
        <main className="p-4 flex-grow flex flex-col" >
            {children}
        </main>
    )
}

interface TestComponent{
    name: string;
    rasse: Rasse;
}

type Rasse = "mensch" | "vogel" | "hund";

export function TestComponent({name,rasse}:TestComponent){
    return(
        <div className="p-3" >
            {name}
        </div>
    )
}