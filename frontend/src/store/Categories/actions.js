import CategoriesTypes from "./types";

export const getCategories = () => ({ type: CategoriesTypes.GET_CATEGORIES });
export const getCategoriesSuccess = response => ({ type: CategoriesTypes.GET_CATEGORIES_SUCCESS, payload: response });
export const getCategoriesFailure = response => ({ type: CategoriesTypes.GET_CATEGORIES_FAILURE, payload: response });