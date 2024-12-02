import {ReactNode} from "react";

export interface ButtonT {
    disabled?: boolean;
    iconOnly?: boolean;
    onClick?: () => void;
    children?: ReactNode,
    type?: "button" | "submit" | "reset";
}

export interface ButtonIconT extends ButtonT {
    icon: ReactNode
}
