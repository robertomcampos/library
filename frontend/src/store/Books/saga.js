import api from "../../services/api";
import { getBooksFailure, getBooksSuccess } from "./actions";
import { put, call } from 'redux-saga/effects';

export function* getBooks(){
    try {
        const response = yield call(api.get, 'books');
        yield put(getBooksSuccess(response));
    } catch (error) {
        yield put(getBooksFailure(error));
    }
}
