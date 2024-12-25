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
    const [touched, setTouched] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTouched(true);
        setValue(event.target.value);
    };
    const onBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value.trim());
        setTouched(true);
    };
    useEffect(() => {
        if (touched) {
            const timeoutId = setTimeout(() => {
                props.onChange?.(value);
                setShowStatus(true);
            }, inputChangeTimeout);
            return () => clearTimeout(timeoutId);
        }
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
                        [style.error]: props.error && showStatus,
                        [style.success]: props.success && showStatus,
                    })}
                    value={ value }
                    onChange={ onChangeHandler }
                    onBlur={ onBlurHandler }
                />
                { props.error && showStatus &&
                    <div className={ style.status }>
                        <IconExclamation/>
                    </div>
                }
                { props.success && showStatus &&
                    <div className={ style.status }>
                        <IconApprove/>
                    </div>
                }
            </div>

            {props.message && showStatus &&
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