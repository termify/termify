import {ComponentProps} from "react";

interface ArrowIcon extends ComponentProps<"svg">{
    color: string;
}

export const ArrowIcon = (props: ArrowIcon) => {
    return(
        <svg width="1" height="1" viewBox="0 0 1 1" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_4_8)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.694153 0.350342L0.993472 0.500001L0.694153 0.649661V0.350342Z" fill={`${props.color}`}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M0.0337326 0.530852C0.0166986 0.530852 0.00286865 0.517022 0.00286865 0.499988C0.00286865 0.482954 0.0166986 0.469124 0.0337326 0.469124L0.754005 0.450104C0.781535 0.450104 0.803889 0.472457 0.803889 0.499988C0.803889 0.527518 0.781535 0.549872 0.754005 0.549872L0.0337326 0.530852Z" fill={`${props.color}`}/>
            </g>
            <defs>
                <clipPath id="clip0_4_8">
                    <rect width="1" height="1" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    )
}