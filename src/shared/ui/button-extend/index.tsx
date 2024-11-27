import './button-extend.css'
import {IconExtend} from "../icons";
import classNames from "classnames";

type ButtonExtendT = {
    onClick: () => void,
    isExtend: boolean
}
function ButtonExtend({ onClick, isExtend = true }: ButtonExtendT) {

    return (
        <button
            className='button-extend'
            type='button'
            onClick={onClick}
        >
            <div className={ classNames('icon-extend', {
                'is-extend': isExtend
            })}>
                <IconExtend/>
            </div>
        </button>
    )
}

export default ButtonExtend