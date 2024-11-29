import PageWrapper from "../../shared/ui/page-wrapper";
import Input from "../../shared/ui/input";
import style from './categories.module.css'
import ButtonDelete from "../../shared/ui/button-delete";
import ButtonAdd from "../../shared/ui/button-add";
import Button from "../../shared/ui/button";

function Categories() {

    return (
        <PageWrapper header='Категории' >
            <form className={ style.form }>
                <ul className={style.categories}>
                    <li className={style.item}>
                        <div className={style.category}>
                            <Input name='name' placeholder='Название' value='Первые блюда'/>
                        </div>
                        <div className={style.delete}>
                            <ButtonDelete/>
                        </div>
                    </li>
                    <li className={style.item}>
                        <div className={style.category}>
                            <Input name='name' placeholder='Название'/>
                        </div>
                        <div className={style.delete}>
                            <ButtonDelete/>
                        </div>
                        <div className={style.add}>
                            <ButtonAdd/>
                        </div>
                    </li>
                </ul>
                <div className={style.save}>
                    <Button>
                        Сохранить
                    </Button>
                </div>
            </form>
        </PageWrapper>
    )
}

export default Categories