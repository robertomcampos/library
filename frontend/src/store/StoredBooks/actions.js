import StoredBooksTypes from "./types";

export const addStoredBooks = response => ({ type: StoredBooksTypes.ADD_STORED_BOOKS, payload: response });
export const clearStoredBooks = () => ({ type: StoredBooksTypes.CLEAR_STORED_BOOKS });
