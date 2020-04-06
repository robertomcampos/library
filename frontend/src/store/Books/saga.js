import api from "../../services/api";
import {
    getBooksFailure,
    getBooksSuccess,
    getBooksByCategorySuccess,
    getBooksByCategoryFailure,
} from "./actions";
import { put, call } from 'redux-saga/effects';

export function* getBooks(action) {
    try {
        const response = yield call(api.get, `books/?page=${action.page}`);
        yield put(getBooksSuccess(response));
    } catch (error) {
        yield put(getBooksFailure(error));
    }
}

export function* getBooksByCategory(action) {
    try {
        const response = yield call(api.get,
            `books/categories/${action.params.categoryId}/?page=${action.params.page}`);
        yield put(getBooksByCategorySuccess(response));
    } catch (error) {
        yield put(getBooksByCategoryFailure(error));
    }
}

