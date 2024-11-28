import style from './page-wrapper.module.css';
import {ReactNode} from "react";

type PageWrapperT = {
    header?: string,
    isLoading?: boolean,
    children?: ReactNode
};
function PageWrapper(props: PageWrapperT) {
    return (
        <div className={ style.layout }>
            {props.isLoading &&
                <div className={style.preloader}>
                    <h2 className={style.preloaderText}>
                        Минуточку...
                    </h2>
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