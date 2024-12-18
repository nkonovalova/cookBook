import style from './page-wrapper.module.css';
import {ReactNode, useEffect, useState} from "react";
import ErrorBlock from "../errorBlock";
import {generateID} from "../../lib/lib.ts";

type PageWrapperT = {
    header?: string,
    isLoading?: boolean,
    isError?: boolean,
    errors?: string[],
    children?: ReactNode
};
type ErrorT = {
    id: string,
    message: string
};
function PageWrapper(props: PageWrapperT) {
    const [errorList, setErrorList] = useState<ErrorT[]>([]);
    const onErrorClose = (id: string) => {
        let newErrorList = errorList.filter(error => error.id !== id);
        setErrorList(newErrorList);
    }
    useEffect(() => {
        if (props.errors && props.errors?.length > 0) {
            let newErrorList = [...errorList]
            for (let i=0; i < props.errors.length - 1; i++) {
                if (props.errors[i].length > 0) {
                    let newError = {
                        id: generateID('error'),
                        message: props.errors[i]
                    };
                    newErrorList.push(newError);
                }
            }
            setErrorList(newErrorList);
        }
    }, [props.errors]);

    return (
        <div className={style.layout}>
            {props.isLoading &&
                <div className={style.preloader}>
                    <h2 className={style.preloaderText}>
                        Минуточку...
                    </h2>
                </div>
            }
            <ul className={style.errors}>
                {errorList.length > 0 &&
                    errorList.map((error) =>
                        <li
                            key={error.id}
                            className={style.errorItem}
                        >
                            <ErrorBlock
                                errors={[error.message]}
                                isClose={true}
                                onClose={() => onErrorClose(error.id)}
                            />
                        </li>
                    )
                }
            </ul>
                <div className={style.wrapper}>
                    <h1 className={style.header}>
                        {props.header}
                    </h1>
                    <div className={style.content}>
                        {props.children}
                    </div>
                </div>

            </div>
            )
            }

export default PageWrapper