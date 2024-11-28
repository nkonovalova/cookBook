import PageWrapper from "../../shared/ui/page-wrapper";
import Input from "../../shared/ui/input";

function UIPage() {

    return (
        <PageWrapper header='UI Page'>
            <h2>Input</h2>
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
            <h2>Button</h2>

        </PageWrapper>
    )
}

export default UIPage