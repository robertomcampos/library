import api from "../../services/api";
import { createReservationFailure, createReservationSuccess } from "./actions";
import { put, call } from 'redux-saga/effects';

export function* createReservation(action) {
    const { data, userId } = action.params;
    try {
        const response = yield call(api.post, 'reservations', data, {
            headers: {
                Authorization: userId,
            }
        });
        yield put(createReservationSuccess(response));
    } catch (error) {
        yield put(createReservationFailure(error));
    }
}
