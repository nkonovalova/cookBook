import './categories.module.css'
import PageWrapper from "../../shared/ui/page-wrapper";
import Input from "../../shared/ui/input";

function Categories() {

    return (
        <PageWrapper header='Категории' isLoading={true}>
            <form>
                <ul>
                    <li>
                        <Input name='name' placeholder='Название' disabled={true} label='Название'/>
                    </li>
                    <li>
                        <Input name='amount' placeholder='Количество' disabled={false} value={40} label='Количество'/>
                    </li>
                    <li>
                        <Input name='2'
                               placeholder='Количество'
                               value={40}
                               error={true}
                               message='Произошла чудовищная ошибка'
                        />
                    </li>
                    <li>
                        <Input
                            name='3'
                            placeholder='Количество'
                            success={true}
                            message='Все успешно!'
                        />
                    </li>
                </ul>
            </form>
        </PageWrapper>
    )
}

export default Categories