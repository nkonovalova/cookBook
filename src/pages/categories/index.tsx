import { object, string } from 'yup';
import PageWrapper from "../../shared/ui/page-wrapper";
import Input from "../../shared/ui/input";
import style from './categories.module.css'
import ButtonDelete from "../../shared/ui/button-delete";
import ButtonAdd from "../../shared/ui/button-add";
import Button from "../../shared/ui/button";
import {FormEvent, useEffect, useState} from "react";
import {getCategories} from "../../entities/categories/api/categories.ts";
import {CategoryT} from "../../entities/categories/model/types.ts";
import {generateID} from "../../shared/lib/lib.ts";
import {useQuery} from "@tanstack/react-query";

const idPrefix = 'tmp';

let categorySchema = object({
    name: string().required('Поле названия должно быть заполнено'),
    id: string().required()
});

function Categories() {
    const [categories, setCategories] = useState<CategoryT[]>([]);
    const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
    const [updatedIds, setUpdatedIds] = useState<Set<string>>(new Set());
    const [errors, setErrors] = useState(new Map());
    const [touched, setTouched] = useState(false);

    const categoriesQuery = useQuery({ queryKey: ['categories'], queryFn: getCategories});
    useEffect(() => {
        if (categoriesQuery.data) {
            setCategories(categoriesQuery.data);
        }
    }, [categoriesQuery.data]);

    let onCategoryDelete = (deletedId:string) => {
        if (addedIds.has(deletedId)) {
            let newAddedIds = new Set(addedIds);
            newAddedIds.delete(deletedId);
            setAddedIds(newAddedIds);
            let newCategories = categories.filter(({_id}) => _id !== deletedId);
            setCategories(newCategories);
            let newErrors = new Map(errors);
            if (newErrors.has(deletedId)) {
                newErrors.delete(deletedId);
                setErrors(newErrors);
            }
            if (newAddedIds.size === 0 && updatedIds.size === 0) {
                setTouched(false);
            }
        } else {
            // TODO: запрос к серверу на удаление
        }
    };
    let onAddCategory = () => {
        let id = generateID(idPrefix);
        let newCategories = [...categories];
        let newAddedIds = new Set(addedIds);
        let newErrors = new Map(errors);
        newCategories.push({ _id: id, name: ''});
        newAddedIds.add(id);
        newErrors.set(id, 'Поле не должно быть пустым')
        setCategories(newCategories);
        setAddedIds(newAddedIds);
        setErrors(newErrors);
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
        setCategories(newCategories);
        categorySchema.validate({ id, name: value})
            .then(() => {
                let newErrors = new Map(errors);
                if (newErrors.has(id)) {
                    newErrors.delete(id)
                    setErrors(newErrors);
                }
            })
            .catch((error) => {
                let newErrors = new Map(errors);
                newErrors.set(id, error.message);
                setErrors(newErrors);
            });

        if (!addedIds.has(id) && !updatedIds.has(id)) {
            let newUpdatedIds = new Set(updatedIds);
            newUpdatedIds.add(id);
            setUpdatedIds(newUpdatedIds);
        }
        setTouched(true);
    };
    let onFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        let toUpdate = [];
        let toCreate = [];
        for (let category of categories) {
            if (addedIds.has(category._id)) {
                toCreate.push(category.name);
            }
            if (updatedIds.has(category._id)) {
                toUpdate.push(category);
            }
        }
        console.log('update: ', toUpdate);
        console.log('create: ', toCreate);
        // TODO: нужны запросы на апдейт и создание категорий
    };
    return (
        <PageWrapper header='Категории' >
            <form className={ style.form } onSubmit={ onFormSubmit } >
                <ul className={style.categories}>
                    { categories && categories.map((category, index) => (
                        <li className={style.item} key={ category._id }>
                            <div className={style.category}>
                                <Input
                                    name='name'
                                    placeholder='Название категории'
                                    value={ category.name }
                                    error={ errors.has(category._id) }
                                    success={ !errors.has(category._id) }
                                    message={ errors.has(category._id) ? errors.get(category._id) : ''}
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
                    <Button type='submit' disabled={ !touched || (touched && errors.size > 0) }>
                        Сохранить
                    </Button>
                </div>
            </form>
        </PageWrapper>
    )
}

export default Categories