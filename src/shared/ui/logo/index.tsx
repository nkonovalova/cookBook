import './logo.css'
import LogoImg from './cookingCat.png';

function Logo () {
    return (
        <div className='logo'>
            <img className='logo-img' src={LogoImg} alt="logo"/>
            <h1 className='logo-header'>
                CookBook
            </h1>
        </div>
    )
}

export default Logo;