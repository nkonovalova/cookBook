import {PORT, URL_CATEGORIES} from "../../../config.ts";

async function getCategories() {
    // TODO: сделать обработку ошибок
    return await fetch(`${PORT}${URL_CATEGORIES}`, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(data => data.json());
}

export { getCategories };
