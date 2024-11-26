import {Link} from "react-router";
import classNames from "classnames";

import {ROUTE_CATEGORIES, ROUTE_MAIN} from "../../shared/router";
import {IconAddNew, IconBook, IconFork, IconPizza} from "../../shared/ui/icons";
import './nav.css';

type NavT = {
    isShow: boolean
};

function Nav ({ isShow }: NavT) {
    return (
        <div className={ classNames('nav',{
            'nav-show': isShow
        })}>
            <ul className='nav-list'>
                <li className='nav-item'>
                    <Link className='nav-item-link' to={ROUTE_MAIN}>
                        <div className='nav-logo-container'>
                            <IconFork/>
                        </div>
                        <div className='nav-text'>
                            Рецепты
                        </div>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-item-link' to={ROUTE_CATEGORIES}>
                        <div className='nav-logo-container'>
                            <IconBook/>
                        </div>
                        <div className='nav-text'>
                            Категории
                        </div>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-item-link' to={ROUTE_MAIN}>
                        <div className='nav-logo-container'>
                            <IconPizza/>
                        </div>
                        <div className='nav-text'>
                            Ингредиенты
                        </div>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-item-link' to={ROUTE_MAIN}>
                        <div className='nav-logo-container'>
                            <IconAddNew/>
                        </div>
                        <div className='nav-text'>
                            Новый рецепт
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav;