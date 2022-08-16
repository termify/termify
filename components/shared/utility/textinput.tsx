import { DetailedHTMLProps, InputHTMLAttributes } from "react";


export default function Textinput(props:DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>){
    return <input {...props} className="p-2 mx-auto outline rounded outline-1 outline-sky-500 focus:outline-2" />
}