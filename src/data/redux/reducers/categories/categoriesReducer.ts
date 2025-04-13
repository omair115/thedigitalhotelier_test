import { AnyAction } from "redux";
import { ICategoriesReducerState, categoriesReducerInitialState } from "./categoriesReducerData";
import { SET_CATEGORIES, SET_CATEGORY_BY_ID } from "../../types";

const categoriesReducer = (
  state: ICategoriesReducerState = categoriesReducerInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_CATEGORY_BY_ID:
      return {
        ...state,
        categoriesById: action.payload,
      };
    

    default:
      return state;
  }
};

export default categoriesReducer;
