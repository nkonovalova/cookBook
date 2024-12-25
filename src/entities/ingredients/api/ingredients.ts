import {PORT, URL_INGREDIENTS} from "../../../config.ts";
import {IngredientT, NewIngredientT} from "../model/types.ts";

async function getIngredients() {
    let response = await fetch(`${PORT}${URL_INGREDIENTS}`, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json()
}

async function addNewIngredients(newIngredients: NewIngredientT[]) {
    let response = await fetch(`${PORT}${URL_INGREDIENTS}`, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newIngredients)
    });
    if (!response.ok) {
        let resultBody = await response.json();
        throw new Error(resultBody.error);
    }
    return response.json();
}

async function updateIngredients(toUpdate: IngredientT[]) {
    try {
        let response = await fetch(`${PORT}${URL_INGREDIENTS}`, {
            method: 'PATCH',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(toUpdate)
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const json = await response.json();
        return json();
    } catch (error: any) {
        console.error(error.message);
    }
}

async function deleteIngredient(id: string) {
    try {
        let response = await fetch(`${PORT}${URL_INGREDIENTS}/${id}`, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const json = await response.json();
        return json();
    } catch (error: any) {
        console.error(error.message);
    }
}


export {
    getIngredients,
    addNewIngredients,
    updateIngredients,
    deleteIngredient,
};
