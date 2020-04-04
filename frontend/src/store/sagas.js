import BooksTypes from "./Books/types";
import { getBooks } from "./Books/saga";
import { all, takeLatest } from "redux-saga/effects";

function* sagas() {
    return yield all([
        takeLatest(BooksTypes.GET_BOOKS, getBooks)
    ])
}

export default sagas;