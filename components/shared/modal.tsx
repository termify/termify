import { ReactElement } from "react"
import ReactDOM from "react-dom";

interface Modal{
    children: ReactElement | ReactElement[];
}

export function Modal({children}:Modal){
    return ReactDOM.createPortal(<div className="fixed top-0 left-0 h-screen w-screen" >{children}</div>,document.getElementById("modal") as HTMLElement);
}