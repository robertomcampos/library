import AuthenticationTypes from "./types";

export const getAuthenticatedUser = data => ({ type: AuthenticationTypes.GET_AUTHENTICATED_USER, params: { data } });
export const getAuthenticatedUserSuccess = response => ({ type: AuthenticationTypes.GET_AUTHENTICATED_USER_SUCCESS, payload: response });
export const getAuthenticatedUserFailure = response => ({ type: AuthenticationTypes.GET_AUTHENTICATED_USER_FAILURE, payload: response });
export const clear = () => ({ type: AuthenticationTypes.CLEAR });
export const clearError = () => ({ type: AuthenticationTypes.CLEAR_ERROR });
