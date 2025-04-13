import { all } from "redux-saga/effects";
import { watchCategoriesSagas } from "./categoriesSaga";

export default function* rootSaga() {
  yield all([watchCategoriesSagas()]);
}
