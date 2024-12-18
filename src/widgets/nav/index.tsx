import {NavLink} from "react-router";
import {useState} from "react";
import classNames from "classnames";

import {ROUTE_CATEGORIES, ROUTE_MAIN} from "../../shared/router";
import {IconAddNew, IconBook, IconFork, IconPizza} from "../../shared/ui/icons";
import ButtonExtend from "../../shared/ui/button-extend";

import style from './nav.module.css';

type NavT = {
    isShow: boolean
};

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
                    <NavLink
                        className={ ({isActive}) =>
                            (isActive ? `${style.link} ${style.active}` : style.link)
                        }
                        to={ROUTE_MAIN}
                    >
                        <div className={ style.logo }>
                            <IconFork/>
                        </div>
                        <div className={ style.text }>
                            Рецепты
                        </div>
                    </NavLink>
                </li>
                <li className={ style.item }>
                    <NavLink
                        className={ ({isActive}) =>
                            (isActive ? `${style.link} ${style.active}` : style.link)
                        }
                        to={ROUTE_CATEGORIES}
                    >
                        <div className={ style.logo }>
                            <IconBook/>
                        </div>
                        <div className={ style.text }>
                            Категории
                        </div>
                    </NavLink>
                </li>
                <li className={ style.item }>
                    <NavLink
                        className={ ({isActive}) =>
                            (isActive ? `${style.link} ${style.active}` : style.link)
                        }
                        to={ROUTE_MAIN}
                    >
                        <div className={ style.logo }>
                            <IconPizza/>
                        </div>
                        <div className={ style.text }>
                            Ингредиенты
                        </div>
                    </NavLink>
                </li>
                <li className={ style.item }>
                    <NavLink
                        className={ ({isActive}) =>
                            (isActive ? `${style.link} ${style.active}` : style.link)
                        }
                        to={ROUTE_MAIN}
                    >
                        <div className={ style.logo }>
                            <IconAddNew/>
                        </div>&nbsp;
                        <div className={ style.text }>
                            Новый рецепт
                        </div>
                    </NavLink>
                </li>
            </ul>
            <div className={ style.extendContainer }>
                <ButtonExtend onClick={extendHandler} isExtend={isExtend} />
            </div>
        </div>
    )
}

export default Nav;