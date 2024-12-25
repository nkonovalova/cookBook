export interface IngredientT {
    _id: string;
    name: string;
}

export type NewIngredientT = Omit<IngredientT, '_id'>

