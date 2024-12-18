import { string, object, array } from 'yup';
import PageWrapper from "../../shared/ui/page-wrapper";
import Input from "../../shared/ui/input";
import style from './categories.module.css'
import ButtonDelete from "../../shared/ui/button-delete";
import ButtonAdd from "../../shared/ui/button-add";
import Button from "../../shared/ui/button";
import {FormEvent, useEffect, useState} from "react";
import {
    addNewCategories,
    deleteCategory,
    getCategories,
    updateCategories
} from "../../entities/categories/api/categories.ts";
import {CategoryT, newCategoryT} from "../../entities/categories/model/types.ts";
import {generateID} from "../../shared/lib/lib.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const idPrefix = 'tmp';

const categorySchema = array().of(object().shape({
    name:
        string().
        required('Поле названия должно быть заполнено')
    ,
    _id: string().required(),
})).test({
    name: 'uniqueCategory',
    message: 'Названия категорий должны быть уникальны',
    test: (categories: CategoryT[]) => {
        if (categories && categories?.length > 0) {
            let uniqCategories = new Set();
            for (let i=0; i < categories.length; i++) {
                if (uniqCategories.has(categories[i].name)) {
                    return false;
                } else {
                    uniqCategories.add(categories[i].name);
                }
            }
        }
        return true;
    }
});

function Categories() {
    const [categories, setCategories] = useState<CategoryT[]>([]);
    const [addedIds, setAddedIds] = useState<Map<string, string>>(new Map());
    const [updatedIds, setUpdatedIds] = useState<Map<string, string>>(new Map());
    const [errors, setErrors] = useState(new Map());
    const [touched, setTouched] = useState(false);
    const [keyForm, setKeyForm] = useState(generateID());

    const queryClient = useQueryClient();

    const categoriesQuery = useQuery({ queryKey: ['categories'], queryFn: getCategories});
    const addCategoriesMutation = useMutation({
        mutationFn: (toCreate: newCategoryT[]) => addNewCategories(toCreate),
        onSuccess: () => {
            let newErrors = new Map(errors);
            for (let addedCategory of addedIds.keys()) {
                if (newErrors.has(addedCategory)) newErrors.delete(addedCategory);
            }
            if (newErrors.size === 0) {
                setTouched(false);
                setKeyForm(generateID())
            }
            setAddedIds(new Map());
            void queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    });
    const updateCategoriesMutation = useMutation({
        mutationFn: (toUpdate: CategoryT[]) => updateCategories(toUpdate),
        onSuccess: () => {
            let newErrors = new Map(errors);
            for (let updateCategory of updatedIds.keys()) {
                if (newErrors.has(updateCategory)) newErrors.delete(updateCategory);
            }
            if (newErrors.size === 0) {
                setTouched(false);
                setKeyForm(generateID());
            }
            setUpdatedIds(new Map());
            void queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    });
    const deleteCategoryMutation = useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    });
    useEffect(() => {
        if (categoriesQuery.data) {
            let newCategories = [...categoriesQuery.data];
            if (addedIds.size > 0) {
                let addedCategories = [];
                for (let category of addedIds) {
                    addedCategories.push({
                        _id: category[0],
                        name: category[1]
                    })
                }
                newCategories = newCategories.concat(addedCategories);
            }
            if (updatedIds.size > 0) {
                newCategories = newCategories.map((category) => {
                    if (updatedIds.has(category._id)) {
                        return ({
                            ...category,
                            name: updatedIds.get(category._id)
                        })
                    }
                    return category;
                })
            }
            setCategories(newCategories);
        }
    }, [categoriesQuery.data]);

    let onCategoryDelete = (deletedId:string) => {
        if (addedIds.has(deletedId)) {
            let newAddedIds = new Map(addedIds);
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
            if (updatedIds.has(deletedId)) {
                let newUpdatedIds = new Map(updatedIds);
                newUpdatedIds.delete(deletedId);
                setUpdatedIds(newUpdatedIds);
            }
            deleteCategoryMutation.mutate(deletedId);
        }
    };
    let onAddCategory = () => {
        let id = generateID(idPrefix);
        let newCategories = [...categories];
        let newAddedIds = new Map(addedIds);
        let newErrors = new Map(errors);
        newCategories.push({ _id: id, name: ''});
        newAddedIds.set(id, '');
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

        categorySchema.validate(newCategories)
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
            let newUpdatedIds = new Map(updatedIds);
            newUpdatedIds.set(id, value);
            setUpdatedIds(newUpdatedIds);
        }
        if (addedIds.has(id)) {
            let newAddedIds = new Map(addedIds);
            newAddedIds.set(id, value);
            setAddedIds(newAddedIds);
        }
        if (updatedIds.has(id)) {
            let newUpdatedIds = new Map(updatedIds);
            newUpdatedIds.set(id, value);
            setUpdatedIds(newUpdatedIds);
        }
        setTouched(true);
    };
    let onFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        let toUpdate = [];
        let toCreate: newCategoryT[] = [];
        for (let category of categories) {
            if (addedIds.has(category._id)) {
                toCreate.push({ name: category.name });
            }
            if (updatedIds.has(category._id)) {
                toUpdate.push(category);
            }
        }
        if (toCreate.length > 0) {
            addCategoriesMutation.mutate(toCreate);
        }
        if (toUpdate.length > 0) {
            updateCategoriesMutation.mutate(toUpdate);
        }
    };
    const isLoading = categoriesQuery.isPending ||
        deleteCategoryMutation.isPending ||
        addCategoriesMutation.isPending ||
        updateCategoriesMutation.isPending;

    const isError = categoriesQuery.isError ||
        deleteCategoryMutation.isError ||
        addCategoriesMutation.isError ||
        updateCategoriesMutation.isError;
    const errorMessage: string [] = [
        categoriesQuery.error?.message || '',
        deleteCategoryMutation.error?.message || '',
        addCategoriesMutation.error?.message || '',
        updateCategoriesMutation.error?.message || '',
    ];
    return (
        <PageWrapper
            header='Категории'
            isLoading={ isLoading }
            isError={ isError }
            errors={ errorMessage }
        >
            <form className={ style.form } onSubmit={ onFormSubmit } key={ keyForm } >
                <ul className={style.categories}>
                    { categories && categories.map((category, index) => (
                        <li className={style.item} key={ category._id }>
                            <div className={style.category}>
                                <Input
                                    name='name'
                                    placeholder='Название категории'
                                    value={ category.name }
                                    error={ errors.has(category._id) }
                                    success={ touched && !errors.has(category._id) }
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