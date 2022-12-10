import { call, put } from "redux-saga/effects";
import {
  addUrlFailed, addUrlSuccess, getWebsiteListFailed, getWebsiteListSuccess
} from '@/app/store/reducers/app'
import { addURLAPI, getWebsitesList } from "@/app/api";
import {toast} from 'react-toastify'

export function* addURLHandler(action: any) {
  try {
    const data: ReturnType<typeof addURLAPI>  = yield call(addURLAPI, action?.payload)
    
    if (data) {
      yield toast('URL Add Success', {
        type: 'success'
      })
      yield put(addUrlSuccess(data));
    } else {
      yield toast('URL Add Failed', {
        type: 'error'
      })
      yield put(addUrlFailed(data));
    }
  } catch (e: any) {
    yield toast('URL Add Failed', {
      type: 'error'
    })
    yield put(addUrlFailed(e?.response?.message));
  }
}

export function* getWebsitesHandler(action: any) {
  try {
    const data: ReturnType<typeof addURLAPI> = yield call(getWebsitesList, action?.payload)
    yield put(getWebsiteListSuccess(data));
  } catch (e: any) {
    yield toast('Failed to load', {
      type: 'error'
    })
    yield put(getWebsiteListFailed(e?.response?.message));
  }
}