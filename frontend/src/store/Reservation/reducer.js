import ReservationTypes from "./types";

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    message: '',
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ReservationTypes.CREATE_RESERVATION:
            return {
                ...state,
                loading: true,
            }
        case ReservationTypes.CREATE_RESERVATION_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: true,
                message: action.payload,
            }
        case ReservationTypes.CREATE_RESERVATION_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: action.payload.data,
            }
        case ReservationTypes.CLEAR_RESERVATION:
            return {
                ...state,
                loading: true,
                hasError: false,
                data: undefined,
            }
        default:
            return state;
    }
}

export default reducer;