import {ReactNode, useEffect, useState} from "react";
import ErrorBlock from "../errorBlock";
import {generateID} from "../../lib/lib.ts";
import PageHeader from "../page-header";
import Nav from "../../../widgets/nav";

import style from './page-wrapper.module.css';

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
    const [showMenu, setShowMenu] = useState(false);
    let switchMenu = () => {
        setShowMenu(!showMenu);
    }
    const onErrorClose = (id: string) => {
        let newErrorList = errorList.filter(error => error.id !== id);
        setErrorList(newErrorList);
    }
    useEffect(() => {
        if (props.errors && props.errors?.length > 0) {
            let newErrorList = [...errorList]
            for (let i = 0; i < props.errors.length - 1; i++) {
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
        <main className={style.layout}>
            <section className={style.header}>
                <PageHeader onHamburgerClick={switchMenu}/>
            </section>
            <section className={style.navigation}>
                <Nav isShow={showMenu}/>
            </section>
            <section className={style.content}>
                <div className={style.pageLayout}>
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
                    <div className={style.pageWrapper}>
                        <h1 className={style.pageHeader}>
                            {props.header}
                        </h1>
                        <div className={style.pageContent}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default PageWrapper