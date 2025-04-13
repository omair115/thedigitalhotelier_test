import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// Reducers
import categoriesReducer from "./categories/categoriesReducer";

const rootReducer = combineReducers({
    categories: persistReducer({ key: "categories", storage }, categoriesReducer),
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
