import ReservationTypes from "./types";

export const createReservation = (data, userId) => ({ type: ReservationTypes.CREATE_RESERVATION, params: { data, userId } });
export const createReservationSuccess = response => ({ type: ReservationTypes.CREATE_RESERVATION_SUCCESS, payload: response });
export const createReservationFailure = response => ({ type: ReservationTypes.CREATE_RESERVATION_FAILURE, payload: response });
export const clearReservation = () => ({ type: ReservationTypes.CLEAR_RESERVATION });