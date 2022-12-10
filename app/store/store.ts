import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from './rootSaga'
import { RootState } from "./types";
import appreducer from './reducers/app'


const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  app: appreducer
});

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
