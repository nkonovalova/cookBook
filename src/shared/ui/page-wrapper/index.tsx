import style from './page-wrapper.module.css';
import {ReactNode, useState} from "react";
import ErrorBlock from "../errorBlock";

type PageWrapperT = {
    header?: string,
    isLoading?: boolean,
    isError?: boolean,
    errors?: string[],
    children?: ReactNode
};
function PageWrapper(props: PageWrapperT) {
    const [showError, setShowError] = useState(false);
    const onErrorClose = () => {
        setShowError(false);
    }

    return (
        <div className={ style.layout }>
            {props.isLoading &&
                <div className={style.preloader}>
                    <h2 className={style.preloaderText}>
                        Минуточку...
                    </h2>
                </div>
            }
            { props.isError && showError &&
                <div className={ style.errors }>
                    <ErrorBlock errors={props.errors} isClose={ true } onClose={ onErrorClose }/>
                </div>
            }
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