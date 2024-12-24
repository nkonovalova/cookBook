export interface CategoryT {
    _id: string;
    name: string;
}

export type newCategoryT = Omit<CategoryT, '_id'>

