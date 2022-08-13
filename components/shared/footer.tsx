import Link from "next/link"
import { ReactElement } from "react";



export default function Footer(){
    return(
        <footer className="grid grid-cols-2 place-content-center place-items-center bg-slate-50 p-4 shadow-inner xl:grid-cols-4" >
            <FooterSection>
                <FooterSectionLink name={"Home"} to={"/"} />
            </FooterSection>
            <div>
                Infoblock 2
            </div>
            <div>
                Infoblock 3
            </div>
            <div>
                Infoblock 4
            </div>
        </footer>
    )
}


function FooterSection({children}:{children: ReactElement | ReactElement[]}){
    return <>{children}</>
}

function FooterSectionLink({to, name}:{name:string; to: string;}){
    return(
        <Link href={to} >
            <a>{name}</a>
        </Link>
    )
}