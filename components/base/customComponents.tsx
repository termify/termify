import { ComponentProps } from "react";

// TODO: @Kevin Bläser fürs erste würde ich sagen machen wir angepasste UI Components
type ButtonColorVariants = "primary" | "secondary"

interface CustomButtonProps extends ComponentProps<"button">{
    colorVariant: ButtonColorVariants;
}

export const TermifyButton = ({colorVariant, className, ...props}:CustomButtonProps) => {

    const buttonColor = colorVariant === "primary" ? "from-sky-400 to-emerald-500" : "from-rose-400 to-amber-500"

    return <button className={className ?? `bg-gradient-to-r my-1 ${buttonColor} text-slate-100 p-2 rounded shadow-xl transition-all xl:hover:scale-105 `} {...props} >{props.children}</button>
}

