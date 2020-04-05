import BooksTypes from "./types";

export const getBooks = () => ({ type: BooksTypes.GET_BOOKS });
export const getBooksSuccess = response => ({ type: BooksTypes.GET_BOOKS_SUCCESS, payload: response });
export const getBooksFailure = response => ({ type: BooksTypes.GET_BOOKS_FAILURE, payload: response });

export const getBooksByCategory = categoryId => ({ type: BooksTypes.GET_BOOKS_BY_CATEGORY, params: { categoryId } });
export const getBooksByCategorySuccess = response => ({ type: BooksTypes.GET_BOOKS_BY_CATEGORY_SUCCESS, payload: response });
export const getBooksByCategoryFailure = response => ({ type: BooksTypes.GET_BOOKS_BY_CATEGORY_FAILURE, payload: response });