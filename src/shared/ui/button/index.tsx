import classNames from "classnames";
import {ButtonT} from "../../types/button.ts";

import style from './button.module.css';

function Button(props: ButtonT) {
    return (
        <button
            className={ classNames([style.button], {
                [style.icon]: props.iconOnly
            }) }
            onClick={props.onClick}
            {...props}
        >
            {props.children}
        </button>
    )
}

export default Button;