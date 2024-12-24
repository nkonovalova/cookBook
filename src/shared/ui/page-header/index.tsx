import {Link} from "react-router";

import Logo from "../logo";
import {IconBars} from '../icons';

import {ROUTE_MAIN} from "../../router";

import './page-header.css';

type PageHeaderT = {
    onHamburgerClick: () => void;
}

function PageHeader ({ onHamburgerClick }: PageHeaderT) {
    return (
        <div className='page-header'>
            <Link
                to={ROUTE_MAIN}
                className='main-link'
            >
                <Logo/>
            </Link>
            <button
                className='hamburger'
                onClick={onHamburgerClick}>
                <div className='hamburger-logo'>
                    <IconBars/>
                </div>
            </button>
        </div>
    )
}

export default PageHeader;