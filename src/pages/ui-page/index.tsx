import PageWrapper from "../../shared/ui/page-wrapper";
import Input from "../../shared/ui/input";
import Button from "../../shared/ui/button";

import style from './ui-page.module.css';
import ButtonIcon from "../../shared/ui/button-icon";
import {IconBook} from "../../shared/ui/icons";
import ButtonDelete from "../../shared/ui/button-delete";
import ButtonAdd from "../../shared/ui/button-add";

function UIPage() {

    return (
        <PageWrapper header='UI Page'>
            <h2>Input</h2>
            <form>
                <Input name='name' placeholder='Название' disabled={true} label='Название'/>
                <Input name='amount' placeholder='Количество' disabled={false} value={40} label='Количество'/>
                <Input name='2'
                       placeholder='Количество'
                       value={40}
                       error={true}
                       message='Произошла чудовищная ошибка'
                />
                <Input
                    name='3'
                    placeholder='Количество'
                    success={true}
                    message='Все успешно!'
                />
            </form>
            <h2>Buttons</h2>
            <div className={ style.button }>
                <p>
                    Button
                </p>
                <Button>
                    Нажми меня
                </Button>
                <Button disabled={true}>
                    disabled button
                </Button>
            </div>
            <div className={style.button}>
                <p>
                    ButtonIcon
                </p>
                <ButtonIcon icon={<IconBook/>}>
                    Книжечка!
                </ButtonIcon>
                <ButtonIcon icon={<IconBook/>} />
                <ButtonDelete/>
                <ButtonAdd/>
            </div>

        </PageWrapper>
    )
}

export default UIPage