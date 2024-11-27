import {NavLink} from "react-router";
import {useState} from "react";
import classNames from "classnames";

import {ROUTE_CATEGORIES, ROUTE_MAIN} from "../../shared/router";
import {IconAddNew, IconBook, IconFork, IconPizza} from "../../shared/ui/icons";
import './nav.css';
import ButtonExtend from "../../shared/ui/button-extend";

type NavT = {
    isShow: boolean
};

function Nav ({ isShow }: NavT) {
    const [isExtend, setIsExtend] = useState(true);
    let extendHandler = () => {
        setIsExtend(!isExtend);
    };
    return (
        <div className={ classNames('nav',{
            'nav-show': isShow,
            'nav-extend': isExtend
        })}>
            <ul className='nav-list'>
                <li className='nav-item'>
                    <NavLink
                        className='nav-item-link'
                        to={ROUTE_MAIN}
                    >
                        <div className='nav-logo-container'>
                            <IconFork/>
                        </div>
                        <div className='nav-text'>
                            Рецепты
                        </div>
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-item-link' to={ROUTE_CATEGORIES}>
                        <div className='nav-logo-container'>
                            <IconBook/>
                        </div>
                        <div className='nav-text'>
                            Категории
                        </div>
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-item-link' to={ROUTE_MAIN}>
                        <div className='nav-logo-container'>
                            <IconPizza/>
                        </div>
                        <div className='nav-text'>
                            Ингредиенты
                        </div>
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-item-link' to={ROUTE_MAIN}>
                        <div className='nav-logo-container'>
                            <IconAddNew/>
                        </div>
                        <div className='nav-text'>
                            Новый рецепт
                        </div>
                    </NavLink>
                </li>
            </ul>
            <div className='extend-container'>
                <ButtonExtend onClick={extendHandler} isExtend={isExtend} />
            </div>
        </div>
    )
}

export default Nav;