import UserTypes from "./types";

export const createUser = data => ({ type: UserTypes.CREATE_USER, params: { data } });
export const createUserSuccess = response => ({ type: UserTypes.CREATE_USER_SUCCESS, payload: response });
export const createUserFailure = response => ({ type: UserTypes.CREATE_USER_FAILURE, payload: response });