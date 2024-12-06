import {ButtonT} from "../../types/button.ts";
import style from './button-close.module.css';
import {IconClose} from "../icons";

function ButtonClose(props: ButtonT) {
    return (
        <button
            className={ style.button }
            onClick={props.onClick}
            {...props}
        >
            <IconClose/>
        </button>
    )
}

export default ButtonClose;