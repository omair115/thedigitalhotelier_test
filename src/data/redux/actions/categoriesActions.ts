import { GET_CATEGORIES, GET_CATEGORY_BY_ID, SET_CATEGORIES, SET_CATEGORY_BY_ID } from "../types";


export const getAllCategories = () => ({
  type: GET_CATEGORIES,
});

export const setAllCategories = (payload:any) => ({
  type: SET_CATEGORIES,
  payload
});

export const getCategoryById = (payload:any) => ({
  type: GET_CATEGORY_BY_ID,
  payload
});

export const setAllCategoriesById = (payload:any) => ({
  type: SET_CATEGORY_BY_ID,
  payload
});

