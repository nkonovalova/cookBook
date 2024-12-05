import {PORT, URL_CATEGORIES} from "../../../config.ts";

async function getCategories() {
    // TODO: сделать обработку ошибок
    // return await fetch(`${PORT}${URL_CATEGORIES}`, {
    //     headers : {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // }).then(data => data.json());
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

export { getCategories };
