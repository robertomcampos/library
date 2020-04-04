import BooksTypes from "./types";

const INITIAL_STATE = {
    data: [],
    loading: false,
    hasError: false,
    message: '',
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BooksTypes.GET_BOOKS:
            return {
                ...state,
                loading: true,
            }
        case BooksTypes.GET_BOOKS_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: true,
                message: action.payload,
            }
        case BooksTypes.GET_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: action.payload.data,
            }
        default:
            return state;
    }
} 

export default reducer;