import UserTypes from "./types";

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    message: '',
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserTypes.CREATE_USER:
            return {
                ...state,
                loading: true,
            }
        case UserTypes.CREATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: true,
                message: action.payload.response.data.message,
            }
        case UserTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: action.payload.data,
            }
        case UserTypes.CLEAR_ERROR:
            return {
                ...state,
                hasError: false,
            }
        default:
            return state;
    }
}

export default reducer;