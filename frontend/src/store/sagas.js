import BooksTypes from "./Books/types";
import { getBooks, getBooksByCategory } from "./Books/saga";

import CategoriesTypes from "./Categories/types";
import { getCategories } from "./Categories/saga";

import ReservationTypes from "./Reservation/types";
import { createReservation } from './Reservation/saga';

import UserTypes from "./User/types";
import { createUser } from "./User/saga";

import AuthenticationTypes from "./Authentication/types";
import { getAuthenticatedUser } from "./Authentication/saga";

import { all, takeLatest } from "redux-saga/effects";

function* sagas() {
    return yield all([
        takeLatest(BooksTypes.GET_BOOKS, getBooks),
        takeLatest(BooksTypes.GET_BOOKS_BY_CATEGORY, getBooksByCategory),
        takeLatest(CategoriesTypes.GET_CATEGORIES, getCategories),
        takeLatest(ReservationTypes.CREATE_RESERVATION, createReservation),
        takeLatest(UserTypes.CREATE_USER, createUser),
        takeLatest(AuthenticationTypes.GET_AUTHENTICATED_USER, getAuthenticatedUser),
    ])
}

export default sagas;