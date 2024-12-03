import PageWrapper from "../../shared/ui/page-wrapper";
import Input from "../../shared/ui/input";
import style from './categories.module.css'
import ButtonDelete from "../../shared/ui/button-delete";
import ButtonAdd from "../../shared/ui/button-add";
import Button from "../../shared/ui/button";
import {useEffect, useState} from "react";
import {getCategories} from "../../entities/categories/api/categories.ts";
import {CategoryT} from "../../entities/categories/model/types.ts";
import {generateID} from "../../shared/lib/lib.ts";

const idPrefix = 'tmp';

function Categories() {
    const [categories, setCategories] = useState<CategoryT[]>([]);
    const [addedIds, setAddedIds] = useState<string[]>([]);
    const [updatedIds, setUpdatedIds] = useState<string[]>([]);

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        });
    }, []);
    let onCategoryDelete = (deletedId:string) => {
        if (addedIds.includes(deletedId)) {
            let newAddedIds = addedIds.filter((id) => id !== deletedId);
            setAddedIds(newAddedIds);
            let newCategories = categories.filter(({_id}) => _id !== deletedId);
            setCategories(newCategories);
        } else {
            // TODO: запрос к серверу на удаление
        }
    };
    let onAddCategory = () => {
        let id = generateID(idPrefix);
        let newCategories = [...categories];
        let newAddedIds = [...addedIds];
        newCategories.push({ _id: id, name: ''});
        newAddedIds.push(id);
        setCategories(newCategories);
        setAddedIds(newAddedIds);
    };
    let onChangeCategory = (id:string, value: string) => {
        let newCategories = categories.map((category) => {
            if (category._id !== id) {
                return category
            } else {
                return ({
                    ...category,
                    name: value
                });
            }
        });
        if (!addedIds.includes(id) && !updatedIds.includes(id)) {
            let newUpdatedIds = [...updatedIds];
            newUpdatedIds.push(id);
            setUpdatedIds(newUpdatedIds);
        }
        setCategories(newCategories);
    };
    return (
        <PageWrapper header='Категории' >
            <form className={ style.form }>
                <ul className={style.categories}>
                    { categories && categories.map((category, index) => (
                        <li className={style.item} key={ category._id }>
                            <div className={style.category}>
                                <Input
                                    name='name'
                                    placeholder='Название категории'
                                    value={ category.name }
                                    onChange={ (value) => {
                                        onChangeCategory(category._id, String(value));
                                    }}
                                />
                            </div>
                            <div className={style.delete}>
                                <ButtonDelete
                                    type='button'
                                    onClick={() => onCategoryDelete(category._id)}
                                />
                            </div>
                            { index === categories.length - 1 &&
                                <div className={style.add}>
                                    <ButtonAdd
                                        type='button'
                                        onClick={() => onAddCategory()}
                                    />
                                </div>
                            }
                        </li>
                    ))}
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