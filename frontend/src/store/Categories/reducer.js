import CategoriesTypes from "./types";

const INITIAL_STATE = {
    data: [],
    loading: false,
    hasError: false,
    message: '',
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoriesTypes.GET_CATEGORIES:
            return {
                ...state,
                loading: true,
            }
        case CategoriesTypes.GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                hasError: true,
                message: action.payload,
            }
        case CategoriesTypes.GET_CATEGORIES_SUCCESS:
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