import setAuthToken from "./../../setAuthToken";

import * as actionTypes from "./actions";

export const registerUser = (user, history) => dispatch => {

};

export const storeUser = user => ({
    type: actionTypes.AUTHENTICATION_STORE_USER,
    payload: user,
});

export const userHasAuthenticated = isAuthenticated => ({
    type: actionTypes.AUTHENTICATION_USER_HAS_AUTHENTICATED,
    payload: isAuthenticated,
})

export const authenticationError = error => ({
    type: actionTypes.AUTHENTICATION_ERROR,
    payload: error,
});

export const signOutUser = history => dispatch => {
    dispatch(userHasAuthenticated(false));
    localStorage.removeItem("authorization");
    setAuthToken(null);
    dispatch(storeUser(null));
    history.push({ pathname: "/" });
};
