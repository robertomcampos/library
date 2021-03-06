import UserTypes from "./types";

export const clearError = () => ({ type: UserTypes.CLEAR_ERROR });

export const createUser = data => ({ type: UserTypes.CREATE_USER, params: { data } });
export const createUserSuccess = response => ({ type: UserTypes.CREATE_USER_SUCCESS, payload: response });
export const createUserFailure = response => ({ type: UserTypes.CREATE_USER_FAILURE, payload: response });
export const clear = () => ({ type: UserTypes.CLEAR });