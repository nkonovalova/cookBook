import {NavLink, NavLinkProps} from "react-router";
import {useState} from "react";
import classNames from "classnames";

import {ROUTE_CATEGORIES, ROUTE_MAIN} from "../../shared/router";
import {IconAddNew, IconBook, IconFork, IconPizza} from "../../shared/ui/icons";
import ButtonExtend from "../../shared/ui/button-extend";

import style from './nav.module.css';

type NavT = {
    isShow: boolean
};

function MyNavLink(props: Omit<NavLinkProps, 'className'>) {
    return <NavLink
        className={ ({isActive}) =>
            classNames(style.link, {[style.active]: isActive})
        }
        {...props}
    >{props.children}</NavLink>
}

function Nav ({ isShow }: NavT) {
    const [isExtend, setIsExtend] = useState(true);
    let extendHandler = () => {
        setIsExtend(!isExtend);
    };
    return (
        <div className={ classNames(style.nav,{
            [style.show]: isShow,
            [style.extend]: isExtend
        })}>
            <ul className={ style.list }>
                <li className={ style.item }>
                    <MyNavLink to={ROUTE_MAIN}>
                        <div className={style.logo}>
                            <IconFork/>
                        </div>
                        <div className={style.text}>
                            Рецепты
                        </div>
                    </MyNavLink>
                </li>
                <li className={ style.item }>
                    <MyNavLink to={ROUTE_CATEGORIES}>
                        <div className={style.logo}>
                            <IconBook/>
                        </div>
                        <div className={style.text}>
                            Категории
                        </div>
                    </MyNavLink>
                </li>
                <li className={ style.item }>
                    <MyNavLink to={ROUTE_MAIN}>
                        <div className={style.logo}>
                            <IconPizza/>
                        </div>
                        <div className={style.text}>
                            Ингредиенты
                        </div>
                    </MyNavLink>
                </li>
                <li className={ style.item }>
                    <MyNavLink to={ROUTE_MAIN}>
                        <div className={style.logo}>
                            <IconAddNew/>
                        </div>
                        &nbsp;
                        <div className={style.text}>
                            Новый рецепт
                        </div>
                    </MyNavLink>
                </li>
            </ul>
            <div className={ style.extendContainer }>
                <ButtonExtend onClick={extendHandler} isExtend={isExtend} />
            </div>
        </div>
    )
}

export default Nav;