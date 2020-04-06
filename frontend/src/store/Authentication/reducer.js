import AuthenticationTypes from "./types";

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    message: '',
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthenticationTypes.GET_AUTHENTICATED_USER:
            return {
                ...state,
                loading: true,
            }
        case AuthenticationTypes.GET_AUTHENTICATED_USER_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: true,
                message: action.payload.response.data.message,
            }
        case AuthenticationTypes.GET_AUTHENTICATED_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: action.payload.data,
            }
        case AuthenticationTypes.CLEAR_ERROR:
            return {
                ...state,
                hasError: false,
            }
        case AuthenticationTypes.CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default reducer;