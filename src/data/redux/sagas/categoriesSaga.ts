import { all, takeLatest, put, call } from "redux-saga/effects";
import { GET_CATEGORIES } from "../types";
import { setAllCategories, setAllCategoriesById } from "../actions";
import { SagaIterator } from "redux-saga";

// Fetch all categories
function* watchGetAllCategories(): SagaIterator {
  console.log("Fetching all categories...");
  try {
    const response: Response = yield call(
      fetch,
      "https://stg.tdh.start-tech.ae/api/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: any = yield call([response, "json"]);
    console.log("All categories response:", data);

    if (data.status === true) {
      yield put(setAllCategories(data.data.categories));
    } else {
      console.error(data.response?.message || "Unknown API error");
    }
  } catch (error) {
    console.error("Error fetching all categories:", error);
  }
}

// Fetch categories by ID (cat parameter)
function* watchGetCategoriesById(action: { payload: any }): SagaIterator {
  console.log("Fetching category by ID...");

  try {
    const response: Response = yield call(
      fetch,
      `https://stg.tdh.start-tech.ae/api/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${action.payload}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: any = yield call([response, "json"]);
    console.log("Category by ID response:", data);

    if (data.status === true) {
      yield put(setAllCategoriesById(data.data.items.data));
    } else {
      console.error(data.response?.message || "Unknown API error");
    }
  } catch (error) {
    console.error("Error fetching category by ID:", error);
  }
}

// Watcher for both sagas
export function* watchCategoriesSagas() {
  yield all([
    takeLatest(GET_CATEGORIES, watchGetAllCategories),
    takeLatest("GET_CATEGORY_BY_ID" as any, watchGetCategoriesById),
  ]);
}
