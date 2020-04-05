import api from "../../services/api";
import { getCategoriesFailure, getCategoriesSuccess } from "./actions";
import { put, call } from 'redux-saga/effects';

export function* getCategories(){
    try {
        const response = yield call(api.get, 'categories');
        yield put(getCategoriesSuccess(response));
    } catch (error) {
        yield put(getCategoriesFailure(error));
    }
}
