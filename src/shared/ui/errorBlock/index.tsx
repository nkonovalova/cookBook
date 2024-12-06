import style from './error-block.module.css';
import {IconExclamation} from '../icons';
import ButtonClose from "../button-close";

interface ErrorBlockT {
    errors?: string[],
    onClose?: () => void,
    isClose?: boolean
}
function
ErrorBlock ({ isClose = false, errors, onClose}: ErrorBlockT) {
    const errorList = errors?.filter((error) => error.length > 0)
    return (
        <div className={ style.container }>
            <h3 className={style.header}>
                <div className={style.exclamation}>
                    <IconExclamation/>
                </div>
                Ошибка
            </h3>
            <ul className={style.errors}>
                {errorList?.map((error: string) =>
                    <li className={style.errorItem}>{error}</li>
                )}
            </ul>
            {isClose &&
                <div className={style.close}>
                    <ButtonClose onClick={onClose}/>
                </div>
            }
        </div>
    );
}

export default ErrorBlock;