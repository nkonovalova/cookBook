import {FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import Input from "../../shared/ui/input";
import ButtonDelete from "../../shared/ui/button-delete";
import ButtonAdd from "../../shared/ui/button-add";
import Button from "../../shared/ui/button";

import PageWrapper from "../../shared/ui/page-wrapper";
import {IngredientT, NewIngredientT } from "../../entities/ingredients/model/types.ts";

import {
    addNewIngredients,
    deleteIngredient,
    getIngredients,
    updateIngredients
} from "../../entities/ingredients/api/ingredients.ts";
import {generateID} from "../../shared/lib/lib.ts";
import {array, object, string} from "yup";

import style from './inredients.module.css'

const idPrefix = 'tmp';

const ingredientsSchema = array().of(object().shape({
    name:
        string().
        required('Поле названия должно быть заполнено').
        matches(/^[^,.@\/\\*&$~]*$/,
            { excludeEmptyString: true, message: 'Поле не должно содержать следующие символы: ^ , . @ / \\ & * ~' }).
        min(3, 'Название слишком короткое').
        max(50, 'Название не должно быть длиннее 50 символов')
    ,
    _id: string().required(),
})).test({
    name: 'uniqueCategory',
    message: 'Названия ингредиентов должны быть уникальны',
    test: (ingredients: IngredientT[] | undefined) => {
        if (ingredients && ingredients?.length > 0) {
            let uniqCategories = new Set();
            for (let i=0; i < ingredients.length; i++) {
                if (uniqCategories.has(ingredients[i].name)) {
                    return false;
                } else {
                    uniqCategories.add(ingredients[i].name);
                }
            }
        }
        return true;
    }
});


function Ingredients() {
    const [ingredients, setIngredients] = useState<IngredientT[]>([]);
    const [addedIds, setAddedIds] = useState<Map<string, string>>(new Map());
    const [updatedIds, setUpdatedIds] = useState<Map<string, string>>(new Map());
    const [errors, setErrors] = useState(new Map());
    const [touched, setTouched] = useState(false);
    const [keyForm, setKeyForm] = useState(generateID(idPrefix));
    const queryClient = useQueryClient();

    const ingredientsQuery = useQuery({ queryKey: ['ingredients'], queryFn: getIngredients});

    const addIngredientsMutation = useMutation({
        mutationFn: (toCreate:  NewIngredientT[]) => addNewIngredients(toCreate),
        onSuccess: () => {
            let newErrors = new Map(errors);
            for (let addedIngredient of addedIds.keys()) {
                if (newErrors.has(addedIngredient)) newErrors.delete(addedIngredient);
            }
            if (newErrors.size === 0) {
                setTouched(false);
                setKeyForm(generateID())
            }
            setAddedIds(new Map());
            void queryClient.invalidateQueries({ queryKey: ['ingredients'] })
        }
    });

    const updateIngredientsMutation = useMutation({
        mutationFn: (toUpdate: IngredientT[]) => updateIngredients(toUpdate),
        onSuccess: () => {
            let newErrors = new Map(errors);
            for (let updateIngredient of updatedIds.keys()) {
                if (newErrors.has(updateIngredient)) newErrors.delete(updateIngredient);
            }
            if (newErrors.size === 0) {
                setTouched(false);
                setKeyForm(generateID());
            }
            setUpdatedIds(new Map());
            void queryClient.invalidateQueries({ queryKey: ['ingredients'] })
        }
    });

    const deleteIngredientMutation = useMutation({
        mutationFn: (id: string) => deleteIngredient(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['ingredients'] })
        }
    });

    useEffect(() => {
        if (ingredientsQuery.data) {
            let newIngredients = [...ingredientsQuery.data];
            if (addedIds.size > 0) {
                let addedIngredients = [];
                for (let ingredient of addedIds) {
                    addedIngredients.push({
                        _id: ingredient[0],
                        name: ingredient[1]
                    })
                }
                newIngredients = newIngredients.concat(addedIngredients);
            }
            if (updatedIds.size > 0) {
                newIngredients = newIngredients.map((ingredient) => {
                    if (updatedIds.has(ingredient._id)) {
                        return ({
                            ...ingredient,
                            name: updatedIds.get(ingredient._id)
                        })
                    }
                    return ingredient;
                })
            }
            setIngredients(newIngredients);
        }
    }, [ingredientsQuery.data]);

    let onDeleteIngredient = (deletedId:string) => {
        if (addedIds.has(deletedId)) {
            let newAddedIds = new Map(addedIds);
            newAddedIds.delete(deletedId);
            setAddedIds(newAddedIds);
            let newIngredients = ingredients.filter(({_id}) => _id !== deletedId);
            setIngredients(newIngredients);
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
            deleteIngredientMutation.mutate(deletedId);
        }
    };

    let onAddIngredient = () => {
        let id = generateID(idPrefix);
        let newIngredients = [...ingredients];
        let newAddedIds = new Map(addedIds);
        let newErrors = new Map(errors);
        newIngredients.push({ _id: id, name: ''});
        newAddedIds.set(id, '');
        newErrors.set(id, 'Поле не должно быть пустым')
        setIngredients(newIngredients);
        setAddedIds(newAddedIds);
        setErrors(newErrors);
    };

    let onChangeIngredient = (id:string, value: string) => {
        let newIngredients = ingredients.map((ingredient) => {
            if (ingredient._id !== id) {
                return ingredient
            } else {
                return ({
                    ...ingredient,
                    name: value
                });
            }
        });
        setIngredients(newIngredients);

        ingredientsSchema.validate(newIngredients)
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
        let toCreate: NewIngredientT[] = [];
        for (let ingredient of ingredients) {
            if (addedIds.has(ingredient._id)) {
                toCreate.push({ name: ingredient.name });
            }
            if (updatedIds.has(ingredient._id)) {
                toUpdate.push(ingredient);
            }
        }
        if (toCreate.length > 0) {
            addIngredientsMutation.mutate(toCreate);
        }
        if (toUpdate.length > 0) {
            updateIngredientsMutation.mutate(toUpdate);
        }
    };

    const isLoading = ingredientsQuery.isPending ||
        deleteIngredientMutation.isPending ||
        addIngredientsMutation.isPending ||
        updateIngredientsMutation.isPending;

    const isError = ingredientsQuery.isError ||
        deleteIngredientMutation.isError ||
        addIngredientsMutation.isError ||
        updateIngredientsMutation.isError;
    const errorMessage: string [] = [
        ingredientsQuery.error?.message || '',
        deleteIngredientMutation.error?.message || '',
        addIngredientsMutation.error?.message || '',
        updateIngredientsMutation.error?.message || '',
    ];
    return (
        <PageWrapper
            header='Ингредиенты'
            isLoading={ isLoading }
            isError={ isError }
            errors={ errorMessage }
        >
            <form className={style.form} onSubmit={onFormSubmit} key={keyForm}>
                <ul className={style.ingredients}>
                    {ingredients && ingredients.map((ingredient, index) => (
                        <li className={style.item} key={ingredient._id}>
                            <div className={style.ingredient}>
                                <Input
                                    name='name'
                                    placeholder='Название категории'
                                    value={ingredient.name}
                                    error={errors.has(ingredient._id)}
                                    success={touched && !errors.has(ingredient._id)}
                                    message={errors.has(ingredient._id) ? errors.get(ingredient._id) : ''}
                                    onChange={(value) => {
                                        onChangeIngredient(ingredient._id, String(value));
                                    }}
                                />
                            </div>
                            <div className={style.delete}>
                                <ButtonDelete
                                    type='button'
                                    onClick={() => onDeleteIngredient(ingredient._id)}
                                />
                            </div>
                            {index === ingredients.length - 1 &&
                                <div className={style.add}>
                                    <ButtonAdd
                                        type='button'
                                        onClick={() => onAddIngredient()}
                                    />
                                </div>
                            }
                        </li>
                    ))}
                </ul>
                <div className={style.save}>
                    <Button type='submit' disabled={!touched || (touched && errors.size > 0)}>
                        Сохранить
                    </Button>
                </div>

            </form>
        </PageWrapper>
    )
}

export default Ingredients;