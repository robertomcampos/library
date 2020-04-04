import BooksTypes from "./types";

export const getBooks = () => ({ type: BooksTypes.GET_BOOKS });
export const getBooksSuccess = response => ({ type: BooksTypes.GET_BOOKS_SUCCESS, payload: response });
export const getBooksFailure = response => ({ type: BooksTypes.GET_BOOKS_FAILURE, payload: response });