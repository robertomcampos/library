import BooksTypes from "./types";

export const getBooks = (page = 1) => ({ type: BooksTypes.GET_BOOKS, page });
export const getBooksSuccess = response => ({ type: BooksTypes.GET_BOOKS_SUCCESS, payload: response });
export const getBooksFailure = response => ({ type: BooksTypes.GET_BOOKS_FAILURE, payload: response });
export const clearBooks = () => ({ type: BooksTypes.CLEAR_BOOKS });

export const getBooksByCategory = (categoryId, page = 1) => ({ type: BooksTypes.GET_BOOKS_BY_CATEGORY, params: { categoryId, page } });
export const getBooksByCategorySuccess = response => ({ type: BooksTypes.GET_BOOKS_BY_CATEGORY_SUCCESS, payload: response });
export const getBooksByCategoryFailure = response => ({ type: BooksTypes.GET_BOOKS_BY_CATEGORY_FAILURE, payload: response });