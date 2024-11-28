import Button from "../button";

import { ButtonIconT } from "../../types/button.ts";
import style from './button-icon.module.css';

function ButtonIcon(props: ButtonIconT) {
    return (
        <Button {...props} iconOnly={!props.children}>
            <div className={ style.icon }>
                { props.icon }
            </div>
            {props.children &&
                <div className={style.text}>
                    {props.children}
                </div>
            }
        </Button>
    );
}

export default ButtonIcon;