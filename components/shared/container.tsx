import { ReactElement } from "react"

interface Container{
    children: ReactElement | ReactElement[];
}

export default function Container({children}:Container){
    return(
        <main className="p-4 flex-grow" >
            {children}
        </main>
    )
}