import StoredBooksTypes from "./types";

const INITIAL_STATE = {
    data: [],
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case StoredBooksTypes.ADD_STORED_BOOKS:
            return {
                ...state,
                data: action.payload,
            }
        case StoredBooksTypes.CLEAR_STORED_BOOKS:
            return {
                ...state,
                data: [],
            }
        default:
            return state;
    }
}

export default reducer;