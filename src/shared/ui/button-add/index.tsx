import ButtonIcon from "../button-icon";
import {IconAddNew} from "../icons";
import {ButtonT} from "../../types/button.ts";

function ButtonAdd (props: ButtonT) {
    return (
        <ButtonIcon icon={<IconAddNew/>} {...props}/>
    );
}

export default ButtonAdd;