import Bars from "./assets/bars.svg";
import Fork from "./assets/fork.svg";
import Book from "./assets/book.svg";
import Pizza from "./assets/pizza.svg";
import AddNew from "./assets/addNew.svg";
import Extend from "./assets/doubleChevron.svg";
import Exclamation from './assets/exclamationMark.svg';
import Approve from './assets/approve.svg';
import Trash from './assets/trash.svg';
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
function IconExclamation() {
    return (
        <img className='icon' src={Exclamation} alt="exclamation"/>
    );
}
function IconApprove() {
    return (
        <img className='icon' src={Approve} alt="approve"/>
    );
}
function IconTrash() {
    return (
        <img className='icon' src={Trash} alt="trash"/>
    );
}


export {
    IconBars,
    IconFork,
    IconBook,
    IconPizza,
    IconAddNew,
    IconExtend,
    IconExclamation,
    IconApprove,
    IconTrash
};