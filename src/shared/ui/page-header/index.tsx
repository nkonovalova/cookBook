import './page-header.css';
import Logo from "../logo";
import {ROUTE_MAIN} from "../../router";
import {Link} from "react-router";

function PageHeader () {
    return (
        <div className='page-header'>
            <Link
                to={ROUTE_MAIN}
                className='main-link'
            >
                <Logo/>
            </Link>
        </div>
    )
}

export default PageHeader;