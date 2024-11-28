import style from './page-wrapper.module.css';
import {ReactNode} from "react";

type PageWrapperT = {
    header: string,
    children: ReactNode
};
function PageWrapper({ header = '', children }: PageWrapperT) {
    return (
        <div className={ style.wrapper }>
            <h1 className={ style.header }>
                { header }
            </h1>
            <div className={ style.content }>
                { children }
            </div>
        </div>
    )
}

export default PageWrapper