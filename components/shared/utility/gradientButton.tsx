import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface GradientButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttontext: string;
    design: 'filled' | 'outlined';
}

export default function GradientButton(props: GradientButton) {
    if (props.design === 'filled')
        return (
            <button
                {...props}
                className="bg-gradient-to-r from-sky-400 to-emerald-500 text-slate-100 font-bold p-2 rounded shadow-xl transition-transform xl:hover:scale-110"
            >
                {props.buttontext}
            </button>
        );

    return <div></div>;
}
