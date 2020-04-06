import api from "../../services/api";
import { createUserFailure, createUserSuccess, clearError } from "./actions";
import { put, call,   } from 'redux-saga/effects';

export function* createUser(action) {
    const { data } = action.params;
    try {
        yield put(clearError());
        const response = yield call(api.post, 'users', data);
        yield put(createUserSuccess(response));
    } catch (error) {
        yield put(createUserFailure(error));
    }
}
