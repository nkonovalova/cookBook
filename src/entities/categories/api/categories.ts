import {PORT, URL_CATEGORIES} from "../../../config.ts";
import {CategoryT, newCategoryT} from "../model/types.ts";

async function getCategories() {
    let response = await fetch(`${PORT}${URL_CATEGORIES}`, {
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

async function addNewCategories(newCategories: newCategoryT[]) {
    let response = await fetch(`${PORT}${URL_CATEGORIES}`, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newCategories)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
    // try {
    //     let response = await fetch(`${PORT}${URL_CATEGORIES}`, {
    //         method: 'POST',
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(newCategories)
    //     });
    //     if (!response.ok) {
    //         throw new Error(response.statusText);
    //     }
    //     const json = response.json();
    //     console.log(json);
    //     return json();
    // } catch (error: any) {
    //    console.error(error.message);
    //    //  return error;
    // }
}

async function updateCategories(toUpdate: CategoryT[]) {
    try {
        let response = await fetch(`${PORT}${URL_CATEGORIES}`, {
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

async function deleteCategory(id: string) {
    try {
        let response = await fetch(`${PORT}${URL_CATEGORIES}/${id}`, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        // const json = await response.json();
        return response;
    } catch (error: any) {
        console.error(error.message);
    }
}


export {
    getCategories,
    addNewCategories,
    updateCategories,
    deleteCategory,
};
