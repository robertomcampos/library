import api from "../../services/api";
import { getAuthenticatedUserFailure, getAuthenticatedUserSuccess } from "./actions";
import { put, call } from 'redux-saga/effects';

export function* getAuthenticatedUser(action) {
    const { data } = action.params;
    try {
        const response = yield call(api.post, 'authenticate', data);
        yield put(getAuthenticatedUserSuccess(response));
    } catch (error) {
        yield put(getAuthenticatedUserFailure(error));
    }
}
