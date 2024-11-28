import style from './input.module.css';
import classNames from "classnames";
import {IconApprove, IconExclamation} from "../icons";

type InputT = {
    name: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    value?: string | number,
    error?: boolean,
    success?: boolean,
    message?: string,
    onChange?: () => void,
};
function Input(props: InputT) {

    return (
        <label className={ style.label }>
            {props.label &&
                <p className={style.labelText}>
                    {props.label}
                </p>
            }
            <div className={style.container}>
                <input
                    className={classNames(style.input, {
                        [style.error]: props.error,
                        [style.success]: props.success,
                    })}
                    {...props}
                />
                { props.error &&
                    <div className={ style.status }>
                        <IconExclamation/>
                    </div>
                }
                { props.success &&
                    <div className={ style.status }>
                        <IconApprove/>
                    </div>
                }
            </div>

            {props.message &&
                <p className={classNames([style.message], {
                    [style.messageError]: props.error,
                    [style.messageSuccess]: props.success
                })
                }
                >
                    {props.message}
                </p>
            }
        </label>
    )
}

export default Input