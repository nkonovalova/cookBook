import {ReactNode} from "react";

export interface ButtonT {
    disabled?: boolean;
    iconOnly?: boolean;
    onClick?: () => void;
    children?: ReactNode
}

export interface ButtonIconT extends ButtonT {
    icon: ReactNode
}
