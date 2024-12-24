import ButtonIcon from "../button-icon";
import {IconTrash} from "../icons";
import {ButtonT} from "../../types/button.ts";

function ButtonDelete (props: ButtonT) {
    return (
        <ButtonIcon icon={<IconTrash/>} {...props} />
    );
}

export default ButtonDelete;