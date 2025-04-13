import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);
	sagaMiddleware.run(rootSaga);
	const persistor = persistStore(store);
	return { store, persistor };
};

const { store, persistor } = configureStore();

export { store, persistor };
