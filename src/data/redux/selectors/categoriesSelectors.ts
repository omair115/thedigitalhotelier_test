import { RootState } from "../reducers";

export const getCategoriesSelector = (state: RootState) => state.categories.categories;
export const getCategoriesById = (state: RootState) => state.categories.categoriesById;