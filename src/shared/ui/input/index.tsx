import {ChangeEvent, useEffect, useState} from "react";

import style from './input.module.css';
import classNames from "classnames";
import {IconApprove, IconExclamation} from "../icons";
import {inputChangeTimeout} from "../../const/const.ts";

type InputT = {
    name: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    value?: string | number,
    error?: boolean,
    success?: boolean,
    message?: string,
    onChange?: (value: string | number) => void;
};

function Input(props: InputT) {
    const [value, setValue] = useState(props.value || '');
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    useEffect(() => {
        const intervalId = setTimeout(() => {
            props.onChange?.(value);
        }, inputChangeTimeout);
        return () => clearTimeout(intervalId);
    }, [value]);
    return (
        <label className={ style.label }>
            {props.label &&
                <p className={style.labelText}>
                    {props.label}
                </p>
            }
            <div className={style.container}>
                <input
                    {...props}
                    className={classNames(style.input, {
                        [style.error]: props.error,
                        [style.success]: props.success,
                    })}
                    value={ value }
                    onChange={ onChangeHandler }
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