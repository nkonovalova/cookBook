import Bars from "./assets/bars.svg";
import Fork from "./assets/fork.svg";
import Book from "./assets/book.svg";
import Pizza from "./assets/pizza.svg";
import AddNew from "./assets/addNew.svg";
import Extend from "./assets/extend.svg";
import './icons.css';

function IconBars() {
    return (
        <img className='icon' src={Bars} alt="hamburger" />
    )
}
function IconFork() {
    return (
        <img className='icon' src={Fork} alt="fork"/>
    );
}
function IconBook() {
    return (
        <img className='icon' src={Book} alt="book"/>
    );
}
function IconPizza() {
    return (
        <img className='icon' src={Pizza} alt="pizza"/>
    );
}
function IconAddNew(){
    return (
        <img className='icon' src={AddNew} alt="add new"/>
    );
}
function IconExtend() {
    return (
        <img className='icon' src={Extend} alt="extand"/>
    );
}
export {
    IconBars,
    IconFork,
    IconBook,
    IconPizza,
    IconAddNew,
    IconExtend
};