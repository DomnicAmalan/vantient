import { all, fork, takeLatest } from "redux-saga/effects";
import { addURLHandler, getWebsitesHandler } from "./handlers/app";
import { addUrl, getWebsiteList } from "./reducers/app";

export function* addURLSaga() {
  yield takeLatest(addUrl.type, addURLHandler);
}

export function* getWebsitesaga() {
  yield takeLatest(getWebsiteList.type, getWebsitesHandler);
}

export default function* RootSaga() {
  yield all([
    fork(addURLSaga),
    fork(getWebsitesaga)
  ]);
}
